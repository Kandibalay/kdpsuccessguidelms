import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight,
  BarChart3,
  BookOpen,
  Download,
  Award,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'figma:asset/72abcb8451659727fde74b13e2f13351c2d0e642.png';
import { hasCourseStarted } from '../../utils/courseProgress';

const courseModules = [
  {
    id: 1,
    title: 'Introductory Video',
    duration: '15min',
    videos: [
      { id: 1, title: 'Introductory Video', duration: '15:30', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ],
  },
  {
    id: 2,
    title: 'Setting Up',
    duration: '1h 15min',
    videos: [
      { id: 2, title: 'Foreign Account Creation (Wise and Grey.co)', duration: '18:45', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { id: 3, title: 'Setting Up Amazon Account', duration: '16:30', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 4, title: 'Linking Up KDP Account with Foreign Bank', duration: '14:15', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { id: 5, title: 'Installing Extensions', duration: '12:30', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
  {
    id: 3,
    title: 'BOOK CREATION PROCESS & PUBLISHING',
    duration: '2h 30min',
    videos: [
      { id: 6, title: 'Book Cover Designs', duration: '25:00', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { id: 7, title: 'Book Creation', duration: '35:00', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { id: 8, title: 'Book Content Creation', duration: '40:00', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      { id: 9, title: 'Book Publishing', duration: '30:00', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
    ],
  },
  {
    id: 4,
    title: 'BOOK MARKETING PROPER',
    duration: '1h 45min',
    videos: [
      { id: 10, title: 'Creating A+ Content and Uploading', duration: '26:45', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { id: 11, title: 'Author Central & Editorial Reviews', duration: '22:30', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
      { id: 12, title: 'Essential Ad Campaign Settings', duration: '28:15', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
  },
  {
    id: 5,
    title: 'Extra',
    duration: '30min',
    videos: [
      { id: 13, title: 'Resources Center', duration: '15:00', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      { id: 14, title: '200k Weekly Bonus', duration: '15:00', locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ],
  },
];

export function CourseOverview() {
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [courseStarted, setCourseStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCourseStarted(hasCourseStarted());
  }, []);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalVideos = courseModules.reduce((acc, module) => acc + module.videos.length, 0);
  const completedVideos = 0;
  const progressPercentage = (completedVideos / totalVideos) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Course Header - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm"
        >
          <div className="flex items-start gap-6">
            <img 
              src={logo} 
              alt="KDP Success Guide" 
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl text-gray-900">KDP Success Guide by DSAM</h1>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-lg border border-gray-200 flex items-center gap-2">
                  <BarChart3 className="w-3 h-3" />
                  Beginner to Advanced
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>DSAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>17 videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>6h 15min</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Thumbnail/Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 mb-8 shadow-lg relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Logo/Thumbnail */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-white rounded-2xl p-8 shadow-xl flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="KDP Success Guide" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Course Preview Info */}
            <div className="flex-1 text-white text-center md:text-left">
              <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs mb-4">
                🎓 Premium Course
              </span>
              <h2 className="text-3xl mb-3">Transform Your Publishing Journey</h2>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                Join thousands of successful publishers who've mastered Amazon KDP with this 
                comprehensive step-by-step guide. From setup to scaling, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl mb-1">17</div>
                  <div className="text-xs text-white/80">Video Lessons</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl mb-1">6h+</div>
                  <div className="text-xs text-white/80">Content</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl mb-1">100%</div>
                  <div className="text-xs text-white/80">Practical</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About This Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm"
        >
          <h2 className="text-xl text-gray-900 mb-4">About This Course</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Master the art of Kindle Direct Publishing with this comprehensive guide. Learn everything from account setup to 
            advanced marketing strategies. This course covers niche research, book creation, formatting, publishing, and proven 
            marketing techniques to maximize your passive income potential on Amazon KDP.
          </p>

          <h3 className="text-lg text-gray-900 mb-3">What You'll Learn:</h3>
          <div className="space-y-2">
            {[
              'Set up foreign payment accounts and link them with KDP for seamless international payments',
              'Master niche research using modern methods and AI tools like ChatGPT',
              'Create professional book covers that attract readers and increase conversions',
              'Develop high-quality content including study guides and travel guides',
              'Edit, format and optimize book metadata for maximum visibility',
              'Publish books successfully and create A+ Content to boost sales',
              'Implement effective Amazon advertising campaigns to scale your business',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Course Outline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">Course Outline</h2>
            <span className="text-sm text-gray-600">{totalVideos} videos • 6h 15min</span>
          </div>

          <div className="space-y-2">
            {courseModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                    module.id === 3 || module.id === 4 ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                    <span className={`${module.id === 3 || module.id === 4 ? 'text-primary' : 'text-gray-900'}`}>
                      {module.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{module.videos.length} videos • {module.duration}</span>
                </button>

                {/* Module Videos */}
                {expandedModules.includes(module.id) && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {module.videos.map((video, videoIndex) => (
                      <button
                        key={video.id}
                        onClick={() => !video.locked && setSelectedVideo(video)}
                        disabled={video.locked}
                        className="w-full flex items-center justify-between p-4 hover:bg-white transition-colors border-b border-gray-100 last:border-b-0 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            {video.locked ? (
                              <span className="text-xs text-gray-400">🔒</span>
                            ) : (
                              <PlayCircle className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <span className={`text-sm ${video.locked ? 'text-gray-400' : 'text-gray-700'}`}>
                            {video.title}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{video.duration}</span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Start/Continue Learning Button */}
          <motion.button
            onClick={() => navigate('/course/kdp-success-guide')}
            className="inline-flex items-center justify-center gap-2 mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlayCircle className="w-4 h-4" />
            {courseStarted ? 'Continue Learning' : 'Start Learning'}
          </motion.button>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl text-gray-900">{selectedVideo.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Duration: {selectedVideo.duration}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Video Player */}
            <div className="bg-black aspect-video">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Part of: KDP Success Guide by DSAM</p>
                <button
                  onClick={() => {
                    setSelectedVideo(null);
                    navigate('/course/kdp-success-guide');
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Go to Full Course
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
