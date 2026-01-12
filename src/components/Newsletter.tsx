import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Newsletter() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 md:p-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div 
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ rotate: 360 }}
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2 
              className="mb-4 text-3xl md:text-4xl text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get Free KDP Resources
            </motion.h2>
            <motion.p 
              className="text-white/90 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join our newsletter and get exclusive KDP tips, free templates, and special course updates delivered to your inbox.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button 
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            <motion.p 
              className="text-sm text-white/80 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Join 100+ students already learning from DSAM
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}