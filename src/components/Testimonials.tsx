import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: 'DSAM\'s KDP course is incredible! I went from zero knowledge to publishing my first book in just 2 weeks. Made my investment back in the first month and now earning $3,000+ monthly. Best decision ever!',
    author: 'Alexandra Turner',
    role: 'Published 12 Books',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1564247556387-6e97f44aa0cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlYWRpbmclMjBib29rfGVufDF8fHx8MTc2NTM2MDA5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    text: 'The strategies in this course are gold. DSAM breaks down everything step-by-step. I\'m now making passive income every month from my KDP books. Highly recommend to anyone serious about publishing!',
    author: 'Michael Park',
    role: 'Full-Time KDP Publisher',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTI3NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    text: 'I was skeptical at first, but this course exceeded all expectations. The niche research methods alone are worth 10x the price. Published 8 books so far and consistently making sales every day!',
    author: 'Sophia Martinez',
    role: 'KDP Success Story',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb218ZW58MXx8fHwxNzY1MzE2MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    text: 'This course transformed my life! I quit my 9-5 job and now make more from KDP than I ever did. The marketing module alone is worth thousands. Thank you DSAM!',
    author: 'James Rodriguez',
    role: 'Published 20+ Books',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTI3NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    text: 'Finally a course that delivers on its promises. Clear, actionable steps that actually work. I\'ve published 6 books and each one is making consistent sales. Couldn\'t be happier!',
    author: 'Emily Chen',
    role: 'KDP Entrepreneur',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1564247556387-6e97f44aa0cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlYWRpbmclMjBib29rfGVufDF8fHx8MTc2NTM2MDA5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    text: 'Best investment I\'ve ever made. The community support and ongoing updates make this course worth every penny. Already earned back 10x what I paid!',
    author: 'David Thompson',
    role: 'Published Author',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NTI3NzI3MXww&ixlib=rb-4.1.0&q=80&w=1080'
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
                <Quote className="w-12 h-12 text-orange-500/20 mb-6" />

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
    </section>
  );
}