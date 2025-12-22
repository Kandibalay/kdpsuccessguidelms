import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Types
interface User {
  id: string;
  email: string;
  fullName: string;
  [key: string]: any; // Allow additional user properties
}

interface AuthState {
  user: User | null;
  token: string;
  message: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  [key: string]: any; // Allow additional signup fields
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
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  login: (userData: LoginData) => Promise<AuthResponse>;
  signup: (userData: SignupData) => Promise<AuthResponse>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (resetToken: string, passwords: ResetPasswordData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
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
    message: ''
  });

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
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        const parsed: AuthState = JSON.parse(data);
        setAuth(parsed);
      } catch (error) {
        console.error('Failed to parse auth from localStorage:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // Login function
  const login = async (userData: LoginData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/signin', userData);

      if (data?.success) {
        const newAuth: AuthState = {
          user: data.user || null,
          token: data.token || '',
          message: data.message || ''
        };

        setAuth(newAuth);
        localStorage.setItem('auth', JSON.stringify(newAuth));
        navigate('/');
        return data;
      } else {
        throw new Error(data.errMsg || data.message || 'Login failed');
      }
    } catch (error) {
      let message = 'Login failed';
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AuthResponse>;
        if (axiosError.response?.data) {
          message = axiosError.response.data.errMsg || axiosError.response.data.message || message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }
      
      console.error('Login error:', message);
      throw new Error(message);
    }
  };

  
  const signup = async (userData: SignupData): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post<AuthResponse>('/auth/signup', userData);
  
      // ✅ Redirect AFTER successful signup
      navigate('/login');
  
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
  
      console.error('Signup error:', message);
      throw new Error(message);
    }
  };
  
  

//   Signup function
//   const signup = async (userData: SignupData): Promise<AuthResponse> => {
//     try {
//       const { data } = await axios.post<AuthResponse>('/auth/signup', userData);

//       if (data?.success) {
//         const newAuth: AuthState = {
//           user: data.user || null,
//           token: data.token || '',
//           message: data.message || ''
//         };

//         setAuth(newAuth);
//         localStorage.setItem('auth', JSON.stringify(newAuth));
//         navigate('/auth/signin');
//         return data;
//       } else {
//         throw new Error(data.errMsg || data.message || 'Signup failed');
//       }
//     } catch (error) {
//       let message = 'Signup failed';
      
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<AuthResponse>;
//         message = axiosError.response?.data?.errMsg || axiosError.response?.data?.message || message;
//       }
      
//       console.error('Signup error:', message);
//       throw new Error(message);
//     }
//   };

// const signup = async (userData: SignupData): Promise<AuthResponse> => {
//     try {
//       const payload = {
//         fullName: userData.fullName,
//         email: userData.email,
//         password: userData.password,
//       };
  
//       const { data } = await axios.post<AuthResponse>('/auth/signup', payload);
  
//       if (!data?.success) {
//         throw new Error(data.errMsg || data.message || 'Signup failed');
//       }
  
//       const newAuth: AuthState = {
//         user: data.user || null,
//         token: data.token || '',
//         message: data.message || ''
//       };
  
//       setAuth(newAuth);
//       localStorage.setItem('auth', JSON.stringify(newAuth));
//       navigate('/auth/signin');
  
//       return data;
//     } catch (error) {
//       let message = 'Signup failed';
  
//       if (axios.isAxiosError(error)) {
//         message =
//           error.response?.data?.errMsg ||
//           error.response?.data?.message ||
//           message;
//       }
  
//       console.error('Signup error:', message);
//       throw new Error(message);
//     }
//   };
  

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
      const { data } = await axios.post<{ message: string }>(`/auth/reset-password/${resetToken}`, {
        newPassword: passwords.password
      });
      
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
      }
      
      throw new Error(message);
    }
  };

  // Logout
  const logout = (): void => {
    localStorage.removeItem('auth');
    setAuth({
      user: null,
      token: '',
      message: ''
    });
    navigate('/auth/signin');
  };

  const value: AuthContextType = {
    auth,
    setAuth,
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout
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