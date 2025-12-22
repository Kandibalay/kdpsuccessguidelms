// import React from 'react';
// import { Mail, Phone, MapPin, Send } from 'lucide-react';
// import { motion } from 'motion/react';
// import  Footer  from '../components/Footer';

// export default function Contact() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <div className="relative py-16 overflow-hidden">
//         {/* Background Image */}
//         <motion.div 
//           className="absolute inset-0"
//           initial={{ scale: 1.1, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <img
//             src="https://images.unsplash.com/photo-1762344668789-0a49621cb4a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwc3VwcG9ydCUyMHRlYW18ZW58MXx8fHwxNzY1NDU1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//             alt="Contact us"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary/95"></div>
//         </motion.div>

//         {/* Content */}
//         <div className="relative z-10 container mx-auto px-6 text-center">
//           <motion.div
//             className="inline-block bg-orange-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-orange-300/30 mb-6"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             We're Here to Help
//           </motion.div>
//           <motion.h1 
//             className="text-white text-4xl md:text-5xl mb-4"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Get In Touch
//           </motion.h1>
//           <motion.p 
//             className="text-white/90 text-lg max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             Have questions about our KDP Success Guide? We're here to help you start your publishing journey.
//           </motion.p>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div className="py-20">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
//             {/* Contact Information */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-3xl mb-6 text-gray-900">Contact Information</h2>
//               <p className="text-gray-600 mb-8">
//                 Fill out the form and our team will get back to you within 24 hours.
//               </p>

//               <div className="space-y-6">
//                 {[
//                   { icon: Mail, title: 'Email', content: 'support@kdpsuccessguide.com' },
//                   { icon: Phone, title: 'Phone', content: '+234 813 381 1714' },
//                   { icon: MapPin, title: 'Location', content: 'Ikeja, Lagos, Nigeria' }
//                 ].map((item, index) => (
//                   <motion.div 
//                     key={index}
//                     className="flex items-start gap-4"
//                     initial={{ opacity: 0, x: -30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     whileHover={{ x: 5 }}
//                   >
//                     <motion.div 
//                       className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <item.icon className="w-6 h-6 text-primary" />
//                     </motion.div>
//                     <div>
//                       <h3 className="text-lg mb-1 text-gray-900">{item.title}</h3>
//                       <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* FAQ Section */}
//               <motion.div 
//                 className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <h3 className="text-xl mb-3 text-gray-900">Frequently Asked Questions</h3>
//                 <p className="text-gray-600 mb-4">
//                   Before reaching out, check our FAQ section for quick answers to common questions.
//                 </p>
//                 <motion.button 
//                   className="text-orange-600 hover:underline"
//                   whileHover={{ x: 5 }}
//                 >
//                   View FAQ →
//                 </motion.button>
//               </motion.div>
//             </motion.div>

//             {/* Contact Form */}
//             <motion.div 
//               className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <form className="space-y-6">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.1 }}
//                 >
//                   <label htmlFor="name" className="block text-gray-900 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
//                     placeholder="John Doe"
//                   />
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.2 }}
//                 >
//                   <label htmlFor="email" className="block text-gray-900 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
//                     placeholder="john@example.com"
//                   />
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.3 }}
//                 >
//                   <label htmlFor="subject" className="block text-gray-900 mb-2">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
//                     placeholder="How can we help?"
//                   />
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.4 }}
//                 >
//                   <label htmlFor="message" className="block text-gray-900 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={5}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
//                     placeholder="Tell us more about your inquiry..."
//                   ></textarea>
//                 </motion.div>

//                 <motion.button
//                   type="submit"
//                   className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.5 }}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Send Message
//                   <Send className="w-5 h-5" />
//                 </motion.button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';
import Footer from '../components/Footer';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzpogep";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await axios.post(
        FORMSPREE_ENDPOINT,
        formData,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      setSuccess('Message sent successfully. We’ll get back to you shortly!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1762344668789-0a49621cb4a1"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary/95" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1 
            className="text-white text-4xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In Touch
          </motion.h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Form */}
            <motion.div 
              className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                
                <div>
                  <label className="block mb-2">Full Name</label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2">Subject</label>
                  <input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg resize-none"
                  />
                </div>

                {/* Feedback */}
                {success && (
                  <p className="text-green-600 text-sm">{success}</p>
                )}
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </motion.button>

              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';
import Footer from '../components/Footer';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzpogep";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        FORMSPREE_ENDPOINT,
        formData,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      toast.success('Message sent successfully 🚀');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ...everything else stays the same */}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* inputs stay the same */}

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Sending...' : 'Send Message'}
          <Send className="w-5 h-5" />
        </motion.button>
      </form>

      <Footer />
    </div>
  );
}

