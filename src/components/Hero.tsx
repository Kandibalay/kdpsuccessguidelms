import { ArrowRight, Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMHRlYW18ZW58MXx8fHwxNzY1MjYyMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "KDP Success Guide by DSAM",
    subtitle: "Learn the proven strategies to create, publish, and profit from Amazon KDP. From book creation to marketing mastery—everything you need to build a successful publishing business."
  },
  {
    image: "https://images.unsplash.com/photo-1610731826702-6ded935d39a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjBraW5kbGUlMjBib29rcyUyMHJlYWRpbmd8ZW58MXx8fHwxNzY1NDc2MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Publish Your First Bestseller",
    subtitle: "Discover the secrets to creating books that readers love and buy. Master niche research, book design, and Amazon's algorithm to maximize your success."
  },
  {
    image: "https://images.unsplash.com/photo-1639916765637-43de505e45a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjB3cml0aW5nJTIwZGVzayUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjU0NzYxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Build Your Publishing Empire",
    subtitle: "Scale from your first book to a profitable publishing business. Learn advanced marketing strategies and automation techniques from successful KDP publishers."
  }
];

const testimonials = [
  {
    text: "This KDP course changed everything. I published my first book and made $2,000 in the first month!",
    author: "Sarah Chen",
    role: "Published Author"
  },
  {
    text: "DSAM's strategies are pure gold. Finally making consistent income from KDP publishing.",
    author: "Marcus Johnson",
    role: "KDP Publisher"
  },
  {
    text: "The step-by-step guidance made it so easy. Already published 5 books and counting!",
    author: "Emma Williams",
    role: "Self-Publisher"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={slide.image}
            alt={`Hero background ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/60"></div>
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-32">
        <div className="max-w-3xl">
          <div className="mb-8">
            <motion.div 
              className="inline-block text-white/90 mb-4 px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-300/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Master Amazon KDP Publishing
            </motion.div>
            <motion.h1 
              key={`title-${currentSlide}`}
              className="text-white mb-6 text-6xl md:text-7xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
          </div>
          <motion.p 
            key={`subtitle-${currentSlide}`}
            className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>
          <motion.button 
            className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 group shadow-lg shadow-orange-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Testimonial Carousel */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-md shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <motion.img
                key={`img-${currentTestimonial}`}
                src="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTI3NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student"
                className="w-12 h-12 rounded-full object-cover"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <motion.p 
                  key={`text-${currentTestimonial}`}
                  className="text-gray-800 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  "{testimonials[currentTestimonial].text}"
                </motion.p>
                <motion.div
                  key={`author-${currentTestimonial}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-sm text-gray-900">{testimonials[currentTestimonial].author}</div>
                  <div className="text-sm text-primary">{testimonials[currentTestimonial].role}</div>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <motion.button
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full bg-primary hover:bg-accent text-white flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <motion.button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>
        
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentSlide ? 'w-12 bg-white' : 'w-12 bg-white/30'
              }`}
              animate={{
                scale: index === currentSlide ? 1.1 : 1,
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
}