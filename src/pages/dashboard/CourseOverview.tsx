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
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/apiConfig";
import { 
  getCourseProgress, 
  getCompletedVideoCount,
  CourseProgress 
} from "../../utils/courseProgress";
import { isUserEnrolled } from "../../utils/enrollmentUtils";
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

// Helper function to calculate actual total videos
const calculateActualTotalVideos = (modules: Module[]): number => {
  if (!modules) return 0;
  
  let total = 0;
  modules.forEach(module => {
    if (module.videos && Array.isArray(module.videos)) {
      total += module.videos.length;
    }
  });
  

  return total;
};

export function CourseOverview() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  // State
  const [course, setCourse] = useState<Course | null>(null);
  const [actualTotalVideos, setActualTotalVideos] = useState(0);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Check enrollment status using enrollmentUtils
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!courseId) return;
      
      setCheckingEnrollment(true);
      try {
        const enrolled = await isUserEnrolled(courseId);
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
        
        // Calculate actual total videos from modules
        const actualTotal = calculateActualTotalVideos(courseData.modules);
        setActualTotalVideos(actualTotal);
        
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
      toast.error('Please enroll in this course to watch videos');
      return;
    }
    
    // Navigate to course player to watch video
    navigate(`/courses/${courseId}`, { 
      state: { selectedVideoId: video._id } 
    });
  };

  const handleEnrollRedirect = () => {
    // Redirect to courses page where they can enroll
    navigate('/courses', { 
      state: { scrollToCourse: courseId } 
    });
    toast('Please complete enrollment on the courses page');
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

  // Use actual video count (calculated from modules) instead of backend totalVideos
  const displayTotalVideos = actualTotalVideos || course?.totalVideos || 0;

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
            onClick={() => navigate('/courses')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Courses</span>
        </motion.button>

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
              {isEnrolled && (
                <span className="inline-block px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full text-xs mb-4 font-semibold">
                  ✓ Enrolled
                </span>
              )}
              {!isEnrolled && (
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs mb-4">
                  🎓 Premium Course
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{course.title}</h1>
              <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                Join thousands of successful publishers who've mastered Amazon KDP with this comprehensive step-by-step guide. From setup to scaling, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[80px]">
                  <div className="text-2xl font-bold mb-1">{displayTotalVideos}</div>
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

        {/* About This Course - continues with rest of component... */}
        {/* I'll continue from the "About This Course" section */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 mb-8 border border-gray-200 shadow-sm"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About This Course</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you're tired of low sales, dead books, wasted ad spend, and confusing KDP advice, this course was created for you. The Amazon KDP Success Guide Course is a step-by-step, proven system built around DSAM Blueprint—a framework designed to help you publish evergreen, high-content books that generate consistent monthly income, not one-time spikes.
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-primary" />
                <span>{displayTotalVideos} lessons</span>
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
              {displayTotalVideos} videos • {calculateTotalDuration()}
            </span>
          </div>

          {/* Enrollment Required Message for Non-Enrolled Users */}
          {!isEnrolled && (
            <div className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Course Enrollment Required
                  </h3>
                  <p className="text-gray-700 mb-4">
                    To access all video lessons and start your learning journey, please enroll in this course through the Courses page.
                  </p>
                  <button
                    onClick={handleEnrollRedirect}
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Go to Courses Page to Enroll
                  </button>
                </div>
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
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
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
                    className="border-t border-gray-200 bg-white"
                  >
                    {module.videos.map((video) => {
                      const isCompleted = progress?.completedVideos.some(
                        cv => cv.lessonId === video._id
                      ) || false;

                      return (
                        <button
                          key={video._id}
                          onClick={() => handleVideoClick(video)}
                          disabled={!isEnrolled}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <div className="flex items-center gap-3 flex-1 text-left">
                            <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors flex-shrink-0">
                              {isEnrolled ? (
                                isCompleted ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <PlayCircle className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                                )
                              ) : (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <span className={`text-sm md:text-base lg:text-base group-hover:text-primary transition-colors font-medium ${
                              isCompleted ? 'text-gray-500' : 'text-gray-700'
                            }`}>
                              {video.title}
                            </span>
                          </div>
                          <span className="text-sm md:text-base text-gray-600 ml-3 flex-shrink-0">
                            {video.duration}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-center mt-8">
            {isEnrolled ? (
              <motion.button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-colors text-base font-semibold shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlayCircle className="w-5 h-5" />
                {courseStarted ? "Continue Learning" : "Start Learning"}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleEnrollRedirect}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors text-base font-semibold shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lock className="w-5 h-5" />
                Go to Courses to Enroll
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
