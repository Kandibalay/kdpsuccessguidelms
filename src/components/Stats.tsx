// import React,{ useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import gsap from 'gsap';

// export default function Stats() {
//   const stats = [
//     { value: '100+', label: 'Students Enrolled', description: 'Learning KDP with DSAM', numValue: 100 },
//     { value: '1,000+', label: 'Books Published', description: 'By our students', numValue: 1000 },
//     { value: '4.9', label: 'Average Rating', description: 'From 100+ reviews', numValue: 4.9 },
//     { value: '$100k+', label: 'Student Earnings', description: 'Combined revenue generated', numValue: 100000 }
//   ];

//   const statsRef = useRef<HTMLDivElement>(null);
//   const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             numbersRef.current.forEach((el, index) => {
//               if (el) {
//                 const stat = stats[index];
                
//                 if (index === 0) {
//                   // "100+" animation
//                   let counter = { value: 0 };
//                   gsap.to(counter, {
//                     value: 100,
//                     duration: 2,
//                     ease: 'power2.out',
//                     onUpdate: function() {
//                       el.innerHTML = `${Math.floor(counter.value)}+`;
//                     }
//                   });
//                 } else if (index === 1) {
//                   // "1,000+" animation
//                   let counter = { value: 0 };
//                   gsap.to(counter, {
//                     value: 1000,
//                     duration: 2,
//                     ease: 'power2.out',
//                     onUpdate: function() {
//                       el.innerHTML = `${Math.floor(counter.value).toLocaleString()}+`;
//                     }
//                   });
//                 } else if (index === 2) {
//                   // "4.9" rating animation
//                   let counter = { value: 0 };
//                   gsap.to(counter, {
//                     value: 4.9,
//                     duration: 2,
//                     ease: 'power2.out',
//                     onUpdate: function() {
//                       el.innerHTML = `${counter.value.toFixed(1)}`;
//                     }
//                   });
//                 } else if (index === 3) {
//                   // "$100K+" money animation
//                   let counter = { value: 0 };
//                   gsap.to(counter, {
//                     value: 100,
//                     duration: 2,
//                     ease: 'power2.out',
//                     onUpdate: function() {
//                       el.innerHTML = `$${Math.floor(counter.value)}K+`;
//                     }
//                   });
//                 }
//               }
//             });
//             observer.disconnect();
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     if (statsRef.current) {
//       observer.observe(statsRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-white relative overflow-hidden" ref={statsRef}>
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <motion.div 
//           className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.1, 0.2, 0.1],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         ></motion.div>
//         <motion.div 
//           className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.1, 0.25, 0.1],
//           }}
//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1
//           }}
//         ></motion.div>
//       </div>

//       <div className="container mx-auto px-6 relative">
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-white mb-4 text-3xl md:text-4xl">
//             Proven Results That Speak
//           </h2>
//         </motion.div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <motion.div 
//               key={index} 
//               className="text-center"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div 
//                 ref={(el) => { numbersRef.current[index] = el; }}
//                 className={`text-5xl md:text-6xl mb-3  ${index === 3 ? 'text-orange-300' : ''}`}
//               >
//                 0
//               </div>
//               <div className="text-xl mb-2 ">{stat.label}</div>
//               <div className="text-white/70">{stat.description}</div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import React,{ useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Stats() {
  const stats = [
    { value: '700+', label: 'Students Enrolled', description: 'Learning KDP with DSAM', numValue: 700 },
    { value: '1,000+', label: 'Books Published', description: 'By our students', numValue: 1000 },
    { value: '4.9', label: 'Average Rating', description: 'From 100+ reviews', numValue: 4.9 },
    { value: '$100k+', label: 'DSAM\'s Earnings', description: 'Combined revenue generated', numValue: 100000 }
  ];

  const statsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            numbersRef.current.forEach((el, index) => {
              if (el) {
                const stat = stats[index];
                
                if (index === 0) {
                  // "700+" animation
                  let counter = { value: 0 };
                  gsap.to(counter, {
                    value: 700,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                      el.innerHTML = `${Math.floor(counter.value)}+`;
                    }
                  });
                } else if (index === 1) {
                  // "1,000+" animation
                  let counter = { value: 0 };
                  gsap.to(counter, {
                    value: 1000,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                      el.innerHTML = `${Math.floor(counter.value).toLocaleString()}+`;
                    }
                  });
                } else if (index === 2) {
                  // "4.9" rating animation
                  let counter = { value: 0 };
                  gsap.to(counter, {
                    value: 4.9,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                      el.innerHTML = `${counter.value.toFixed(1)}`;
                    }
                  });
                } else if (index === 3) {
                  // "$100K+" money animation
                  let counter = { value: 0 };
                  gsap.to(counter, {
                    value: 100,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                      el.innerHTML = `$${Math.floor(counter.value)}K+`;
                    }
                  });
                }
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-white relative overflow-hidden" ref={statsRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white mb-4 text-3xl md:text-4xl">
            Proven Results That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div 
                ref={(el) => { numbersRef.current[index] = el; }}
                className={`text-5xl md:text-6xl mb-3  ${index === 3 ? 'text-orange-300' : ''}`}
              >
                0
              </div>
              <div className="text-xl mb-2 ">{stat.label}</div>
              <div className="text-white/70">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
