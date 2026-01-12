// import React, { useState, useEffect } from 'react';
// import { Clock, BookOpen, Star, Users, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';
// import axios from 'axios';

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
//     fullName: string;
//   };
//   slug: string;
// }

// export function Courses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('/courses');
//         console.log('Courses fetched:', response.data);
//         setCourses(response.data.courses);
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//         setError('Failed to load courses. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   // Calculate total duration for a course
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

//   const featuredCourse = courses[0]; // First course as featured
//   const otherCourses = courses.slice(1); // Rest of the courses

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 text-lg">Loading courses...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <div className="relative py-16 overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1565688695721-2b6f5a880a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsZWFybmluZ3xlbnwxfHx8fDE3NjU0NjAxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//             alt="Courses hero background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary/95"></div>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 container mx-auto px-6">
//           <div className="max-w-3xl">
//             <motion.div
//               className="inline-block bg-orange-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-orange-300/30 mb-6"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               Professional KDP Training
//             </motion.div>
//             <motion.h1 
//               className="text-white text-4xl md:text-5xl mb-4"
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               Explore Our Courses
//             </motion.h1>
//             <motion.p 
//               className="text-lg text-white/90"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               Comprehensive training programs designed to help you succeed in Amazon Kindle Direct Publishing and beyond.
//             </motion.p>
//           </div>
//         </div>
//       </div>

//       {/* Featured Course */}
//       {featuredCourse && (
//         <div className="py-20 bg-secondary">
//           <div className="container mx-auto px-6">
//             <motion.div 
//               className="mb-8"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm mb-4">
//                 Featured Course
//               </span>
//               <h2 className="text-4xl text-gray-900">Our Flagship Program</h2>
//             </motion.div>
            
//             <motion.div 
//               className="bg-white rounded-2xl shadow-lg overflow-hidden"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               whileHover={{ y: -5 }}
//             >
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="relative h-64 md:h-auto overflow-hidden">
//                   <motion.img
//                     src={featuredCourse.thumbnail.url}
//                     alt={featuredCourse.title}
//                     className="w-full h-full object-cover"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.4 }}
//                   />
//                   {featuredCourse.averageRating > 0 && (
//                     <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm">{featuredCourse.averageRating.toFixed(1)}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="p-8">
//                   <div className="mb-4">
//                     <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
//                       Amazon KDP
//                     </span>
//                   </div>
                  
//                   {/* ✅ FIXED: Using course._id instead of hardcoded slug */}
//                   <Link to={`/course-overview/${featuredCourse._id}`} className="no-underline">
//                     <h3 className="text-3xl mb-4 text-gray-900 hover:text-primary transition-colors">
//                       {featuredCourse.title}
//                     </h3>
//                   </Link>
                  
//                   <p className="text-gray-600 mb-6">{featuredCourse.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Clock className="w-5 h-5 text-primary" />
//                       <span>{calculateDuration(featuredCourse.modules)}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <BookOpen className="w-5 h-5 text-primary" />
//                       <span>{featuredCourse.totalVideos} lessons</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Users className="w-5 h-5 text-primary" />
//                       <span>{featuredCourse.totalRatings || '200+'} students</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <span className="px-2 py-1 bg-gray-100 rounded text-sm">All Levels</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                     <div>
//                       <div className="text-2xl lg:text-3xl text-primary">
//                         ₦{featuredCourse.price.toLocaleString()}
//                       </div>
//                       <div className="text-sm text-gray-500">One-time payment</div>
//                     </div>
//                     <Link to={`/course-overview/${featuredCourse._id}`}>
//                       <motion.button 
//                         className="bg-orange-500 text-white px-4 md:px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         View Course
//                         <ArrowRight className="w-5 h-5" />
//                       </motion.button>
//                     </Link>
//                   </div>
                  
//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <p className="text-sm text-gray-600">
//                       <span className="font-semibold">Instructor:</span> {featuredCourse.instructor.fullName}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}

//       {/* Other Courses */}
//       {otherCourses.length > 0 && (
//         <div className="py-20">
//           <div className="container mx-auto px-6">
//             <motion.div 
//               className="mb-12"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="text-4xl text-gray-900 mb-4">More Courses</h2>
//               <p className="text-lg text-gray-600">
//                 Expand your skills with our additional training programs
//               </p>
//             </motion.div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {otherCourses.map((course, index) => (
//                 <motion.div
//                   key={course._id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={course.thumbnail.url}
//                       alt={course.title}
//                       className="w-full h-full object-cover"
//                     />
//                     {course.averageRating > 0 && (
//                       <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm">
//                         <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                         <span>{course.averageRating.toFixed(1)}</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-6">
//                     <Link to={`/course-overview/${course._id}`}>
//                       <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">
//                         {course.title}
//                       </h3>
//                     </Link>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {course.description}
//                     </p>

//                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         {calculateDuration(course.modules)}
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <BookOpen className="w-4 h-4" />
//                         {course.totalVideos} lessons
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                       <div className="text-xl font-bold text-primary">
//                         ₦{course.price.toLocaleString()}
//                       </div>
//                       <Link to={`/course-overview/${course._id}`}>
//                         <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm">
//                           View Course
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {courses.length === 0 && !isLoading && (
//         <div className="py-20">
//           <div className="container mx-auto px-6 text-center">
//             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Available</h3>
//             <p className="text-gray-600">Check back soon for new courses!</p>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Star, Users, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

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
    fullName: string;
  };
  slug: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/courses');
        console.log('Courses fetched:', response.data);
        setCourses(response.data.courses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
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

  const featuredCourse = courses[0]; // First course as featured
  const otherCourses = courses.slice(1); // Rest of the courses

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565688695721-2b6f5a880a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsZWFybmluZ3xlbnwxfHx8fDE3NjU0NjAxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Courses hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              className="inline-block bg-orange-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-orange-300/30 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Professional KDP Training
            </motion.div>
            <motion.h1 
              className="text-white text-4xl md:text-5xl mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore Our Courses
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive training programs designed to help you succeed in Amazon Kindle Direct Publishing and beyond.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Featured Course */}
      {featuredCourse && (
        <div className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm mb-4">
                Featured Course
              </span>
              <h2 className="text-4xl text-gray-900">Our Flagship Program</h2>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <motion.img
                    src={featuredCourse.thumbnail.url}
                    alt={featuredCourse.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {featuredCourse.averageRating > 0 && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{featuredCourse.averageRating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Amazon KDP
                    </span>
                  </div>
                  
                  {/* ✅ Make entire content area clickable */}
                  <Link to={`/course-overview/${featuredCourse._id}`} className="no-underline block">
                    <div className="cursor-pointer">
                      <h3 className="text-3xl mb-4 text-gray-900 hover:text-primary transition-colors">
                        {featuredCourse.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6">{featuredCourse.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>{calculateDuration(featuredCourse.modules)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <span>{featuredCourse.totalVideos} lessons</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5 text-primary" />
                          <span>100+ students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="px-2 py-1 bg-gray-100 rounded text-sm">All Levels</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Price and Purchase button - NOT clickable for course overview */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl lg:text-3xl text-primary">
                        ₦{featuredCourse.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">One-time payment</div>
                    </div>
                    {/* ✅ Changed to Purchase button */}
                    <motion.button 
                      className="bg-orange-500 text-white px-4 md:px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Add payment link here later
                        console.log('Purchase clicked for course:', featuredCourse._id);
                      }}
                    >
                      Purchase
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Instructor:</span> {featuredCourse.instructor.fullName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      

      <Footer />
    </div>
  );
}
