
// import api from './apiConfig';
// import { AxiosError } from 'axios';
// import { getUserEnrollments, getCourseEnrollment } from './enrollmentUtils';

// export interface CourseProgress {
//   _id: string;
//   user: string;
//   course: string;
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
// }

// /**
//  * Fetch course progress from enrollment data
//  * @param courseId - The course ID
//  * @returns Course progress data or null
//  */
// export const getCourseProgress = async (courseId: string): Promise<CourseProgress | null> => {
//   try {
//     console.log('📊 [getCourseProgress] Fetching progress for course:', courseId);
    
//     // Get enrollment which contains all progress data
//     const enrollment = await getCourseEnrollment(courseId);
    
//     if (!enrollment) {
//       console.log('❌ [getCourseProgress] No enrollment found for course:', courseId);
//       return null;
//     }
    
//     console.log('✅ [getCourseProgress] Progress found:', {
//       progress: enrollment.progress,
//       completedVideos: enrollment.completedVideos.length
//     });
    
//     return enrollment as CourseProgress;
//   } catch (error) {
//     console.error('❌ [getCourseProgress] Error fetching progress:', error);
//     return null;
//   }
// };

// /**
//  * Mark a lesson/video as complete
//  * @param courseId - The course ID
//  * @param moduleId - The module ID
//  * @param lessonId - The lesson/video ID
//  * @returns Updated enrollment data
//  */
// export const markVideoAsComplete = async (
//   courseId: string,
//   moduleId: string,
//   lessonId: string
// ): Promise<CourseProgress | null> => {
//   try {
//     console.log('✅ [markVideoAsComplete] Marking lesson complete:', {
//       courseId,
//       moduleId,
//       lessonId
//     });
    
//     const response = await api.post('/courses/progress/complete', {
//       courseId,
//       moduleId,
//       lessonId
//     });
    
//     console.log('✅ [markVideoAsComplete] Response:', response.data);
    
//     return response.data.enrollment;
//   } catch (error) {
//     console.error('❌ [markVideoAsComplete] Error:', error);
    
//     if (error instanceof AxiosError) {
//       const errorMessage = error.response?.data?.message || 'Failed to mark lesson as complete';
//       throw new Error(errorMessage);
//     }
    
//     throw error;
//   }
// };

// /**
//  * Check if a video is completed
//  * @param progress - Course progress data
//  * @param lessonId - The lesson/video ID
//  * @returns True if video is completed
//  */
// export const isVideoCompleted = (progress: CourseProgress | null, lessonId: string): boolean => {
//   if (!progress) return false;
  
//   const isCompleted = progress.completedVideos.some(video => video.lessonId === lessonId);
//   console.log(`🔍 [isVideoCompleted] Lesson ${lessonId}:`, isCompleted);
  
//   return isCompleted;
// };

// /**
//  * Get completed video count for a course
//  * @param progress - Course progress data
//  * @returns Number of completed videos
//  */
// export const getCompletedVideoCount = (progress: CourseProgress | null): number => {
//   if (!progress) return 0;
//   return progress.completedVideos.length;
// };

// /**
//  * Check if course has been started
//  * @param progress - Course progress data
//  * @returns True if course has been started
//  */
// export const hasCourseStarted = (progress: CourseProgress | null): boolean => {
//   if (!progress) return false;
//   return progress.completedVideos.length > 0 || progress.progress > 0;
// };

// /**
//  * Calculate completion percentage
//  * @param progress - Course progress data
//  * @param totalVideos - Total number of videos in the course
//  * @returns Completion percentage (0-100)
//  */
// export const getCompletionPercentage = (
//   progress: CourseProgress | null,
//   totalVideos: number
// ): number => {
//   if (!progress || totalVideos === 0) return 0;
  
//   // Use backend's progress percentage if available
//   if (progress.progress !== undefined) {
//     return Math.round(progress.progress);
//   }
  
//   // Fallback calculation
//   return Math.round((progress.completedVideos.length / totalVideos) * 100);
// };

// /**
//  * Get progress stats for display
//  * @param progress - Course progress data
//  * @param totalVideos - Total number of videos in the course
//  * @returns Progress statistics object
//  */
// export const getProgressStats = (
//   progress: CourseProgress | null,
//   totalVideos: number
// ) => {
//   if (!progress) {
//     return {
//       completedCount: 0,
//       totalCount: totalVideos,
//       percentage: 0,
//       hasStarted: false,
//       isCompleted: false,
//       lastWatched: null,
//       enrolledDate: null
//     };
//   }
  
//   return {
//     completedCount: progress.completedVideos.length,
//     totalCount: totalVideos,
//     percentage: getCompletionPercentage(progress, totalVideos),
//     hasStarted: hasCourseStarted(progress),
//     isCompleted: progress.isCompleted,
//     lastWatched: progress.lastWatched,
//     enrolledDate: progress.enrolledDate
//   };
// };

// /**
//  * Fetch progress for multiple courses at once
//  * @param courseIds - Array of course IDs
//  * @returns Map of course ID to progress data
//  */
// export const getMultipleCourseProgress = async (
//   courseIds: string[]
// ): Promise<Map<string, CourseProgress | null>> => {
//   console.log('📊 [getMultipleCourseProgress] Fetching progress for', courseIds.length, 'courses');
  
//   const progressMap = new Map<string, CourseProgress | null>();
  
//   // Fetch all progress data in parallel
//   const results = await Promise.allSettled(
//     courseIds.map(courseId => getCourseProgress(courseId))
//   );
  
//   results.forEach((result, index) => {
//     const courseId = courseIds[index];
    
//     if (result.status === 'fulfilled') {
//       progressMap.set(courseId, result.value);
//       console.log(`✅ [getMultipleCourseProgress] Course ${courseId}:`, result.value ? 'Has progress' : 'No progress');
//     } else {
//       console.error(`❌ [getMultipleCourseProgress] Failed for ${courseId}:`, result.reason);
//       progressMap.set(courseId, null);
//     }
//   });
  
//   return progressMap;
// };

// /**
//  * Get all courses that have been started (have progress)
//  * @param progressMap - Map of course ID to progress data
//  * @returns Array of course IDs with progress
//  */
// export const getAllCoursesWithProgress = (
//   progressMap: Map<string, CourseProgress | null>
// ): string[] => {
//   const coursesWithProgress: string[] = [];
  
//   progressMap.forEach((progress, courseId) => {
//     if (progress && hasCourseStarted(progress)) {
//       coursesWithProgress.push(courseId);
//     }
//   });
  
//   console.log('📊 [getAllCoursesWithProgress]:', coursesWithProgress.length, 'courses with progress');
//   return coursesWithProgress;
// };

// /**
//  * Get last watched video info
//  * @param progress - Course progress data
//  * @returns Last watched video info or null
//  */
// export const getLastWatchedVideo = (progress: CourseProgress | null) => {
//   return progress?.lastWatched || null;
// };

// /**
//  * Check if a module has any completed videos
//  * @param progress - Course progress data
//  * @param moduleId - The module ID
//  * @returns True if module has completed videos
//  */
// export const hasModuleProgress = (
//   progress: CourseProgress | null,
//   moduleId: string
// ): boolean => {
//   if (!progress) return false;
//   return progress.completedVideos.some(video => video.moduleId === moduleId);
// };

// /**
//  * Get completed videos count for a specific module
//  * @param progress - Course progress data
//  * @param moduleId - The module ID
//  * @returns Number of completed videos in the module
//  */
// export const getModuleCompletedCount = (
//   progress: CourseProgress | null,
//   moduleId: string
// ): number => {
//   if (!progress) return 0;
//   return progress.completedVideos.filter(video => video.moduleId === moduleId).length;
// };

// /**
//  * Calculate module completion percentage
//  * @param progress - Course progress data
//  * @param moduleId - The module ID
//  * @param totalModuleVideos - Total videos in the module
//  * @returns Module completion percentage (0-100)
//  */
// export const getModuleCompletionPercentage = (
//   progress: CourseProgress | null,
//   moduleId: string,
//   totalModuleVideos: number
// ): number => {
//   if (!progress || totalModuleVideos === 0) return 0;
  
//   const completedCount = getModuleCompletedCount(progress, moduleId);
//   return Math.round((completedCount / totalModuleVideos) * 100);
// };


import api from './apiConfig';
import { AxiosError } from 'axios';
import { getUserEnrollments, getCourseEnrollment } from './enrollmentUtils';

export interface CourseProgress {
  _id: string;
  user: string;
  course: string;
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
}

/**
 * Fetch course progress from enrollment data
 * @param courseId - The course ID
 * @returns Course progress data or null
 */
export const getCourseProgress = async (courseId: string): Promise<CourseProgress | null> => {
  try {
    const enrollment = await getCourseEnrollment(courseId);
    
    if (!enrollment) {
      return null;
    }
    
    return enrollment as CourseProgress;
  } catch (error) {
    return null;
  }
};

/**
 * Mark a lesson/video as complete
 * @param courseId - The course ID
 * @param moduleId - The module ID
 * @param lessonId - The lesson/video ID
 * @returns Updated enrollment data
 */
export const markVideoAsComplete = async (
  courseId: string,
  moduleId: string,
  lessonId: string
): Promise<CourseProgress | null> => {
  try {
    const response = await api.post('/courses/progress/complete', {
      courseId,
      moduleId,
      lessonId
    });
    
    return response.data.enrollment;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Failed to mark lesson as complete';
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

/**
 * Check if a video is completed
 * @param progress - Course progress data
 * @param lessonId - The lesson/video ID
 * @returns True if video is completed
 */
export const isVideoCompleted = (progress: CourseProgress | null, lessonId: string): boolean => {
  if (!progress) return false;
  return progress.completedVideos.some(video => video.lessonId === lessonId);
};

/**
 * Get completed video count for a course
 * @param progress - Course progress data
 * @returns Number of completed videos
 */
export const getCompletedVideoCount = (progress: CourseProgress | null): number => {
  if (!progress) return 0;
  return progress.completedVideos.length;
};

/**
 * Check if course has been started
 * @param progress - Course progress data
 * @returns True if course has been started
 */
export const hasCourseStarted = (progress: CourseProgress | null): boolean => {
  if (!progress) return false;
  return progress.completedVideos.length > 0 || progress.progress > 0;
};

/**
 * Calculate completion percentage
 * @param progress - Course progress data
 * @param totalVideos - Total number of videos in the course
 * @returns Completion percentage (0-100)
 */
export const getCompletionPercentage = (
  progress: CourseProgress | null,
  totalVideos: number
): number => {
  if (!progress || totalVideos === 0) return 0;
  
  // Use backend's progress percentage if available
  if (progress.progress !== undefined) {
    return Math.round(progress.progress);
  }
  
  // Fallback calculation
  return Math.round((progress.completedVideos.length / totalVideos) * 100);
};

/**
 * Get progress stats for display
 * @param progress - Course progress data
 * @param totalVideos - Total number of videos in the course
 * @returns Progress statistics object
 */
export const getProgressStats = (
  progress: CourseProgress | null,
  totalVideos: number
) => {
  if (!progress) {
    return {
      completedCount: 0,
      totalCount: totalVideos,
      percentage: 0,
      hasStarted: false,
      isCompleted: false,
      lastWatched: null,
      enrolledDate: null
    };
  }
  
  return {
    completedCount: progress.completedVideos.length,
    totalCount: totalVideos,
    percentage: getCompletionPercentage(progress, totalVideos),
    hasStarted: hasCourseStarted(progress),
    isCompleted: progress.isCompleted,
    lastWatched: progress.lastWatched,
    enrolledDate: progress.enrolledDate
  };
};

/**
 * Fetch progress for multiple courses at once
 * @param courseIds - Array of course IDs
 * @returns Map of course ID to progress data
 */
export const getMultipleCourseProgress = async (
  courseIds: string[]
): Promise<Map<string, CourseProgress | null>> => {
  const progressMap = new Map<string, CourseProgress | null>();
  
  // Fetch all progress data in parallel
  const results = await Promise.allSettled(
    courseIds.map(courseId => getCourseProgress(courseId))
  );
  
  results.forEach((result, index) => {
    const courseId = courseIds[index];
    
    if (result.status === 'fulfilled') {
      progressMap.set(courseId, result.value);
    } else {
      progressMap.set(courseId, null);
    }
  });
  
  return progressMap;
};

/**
 * Get all courses that have been started (have progress)
 * @param progressMap - Map of course ID to progress data
 * @returns Array of course IDs with progress
 */
export const getAllCoursesWithProgress = (
  progressMap: Map<string, CourseProgress | null>
): string[] => {
  const coursesWithProgress: string[] = [];
  
  progressMap.forEach((progress, courseId) => {
    if (progress && hasCourseStarted(progress)) {
      coursesWithProgress.push(courseId);
    }
  });
  
  return coursesWithProgress;
};

/**
 * Get last watched video info
 * @param progress - Course progress data
 * @returns Last watched video info or null
 */
export const getLastWatchedVideo = (progress: CourseProgress | null) => {
  return progress?.lastWatched || null;
};

/**
 * Check if a module has any completed videos
 * @param progress - Course progress data
 * @param moduleId - The module ID
 * @returns True if module has completed videos
 */
export const hasModuleProgress = (
  progress: CourseProgress | null,
  moduleId: string
): boolean => {
  if (!progress) return false;
  return progress.completedVideos.some(video => video.moduleId === moduleId);
};

/**
 * Get completed videos count for a specific module
 * @param progress - Course progress data
 * @param moduleId - The module ID
 * @returns Number of completed videos in the module
 */
export const getModuleCompletedCount = (
  progress: CourseProgress | null,
  moduleId: string
): number => {
  if (!progress) return 0;
  return progress.completedVideos.filter(video => video.moduleId === moduleId).length;
};

/**
 * Calculate module completion percentage
 * @param progress - Course progress data
 * @param moduleId - The module ID
 * @param totalModuleVideos - Total videos in the module
 * @returns Module completion percentage (0-100)
 */
export const getModuleCompletionPercentage = (
  progress: CourseProgress | null,
  moduleId: string,
  totalModuleVideos: number
): number => {
  if (!progress || totalModuleVideos === 0) return 0;
  
  const completedCount = getModuleCompletedCount(progress, moduleId);
  return Math.round((completedCount / totalModuleVideos) * 100);
};
