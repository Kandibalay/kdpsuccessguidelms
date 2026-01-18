// import React, { useState, useEffect } from 'react';
// import { Star, Clock, Users, FileText, Video, Loader2, AlertCircle } from 'lucide-react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../utils/apiConfig';
// import circle from '../assets/black circle.jpg';
// import { useEnrollment } from '../hooks/useEnrollment';

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   thumbnail: {
//     url: string;
//   };
//   price: number;
//   totalVideos: number;
//   modules: any[];
//   averageRating: number;
//   totalRatings: number;
//   instructor: {
//     _id: string;
//     fullName: string;
//     email: string;
//   };
//   slug: string;
// }

// export function FeaturedCourses() {
//   const [course, setCourse] = useState<Course | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // Check if we need to verify payment
//   const shouldVerify = searchParams.get('verify') === 'true';
  
//   // Check enrollment status
//   const { isEnrolled, isChecking: checkingEnrollment, recheckEnrollment } = useEnrollment(course?._id);

//   // Verification states
//   const [isVerifying, setIsVerifying] = useState(shouldVerify);
//   const [verificationAttempts, setVerificationAttempts] = useState(0);
//   const MAX_ATTEMPTS = 20; // 20 attempts × 3 seconds = 60 seconds

//   useEffect(() => {
//     const fetchFeaturedCourse = async () => {
//       setIsLoading(true);
//       try {
//         const response = await api.get('/courses');
//         if (response.data.courses && response.data.courses.length > 0) {
//           setCourse(response.data.courses[0]);
//         }
//       } catch (err: any) {
//         setError('Failed to load course. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFeaturedCourse();
//   }, []);

//   // Poll for enrollment after payment
//   useEffect(() => {
//     if (!shouldVerify || !course?._id) return;

//     let pollInterval: NodeJS.Timeout;

//     const startPolling = () => {
//       pollInterval = setInterval(async () => {
//         console.log(`🔍 Checking enrollment... Attempt ${verificationAttempts + 1}/${MAX_ATTEMPTS}`);
        
//         await recheckEnrollment();
        
//         setVerificationAttempts(prev => {
//           const newAttempts = prev + 1;
          
//           // Stop after max attempts
//           if (newAttempts >= MAX_ATTEMPTS) {
//             clearInterval(pollInterval);
//             setIsVerifying(false);
//             // Remove verify param
//             searchParams.delete('verify');
//             setSearchParams(searchParams);
//           }
          
//           return newAttempts;
//         });
//       }, 3000); // Poll every 3 seconds
//     };

//     // Start polling
//     startPolling();

//     return () => {
//       if (pollInterval) clearInterval(pollInterval);
//     };
//   }, [shouldVerify, course?._id]);

//   // Stop verification when enrollment is detected
//   useEffect(() => {
//     if (isEnrolled && shouldVerify) {
//       console.log('✅ Enrollment confirmed!');
//       setIsVerifying(false);
//       // Remove verify param
//       searchParams.delete('verify');
//       setSearchParams(searchParams);
//     }
//   }, [isEnrolled, shouldVerify]);

//   const calculateDuration = (modules: any[]) => {
//     let totalMinutes = 0;
//     modules.forEach(module => {
//       module.videos?.forEach((video: any) => {
//         const [minutes, seconds] = video.duration.split(':').map(Number);
//         totalMinutes += minutes + (seconds / 60);
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = Math.round(totalMinutes % 60);
//     return hours > 0 ? `${hours}+ hours` : `${mins} mins`;
//   };

//   const handlePurchaseClick = () => {
//     // Redirect to Selar with return URL
//     const currentUrl = window.location.href.split('?')[0]; // Get base URL without params
//     const returnUrl = `${currentUrl}?verify=true`;
//     const selarUrl = `https://selar.co/549892?return_url=${encodeURIComponent(returnUrl)}`;
//     window.location.href = selarUrl;
//   };

//   if (isLoading || checkingEnrollment) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">Loading course...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error || !course) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 flex items-center justify-center min-h-[400px]">
//           <div className="text-center max-w-md">
//             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load course</h3>
//             <p className="text-gray-600 mb-6">{error || 'No courses available'}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="course" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         {/* Verification Banner */}
//         {isVerifying && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
//           >
//             <div className="flex items-center gap-4">
//               <Loader2 className="w-8 h-8 text-blue-600 animate-spin flex-shrink-0" />
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-blue-900 mb-1">
//                   Verifying Your Payment...
//                 </h3>
//                 <p className="text-blue-700 text-sm">
//                   We're confirming your enrollment. This usually takes a few seconds.
//                   Attempt {verificationAttempts} of {MAX_ATTEMPTS}
//                 </p>
//               </div>
//               <button
//                 onClick={() => {
//                   setIsVerifying(false);
//                   searchParams.delete('verify');
//                   setSearchParams(searchParams);
//                 }}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//               >
//                 Dismiss
//               </button>
//             </div>
//             <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
//               <motion.div
//                 className="h-full bg-blue-600"
//                 initial={{ width: '0%' }}
//                 animate={{ width: `${(verificationAttempts / MAX_ATTEMPTS) * 100}%` }}
//                 transition={{ duration: 0.3 }}
//               />
//             </div>
//           </motion.div>
//         )}

//         <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
//           {/* Course Image */}
//           <motion.div 
//             className="relative"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               <motion.img
//                 src={course.thumbnail.url} 
//                 alt={course.title}
//                 className="w-full h-full object-cover"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.4 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
//               {/* Enrollment Badge */}
//               {isEnrolled && (
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
//                 >
//                   ✓ Enrolled
//                 </motion.div>
//               )}

//               <motion.div 
//                 className="absolute bottom-6 left-6 right-36"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
//                   <div className="flex items-center gap-4 mb-3">
//                     <img
//                       src={circle} 
//                       alt={course.instructor.fullName}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div>
//                       <div className="text-gray-900">Created by {course.instructor.fullName}</div>
//                       <div className="text-sm text-primary">KDP Expert & Mentor</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-6 text-sm">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 text-primary fill-primary" />
//                       <span className="text-gray-700">
//                         {course.averageRating > 0 ? course.averageRating.toFixed(1) : '5.0'} 
//                         ({course.totalRatings > 0 ? course.totalRatings : '100+'} reviews)
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Course Info */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.div 
//               className="text-primary mb-3"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//             >
//               Premium Course
//             </motion.div>
//             <Link to={`/course-overview/${course._id}`} className="no-underline">
//               <h2 className="mb-6 text-3xl md:text-4xl text-gray-900 hover:text-primary transition-colors">
//                 {course.title}
//               </h2>
//               <p className="text-gray-600 mb-8 text-lg leading-relaxed">
//                 {course.description}
//               </p>

//               <div className="grid grid-cols-2 gap-6 mb-8">
//                 {[
//                   { icon: Video, value: course.totalVideos.toString(), label: 'Video Lessons', color: 'bg-blue-50 text-blue-600' },
//                   { icon: Clock, value: calculateDuration(course.modules), label: 'Course Duration', color: 'bg-primary/10 text-primary' },
//                   { icon: Users, value: '700+', label: 'Students Enrolled', color: 'bg-green-50 text-green-600' },
//                   { icon: FileText, value: '10+', label: 'Resources & Tools', color: 'bg-purple-50 text-purple-600' }
//                 ].map((stat, index) => (
//                   <motion.div 
//                     key={index}
//                     className="flex items-center gap-3"
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.3 + index * 0.1 }}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
//                       <stat.icon className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <div className="text-2xl text-gray-900">{stat.value}</div>
//                       <div className="text-sm text-gray-600">{stat.label}</div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </Link>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center mb-8">
//               <motion.div 
//                 className="flex items-center gap-6"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <div>
//                   <span className="text-4xl text-gray-900">₦{course.price.toLocaleString()}</span>
//                 </div>
//               </motion.div>

//               <motion.button 
//                 className={`px-4 py-3 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl ${
//                   isEnrolled 
//                     ? 'bg-green-500 text-white hover:bg-green-600' 
//                     : 'bg-orange-500 text-white hover:bg-orange-600'
//                 }`}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => {
//                   if (isEnrolled) {
//                     window.location.href = `/courses/${course._id}`;
//                   } else {
//                     handlePurchaseClick();
//                   }
//                 }}
//               >
//                 {isEnrolled ? 'Access Course →' : 'Purchase Course'}
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, FileText, Video, Loader2, AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/apiConfig';
import circle from '../assets/black circle.jpg';
import { useEnrollment } from '../hooks/useEnrollment';
import { getCourseProgress, hasCourseStarted } from '../utils/courseProgress';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  price: number;
  totalVideos: number;
  modules: any[];
  averageRating: number;
  totalRatings: number;
  instructor: {
    _id: string;
    fullName: string;
    email: string;
  };
  slug: string;
}

export function FeaturedCourses() {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseStarted, setCourseStarted] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(false);
  
  // Check if we need to verify payment
  const shouldVerify = searchParams.get('verify') === 'true';
  
  // Check enrollment status
  const { isEnrolled, isChecking: checkingEnrollment, recheckEnrollment } = useEnrollment(course?._id);

  // Verification states
  const [isVerifying, setIsVerifying] = useState(shouldVerify);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const MAX_ATTEMPTS = 20; // 20 attempts × 3 seconds = 60 seconds

  useEffect(() => {
    const fetchFeaturedCourse = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/courses');
        if (response.data.courses && response.data.courses.length > 0) {
          setCourse(response.data.courses[0]);
        }
      } catch (err: any) {
        setError('Failed to load course. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCourse();
  }, []);

  // Check if course has been started when enrolled
  useEffect(() => {
    const checkProgress = async () => {
      if (isEnrolled && course?._id) {
        setCheckingProgress(true);
        try {
          const progress = await getCourseProgress(course._id);
          const started = hasCourseStarted(progress);
          setCourseStarted(started);
        } catch (err) {
          setCourseStarted(false);
        } finally {
          setCheckingProgress(false);
        }
      }
    };

    checkProgress();
  }, [isEnrolled, course?._id]);

  // Poll for enrollment after payment
  useEffect(() => {
    if (!shouldVerify || !course?._id) return;

    let pollInterval: NodeJS.Timeout;

    const startPolling = () => {
      pollInterval = setInterval(async () => {
        console.log(`🔍 Checking enrollment... Attempt ${verificationAttempts + 1}/${MAX_ATTEMPTS}`);
        
        await recheckEnrollment();
        
        setVerificationAttempts(prev => {
          const newAttempts = prev + 1;
          
          // Stop after max attempts
          if (newAttempts >= MAX_ATTEMPTS) {
            clearInterval(pollInterval);
            setIsVerifying(false);
            // Remove verify param
            searchParams.delete('verify');
            setSearchParams(searchParams);
          }
          
          return newAttempts;
        });
      }, 3000); // Poll every 3 seconds
    };

    // Start polling
    startPolling();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [shouldVerify, course?._id]);

  // Stop verification when enrollment is detected
  useEffect(() => {
    if (isEnrolled && shouldVerify) {
      setIsVerifying(false);
      // Remove verify param
      searchParams.delete('verify');
      setSearchParams(searchParams);
    }
  }, [isEnrolled, shouldVerify]);

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
    return hours > 0 ? `${hours}+ hours` : `${mins} mins`;
  };

  const handlePurchaseClick = () => {
    // Redirect to Selar with return URL
    const currentUrl = window.location.href.split('?')[0]; // Get base URL without params
    const returnUrl = `${currentUrl}?verify=true`;
    const selarUrl = `https://selar.co/549892?return_url=${encodeURIComponent(returnUrl)}`;
    window.location.href = selarUrl;
  };

  if (isLoading || checkingEnrollment) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading course...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !course) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load course</h3>
            <p className="text-gray-600 mb-6">{error || 'No courses available'}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="course" className="py-20 bg-white">
      <div className="container mx-auto px-6">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Course Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                src={course.thumbnail.url} 
                alt={course.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Enrollment Badge */}
              {isEnrolled && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  ✓ Enrolled
                </motion.div>
              )}

              <motion.div 
                className="absolute bottom-6 left-6 right-36"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={circle} 
                      alt={course.instructor.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-gray-900">Created by {course.instructor.fullName}</div>
                      <div className="text-sm text-primary">KDP Expert & Mentor</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-gray-700">
                        {course.averageRating > 0 ? course.averageRating.toFixed(1) : '5.0'} 
                        ({course.totalRatings > 0 ? course.totalRatings : '100+'} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-primary mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Premium Course
            </motion.div>
            <Link to={`/course-overview/${course._id}`} className="no-underline">
              <h2 className="mb-6 text-3xl md:text-4xl text-gray-900 hover:text-primary transition-colors">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Video, value: course.totalVideos.toString(), label: 'Video Lessons', color: 'bg-blue-50 text-blue-600' },
                  { icon: Clock, value: calculateDuration(course.modules), label: 'Course Duration', color: 'bg-primary/10 text-primary' },
                  { icon: Users, value: '700+', label: 'Students Enrolled', color: 'bg-green-50 text-green-600' },
                  { icon: FileText, value: '10+', label: 'Resources & Tools', color: 'bg-purple-50 text-purple-600' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center mb-8">
              {/* Price or Enrollment Status */}
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {isEnrolled ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Enrolled</div>
                      <div className="text-sm text-gray-600">You have access to this course</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl text-gray-900">₦{course.price.toLocaleString()}</span>
                  </div>
                )}
              </motion.div>

              {/* Action Button */}
              <motion.button 
                className={`px-4 py-3 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl ${
                  isEnrolled 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (isEnrolled) {
                    window.location.href = `/courses/${course._id}`;
                  } else {
                    handlePurchaseClick();
                  }
                }}
                disabled={checkingProgress}
              >
                {checkingProgress ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </span>
                ) : isEnrolled ? (
                  courseStarted ? 'Continue Learning →' : 'Start Course →'
                ) : (
                  'Purchase Course'
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
