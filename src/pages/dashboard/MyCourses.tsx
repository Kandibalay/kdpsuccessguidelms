import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, Award, TrendingUp, Play, Lock, Loader2, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/apiConfig';
import { 
  getCourseProgress, 
  getCompletedVideoCount, 
  getCompletionPercentage,
  CourseProgress 
} from '../../utils/courseProgress';
import { getUserEnrollments, Enrollment } from '../../utils/enrollmentUtils';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  modules: any[];
  totalVideos: number;
  instructor: {
    fullName: string;
  };
  createdAt: string;
}

// Helper function to extract course ID (handles string, object, or null)
const extractCourseId = (course: string | null | { _id: string; [key: string]: any }): string | null => {
  if (!course) return null;
  if (typeof course === 'string') return course;
  if (typeof course === 'object' && course._id) return course._id;
  return null;
};

export function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [progressMap, setProgressMap] = useState<Map<string, CourseProgress | null>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch user enrollments
        const enrollmentResponse = await getUserEnrollments();
        const enrollments = enrollmentResponse.enrollments || [];

        if (enrollments.length === 0) {
          setEnrolledCourses([]);
          setIsLoading(false);
          return;
        }

        // Extract unique course IDs from enrollments
        const courseIds = new Set<string>();
        enrollments.forEach((enrollment: Enrollment) => {
          // Extract course ID using helper function
          const courseId = extractCourseId(enrollment.course);
          if (courseId) {
            courseIds.add(courseId);
          }
          
          // Also check completedVideos for course IDs
          enrollment.completedVideos?.forEach(video => {
            if (video.courseId) {
              courseIds.add(video.courseId);
            }
          });
        });

        if (courseIds.size === 0) {
          setEnrolledCourses([]);
          setIsLoading(false);
          return;
        }

        // Fetch full course details for enrolled courses
        const coursesPromises = Array.from(courseIds).map(courseId => {
          return api.get(`/courses/${courseId}`).catch(err => {
            return null;
          });
        });

        const coursesResponses = await Promise.all(coursesPromises);
        const courses = coursesResponses
          .filter(res => res !== null)
          .map(res => res.data.course)
          .filter(Boolean);

        setEnrolledCourses(courses);

        // Fetch progress for all enrolled courses
        const progressPromises = courses.map(course => {
          return getCourseProgress(course._id);
        });
        const progressResults = await Promise.all(progressPromises);

        const newProgressMap = new Map<string, CourseProgress | null>();
        courses.forEach((course, index) => {
          newProgressMap.set(course._id, progressResults[index]);
        });

        setProgressMap(newProgressMap);
      } catch (err) {
        setError('Failed to load enrolled courses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Calculate total duration for a course
  const calculateCourseDuration = (course: Course) => {
    let totalMinutes = 0;
    course.modules.forEach(module => {
      module.videos?.forEach((video: any) => {
        const [minutes, seconds] = video.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Your enrolled courses and learning progress</p>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your courses...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Your enrolled courses and learning progress</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state - No enrolled courses
  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Your enrolled courses and learning progress</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-12 text-center border border-orange-200"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingCart className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Enrolled Courses Yet</h2>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Start your KDP publishing journey today!
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            Browse Courses
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">
          You're enrolled in {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'}
        </p>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course, index) => {
          const progress = progressMap.get(course._id);
          const completedVideos = progress ? getCompletedVideoCount(progress) : 0;
          const progressPercentage = progress ? getCompletionPercentage(progress, course.totalVideos) : 0;
          const hasStarted = progress ? progress.completedVideos.length > 0 : false;

          return (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all group"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={course.thumbnail.url}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Course+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Progress Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-900">
                    {progressPercentage}% Complete
                  </div>
                </div>

                {/* Enrolled Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Enrolled
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Progress</span>
                    <span className="text-xs font-semibold text-orange-600">{progressPercentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600">
                      {completedVideos} of {course.totalVideos} lessons
                    </span>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.totalVideos} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{calculateCourseDuration(course)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/courses/${course._id}`}
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-sm no-underline"
                >
                  <Play className="w-4 h-4" />
                  {hasStarted ? 'Continue Learning' : 'Start Learning'}
                </Link>

                {/* Instructor */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                      {course.instructor.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Instructor</p>
                      <p className="text-sm font-medium text-gray-900">{course.instructor.fullName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Learning Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{enrolledCourses.length}</p>
            <p className="text-sm text-gray-600">Enrolled Courses</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {Array.from(progressMap.values()).reduce((total, progress) => {
                return total + (progress ? getCompletedVideoCount(progress) : 0);
              }, 0)}
            </p>
            <p className="text-sm text-gray-600">Lessons Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round(
                Array.from(progressMap.entries()).reduce((total, [courseId, progress]) => {
                  const course = enrolledCourses.find(c => c._id === courseId);
                  if (!course || !progress) return total;
                  return total + getCompletionPercentage(progress, course.totalVideos);
                }, 0) / (enrolledCourses.length || 1)
              )}%
            </p>
            <p className="text-sm text-gray-600">Average Progress</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
