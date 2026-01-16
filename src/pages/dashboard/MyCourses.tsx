import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, Award, BookOpen, Loader2 } from 'lucide-react';
import api from '../../utils/apiConfig'; // Secure axios instance
import { 
  getMultipleCourseProgress, 
  getAllCoursesWithProgress, 
  getCompletedVideoCount,
  getCompletionPercentage,
  CourseProgress 
} from '../../utils/courseProgress';

interface Course {
  _id: string;
  title: string;
  thumbnail: {
    url: string;
  };
  totalVideos: number;
  modules: any[];
  instructor: {
    fullName: string;
  };
  createdAt: string;
  slug: string;
}

export function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Map<string, CourseProgress | null>>(new Map());

  useEffect(() => {
    const fetchMyCoursesAndProgress = async () => {
      setIsLoading(true);
      try {
        // Fetch all courses
        const response = await api.get('/courses');
        const fetchedCourses = response.data.courses || [];
        setCourses(fetchedCourses);
        
        // console.log('📊 [MyCourses] Courses loaded:', fetchedCourses.length);
        
        // Fetch progress for all courses
        const courseIds = fetchedCourses.map((course: Course) => course._id);
        const progress = await getMultipleCourseProgress(courseIds);
        setProgressMap(progress);
        
        // console.log('📊 [MyCourses] Progress loaded for all courses');
      } catch (err) {
        // console.error('❌ [MyCourses] Error:', err);
        setError('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCoursesAndProgress();
  }, []);

  // Calculate progress percentage for a specific course
  const calculateProgress = (courseId: string, totalVideos: number) => {
    const progress = progressMap.get(courseId) ?? null; // Convert undefined to null
    return getCompletionPercentage(progress, totalVideos);
  };

  // Calculate total duration
  const calculateDuration = (modules: any[]) => {
    let totalMinutes = 0;
    modules.forEach(module => {
      module.videos?.forEach((video: any) => {
        const [minutes, seconds] = video.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get total completed videos across all courses
  const getTotalCompletedVideos = () => {
    let total = 0;
    progressMap.forEach((progress) => {
      if (progress) {
        total += getCompletedVideoCount(progress);
      }
    });
    return total;
  };

  // Get active courses count (courses with progress)
  const getActiveCourseCount = () => {
    const coursesWithProgress = getAllCoursesWithProgress(progressMap);
    return coursesWithProgress.length;
  };

  // Get certificates count (courses with 100% completion)
  const getCertificatesCount = () => {
    return courses.filter(course => {
      const progress = calculateProgress(course._id, course.totalVideos);
      return progress === 100;
    }).length;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalCompletedVideos = getTotalCompletedVideos();
  const activeCoursesCount = getActiveCourseCount();
  const certificatesCount = getCertificatesCount();

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-lg text-gray-600">
            Continue learning and track your progress
          </p>
        </div>

        {/* Stats - Synced with Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <PlayCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCompletedVideos}</p>
                <p className="text-sm text-gray-600">Videos Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{certificatesCount}</p>
                <p className="text-sm text-gray-600">Certificates Earned</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course, index) => {
            const progress = calculateProgress(course._id, course.totalVideos);
            const duration = calculateDuration(course.modules);
            const courseProgress = progressMap.get(course._id) ?? null; // Convert undefined to null
            const completedCount = courseProgress ? getCompletedVideoCount(courseProgress) : 0;
            const courseStarted = courseProgress ? courseProgress.completedVideos.length > 0 : false;
            
            return (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Thumbnail */}
                  <div className="relative h-48 md:h-auto">
                    <img
                      src={course.thumbnail?.url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                        {progress}% Complete
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600">by {course.instructor.fullName}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Course Progress
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {completedCount}/{course.totalVideos} videos completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <PlayCircle className="w-4 h-4" />
                        {course.totalVideos} videos
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        Enrolled {formatDate(course.createdAt)}
                      </div>
                    </div>

                    {/* Status */}
                    {courseStarted && (
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Status:</p>
                        <p className="font-medium text-gray-900">
                          {progress === 100 ? 'Completed! 🎉' : 'In Progress'}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Link
                        to={`/courses/${course._id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                      >
                        <PlayCircle className="w-5 h-5" />
                        {courseStarted ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                      <Link
                        to={`/course-overview/${course._id}`}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State (if no courses) */}
        {courses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Courses Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your learning journey by enrolling in a course
            </p>
            <Link
              to="/courses"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Browse Courses
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

