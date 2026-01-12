// /**
//  * Course Progress Utility - IMPROVED VERSION
//  * Stores progress PER COURSE using course ID as key
//  * This prevents mixing progress from different courses
//  */

// // interface CourseProgress {
// //   completedVideoIds: string[];
// //   hasStarted: boolean;
// //   lastWatchedVideoId: string | null;
// //   lastUpdated: string;
// // }



// export interface CourseProgress {
//   completedVideoIds: string[];
//   hasStarted: boolean;
//   lastWatchedVideoId: string | null;
//   lastUpdated: string;
// }

// /**
//  * Get storage key for a specific course
//  * @param courseId - Optional course ID. If not provided, tries to get from URL
//  */
// const getStorageKey = (courseId?: string): string => {
//   if (courseId) {
//     return `kdp_course_progress_${courseId}`;
//   }
  
//   // Try to get course ID from URL
//   const pathParts = window.location.pathname.split('/');
//   const urlCourseId = pathParts[pathParts.length - 1];
  
//   if (urlCourseId && urlCourseId !== 'courses') {
//     return `kdp_course_progress_${urlCourseId}`;
//   }
  
//   // Fallback to global key (for backward compatibility)
//   return 'kdp_course_progress';
// };

// export const getCourseProgress = (courseId?: string): CourseProgress => {
//   try {
//     const storageKey = getStorageKey(courseId);
//     const stored = localStorage.getItem(storageKey);
    
//     if (stored) {
//       const parsed = JSON.parse(stored);
      
//       // Migration: Convert old number IDs to strings if needed
//       if (parsed.completedVideoIds && Array.isArray(parsed.completedVideoIds)) {
//         parsed.completedVideoIds = parsed.completedVideoIds.map((id: any) => String(id));
//       }
      
//       return {
//         completedVideoIds: parsed.completedVideoIds || [],
//         hasStarted: parsed.hasStarted || false,
//         lastWatchedVideoId: parsed.lastWatchedVideoId || null,
//         lastUpdated: parsed.lastUpdated || new Date().toISOString()
//       };
//     }
//   } catch (error) {
//     console.error('Error reading course progress:', error);
//   }
  
//   return {
//     completedVideoIds: [],
//     hasStarted: false,
//     lastWatchedVideoId: null,
//     lastUpdated: new Date().toISOString()
//   };
// };

// export const saveCourseProgress = (progress: CourseProgress, courseId?: string): void => {
//   try {
//     const storageKey = getStorageKey(courseId);
//     progress.lastUpdated = new Date().toISOString();
//     localStorage.setItem(storageKey, JSON.stringify(progress));
//   } catch (error) {
//     console.error('Error saving course progress:', error);
//   }
// };

// export const markVideoAsComplete = (videoIdOrCourseId: string, videoId?: string): void => {
//   // Support both old and new signatures
//   // Old: markVideoAsComplete(videoId)
//   // New: markVideoAsComplete(courseId, videoId)
  
//   let courseId: string | undefined;
//   let actualVideoId: string;
  
//   if (videoId) {
//     // New signature: markVideoAsComplete(courseId, videoId)
//     courseId = videoIdOrCourseId;
//     actualVideoId = videoId;
//   } else {
//     // Old signature: markVideoAsComplete(videoId)
//     actualVideoId = videoIdOrCourseId;
//   }
  
//   const progress = getCourseProgress(courseId);
  
//   if (!progress.completedVideoIds.includes(actualVideoId)) {
//     progress.completedVideoIds.push(actualVideoId);
//     progress.hasStarted = true;
//     progress.lastWatchedVideoId = actualVideoId;
//     saveCourseProgress(progress, courseId);
//   }
// };

// export const markCourseAsStarted = (courseId?: string): void => {
//   const progress = getCourseProgress(courseId);
  
//   if (!progress.hasStarted) {
//     progress.hasStarted = true;
//     saveCourseProgress(progress, courseId);
//   }
// };

// export const isVideoCompleted = (videoIdOrCourseId: string, videoId?: string): boolean => {
//   // Support both old and new signatures
//   let courseId: string | undefined;
//   let actualVideoId: string;
  
//   if (videoId) {
//     // New signature: isVideoCompleted(courseId, videoId)
//     courseId = videoIdOrCourseId;
//     actualVideoId = videoId;
//   } else {
//     // Old signature: isVideoCompleted(videoId)
//     actualVideoId = videoIdOrCourseId;
//   }
  
//   const progress = getCourseProgress(courseId);
//   return progress.completedVideoIds.includes(actualVideoId);
// };

// export const hasCourseStarted = (courseId?: string): boolean => {
//   const progress = getCourseProgress(courseId);
//   return progress.hasStarted;
// };

// export const getCompletedVideoCount = (courseId?: string): number => {
//   const progress = getCourseProgress(courseId);
//   return progress.completedVideoIds.length;
// };

// export const updateLastWatchedVideo = (videoIdOrCourseId: string, videoId?: string): void => {
//   // Support both old and new signatures
//   let courseId: string | undefined;
//   let actualVideoId: string;
  
//   if (videoId) {
//     // New signature: updateLastWatchedVideo(courseId, videoId)
//     courseId = videoIdOrCourseId;
//     actualVideoId = videoId;
//   } else {
//     // Old signature: updateLastWatchedVideo(videoId)
//     actualVideoId = videoIdOrCourseId;
//   }
  
//   const progress = getCourseProgress(courseId);
//   progress.lastWatchedVideoId = actualVideoId;
//   saveCourseProgress(progress, courseId);
// };

// export const getCompletionPercentage = (totalVideos: number, courseId?: string): number => {
//   const progress = getCourseProgress(courseId);
//   if (totalVideos === 0) return 0;
//   return Math.round((progress.completedVideoIds.length / totalVideos) * 100);
// };

// export const getProgressStats = (totalVideos: number, courseId?: string) => {
//   const progress = getCourseProgress(courseId);
//   return {
//     completedCount: progress.completedVideoIds.length,
//     totalCount: totalVideos,
//     percentage: getCompletionPercentage(totalVideos, courseId),
//     hasStarted: progress.hasStarted,
//     lastWatchedVideoId: progress.lastWatchedVideoId,
//     lastUpdated: progress.lastUpdated
//   };
// };

// export const resetCourseProgress = (courseId?: string): void => {
//   const storageKey = getStorageKey(courseId);
//   localStorage.removeItem(storageKey);
// };

// /**
//  * Get all courses that have progress stored
//  * @returns Array of course IDs
//  */
// export const getAllCoursesWithProgress = (): string[] => {
//   const courses: string[] = [];
  
//   try {
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key && key.startsWith('kdp_course_progress_') && key !== 'kdp_course_progress') {
//         const courseId = key.replace('kdp_course_progress_', '');
//         courses.push(courseId);
//       }
//     }
//   } catch (error) {
//     console.error('Error getting courses with progress:', error);
//   }
  
//   return courses;
// };

// /**
//  * Migrate old global progress to course-specific storage
//  * Call this once to migrate existing user progress
//  * @param courseId - The course ID to migrate to
//  */
// export const migrateToPerCourseStorage = (courseId: string): void => {
//   try {
//     const oldKey = 'kdp_course_progress';
//     const oldProgress = localStorage.getItem(oldKey);
    
//     if (oldProgress) {
//       const newKey = `kdp_course_progress_${courseId}`;
      
//       // Only migrate if new key doesn't exist
//       if (!localStorage.getItem(newKey)) {
//         localStorage.setItem(newKey, oldProgress);
//         console.log('✅ Migrated old progress to course:', courseId);
//       }
      
//       // Remove old global progress
//       localStorage.removeItem(oldKey);
//       console.log('🧹 Removed old global progress');
//     }
//   } catch (error) {
//     console.error('❌ Error migrating progress:', error);
//   }
// };

// /**
//  * Clean invalid video IDs from course progress
//  * Removes video IDs that don't exist in the provided valid list
//  * @param validVideoIds - Array of valid video IDs for the course
//  * @param courseId - Optional course ID
//  */
// export const cleanInvalidVideoIds = (validVideoIds: string[], courseId?: string): void => {
//   try {
//     const progress = getCourseProgress(courseId);
//     const initialCount = progress.completedVideoIds.length;
    
//     // Filter to keep only valid IDs
//     progress.completedVideoIds = progress.completedVideoIds.filter(id => 
//       validVideoIds.includes(id)
//     );
    
//     const removedCount = initialCount - progress.completedVideoIds.length;
    
//     if (removedCount > 0) {
//       saveCourseProgress(progress, courseId);
//       console.log(`🧹 Cleaned ${removedCount} invalid video IDs from progress`);
//     }
//   } catch (error) {
//     console.error('❌ Error cleaning invalid video IDs:', error);
//   }
// };


/**
 * Course Progress Utility - API VERSION
 * Uses backend API for progress tracking with secure axios configuration
 */

import api from './apiConfig'; // Secure axios instance with .env baseURL
import { AxiosError } from 'axios';

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
 * Fetch course progress from backend
 * @param courseId - The course ID
 * @returns Course progress data
 */
export const getCourseProgress = async (courseId: string): Promise<CourseProgress | null> => {
  try {
    console.log('🔍 [getCourseProgress] Fetching progress for course:', courseId);
    
    const response = await api.post(`/courses/${courseId}/progress`);
    
    console.log('✅ [getCourseProgress] Progress received:', response.data.progress);
    
    return response.data.progress;
  } catch (error) {
    console.error('❌ [getCourseProgress] Error fetching progress:', error);
    
    if (error instanceof AxiosError) {
      // If 404, user might not be enrolled yet
      if (error.response?.status === 404) {
        console.log('ℹ️ [getCourseProgress] No progress found - user may not be enrolled');
        return null;
      }
      
      // If 401, user is not authenticated
      if (error.response?.status === 401) {
        console.error('❌ [getCourseProgress] User not authenticated');
        throw new Error('Please login to view course progress');
      }
    }
    
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
    console.log('🔍 [markVideoAsComplete] Marking lesson complete:', {
      courseId,
      moduleId,
      lessonId
    });
    
    const response = await api.post('/courses/progress/complete', {
      courseId,
      moduleId,
      lessonId
    });
    
    console.log('✅ [markVideoAsComplete] Lesson marked complete:', response.data.enrollment);
    
    return response.data.enrollment;
  } catch (error) {
    console.error('❌ [markVideoAsComplete] Error marking lesson complete:', error);
    
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
 * @returns Progress statistics
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
  
  console.log('🔍 [getMultipleCourseProgress] Fetching progress for courses:', courseIds);
  
  // Fetch all progress data in parallel
  const results = await Promise.allSettled(
    courseIds.map(courseId => getCourseProgress(courseId))
  );
  
  results.forEach((result, index) => {
    const courseId = courseIds[index];
    
    if (result.status === 'fulfilled') {
      progressMap.set(courseId, result.value);
    } else {
      console.error(`❌ Failed to fetch progress for course ${courseId}:`, result.reason);
      progressMap.set(courseId, null);
    }
  });
  
  console.log('✅ [getMultipleCourseProgress] Progress fetched for all courses');
  
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
