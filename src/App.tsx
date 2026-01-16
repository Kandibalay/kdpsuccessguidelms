import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DashboardLayout } from './components/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import Contact  from './pages/Contact';
import { Courses } from './pages/Courses';
import { Login } from './pages/auth/Login';
import { Enroll } from './pages/auth/Enroll';
import { Overview } from './pages/dashboard/Overview';
import { MyCourses } from './pages/dashboard/MyCourses';
import { CourseOverview } from './pages/dashboard/CourseOverview';
import { CourseDetail } from './pages/dashboard/CourseDetail';
import { Wishlist } from './pages/dashboard/Wishlist';
import { QA } from './pages/dashboard/QA';
import { Progress } from './pages/dashboard/Progress';
import { Certificates } from './pages/dashboard/Certificates';
import { Ratings } from './pages/dashboard/Ratings';
import { Profile } from './pages/dashboard/Profile';
import { Settings } from './pages/dashboard/Settings';
import { Toaster } from 'react-hot-toast';
import { TestimonialsPage } from './pages/Testimonial';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { NotFound } from './pages/NotFound';
import { useInactivityLogout } from './hooks/useInactivityLogout';
import { useEffect } from 'react';

export default function App() {
   // ✅ Initialize auto-logout hook - automatically logs out after 1 hour of inactivity
   useInactivityLogout();
  
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#1e5174',
            color: '#fff',
          },
        }}
      />
      
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/auth/login" element={<><Navbar /><Login /></>} />
          <Route path="/auth/enroll" element={<><Navbar /><Enroll /></>} />
          <Route path="/testimonials" element={<><Navbar /><TestimonialsPage /></>} />

          {/* Password Reset Routes */}
          <Route path="/auth/forgot-password" element={<><Navbar /><ForgotPassword /></>} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
          
          {/* 🔒 Protected Course Overview (anyone can view, but requires auth to watch videos) */}
          <Route 
            path="/course-overview/:courseId" 
            element={
              <ProtectedRoute>
                <Navbar />
                <CourseOverview />
              </ProtectedRoute>
            } 
          />

          {/* 🔒 Protected Course Detail/Video Player Routes */}
          <Route 
            path="/course/:id" 
            element={
              <ProtectedRoute>
                <Navbar />
                <CourseDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/courses/:id" 
            element={
              <ProtectedRoute>
                <Navbar />
                <CourseDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:courseId" 
            element={
              <ProtectedRoute>
                <Navbar />
                <CourseDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* 🔒 Protected Dashboard Routes with Navbar + Sidebar (DashboardLayout) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="qa" element={<QA />} />
            <Route path="progress" element={<Progress />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="ratings" element={<Ratings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
