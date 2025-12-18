import React from 'react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  ChevronDown,
  ChevronRight,
  Star,
  Users,
  Award
} from 'lucide-react';
import logo from 'figma:asset/72abcb8451659727fde74b13e2f13351c2d0e642.png';
import { 
  getCourseProgress, 
  markVideoAsComplete as saveVideoComplete,
  markCourseAsStarted 
} from '../../utils/courseProgress';

const courseModules = [
  {
    id: 1,
    title: 'Introductory Video',
    duration: '15min',
    videos: [
      { id: 1, title: 'Introductory Video', duration: '15:30', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ],
  },
  {
    id: 2,
    title: 'Setting Up',
    duration: '1h 15min',
    videos: [
      { id: 2, title: 'Foreign Account Creation (Wise and Grey.co)', duration: '18:45', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { id: 3, title: 'Setting Up Amazon Account', duration: '16:30', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { id: 4, title: 'Linking Up KDP Account with Foreign Bank', duration: '14:15', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { id: 5, title: 'Installing Extensions', duration: '12:30', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
  },
  {
    id: 3,
    title: 'BOOK CREATION PROCESS & PUBLISHING',
    duration: '2h 30min',
    videos: [
      { id: 6, title: 'Book Cover Designs', duration: '25:00', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { id: 7, title: 'Book Creation', duration: '35:00', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { id: 8, title: 'Book Content Creation', duration: '40:00', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      { id: 9, title: 'Book Publishing', duration: '30:00', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
    ],
  },
  {
    id: 4,
    title: 'BOOK MARKETING PROPER',
    duration: '1h 45min',
    videos: [
      { id: 10, title: 'Creating A+ Content and Uploading', duration: '26:45', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { id: 11, title: 'Author Central & Editorial Reviews', duration: '22:30', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
      { id: 12, title: 'Essential Ad Campaign Settings', duration: '28:15', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
    ],
  },
  {
    id: 5,
    title: 'Extra',
    duration: '30min',
    videos: [
      { id: 13, title: 'Resources Center', duration: '15:00', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      { id: 14, title: '200k Weekly Bonus', duration: '15:00', completed: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ],
  },
];

export function CourseDetail() {
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2, 3, 4, 5]);
  const [selectedVideo, setSelectedVideo] = useState(courseModules[0].videos[0]);
  const [completedVideoIds, setCompletedVideoIds] = useState<number[]>([]);

  // Load progress from localStorage on mount and scroll to top
  useEffect(() => {
    const progress = getCourseProgress();
    setCompletedVideoIds(progress.completedVideoIds);
    // Mark course as started when they enter the video player
    markCourseAsStarted();
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const markAsComplete = () => {
    if (!completedVideoIds.includes(selectedVideo.id)) {
      setCompletedVideoIds((prev) => [...prev, selectedVideo.id]);
      saveVideoComplete(selectedVideo.id);
    }
  };

  const isVideoCompleted = (videoId: number) => {
    return completedVideoIds.includes(videoId);
  };

  const totalVideos = courseModules.reduce((acc, module) => acc + module.videos.length, 0);
  const completedVideos = completedVideoIds.length;
  const progress = Math.round((completedVideos / totalVideos) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-[1800px]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Course Modules */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                 
                  <div>
                    <h2 className="text-2xl text-gray-800 font-bold">KDP SUCCESS GUIDE</h2>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {totalVideos} lessons • 6h 15min total
                </p>
              </div>

              <div>
                {courseModules.map((module, index) => (
                  <div key={module.id} className="border-b border-gray-200 last:border-0">
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 text-left">
                        {expandedModules.includes(module.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-base text-gray-900">{module.title}</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {module.videos.length} lessons • {module.duration}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Module Videos */}
                    {expandedModules.includes(module.id) && (
                      <div className="bg-gray-50">
                        {module.videos.map((video) => (
                          <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className={`w-full p-3 pl-12 flex items-center gap-3 hover:bg-white transition-colors border-b border-gray-100 last:border-0 ${
                              selectedVideo.id === video.id ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                            }`}
                          >
                            {isVideoCompleted(video.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <PlayCircle className={`w-5 h-5 flex-shrink-0 ${selectedVideo.id === video.id ? 'text-primary' : 'text-gray-400'}`} />
                            )}
                            <div className="flex-1 text-left">
                              <p className={`text-sm ${
                                selectedVideo.id === video.id ? 'text-primary' : 'text-gray-700'
                              }`}>
                                {video.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5">{video.duration}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-8"
          >
            {/* Progress Bar - Compact */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-md text-gray-900">Your Progress</span>
                </div>
                <span className="text-primary text-sm">{progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>{completedVideos} of {totalVideos} lessons completed</span>
                <span>Keep learning! 🎯</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Video Player */}
              <div className="aspect-video bg-black">
                <video
                  key={selectedVideo.id}
                  controls
                  autoPlay
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full"
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl text-gray-900 mb-2">{selectedVideo.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedVideo.duration}
                      </span>
                      {isVideoCompleted(selectedVideo.id) && (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {!isVideoCompleted(selectedVideo.id) ? (
                  <button 
                    className="bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm"
                    onClick={markAsComplete}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Complete
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 px-5 py-2.5">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Lesson Completed!</span>
                  </div>
                )}

                {/* Video Description */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-3">About this lesson</h3>
                  <p className="text-gray-700 text-md leading-relaxed mb-4">
                    In this comprehensive lesson, you'll learn essential techniques and strategies for mastering Amazon KDP. 
                    Follow along with step-by-step instructions and real-world examples to accelerate your publishing success.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}