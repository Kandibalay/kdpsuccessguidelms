import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-gray-200 leading-none">
            404
          </h1>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found!
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <motion.button
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 min-w-[180px] justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Back Home
            </motion.button>
          </Link>

          <Link to="/courses">
            <motion.button
              className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-2 min-w-[180px] justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              View Courses
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative circles (inspired by the reference image) */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gray-100 rounded-full blur-2xl opacity-40 -z-10" />
      </div>
    </div>
  );
}
