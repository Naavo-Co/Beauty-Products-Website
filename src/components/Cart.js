import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Cart = ({ cart, onClose, onRemove, onUpdateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    // Add checkout logic here
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    },
    exit: {
      x: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          variants={cartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute right-0 top-0 h-full w-full max-w-md glass-dark"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="text-pink-300" size={24} />
              <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
              {itemCount > 0 && (
                <span className="bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-white hover:text-pink-300 transition-colors duration-300"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400">Add some beautiful products to get started!</p>
              </div>
            ) : (
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.name}</h3>
                        <p className="text-gray-300 text-sm">${item.price}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 mt-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
                          >
                            <Minus size={16} />
                          </motion.button>
                          
                          <span className="text-white font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>

                    {/* Item Total */}
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Item Total:</span>
                        <span className="text-white font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border-t border-white/20"
            >
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white font-semibold text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Shipping:</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <span className="text-white font-semibold text-lg">Total:</span>
                <span className="text-white font-bold text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full btn-primary"
              >
                Proceed to Checkout
              </motion.button>

              {/* Continue Shopping */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full btn-secondary mt-3"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart; 