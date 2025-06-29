import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Heart, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/#products' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark' : 'glass'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold gradient-text"
            >
              Glamour Beauty
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-pink-300 transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-pink-300 transition-colors duration-300"
            >
              <Search size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-pink-300 transition-colors duration-300"
            >
              <Heart size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-pink-300 transition-colors duration-300"
            >
              <User size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative text-white hover:text-pink-300 transition-colors duration-300"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-dark mt-4 rounded-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white hover:text-pink-300 transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex space-x-4">
                    <button className="text-white hover:text-pink-300 transition-colors duration-300">
                      <Search size={20} />
                    </button>
                    <button className="text-white hover:text-pink-300 transition-colors duration-300">
                      <Heart size={20} />
                    </button>
                    <button className="text-white hover:text-pink-300 transition-colors duration-300">
                      <User size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      onCartClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="relative text-white hover:text-pink-300 transition-colors duration-300"
                  >
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 