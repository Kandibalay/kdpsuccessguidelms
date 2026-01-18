import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Star, Users, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import api from '../utils/apiConfig';
import { useEnrollment } from '../hooks/useEnrollment';
import { getCourseProgress, hasCourseStarted } from '../utils/courseProgress';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  price: number;
  totalVideos: number;
  modules: any[];
  averageRating: number;
  totalRatings: number;
  instructor: {
    fullName: string;
  };
  slug: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [courseStarted, setCourseStarted] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(false);

  // Check if we need to verify payment
  const shouldVerify = searchParams.get('verify') === 'true';
  
  // Verification states
  const [isVerifying, setIsVerifying] = useState(shouldVerify);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const MAX_ATTEMPTS = 20;

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/courses');
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const calculateDuration = (modules: any[]) => {
    let totalMinutes = 0;
    modules.forEach(module => {
      module.videos?.forEach((video: any) => {
        const [minutes, seconds] = video.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return hours > 0 ? `${hours}+ hours` : `${mins} mins`;
  };

  const featuredCourse = courses[0];
  const { isEnrolled: isFeaturedEnrolled, isChecking: checkingFeaturedEnrollment, recheckEnrollment } = useEnrollment(featuredCourse?._id);

  // Check if course has been started
  useEffect(() => {
    const checkProgress = async () => {
      if (isFeaturedEnrolled && featuredCourse?._id) {
        setCheckingProgress(true);
        try {
          const progress = await getCourseProgress(featuredCourse._id);
          const started = hasCourseStarted(progress);
          setCourseStarted(started);
        } catch (err) {
          setCourseStarted(false);
        } finally {
          setCheckingProgress(false);
        }
      }
    };

    checkProgress();
  }, [isFeaturedEnrolled, featuredCourse?._id]);

  // Poll for enrollment after payment
  useEffect(() => {
    if (!shouldVerify || !featuredCourse?._id) return;

    let pollInterval: NodeJS.Timeout;

    const startPolling = () => {
      pollInterval = setInterval(async () => {
        console.log(`🔍 Checking enrollment... Attempt ${verificationAttempts + 1}/${MAX_ATTEMPTS}`);
        
        await recheckEnrollment();
        
        setVerificationAttempts(prev => {
          const newAttempts = prev + 1;
          
          if (newAttempts >= MAX_ATTEMPTS) {
            clearInterval(pollInterval);
            setIsVerifying(false);
            searchParams.delete('verify');
            setSearchParams(searchParams);
          }
          
          return newAttempts;
        });
      }, 3000);
    };

    startPolling();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [shouldVerify, featuredCourse?._id]);

  // Stop verification when enrollment is detected
  useEffect(() => {
    if (isFeaturedEnrolled && shouldVerify) {
      console.log('✅ Enrollment confirmed!');
      setIsVerifying(false);
      searchParams.delete('verify');
      setSearchParams(searchParams);
    }
  }, [isFeaturedEnrolled, shouldVerify]);

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentUrl = window.location.href.split('?')[0];
    const returnUrl = `${currentUrl}?verify=true`;
    const selarUrl = `https://selar.co/549892?return_url=${encodeURIComponent(returnUrl)}`;
    window.location.href = selarUrl;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565688695721-2b6f5a880a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsZWFybmluZ3xlbnwxfHx8fDE3NjU0NjAxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Courses hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary/95"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              className="inline-block bg-orange-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-orange-300/30 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Professional KDP Training
            </motion.div>
            <motion.h1 
              className="text-white text-4xl md:text-5xl mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore Our Courses
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive training programs designed to help you succeed in Amazon Kindle Direct Publishing and beyond.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Verification Banner */}
      {isVerifying && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-6 py-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin flex-shrink-0" />
              <div className="flex-1">
                <p className="text-blue-900 font-medium">
                  Verifying your payment... Attempt {verificationAttempts} of {MAX_ATTEMPTS}
                </p>
                <div className="mt-2 h-1.5 bg-blue-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(verificationAttempts / MAX_ATTEMPTS) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setIsVerifying(false);
                  searchParams.delete('verify');
                  setSearchParams(searchParams);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Dismiss
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {/* Featured Course */}
      {featuredCourse && (
        <div className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm">
                  Featured Course
                </span>
                {isFeaturedEnrolled && (
                  <span className="inline-block bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                    ✓ You're Enrolled
                  </span>
                )}
              </div>
              <h2 className="text-4xl text-gray-900">Our Flagship Program</h2>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <motion.img
                    src={featuredCourse.thumbnail.url}
                    alt={featuredCourse.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {featuredCourse.averageRating > 0 && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{featuredCourse.averageRating.toFixed(1)}</span>
                    </div>
                  )}
                  {isFeaturedEnrolled && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Enrolled
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Amazon KDP
                    </span>
                  </div>
                  
                  <Link to={`/course-overview/${featuredCourse._id}`} className="no-underline block">
                    <div className="cursor-pointer">
                      <h3 className="text-3xl mb-4 text-gray-900 hover:text-primary transition-colors">
                        {featuredCourse.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6">{featuredCourse.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>{calculateDuration(featuredCourse.modules)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <span>{featuredCourse.totalVideos} lessons</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5 text-primary" />
                          <span>700+ students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="px-2 py-1 bg-gray-100 rounded text-sm">All Levels</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* Price or Enrollment Status */}
                    {isFeaturedEnrolled ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-green-600">Enrolled</div>
                          <div className="text-xs text-gray-600">Full access granted</div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl lg:text-3xl text-primary">
                          ₦{featuredCourse.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">One-time payment</div>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    {checkingFeaturedEnrollment || checkingProgress ? (
                      <button 
                        disabled
                        className="bg-gray-300 text-gray-500 px-4 md:px-8 py-3 rounded-lg cursor-not-allowed flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Checking...
                      </button>
                    ) : isFeaturedEnrolled ? (
                      <motion.a
                        href={`/courses/${featuredCourse._id}`}
                        className="bg-green-500 text-white px-4 md:px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 no-underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {courseStarted ? 'Continue Learning' : 'Start Course'}
                        <ArrowRight className="w-5 h-5" />
                      </motion.a>
                    ) : (
                      <motion.button 
                        className="bg-orange-500 text-white px-4 md:px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePurchaseClick}
                      >
                        Purchase
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Instructor:</span> {featuredCourse.instructor.fullName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
