import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { motion } from 'framer-motion';
import circle from '../assets/black circle.jpg';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    text: 'DSAM\'s KDP course is incredible! I went from zero knowledge to publishing my first book in just 2 weeks. Made my investment back in the first month and now earning $3,000+ monthly. Best decision ever!',
    author: 'Ijeoma',
    role: 'Full-Time KDP Publisher',
    rating: 5,
    image: circle
  },
  {
    id: 2,
    text: 'Dsam’s course in 2025 changed my finances. Within my first month, I earned my first $20 and scaled using the strategies taught, making over $1,000 on my first account and running multiple accounts today.',
    author: 'David Samuel',
    role: 'Full-Time KDP Publisher',
    rating: 5,
    image: circle
  },
  {
    id: 3,
    text: 'I was skeptical at first, but this course exceeded all expectations. The niche research methods alone are worth 10x the price. Having two best seller accounts is something I didn\'t think was achievable this fast.',
    author: 'Vellz',
    role: 'KDP Success Story',
    rating: 5,
    image: circle
  },
  {
    id: 4,
    text: 'After two years in KDP earning $300–$400 monthly, joining DSAM’s Inner Circle Cohort became the turning point. Since then, earnings have consistently averaged over $3,000 per month.',
    author: 'David Peter',
    role: 'Published 20+ Books',
    rating: 5,
    image: circle
  },
  {
    id: 5,
    text: 'Finally a course that delivers on its promises. Clear, actionable steps that actually work. I\'ve published more than 10 books and each one is making consistent sales. Couldn\'t be happier!',
    author: 'Prosper Eze',
    role: 'KDP Entrepreneur',
    rating: 5,
    image: circle
  },
  {
    id: 6,
    text: 'Best investment I\'ve ever made. The community support and ongoing updates make this course worth every penny. Already earned back 10x what I paid!',
    author: 'James',
    role: 'Published Author',
    rating: 5,
    image: circle
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-primary mb-2">Success Stories</div>
          <h2 className="mb-4 text-3xl md:text-4xl text-gray-900">
            What Our Students Are Saying
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="!w-auto max-w-md">
              <motion.div
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative border-2 border-transparent hover:border-orange-200 h-full"
                whileHover={{ y: -10 }}
              >
                <Quote className="w-10 h-10 text-orange-500/20 mb-6" />

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-primary">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #1B5E8F;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #F97316;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #1B5E8F;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #F97316;
        }
      `}</style>

        <Link to="/testimonials" className='flex items-center mx-auto justify-center'>
          <div className='mt-8 inline-block  text-center bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors'>
            View More Testimonials
          </div>
        </Link>
    </section>
  );
}