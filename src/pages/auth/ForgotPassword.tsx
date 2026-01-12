import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface ForgotPasswordFormData {
  email: string;
}

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    console.log('🔍 [FORGOT PASSWORD] Initiating password reset for:', data.email);

    try {
      const response = await forgotPassword(data.email);

      console.log('✅ [FORGOT PASSWORD] Success:', response);

      // Store the email and show success state
      setSubmittedEmail(data.email);
      setEmailSent(true);
      toast.success('Password reset email sent successfully! 📧');
    } catch (error) {
      console.error('❌ [FORGOT PASSWORD] Error:', error);

      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send reset email. Please try again.';
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Forgot Password Form Section */}
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
                {emailSent ? 'Check Your Email' : 'Reset Password'}
              </motion.div>
              <h1 className="text-4xl text-gray-900 mb-3">
                {emailSent ? 'Email Sent!' : 'Forgot Your Password?'}
              </h1>
              <p className="text-gray-600">
                {emailSent
                  ? "We've sent password reset instructions to your email"
                  : "No worries, we'll send you reset instructions"}
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {emailSent ? (
                // Success State
                <div className="space-y-6">
                  {/* Success Icon */}
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

                  {/* Success Message */}
                  <motion.div
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-700">
                      We've sent a password reset link to:
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {submittedEmail}
                    </p>
                  </motion.div>

                  {/* Instructions */}
                  <motion.div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800 space-y-2">
                        <p className="font-semibold">Next steps:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Check your email inbox</li>
                          <li>Click the reset link in the email</li>
                          <li>Create a new password</li>
                          <li>If you don't see the email, check your spam folder</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Back to Login Button */}
                  <motion.button
                    onClick={handleBackToLogin}
                    className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Login
                  </motion.button>

                  {/* Resend Option */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setEmailSent(false);
                        setSubmittedEmail('');
                      }}
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      Didn't receive the email? Try again
                    </button>
                  </div>
                </div>
              ) : (
                // Form State
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Info Message */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      Enter your email address and we'll send you instructions to
                      reset your password.
                    </p>
                  </div>

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
                        autoFocus
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
                        Sending Email...
                      </>
                    ) : (
                      <>
                        Send Reset Instructions
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
                      className="w-full bg-white text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Login
                    </motion.button>
                  </Link>
                </form>
              )}
            </motion.div>

            {/* Additional Info */}
            {!emailSent && (
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
