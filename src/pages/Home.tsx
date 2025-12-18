import React from 'react';
import { Hero } from '../components/Hero';
import { CourseHighlights } from '../components/CourseHighlights';
import { FeaturedCourses } from '../components/FeaturedCourses';
import Stats  from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { Newsletter } from '../components/Newsletter';
import  Footer  from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CourseHighlights />
      <FeaturedCourses />
      <Stats />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
