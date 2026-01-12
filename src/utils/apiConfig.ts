/**
 * Axios Configuration Helper
 * This file provides a configured axios instance that uses the baseURL from .env
 * All API calls should import axios from this file to ensure security
 */

import axios from 'axios';

// Configure axios with baseURL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      console.error('Authentication error - redirecting to login');
      localStorage.removeItem('auth');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;
