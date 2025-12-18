import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles, Award, Timer, TrendingUp, Play, Star, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { hasCourseStarted, getCompletedVideoCount } from '../../utils/courseProgress';

export function Overview() {
  const [courseStarted, setCourseStarted] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const totalVideos = 14; // Total number of videos in the course
  const progressPercentage = Math.round((completedCount / totalVideos) * 100);

  useEffect(() => {
    setCourseStarted(hasCourseStarted());
    setCompletedCount(getCompletedVideoCount());
  }, []);

  const stats = [
    {
      label: 'Enrolled Courses',
      value: '1',
      icon: GraduationCap,
      status: 'On track',
      bgGradient: 'from-blue-200 to-blue-100',
    },
    {
      label: 'Active Courses',
      value: '1',
      icon: Sparkles,
      status: 'On track',
      bgGradient: 'from-orange-200 to-orange-100',
    },
    {
      label: 'Completed Lessons',
      value: '17',
      icon: Award,
      status: 'On track',
      bgGradient: 'from-blue-600 to-blue-500',
    },
    {
      label: 'Total Study Time',
      value: '8.5h',
      icon: Timer,
      status: 'On track',
      bgGradient: 'from-orange-600 to-orange-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl text-gray-900 mb-1">Good Morning, Yungee! 👋</h1>
        <p className="text-sm text-gray-600">Welcome back to your KDP journey</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-5xl text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 border border-1 rounded-2xl bg-blue-100 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-5 h-5" />
                <span>{stat.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* My Active Course */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">My Active Course</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              In Progress
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-primary uppercase tracking-wider mb-2 block">PUBLISHING</span>
                  <h3 className="text-lg text-gray-900 mb-1">KDP Success Guide by DSAM</h3>
                  <p className="text-sm text-gray-600">
                    Master Amazon Kindle Direct Publishing and create profitable books that sell
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">D</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-900">DSAM</p>
                    <p className="text-xs text-gray-500">Tutor</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>200+ students</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>10+ hours</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-700">Course Progress</span>
                <span className="text-orange-500">{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="text-xs text-gray-600 mt-2">{completedCount} of {totalVideos} lessons completed</p>
            </div>

            <Link
              to="/course-overview/kdp-success-guide"
              className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Play className="w-5 h-5" />
              {courseStarted ? 'Continue Learning' : 'Start Learning'}
            </Link>
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Course Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg text-gray-900 mb-6">Course Breakdown</h3>
            
            {/* Donut Chart Representation */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="20"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#1B5E8F"
                    strokeWidth="20"
                    strokeDasharray={`${(35 / 100) * 440} 440`}
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="20"
                    strokeDasharray={`${(28 / 100) * 440} 440`}
                    strokeDashoffset={`-${(35 / 100) * 440}`}
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="20"
                    strokeDasharray={`${(27 / 100) * 440} 440`}
                    strokeDashoffset={`-${((35 + 28) / 100) * 440}`}
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="20"
                    strokeDasharray={`${(10 / 100) * 440} 440`}
                    strokeDashoffset={`-${((35 + 28 + 27) / 100) * 440}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="text-xs text-gray-600">Total Lessons</p>
                  <p className="text-3xl text-gray-900">120</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'KDP Basics', value: 35, color: 'bg-primary' },
                { label: 'Niche Research', value: 28, color: 'bg-orange-500' },
                { label: 'Book Design', value: 27, color: 'bg-blue-500' },
                { label: 'Marketing', value: 10, color: 'bg-amber-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}