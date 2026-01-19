import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Footer  from '../../components/Footer';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { getEnrolledCoursesCount } from '../../utils/enrollmentUtils';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showSessionConflict, setShowSessionConflict] = useState(false);
  const [pendingLoginData, setPendingLoginData] = useState<{ email: string; password: string } | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = (location.state as any)?.from?.pathname;
  
  // Clear stale auth when login page mounts
  useEffect(() => {
    localStorage.removeItem('auth');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  /**
   * ✅ Smart redirect based on enrollment status with loading state
   */
  const handleSuccessfulLogin = async () => {
    setIsRedirecting(true);
    
    try {
      // Check if user was trying to access a specific page
      // But ignore dashboard routes if user has no enrollments
      const isDashboardRoute = from && from.startsWith('/dashboard');
      const isCourseRoute = from && (from.startsWith('/course') || from.includes('/courses/'));
      const isProtectedRoute = isDashboardRoute || isCourseRoute;
      
      // Only redirect to 'from' if it's not a protected route
      if (from && from !== '/auth/login' && !isProtectedRoute) {
        // Small delay for smooth transition
        await new Promise(resolve => setTimeout(resolve, 300));
        navigate(from, { replace: true });
        return;
      }

      // Check enrollment status to decide where to redirect
      const enrolledCount = await getEnrolledCoursesCount();
      
      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (enrolledCount > 0) {
        // User has enrollments - go to dashboard (or the protected route they wanted)
        if (isProtectedRoute && from) {
          navigate(from, { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        // No enrollments - go to home page
        navigate('/', { replace: true });
      }
    } catch (error) {
      // If enrollment check fails, default to home page
      await new Promise(resolve => setTimeout(resolve, 300));
      navigate('/', { replace: true });
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setShowSessionConflict(false);

    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      // Check if backend requires confirmation (active session detected)
      if (response.requiresConfirmation) {
        // Show confirmation dialog (no toast)
        setShowSessionConflict(true);
        setPendingLoginData({
          email: data.email,
          password: data.password,
        });
        setIsLoading(false);
      } else if (response.success) {
        // ✅ Smart redirect based on enrollment
        await handleSuccessfulLogin();
      }
    } catch (error) {
      // Only show toast for actual errors (wrong password, network issues, etc.)
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleClearAndLogin = async () => {
    if (!pendingLoginData) return;

    setIsLoading(true);
    setShowSessionConflict(false);

    try {
      // Retry login with clearOtherSessions flag
      const response = await login({
        ...pendingLoginData,
        clearOtherSessions: true
      });

      if (response.success) {
        toast.success('Login successful 🎉');
        setPendingLoginData(null);
        
        // ✅ Smart redirect based on enrollment
        await handleSuccessfulLogin();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Login failed'
      );
      setIsLoading(false);
    }
  };

  const handleCancelForce = () => {
    setShowSessionConflict(false);
    setPendingLoginData(null);
  };

  // Show loading overlay during redirect
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Login Form Section */}
      <div className="py-6 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-block bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full border border-orange-200 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Welcome Back
              </motion.div>
              <h1 className="text-4xl text-gray-900 mb-3">Sign In to Your Account</h1>
              <p className="text-gray-600">Continue your journey to KDP publishing success</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Session Conflict Banner */}
              <AnimatePresence>
                {showSessionConflict && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-5 overflow-hidden shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 p-2">
                        <h3 className="text-base font-bold text-orange-900 mb-2">
                          🔒 Active Session Detected
                        </h3>
                        <p className="text-sm text-orange-800 mb-3 leading-relaxed">
                          You're already logged in on another device. To continue here, you'll need to end that session first.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={handleClearAndLogin}
                            disabled={isLoading}
                            className="flex-1 bg-orange-600 text-white px-5 py-2.5 rounded-lg hover:bg-orange-700 transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Clearing Session...
                              </>
                            ) : (
                              <>
                                End & Continue
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleCancelForce}
                            disabled={isLoading}
                            className="flex-1 sm:flex-none bg-white border-2 border-orange-300 text-orange-700 px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-primary hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link to="/auth/enroll">
                <motion.button
                  type="button"
                  className="w-full bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create New Account
                </motion.button>
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Secure login with 256-bit encryption</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
