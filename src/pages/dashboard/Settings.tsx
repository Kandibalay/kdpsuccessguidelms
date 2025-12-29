// import React from 'react';
// import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext'; 
// import logo from '../assets/Sam Logo.jpg';

// export function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const location = useLocation();
//   const { auth, logout } = useAuth();

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/courses', label: 'Courses' },
//     { href: '/contact', label: 'Contact' },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   // Get first name and last name (omitting middle names)
//   const getFirstName = () => {
//     if (!auth.user?.name) return '';
//     const nameParts = auth.user.name.trim().split(' ').filter(Boolean);
    
//     if (nameParts.length === 0) return '';
//     if (nameParts.length === 1) return nameParts[0];
    
//     // Return first and last name only, omitting middle names
//     return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
//   };

//   const getInitials = () => {
//     if (!auth.user?.name) return '';
//     const nameParts = auth.user.name.trim().split(' ').filter(Boolean);
    
//     if (nameParts.length === 0) return '';
//     if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
//     // Get first and last name initials, omitting middle names
//     const firstInitial = nameParts[0].charAt(0).toUpperCase();
//     const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    
//     return `${firstInitial}${lastInitial}`;
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close user menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (!target.closest('.user-menu-container')) {
//         setShowUserMenu(false);
//       }
//     };

//     if (showUserMenu) {
//       document.addEventListener('click', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [showUserMenu]);

//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//     setIsMenuOpen(false);
//   };

//   return (
//     <motion.nav
//       className={`bg-white sticky top-0 z-50 transition-shadow ${
//         scrolled ? 'shadow-md' : 'shadow-sm'
//       }`}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="container mx-auto px-6 py-3">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-3">
//             <motion.img
//               src={logo}
//               alt="KDP Success Guide"
//               className="h-12 w-28"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link, index) => (
//               <motion.div
//                 key={link.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Link
//                   to={link.href}
//                   className={`transition-colors relative ${
//                     isActive(link.href)
//                       ? 'text-primary'
//                       : 'text-gray-700 hover:text-primary'
//                   }`}
//                 >
//                   {link.label}
//                   {isActive(link.href) && (
//                     <motion.div
//                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
//                       layoutId="navbar-indicator"
//                       initial={false}
//                       transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                     />
//                   )}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Desktop Auth Section */}
//           <motion.div
//             className="hidden md:flex items-center gap-4"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             {auth.user ? (
//               // Authenticated User Menu
//               <div className="relative user-menu-container">
//                 <motion.button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {auth.user.profilePicture ? (
//                     <img
//                       src={auth.user.profilePicture}
//                       alt={auth.user.name}
//                       className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
//                     />
//                   ) : (
//                     {auth.user.profilePicture ? (
//                       <img
//                         src={auth.user.profilePicture}
//                         alt={auth.user.name}
//                         className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm">
//                         {getInitials()}
//                       </div>
//                     )}
//                   )}
//                   <span className="text-gray-700 font-medium">{getFirstName()}</span>
//                 </motion.button>

//                 {/* Dropdown Menu */}
//                 <AnimatePresence>
//                   {showUserMenu && (
//                     <motion.div
//                       className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="px-4 py-3 border-b border-gray-200">
//                         <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
//                         <p className="text-sm text-gray-500 truncate">{auth.user.email}</p>
//                       </div>
//                       <Link
//                         to="/dashboard"
//                         className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                         onClick={() => setShowUserMenu(false)}
//                       >
//                         <UserIcon className="w-4 h-4 text-gray-500" />
//                         <span className="text-sm text-gray-700">Dashboard</span>
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-200"
//                       >
//                         <LogOut className="w-4 h-4 text-gray-500" />
//                         <span className="text-sm text-gray-700">Log out</span>
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               // Guest Buttons
//               <>
//                 <Link to="/login">
//                   <motion.button
//                     className="text-gray-700 hover:text-primary transition-colors px-4 py-2 border-2 border-primary rounded-lg"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Log in
//                   </motion.button>
//                 </Link>
//                 <Link to="/enroll">
//                   <motion.button
//                     className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Sign Up
//                   </motion.button>
//                 </Link>
//               </>
//             )}
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             className="md:hidden text-gray-700"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             whileTap={{ scale: 0.9 }}
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </motion.button>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               className="md:hidden mt-4 py-4 border-t border-gray-200"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex flex-col gap-4">
//                 {/* Mobile User Info */}
//                 {auth.user && (
//                   <motion.div
//                     className="flex items-center gap-3 pb-4 border-b border-gray-200"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm">
//                       {getInitials()}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
//                       <p className="text-xs text-gray-500">{auth.user.email}</p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Mobile Nav Links */}
//                 {navLinks.map((link, index) => (
//                   <motion.div
//                     key={link.href}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                   >
//                     <Link
//                       to={link.href}
//                       className={`transition-colors ${
//                         isActive(link.href)
//                           ? 'text-primary'
//                           : 'text-gray-700 hover:text-primary'
//                       }`}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {link.label}
//                     </Link>
//                   </motion.div>
//                 ))}

//                 {/* Mobile Auth Buttons */}
//                 {auth.user ? (
//                   <>
//                     <Link to="/dashboard">
//                       <motion.button
//                         className="w-full text-left text-gray-700 hover:text-primary transition-colors border-2 border-primary rounded-lg px-4 py-2 flex items-center gap-2"
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: 0.3 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         <UserIcon className="w-4 h-4" />
//                         Dashboard
//                       </motion.button>
//                     </Link>
//                     <motion.button
//                       onClick={handleLogout}
//                       className="w-full text-left bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: 0.4 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <LogOut className="w-4 h-4" />
//                       Log out
//                     </motion.button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login">
//                       <motion.button
//                         className="w-full text-gray-700 hover:text-primary transition-colors text-left border-2 border-primary rounded-lg px-4 py-2"
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: 0.3 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Log in
//                       </motion.button>
//                     </Link>
//                     <Link to="/enroll">
//                       <motion.button
//                         className="w-full bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: 0.4 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Sign Up
//                       </motion.button>
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// }



import React from 'react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Bell, Lock, Globe, Eye, Mail, Shield } from 'lucide-react';

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your account preferences and security
          </p>
        </div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive email updates about your courses and progress
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">
                  Get push notifications on your device
                </p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pushNotifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Course Updates</p>
                <p className="text-sm text-gray-600">
                  Notifications when new content is added to your courses
                </p>
              </div>
              <button
                onClick={() => setCourseUpdates(!courseUpdates)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  courseUpdates ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    courseUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Marketing Emails</p>
                <p className="text-sm text-gray-600">
                  Receive promotional content and special offers
                </p>
              </div>
              <button
                onClick={() => setMarketingEmails(!marketingEmails)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  marketingEmails ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    marketingEmails ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorAuth ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="flex items-center gap-3 text-primary hover:text-accent transition-colors font-medium">
                <Lock className="w-5 h-5" />
                Change Password
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="flex items-center gap-3 text-primary hover:text-accent transition-colors font-medium">
                <Eye className="w-5 h-5" />
                Manage Sessions
              </button>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-900 mb-2">Language</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Portuguese</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">Timezone</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Eastern Time (ET)</option>
                <option>Central Time (CT)</option>
                <option>Mountain Time (MT)</option>
                <option>Pacific Time (PT)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-red-200"
        >
          <h2 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h2>
          
          <div className="space-y-4">
            <button className="w-full px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-left">
              Delete Account
            </button>
            <p className="text-sm text-gray-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
