import { BookOpen, Target, TrendingUp, DollarSign, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  { 
    icon: BookOpen, 
    name: 'Book Creation', 
    description: 'Learn to create high-quality books that sell',
    color: 'bg-blue-50 text-blue-600' 
  },
  { 
    icon: Target, 
    name: 'Niche Research', 
    description: 'Find profitable niches with low competition',
    color: 'bg-orange-50 text-orange-600' 
  },
  { 
    icon: TrendingUp, 
    name: 'Marketing Strategies', 
    description: 'Proven tactics to boost your book sales',
    color: 'bg-pink-50 text-pink-600' 
  },
  { 
    icon: DollarSign, 
    name: 'Monetization', 
    description: 'Multiple income streams from your books',
    color: 'bg-green-50 text-green-600' 
  },
  { 
    icon: Zap, 
    name: 'Fast Results', 
    description: 'Start seeing results in weeks, not months',
    color: 'bg-orange-100 text-orange-600' 
  },
  { 
    icon: Award, 
    name: 'Expert Support', 
    description: 'Direct access to DSAM and community',
    color: 'bg-indigo-50 text-indigo-600' 
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CourseHighlights() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-primary mb-2">What You'll Learn</div>
          <h2 className="mb-4 text-3xl md:text-4xl text-gray-900">
            Everything You Need For KDP Success
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className={`w-16 h-16 ${highlight.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <div className="text-gray-900 mb-2">{highlight.name}</div>
                <div className="text-sm text-gray-500">{highlight.description}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}