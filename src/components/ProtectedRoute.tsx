import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, auth } = useAuth();
  const location = useLocation();

  console.log('🔒 [ProtectedRoute] Auth check:', {
    isAuthenticated,
    hasToken: !!auth.token,
    hasUser: !!auth.user,
    loading,
    currentPath: location.pathname
  });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login and save the intended destination
  if (!isAuthenticated) {
    console.log('❌ [ProtectedRoute] User not authenticated, redirecting to login');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  console.log('✅ [ProtectedRoute] User authenticated, rendering protected content');
  return <>{children}</>;
}
