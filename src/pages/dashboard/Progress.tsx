import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, BookOpen, Award, Calendar } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 3.1 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 1.2 },
  { day: 'Sun', hours: 0.8 },
];

const monthlyData = [
  { month: 'Jul', hours: 12 },
  { month: 'Aug', hours: 18 },
  { month: 'Sep', hours: 15 },
  { month: 'Oct', hours: 22 },
  { month: 'Nov', hours: 28 },
  { month: 'Dec', hours: 35 },
];

const milestones = [
  {
    title: 'First Video Completed',
    date: 'December 10, 2024',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'First Module Completed',
    date: 'December 12, 2024',
    icon: Award,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: '10 Hours Watched',
    date: 'December 14, 2024',
    icon: Clock,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: '50% Progress Milestone',
    date: 'December 15, 2024',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-600',
  },
];

export function Progress() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Progress</h1>
          <p className="text-lg text-gray-600">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">7/16</p>
            <p className="text-sm text-gray-600">Lessons Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">12.5h</p>
            <p className="text-sm text-gray-600">Total Hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">45%</p>
            <p className="text-sm text-gray-600">Course Progress</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Activity</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="hours" fill="#1B5E8F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">6-Month Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#2E8BC0"
                  strokeWidth={3}
                  dot={{ fill: '#1B5E8F', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Course Progress Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Progress</h2>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900">KDP Success Guide by DSAM</h3>
                <p className="text-sm text-gray-600">7 of 16 lessons completed</p>
              </div>
              <span className="text-2xl font-bold text-primary">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-primary to-accent rounded-full h-4"
                style={{ width: '45%' }}
              />
            </div>
          </div>

          {/* Module Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-medium text-gray-900">Module 1: Getting Started</p>
                  <p className="text-sm text-gray-600">3/3 lessons</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Complete</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-medium text-gray-900">Module 2: Niche Research</p>
                  <p className="text-sm text-gray-600">4/4 lessons</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Complete</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-primary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                  !
                </div>
                <div>
                  <p className="font-medium text-gray-900">Module 3: Book Creation</p>
                  <p className="text-sm text-gray-600">0/4 lessons</p>
                </div>
              </div>
              <span className="text-sm font-medium text-orange-600">In Progress</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900">Module 4: Publishing & Optimization</p>
                  <p className="text-sm text-gray-600">0/4 lessons</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500">Locked</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <div>
                  <p className="font-medium text-gray-900">Module 5: Marketing & Scaling</p>
                  <p className="text-sm text-gray-600">0/1 lessons</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500">Locked</span>
            </div>
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Milestones</h2>
          
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className={`${milestone.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{milestone.title}</p>
                    <p className="text-sm text-gray-600">{milestone.date}</p>
                  </div>
                  <div className="text-2xl">🎉</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
