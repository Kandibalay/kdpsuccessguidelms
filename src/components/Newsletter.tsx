// import React from 'react';
// import { Mail, ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// export function Newsletter() {
//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <motion.div 
//           className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 md:p-16"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="max-w-2xl mx-auto text-center">
//             <motion.div 
//               className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
//               initial={{ scale: 0 }}
//               whileInView={{ scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               whileHover={{ rotate: 360 }}
//             >
//               <Mail className="w-8 h-8 text-white" />
//             </motion.div>
//             <motion.h2 
//               className="mb-4 text-3xl md:text-4xl text-white"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               Get Free KDP Resources
//             </motion.h2>
//             <motion.p 
//               className="text-white/90 mb-8 text-lg"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//             >
//               Join our newsletter and get exclusive KDP tips, free templates, and special course updates delivered to your inbox.
//             </motion.p>
//             <motion.div 
//               className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//             >
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//               <motion.button 
//                 className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Subscribe
//                 <ArrowRight className="w-5 h-5" />
//               </motion.button>
//             </motion.div>
//             <motion.p 
//               className="text-sm text-white/80 mt-4"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//             >
//               Join 100+ students already learning from DSAM
//             </motion.p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/apiConfig';
import toast from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      
      const response = await api.post('/newsletter/subscribe', {
        email: email.trim()
      });
      setIsSubscribed(true);
      toast.success('Successfully subscribed! Check your inbox for confirmation.');
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 5000);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                // Success State
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-center gap-3 text-white">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-lg">Successfully Subscribed!</p>
                      <p className="text-white/80 text-sm">Check your inbox for confirmation</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Subscription Form
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60 disabled:cursor-not-allowed"
                    required
                  />
                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed min-w-[140px]"
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

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

