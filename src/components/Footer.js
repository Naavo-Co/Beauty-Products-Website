import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Story', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Size Guide', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="relative mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-pink-900 to-purple-900">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">Glamour Beauty</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover your natural beauty with our premium collection of luxury makeup and skincare products. 
                Quality, innovation, and elegance in every product.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-pink-300 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-pink-300 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h4 className="text-white font-semibold text-lg mb-4">Stay Connected</h4>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSignup} className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-300"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-3 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 transition-colors duration-300"
                  >
                    <Mail size={20} />
                  </motion.button>
                </div>
              </form>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="text-pink-300" size={18} />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-pink-300" size={18} />
                  <span className="text-gray-300">hello@glamourbeauty.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-pink-300" size={18} />
                  <span className="text-gray-300">123 Beauty Street, NY 10001</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-300">
                <span>© 2024 Glamour Beauty. Made with</span>
                <Heart className="text-pink-500" size={16} fill="currentColor" />
                <span>for beauty lovers.</span>
              </div>
              
              <div className="flex space-x-6">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-300 hover:text-pink-300 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 