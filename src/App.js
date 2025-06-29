import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Navbar 
          cartItemCount={cartItemCount} 
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <AnimatePresence>
          {isCartOpen && (
            <Cart
              cart={cart}
              onClose={() => setIsCartOpen(false)}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <Products addToCart={addToCart} />
            </motion.div>
          } />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App; 