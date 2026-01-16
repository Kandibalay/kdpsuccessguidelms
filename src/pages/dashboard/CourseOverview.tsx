import React from "react";
import { motion } from "motion/react";
import {
  PlayCircle,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  X,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/apiConfig";
import { 
  getCourseProgress, 
  getCompletedVideoCount,
  CourseProgress 
} from "../../utils/courseProgress";
import toast from "react-hot-toast";

// Types
interface Video {
  _id: string;
  title: string;
  duration: string;
  videoUrl: string;
  order: number;
}

interface Module {
  _id: string;
  title: string;
  duration: string;
  videos: Video[];
  order: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  modules: Module[];
  totalVideos: number;
  instructor: {
    fullName: string;
  };
}

export function CourseOverview() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  // State
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Check enrollment status
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!courseId) return;
      
      setCheckingEnrollment(true);
      try {
        const response = await api.get(`/enrolled-courses`);
        const enrolledCourses = response.data.enrolledCourses || [];
        const enrolled = enrolledCourses.some((ec: any) => ec.course._id === courseId);
        setIsEnrolled(enrolled);
      } catch (err) {
        setIsEnrolled(false);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [courseId]);

  // Fetch course data and progress
  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      if (!courseId) {
        setError('No course ID provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch course data
        const response = await api.get(`/courses/${courseId}`);
        const courseData = response.data.course;
        
        setCourse(courseData);
        
        // Auto-expand first 2 modules
        if (courseData.modules.length > 0) {
          const firstTwoModules = courseData.modules.slice(0, 2).map((m: Module) => m._id);
          setExpandedModules(firstTwoModules);
        }
        
        // Fetch progress from backend if enrolled
        if (isEnrolled) {
          try {
            const progressData = await getCourseProgress(courseId);
            setProgress(progressData);
          } catch (progressError) {
            setProgress(null);
          }
        }
      } catch (err) {
        setError('Failed to load course. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!checkingEnrollment) {
      fetchCourseAndProgress();
    }
  }, [courseId, isEnrolled, checkingEnrollment]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleVideoClick = (video: Video) => {
    if (!isEnrolled) {
      toast.error('Please enroll in the course to watch videos');
      return;
    }
    setSelectedVideo(video);
  };

  // Calculate total duration
  const calculateTotalDuration = () => {
    if (!course) return '0h 0min';
    
    let totalMinutes = 0;
    course.modules.forEach(module => {
      module.videos.forEach(video => {
        const [minutes, seconds] = video.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}min`;
  };

  // Get completed videos count from backend progress
  const completedVideos = progress ? getCompletedVideoCount(progress) : 0;
  
  // Check if course has been started
  const courseStarted = progress ? progress.completedVideos.length > 0 : false;

  // Loading state
  if (isLoading || checkingEnrollment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading course...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This course does not exist.'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Course Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 md:p-12 mb-8 shadow-lg relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Course Thumbnail */}
            <div className="flex-shrink-0 w-full md:w-64">
              <div className="w-full aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={course.thumbnail.url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Course Info */}
            <div className="flex-1 text-white text-center md:text-left">
              <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs mb-4">
                🎓 Premium Course
              </span>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{course.title}</h1>
              <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                Join thousands of successful publishers who've mastered Amazon KDP with this comprehensive step-by-step guide. From setup to scaling, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[80px]">
                  <div className="text-2xl font-bold mb-1">{course.totalVideos}</div>
                  <div className="text-xs text-white/80">Video Lessons</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[80px]">
                  <div className="text-2xl font-bold mb-1">{calculateTotalDuration().split(' ')[0]}</div>
                  <div className="text-xs text-white/80">Content</div>
                </div>
                {isEnrolled && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[80px]">
                    <div className="text-2xl font-bold mb-1">{completedVideos}</div>
                    <div className="text-xs text-white/80">Completed</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* About This Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 mb-8 border border-gray-200 shadow-sm"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About This Course</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you're tired of low sales, dead books, wasted ad spend, and confusing KDP advice, this course was created for you. The Amazon KDP Success Guide Course is a step-by-step, proven system built around DSAM Blueprint—a framework designed to help you publish evergreen, high-content books that generate consistent monthly income, not one-time spikes. This is not about shortcuts or trends that die in 30 days. This is about building digital assets that sell year after year.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            What Is the DSAM Blueprint? The DSAM Blueprint is a practical publishing system that focuses on: Demand-driven keyword research, Strategic book positioning, High-content evergreen niches, Conversion-focused book creation, and Ads that scale profitably. Everything in this course is built to help you move toward $1,000–$5,000+ monthly income—step by step, with clarity.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-3">What You'll Learn:</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Advanced Keyword Research That Actually Converts</h3>
              <p className="text-gray-700 text-base mb-2 px-5">You'll learn how to:</p>
              <div className="space-y-2">
                {[
                  "Find buyer-intent keywords, not just high-search terms.",
                  "Identify low-competition, evergreen niches.",
                  "Validate profitability before creating a single page.",
                  "Avoid saturated traps that kill new publishers.",
                  "How to stay Safe on Amazon",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 px-5">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
                <p className="px-5 text-gray-700">This alone saves you months of trial and error.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Evergreen High-Content Book Creation (Your Core Advantage)</h3>
              <p className="text-gray-700 mb-2 px-5">This course focuses heavily on high-content books, because they: Rank better, Earn higher royalties, Build authority, Create long-term income.</p>
              <p className="text-gray-700 text-base mb-2 px-5">You'll learn how to:</p>
              <div className="space-y-2">
                {[
                  "What qualifies as a true high-content book.",
                  "How to structure books Amazon favors",
                  "Page count, formatting, and content depth strategies.",
                  "How to create books readers actually finish and recommend.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 px-5">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. A Repeatable Book Creation System</h3>
              <p className="text-gray-700 mb-2 px-5">No confusion. No overwhelm.</p>
              <p className="text-gray-700 text-base mb-2 px-5">You'll get a clear, repeatable workflow for:</p>
              <div className="space-y-2">
                {[
                  "Research to publishing in under 7 days.",
                  "Outsourcing smartly (without losing quality).",
                  "Scaling from 1 book to 10+ books per month.",
                  "Tracking what works and killing what doesn't.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 px-5">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Publishing & Listing Optimization That Drives Sales</h3>
              <p className="text-gray-700 text-base mb-2 px-5">You'll learn how to:</p>
              <div className="space-y-2">
                {[
                  "Write titles and subtitles that rank and convert.",
                  "Create descriptions that sell without hype.",
                  "Position your book correctly inside Amazon's algorithm.",
                  "Avoid silent listing killers most publishers miss.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 px-5">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Amazon Ads: My Winning, Low-Waste Strategy</h3>
              <p className="text-gray-700 mb-2 px-5">Ads don't have to burn your money.</p>
              <p className="text-gray-700 text-base mb-2 px-5">Inside the course, I break down:</p>
              <div className="space-y-2">
                {[
                  "When to start ads (and when not to).",
                  "My low-risk ad launch structure",
                  "Keyword targeting that actually converts",
                  "Scaling strategies used on profitable books",
                  "How to kill losing ads fast and double down on winners",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 px-5">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-primary" />
                <span>{course.totalVideos} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Instructor:</span>
                <span>{course.instructor.fullName}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Curriculum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Course Curriculum</h2>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              {course.totalVideos} videos • {calculateTotalDuration()}
            </span>
          </div>

          {/* Enrollment Warning for Non-Enrolled Users */}
          {!isEnrolled && (
            <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-orange-800 font-medium mb-1">Course Enrollment Required</p>
                <p className="text-sm text-orange-700">
                  Enroll in this course to unlock all video lessons and start learning.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {course.modules.map((module, index) => (
              <motion.div
                key={module._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module._id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    {expandedModules.includes(module._id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-700 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-700 flex-shrink-0" />
                    )}
                    <span className="text-sm md:text-base font-semibold text-gray-900">
                      {module.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 ml-2 font-medium">
                    {module.videos.length} videos 
                  </span>
                </button>

                {/* Module Videos */}
                {expandedModules.includes(module._id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50"
                  >
                    {module.videos.map((video) => (
                      <button
                        key={video._id}
                        onClick={() => handleVideoClick(video)}
                        disabled={!isEnrolled}
                        className="w-full flex items-center justify-between p-4 hover:bg-white transition-colors border-b border-gray-100 last:border-b-0 group disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors flex-shrink-0">
                            {isEnrolled ? (
                              <PlayCircle className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <span className="text-sm md:text-base lg:text-base text-gray-700 group-hover:text-primary transition-colors font-medium">
                            {video.title}
                          </span>
                        </div>
                        <span className="text-sm md:text-base text-gray-600 ml-3 flex-shrink-0">
                          {video.duration}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Start/Continue Learning Button */}
          <div className="flex justify-center">
            {isEnrolled ? (
              <motion.button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="w-full md:w-1/2 inline-flex items-center justify-center gap-2 mt-8 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlayCircle className="w-5 h-5" />
                {courseStarted ? "Continue Learning" : "Start Learning"}
              </motion.button>
            ) : (
              <motion.button
                onClick={() => window.open('https://selar.com/549892', '_blank')}
                className="w-full md:w-1/2 inline-flex items-center justify-center gap-2 mt-8 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lock className="w-5 h-5" />
                Enroll Now
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Video Preview Modal (Only for Enrolled Users) */}
      {selectedVideo && isEnrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-6"
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
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div className="flex-1 pr-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-1">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  Duration: {selectedVideo.duration}
                </p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </button>
            </div>

            {/* Info Message */}
            <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
              <p className="text-sm text-gray-700 text-center">
                🎓 Preview only - Full course access available in the learning dashboard
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
                  Part of: <span className="font-semibold">{course.title}</span>
                </p>
                <button
                  onClick={() => {
                    setSelectedVideo(null);
                    navigate(`/courses/${courseId}`);
                  }}
                  className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
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
