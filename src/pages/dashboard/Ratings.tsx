import { motion } from 'motion/react';
import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

const courseReviews = [
  {
    id: 1,
    courseTitle: 'KDP Success Guide by DSAM',
    rating: 0,
    review: '',
    helpful: 0,
    date: null,
  },
];

export function Ratings() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    console.log('Review submitted:', { rating, review });
    alert('Thank you for your review!');
    setRating(0);
    setReview('');
  };

  return (
    <div className="max-w-4xl mx-auto">
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

        {/* Write a Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Rate Your Experience
          </h2>

          <form onSubmit={handleSubmitReview}>
            {/* Course Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Course
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>KDP Success Guide by DSAM</option>
              </select>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Your Rating
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
                Your Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Share your thoughts about this course... What did you like? What could be improved?"
              />
              <p className="text-sm text-gray-600 mt-2">
                {review.length} characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Submit Review
            </button>
          </form>
        </motion.div>

        {/* Your Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>

          {courseReviews.every((r) => !r.rating) ? (
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
              {courseReviews.map((courseReview) =>
                courseReview.rating > 0 ? (
                  <div
                    key={courseReview.id}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          {courseReview.courseTitle}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= courseReview.rating
                                  ? 'fill-orange-500 text-orange-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            {new Date(courseReview.date || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button className="text-primary hover:text-accent transition-colors text-sm font-medium">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 mb-4">{courseReview.review}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{courseReview.helpful} helpful</span>
                      </button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
