// profileStore.ts - Updated to match your backend responses

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Avatar {
  public_id: string;
  url: string;
}

interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: Avatar;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileState {
  // State
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;

  // Computed values
  avatarUrl: string | null;

  // Actions
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  deleteAvatar: () => Promise<void>;
  clearProfile: () => void;
  getInitials: (name: string) => string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://dsamlms.onrender.com/api';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Helper function to get token from auth object
const getAuthToken = (): string | null => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      return parsed.token || null;
    } catch (error) {
      console.error('Failed to parse auth from localStorage:', error);
      return null;
    }
  }
  return null;
};

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        profile: null,
        isLoading: false,
        error: null,
        avatarUrl: null,

        // Actions
        setProfile: (profile) =>
          set({
            profile,
            avatarUrl: profile?.avatar?.url || null,
            error: null,
          }),

        setLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),

        fetchProfile: async () => {
          const { setProfile, setLoading, setError } = get();
          setLoading(true);
          setError(null);

          console.log('🔍 Fetching profile from:', `${API_URL}/auth/me`);

          try {
            const response = await api.get('/auth/me');
            console.log('✅ Profile fetched:', response.data);
            setProfile(response.data.user);
          } catch (error: any) {
            console.error('❌ Error fetching profile:', error);
            console.error('Error details:', error.response?.data);
            setError(error.response?.data?.message || 'Failed to fetch profile');
          } finally {
            setLoading(false);
          }
        },

        updateProfile: async (data) => {
          const { setProfile, setLoading, setError } = get();
          setLoading(true);
          setError(null);

          console.log('📝 Updating profile with data:', data);

          try {
            const response = await api.patch('/auth/update-profile', data);
            console.log('✅ Profile updated:', response.data);
            setProfile(response.data.user);
            toast.success('Profile updated successfully! 🎉');
          } catch (error: any) {
            console.error('❌ Error updating profile:', error);
            console.error('Error details:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Failed to update profile';
            setError(errorMessage);
            toast.error(errorMessage);
            throw error;
          } finally {
            setLoading(false);
          }
        },

        updateAvatar: async (file) => {
          const { setProfile, setLoading, setError } = get();

          // Validate file
          if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            throw new Error('Invalid file type');
          }

          if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should not exceed 2MB');
            throw new Error('File too large');
          }

          setLoading(true);
          setError(null);

          console.log('📸 Uploading avatar:', file.name);

          try {
            const formData = new FormData();
            formData.append('avatar', file);

            // Get token from auth object
            const token = getAuthToken();
            console.log('Token exists:', !!token);

            if (!token) {
              throw new Error('No authentication token found. Please login again.');
            }

            // Try using the same update-profile endpoint with FormData
            console.log('Attempting avatar upload via PATCH /auth/update-profile');
            
            const response = await api.patch('/auth/update-profile', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
            });

            console.log('✅ Avatar uploaded:', response.data);
            setProfile(response.data.user);
            toast.success('Profile picture updated successfully! 🎉');
          } catch (error: any) {
            console.error('❌ Error uploading avatar:', error);
            console.error('Error details:', error.response?.data);
            
            const errorMessage = error.response?.data?.message || error.message || 'Failed to upload profile picture';
            setError(errorMessage);
            toast.error(errorMessage);
            throw error;
          } finally {
            setLoading(false);
          }
        },

        deleteAvatar: async () => {
          const { setProfile, setLoading, setError } = get();
          setLoading(true);
          setError(null);

          try {
            console.log('🗑️ Deleting avatar...');
            
            // TODO: REPLACE WITH YOUR ACTUAL DELETE ENDPOINT IF IT EXISTS
            const response = await api.delete('/auth/delete-avatar');
            
            console.log('✅ Avatar deleted:', response.data);
            setProfile(response.data.user);
            toast.success('Profile picture deleted successfully');
          } catch (error: any) {
            console.error('❌ Error deleting avatar:', error);
            console.error('Error details:', error.response?.data);
            
            if (error.response?.status === 404) {
              toast.error('Avatar delete endpoint not found');
            } else {
              const errorMessage = error.response?.data?.message || 'Failed to delete profile picture';
              setError(errorMessage);
              toast.error(errorMessage);
            }
            throw error;
          } finally {
            setLoading(false);
          }
        },

        clearProfile: () =>
          set({
            profile: null,
            avatarUrl: null,
            error: null,
            isLoading: false,
          }),

        getInitials: (name: string): string => {
          if (!name) return 'U';
          const names = name.trim().split(' ');
          if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
          }
          return name.substring(0, 2).toUpperCase();
        },
      }),
      {
        name: 'profile-storage',
        partialize: (state) => ({
          profile: state.profile,
          avatarUrl: state.avatarUrl,
        }),
      }
    ),
    {
      name: 'ProfileStore',
    }
  )
);

// Selectors
export const selectProfile = (state: ProfileState) => state.profile;
export const selectAvatarUrl = (state: ProfileState) => state.avatarUrl;
export const selectIsLoading = (state: ProfileState) => state.isLoading;
export const selectFullName = (state: ProfileState) => state.profile?.fullName;
export const selectEmail = (state: ProfileState) => state.profile?.email;
