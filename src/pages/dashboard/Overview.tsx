// import React from 'react';
// import { motion } from 'motion/react';
// import { GraduationCap, Sparkles, Award, Timer, TrendingUp, Play, Star, Users, Clock, Loader2, ArrowRight } from 'lucide-react';
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { getMultipleCourseProgress, getAllCoursesWithProgress, getCompletedVideoCount, getCompletionPercentage, CourseProgress } from '../../utils/courseProgress';
// import { useAuth } from '../../context/AuthContext';
// import { useEnrollment } from '../../hooks/useEnrollment';
// import { getEnrolledCoursesCount } from '../../utils/enrollmentUtils';
// import api from '../../utils/apiConfig';

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
//   const [progressMap, setProgressMap] = useState<Map<string, CourseProgress | null>>(new Map());
//   const [enrolledCount, setEnrolledCount] = useState<number>(0);
//   const { auth } = useAuth();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // Payment verification states
//   const shouldVerify = searchParams.get('verify') === 'true';
//   const [isVerifying, setIsVerifying] = useState(shouldVerify);
//   const [verificationAttempts, setVerificationAttempts] = useState(0);
//   const MAX_ATTEMPTS = 20;

//   // Get first name
//   const getFirstName = () => {
//     if (!auth.user?.fullName) return 'there';
//     const nameParts = auth.user.fullName.trim().split(' ').filter(Boolean);
//     return nameParts.length > 0 ? nameParts[0] : 'there';
//   };

//   // Fetch courses, progress, and enrollment count
//   useEffect(() => {
//     const fetchCoursesAndProgress = async () => {
//       setIsLoading(true);
//       try {
//         const response = await api.get('/courses');
//         const fetchedCourses = response.data.courses || [];
//         setCourses(fetchedCourses);
        
//         const enrolledCoursesCount = await getEnrolledCoursesCount();
//         setEnrolledCount(enrolledCoursesCount);
        
//         const courseIds = fetchedCourses.map((course: Course) => course._id);
//         const progress = await getMultipleCourseProgress(courseIds);
//         setProgressMap(progress);
//       } catch (error) {
//         // Error handled silently
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCoursesAndProgress();
//   }, []);

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

//   const getTotalCompletedVideos = () => {
//     let total = 0;
//     progressMap.forEach((progress) => {
//       if (progress) {
//         total += getCompletedVideoCount(progress);
//       }
//     });
//     return total;
//   };

//   const getActiveCourseCount = () => {
//     const coursesWithProgress = getAllCoursesWithProgress(progressMap);
//     return coursesWithProgress.length;
//   };

//   const activeCourse = courses[0];
//   const activeCourseId = activeCourse?._id;
  
//   // Use enrollment hook
//   const { isEnrolled, isChecking: checkingEnrollment, recheckEnrollment } = useEnrollment(activeCourseId);
  
//   const activeCourseProgress = activeCourseId ? progressMap.get(activeCourseId) : null;
//   const totalVideos = activeCourse?.totalVideos || 0;
//   const completedVideosCount = activeCourseProgress ? getCompletedVideoCount(activeCourseProgress) : 0;
//   const progressPercentage = activeCourseProgress ? getCompletionPercentage(activeCourseProgress, totalVideos) : 0;
//   const courseStarted = activeCourseProgress ? activeCourseProgress.completedVideos.length > 0 : false;
  
//   const totalCompletedVideos = getTotalCompletedVideos();
//   const activeCoursesCount = getActiveCourseCount();

//   // Payment verification polling
//   useEffect(() => {
//     if (!shouldVerify || !activeCourse?._id) return;

//     let pollInterval: NodeJS.Timeout;

//     const startPolling = () => {
//       pollInterval = setInterval(async () => {
//         await recheckEnrollment();
//         const newCount = await getEnrolledCoursesCount();
//         setEnrolledCount(newCount);
        
//         setVerificationAttempts(prev => {
//           const newAttempts = prev + 1;
          
//           if (newAttempts >= MAX_ATTEMPTS) {
//             clearInterval(pollInterval);
//             setIsVerifying(false);
//             searchParams.delete('verify');
//             setSearchParams(searchParams);
//           }
          
//           return newAttempts;
//         });
//       }, 3000);
//     };

//     startPolling();

//     return () => {
//       if (pollInterval) clearInterval(pollInterval);
//     };
//   }, [shouldVerify, activeCourse?._id]);

//   // Stop verification when enrollment detected
//   useEffect(() => {
//     if (isEnrolled && shouldVerify) {
//       setIsVerifying(false);
//       searchParams.delete('verify');
//       setSearchParams(searchParams);
//     }
//   }, [isEnrolled, shouldVerify]);

//   const stats = [
//     {
//       label: 'Enrolled Courses',
//       value: enrolledCount.toString(),
//       icon: GraduationCap,
//       status: enrolledCount > 0 ? 'On track' : 'Not enrolled yet',
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
//     }).slice(0, 4);
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

//       {/* Verification Banner */}
//       {isVerifying && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
//         >
//           <div className="flex items-center gap-4">
//             <Loader2 className="w-8 h-8 text-blue-600 animate-spin flex-shrink-0" />
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-blue-900 mb-1">
//                 Verifying Your Payment...
//               </h3>
//               <p className="text-blue-700 text-sm">
//                 We're confirming your enrollment. This usually takes a few seconds.
//                 Attempt {verificationAttempts} of {MAX_ATTEMPTS}
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setIsVerifying(false);
//                 searchParams.delete('verify');
//                 setSearchParams(searchParams);
//               }}
//               className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//             >
//               Dismiss
//             </button>
//           </div>
//           <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-blue-600"
//               initial={{ width: '0%' }}
//               animate={{ width: `${(verificationAttempts / MAX_ATTEMPTS) * 100}%` }}
//               transition={{ duration: 0.3 }}
//             />
//           </div>
//         </motion.div>
//       )}

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
//                     {checkingEnrollment ? (
//                       <span className="px-4 py-1.5 bg-gradient-to-r from-gray-300 to-gray-400 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-2">
//                         <Loader2 className="w-3 h-3 animate-spin" />
//                         Checking...
//                       </span>
//                     ) : isEnrolled ? (
//                       <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm">
//                         ✓ Enrolled
//                       </span>
//                     ) : (
//                       <span className="px-4 py-1.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs font-semibold rounded-full shadow-sm">
//                         Not Enrolled
//                       </span>
//                     )}
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

//                     {/* Progress Bar - Only show if enrolled */}
//                     {isEnrolled && !checkingEnrollment && (
//                       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                         <div className="flex items-center justify-between mb-3">
//                           <span className="text-sm font-semibold text-gray-900">Course Progress</span>
//                           <span className="text-lg font-bold text-orange-600">{progressPercentage}%</span>
//                         </div>
//                         <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
//                           <div 
//                             className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 shadow-sm" 
//                             style={{ width: `${progressPercentage}%` }} 
//                           />
//                         </div>
//                         <p className="text-sm text-gray-600">
//                           <span className="font-semibold text-gray-900">{completedVideosCount}</span> of <span className="font-semibold text-gray-900">{totalVideos}</span> lessons completed
//                         </p>
//                       </div>
//                     )}

//                     {/* Action Button */}
//                     {activeCourse?._id && (
//                       checkingEnrollment ? (
//                         <button
//                           disabled
//                           className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl cursor-not-allowed font-semibold"
//                         >
//                           <Loader2 className="w-5 h-5 animate-spin" />
//                           Checking Enrollment...
//                         </button>
//                       ) : isEnrolled ? (
//                         <Link
//                           to={`/courses/${activeCourse._id}`}
//                           className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold no-underline"
//                         >
//                           <Play className="w-5 h-5" />
//                           {courseStarted ? 'Continue Learning' : 'Start Learning'}
//                         </Link>
//                       ) : (
//                         <button
//                           onClick={() => navigate('/courses')}
//                           className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold"
//                         >
//                           <ArrowRight className="w-5 h-5" />
//                           Go to Courses to Enroll
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <GraduationCap className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <p className="text-gray-600 mb-4">No courses available yet</p>
//                   <button
//                     onClick={() => navigate('/courses')}
//                     className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
//                   >
//                     Browse Courses <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </motion.div>

//             {/* Right Sidebar - Course Breakdown */}
//             <div className="space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 border border-purple-100 shadow-sm"
//               >
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Course Breakdown</h3>
                
//                 {checkingEnrollment ? (
//                   <div className="flex items-center justify-center py-12">
//                     <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
//                   </div>
//                 ) : activeCourse && isEnrolled ? (
//                   <>
//                     <div className="flex items-center justify-center mb-6">
//                       <div className="relative w-40 h-40">
//                         <svg className="w-full h-full transform -rotate-90">
//                           <circle cx="80" cy="80" r="70" fill="none" stroke="#F3F4F6" strokeWidth="20" />
//                           {moduleBreakdown.map((module, index) => {
//                             const previousTotal = moduleBreakdown.slice(0, index).reduce((sum, m) => sum + m.value, 0);
//                             const colors = ['#1B5E8F', '#F97316', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981'];
//                             return (
//                               <circle
//                                 key={index}
//                                 cx="80" cy="80" r="70"
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
//                             <span className="text-gray-700 font-medium truncate w-32">{item.label}</span>
//                           </div>
//                           <span className="text-gray-900 font-bold ml-2">{item.value}%</span>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : activeCourse ? (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                       <GraduationCap className="w-8 h-8 text-orange-600" />
//                     </div>
//                     <p className="text-gray-700 text-sm font-medium mb-2">Enroll to See Details</p>
//                     <p className="text-gray-600 text-xs mb-4">Course breakdown available after enrollment</p>
//                     <button
//                       onClick={() => navigate('/courses')}
//                       className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-semibold"
//                     >
//                       View Courses <ArrowRight className="w-4 h-4" />
//                     </button>
//                   </div>
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
import { GraduationCap, Sparkles, Award, Timer, TrendingUp, Play, Star, Users, Clock, Loader2, ArrowRight } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMultipleCourseProgress, getAllCoursesWithProgress, getCompletedVideoCount, getCompletionPercentage, CourseProgress } from '../../utils/courseProgress';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../hooks/useEnrollment';
import { getEnrolledCoursesCount } from '../../utils/enrollmentUtils';
import api from '../../utils/apiConfig';

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
  const [enrolledCount, setEnrolledCount] = useState<number>(0);
  const { auth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Payment verification states
  const shouldVerify = searchParams.get('verify') === 'true';
  const [isVerifying, setIsVerifying] = useState(shouldVerify);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const MAX_ATTEMPTS = 20;

  // Get first name
  const getFirstName = () => {
    if (!auth.user?.fullName) return 'there';
    const nameParts = auth.user.fullName.trim().split(' ').filter(Boolean);
    return nameParts.length > 0 ? nameParts[0] : 'there';
  };

  // Fetch courses, progress, and enrollment count
  useEffect(() => {
    const fetchCoursesAndProgress = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/courses');
        const fetchedCourses = response.data.courses || [];
        setCourses(fetchedCourses);
        
        const enrolledCoursesCount = await getEnrolledCoursesCount();
        setEnrolledCount(enrolledCoursesCount);
        
        const courseIds = fetchedCourses.map((course: Course) => course._id);
        const progress = await getMultipleCourseProgress(courseIds);
        setProgressMap(progress);
      } catch (error) {
        // Error handled silently
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesAndProgress();
  }, []);

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
    
    // If there are extra minutes, show hours with +
    if (hours > 0 && mins > 0) {
      return `${hours}h+`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  const getTotalCompletedVideos = () => {
    let total = 0;
    progressMap.forEach((progress) => {
      if (progress) {
        total += getCompletedVideoCount(progress);
      }
    });
    return total;
  };

  const getActiveCourseCount = () => {
    const coursesWithProgress = getAllCoursesWithProgress(progressMap);
    return coursesWithProgress.length;
  };

  const activeCourse = courses[0];
  const activeCourseId = activeCourse?._id;
  
  // Use enrollment hook
  const { isEnrolled, isChecking: checkingEnrollment, recheckEnrollment } = useEnrollment(activeCourseId);
  
  const activeCourseProgress = activeCourseId ? progressMap.get(activeCourseId) : null;
  const totalVideos = activeCourse?.totalVideos || 0;
  const completedVideosCount = activeCourseProgress ? getCompletedVideoCount(activeCourseProgress) : 0;
  const progressPercentage = activeCourseProgress ? getCompletionPercentage(activeCourseProgress, totalVideos) : 0;
  const courseStarted = activeCourseProgress ? activeCourseProgress.completedVideos.length > 0 : false;
  
  const totalCompletedVideos = getTotalCompletedVideos();
  const activeCoursesCount = getActiveCourseCount();

  // Payment verification polling
  useEffect(() => {
    if (!shouldVerify || !activeCourse?._id) return;

    let pollInterval: NodeJS.Timeout;

    const startPolling = () => {
      pollInterval = setInterval(async () => {
        await recheckEnrollment();
        const newCount = await getEnrolledCoursesCount();
        setEnrolledCount(newCount);
        
        setVerificationAttempts(prev => {
          const newAttempts = prev + 1;
          
          if (newAttempts >= MAX_ATTEMPTS) {
            clearInterval(pollInterval);
            setIsVerifying(false);
            searchParams.delete('verify');
            setSearchParams(searchParams);
          }
          
          return newAttempts;
        });
      }, 3000);
    };

    startPolling();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [shouldVerify, activeCourse?._id]);

  // Stop verification when enrollment detected
  useEffect(() => {
    if (isEnrolled && shouldVerify) {
      setIsVerifying(false);
      searchParams.delete('verify');
      setSearchParams(searchParams);
    }
  }, [isEnrolled, shouldVerify]);

  const stats = [
    {
      label: 'Enrolled Courses',
      value: enrolledCount.toString(),
      icon: GraduationCap,
      status: enrolledCount > 0 ? 'On track' : 'Not enrolled yet',
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

      {/* Verification Banner */}
      {isVerifying && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                Verifying Your Payment...
              </h3>
              <p className="text-blue-700 text-sm">
                We're confirming your enrollment. This usually takes a few seconds.
                Attempt {verificationAttempts} of {MAX_ATTEMPTS}
              </p>
            </div>
            <button
              onClick={() => {
                setIsVerifying(false);
                searchParams.delete('verify');
                setSearchParams(searchParams);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
          <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: `${(verificationAttempts / MAX_ATTEMPTS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

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
                    {checkingEnrollment ? (
                      <span className="px-4 py-1.5 bg-gradient-to-r from-gray-300 to-gray-400 text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Checking...
                      </span>
                    ) : isEnrolled ? (
                      <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm">
                        ✓ Enrolled
                      </span>
                    ) : (
                      <span className="px-4 py-1.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs font-semibold rounded-full shadow-sm">
                        Not Enrolled
                      </span>
                    )}
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

                    {/* Progress Bar - Only show if enrolled */}
                    {isEnrolled && !checkingEnrollment && (
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
                    )}

                    {/* Action Button */}
                    {activeCourse?._id && (
                      checkingEnrollment ? (
                        <button
                          disabled
                          className="flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl cursor-not-allowed font-semibold"
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking Enrollment...
                        </button>
                      ) : isEnrolled ? (
                        <Link
                          to={`/courses/${activeCourse._id}`}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold no-underline"
                        >
                          <Play className="w-5 h-5" />
                          {courseStarted ? 'Continue Learning' : 'Start Learning'}
                        </Link>
                      ) : (
                        <button
                          onClick={() => navigate('/courses')}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-semibold"
                        >
                          <ArrowRight className="w-5 h-5" />
                          Go to Courses to Enroll
                        </button>
                      )
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">No courses available yet</p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
                  >
                    Browse Courses <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Right Sidebar - Course Breakdown */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 border border-purple-100 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Breakdown</h3>
                
                {checkingEnrollment ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                  </div>
                ) : activeCourse && isEnrolled ? (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="70" fill="none" stroke="#F3F4F6" strokeWidth="20" />
                          {moduleBreakdown.map((module, index) => {
                            const previousTotal = moduleBreakdown.slice(0, index).reduce((sum, m) => sum + m.value, 0);
                            const colors = ['#1B5E8F', '#F97316', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981'];
                            return (
                              <circle
                                key={index}
                                cx="80" cy="80" r="70"
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
                ) : activeCourse ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-gray-700 text-sm font-medium mb-2">Enroll to See Details</p>
                    <p className="text-gray-600 text-xs mb-4">Course breakdown available after enrollment</p>
                    <button
                      onClick={() => navigate('/courses')}
                      className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      View Courses <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
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
