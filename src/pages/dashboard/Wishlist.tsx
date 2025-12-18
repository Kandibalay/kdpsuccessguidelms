import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Clock, Users, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const wishlistCourses = [
  {
    id: 1,
    title: 'Advanced KDP Marketing Strategies',
    instructor: 'DSAM Academy',
    rating: 4.9,
    students: 2847,
    duration: '12 hours',
    price: 97,
    originalPrice: 197,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
  },
  {
    id: 2,
    title: 'Book Cover Design Mastery',
    instructor: 'Design Pro',
    rating: 4.7,
    students: 1523,
    duration: '8 hours',
    price: 67,
    originalPrice: 147,
    image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&q=80',
  },
];

export function Wishlist() {
  return (
    <div className="max-w-7xl mx-auto p-6">
       <h1 className="text-2xl text-gray-900 mb-1">My Wishlist</h1>
      <p className="text-sm text-gray-600 flex justify-center items-center h-96">Coming Soon</p>
    </div>
    // <div className="max-w-6xl mx-auto">
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    //     {/* Header */}
    //     <div className="mb-8">
    //       <h1 className="text-2xl text-gray-900 mb-1">My Wishlist</h1>
    //       <p className="text-sm text-gray-600">
    //         {wishlistCourses.length} course{wishlistCourses.length !== 1 ? 's' : ''} saved for later
    //       </p>
    //     </div>

    //     {/* Wishlist Items */}
    //     {wishlistCourses.length > 0 ? (
    //       <div className="space-y-6">
    //         {wishlistCourses.map((course, index) => (
    //           <motion.div
    //             key={course.id}
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 0.5, delay: index * 0.1 }}
    //             className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    //           >
    //             <div className="flex flex-col md:flex-row">
    //               {/* Course Image */}
    //               <div className="md:w-64 h-48 md:h-auto">
    //                 <img
    //                   src={course.image}
    //                   alt={course.title}
    //                   className="w-full h-full object-cover"
    //                 />
    //               </div>

    //               {/* Course Info */}
    //               <div className="flex-1 p-6">
    //                 <div className="flex items-start justify-between mb-4">
    //                   <div className="flex-1">
    //                     <h3 className="text-lg text-gray-900 mb-2">{course.title}</h3>
    //                     <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>

    //                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
    //                       <div className="flex items-center gap-1">
    //                         <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
    //                         <span>{course.rating}</span>
    //                       </div>
    //                       <div className="flex items-center gap-1">
    //                         <Users className="w-4 h-4" />
    //                         <span>{course.students.toLocaleString()} students</span>
    //                       </div>
    //                       <div className="flex items-center gap-1">
    //                         <Clock className="w-4 h-4" />
    //                         <span>{course.duration}</span>
    //                       </div>
    //                     </div>

    //                     <div className="flex items-center gap-3">
    //                       <span className="text-2xl text-gray-900">${course.price}</span>
    //                       <span className="text-sm text-gray-400 line-through">
    //                         ${course.originalPrice}
    //                       </span>
    //                       <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
    //                         Save ${course.originalPrice - course.price}
    //                       </span>
    //                     </div>
    //                   </div>

    //                   <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
    //                     <Trash2 className="w-5 h-5" />
    //                   </button>
    //                 </div>

    //                 <div className="flex gap-3">
    //                   <Link
    //                     to={`/enroll?course=${course.id}`}
    //                     className="flex-1 bg-orange-500 text-white text-center px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
    //                   >
    //                     Enroll Now
    //                   </Link>
    //                   <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
    //                     View Details
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     ) : (
    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5 }}
    //         className="bg-white rounded-2xl p-16 border border-gray-200 shadow-sm text-center"
    //       >
    //         <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
    //         <h3 className="text-xl text-gray-900 mb-2">Your Wishlist is Empty</h3>
    //         <p className="text-gray-600 mb-6">
    //           Browse our courses and add your favorites to your wishlist
    //         </p>
    //         <Link
    //           to="/courses"
    //           className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
    //         >
    //           Browse Courses
    //         </Link>
    //       </motion.div>
    //     )}
    //   </motion.div>
    // </div>
  );
}
