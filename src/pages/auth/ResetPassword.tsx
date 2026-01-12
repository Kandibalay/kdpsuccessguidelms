import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const password = watch('password');

  useEffect(() => {
    // Check if token exists
    if (!token) {
      console.error('❌ [RESET PASSWORD] No token found in URL');
      setTokenValid(false);
      toast.error('Invalid reset link. Please request a new password reset.');
    } else {
      console.log('✅ [RESET PASSWORD] Token found:', token);
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Invalid reset link');
      return;
    }

    setIsLoading(true);

    console.log('🔍 [RESET PASSWORD] Initiating password reset with token:', token);

    try {
      const response = await resetPassword(token, {
        password: data.password,
        confirmPassword: data.confirmPassword
      });

      console.log('✅ [RESET PASSWORD] Success:', response);

      setResetSuccess(true);
      toast.success('Password reset successfully! 🎉');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      console.error('❌ [RESET PASSWORD] Error:', error);

      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to reset password. The link may have expired.';
      
      // Check if it's a token expiration error
      if (errorMessage.includes('expired') || errorMessage.includes('invalid')) {
        setTokenValid(false);
        toast.error('This reset link is invalid or has expired. Please request a new one.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-white">
        <div className="py-6 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block bg-red-500/10 text-red-600 px-4 py-2 rounded-full border border-red-200 mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Invalid Link
                </motion.div>
                <h1 className="text-4xl text-gray-900 mb-3">Reset Link Invalid</h1>
                <p className="text-gray-600">This password reset link is invalid or has expired</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-12 h-12 text-red-600" />
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <p className="text-gray-700">
                      The password reset link you used is either invalid or has expired.
                    </p>
                    <p className="text-sm text-gray-600">
                      Password reset links are valid for 1 hour for security reasons.
                    </p>
                  </div>

                  <Link to="/auth/forgot-password">
                    <motion.button
                      className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request New Reset Link
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  <Link to="/auth/login">
                    <motion.button
                      type="button"
                      className="w-full bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Login
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
                {resetSuccess ? 'Success!' : 'Create New Password'}
              </motion.div>
              <h1 className="text-4xl text-gray-900 mb-3">
                {resetSuccess ? 'Password Updated!' : 'Reset Your Password'}
              </h1>
              <p className="text-gray-600">
                {resetSuccess
                  ? 'Your password has been successfully changed'
                  : 'Enter a strong password to secure your account'}
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {resetSuccess ? (
                // Success State
                <div className="space-y-6">
                  <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-700">
                      Your password has been reset successfully!
                    </p>
                    <p className="text-sm text-gray-600">
                      You can now sign in with your new password.
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-sm text-blue-800 text-center">
                      Redirecting to login page in 3 seconds...
                    </p>
                  </motion.div>

                  <Link to="/auth/login">
                    <motion.button
                      className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Go to Login
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              ) : (
                // Form State
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Info Message */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      Choose a strong password with at least 8 characters, including
                      uppercase, lowercase, numbers, and special characters.
                    </p>
                  </div>

                  {/* New Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                      New Password
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
                            value: 8,
                            message: 'Password must be at least 8 characters',
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
                            message: 'Password must include uppercase, lowercase, number, and special character',
                          },
                        })}
                        className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your new password"
                        autoFocus
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
                    
                    {/* Password Strength Indicator */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${passwordStrength.color} transition-all duration-300`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {passwordStrength.label}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) =>
                            value === password || 'Passwords do not match',
                        })}
                        className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
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
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                  </div>

                  {/* Back to Login Link */}
                  <Link to="/auth/login">
                    <motion.button
                      type="button"
                      className="w-full bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Login
                    </motion.button>
                  </Link>
                </form>
              )}
            </motion.div>

            {/* Additional Info */}
            {!resetSuccess && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
