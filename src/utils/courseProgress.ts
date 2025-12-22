// Course Progress Management Utility
// Tracks which videos have been completed and course status

const STORAGE_KEY = 'kdp_course_progress';

export interface CourseProgress {
  completedVideoIds: number[];
  hasStarted: boolean;
}

export const getCourseProgress = (): CourseProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading course progress:', error);
  }
  
  return {
    completedVideoIds: [],
    hasStarted: false,
  };
};

export const saveCourseProgress = (progress: CourseProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving course progress:', error);
  }
};

export const markVideoAsComplete = (videoId: number): void => {
  const progress = getCourseProgress();
  
  if (!progress.completedVideoIds.includes(videoId)) {
    progress.completedVideoIds.push(videoId);
    progress.hasStarted = true;
    saveCourseProgress(progress);
  }
};

export const markCourseAsStarted = (): void => {
  const progress = getCourseProgress();
  
  if (!progress.hasStarted) {
    progress.hasStarted = true;
    saveCourseProgress(progress);
  }
};

export const isVideoCompleted = (videoId: number): boolean => {
  const progress = getCourseProgress();
  return progress.completedVideoIds.includes(videoId);
};

export const hasCourseStarted = (): boolean => {
  const progress = getCourseProgress();
  return progress.hasStarted;
};

export const getCompletedVideoCount = (): number => {
  const progress = getCourseProgress();
  return progress.completedVideoIds.length;
};

export const resetCourseProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
