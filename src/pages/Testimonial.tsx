import React, { useState } from 'react';
import { Star, Quote, Play, TrendingUp, Award, CheckCircle, ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Import the proof images
import proof1 from '../assets/testimonies_11.jpeg';
import proof2 from '../assets/testimonies_10.jpeg';
import proof3 from '../assets/testimonies_8.jpeg';
import proof4 from '../assets/testimonies_7.jpeg';
import proof5 from '../assets/testimony_6.jpeg';
import proof6 from '../assets/testimony_5.jpeg';
import proof7 from '../assets/Nnamdi_testimony.jpeg';
import proof8 from '../assets/isaac_testimony.jpeg';
import proof9 from '../assets/Vellz_testimony.jpeg';
import proof10 from '../assets/Prosper_TEstimony.jpeg';
import proof11 from '../assets/sam_test_1.jpeg';
import proof12 from '../assets/james_1.jpeg';
import circle from '../assets/black circle.jpg';

// Import video testimonials
import testimonialVideo1 from '../assets/Testimonial.mp4';
import testimonialVideo2 from '../assets/Screen_Recording_2025-12-13_at_4_24_45_PM.mp4';

interface StudentTestimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  rating: number;
  image: string;
  earnings: string;
  timeline: string;
  proofImage: string;
}

interface JourneyStage {
  year: string;
  milestone: string;
  description: string;
  earnings: string;
}

interface VideoTestimonial {
  id: number;
  embedUrl: string;
  thumbnail: string;
  author: string;
  description: string;
}

const studentTestimonials: StudentTestimonial[] = [
  {
    id: 1,
    text: 'DSAM\'s KDP course is incredible! I went from zero knowledge to publishing my first book in just 2 weeks. Made my investment back in the first month and now earning $3,000+ monthly. Best decision ever!',
    author: 'Ijeoma',
    role: 'KDP Publisher',
    rating: 5,
    image: circle,
    earnings: '$3,000+/month',
    timeline: '2 weeks to first book',
    proofImage: proof1
  },
  {
    id: 2,
    text: 'Dsam\'s course in 2025 changed my finances. Within my first month, I made over $200+ weekly and scaled using the strategies taught, making over $1,000 on my first account and running multiple accounts today.',
    author: 'Isaac',
    role: 'Full-Time KDP Publisher',
    rating: 5,
    image: circle,
    earnings: '$1,000+ multiple accounts',
    timeline: 'Multiple accounts now',
    proofImage: proof8
  },
  {
    id: 3,
    text: 'I was skeptical at first, but this course exceeded all expectations. The niche research methods alone are worth 10x the price. Having two best seller accounts is something I didn\'t think was achievable this fast. ',
    author: 'Vellz',
    role: 'KDP Success Story',
    rating: 5,
    image: circle,
    earnings: 'Daily sales',
    timeline: '8 books published',
    proofImage: proof9
  },
  {
    id: 4,
    text: 'After two years in KDP earning $300–$400 monthly, joining DSAM\'s Inner Circle Cohort became the turning point. Since then, earnings have consistently averaged over $3,000 per month.',
    author: 'Nnamdi',
    role: 'Published 20+ Books',
    rating: 5,
    image: circle,
    earnings: '$3,000+/month',
    timeline: 'From $300 to $3,000',
    proofImage: proof7
  },
  {
    id: 5,
    text: 'Finally a course that delivers on its promises. Clear, actionable steps that actually work. I\'ve published more than 10 books and each one is making consistent sales. Couldn\'t be happier!',
    author: 'Prosper Eze',
    role: 'KDP Entrepreneur',
    rating: 5,
    image: circle,
    earnings: 'Consistent sales',
    timeline: '10+ books published',
    proofImage: proof10
  },
  {
    id: 6,
    text: 'Best investment I\'ve ever made. The community support and ongoing updates make this course worth every penny. Already earned back 10x what I paid!',
    author: 'James',
    role: 'Published Author',
    rating: 5,
    image: circle,
    earnings: '10x ROI',
    timeline: 'Ongoing success',
    proofImage: proof12
  }
];

const dsamJourney: JourneyStage[] = [
  {
    year: 'Year 1',
    milestone: '$200-300',
    description: 'Starting from scratch, learning the basics of KDP publishing and building my first books.',
    earnings: '/month'
  },
  {
    year: 'Year 2',
    milestone: '$800-1,200',
    description: 'Discovered winning niches and refined my publishing strategy. Growth started accelerating.',
    earnings: '/month'
  },
  {
    year: 'Year 3',
    milestone: '$2,500-3,500',
    description: 'Scaled my operations, built a sustainable system, and started teaching others.',
    earnings: '/month'
  },
  {
    year: 'Year 4',
    milestone: '$5,000+',
    description: 'Achieved consistent 5-figure monthly income through proven strategies and systems.',
    earnings: '/month'
  }
];

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    embedUrl: testimonialVideo1,
    thumbnail: proof1,
    author: 'David Samuel Success Story',
    description: 'Real transformation through KDP publishing'
  },
  {
    id: 2,
    embedUrl: testimonialVideo2,
    thumbnail: proof2,
    author: 'David Peter KDP Journey',
    description: 'From struggling to successful publisher'
  }
];

export function TestimonialsPage() {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-accent to-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3 leading-tight">
              Success Stories
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
              Discover how our students are transforming their lives through KDP publishing
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-2">100+</div>
              <div className="text-sm text-orange-300">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-2">1,000+</div>
              <div className="text-sm text-orange-300">Books Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-orange-300 mb-2">$100k+</div>
              <div className="text-sm text-orange-300">Total Earnings</div>
            </div>
            {/* <div className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-2">4.9★</div>
              <div className="text-sm text-orange-300">Student Rating</div>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* DSam's Journey Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              From Struggling to Thriving
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              My journey from earning just $200-300 monthly to building a sustainable $5,000+ monthly income through KDP publishing
            </p>
          </motion.div>

          {/* Story Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Beginning</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Five years ago, I started my KDP journey with nothing but determination and a laptop. My first year was tough – earning only $200-300 per month, I questioned whether this path was worth it.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                But I didn't give up. I studied every successful publisher, tested countless strategies, and slowly but surely, I began to understand what worked. Each book I published taught me something new.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Today, I'm living proof that KDP can transform your life. I've built a consistent $5,000+ monthly income stream, and more importantly, I've created a system that anyone can follow to achieve similar results.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-500">
                <Quote className="w-10 h-10 text-orange-500 mb-4" />
                <p className="text-lg text-gray-800 italic leading-relaxed">
                  "Success in KDP isn't about luck – it's about learning the right strategies and applying them consistently. That's what I'm here to teach you."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Journey Timeline Cards */}
          {/* <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">The 4-Year Journey</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {dsamJourney.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-sm font-semibold text-gray-500">{stage.year}</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-gray-900">
                        {stage.milestone}
                        <span className="text-lg text-gray-500 font-normal">{stage.earnings}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div> */}

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">2,500%</div>
              <div className="text-sm text-gray-600">Income Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">5</div>
              <div className="text-sm text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">$5,000+</div>
              <div className="text-sm text-gray-600">Monthly Income</div>
            </div>
          </motion.div>

          {/* DSam's Proof Screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Real Figures, Real Results</h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[proof6, proof2, proof3, proof11].map((proof, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedProof(proof)}
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                    <img
                      src={proof}
                      alt={`DSam earnings proof ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 border-t border-gray-100">
                      <p className="text-sm text-center text-gray-600 font-medium">
                        📊 Earnings Screenshot
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Verified Success Stories
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Real Students, Real Results
            </p>
            <p className="text-base text-gray-500 mt-4">
              Join hundreds of successful students who have transformed their lives through our proven KDP strategies
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {studentTestimonials.map((testimonial, index) => (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="h-full"
                        >
                          <div className="bg-white rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden">
                            {/* Proof Image at Top - Fixed Height */}
                            <div 
                              className="relative overflow-hidden cursor-pointer group"
                              onClick={() => setSelectedProof(testimonial.proofImage)}
                            >
                              <div className="w-full h-48">
                                <img
                                  src={testimonial.proofImage}
                                  alt="Earnings proof"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                <span className="text-sm font-semibold text-orange-500">{testimonial.earnings}</span>
                              </div>
                            </div>
          
                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                              <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                                ))}
                              </div>
          
                              <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                                "{testimonial.text}"
                              </p>
          
                              {/* Author Info at Bottom */}
                              <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={testimonial.image}
                                    alt={testimonial.author}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 text-sm truncate">{testimonial.author}</div>
                                    <div className="text-xs text-gray-500 truncate">{testimonial.role}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Video Testimonials
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Hear From Our Students
            </p>
            <p className="text-base text-gray-500 mt-4">
              Watch real students share their transformative journeys and incredible results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video bg-black">
                    {activeVideo === video.id ? (
                      <video
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        onEnded={() => setActiveVideo(null)}
                      >
                        <source src={video.embedUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
                        <img
                          src={video.thumbnail}
                          alt={video.author}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                          <button
                            onClick={() => setActiveVideo(video.id)}
                            className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all duration-300"
                          >
                            <Play className="w-10 h-10 text-white ml-1" fill="white" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.author}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-white/90 mb-10 leading-relaxed">
              Join our community and start your journey to financial freedom through KDP publishing
            </p>
            <Link to="/courses">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />

      {/* Image Modal */}
      {selectedProof && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedProof(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            src={selectedProof}
            alt="Proof"
            className="w-full max-w-full object-contain rounded-lg shadow-2xl"
            style={{ maxHeight: '90vh' }}
          />
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-orange-500 transition-colors"
            onClick={() => setSelectedProof(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
