import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import FloatingProduct from './3D/FloatingProduct';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app, fetch from API
  const product = {
    id: parseInt(id),
    name: 'Luxury Foundation',
    category: 'makeup',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewCount: 1247,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    description: 'Long-lasting, buildable coverage with a natural finish that enhances your natural beauty.',
    longDescription: `Our premium foundation is formulated with advanced skincare ingredients that not only provide flawless coverage but also nourish your skin throughout the day. The lightweight, breathable formula blends seamlessly for a natural, radiant finish that lasts up to 24 hours.

    Key Benefits:
    • Long-lasting coverage that stays put all day
    • Buildable formula for customizable coverage
    • Natural finish that enhances your skin's texture
    • Enriched with hyaluronic acid for hydration
    • Suitable for all skin types
    • Dermatologist tested and non-comedogenic`,
    ingredients: 'Aqua, Cyclopentasiloxane, Dimethicone, Glycerin, Butylene Glycol, PEG-10 Dimethicone, Disteardimonium Hectorite, Sodium Chloride, Phenoxyethanol, Caprylyl Glycol, Hexylene Glycol, Disodium EDTA, Tocopheryl Acetate, Retinyl Palmitate, Ascorbyl Palmitate, Aloe Barbadensis Leaf Juice, Chamomilla Recutita (Matricaria) Flower Extract, Cucumis Sativus (Cucumber) Fruit Extract, Camellia Sinensis Leaf Extract',
    sizes: ['small', 'medium', 'large'],
    colors: ['#FFB6C1', '#FF69B4', '#FF1493', '#C71585'],
    selectedColor: '#FF69B4',
    inStock: true,
    features: [
      '24-hour wear',
      'Buildable coverage',
      'Natural finish',
      'Hydrating formula',
      'Dermatologist tested',
      'Non-comedogenic'
    ],
    customerReviews: [
      {
        id: 1,
        name: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely love this foundation! It gives me the perfect coverage without feeling heavy. My skin looks flawless all day long.'
      },
      {
        id: 2,
        name: 'Jessica L.',
        rating: 4,
        date: '2024-01-10',
        comment: 'Great product! The coverage is buildable and it lasts through my workday. Would definitely recommend.'
      },
      {
        id: 3,
        name: 'Emily R.',
        rating: 5,
        date: '2024-01-05',
        comment: 'This foundation is amazing! It feels lightweight but provides excellent coverage. My skin looks so natural and beautiful.'
      }
    ]
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedColor: product.selectedColor,
      quantity
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping & Returns' }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white hover:text-pink-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images & 3D View */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="glass rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* 3D Product View */}
            <div className="glass rounded-2xl overflow-hidden h-96">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <Float
                  speed={2}
                  rotationIntensity={0.5}
                  floatIntensity={0.5}
                >
                  <FloatingProduct />
                </Float>
                
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="glass rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                  <img
                    src={product.image}
                    alt={`${product.name} ${index}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-pink-300 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                {product.originalPrice > product.price && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    SALE
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                      size={20}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="text-white ml-2">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-400 line-through text-xl">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="glass p-6 rounded-xl">
              <p className="text-gray-200 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-pink-500 bg-pink-500 text-white'
                        : 'border-white/20 text-white hover:border-pink-300'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => product.selectedColor = color}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      product.selectedColor === color
                        ? 'border-pink-500 scale-110'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
                  >
                    -
                  </motion.button>
                  <span className="text-white font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
                  >
                    +
                  </motion.button>
                </div>
                <span className="text-gray-400 text-sm">Max 10 items</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Share2 size={20} />
                <span>Share</span>
              </motion.button>
            </div>

            {/* Features */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-200 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Truck className="text-pink-300" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Free Shipping</h3>
                  <p className="text-gray-300 text-sm">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="text-pink-300" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Secure Payment</h3>
                  <p className="text-gray-300 text-sm">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="text-pink-300" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Easy Returns</h3>
                  <p className="text-gray-300 text-sm">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-pink-300 border-b-2 border-pink-300'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">{product.longDescription}</p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-4">
                  <h3 className="text-white font-semibold mb-4">Ingredients</h3>
                  <p className="text-gray-200 leading-relaxed">{product.ingredients}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Customer Reviews</h3>
                    <button className="btn-secondary">Write a Review</button>
                  </div>
                  <div className="space-y-4">
                    {product.customerReviews.map((review) => (
                      <div key={review.id} className="glass p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{review.name}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                    size={16}
                                    fill={i < review.rating ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>
                        <p className="text-gray-200">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-4">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Truck className="text-pink-300" size={20} />
                        <span className="text-gray-200">Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-200">Standard shipping: 3-5 business days</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-200">Express shipping: 1-2 business days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-4">Return Policy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RotateCcw className="text-pink-300" size={20} />
                        <span className="text-gray-200">30-day return policy</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-200">Free returns on unused items</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-200">Contact customer service for returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 