// import React from 'react';
// import { motion } from 'motion/react';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { 
//   PlayCircle, 
//   Clock, 
//   CheckCircle, 
//   ChevronDown,
//   ChevronRight,
//   Award,
//   AlertCircle,
//   Loader2
// } from 'lucide-react';
// import api from '../../utils/apiConfig'; // Secure axios instance
// import toast from 'react-hot-toast';
// import { 
//   getCourseProgress,
//   markVideoAsComplete,
//   isVideoCompleted,
//   getCompletedVideoCount,
//   getCompletionPercentage,
//   CourseProgress
// } from '../../utils/courseProgress';

// // Types
// interface Video {
//   _id: string;
//   title: string;
//   duration: string;
//   videoUrl: string;
//   videoId?: string;
//   videoProvider?: string;
//   playbackUrl?: string;
//   videoPublicId?: string;
//   thumbnail?: {
//     public_id: string;
//     url: string;
//   };
//   order: number;
//   uploadedAt?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Module {
//   _id: string;
//   title: string;
//   duration: string;
//   videos: Video[];
//   order: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Instructor {
//   _id: string;
//   fullName: string;
//   email: string;
// }

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   instructor: Instructor;
//   instructorName: string;
//   modules: Module[];
//   totalVideos: number;
//   price: number;
//   averageRating: number;
//   totalRatings: number;
//   thumbnail: {
//     public_id: string;
//     url: string;
//   };
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export function CourseDetail() {
//   const { id } = useParams<{ id: string }>();
  
//   // State
//   const [course, setCourse] = useState<Course | null>(null);
//   const [progress, setProgress] = useState<CourseProgress | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedModules, setExpandedModules] = useState<string[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [selectedModule, setSelectedModule] = useState<Module | null>(null);
//   const [showVideoPlayer, setShowVideoPlayer] = useState(false);
//   const [markingComplete, setMarkingComplete] = useState(false);

//   // Helper function to get the correct video embed URL
//   const getEmbedUrl = (video: Video) => {
//     // Bunny CDN iframe embed
//     if (video.videoProvider === 'bunny' && video.videoUrl) {
//       const url = new URL(video.videoUrl);
//       url.searchParams.set('autoplay', 'true');
//       return url.toString();
//     }
    
//     // Cloudinary video
//     if (video.videoUrl && video.videoUrl.includes('cloudinary.com')) {
//       return video.videoUrl;
//     }
    
//     // Google Drive
//     // if (video.videoUrl && video.videoUrl.includes('drive.google.com')) {
//     //   const fileIdMatch = video.videoUrl.match(/[?&]id=([^&]+)/);
//     //   if (fileIdMatch && fileIdMatch[1]) {
//     //     return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
//     //   }
      
//     //   if (video.videoUrl.includes('/file/d/')) {
//     //     return video.videoUrl.replace(/\/(view|edit).*$/, '/preview');
//     //   }
//     // }
    
//     return video.videoUrl;
//   };

//   // Fetch course data and progress from API
//   useEffect(() => {
//     const fetchCourseAndProgress = async () => {
//       if (!id) {
//         setError('No course identifier provided');
//         setLoading(false);
//         return;
//       }

//       console.log('🔍 [CourseDetail] Fetching course and progress:', id);
//       setError(null);
//       setLoading(true);
      
//       try {
//         // Fetch course data
//         const courseResponse = await api.get(`/courses/${id}`);
//         console.log('✅ [CourseDetail] Course data received:', courseResponse.data);
        
//         const courseData = courseResponse.data.course;
        
//         if (!courseData) {
//           throw new Error('No course data in response');
//         }
        
//         setCourse(courseData);
        
//         // Expand all modules by default
//         const allModuleIds = courseData.modules.map((module: Module) => module._id);
//         setExpandedModules(allModuleIds);
        
//         // Select first video by default
//         if (courseData.modules.length > 0 && courseData.modules[0].videos.length > 0) {
//           const firstVideo = courseData.modules[0].videos[0];
//           setSelectedVideo(firstVideo);
//           setSelectedModule(courseData.modules[0]);
//           setShowVideoPlayer(false);
//         }
        
//         // Fetch progress data
//         try {
//           const progressData = await getCourseProgress(id);
//           console.log('✅ [CourseDetail] Progress data received:', progressData);
//           setProgress(progressData);
//         } catch (progressError) {
//           console.error('⚠️ [CourseDetail] Failed to fetch progress:', progressError);
//           // Don't fail the whole page if progress fetch fails
//           setProgress(null);
//         }
        
//         console.log('✅ [CourseDetail] Course and progress loaded successfully');
//       } catch (err: any) {
//         console.error('❌ [CourseDetail] Error fetching course:', err);
        
//         if (err.response?.status === 404) {
//           setError(`Course not found. The course "${id}" doesn't exist or has been removed.`);
//         } else if (err.response?.status === 401) {
//           setError('Please login to view this course.');
//         } else if (err.code === 'ERR_NETWORK') {
//           setError('Network error. Please check your connection and try again.');
//         } else {
//           setError(err.response?.data?.message || 'Failed to load course. Please try again later.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseAndProgress();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [id]);

//   const toggleModule = (moduleId: string) => {
//     setExpandedModules((prev) =>
//       prev.includes(moduleId)
//         ? prev.filter((id) => id !== moduleId)
//         : [...prev, moduleId]
//     );
//   };

//   const markAsComplete = async () => {
//     if (!selectedVideo || !selectedModule || !id) {
//       toast.error('Please select a video first');
//       return;
//     }

//     // Check if already completed
//     if (isVideoCompleted(progress, selectedVideo._id)) {
//       console.log('⚠️ [CourseDetail] Video already marked as complete');
//       setShowVideoPlayer(true);
//       return;
//     }

//     setMarkingComplete(true);

//     try {
//       console.log('🔍 [CourseDetail] Marking video as complete:', {
//         courseId: id,
//         moduleId: selectedModule._id,
//         lessonId: selectedVideo._id
//       });

//       const updatedProgress = await markVideoAsComplete(
//         id,
//         selectedModule._id,
//         selectedVideo._id
//       );

//       console.log('✅ [CourseDetail] Video marked complete, updated progress:', updatedProgress);

//       setProgress(updatedProgress);
//       setShowVideoPlayer(true);
//       toast.success('Lesson completed! 🎉');
//     } catch (error) {
//       console.error('❌ [CourseDetail] Error marking video complete:', error);
//       toast.error(error instanceof Error ? error.message : 'Failed to mark lesson as complete');
//     } finally {
//       setMarkingComplete(false);
//     }
//   };

//   const handleVideoSelect = (video: Video, module: Module) => {
//     setSelectedVideo(video);
//     setSelectedModule(module);
//     setShowVideoPlayer(false);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Calculate progress
//   const totalVideos = course?.totalVideos || 0;
//   const completedVideos = getCompletedVideoCount(progress);
//   const progressPercentage = getCompletionPercentage(progress, totalVideos);
  
//   console.log('📈 [CourseDetail] Progress Calculation:', {
//     totalVideos,
//     completedVideos,
//     progressPercentage: `${progressPercentage}%`
//   });

//   // Calculate total duration
//   const calculateTotalDuration = () => {
//     if (!course) return '0h 0min';
    
//     let totalMinutes = 0;
//     course.modules.forEach(module => {
//       module.videos.forEach(video => {
//         const [minutes, seconds] = video.duration.split(':').map(Number);
//         totalMinutes += minutes + (seconds / 60);
//       });
//     });
    
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = Math.round(totalMinutes % 60);
//     return `${hours}h ${minutes}min`;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 text-lg">Loading course...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !course) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
          
//           <div className="flex gap-3">
//             <button
//               onClick={() => window.location.reload()}
//               className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
//             >
//               Try Again
//             </button>
//             <button
//               onClick={() => window.history.back()}
//               className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-[1800px] mx-auto">
//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
//           {/* Left Column - Course Modules */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="lg:col-span-4 bg-gray-100 border-r border-gray-200"
//           >
//             <div className="h-full flex flex-col">
//               {/* Header - Fixed */}
//               <div className="p-6 border-b border-gray-200 bg-gray-100 flex-shrink-0">
//                 <div className="flex items-center gap-4 mb-4">
//                   {course?.thumbnail?.url && (
//                     <img 
//                       src={course.thumbnail.url} 
//                       alt={course.title}
//                       className="w-16 h-16 rounded-lg object-cover"
//                     />
//                   )}
//                   <div>
//                     <h2 className="text-2xl text-gray-800 font-bold">
//                       {course?.title || 'Loading course...'}
//                     </h2>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   {totalVideos} lessons • {calculateTotalDuration()} total
//                 </p>
//               </div>

//               {/* Modules List - Scrollable */}
//               {course && (
//                 <div 
//                   className="bg-gray-300 overflow-y-auto flex-1 custom-scrollbar" 
//                   style={{ maxHeight: 'calc(100vh - 200px)' }}
//                 >
//                   {course.modules.map((module) => (
//                     <div key={module._id} className="border-b border-gray-200 last:border-0">
//                       {/* Module Header */}
//                       <button
//                         onClick={() => toggleModule(module._id)}
//                         className="w-full p-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors"
//                       >
//                         <div className="flex items-center gap-3 flex-1 text-left">
//                           {expandedModules.includes(module._id) ? (
//                             <ChevronDown className="w-5 h-5 text-gray-700 flex-shrink-0" />
//                           ) : (
//                             <ChevronRight className="w-5 h-5 text-gray-700 flex-shrink-0" />
//                           )}
//                           <div>
//                             <p className="text-base text-gray-900 font-semibold">{module.title}</p>
//                             <p className="text-xs text-gray-600 mt-0.5">
//                               {module.videos.length} lessons • {module.duration}
//                             </p>
//                           </div>
//                         </div>
//                       </button>

//                       {/* Module Videos */}
//                       {expandedModules.includes(module._id) && (
//                         <motion.div 
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: 'auto' }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="bg-gray-50"
//                         >
//                           {module.videos.map((video) => (
//                             <button
//                               key={video._id}
//                               onClick={() => handleVideoSelect(video, module)}
//                               className={`w-full p-4 pl-12 flex items-center gap-3 transition-all border-b border-gray-200 last:border-0 ${
//                                 selectedVideo?._id === video._id 
//                                   ? 'bg-primary/10 border-l-4 border-l-primary' 
//                                   : 'bg-gray-50 hover:bg-primary/5 border-l-4 border-l-transparent'
//                               }`}
//                             >
//                               {isVideoCompleted(progress, video._id) ? (
//                                 <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
//                               ) : (
//                                 <PlayCircle className={`w-5 h-5 flex-shrink-0 ${
//                                   selectedVideo?._id === video._id ? 'text-primary' : 'text-gray-400'
//                                 }`} />
//                               )}
//                               <div className="flex-1 text-left">
//                                 <p className={`text-sm font-medium ${
//                                   selectedVideo?._id === video._id ? 'text-primary' : 'text-gray-700'
//                                 }`}>
//                                   {video.title}
//                                 </p>
//                                 <p className="text-xs text-gray-600 mt-0.5">{video.duration}</p>
//                               </div>
//                             </button>
//                           ))}
//                         </motion.div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Right Column - Video Player */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="lg:col-span-8 p-4"
//           >
//             {/* Progress Bar */}
//             <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-3">
//                   <Award className="w-5 h-5 text-orange-500" />
//                   <span className="text-md text-gray-900">Your Progress</span>
//                 </div>
//                 <span className="text-primary text-sm">{progressPercentage}% Complete</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-500"
//                   style={{ width: `${progressPercentage}%` }}
//                 />
//               </div>
//               <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
//                 <span>{completedVideos} of {totalVideos} lessons completed</span>
//                 <span>Keep learning! 🎯</span>
//               </div>
//             </div>

//             {selectedVideo && course && (
//               <motion.div 
//                 key={selectedVideo._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
//               >
//                 {/* Video Player */}
//                 <div className="aspect-video relative overflow-hidden" style={{ maxHeight: '720px' }}>
//                   {showVideoPlayer ? (
//                     <iframe
//                       key={selectedVideo._id}
//                       src={getEmbedUrl(selectedVideo)}
//                       className="w-full h-full border-0"
//                       allow="autoplay; encrypted-media; fullscreen"
//                       allowFullScreen
//                       title={selectedVideo.title}
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         borderRadius: '8px',
//                         objectFit: 'cover'
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-900"></div>
//                   )}
                  
//                   {/* Thumbnail Overlay */}
//                   {selectedVideo.thumbnail?.url && !showVideoPlayer && (
//                     <div
//                       className="absolute inset-0 cursor-pointer"
//                       onClick={() => setShowVideoPlayer(true)}
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         zIndex: 10
//                       }}
//                     >
//                       <img 
//                         src={selectedVideo.thumbnail.url} 
//                         alt={selectedVideo.title}
//                         style={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                           borderRadius: '8px'
//                         }}
//                       />
                      
//                       {/* Play button overlay */}
//                       <div 
//                         className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-50 transition-all flex items-center justify-center"
//                         style={{ zIndex: 11 }}
//                       >
//                         <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl">
//                           <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Fallback when no thumbnail */}
//                   {!selectedVideo.thumbnail?.url && !showVideoPlayer && (
//                     <div 
//                       className="absolute inset-0 bg-gray-900 flex items-center justify-center cursor-pointer"
//                       onClick={() => setShowVideoPlayer(true)}
//                       style={{ zIndex: 10 }}
//                     >
//                       <div className="flex flex-col items-center gap-4">
//                         <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
//                           <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
//                         </div>
//                         <p className="text-white text-lg font-medium">Click to play video</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Video Info */}
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-6">
//                     <div className="flex-1">
//                       <h2 className="text-2xl text-gray-900 mb-2">{selectedVideo.title}</h2>
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           {selectedVideo.duration}
//                         </span>
//                         {isVideoCompleted(progress, selectedVideo._id) && (
//                           <span className="flex items-center gap-1 text-green-600">
//                             <CheckCircle className="w-4 h-4" />
//                             Completed
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   {!isVideoCompleted(progress, selectedVideo._id) ? (
//                     <button 
//                       className="bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                       onClick={markAsComplete}
//                       disabled={markingComplete}
//                     >
//                       {markingComplete ? (
//                         <>
//                           <Loader2 className="w-4 h-4 animate-spin" />
//                           Marking Complete...
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="w-4 h-4" />
//                           Mark as Complete
//                         </>
//                       )}
//                     </button>
//                   ) : (
//                     <div className="flex items-center gap-2 text-green-600 px-5 py-2.5">
//                       <CheckCircle className="w-5 h-5" />
//                       <span className="text-sm">Lesson Completed!</span>
//                     </div>
//                   )}

//                   {/* Video Description */}
//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <h3 className="text-lg text-gray-900 mb-3">About this lesson</h3>
//                     <p className="text-gray-700 text-md leading-relaxed mb-4">
//                       {course.description}
//                     </p>
                    
//                     {/* Instructor Info */}
//                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-600 mb-1">Instructor</p>
//                       <p className="text-base font-semibold text-gray-900">{course.instructor.fullName}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  ChevronDown,
  ChevronRight,
  Award,
  AlertCircle,
  Loader2
} from 'lucide-react';
import api from '../../utils/apiConfig'; // Secure axios instance
import toast from 'react-hot-toast';
import { 
  getCourseProgress,
  markVideoAsComplete,
  isVideoCompleted,
  getCompletedVideoCount,
  getCompletionPercentage,
  CourseProgress
} from '../../utils/courseProgress';

// Types
interface Video {
  _id: string;
  title: string;
  duration: string;
  videoUrl: string;
  videoId?: string;
  videoProvider?: string;
  playbackUrl?: string;
  videoPublicId?: string;
  thumbnail?: {
    public_id: string;
    url: string;
  };
  order: number;
  uploadedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Module {
  _id: string;
  title: string;
  duration: string;
  videos: Video[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Instructor {
  _id: string;
  fullName: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: Instructor;
  instructorName: string;
  modules: Module[];
  totalVideos: number;
  price: number;
  averageRating: number;
  totalRatings: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  
  // State
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);

  // Helper function to get the correct video embed URL
  const getEmbedUrl = (video: Video) => {
    // Bunny CDN iframe embed
    if (video.videoProvider === 'bunny' && video.videoUrl) {
      const url = new URL(video.videoUrl);
      url.searchParams.set('autoplay', 'true');
      return url.toString();
    }
    
    // Cloudinary video
    if (video.videoUrl && video.videoUrl.includes('cloudinary.com')) {
      return video.videoUrl;
    }
    
 
    
    return video.videoUrl;
  };

  // Fetch course data and progress from API
  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      if (!id) {
        setError('No course identifier provided');
        setLoading(false);
        return;
      }

      console.log('🔍 [CourseDetail] Fetching course and progress:', id);
      setError(null);
      setLoading(true);
      
      try {
        // Fetch course data
        const courseResponse = await api.get(`/courses/${id}`);
        console.log('✅ [CourseDetail] Course data received:', courseResponse.data);
        
        const courseData = courseResponse.data.course;
        
        if (!courseData) {
          throw new Error('No course data in response');
        }
        
        setCourse(courseData);
        
        // Expand all modules by default
        const allModuleIds = courseData.modules.map((module: Module) => module._id);
        setExpandedModules(allModuleIds);
        
        // Select first video by default
        if (courseData.modules.length > 0 && courseData.modules[0].videos.length > 0) {
          const firstVideo = courseData.modules[0].videos[0];
          setSelectedVideo(firstVideo);
          setSelectedModule(courseData.modules[0]);
          setShowVideoPlayer(false);
        }
        
        // Fetch progress data
        try {
          const progressData = await getCourseProgress(id);
          console.log('✅ [CourseDetail] Progress data received:', progressData);
          setProgress(progressData);
        } catch (progressError) {
          console.error('⚠️ [CourseDetail] Failed to fetch progress:', progressError);
          // Don't fail the whole page if progress fetch fails
          setProgress(null);
        }
        
        console.log('✅ [CourseDetail] Course and progress loaded successfully');
      } catch (err: any) {
        console.error('❌ [CourseDetail] Error fetching course:', err);
        
        if (err.response?.status === 404) {
          setError(`Course not found. The course "${id}" doesn't exist or has been removed.`);
        } else if (err.response?.status === 401) {
          setError('Please login to view this course.');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(err.response?.data?.message || 'Failed to load course. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const markAsComplete = async () => {
    if (!selectedVideo || !selectedModule || !id) {
      toast.error('Please select a video first');
      return;
    }

    // Check if already completed
    if (isVideoCompleted(progress, selectedVideo._id)) {
      console.log('⚠️ [CourseDetail] Video already marked as complete');
      setShowVideoPlayer(true);
      return;
    }

    setMarkingComplete(true);

    try {
      console.log('🔍 [CourseDetail] Marking video as complete:', {
        courseId: id,
        moduleId: selectedModule._id,
        lessonId: selectedVideo._id
      });

      const updatedProgress = await markVideoAsComplete(
        id,
        selectedModule._id,
        selectedVideo._id
      );

      console.log('✅ [CourseDetail] Video marked complete, updated progress:', updatedProgress);

      setProgress(updatedProgress);
      setShowVideoPlayer(true);
      toast.success('Lesson completed! 🎉');
    } catch (error) {
      console.error('❌ [CourseDetail] Error marking video complete:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to mark lesson as complete');
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleVideoSelect = (video: Video, module: Module) => {
    setSelectedVideo(video);
    setSelectedModule(module);
    setShowVideoPlayer(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate progress
  const totalVideos = course?.totalVideos || 0;
  const completedVideos = getCompletedVideoCount(progress);
  const progressPercentage = getCompletionPercentage(progress, totalVideos);
  
  console.log('📈 [CourseDetail] Progress Calculation:', {
    totalVideos,
    completedVideos,
    progressPercentage: `${progressPercentage}%`
  });

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

  // Loading state
  if (loading) {
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
  if (error && !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column - Course Modules */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 bg-gray-100 border-r border-gray-200"
          >
            <div className="h-full flex flex-col">
              {/* Header - Fixed */}
              <div className="p-6 border-b border-gray-200 bg-gray-100 flex-shrink-0">
                <div className="flex items-center gap-4 mb-4">
                  {course?.thumbnail?.url && (
                    <img 
                      src={course.thumbnail.url} 
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl text-gray-800 font-bold">
                      {course?.title || 'Loading course...'}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {totalVideos} lessons • {calculateTotalDuration()} total
                </p>
              </div>

              {/* Modules List - Scrollable */}
              {course && (
                <div 
                  className="bg-gray-300 overflow-y-auto flex-1 custom-scrollbar" 
                  style={{ maxHeight: 'calc(100vh - 200px)' }}
                >
                  {/* Course Modules */}
                  {course.modules.map((module) => (
                    <div key={module._id} className="border-b border-gray-200 last:border-0">
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module._id)}
                        className="w-full p-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          {expandedModules.includes(module._id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-700 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-700 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-base text-gray-900 font-semibold">{module.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {module.videos.length} lessons • {module.duration}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Module Videos */}
                      {expandedModules.includes(module._id) && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50"
                        >
                          {module.videos.map((video) => (
                            <button
                              key={video._id}
                              onClick={() => handleVideoSelect(video, module)}
                              className={`w-full p-4 pl-12 flex items-center gap-3 transition-all border-b border-gray-200 last:border-0 ${
                                selectedVideo?._id === video._id 
                                  ? 'bg-primary/10 border-l-4 border-l-primary' 
                                  : 'bg-gray-50 hover:bg-primary/5 border-l-4 border-l-transparent'
                              }`}
                            >
                              {isVideoCompleted(progress, video._id) ? (
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <PlayCircle className={`w-5 h-5 flex-shrink-0 ${
                                  selectedVideo?._id === video._id ? 'text-primary' : 'text-gray-400'
                                }`} />
                              )}
                              <div className="flex-1 text-left">
                                <p className={`text-sm font-medium ${
                                  selectedVideo?._id === video._id ? 'text-primary' : 'text-gray-700'
                                }`}>
                                  {video.title}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">{video.duration}</p>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
               {/* Resource Center Section */}
               <div className="border-b border-gray-200 bg-white p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Resource Center</h3>
                    
                    {/* Sample Books */}
                    <div className="mb-6">
                      <div className="flex items-start gap-2 mb-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">Sample Books</h4>
                          
                          {/* Disclaimer */}
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                            <p className="text-xs text-red-800 leading-relaxed">
                              ⚠️ <strong>Important:</strong> These sample books are provided for learning purposes only. 
                              Do not copy, reuse, or republish any part of these books. They are already published on Amazon, 
                              and reusing content will result in your KDP account being flagged or banned.
                            </p>
                          </div>
                          
                          {/* Sample Book Links */}
                          <div className="space-y-2">
                            <a
                              href="/mnt/user-data/uploads/diverticulitis_diet_cookbook_2023.pdf"
                              download="Diverticulitis_Diet_Cookbook_2023.pdf"
                              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Diverticulitis Diet Cookbook 2023
                            </a>
                            
                            <a
                              href="/mnt/user-data/uploads/NEW__MEXICAN_TRAVEL_GUIDE.pdf"
                              download="New_Mexican_Travel_Guide.pdf"
                              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              New Mexico Travel Guide
                            </a>
                            
                            <a
                              href="/mnt/user-data/uploads/CRNI_EXAM_Study_Guide_2025_2026.pdf"
                              download="CRNI_Exam_Study_Guide_2025_2026.pdf"
                              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              CRNI Exam Study Guide 2025-2026
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Resource Center Document */}
                    <div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">Resource Center</h4>
                          <a
                            href="/mnt/user-data/uploads/Resource_Center.pdf"
                            download="Resource_Center.pdf"
                            className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Resource Center Guide
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-8 p-4"
          >
            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-md text-gray-900">Your Progress</span>
                </div>
                <span className="text-primary text-sm">{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>{completedVideos} of {totalVideos} lessons completed</span>
                <span>Keep learning! 🎯</span>
              </div>
            </div>

            {selectedVideo && course && (
              <motion.div 
                key={selectedVideo._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Video Player */}
                <div className="aspect-video relative overflow-hidden" style={{ maxHeight: '720px' }}>
                  {showVideoPlayer ? (
                    <iframe
                      key={selectedVideo._id}
                      src={getEmbedUrl(selectedVideo)}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      title={selectedVideo.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900"></div>
                  )}
                  
                  {/* Thumbnail Overlay */}
                  {selectedVideo.thumbnail?.url && !showVideoPlayer && (
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => setShowVideoPlayer(true)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 10
                      }}
                    >
                      <img 
                        src={selectedVideo.thumbnail.url} 
                        alt={selectedVideo.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      
                      {/* Play button overlay */}
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-50 transition-all flex items-center justify-center"
                        style={{ zIndex: 11 }}
                      >
                        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl">
                          <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Fallback when no thumbnail */}
                  {!selectedVideo.thumbnail?.url && !showVideoPlayer && (
                    <div 
                      className="absolute inset-0 bg-gray-900 flex items-center justify-center cursor-pointer"
                      onClick={() => setShowVideoPlayer(true)}
                      style={{ zIndex: 10 }}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                          <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                        </div>
                        <p className="text-white text-lg font-medium">Click to play video</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl text-gray-900 mb-2">{selectedVideo.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedVideo.duration}
                        </span>
                        {isVideoCompleted(progress, selectedVideo._id) && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {!isVideoCompleted(progress, selectedVideo._id) ? (
                    <button 
                      className="bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={markAsComplete}
                      disabled={markingComplete}
                    >
                      {markingComplete ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Marking Complete...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Mark as Complete
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 px-5 py-2.5">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Lesson Completed!</span>
                    </div>
                  )}

                  {/* Video Description */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg text-gray-900 mb-3">About this lesson</h3>
                    <p className="text-gray-700 text-md leading-relaxed mb-4">
                      {course.description}
                    </p>
                    
                    {/* Instructor Info */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Instructor</p>
                      <p className="text-base font-semibold text-gray-900">{course.instructor.fullName}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
