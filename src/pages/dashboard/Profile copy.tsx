import React from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Camera, Mail, User, Phone, MapPin, Calendar } from 'lucide-react';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  birthdate: string;
};

export function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Aspiring KDP publisher looking to build a successful self-publishing business.',
      location: 'New York, USA',
      birthdate: '1990-01-15',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile updated:', data);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>

        {/* Profile Picture Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Upload New Picture</h3>
              <p className="text-sm text-gray-600 mb-3">
                JPG, PNG or GIF. Max size 2MB.
              </p>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Choose File
              </button>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Last Name
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Location & Birthdate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <input
                  {...register('location')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth
                </label>
                <input
                  {...register('birthdate')}
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
