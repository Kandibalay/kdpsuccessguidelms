// import React from 'react';
// import { motion } from 'motion/react';
// import { GraduationCap, Sparkles, Award, Timer, TrendingUp, Play, Star, Users, Clock, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { hasCourseStarted, getCompletedVideoCount, getAllCoursesWithProgress } from '../../utils/courseProgress';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   thumbnail: {
//     url: string;
//   };
//   modules: any[];
//   totalVideos: number;
//   averageRating: number;
//   totalRatings: number;
//   instructor: {
//     fullName: string;
//   };
// }

// export function Overview() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [progressData, setProgressData] = useState<{[key: string]: number}>({});
//   const { auth } = useAuth(); 

//   // Get first name
//   const getFirstName = () => {
//     if (!auth.user?.fullName) return 'there';
//     const nameParts = auth.user.fullName.trim().split(' ').filter(Boolean);
//     return nameParts.length > 0 ? nameParts[0] : 'there';
//   };

//   // Fetch courses from API
//   useEffect(() => {
//     const fetchCourses = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('/courses');
//         const fetchedCourses = response.data.courses || [];
//         setCourses(fetchedCourses);
        
//         // Get progress for each course
//         const progress: {[key: string]: number} = {};
//         fetchedCourses.forEach((course: Course) => {
//           progress[course._id] = getCompletedVideoCount(course._id);
//         });
//         setProgressData(progress);
        
//         console.log('📊 Courses loaded:', fetchedCourses.length);
//         console.log('📊 Progress data:', progress);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   // Calculate total duration from courses
//   const calculateTotalDuration = () => {
//     if (courses.length === 0) return '0h';
    
//     let totalMinutes = 0;
//     courses.forEach(course => {
//       course.modules.forEach(module => {
//         module.videos?.forEach((video: any) => {
//           const [minutes, seconds] = video.duration.split(':').map(Number);
//           totalMinutes += minutes + (seconds / 60);
//         });
//       });
//     });
    
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = Math.round(totalMinutes % 60);
//     return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
//   };

//   // Get total completed videos across all courses
//   const getTotalCompletedVideos = () => {
//     return Object.values(progressData).reduce((sum, count) => sum + count, 0);
//   };

//   // Count courses with progress (started courses)
//   const getActiveCourseCount = () => {
//     const coursesWithProgress = getAllCoursesWithProgress();
//     return coursesWithProgress.length;
//   };

//   // Get first course (active course)
//   const activeCourse = courses[0];
//   const activeCourseId = activeCourse?._id;
//   const activeCourseProgress = activeCourseId ? progressData[activeCourseId] || 0 : 0;
//   const totalVideos = activeCourse?.totalVideos || 0;
//   const progressPercentage = totalVideos > 0 ? Math.round((activeCourseProgress / totalVideos) * 100) : 0;
//   const courseStarted = activeCourseId ? hasCourseStarted(activeCourseId) : false;
  
//   const totalCompletedVideos = getTotalCompletedVideos();
//   const activeCoursesCount = getActiveCourseCount();

//   const stats = [
//     {
//       label: 'Enrolled Courses',
//       value: courses.length.toString(),
//       icon: GraduationCap,
//       status: 'On track',
//       bgColor: 'bg-blue-50',
//       iconColor: 'text-blue-600',
//       borderColor: 'border-blue-100',
//     },
//     {
//       label: 'Active Courses',
//       value: activeCoursesCount.toString(),
//       icon: Sparkles,
//       status: 'In Progress',
//       bgColor: 'bg-orange-50',
//       iconColor: 'text-orange-600',
//       borderColor: 'border-orange-100',
//     },
//     {
//       label: 'Completed Lessons',
//       value: totalCompletedVideos.toString(),
//       icon: Award,
//       status: 'Keep going!',
//       bgColor: 'bg-green-50',
//       iconColor: 'text-green-600',
//       borderColor: 'border-green-100',
//     },
//     {
//       label: 'Total Study Time',
//       value: calculateTotalDuration(),
//       icon: Timer,
//       status: 'On track',
//       bgColor: 'bg-purple-50',
//       iconColor: 'text-purple-600',
//       borderColor: 'border-purple-100',
//     },
//   ];

//   // Calculate module breakdown percentages
//   const calculateModuleBreakdown = () => {
//     if (!activeCourse || activeCourse.modules.length === 0) return [];
    
//     const totalModuleVideos = activeCourse.totalVideos;
    
//     return activeCourse.modules.map((module, index) => {
//       const videoCount = module.videos?.length || 0;
//       const percentage = Math.round((videoCount / totalModuleVideos) * 100);
      
//       const colors = [
//         'bg-primary',
//         'bg-orange-500',
//         'bg-blue-500',
//         'bg-amber-500',
//         'bg-purple-500',
//         'bg-green-500'
//       ];
      
//       return {
//         label: module.title,
//         value: percentage,
//         color: colors[index % colors.length]
//       };
//     }).slice(0, 4); // Show first 4 modules
//   };

//   const moduleBreakdown = calculateModuleBreakdown();

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-8"
//       >
//         <h1 className="text-2xl font-semibold text-gray-900 mb-1">Good Day, {getFirstName()}!  👋</h1>
//         <p className="text-sm text-gray-600">Welcome back to your KDP journey</p>
//       </motion.div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-600 mb-3">{stat.label}</p>
//                   <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//                 </div>
//                 <div className={`w-14 h-14 ${stat.bgColor} ${stat.borderColor} border-2 rounded-xl flex items-center justify-center flex-shrink-0`}>
//                   <Icon className={`w-7 h-7 ${stat.iconColor}`} />
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <TrendingUp className="w-4 h-4 text-green-500" />
//                 <span className="text-gray-600">{stat.status}</span>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
//         </div>
//       ) : (
//         <>
//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
//             {/* My Active Course */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-8 border border-blue-100 shadow-sm"
//             >
//               {activeCourse ? (
//                 <>
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold text-gray-900">My Active Course</h2>
//                     <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm">
//                       In Progress
//                     </span>
//                   </div>

//                   <div className="space-y-6">
//                     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                       <div className="flex items-start justify-between mb-4">
//                         <div>
//                           <span className="text-xs text-orange-600 uppercase tracking-wider mb-2 block font-semibold bg-orange-50 px-3 py-1 rounded-full inline-block">
//                             PUBLISHING
//                           </span>
//                           <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">{activeCourse.title}</h3>
//                           <p className="text-sm text-gray-600 leading-relaxed">
//                             {activeCourse.description}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-6 mb-4 flex-wrap">
//                         <div className="flex items-center gap-2">
//                           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
//                             <span className="text-white text-sm font-semibold">
//                               {activeCourse.instructor.fullName.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">{activeCourse.instructor.fullName}</p>
//                             <p className="text-xs text-gray-500">Instructor</p>
//                           </div>
//                         </div>
//                         {activeCourse.averageRating > 0 && (
//                           <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-orange-50 px-3 py-1.5 rounded-full">
//                             <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
//                             <span className="font-medium">{activeCourse.averageRating.toFixed(1)}</span>
//                           </div>
//                         )}
//                         {activeCourse.totalRatings > 0 && (
//                           <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-blue-50 px-3 py-1.5 rounded-full">
//                             <Users className="w-4 h-4 text-blue-600" />
//                             <span className="font-medium">{activeCourse.totalRatings}+ students</span>
//                           </div>
//                         )}
//                         <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-purple-50 px-3 py-1.5 rounded-full">
//                           <Clock className="w-4 h-4 text-purple-600" />
//                           <span className="font-medium">{calculateTotalDuration()}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="text-sm font-semibold text-gray-900">Course Progress</span>
//                         <span className="text-lg font-bold text-orange-600">{progressPercentage}%</span>
//                       </div>
//                       <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
//                         <div 
//                           className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 shadow-sm" 
//                           style={{ width: `${progressPercentage}%` }} 
//                         />
//                       </div>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-semibold text-gray-900">{activeCourseProgress}</span> of <span className="font-semibold text-gray-900">{totalVideos}</span> lessons completed
//                       </p>
//                     </div>

//                     {activeCourse?._id ? (
//                       <Link
//                         to={`/courses/${activeCourse._id}`}
//                         className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold"
//                       >
//                         <Play className="w-5 h-5" />
//                         {courseStarted ? 'Continue Learning' : 'Start Learning'}
//                       </Link>
//                     ) : (
//                       <button
//                         disabled
//                         className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl cursor-not-allowed font-semibold"
//                       >
//                         <Play className="w-5 h-5" />
//                         Loading Course...
//                       </button>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <GraduationCap className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <p className="text-gray-600 mb-4">No active courses yet</p>
//                   <Link
//                     to="/courses"
//                     className="inline-block text-primary hover:text-accent transition-colors font-semibold"
//                   >
//                     Browse Courses →
//                   </Link>
//                 </div>
//               )}
//             </motion.div>

//             {/* Right Sidebar */}
//             <div className="space-y-8">
//               {/* Course Breakdown */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 border border-purple-100 shadow-sm"
//               >
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Course Breakdown</h3>
                
//                 {activeCourse ? (
//                   <>
//                     {/* Donut Chart Representation */}
//                     <div className="flex items-center justify-center mb-6">
//                       <div className="relative w-40 h-40">
//                         <svg className="w-full h-full transform -rotate-90">
//                           <circle
//                             cx="80"
//                             cy="80"
//                             r="70"
//                             fill="none"
//                             stroke="#F3F4F6"
//                             strokeWidth="20"
//                           />
//                           {moduleBreakdown.map((module, index) => {
//                             const previousTotal = moduleBreakdown
//                               .slice(0, index)
//                               .reduce((sum, m) => sum + m.value, 0);
                            
//                             const colors = ['#1B5E8F', '#F97316', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981'];
                            
//                             return (
//                               <circle
//                                 key={index}
//                                 cx="80"
//                                 cy="80"
//                                 r="70"
//                                 fill="none"
//                                 stroke={colors[index % colors.length]}
//                                 strokeWidth="20"
//                                 strokeDasharray={`${(module.value / 100) * 440} 440`}
//                                 strokeDashoffset={`-${(previousTotal / 100) * 440}`}
//                               />
//                             );
//                           })}
//                         </svg>
//                         <div className="absolute inset-0 flex items-center justify-center flex-col">
//                           <p className="text-xs text-gray-600 mb-1">Total</p>
//                           <p className="text-3xl font-bold text-gray-900">{totalVideos}</p>
//                           <p className="text-xs text-gray-500">Lessons</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       {moduleBreakdown.map((item) => (
//                         <div key={item.label} className="flex items-center justify-between text-sm bg-white rounded-lg p-3 border border-gray-100">
//                           <div className="flex items-center gap-3 flex-1">
//                             <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0 shadow-sm`} />
//                             <span className="text-gray-700 font-medium truncate">{item.label}</span>
//                           </div>
//                           <span className="text-gray-900 font-bold ml-2">{item.value}%</span>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                       <Award className="w-8 h-8 text-gray-400" />
//                     </div>
//                     <p className="text-gray-600 text-sm">No course data available</p>
//                   </div>
//                 )}
//               </motion.div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles, Award, Timer, TrendingUp, Play, Star, Users, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMultipleCourseProgress, getAllCoursesWithProgress, getCompletedVideoCount, getCompletionPercentage, CourseProgress } from '../../utils/courseProgress';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/apiConfig'; // Secure axios instance

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  modules: any[];
  totalVideos: number;
  averageRating: number;
  totalRatings: number;
  instructor: {
    fullName: string;
  };
}

export function Overview() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progressMap, setProgressMap] = useState<Map<string, CourseProgress | null>>(new Map());
  const { auth } = useAuth(); 

  // Get first name
  const getFirstName = () => {
    if (!auth.user?.fullName) return 'there';
    const nameParts = auth.user.fullName.trim().split(' ').filter(Boolean);
    return nameParts.length > 0 ? nameParts[0] : 'there';
  };

  // Fetch courses and their progress from API
  useEffect(() => {
    const fetchCoursesAndProgress = async () => {
      setIsLoading(true);
      try {
        // Fetch all courses
        const response = await api.get('/courses');
        const fetchedCourses = response.data.courses || [];
        setCourses(fetchedCourses);
        
        // console.log('📊 [Overview] Courses loaded:', fetchedCourses.length);
        
        // Fetch progress for all courses
        const courseIds = fetchedCourses.map((course: Course) => course._id);
        const progress = await getMultipleCourseProgress(courseIds);
        setProgressMap(progress);
        
        // console.log('📊 [Overview] Progress loaded for all courses');
      } catch (error) {
        // console.error('❌ [Overview] Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesAndProgress();
  }, []);

  // Calculate total duration from courses
  const calculateTotalDuration = () => {
    if (courses.length === 0) return '0h';
    
    let totalMinutes = 0;
    courses.forEach(course => {
      course.modules.forEach(module => {
        module.videos?.forEach((video: any) => {
          const [minutes, seconds] = video.duration.split(':').map(Number);
          totalMinutes += minutes + (seconds / 60);
        });
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
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

  // Count courses with progress (started courses)
  const getActiveCourseCount = () => {
    const coursesWithProgress = getAllCoursesWithProgress(progressMap);
    return coursesWithProgress.length;
  };

  // Get first course (active course)
  const activeCourse = courses[0];
  const activeCourseId = activeCourse?._id;
  const activeCourseProgress = activeCourseId ? progressMap.get(activeCourseId) : null;
  const totalVideos = activeCourse?.totalVideos || 0;
  const completedVideosCount = activeCourseProgress ? getCompletedVideoCount(activeCourseProgress) : 0;
  const progressPercentage = activeCourseProgress ? getCompletionPercentage(activeCourseProgress, totalVideos) : 0;
  const courseStarted = activeCourseProgress ? activeCourseProgress.completedVideos.length > 0 : false;
  
  const totalCompletedVideos = getTotalCompletedVideos();
  const activeCoursesCount = getActiveCourseCount();

  const stats = [
    {
      label: 'Enrolled Courses',
      value: courses.length.toString(),
      icon: GraduationCap,
      status: 'On track',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      label: 'Active Courses',
      value: activeCoursesCount.toString(),
      icon: Sparkles,
      status: 'In Progress',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-100',
    },
    {
      label: 'Completed Lessons',
      value: totalCompletedVideos.toString(),
      icon: Award,
      status: 'Keep going!',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-100',
    },
    {
      label: 'Total Study Time',
      value: calculateTotalDuration(),
      icon: Timer,
      status: 'On track',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100',
    },
  ];

  // Calculate module breakdown percentages
  const calculateModuleBreakdown = () => {
    if (!activeCourse || activeCourse.modules.length === 0) return [];
    
    const totalModuleVideos = activeCourse.totalVideos;
    
    return activeCourse.modules.map((module, index) => {
      const videoCount = module.videos?.length || 0;
      const percentage = Math.round((videoCount / totalModuleVideos) * 100);
      
      const colors = [
        'bg-primary',
        'bg-orange-500',
        'bg-blue-500',
        'bg-amber-500',
        'bg-purple-500',
        'bg-green-500'
      ];
      
      return {
        label: module.title,
        value: percentage,
        color: colors[index % colors.length]
      };
    }).slice(0, 4);
  };

  const moduleBreakdown = calculateModuleBreakdown();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Good Day, {getFirstName()}!  👋</h1>
        <p className="text-sm text-gray-600">Welcome back to your KDP journey</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} ${stat.borderColor} border-2 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">{stat.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            {/* My Active Course */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-8 border border-blue-100 shadow-sm"
            >
              {activeCourse ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">My Active Course</h2>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm">
                      In Progress
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs text-orange-600 uppercase tracking-wider mb-2 block font-semibold bg-orange-50 px-3 py-1 rounded-full inline-block">
                            PUBLISHING
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">{activeCourse.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {activeCourse.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
                            <span className="text-white text-sm font-semibold">
                              {activeCourse.instructor.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activeCourse.instructor.fullName}</p>
                            <p className="text-xs text-gray-500">Instructor</p>
                          </div>
                        </div>
                        {activeCourse.averageRating > 0 && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-orange-50 px-3 py-1.5 rounded-full">
                            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="font-medium">{activeCourse.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                        {activeCourse.totalRatings > 0 && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-blue-50 px-3 py-1.5 rounded-full">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{activeCourse.totalRatings}+ students</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-sm text-gray-700 bg-purple-50 px-3 py-1.5 rounded-full">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{calculateTotalDuration()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-900">Course Progress</span>
                        <span className="text-lg font-bold text-orange-600">{progressPercentage}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 shadow-sm" 
                          style={{ width: `${progressPercentage}%` }} 
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{completedVideosCount}</span> of <span className="font-semibold text-gray-900">{totalVideos}</span> lessons completed
                      </p>
                    </div>

                    {activeCourse?._id ? (
                      <Link
                        to={`/courses/${activeCourse._id}`}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold"
                      >
                        <Play className="w-5 h-5" />
                        {courseStarted ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl cursor-not-allowed font-semibold"
                      >
                        <Play className="w-5 h-5" />
                        Loading Course...
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">No active courses yet</p>
                  <Link
                    to="/courses"
                    className="inline-block text-primary hover:text-accent transition-colors font-semibold"
                  >
                    Browse Courses →
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Course Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 border border-purple-100 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Breakdown</h3>
                
                {activeCourse ? (
                  <>
                    {/* Donut Chart Representation */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="#F3F4F6"
                            strokeWidth="20"
                          />
                          {moduleBreakdown.map((module, index) => {
                            const previousTotal = moduleBreakdown
                              .slice(0, index)
                              .reduce((sum, m) => sum + m.value, 0);
                            
                            const colors = ['#1B5E8F', '#F97316', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981'];
                            
                            return (
                              <circle
                                key={index}
                                cx="80"
                                cy="80"
                                r="70"
                                fill="none"
                                stroke={colors[index % colors.length]}
                                strokeWidth="20"
                                strokeDasharray={`${(module.value / 100) * 440} 440`}
                                strokeDashoffset={`-${(previousTotal / 100) * 440}`}
                              />
                            );
                          })}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <p className="text-xs text-gray-600 mb-1">Total</p>
                          <p className="text-3xl font-bold text-gray-900">{totalVideos}</p>
                          <p className="text-xs text-gray-500">Lessons</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {moduleBreakdown.map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-sm bg-white rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0 shadow-sm`} />
                            <span className="text-gray-700 font-medium truncate w-32">{item.label}</span>
                          </div>
                          <span className="text-gray-900 font-bold ml-2">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm">No course data available</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
