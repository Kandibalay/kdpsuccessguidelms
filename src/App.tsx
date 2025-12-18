// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Navbar } from './components/Navbar';
// import { Home } from './pages/Home';
// import  Contact  from './pages/Contact';
// import { Courses } from './pages/Courses';
// import { Login } from './pages/Login';
// import { Enroll } from './pages/Enroll';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/courses" element={<Courses />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/enroll" element={<Enroll />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DashboardLayout } from './components/DashboardLayout';
import { Home } from './pages/Home';
import Contact  from './pages/Contact';
import { Courses } from './pages/Courses';
import { Login } from './pages/Login';
import { Enroll } from './pages/Enroll';
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

export default function App() {
  return (
    <><Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        borderRadius: '12px',
        background: '#101828',
        color: '#fff',
      },
    }}
  />
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/enroll" element={<><Navbar /><Enroll /></>} />
          
          {/* Course Overview and Video Player with Navbar */}
          <Route path="/course-overview/:courseId" element={<><Navbar /><CourseOverview /></>} />
          <Route path="/course/:courseId" element={<><Navbar /><CourseDetail /></>} />
          
          {/* Dashboard Routes with Navbar + Sidebar (DashboardLayout) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
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
    </BrowserRouter>
    </>
  );
}