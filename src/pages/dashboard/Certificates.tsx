import React from 'react';
import { motion } from 'motion/react';
import { Award, Download, Share2, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const certificates = [
  // User hasn't earned any yet, but showing what they'll get
];

export function Certificates() {
  const courseProgress = 45; // From the course data

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificates</h1>
          <p className="text-lg text-gray-600">
            Showcase your achievements and completed courses
          </p>
        </div>

        {/* Progress Card - Not Yet Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-primary via-accent to-primary rounded-xl p-8 text-white mb-8 shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">KDP Success Guide Certificate</h2>
              <p className="text-blue-100">Complete the course to earn your certificate</p>
            </div>
            <Award className="w-12 h-12 text-white opacity-80" />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Course Completion</span>
              <span className="font-bold">{courseProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-blue-100">
            <CheckCircle className="w-5 h-5" />
            <span>9 more lessons to complete</span>
          </div>
        </motion.div>

        {/* Certificate Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          <div className="p-8 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Preview</h3>
            <p className="text-gray-600">Here's what your certificate will look like</p>
          </div>

          {/* Certificate Design */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-3xl mx-auto bg-white border-8 border-double border-primary rounded-lg p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-accent rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-accent rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-accent rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent rounded-br-lg" />

              {/* Content */}
              <div className="text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Certificate of Completion
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-6" />
                
                <p className="text-lg text-gray-600 mb-8">This is to certify that</p>
                
                <h3 className="text-3xl font-bold text-primary mb-8">John Doe</h3>
                
                <p className="text-lg text-gray-600 mb-4">has successfully completed</p>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-8">
                  KDP Success Guide by DSAM
                </h4>
                
                <div className="flex justify-center gap-16 mb-8">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Completion Date</p>
                    <p className="font-bold text-gray-900">— —, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Duration</p>
                    <p className="font-bold text-gray-900">8 Hours</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-200">
                  <div className="flex justify-center gap-16">
                    <div>
                      <div className="w-32 h-0.5 bg-gray-900 mb-2" />
                      <p className="text-sm text-gray-600">Instructor</p>
                      <p className="font-bold text-gray-900">DSAM</p>
                    </div>
                    <div>
                      <div className="w-32 h-0.5 bg-gray-900 mb-2" />
                      <p className="text-sm text-gray-600">Certificate ID</p>
                      <p className="font-bold text-gray-900">KDP-####-####</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty State with Actions */}
        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center"
          >
            <Award className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Complete your courses to earn certificates you can share with employers and on social media
            </p>
            <Link
              to="/dashboard/my-courses"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Continue Learning
            </Link>
          </motion.div>
        )}

        {/* Certificate Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Download & Print</h3>
            <p className="text-sm text-gray-600">
              Download your certificates as high-quality PDFs ready for printing
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
              <Share2 className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Share Online</h3>
            <p className="text-sm text-gray-600">
              Share your achievements on LinkedIn, Twitter, and other social platforms
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Lifetime Access</h3>
            <p className="text-sm text-gray-600">
              Your certificates never expire and can be accessed anytime from your dashboard
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
