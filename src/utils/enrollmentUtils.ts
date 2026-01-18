// /**
//  * Enrollment Utilities - Fixed for course as object
//  * Works with /courses/user/enrollments endpoint
//  */

// import api from './apiConfig';
// import { AxiosError } from 'axios';

// export interface Enrollment {
//   _id: string;
//   user: string;
//   course: string | null | { _id: string; [key: string]: any }; // Can be string, null, or object
//   enrolledDate: string;
//   progress: number;
//   isCompleted: boolean;
//   completedVideos: Array<{
//     courseId: string;
//     moduleId: string;
//     lessonId: string;
//     completedAt: string;
//     _id: string;
//   }>;
//   lastWatched?: {
//     moduleId: string;
//     lessonId: string;
//     moduleTitle: string;
//     lessonTitle: string;
//     watchedAt: string;
//   };
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
// }

// export interface EnrollmentResponse {
//   enrollments: Enrollment[];
//   count: number;
// }

// /**
//  * Extract course ID from course field (handles string, object, or null)
//  */
// const extractCourseId = (course: string | null | { _id: string; [key: string]: any }): string | null => {
//   if (!course) return null;
//   if (typeof course === 'string') return course;
//   if (typeof course === 'object' && course._id) return course._id;
//   return null;
// };

// /**
//  * Fetch all user enrollments from backend
//  */
// export const getUserEnrollments = async (): Promise<EnrollmentResponse> => {
//   try {
//     const response = await api.get<EnrollmentResponse>('/courses/user/enrollments');
//     console.log('📊 [Enrollments API] Response:', response.data);
//     return response.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       console.error('❌ [Enrollments API] Error:', error.response?.status, error.message);
//       throw error;
//     }
//     console.error('❌ [Enrollments API] Unknown Error:', error);
//     throw new Error('Failed to fetch enrollments');
//   }
// };

// /**
//  * Check if user is enrolled in a specific course
//  */
// export const isUserEnrolled = async (courseId: string): Promise<boolean> => {
//   try {
//     console.log('🔍 [isUserEnrolled] Checking enrollment for courseId:', courseId);
    
//     const response = await getUserEnrollments();
//     const enrollments = response.enrollments || [];
    
//     console.log('📋 [isUserEnrolled] Total enrollments:', enrollments.length);
    
//     // Log each enrollment for debugging
//     enrollments.forEach((enrollment, index) => {
//       const extractedCourseId = extractCourseId(enrollment.course);
//       console.log(`📌 [Enrollment ${index + 1}]`, {
//         enrollmentId: enrollment._id,
//         directCourseField: enrollment.course,
//         extractedCourseId: extractedCourseId,
//         completedVideosCount: enrollment.completedVideos.length,
//         courseIdsInVideos: enrollment.completedVideos.map(v => v.courseId)
//       });
//     });
    
//     // Check if any enrollment matches the courseId
//     const isEnrolled = enrollments.some(enrollment => {
//       // Case 1: Direct course field match (handle both string and object)
//       const enrollmentCourseId = extractCourseId(enrollment.course);
//       if (enrollmentCourseId === courseId) {
//         console.log('✅ [isUserEnrolled] MATCH via direct course field!', {
//           enrollmentCourseId,
//           targetCourseId: courseId
//         });
//         return true;
//       }
      
//       // Case 2: Check completedVideos array
//       if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
//         const hasMatchingVideo = enrollment.completedVideos.some(video => {
//           const matches = video.courseId === courseId;
//           if (matches) {
//             console.log('✅ [isUserEnrolled] MATCH via completedVideos!', {
//               videoCourseId: video.courseId,
//               targetCourseId: courseId
//             });
//           }
//           return matches;
//         });
        
//         if (hasMatchingVideo) {
//           return true;
//         }
//       }
      
//       return false;
//     });
    
//     console.log(`${isEnrolled ? '✅' : '❌'} [isUserEnrolled] Final result: User ${isEnrolled ? 'IS' : 'IS NOT'} enrolled in course ${courseId}`);
//     return isEnrolled;
    
//   } catch (error) {
//     console.error('❌ [isUserEnrolled] Error:', error);
//     return false;
//   }
// };

// /**
//  * Get enrollment data for a specific course
//  */
// export const getCourseEnrollment = async (courseId: string): Promise<Enrollment | null> => {
//   try {
//     const response = await getUserEnrollments();
//     const enrollments = response.enrollments || [];
    
//     const enrollment = enrollments.find(enrollment => {
//       const enrollmentCourseId = extractCourseId(enrollment.course);
//       if (enrollmentCourseId === courseId) {
//         return true;
//       }
      
//       if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
//         return enrollment.completedVideos.some(video => video.courseId === courseId);
//       }
      
//       return false;
//     });
    
//     if (enrollment) {
//       console.log('✅ [getCourseEnrollment] Found enrollment:', enrollment._id);
//     } else {
//       console.log('❌ [getCourseEnrollment] No enrollment found for course:', courseId);
//     }
    
//     return enrollment || null;
//   } catch (error) {
//     console.error('❌ [getCourseEnrollment] Error:', error);
//     return null;
//   }
// };

// /**
//  * Get total enrolled courses count
//  */
// export const getEnrolledCoursesCount = async (): Promise<number> => {
//   try {
//     const response = await getUserEnrollments();
//     const enrollments = response.enrollments || [];
    
//     const uniqueCourseIds = new Set<string>();
    
//     enrollments.forEach(enrollment => {
//       const courseId = extractCourseId(enrollment.course);
//       if (courseId) {
//         uniqueCourseIds.add(courseId);
//       }
      
//       if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
//         enrollment.completedVideos.forEach(video => {
//           if (video.courseId) {
//             uniqueCourseIds.add(video.courseId);
//           }
//         });
//       }
//     });
    
//     const count = uniqueCourseIds.size;
//     console.log('📊 [getEnrolledCoursesCount]:', count, 'unique courses');
//     console.log('📊 [Course IDs]:', Array.from(uniqueCourseIds));
//     return count;
//   } catch (error) {
//     console.error('❌ [getEnrolledCoursesCount] Error:', error);
//     return 0;
//   }
// };

// /**
//  * Get all enrolled course IDs
//  */
// export const getEnrolledCourseIds = async (): Promise<string[]> => {
//   try {
//     const response = await getUserEnrollments();
//     const enrollments = response.enrollments || [];
    
//     const courseIds = new Set<string>();
    
//     enrollments.forEach(enrollment => {
//       const courseId = extractCourseId(enrollment.course);
//       if (courseId) {
//         courseIds.add(courseId);
//       }
      
//       if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
//         enrollment.completedVideos.forEach(video => {
//           if (video.courseId) {
//             courseIds.add(video.courseId);
//           }
//         });
//       }
//     });
    
//     const ids = Array.from(courseIds);
//     console.log('📋 [getEnrolledCourseIds]:', ids);
//     return ids;
//   } catch (error) {
//     console.error('❌ [getEnrolledCourseIds] Error:', error);
//     return [];
//   }
// };

// /**
//  * Check if user has any enrollments
//  */
// export const hasAnyEnrollments = async (): Promise<boolean> => {
//   try {
//     const response = await getUserEnrollments();
//     const hasEnrollments = (response.count || 0) > 0;
//     console.log(`${hasEnrollments ? '✅' : '❌'} [hasAnyEnrollments]:`, hasEnrollments);
//     return hasEnrollments;
//   } catch (error) {
//     console.error('❌ [hasAnyEnrollments] Error:', error);
//     return false;
//   }
// };

// /**
//  * Get progress percentage for a specific course
//  */
// export const getCourseProgressFromEnrollment = async (courseId: string): Promise<number> => {
//   try {
//     const enrollment = await getCourseEnrollment(courseId);
//     const progress = enrollment?.progress || 0;
//     console.log('📊 [getCourseProgress]:', progress, '%');
//     return progress;
//   } catch (error) {
//     console.error('❌ [getCourseProgress] Error:', error);
//     return 0;
//   }
// };

// /**
//  * Get completed videos count for a specific course
//  */
// export const getCompletedVideosFromEnrollment = async (courseId: string): Promise<number> => {
//   try {
//     const enrollment = await getCourseEnrollment(courseId);
//     if (!enrollment) return 0;
    
//     const completedForCourse = enrollment.completedVideos.filter(
//       video => video.courseId === courseId
//     );
    
//     const count = completedForCourse.length;
//     console.log('📹 [getCompletedVideos]:', count, 'videos for course', courseId);
//     return count;
//   } catch (error) {
//     console.error('❌ [getCompletedVideos] Error:', error);
//     return 0;
//   }
// };

// /**
//  * Get last watched video for a course
//  */
// export const getLastWatchedFromEnrollment = async (courseId: string) => {
//   try {
//     const enrollment = await getCourseEnrollment(courseId);
//     const lastWatched = enrollment?.lastWatched || null;
    
//     if (lastWatched) {
//       console.log('📺 [getLastWatched]:', lastWatched.lessonTitle);
//     } else {
//       console.log('❌ [getLastWatched]: No video history');
//     }
    
//     return lastWatched;
//   } catch (error) {
//     console.error('❌ [getLastWatched] Error:', error);
//     return null;
//   }
// };

// /**
//  * Debug: Log all enrollment details
//  */
// export const debugEnrollments = async (): Promise<void> => {
//   try {
//     const response = await getUserEnrollments();
    
//     console.group('🔍 ENROLLMENT DEBUG INFO');
//     console.log('Total Enrollments:', response.count);
//     console.log('---');
    
//     response.enrollments.forEach((enrollment, index) => {
//       console.group(`Enrollment ${index + 1}`);
//       console.log('ID:', enrollment._id);
//       console.log('Direct Course Field:', enrollment.course);
//       console.log('Extracted Course ID:', extractCourseId(enrollment.course));
//       console.log('Progress:', enrollment.progress + '%');
//       console.log('Completed Videos:', enrollment.completedVideos.length);
      
//       if (enrollment.completedVideos.length > 0) {
//         console.log('Course IDs in completedVideos:');
//         enrollment.completedVideos.forEach((video, i) => {
//           console.log(`  Video ${i + 1}:`, video.courseId);
//         });
//       }
      
//       if (enrollment.lastWatched) {
//         console.log('Last Watched:', enrollment.lastWatched.lessonTitle);
//       }
//       console.groupEnd();
//     });
    
//     console.groupEnd();
//   } catch (error) {
//     console.error('❌ Debug Enrollments Error:', error);
//   }
// };


/**
 * Enrollment Utilities - Production Version
 * Works with /courses/user/enrollments endpoint
 */

import api from './apiConfig';
import { AxiosError } from 'axios';

export interface Enrollment {
  _id: string;
  user: string;
  course: string | null | { _id: string; [key: string]: any }; // Can be string, null, or object
  enrolledDate: string;
  progress: number;
  isCompleted: boolean;
  completedVideos: Array<{
    courseId: string;
    moduleId: string;
    lessonId: string;
    completedAt: string;
    _id: string;
  }>;
  lastWatched?: {
    moduleId: string;
    lessonId: string;
    moduleTitle: string;
    lessonTitle: string;
    watchedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface EnrollmentResponse {
  enrollments: Enrollment[];
  count: number;
}

/**
 * Extract course ID from course field (handles string, object, or null)
 */
const extractCourseId = (course: string | null | { _id: string; [key: string]: any }): string | null => {
  if (!course) return null;
  if (typeof course === 'string') return course;
  if (typeof course === 'object' && course._id) return course._id;
  return null;
};

/**
 * Fetch all user enrollments from backend
 */
export const getUserEnrollments = async (): Promise<EnrollmentResponse> => {
  try {
    const response = await api.get<EnrollmentResponse>('/courses/user/enrollments');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('Failed to fetch enrollments');
  }
};

/**
 * Check if user is enrolled in a specific course
 */
export const isUserEnrolled = async (courseId: string): Promise<boolean> => {
  try {
    const response = await getUserEnrollments();
    const enrollments = response.enrollments || [];
    
    // Check if any enrollment matches the courseId
    const isEnrolled = enrollments.some(enrollment => {
      // Case 1: Direct course field match (handle both string and object)
      const enrollmentCourseId = extractCourseId(enrollment.course);
      if (enrollmentCourseId === courseId) {
        return true;
      }
      
      // Case 2: Check completedVideos array
      if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
        const hasMatchingVideo = enrollment.completedVideos.some(video => {
          return video.courseId === courseId;
        });
        
        if (hasMatchingVideo) {
          return true;
        }
      }
      
      return false;
    });
    
    return isEnrolled;
    
  } catch (error) {
    return false;
  }
};

/**
 * Get enrollment data for a specific course
 */
export const getCourseEnrollment = async (courseId: string): Promise<Enrollment | null> => {
  try {
    const response = await getUserEnrollments();
    const enrollments = response.enrollments || [];
    
    const enrollment = enrollments.find(enrollment => {
      const enrollmentCourseId = extractCourseId(enrollment.course);
      if (enrollmentCourseId === courseId) {
        return true;
      }
      
      if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
        return enrollment.completedVideos.some(video => video.courseId === courseId);
      }
      
      return false;
    });
    
    return enrollment || null;
  } catch (error) {
    return null;
  }
};

/**
 * Get total enrolled courses count
 */
export const getEnrolledCoursesCount = async (): Promise<number> => {
  try {
    const response = await getUserEnrollments();
    const enrollments = response.enrollments || [];
    
    const uniqueCourseIds = new Set<string>();
    
    enrollments.forEach(enrollment => {
      const courseId = extractCourseId(enrollment.course);
      if (courseId) {
        uniqueCourseIds.add(courseId);
      }
      
      if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
        enrollment.completedVideos.forEach(video => {
          if (video.courseId) {
            uniqueCourseIds.add(video.courseId);
          }
        });
      }
    });
    
    return uniqueCourseIds.size;
  } catch (error) {
    return 0;
  }
};

/**
 * Get all enrolled course IDs
 */
export const getEnrolledCourseIds = async (): Promise<string[]> => {
  try {
    const response = await getUserEnrollments();
    const enrollments = response.enrollments || [];
    
    const courseIds = new Set<string>();
    
    enrollments.forEach(enrollment => {
      const courseId = extractCourseId(enrollment.course);
      if (courseId) {
        courseIds.add(courseId);
      }
      
      if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
        enrollment.completedVideos.forEach(video => {
          if (video.courseId) {
            courseIds.add(video.courseId);
          }
        });
      }
    });
    
    return Array.from(courseIds);
  } catch (error) {
    return [];
  }
};

/**
 * Check if user has any enrollments
 */
export const hasAnyEnrollments = async (): Promise<boolean> => {
  try {
    const response = await getUserEnrollments();
    return (response.count || 0) > 0;
  } catch (error) {
    return false;
  }
};

/**
 * Get progress percentage for a specific course
 */
export const getCourseProgressFromEnrollment = async (courseId: string): Promise<number> => {
  try {
    const enrollment = await getCourseEnrollment(courseId);
    return enrollment?.progress || 0;
  } catch (error) {
    return 0;
  }
};

/**
 * Get completed videos count for a specific course
 */
export const getCompletedVideosFromEnrollment = async (courseId: string): Promise<number> => {
  try {
    const enrollment = await getCourseEnrollment(courseId);
    if (!enrollment) return 0;
    
    const completedForCourse = enrollment.completedVideos.filter(
      video => video.courseId === courseId
    );
    
    return completedForCourse.length;
  } catch (error) {
    return 0;
  }
};

/**
 * Get last watched video for a course
 */
export const getLastWatchedFromEnrollment = async (courseId: string) => {
  try {
    const enrollment = await getCourseEnrollment(courseId);
    return enrollment?.lastWatched || null;
  } catch (error) {
    return null;
  }
};
