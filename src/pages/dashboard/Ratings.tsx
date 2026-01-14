// import { motion } from 'motion/react';
// import React, { useState } from 'react';
// import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

// const courseReviews = [
//   {
//     id: 1,
//     courseTitle: 'KDP Success Guide by DSAM',
//     rating: 0,
//     review: '',
//     helpful: 0,
//     date: null,
//   },
// ];

// export function Ratings() {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [review, setReview] = useState('');

//   const handleSubmitReview = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (rating === 0) {
//       alert('Please select a rating');
//       return;
//     }
//     console.log('Review submitted:', { rating, review });
//     alert('Thank you for your review!');
//     setRating(0);
//     setReview('');
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Ratings & Reviews</h1>
//           <p className="text-lg text-gray-600">
//             Share your experience and help other learners
//           </p>
//         </div>

//         {/* Write a Review */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Rate Your Experience
//           </h2>

//           <form onSubmit={handleSubmitReview}>
//             {/* Course Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-900 mb-2">
//                 Course
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
//                 <option>KDP Success Guide by DSAM</option>
//               </select>
//             </div>

//             {/* Star Rating */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-900 mb-3">
//                 Your Rating
//               </label>
//               <div className="flex gap-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setRating(star)}
//                     onMouseEnter={() => setHoverRating(star)}
//                     onMouseLeave={() => setHoverRating(0)}
//                     className="transition-transform hover:scale-110"
//                   >
//                     <Star
//                       className={`w-10 h-10 ${
//                         star <= (hoverRating || rating)
//                           ? 'fill-orange-500 text-orange-500'
//                           : 'text-gray-300'
//                       }`}
//                     />
//                   </button>
//                 ))}
//               </div>
//               {rating > 0 && (
//                 <p className="text-sm text-gray-600 mt-2">
//                   {rating === 1 && 'Poor'}
//                   {rating === 2 && 'Fair'}
//                   {rating === 3 && 'Good'}
//                   {rating === 4 && 'Very Good'}
//                   {rating === 5 && 'Excellent'}
//                 </p>
//               )}
//             </div>

//             {/* Review Text */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-900 mb-2">
//                 Your Review
//               </label>
//               <textarea
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//                 rows={6}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
//                 placeholder="Share your thoughts about this course... What did you like? What could be improved?"
//               />
//               <p className="text-sm text-gray-600 mt-2">
//                 {review.length} characters
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
//             >
//               Submit Review
//             </button>
//           </form>
//         </motion.div>

//         {/* Your Reviews */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
//         >
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>

//           {courseReviews.every((r) => !r.rating) ? (
//             <div className="text-center py-12">
//               <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No Reviews Yet
//               </h3>
//               <p className="text-gray-600">
//                 Share your experience by writing your first review above
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {courseReviews.map((courseReview) =>
//                 courseReview.rating > 0 ? (
//                   <div
//                     key={courseReview.id}
//                     className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h3 className="font-bold text-gray-900 mb-2">
//                           {courseReview.courseTitle}
//                         </h3>
//                         <div className="flex items-center gap-2 mb-3">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star
//                               key={star}
//                               className={`w-5 h-5 ${
//                                 star <= courseReview.rating
//                                   ? 'fill-orange-500 text-orange-500'
//                                   : 'text-gray-300'
//                               }`}
//                             />
//                           ))}
//                           <span className="text-sm text-gray-600 ml-2">
//                             {new Date(courseReview.date || Date.now()).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                       <button className="text-primary hover:text-accent transition-colors text-sm font-medium">
//                         Edit
//                       </button>
//                     </div>
//                     <p className="text-gray-700 mb-4">{courseReview.review}</p>
//                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                       <button className="flex items-center gap-1 hover:text-primary transition-colors">
//                         <ThumbsUp className="w-4 h-4" />
//                         <span>{courseReview.helpful} helpful</span>
//                       </button>
//                     </div>
//                   </div>
//                 ) : null
//               )}
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }


import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, Loader2, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import api from '../../utils/apiConfig';
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
  course: Course;
  rating: number;
  review: string;
  helpful: number;
  helpfulUsers: string[];
  createdAt: string;
  updatedAt: string;
}

export function Ratings() {
  // State
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [myReviews, setMyReviews] = useState<Rating[]>([]);
  const [allReviews, setAllReviews] = useState<Rating[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Fetch enrolled courses and user's reviews on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch all reviews when a course is selected
  useEffect(() => {
    if (selectedCourseId) {
      fetchCourseReviews(selectedCourseId);
    }
  }, [selectedCourseId]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      // Fetch enrolled courses
      const enrolledResponse = await api.get('/enrolled-courses');
      console.log('✅ Enrolled courses:', enrolledResponse.data);
      setEnrolledCourses(enrolledResponse.data.enrolledCourses || []);
      
      // Set first course as selected by default
      if (enrolledResponse.data.enrolledCourses?.length > 0) {
        setSelectedCourseId(enrolledResponse.data.enrolledCourses[0]._id);
      }

      // Fetch user's reviews
      const myReviewsResponse = await api.get('/ratings/my-reviews');
      console.log('✅ My reviews:', myReviewsResponse.data);
      setMyReviews(myReviewsResponse.data.ratings || []);
      
      // Get current user ID from the first review (if exists)
      if (myReviewsResponse.data.ratings?.length > 0) {
        setCurrentUserId(myReviewsResponse.data.ratings[0].user._id);
      }
    } catch (error: any) {
      console.error('❌ Error fetching initial data:', error);
      toast.error('Failed to load courses and reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourseReviews = async (courseId: string) => {
    try {
      const response = await api.get(`/ratings/course/${courseId}`);
      console.log('✅ Course reviews:', response.data);
      setAllReviews(response.data.ratings || []);
    } catch (error: any) {
      console.error('❌ Error fetching course reviews:', error);
      // Don't show error toast as this might be expected for new courses
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
      if (editingReviewId) {
        // Update existing review
        const response = await api.put(`/ratings/${editingReviewId}`, {
          rating,
          review: review.trim(),
        });
        console.log('✅ Review updated:', response.data);
        toast.success('Review updated successfully! 🎉');
        setEditingReviewId(null);
      } else {
        // Create new review
        const response = await api.post('/ratings', {
          courseId: selectedCourseId,
          rating,
          review: review.trim(),
        });
        console.log('✅ Review created:', response.data);
        toast.success('Thank you for your review! 🎉');
      }

      // Reset form
      setRating(0);
      setReview('');
      
      // Refresh data
      await fetchInitialData();
      if (selectedCourseId) {
        await fetchCourseReviews(selectedCourseId);
      }
    } catch (error: any) {
      console.error('❌ Error submitting review:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit review';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (reviewToEdit: Rating) => {
    setRating(reviewToEdit.rating);
    setReview(reviewToEdit.review);
    setSelectedCourseId(reviewToEdit.course._id);
    setEditingReviewId(reviewToEdit._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await api.delete(`/ratings/${reviewId}`);
      console.log('✅ Review deleted');
      toast.success('Review deleted successfully');
      
      // Refresh data
      await fetchInitialData();
      if (selectedCourseId) {
        await fetchCourseReviews(selectedCourseId);
      }
    } catch (error: any) {
      console.error('❌ Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const handleMarkAsHelpful = async (ratingId: string, isCurrentlyHelpful: boolean) => {
    try {
      if (isCurrentlyHelpful) {
        // Unmark as helpful
        await api.delete(`/ratings/${ratingId}/helpful`);
        toast.success('Removed helpful mark');
      } else {
        // Mark as helpful
        await api.post(`/ratings/${ratingId}/helpful`);
        toast.success('Marked as helpful! 👍');
      }
      
      // Refresh course reviews
      if (selectedCourseId) {
        await fetchCourseReviews(selectedCourseId);
      }
    } catch (error: any) {
      console.error('❌ Error marking as helpful:', error);
      toast.error('Failed to update helpful status');
    }
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setRating(0);
    setReview('');
  };

  // Check if current user has marked a review as helpful
  const isMarkedHelpful = (ratingItem: Rating): boolean => {
    return ratingItem.helpfulUsers?.includes(currentUserId) || false;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading ratings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Ratings & Reviews</h1>
            <p className="text-lg text-gray-600">
              Share your experience and help other learners
            </p>
          </div>

          {/* Check if user has enrolled courses */}
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
              <a
                href="/courses"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Browse Courses
              </a>
            </motion.div>
          ) : (
            <>
              {/* Write a Review */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingReviewId ? 'Edit Your Review' : 'Rate Your Experience'}
                </h2>

                <form onSubmit={handleSubmitReview}>
                  {/* Course Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Course
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      disabled={editingReviewId !== null}
                    >
                      {enrolledCourses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Star Rating */}
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
                        {rating === 1 && 'Poor'}
                        {rating === 2 && 'Fair'}
                        {rating === 3 && 'Good'}
                        {rating === 4 && 'Very Good'}
                        {rating === 5 && 'Excellent'}
                      </p>
                    )}
                  </div>

                  {/* Review Text */}
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
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {review.length} characters
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {editingReviewId ? 'Updating...' : 'Submitting...'}
                        </>
                      ) : (
                        <>{editingReviewId ? 'Update Review' : 'Submit Review'}</>
                      )}
                    </button>
                    {editingReviewId && (
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
              </motion.div>

              {/* Your Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>

                {myReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Reviews Yet
                    </h3>
                    <p className="text-gray-600">
                      Share your experience by writing your first review above
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myReviews.map((reviewItem) => (
                      <div
                        key={reviewItem._id}
                        className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">
                              {reviewItem.course.title}
                            </h3>
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
                              <span className="text-sm text-gray-600 ml-2">
                                {new Date(reviewItem.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditReview(reviewItem)}
                              className="text-orange-500 hover:text-orange-600 transition-colors p-2"
                              title="Edit review"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(reviewItem._id)}
                              className="text-red-500 hover:text-red-600 transition-colors p-2"
                              title="Delete review"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{reviewItem.review}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{reviewItem.helpful} helpful</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* All Course Reviews */}
              {selectedCourseId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Course Reviews
                  </h2>

                  {allReviews.length === 0 ? (
                    <div className="text-center py-12">
                      <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        No Reviews Yet
                      </h3>
                      <p className="text-gray-600">
                        Be the first to review this course!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {allReviews.map((reviewItem) => (
                        <div
                          key={reviewItem._id}
                          className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600 font-bold">
                                    {reviewItem.user.fullName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900">
                                    {reviewItem.user.fullName}
                                  </h3>
                                  <span className="text-sm text-gray-600">
                                    {new Date(reviewItem.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= reviewItem.rating
                                        ? 'fill-orange-500 text-orange-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{reviewItem.review}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button
                              onClick={() =>
                                handleMarkAsHelpful(
                                  reviewItem._id,
                                  isMarkedHelpful(reviewItem)
                                )
                              }
                              className={`flex items-center gap-1 transition-colors ${
                                isMarkedHelpful(reviewItem)
                                  ? 'text-orange-500'
                                  : 'text-gray-600 hover:text-orange-500'
                              }`}
                            >
                              <ThumbsUp
                                className={`w-4 h-4 ${
                                  isMarkedHelpful(reviewItem) ? 'fill-orange-500' : ''
                                }`}
                              />
                              <span>
                                {reviewItem.helpful}{' '}
                                {isMarkedHelpful(reviewItem) ? 'Marked helpful' : 'Helpful'}
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
