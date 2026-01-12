import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/Footer logo new.svg';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="KDP Success Guide" className="h-12 w-32 mx-0 " />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering aspiring publishers with proven KDP strategies and comprehensive training to build successful publishing businesses.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex cursor-not-allowed items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex cursor-not-allowed items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex cursor-not-allowed items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex cursor-not-allowed items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors cursor-not-allowed">Free Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors cursor-not-allowed">Help Center</a></li>
            </ul>
          </div>

          {/* Course Info */}
          <div>
            <h4 className="text-white mb-6">Course Topics</h4>
            <ul className="space-y-3">
              <li><a className="hover:text-primary transition-colors cursor-not-allowed">KDP Basics</a></li>
              <li><a className="hover:text-primary transition-colors cursor-not-allowed">Niche Research</a></li>
              <li><a className="hover:text-primary transition-colors cursor-not-allowed">Book Creation</a></li>
              <li><a className="hover:text-primary transition-colors cursor-not-allowed">Marketing</a></li>
              <li><a className="hover:text-primary transition-colors cursor-not-allowed">Scaling</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>Ikeja, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <span>+234 813 381 1714</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <span>odehsam555@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 KDP Success Guide by DSAM. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}