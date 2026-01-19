import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Types
interface Avatar {
  public_id: string;
  url: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: Avatar;
  [key: string]: any;
}

interface Profile {
  fullName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string;
  message: string;
  profile: Profile | null;
  avatarUrl: string;
  isLoadingProfile: boolean;
  loading: boolean;
}

interface LoginData {
  email: string;
  password: string;
  clearOtherSessions?: boolean;
}

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  [key: string]: any;
}

interface ResetPasswordData {
  password: string;
  confirmPassword?: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  errMsg?: string;
  requiresConfirmation?: boolean;
  activeSessions?: Array<{
    id: string;
    deviceInfo: {
      userAgent: string;
      ipAddress: string;
    };
    lastActivity: string;
    createdAt: string;
  }>;
}

interface ProfileUpdateData {
  phoneNumber?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  auth: AuthState;
  isAuthenticated: boolean;
  loading: boolean;
  profile: Profile | null;
  avatarUrl: string;
  isLoadingProfile: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  login: (userData: LoginData) => Promise<AuthResponse>;
  signup: (userData: SignupData) => Promise<AuthResponse>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (resetToken: string, passwords: ResetPasswordData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  getInitials: (name: string) => string;
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Sanitize error message to remove API URLs and sensitive information
 */
const sanitizeErrorMessage = (error: any): string => {
  if (axios.isAxiosError(error)) {
    // Get user-friendly message from backend response
    const message = error.response?.data?.errMsg || 
                   error.response?.data?.message;
    
    if (message && typeof message === 'string') {
      // Remove any URLs from the message
      return message.replace(/https?:\/\/[^\s]+/g, '').trim();
    }

    // Map status codes to user-friendly messages
    const statusCode = error.response?.status;
    switch (statusCode) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication failed. Please check your credentials.';
      case 403:
        return 'Access denied.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'A conflict occurred. Please try again.';
      case 422:
        return 'Validation error. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  }

  // For non-Axios errors, return generic message
  if (error instanceof Error) {
    // Remove any URLs from error message
    return error.message.replace(/https?:\/\/[^\s]+/g, '').trim() || 'An error occurred';
  }

  return 'An error occurred. Please try again.';
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: '',
    message: '',
    profile: null,
    avatarUrl: '',
    isLoadingProfile: false,
    loading: true
  });

  // Computed value - single source of truth for authentication
  const isAuthenticated = Boolean(auth.user && auth.token);

  // Set axios base URL from .env
  axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

  // Set Authorization header when token changes
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [auth?.token]);

  // Load auth from localStorage on mount
  useEffect(() => {
    const loadAuth = () => {
      const data = localStorage.getItem('auth');
      
      if (data) {
        try {
          const parsed: AuthState = JSON.parse(data);
          setAuth({ ...parsed, loading: false });
        } catch (error) {
          localStorage.removeItem('auth');
          setAuth(prev => ({ ...prev, loading: false }));
        }
      } else {
        setAuth(prev => ({ ...prev, loading: false }));
      }
    };

    loadAuth();
  }, []);

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    if (auth.user && auth.token) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth]);

  // Periodic session validation to detect invalidation from another device
  useEffect(() => {
    if (!isAuthenticated) return;

    let intervalId: NodeJS.Timeout;

    const validateSession = async () => {
      try {
        await axios.get('/auth/me');
      } catch (error) {
        // The 401 interceptor will handle the cleanup automatically
      }
    };

    const timeoutId = setTimeout(() => {
      validateSession();
      intervalId = setInterval(validateSession, 10000);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAuthenticated]);

  // Axios response interceptor to catch 401 errors
  useEffect(() => {
    let isHandling401 = false;

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && isAuthenticated && !isHandling401) {
          isHandling401 = true;
          toast.error('Your session has expired or was ended from another device.');
          
          setAuth({
            user: null,
            token: '',
            message: '',
            profile: null,
            avatarUrl: '',
            isLoadingProfile: false,
            loading: false
          });
          localStorage.removeItem('auth');
          delete axios.defaults.headers.common['Authorization'];
          
          navigate('/auth/login');
          
          setTimeout(() => {
            isHandling401 = false;
          }, 1000);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [isAuthenticated, navigate]);

  // Helper function to get initials
  const getInitials = (name: string): string => {
    if (!name) return '';
    const nameParts = name.trim().split(' ').filter(Boolean);
    
    if (nameParts.length === 0) return '';
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  // Fetch profile from API
  const fetchProfile = async (): Promise<void> => {
    if (!isAuthenticated || auth.isLoadingProfile) return;

    setAuth(prev => ({ ...prev, isLoadingProfile: true }));

    try {
      const { data } = await axios.get('/auth/me');
      
      const user = data.user;
      
      setAuth(prev => ({
        ...prev,
        profile: {
          fullName: user.fullName || prev.user?.fullName || '',
          email: user.email || prev.user?.email || '',
          phoneNumber: user.phoneNumber || '',
          bio: user.bio || '',
          location: user.location || '',
          dateOfBirth: user.dateOfBirth || '',
          avatarUrl: user.avatar?.url || ''
        },
        avatarUrl: user.avatar?.url || '',
        isLoadingProfile: false
      }));
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        toast.error('Failed to load profile');
      }
      setAuth(prev => ({ ...prev, isLoadingProfile: false }));
    }
  };

  // Update profile
  const updateProfile = async (profileData: ProfileUpdateData): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    try {
      const { data } = await axios.patch('/auth/update-profile', profileData);
      
      const user = data.user;
      
      setAuth(prev => ({
        ...prev,
        profile: {
          fullName: user.fullName || prev.profile?.fullName || '',
          email: user.email || prev.profile?.email || '',
          phoneNumber: user.phoneNumber || '',
          bio: user.bio || '',
          location: user.location || '',
          dateOfBirth: user.dateOfBirth || '',
          avatarUrl: user.avatar?.url || ''
        },
        avatarUrl: user.avatar?.url || prev.avatarUrl
      }));

      toast.success('Profile updated successfully! 🎉');
    } catch (error) {
      const errorMessage = sanitizeErrorMessage(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Update avatar
  const updateAvatar = async (file: File): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to update your avatar');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      throw new Error('Invalid file type');
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should not exceed 2MB');
      throw new Error('File too large');
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const { data } = await axios.patch('/auth/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const user = data.user;
      const newAvatarUrl = user.avatar?.url || '';
      
      setAuth(prev => ({
        ...prev,
        avatarUrl: newAvatarUrl,
        profile: prev.profile ? {
          ...prev.profile,
          avatarUrl: newAvatarUrl
        } : null
      }));

      toast.success('Profile picture updated successfully! 🎉');
    } catch (error) {
      const errorMessage = sanitizeErrorMessage(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Login function
  const login = async (userData: LoginData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/login', userData);

      if (data.requiresConfirmation && !userData.clearOtherSessions) {
        return {
          success: false,
          requiresConfirmation: true,
          activeSessions: data.activeSessions,
          message: data.message || 'Active session detected on another device. Please confirm to clear it and continue.'
        };
      }

      if (data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      let finalAuth: AuthState;
      
      if (data.user && data.token) {
        try {
          const profileResponse = await axios.get('/auth/me');
          const profileUser = profileResponse.data.user;
          
          finalAuth = {
            user: data.user,
            token: data.token,
            message: data.message ?? '',
            profile: {
              fullName: profileUser.fullName || data.user.fullName || '',
              email: profileUser.email || data.user.email || '',
              phoneNumber: profileUser.phoneNumber || '',
              bio: profileUser.bio || '',
              location: profileUser.location || '',
              dateOfBirth: profileUser.dateOfBirth || '',
              avatarUrl: profileUser.avatar?.url || ''
            },
            avatarUrl: profileUser.avatar?.url || '',
            isLoadingProfile: false,
            loading: false
          };
        } catch (error) {
          finalAuth = {
            user: data.user ?? null,
            token: data.token ?? '',
            message: data.message ?? '',
            profile: null,
            avatarUrl: '',
            isLoadingProfile: false,
            loading: false
          };
        }
      } else {
        finalAuth = {
          user: data.user ?? null,
          token: data.token ?? '',
          message: data.message ?? '',
          profile: null,
          avatarUrl: '',
          isLoadingProfile: false,
          loading: false
        };
      }

      setAuth(finalAuth);
      localStorage.setItem('auth', JSON.stringify(finalAuth));

      return {
        success: true,
        user: data.user,
        token: data.token,
        message: data.message
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const responseData = error.response?.data;

        if (statusCode === 409 && responseData?.requiresConfirmation) {
          return {
            success: false,
            requiresConfirmation: true,
            activeSessions: responseData.activeSessions || [],
            message: responseData.message || 'Active session detected on another device. Please confirm to clear it and continue.'
          };
        }

        throw new Error(sanitizeErrorMessage(error));
      }

      throw new Error('Login failed. Please try again.');
    }
  };

  const signup = async (userData: SignupData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/signup', userData);
  
      localStorage.removeItem('auth');
      delete axios.defaults.headers.common['Authorization'];
      
      setAuth({
        user: null,
        token: '',
        message: '',
        profile: null,
        avatarUrl: '',
        isLoadingProfile: false,
        loading: false
      });
  
      navigate('/auth/login');
  
      return {
        success: true,
        message: data.message || 'Signup successful'
      };
    } catch (error) {
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  // Forgot Password
  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/forgot-password', { email });
      return data;
    } catch (error) {
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  // Reset Password
  const resetPassword = async (
    resetToken: string, 
    passwords: ResetPasswordData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const { data } = await axios.post<{ message: string }>(`/auth/reset-password/${resetToken}`, {
        password: passwords.password
      });

      if (data?.message) {
        return { success: true, message: data.message };
      } else {
        throw new Error('Reset failed');
      }
    } catch (error) {
      throw new Error(sanitizeErrorMessage(error));
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    const currentToken = auth?.token;
    
    try {
      if (currentToken) {
        await axios.post('/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${currentToken}`
          }
        });
      }
    } catch (error) {
      // Silent error - logout should always succeed locally
    }

    setAuth({
      user: null,
      token: '',
      message: '',
      profile: null,
      avatarUrl: '',
      isLoadingProfile: false,
      loading: false
    });
    
    localStorage.removeItem('auth');
    delete axios.defaults.headers.common['Authorization'];
    
    navigate('/auth/login');
  };

  const value: AuthContextType = {
    auth,
    isAuthenticated,
    loading: auth.loading,
    profile: auth.profile,
    avatarUrl: auth.avatarUrl,
    isLoadingProfile: auth.isLoadingProfile,
    setAuth,
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout,
    fetchProfile,
    updateProfile,
    updateAvatar,
    getInitials
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
