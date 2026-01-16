import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Auto-logout hook that tracks user inactivity
 * Logs out user after 1 hour (3600000ms) of inactivity
 */
export const useInactivityLogout = () => {
  const { logout, isAuthenticated } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour
  const WARNING_TIMEOUT = 55 * 60 * 1000; // 55 minutes
  // Reset the inactivity timer
  const resetTimer = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Only set timers if user is authenticated
    if (!isAuthenticated) return;

    // Set warning timer (55 minutes)
    warningTimeoutRef.current = setTimeout(() => {
      toast.error('You will be logged out in 5 minutes due to inactivity.', {
        duration: 10000,
        icon: '⚠️',
      });
    }, WARNING_TIMEOUT);

    // Set logout timer (60 minutes)
    timeoutRef.current = setTimeout(async () => {
      toast.error('You have been logged out due to inactivity.');
      await logout();
    }, INACTIVITY_TIMEOUT);
  }, [isAuthenticated, logout]);

  useEffect(() => {
    // Don't run if user is not authenticated
    if (!isAuthenticated) return;

    // Events that indicate user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Reset timer on any user activity
    const handleActivity = () => {
      resetTimer();
    };

    // Initialize timer
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    // Cleanup function
    return () => {
      // Remove event listeners
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });

      // Clear timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [isAuthenticated, resetTimer]);

  return null;
};
