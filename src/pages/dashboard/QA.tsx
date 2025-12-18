import React from 'react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, ThumbsUp, MessageSquare, Search } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: 'What are the best niches for KDP in 2024?',
    askedBy: 'Sarah Johnson',
    timeAgo: '2 hours ago',
    answers: 5,
    likes: 12,
    hasAnswer: true,
  },
  {
    id: 2,
    question: 'How do I optimize my book description for Amazon SEO?',
    askedBy: 'Mike Chen',
    timeAgo: '5 hours ago',
    answers: 3,
    likes: 8,
    hasAnswer: true,
  },
  {
    id: 3,
    question: 'What dimensions should I use for my book cover?',
    askedBy: 'Emma Davis',
    timeAgo: '1 day ago',
    answers: 7,
    likes: 15,
    hasAnswer: true,
  },
  {
    id: 4,
    question: 'How long does it take for a book to go live on Amazon?',
    askedBy: 'Alex Mitchell',
    timeAgo: '2 days ago',
    answers: 0,
    likes: 3,
    hasAnswer: false,
  },
];

export function QA() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAskModal, setShowAskModal] = useState(false);

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-gray-900 mb-1">Question & Answer</h1>
          <p className="text-sm text-gray-600">
            Ask questions and get help from the community
          </p>
        </div>

        {/* Search and Ask Button */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAskModal(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
          >
            Ask Question
          </button>
        </div>

        {/* Filter Tabs */}
        {/* <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['All Questions', 'My Questions', 'Unanswered', 'Popular'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                tab === 'All Questions'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* Questions List */}
        

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-16 border border-gray-200 shadow-sm text-center"
          >
            <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">No Questions Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or be the first to ask a question
            </p>
            <button
              onClick={() => setShowAskModal(true)}
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Ask a Question
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Ask Question Modal (Simple) */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full"
          >
            <h2 className="text-2xl text-gray-900 mb-6">Ask a Question</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Question Title</label>
                <input
                  type="text"
                  placeholder="What do you want to know?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Details (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Provide more context..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAskModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAskModal(false)}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Post Question
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
