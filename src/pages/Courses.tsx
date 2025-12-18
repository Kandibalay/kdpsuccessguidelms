import React from 'react';
import { Clock, BookOpen, Star, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer  from '../components/Footer';
import kindle from '../assets/Amazon image 3.jpg'

const courses = [
  {
    id: 1,
    title: 'KDP Success Guide by DSAM',
    description: 'Master Amazon Kindle Direct Publishing from start to finish. Learn book creation, niche research, marketing strategies, and scaling your publishing business.',
    image: kindle,
    price: "100,000",
    duration: '10+ hours',
    lessons: 16,
    students: "200+",
    rating: 4.9,
    level: 'All Levels',
    category: 'Amazon KDP',
    featured: true,
  },
];

export function Courses() {
  const featuredCourse = courses.find(c => c.featured);
  const otherCourses = courses.filter(c => !c.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565688695721-2b6f5a880a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsZWFybmluZ3xlbnwxfHx8fDE3NjU0NjAxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Courses hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              className="inline-block bg-orange-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-orange-300/30 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Professional KDP Training
            </motion.div>
            <motion.h1 
              className="text-white text-4xl md:text-5xl mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore Our Courses
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive training programs designed to help you succeed in Amazon Kindle Direct Publishing and beyond.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Featured Course */}
      {featuredCourse && (
        <div className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm mb-4">
                Featured Course
              </span>
              <h2 className="text-4xl text-gray-900">Our Flagship Program</h2>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <motion.img
                    src={featuredCourse.image}
                    alt={featuredCourse.title}
                    className="w-auto h-auto object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{featuredCourse.rating}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {featuredCourse.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl mb-4 text-gray-900">{featuredCourse.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredCourse.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{featuredCourse.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>{featuredCourse.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{featuredCourse.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">{featuredCourse.level}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl lg:text-3xl text-primary">₦{featuredCourse.price}</div>
                      <div className="text-sm text-gray-500">One-time payment</div>
                    </div>
                    <motion.button 
                      className="bg-orange-500 text-white px-4 md:px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Purchase
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      

      <Footer />
    </div>
  );
}