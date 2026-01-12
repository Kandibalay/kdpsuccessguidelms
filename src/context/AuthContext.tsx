// import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// // Types
// interface Avatar {
//   public_id: string;
//   url: string;
// }

// interface User {
//   id: string;
//   email: string;
//   fullName: string;
//   avatar?: Avatar;
//   [key: string]: any;
// }

// interface Profile {
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   bio?: string;
//   location?: string;
//   dateOfBirth?: string;
//   avatarUrl?: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string;
//   message: string;
//   profile: Profile | null;
//   avatarUrl: string;
//   isLoadingProfile: boolean;
// }

// interface LoginData {
//   email: string;
//   password: string;
//   clearOtherSessions?: boolean;
// }

// interface SignupData {
//   email: string;
//   password: string;
//   fullName: string;
//   [key: string]: any;
// }

// interface ResetPasswordData {
//   password: string;
//   confirmPassword?: string;
// }

// interface AuthResponse {
//   success: boolean;
//   user?: User;
//   token?: string;
//   message?: string;
//   errMsg?: string;
//   requiresConfirmation?: boolean;
//   activeSessions?: Array<{
//     id: string;
//     deviceInfo: {
//       userAgent: string;
//       ipAddress: string;
//     };
//     lastActivity: string;
//     createdAt: string;
//   }>;
// }

// interface ProfileUpdateData {
//   phoneNumber?: string;
//   bio?: string;
//   location?: string;
//   dateOfBirth?: string;
// }

// interface AuthContextType {
//   auth: AuthState;
//   isAuthenticated: boolean;
//   profile: Profile | null;
//   avatarUrl: string;
//   isLoadingProfile: boolean;
//   setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
//   login: (userData: LoginData) => Promise<AuthResponse>;
//   signup: (userData: SignupData) => Promise<AuthResponse>;
//   forgotPassword: (email: string) => Promise<AuthResponse>;
//   resetPassword: (resetToken: string, passwords: ResetPasswordData) => Promise<{ success: boolean; message: string }>;
//   logout: () => Promise<void>;
//   fetchProfile: () => Promise<void>;
//   updateProfile: (data: ProfileUpdateData) => Promise<void>;
//   updateAvatar: (file: File) => Promise<void>;
//   getInitials: (name: string) => string;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // AuthProvider component
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const navigate = useNavigate();

//   const [auth, setAuth] = useState<AuthState>({
//     user: null,
//     token: '',
//     message: '',
//     profile: null,
//     avatarUrl: '',
//     isLoadingProfile: false
//   });

//   // Computed value - single source of truth for authentication
//   const isAuthenticated = Boolean(auth.user && auth.token);

//   // Set axios base URL from .env
//   axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

//   // Set Authorization header when token changes
//   useEffect(() => {
//     if (auth?.token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, [auth?.token]);

//   // Load auth from localStorage on mount
//   useEffect(() => {
//     const data = localStorage.getItem('auth');
//     if (data) {
//       try {
//         const parsed: AuthState = JSON.parse(data);
//         setAuth(parsed);
//       } catch (error) {
//         console.error('Failed to parse auth from localStorage:', error);
//         localStorage.removeItem('auth');
//       }
//     }
//   }, []);

//   // Save auth to localStorage whenever it changes
//   useEffect(() => {
//     if (auth.user && auth.token) {
//       localStorage.setItem('auth', JSON.stringify(auth));
//     }
//   }, [auth]);

//   // Periodic session validation to detect invalidation from another device
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     let intervalId: NodeJS.Timeout;

//     // Validate session by checking if we can still access protected resources
//     const validateSession = async () => {
//       try {
//         // Use the /auth/me endpoint to validate session
//         // If token is invalid, backend will return 401
//         await axios.get('/auth/me');
//       } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           console.log('🔴 Session invalidated - likely cleared from another device');
//           // The 401 interceptor will handle the cleanup automatically
//         }
//       }
//     };

//     // Start validation after 10 seconds (to avoid conflict with initial fetchProfile)
//     const timeoutId = setTimeout(() => {
//       // Run first validation
//       validateSession();
      
//       // Then run every 10 seconds
//       intervalId = setInterval(validateSession, 10000);
//     }, 10000);

//     return () => {
//       clearTimeout(timeoutId);
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [isAuthenticated]);

//   // Axios response interceptor to catch 401 errors
//   useEffect(() => {
//     let isHandling401 = false; // Prevent infinite loop

//     const interceptor = axios.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401 && isAuthenticated && !isHandling401) {
//           isHandling401 = true;
//           console.log('🔴 401 detected - clearing session');
//           toast.error('Your session has expired or was ended from another device.');
          
//           // Clear everything
//           setAuth({
//             user: null,
//             token: '',
//             message: '',
//             profile: null,
//             avatarUrl: '',
//             isLoadingProfile: false
//           });
//           localStorage.removeItem('auth');
//           delete axios.defaults.headers.common['Authorization'];
          
//           navigate('/auth/login');
          
//           // Reset flag after delay
//           setTimeout(() => {
//             isHandling401 = false;
//           }, 1000);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.response.eject(interceptor);
//     };
//   }, [isAuthenticated, navigate]);

//   // Helper function to get initials
//   const getInitials = (name: string): string => {
//     if (!name) return '';
//     const nameParts = name.trim().split(' ').filter(Boolean);
    
//     if (nameParts.length === 0) return '';
//     if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
//     // Get first letter of first name and last name
//     return (
//       nameParts[0].charAt(0).toUpperCase() + 
//       nameParts[nameParts.length - 1].charAt(0).toUpperCase()
//     );
//   };

//   // Fetch profile from API
//   const fetchProfile = async (): Promise<void> => {
//     // Don't fetch if not authenticated or already loading
//     if (!isAuthenticated || auth.isLoadingProfile) return;

//     setAuth(prev => ({ ...prev, isLoadingProfile: true }));

//     try {
//       const { data } = await axios.get('/auth/me');
      
//       const user = data.user;
      
//       setAuth(prev => ({
//         ...prev,
//         profile: {
//           fullName: user.fullName || prev.user?.fullName || '',
//           email: user.email || prev.user?.email || '',
//           phoneNumber: user.phoneNumber || '',
//           bio: user.bio || '',
//           location: user.location || '',
//           dateOfBirth: user.dateOfBirth || '',
//           avatarUrl: user.avatar?.url || ''
//         },
//         avatarUrl: user.avatar?.url || '',
//         isLoadingProfile: false
//       }));
//     } catch (error) {
//       console.error('Failed to fetch profile:', error);
//       // Don't show error toast for 401s - the interceptor handles it
//       if (!axios.isAxiosError(error) || error.response?.status !== 401) {
//         toast.error('Failed to load profile');
//       }
//       setAuth(prev => ({ ...prev, isLoadingProfile: false }));
//     }
//   };

//   // Update profile
//   const updateProfile = async (profileData: ProfileUpdateData): Promise<void> => {
//     if (!isAuthenticated) {
//       toast.error('You must be logged in to update your profile');
//       return;
//     }

//     try {
//       const { data } = await axios.patch('/auth/update-profile', profileData);
      
//       const user = data.user;
      
//       setAuth(prev => ({
//         ...prev,
//         profile: {
//           fullName: user.fullName || prev.profile?.fullName || '',
//           email: user.email || prev.profile?.email || '',
//           phoneNumber: user.phoneNumber || '',
//           bio: user.bio || '',
//           location: user.location || '',
//           dateOfBirth: user.dateOfBirth || '',
//           avatarUrl: user.avatar?.url || ''
//         },
//         avatarUrl: user.avatar?.url || prev.avatarUrl
//       }));

//       toast.success('Profile updated successfully! 🎉');
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || 'Failed to update profile');
//       } else {
//         toast.error('Failed to update profile');
//       }
//       throw error;
//     }
//   };

//   // Update avatar
//   const updateAvatar = async (file: File): Promise<void> => {
//     if (!isAuthenticated) {
//       toast.error('You must be logged in to update your avatar');
//       return;
//     }

//     // Validate file
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       throw new Error('Invalid file type');
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Image size should not exceed 2MB');
//       throw new Error('File too large');
//     }

//     const formData = new FormData();
//     formData.append('avatar', file);

//     try {
//       const { data } = await axios.patch('/auth/update-profile', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const user = data.user;
//       const newAvatarUrl = user.avatar?.url || '';
      
//       setAuth(prev => ({
//         ...prev,
//         avatarUrl: newAvatarUrl,
//         profile: prev.profile ? {
//           ...prev.profile,
//           avatarUrl: newAvatarUrl
//         } : null
//       }));

//       toast.success('Profile picture updated successfully! 🎉');
//     } catch (error) {
//       console.error('Failed to update avatar:', error);
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || 'Failed to upload profile picture');
//       } else {
//         toast.error('Failed to upload profile picture');
//       }
//       throw error;
//     }
//   };

//   // Login function
//   const login = async (userData: LoginData): Promise<AuthResponse> => {
//     try {
//       const { data } = await axios.post<AuthResponse>('/auth/login', userData);

//       // Check if backend requires confirmation for clearing other sessions
//       if (data.requiresConfirmation && !userData.clearOtherSessions) {
//         // Return the response with requiresConfirmation flag
//         // The Login component will handle showing the confirmation dialog
//         return {
//           success: false,
//           requiresConfirmation: true,
//           activeSessions: data.activeSessions,
//           message: data.message || 'Active session detected on another device. Please confirm to clear it and continue.'
//         };
//       }

//       // Normal login flow - session is clear or user confirmed clearing
//       // IMPORTANT: Set Authorization header first, before any state updates
//       if (data.token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//       }

//       // Fetch profile immediately with the new token BEFORE setting auth state
//       let finalAuth: AuthState;
      
//       if (data.user && data.token) {
//         try {
//           const profileResponse = await axios.get('/auth/me');
//           const profileUser = profileResponse.data.user;
          
//           // Create auth with profile data including avatar
//           finalAuth = {
//             user: data.user,
//             token: data.token,
//             message: data.message ?? '',
//             profile: {
//               fullName: profileUser.fullName || data.user.fullName || '',
//               email: profileUser.email || data.user.email || '',
//               phoneNumber: profileUser.phoneNumber || '',
//               bio: profileUser.bio || '',
//               location: profileUser.location || '',
//               dateOfBirth: profileUser.dateOfBirth || '',
//               avatarUrl: profileUser.avatar?.url || ''
//             },
//             avatarUrl: profileUser.avatar?.url || '',
//             isLoadingProfile: false
//           };
//         } catch (error) {
//           console.error('Failed to fetch profile on login:', error);
//           // If profile fetch fails, create auth without profile data
//           finalAuth = {
//             user: data.user ?? null,
//             token: data.token ?? '',
//             message: data.message ?? '',
//             profile: null,
//             avatarUrl: '',
//             isLoadingProfile: false
//           };
//         }
//       } else {
//         // No user or token
//         finalAuth = {
//           user: data.user ?? null,
//           token: data.token ?? '',
//           message: data.message ?? '',
//           profile: null,
//           avatarUrl: '',
//           isLoadingProfile: false
//         };
//       }

//       // Set auth state ONCE with complete data (including avatar)
//       setAuth(finalAuth);
//       localStorage.setItem('auth', JSON.stringify(finalAuth));

//       // Navigate after everything is ready
//       navigate('/');

//       return {
//         success: true,
//         user: data.user,
//         token: data.token,
//         message: data.message
//       };
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const statusCode = error.response?.status;
//         const responseData = error.response?.data;

//         // Handle 409 Conflict - Active session detected
//         if (statusCode === 409 && responseData?.requiresConfirmation) {
//           // Return the response with requiresConfirmation
//           // Don't throw - let Login component handle it
//           return {
//             success: false,
//             requiresConfirmation: true,
//             activeSessions: responseData.activeSessions || [],
//             message: responseData.message || 'Active session detected on another device. Please confirm to clear it and continue.'
//           };
//         }

//         // For other errors, throw with message
//         const message =
//           responseData?.errMsg ||
//           responseData?.message ||
//           'Login failed';
        
//         console.error('Login error:', message);
//         throw new Error(message);
//       }

//       // Non-axios errors
//       console.error('Login error:', error);
//       throw new Error('Login failed');
//     }
//   };

//   // const signup = async (userData: SignupData): Promise<AuthResponse> => {
//   //   try {
//   //     const { data } = await axios.post<AuthResponse>('/auth/signup', userData);
  
//   //     navigate('/login');
  
//   //     return {
//   //       success: true,
//   //       message: data.message || 'Signup successful'
//   //     };
//   //   } catch (error) {
//   //     let message = 'Signup failed';
  
//   //     if (axios.isAxiosError(error)) {
//   //       message =
//   //         error.response?.data?.errMsg ||
//   //         error.response?.data?.message ||
//   //         message;
//   //     }
  
//   //     console.error('Signup error:', message);
//   //     throw new Error(message);
//   //   }
//   // };

//   // const signup = async (userData: SignupData): Promise<AuthResponse> => {
//   //   try {
//   //     const { data } = await axios.post<AuthResponse>('/auth/signup', userData);
  
//   //     // 🔧 FIX: Clear everything explicitly
//   //     localStorage.removeItem('auth');
//   //     delete axios.defaults.headers.common['Authorization'];
      
//   //     setAuth({
//   //       user: null,
//   //       token: '',
//   //       message: '',
//   //       profile: null,
//   //       avatarUrl: '',
//   //       isLoadingProfile: false
//   //     });
  
//   //     navigate('/login');
  
//   //     return {
//   //       success: true,
//   //       message: data.message || 'Signup successful'
//   //     };
//   //   } catch (error) {
//   //     let message = 'Signup failed';
  
//   //     if (axios.isAxiosError(error)) {
//   //       message =
//   //         error.response?.data?.errMsg ||
//   //         error.response?.data?.message ||
//   //         message;
//   //     }
  
//   //     console.error('Signup error:', message);
//   //     throw new Error(message);
//   //   }
//   // };
//   const signup = async (userData: SignupData): Promise<AuthResponse> => {
//     try {
//       console.log('🚀 [SIGNUP] Starting signup...');
      
//       const { data } = await axios.post<AuthResponse>('/auth/signup', userData);
      
//       console.log('📦 [SIGNUP] Backend response:', {
//         hasToken: !!data.token,
//         hasUser: !!data.user,
//         message: data.message
//       });
  
//       // Check BEFORE cleanup
//       console.log('🔍 [SIGNUP] Before cleanup:', {
//         localStorage: localStorage.getItem('auth'),
//         axiosHeader: axios.defaults.headers.common['Authorization']
//       });
  
//       // 🔧 Clear everything
//       localStorage.removeItem('auth');
//       delete axios.defaults.headers.common['Authorization'];
      
//       setAuth({
//         user: null,
//         token: '',
//         message: '',
//         profile: null,
//         avatarUrl: '',
//         isLoadingProfile: false
//       });
  
//       // Check AFTER cleanup
//       console.log('🔍 [SIGNUP] After cleanup:', {
//         localStorage: localStorage.getItem('auth'),
//         axiosHeader: axios.defaults.headers.common['Authorization']
//       });
  
//       console.log('➡️ [SIGNUP] Navigating to login...');
//       navigate('/auth/login');
  
//       return {
//         success: true,
//         message: data.message || 'Signup successful'
//       };
//     } catch (error) {
//       let message = 'Signup failed';
  
//       if (axios.isAxiosError(error)) {
//         message =
//           error.response?.data?.errMsg ||
//           error.response?.data?.message ||
//           message;
//       }
  
//       console.error('❌ [SIGNUP] Error:', message);
//       throw new Error(message);
//     }
//   };

//   // Forgot Password
//   const forgotPassword = async (email: string): Promise<AuthResponse> => {
//     try {
//       const { data } = await axios.post<AuthResponse>('/auth/forgot-password', { email });
//       return data;
//     } catch (error) {
//       let message = 'Failed to send reset email';
      
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<AuthResponse>;
//         message = axiosError.response?.data?.errMsg || axiosError.response?.data?.message || message;
//       }
      
//       throw new Error(message);
//     }
//   };

//   // Reset Password
//   const resetPassword = async (
//     resetToken: string, 
//     passwords: ResetPasswordData
//   ): Promise<{ success: boolean; message: string }> => {
//     try {
//       const { data } = await axios.post<{ message: string }>(`/auth/reset-password/${resetToken}`, {
//         newPassword: passwords.password
//       });
      
//       if (data?.message) {
//         return { success: true, message: data.message };
//       } else {
//         throw new Error('Reset failed');
//       }
//     } catch (error) {
//       let message = 'Reset failed';
      
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<AuthResponse>;
//         message = axiosError.response?.data?.errMsg || axiosError.response?.data?.message || message;
//       }
      
//       throw new Error(message);
//     }
//   };

//   // Logout - clears everything
//   const logout = async (): Promise<void> => {
//     const currentToken = auth?.token;
    
//     console.log('🔴 Logout initiated');
    
//     try {
//       if (currentToken) {
//         await axios.post('/auth/logout', {}, {
//           headers: {
//             'Authorization': `Bearer ${currentToken}`
//           }
//         });
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }

//     // Clear everything immediately
//     setAuth({
//       user: null,
//       token: '',
//       message: '',
//       profile: null,
//       avatarUrl: '',
//       isLoadingProfile: false
//     });
    
//     localStorage.removeItem('auth');
//     delete axios.defaults.headers.common['Authorization'];
    
//     console.log('🔴 Auth state cleared completely');
    
//     // Navigate to login
//     navigate('/auth/login');
//   };

//   const value: AuthContextType = {
//     auth,
//     isAuthenticated,
//     profile: auth.profile,
//     avatarUrl: auth.avatarUrl,
//     isLoadingProfile: auth.isLoadingProfile,
//     setAuth,
//     login,
//     signup,
//     forgotPassword,
//     resetPassword,
//     logout,
//     fetchProfile,
//     updateProfile,
//     updateAvatar,
//     getInitials
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


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
    loading: true // Start with loading true
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
      console.log('🔍 [AuthContext] Loading auth from localStorage...');
      const data = localStorage.getItem('auth');
      
      if (data) {
        try {
          const parsed: AuthState = JSON.parse(data);
          console.log('✅ [AuthContext] Auth loaded:', {
            hasUser: !!parsed.user,
            hasToken: !!parsed.token
          });
          setAuth({ ...parsed, loading: false });
        } catch (error) {
          console.error('❌ [AuthContext] Failed to parse auth:', error);
          localStorage.removeItem('auth');
          setAuth(prev => ({ ...prev, loading: false }));
        }
      } else {
        console.log('ℹ️ [AuthContext] No saved auth found');
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

    // Validate session by checking if we can still access protected resources
    const validateSession = async () => {
      try {
        // Use the /auth/me endpoint to validate session
        // If token is invalid, backend will return 401
        await axios.get('/auth/me');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.log('🔴 Session invalidated - likely cleared from another device');
          // The 401 interceptor will handle the cleanup automatically
        }
      }
    };

    // Start validation after 10 seconds (to avoid conflict with initial fetchProfile)
    const timeoutId = setTimeout(() => {
      // Run first validation
      validateSession();
      
      // Then run every 10 seconds
      intervalId = setInterval(validateSession, 10000);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAuthenticated]);

  // Axios response interceptor to catch 401 errors
  useEffect(() => {
    let isHandling401 = false; // Prevent infinite loop

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && isAuthenticated && !isHandling401) {
          isHandling401 = true;
          console.log('🔴 401 detected - clearing session');
          toast.error('Your session has expired or was ended from another device.');
          
          // Clear everything
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
          
          // Reset flag after delay
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
    
    // Get first letter of first name and last name
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  // Fetch profile from API
  const fetchProfile = async (): Promise<void> => {
    // Don't fetch if not authenticated or already loading
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
      console.error('Failed to fetch profile:', error);
      // Don't show error toast for 401s - the interceptor handles it
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
      console.error('Failed to update profile:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to update profile');
      } else {
        toast.error('Failed to update profile');
      }
      throw error;
    }
  };

  // Update avatar
  const updateAvatar = async (file: File): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to update your avatar');
      return;
    }

    // Validate file
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
      console.error('Failed to update avatar:', error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to upload profile picture');
      } else {
        toast.error('Failed to upload profile picture');
      }
      throw error;
    }
  };

  // Login function
  const login = async (userData: LoginData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/login', userData);

      // Check if backend requires confirmation for clearing other sessions
      if (data.requiresConfirmation && !userData.clearOtherSessions) {
        // Return the response with requiresConfirmation flag
        // The Login component will handle showing the confirmation dialog
        return {
          success: false,
          requiresConfirmation: true,
          activeSessions: data.activeSessions,
          message: data.message || 'Active session detected on another device. Please confirm to clear it and continue.'
        };
      }

      // Normal login flow - session is clear or user confirmed clearing
      // IMPORTANT: Set Authorization header first, before any state updates
      if (data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      // Fetch profile immediately with the new token BEFORE setting auth state
      let finalAuth: AuthState;
      
      if (data.user && data.token) {
        try {
          const profileResponse = await axios.get('/auth/me');
          const profileUser = profileResponse.data.user;
          
          // Create auth with profile data including avatar
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
          console.error('Failed to fetch profile on login:', error);
          // If profile fetch fails, create auth without profile data
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
        // No user or token
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

      // Set auth state ONCE with complete data (including avatar)
      setAuth(finalAuth);
      localStorage.setItem('auth', JSON.stringify(finalAuth));

      // DON'T navigate here - let Login component handle redirect
      // navigate('/');

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

        // Handle 409 Conflict - Active session detected
        if (statusCode === 409 && responseData?.requiresConfirmation) {
          // Return the response with requiresConfirmation
          // Don't throw - let Login component handle it
          return {
            success: false,
            requiresConfirmation: true,
            activeSessions: responseData.activeSessions || [],
            message: responseData.message || 'Active session detected on another device. Please confirm to clear it and continue.'
          };
        }

        // For other errors, throw with message
        const message =
          responseData?.errMsg ||
          responseData?.message ||
          'Login failed';
        
        console.error('Login error:', message);
        throw new Error(message);
      }

      // Non-axios errors
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const signup = async (userData: SignupData): Promise<AuthResponse> => {
    try {
      console.log('🚀 [SIGNUP] Starting signup...');
      
      const { data } = await axios.post<AuthResponse>('/auth/signup', userData);
      
      console.log('📦 [SIGNUP] Backend response:', {
        hasToken: !!data.token,
        hasUser: !!data.user,
        message: data.message
      });
  
      // Check BEFORE cleanup
      console.log('🔍 [SIGNUP] Before cleanup:', {
        localStorage: localStorage.getItem('auth'),
        axiosHeader: axios.defaults.headers.common['Authorization']
      });
  
      // 🔧 Clear everything
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
  
      // Check AFTER cleanup
      console.log('🔍 [SIGNUP] After cleanup:', {
        localStorage: localStorage.getItem('auth'),
        axiosHeader: axios.defaults.headers.common['Authorization']
      });
  
      console.log('➡️ [SIGNUP] Navigating to login...');
      navigate('/auth/login');
  
      return {
        success: true,
        message: data.message || 'Signup successful'
      };
    } catch (error) {
      let message = 'Signup failed';
  
      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.errMsg ||
          error.response?.data?.message ||
          message;
      }
  
      console.error('❌ [SIGNUP] Error:', message);
      throw new Error(message);
    }
  };

  // Forgot Password
  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/forgot-password', { email });
      return data;
    } catch (error) {
      let message = 'Failed to send reset email';
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AuthResponse>;
        message = axiosError.response?.data?.errMsg || axiosError.response?.data?.message || message;
      }
      
      throw new Error(message);
    }
  };

   // Reset Password
    const resetPassword = async (
      resetToken: string, 
      passwords: ResetPasswordData
    ): Promise<{ success: boolean; message: string }> => {
      try {
        console.log('🔍 [AuthContext - resetPassword] Sending request:', {
          token: resetToken,
          hasPassword: !!passwords.password
        });
  
        const { data } = await axios.post<{ message: string }>(`/auth/reset-password/${resetToken}`, {
          password: passwords.password
        });
        
        console.log('✅ [AuthContext - resetPassword] Success:', data);
  
        if (data?.message) {
          return { success: true, message: data.message };
        } else {
          throw new Error('Reset failed');
        }
      } catch (error) {
        let message = 'Reset failed';
        
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<AuthResponse>;
          message = axiosError.response?.data?.errMsg || axiosError.response?.data?.message || message;
          console.error('❌ [AuthContext - resetPassword] API Error:', {
            status: axiosError.response?.status,
            message: message,
            data: axiosError.response?.data
          });
        }
        
        throw new Error(message);
      }
    };

  // Logout - clears everything
  const logout = async (): Promise<void> => {
    const currentToken = auth?.token;
    
    console.log('🔴 Logout initiated');
    
    try {
      if (currentToken) {
        await axios.post('/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${currentToken}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear everything immediately
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
    
    console.log('🔴 Auth state cleared completely');
    
    // Navigate to login
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
