import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Heart,
  HelpCircle,
  Star, 
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Navbar } from './Navbar';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/my-courses', icon: BookOpen, label: 'My Courses' },
  { path: '/dashboard/wishlist', icon: Heart, label: 'Wishlist' },
  { path: '/dashboard/qa', icon: HelpCircle, label: 'Question & Answer' },
  { path: '/dashboard/ratings', icon: Star, label: 'Rating' },
  { path: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function DashboardLayout() {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // AuthContext handles everything: clear state + redirect to /login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar at the top */}
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col bg-white border-r border-gray-200 w-64 fixed h-[calc(100vh-73px)] top-[73px]">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="mb-8">
              <ul className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-primary'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="px-3 mb-3 text-xs text-gray-500">Account</p>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/dashboard/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      location.pathname === '/dashboard/settings'
                        ? 'bg-blue-50 text-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Page Content */}
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
