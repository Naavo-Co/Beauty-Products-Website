import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Heart, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Products = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'fragrance', name: 'Fragrance' },
    { id: 'tools', name: 'Tools & Brushes' }
  ];

  const products = [
    {
      id: 1,
      name: 'Luxury Foundation',
      category: 'makeup',
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 1247,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      description: 'Long-lasting, buildable coverage with a natural finish',
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: 'Anti-Aging Serum',
      category: 'skincare',
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.9,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      description: 'Advanced formula with retinol and hyaluronic acid',
      isNew: false,
      isSale: true
    },
    {
      id: 3,
      name: 'Rose Gold Palette',
      category: 'makeup',
      price: 65.00,
      originalPrice: 65.00,
      rating: 4.7,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      description: '18 stunning shades for every occasion',
      isNew: true,
      isSale: false
    },
    {
      id: 4,
      name: 'Hydrating Face Cream',
      category: 'skincare',
      price: 34.99,
      originalPrice: 45.00,
      rating: 4.6,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      description: '24-hour hydration with ceramides',
      isNew: false,
      isSale: true
    },
    {
      id: 5,
      name: 'Vanilla Perfume',
      category: 'fragrance',
      price: 78.00,
      originalPrice: 78.00,
      rating: 4.8,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      description: 'Elegant and long-lasting fragrance',
      isNew: false,
      isSale: false
    },
    {
      id: 6,
      name: 'Professional Brush Set',
      category: 'tools',
      price: 125.00,
      originalPrice: 150.00,
      rating: 4.9,
      reviews: 678,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      description: 'Complete set of 15 premium brushes',
      isNew: false,
      isSale: true
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="products" className="section relative">
      <div className="bg-pattern"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Our Premium Products</h2>
          <p className="section-subtitle">
            Discover our curated collection of luxury beauty products designed to enhance your natural beauty
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass mb-12 p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="text-white" size={20} />
              <span className="text-white font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                className="product-card group"
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        NEW
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
                    >
                      <Heart size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
                    >
                      <ShoppingCart size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pink-300 font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={16} fill="currentColor" />
                      <span className="text-white text-sm">{product.rating}</span>
                      <span className="text-gray-400 text-sm">({product.reviews})</span>
                    </div>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-semibold text-white hover:text-pink-300 transition-colors duration-300">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-300 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary mt-4"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 