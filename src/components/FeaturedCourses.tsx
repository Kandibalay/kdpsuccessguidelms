// import React from 'react';
// import { Star, Clock, Users, BookmarkPlus, PlayCircle, FileText, Video } from 'lucide-react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import { Link } from 'react-router-dom';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { motion } from 'framer-motion';
// import Amazon from '../assets/Amazon image 3.jpg';
// import circle from '../assets/black circle.jpg'

// const courseModules = [
//   {
//     id: 1,
//     title: 'Introduction to Amazon KDP',
//     lessons: 8,
//     duration: '2 hours',
//     icon: PlayCircle
//   },
//   {
//     id: 2,
//     title: 'Finding Profitable Niches',
//     lessons: 12,
//     duration: '3.5 hours',
//     icon: Target
//   },
//   {
//     id: 3,
//     title: 'Book Creation & Design',
//     lessons: 15,
//     duration: '4 hours',
//     icon: FileText
//   },
//   {
//     id: 4,
//     title: 'Publishing & Optimization',
//     lessons: 10,
//     duration: '2.5 hours',
//     icon: Upload
//   },
//   {
//     id: 5,
//     title: 'Marketing & Promotion',
//     lessons: 14,
//     duration: '3 hours',
//     icon: TrendingUp
//   },
//   {
//     id: 6,
//     title: 'Scaling Your Business',
//     lessons: 9,
//     duration: '2 hours',
//     icon: Zap
//   },
//   {
//     id: 7,
//     title: 'Advanced Keyword Research',
//     lessons: 11,
//     duration: '2.5 hours',
//     icon: Target
//   },
//   {
//     id: 8,
//     title: 'Amazon Ads Mastery',
//     lessons: 13,
//     duration: '3 hours',
//     icon: TrendingUp
//   },
//   {
//     id: 9,
//     title: 'Automation & Outsourcing',
//     lessons: 10,
//     duration: '2.5 hours',
//     icon: Zap
//   }
// ];

// import { Target, Upload, TrendingUp, Zap } from 'lucide-react';

// export function FeaturedCourses() {
//   return (
//     <section id="course" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
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
//                 src={Amazon} 
//                 alt="KDP Success Guide"
//                 className="w-full h-full object-cover"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.4 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
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
//                       alt="DSAM"
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div>
//                       <div className="text-gray-900">Created by DSAM</div>
//                       <div className="text-sm text-primary">KDP Expert & Mentor</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-6 text-sm">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 text-primary fill-primary" />
//                       <span className="text-gray-700">4.9 (100+ reviews)</span>
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
//             <Link to="/course-overview/695bc2ab53fc5f3b2d19915f" className="no-underline">
//             <h2 className="mb-6 text-3xl md:text-4xl text-gray-900">
//               KDP Success Guide by DSAM
//             </h2>
//             <p className="text-gray-600 mb-8 text-lg leading-relaxed">
//               Master the complete Amazon KDP publishing process from A to Z. This comprehensive course covers everything from finding profitable niches to creating best-selling books and scaling your publishing business to consistent monthly income.
//             </p>

//             <div className="grid grid-cols-2 gap-6 mb-8">
//               {[
//                 { icon: Video, value: '16', label: 'Video Lessons', color: 'bg-blue-50 text-blue-600' },
//                 { icon: Clock, value: '10+ Hours', label: 'Course Duration', color: 'bg-primary/10 text-primary' },
//                 { icon: Users, value: '200+', label: 'Students Enrolled', color: 'bg-green-50 text-green-600' },
//                 { icon: FileText, value: '10+', label: 'Resources & Tools', color: 'bg-purple-50 text-purple-600' }
//               ].map((stat, index) => (
//                 <motion.div 
//                   key={index}
//                   className="flex items-center gap-3"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.3 + index * 0.1 }}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
//                     <stat.icon className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <div className="text-2xl text-gray-900">{stat.value}</div>
//                     <div className="text-sm text-gray-600">{stat.label}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//             </Link>

//            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center mb-8">
//            <motion.div 
//               className="flex items-center gap-6"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.6 }}
//             >
//               <div>
//                 <span className="text-4xl text-gray-900 ">₦100,000</span>
//               </div>
//             </motion.div>

//             <motion.button 
//               className="bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition-all text-lg shadow-lg hover:shadow-xl"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Purchase Course 
//             </motion.button>
//            </div>
//           </motion.div>
//         </div>

       
//       </div>

    
//     </section>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, BookmarkPlus, PlayCircle, FileText, Video, Loader2, AlertCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import api from '../utils/apiConfig';
import circle from '../assets/black circle.jpg';
import { Target, Upload, TrendingUp, Zap } from 'lucide-react';

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

  useEffect(() => {
    const fetchFeaturedCourse = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/courses');
        console.log('✅ Courses fetched:', response.data);
        
        // Get the first course as featured
        if (response.data.courses && response.data.courses.length > 0) {
          setCourse(response.data.courses[0]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching featured course:', err);
        setError('Failed to load course. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCourse();
  }, []);

  // Calculate total duration for a course
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

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading featured course...</p>
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
                  { icon: Users, value: '200+', label: 'Students Enrolled', color: 'bg-green-50 text-green-600' },
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
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div>
                  <span className="text-4xl text-gray-900">₦{course.price.toLocaleString()}</span>
                </div>
              </motion.div>

              <motion.button 
                className="bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition-all text-lg shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // TODO: Add payment link here later
                  console.log('Purchase clicked for course:', course._id);
                }}
              >
                Purchase Course 
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
