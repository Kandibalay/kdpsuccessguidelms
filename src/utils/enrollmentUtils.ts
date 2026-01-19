// /**
//  * Enrollment Utilities - Production Version
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
//     return response.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw error;
//     }
//     throw new Error('Failed to fetch enrollments');
//   }
// };

// /**
//  * Check if user is enrolled in a specific course
//  */
// export const isUserEnrolled = async (courseId: string): Promise<boolean> => {
//   try {
//     const response = await getUserEnrollments();
//     const enrollments = response.enrollments || [];
    
//     // Check if any enrollment matches the courseId
//     const isEnrolled = enrollments.some(enrollment => {
//       // Case 1: Direct course field match (handle both string and object)
//       const enrollmentCourseId = extractCourseId(enrollment.course);
//       if (enrollmentCourseId === courseId) {
//         return true;
//       }
      
//       // Case 2: Check completedVideos array
//       if (enrollment.completedVideos && enrollment.completedVideos.length > 0) {
//         const hasMatchingVideo = enrollment.completedVideos.some(video => {
//           return video.courseId === courseId;
//         });
        
//         if (hasMatchingVideo) {
//           return true;
//         }
//       }
      
//       return false;
//     });
    
//     return isEnrolled;
    
//   } catch (error) {
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
    
//     return enrollment || null;
//   } catch (error) {
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
    
//     return uniqueCourseIds.size;
//   } catch (error) {
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
    
//     return Array.from(courseIds);
//   } catch (error) {
//     return [];
//   }
// };

// /**
//  * Check if user has any enrollments
//  */
// export const hasAnyEnrollments = async (): Promise<boolean> => {
//   try {
//     const response = await getUserEnrollments();
//     return (response.count || 0) > 0;
//   } catch (error) {
//     return false;
//   }
// };

// /**
//  * Get progress percentage for a specific course
//  */
// export const getCourseProgressFromEnrollment = async (courseId: string): Promise<number> => {
//   try {
//     const enrollment = await getCourseEnrollment(courseId);
//     return enrollment?.progress || 0;
//   } catch (error) {
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
    
//     return completedForCourse.length;
//   } catch (error) {
//     return 0;
//   }
// };

// /**
//  * Get last watched video for a course
//  */
// export const getLastWatchedFromEnrollment = async (courseId: string) => {
//   try {
//     const enrollment = await getCourseEnrollment(courseId);
//     return enrollment?.lastWatched || null;
//   } catch (error) {
//     return null;
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
 * Check if user is authenticated by checking if token exists
 */
const isAuthenticated = (): boolean => {
  try {
    const authData = localStorage.getItem('auth');
    if (!authData) return false;
    
    const parsed = JSON.parse(authData);
    return Boolean(parsed.token && parsed.user);
  } catch {
    return false;
  }
};

/**
 * Fetch all user enrollments from backend
 * ✅ FIXED: Only makes API call if user is authenticated
 */
export const getUserEnrollments = async (): Promise<EnrollmentResponse> => {
  // ✅ Check authentication first
  if (!isAuthenticated()) {
    return { enrollments: [], count: 0 };
  }

  try {
    const response = await api.get<EnrollmentResponse>('/courses/user/enrollments');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If 401, return empty response instead of throwing
      if (error.response?.status === 401) {
        return { enrollments: [], count: 0 };
      }
      throw error;
    }
    throw new Error('Failed to fetch enrollments');
  }
};

/**
 * Check if user is enrolled in a specific course
 * ✅ FIXED: Returns false immediately if not authenticated
 */
export const isUserEnrolled = async (courseId: string): Promise<boolean> => {
  // ✅ Return false if not authenticated
  if (!isAuthenticated()) {
    return false;
  }

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
 * ✅ FIXED: Returns null immediately if not authenticated
 */
export const getCourseEnrollment = async (courseId: string): Promise<Enrollment | null> => {
  // ✅ Return null if not authenticated
  if (!isAuthenticated()) {
    return null;
  }

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
 * ✅ FIXED: Returns 0 immediately if not authenticated
 */
export const getEnrolledCoursesCount = async (): Promise<number> => {
  // ✅ Return 0 if not authenticated
  if (!isAuthenticated()) {
    return 0;
  }

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
 * ✅ FIXED: Returns empty array immediately if not authenticated
 */
export const getEnrolledCourseIds = async (): Promise<string[]> => {
  // ✅ Return empty array if not authenticated
  if (!isAuthenticated()) {
    return [];
  }

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
 * ✅ FIXED: Returns false immediately if not authenticated
 */
export const hasAnyEnrollments = async (): Promise<boolean> => {
  // ✅ Return false if not authenticated
  if (!isAuthenticated()) {
    return false;
  }

  try {
    const response = await getUserEnrollments();
    return (response.count || 0) > 0;
  } catch (error) {
    return false;
  }
};

/**
 * Get progress percentage for a specific course
 * ✅ FIXED: Returns 0 immediately if not authenticated
 */
export const getCourseProgressFromEnrollment = async (courseId: string): Promise<number> => {
  // ✅ Return 0 if not authenticated
  if (!isAuthenticated()) {
    return 0;
  }

  try {
    const enrollment = await getCourseEnrollment(courseId);
    return enrollment?.progress || 0;
  } catch (error) {
    return 0;
  }
};

/**
 * Get completed videos count for a specific course
 * ✅ FIXED: Returns 0 immediately if not authenticated
 */
export const getCompletedVideosFromEnrollment = async (courseId: string): Promise<number> => {
  // ✅ Return 0 if not authenticated
  if (!isAuthenticated()) {
    return 0;
  }

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
 * ✅ FIXED: Returns null immediately if not authenticated
 */
export const getLastWatchedFromEnrollment = async (courseId: string) => {
  // ✅ Return null if not authenticated
  if (!isAuthenticated()) {
    return null;
  }

  try {
    const enrollment = await getCourseEnrollment(courseId);
    return enrollment?.lastWatched || null;
  } catch (error) {
    return null;
  }
};
