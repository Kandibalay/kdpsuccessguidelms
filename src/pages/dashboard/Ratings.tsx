import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, Loader2, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { getUserEnrollments } from '../../utils/enrollmentUtils';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
}

interface Rating {
  _id: string;
  user: User;
  course: string | Course;
  rating: number;
  review: string;
  helpful: number;
  helpfulUsers: string[];
  createdAt: string;
  updatedAt: string;
}

// Helper to extract course ID
const extractCourseId = (course: string | null | { _id: string; [key: string]: any }): string | null => {
  if (!course) return null;
  if (typeof course === 'string') return course;
  if (typeof course === 'object' && course._id) return course._id;
  return null;
};

export function Ratings() {
  const navigate = useNavigate();
  
  // State
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [myRating, setMyRating] = useState<Rating | null>(null);
  const [allReviews, setAllReviews] = useState<Rating[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchCourseData(selectedCourseId);
    }
  }, [selectedCourseId]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    
    try {
      const enrollmentResponse = await getUserEnrollments();
      const enrollments = enrollmentResponse.enrollments || [];

      if (enrollments.length === 0) {
        setEnrolledCourses([]);
        setIsLoading(false);
        return;
      }

      const courseIds = new Set<string>();
      enrollments.forEach((enrollment) => {
        const courseId = extractCourseId(enrollment.course);
        if (courseId) {
          courseIds.add(courseId);
        }
        
        enrollment.completedVideos?.forEach(video => {
          if (video.courseId) {
            courseIds.add(video.courseId);
          }
        });
      });

      const coursesPromises = Array.from(courseIds).map(courseId =>
        api.get(`/courses/${courseId}`).catch(err => {
          return null;
        })
      );

      const coursesResponses = await Promise.all(coursesPromises);
      const courses = coursesResponses
        .filter(res => res !== null)
        .map(res => res.data.course)
        .filter(Boolean);

      setEnrolledCourses(courses);
      
      if (courses.length > 0) {
        setSelectedCourseId(courses[0]._id);
      }

      // Get current user ID from enrollment
      if (enrollments.length > 0) {
        setCurrentUserId(enrollments[0].user);
      }
    } catch (error: any) {
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourseData = async (courseId: string) => {
    try {
      // Fetch user's rating for this course
      await fetchMyRating(courseId);
      
      // Fetch all reviews for this course
      await fetchCourseReviews(courseId);
    } catch (error) {
      // Error handled silently
    }
  };

  const fetchMyRating = async (courseId: string) => {
    try {
      const response = await api.get(`/ratings/courses/${courseId}/user`);
      
      if (response.data.rating) {
        setMyRating(response.data.rating);
        setRating(response.data.rating.rating);
        setReview(response.data.rating.review);
      } else {
        setMyRating(null);
        setRating(0);
        setReview('');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        // User hasn't rated this course yet
        setMyRating(null);
        setRating(0);
        setReview('');
      }
    }
  };

  const fetchCourseReviews = async (courseId: string) => {
    try {
      const response = await api.get(`/ratings/courses/${courseId}?page=1&limit=50&sort=-createdAt`);
      setAllReviews(response.data.ratings || []);
    } catch (error: any) {
      setAllReviews([]);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourseId) {
      toast.error('Please select a course');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      // Both create and update use the same endpoint (POST)
      const response = await api.post(`/ratings/courses/${selectedCourseId}`, {
        rating,
        review: review.trim(),
      });
      
      if (myRating) {
        toast.success('Review updated successfully! 🎉');
      } else {
        toast.success('Thank you for your review! 🎉');
      }
      
      setIsEditing(false);
      
      // Refresh data
      await fetchCourseData(selectedCourseId);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to submit review';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = () => {
    if (myRating) {
      setRating(myRating.rating);
      setReview(myRating.review);
      setIsEditing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteReview = async () => {
    if (!selectedCourseId) return;
    
    if (!window.confirm('Are you sure you want to delete your review?')) {
      return;
    }

    try {
      await api.delete(`/ratings/courses/${selectedCourseId}`);
      toast.success('Review deleted successfully');
      
      setMyRating(null);
      setRating(0);
      setReview('');
      setIsEditing(false);
      
      // Refresh reviews
      await fetchCourseData(selectedCourseId);
    } catch (error: any) {
      toast.error('Failed to delete review');
    }
  };

  const handleMarkAsHelpful = async (ratingId: string, isCurrentlyHelpful: boolean) => {
    try {
      if (isCurrentlyHelpful) {
        await api.delete(`/ratings/${ratingId}/helpful`);
        toast.success('Removed helpful mark');
      } else {
        await api.post(`/ratings/${ratingId}/helpful`);
        toast.success('Marked as helpful! 👍');
      }
      
      // Refresh reviews
      if (selectedCourseId) {
        await fetchCourseReviews(selectedCourseId);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update helpful status';
      toast.error(errorMessage);
    }
  };

  const cancelEdit = () => {
    if (myRating) {
      setRating(myRating.rating);
      setReview(myRating.review);
    } else {
      setRating(0);
      setReview('');
    }
    setIsEditing(false);
    toast('Edit cancelled');
  };

  const isMarkedHelpful = (ratingItem: Rating): boolean => {
    if (!currentUserId || !ratingItem.helpfulUsers) return false;
    return ratingItem.helpfulUsers.includes(currentUserId);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading ratings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ratings & Reviews</h1>
          <p className="text-lg text-gray-600">
            Share your experience and help other learners
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center"
          >
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Enrolled Courses</h2>
            <p className="text-gray-600 mb-6">
              You need to enroll in a course before you can leave a review
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Browse Courses
            </button>
          </motion.div>
        ) : (
          <>
            {/* Course Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6"
            >
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Select Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              >
                {enrolledCourses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Write/Edit Review Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {myRating && !isEditing ? 'Your Review' : isEditing ? 'Edit Your Review' : 'Write a Review'}
                </h2>
                {myRating && !isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditReview}
                      className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors px-4 py-2 hover:bg-orange-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={handleDeleteReview}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors px-4 py-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {myRating && !isEditing ? (
                // Display existing review
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= myRating.rating
                            ? 'fill-orange-500 text-orange-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {new Date(myRating.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{myRating.review}</p>
                </div>
              ) : (
                // Review form
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Your Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-10 h-10 ${
                              star <= (hoverRating || rating)
                                ? 'fill-orange-500 text-orange-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {rating === 1 && '⭐ Poor'}
                        {rating === 2 && '⭐⭐ Fair'}
                        {rating === 3 && '⭐⭐⭐ Good'}
                        {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                        {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Share your thoughts about this course... What did you like? What could be improved?"
                      required
                      minLength={10}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-600">
                        {review.length} characters {review.length < 10 && '(minimum 10)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || rating === 0 || review.trim().length < 10}
                      className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {myRating ? 'Updating...' : 'Submitting...'}
                        </>
                      ) : (
                        <>{myRating ? 'Update Review' : 'Submit Review'}</>
                      )}
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </motion.div>

            {/* All Course Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Student Reviews
                  </h2>
                  <p className="text-gray-600">
                    {enrolledCourses.find(c => c._id === selectedCourseId)?.title}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {allReviews.length} {allReviews.length === 1 ? 'review' : 'reviews'}
                </div>
              </div>

              {allReviews.length === 0 ? (
                <div className="text-center py-16">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-600">
                    Be the first to review this course!
                  </p>
                </div>
              ) : (
                <>
                  {/* Average Rating Summary */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-orange-600 mb-2">
                          {(allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)}
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length)
                                  ? 'fill-orange-500 text-orange-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {allReviews.length} {allReviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                      </div>

                      {/* Rating Distribution */}
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = allReviews.filter(r => Math.round(r.rating) === stars).length;
                          const percentage = (count / allReviews.length) * 100;
                          return (
                            <div key={stars} className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-medium text-gray-700 w-16">
                                {stars} star{stars !== 1 ? 's' : ''}
                              </span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {allReviews.map((reviewItem) => (
                      <div
                        key={reviewItem._id}
                        className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-lg">
                              {reviewItem.user.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">
                                {reviewItem.user.fullName}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {new Date(reviewItem.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 ${
                                    star <= reviewItem.rating
                                      ? 'fill-orange-500 text-orange-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed pl-16">
                          {reviewItem.review}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm pl-16">
                          <button
                            onClick={() =>
                              handleMarkAsHelpful(
                                reviewItem._id,
                                isMarkedHelpful(reviewItem)
                              )
                            }
                            disabled={reviewItem.user._id === currentUserId}
                            className={`flex items-center gap-2 transition-all px-4 py-2 rounded-lg font-medium ${
                              reviewItem.user._id === currentUserId
                                ? 'text-gray-400 cursor-not-allowed'
                                : isMarkedHelpful(reviewItem)
                                ? 'text-orange-600 bg-orange-50 hover:bg-orange-100'
                                : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                            }`}
                          >
                            <ThumbsUp
                              className={`w-4 h-4 ${
                                isMarkedHelpful(reviewItem) ? 'fill-orange-600' : ''
                              }`}
                            />
                            <span>
                              {reviewItem.user._id === currentUserId
                                ? 'Your review'
                                : isMarkedHelpful(reviewItem)
                                ? 'Helpful'
                                : 'Mark as helpful'}
                            </span>
                            <span className="text-gray-500">
                              ({reviewItem.helpful})
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
