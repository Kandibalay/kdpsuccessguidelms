// // import { useState, useEffect } from 'react';
// // import { isUserEnrolled } from '../utils/enrollmentUtils';

// // /**
// //  * Hook to check if user is enrolled in a course
// //  * Returns: { isEnrolled, isChecking, recheckEnrollment }
// //  */
// // export const useEnrollment = (courseId: string | undefined) => {
// //   const [isEnrolled, setIsEnrolled] = useState(false);
// //   const [isChecking, setIsChecking] = useState(true);

// //   const recheckEnrollment = async () => {
// //     if (!courseId) {
// //       setIsChecking(false);
// //       setIsEnrolled(false);
// //       return;
// //     }

// //     setIsChecking(true);
// //     try {
// //       const enrolled = await isUserEnrolled(courseId);
// //       setIsEnrolled(enrolled);
// //     } catch (error) {
// //       setIsEnrolled(false);
// //     } finally {
// //       setIsChecking(false);
// //     }
// //   };

// //   useEffect(() => {
// //     recheckEnrollment();
// //   }, [courseId]);

// //   return { isEnrolled, isChecking, recheckEnrollment };
// // };


// import { useState, useEffect } from 'react';
// import { isUserEnrolled } from '../utils/enrollmentUtils';

// /**
//  * Hook to check if user is enrolled in a course
//  * Returns: { isEnrolled, isChecking, recheckEnrollment }
//  */
// export const useEnrollment = (courseId: string | undefined) => {
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);

//   const recheckEnrollment = async () => {
//     if (!courseId) {
//       console.log('⚠️ [useEnrollment] No courseId provided');
//       setIsChecking(false);
//       setIsEnrolled(false);
//       return;
//     }

//     setIsChecking(true);
//     console.log('🔍 [useEnrollment] Checking enrollment for course:', courseId);
    
//     try {
//       const enrolled = await isUserEnrolled(courseId);
//       console.log(`${enrolled ? '✅' : '❌'} [useEnrollment] Enrollment status:`, enrolled);
//       setIsEnrolled(enrolled);
//     } catch (error) {
//       console.error('❌ [useEnrollment] Error checking enrollment:', error);
//       setIsEnrolled(false);
//     } finally {
//       setIsChecking(false);
//     }
//   };

//   useEffect(() => {
//     recheckEnrollment();
//   }, [courseId]);

//   return { isEnrolled, isChecking, recheckEnrollment };
// };


import { useState, useEffect } from 'react';
import { isUserEnrolled } from '../utils/enrollmentUtils';

/**
 * Hook to check if user is enrolled in a course
 * Returns: { isEnrolled, isChecking, recheckEnrollment }
 */
export const useEnrollment = (courseId: string | undefined) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const recheckEnrollment = async () => {
    if (!courseId) {
      setIsChecking(false);
      setIsEnrolled(false);
      return;
    }

    setIsChecking(true);
    
    try {
      const enrolled = await isUserEnrolled(courseId);
      setIsEnrolled(enrolled);
    } catch (error) {
      setIsEnrolled(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    recheckEnrollment();
  }, [courseId]);

  return { isEnrolled, isChecking, recheckEnrollment };
};
