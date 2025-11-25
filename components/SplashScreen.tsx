import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary-600 text-white overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-10"
        initial={{ scale: 1.2, rotate: 0 }}
        animate={{ scale: 1, rotate: 5 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.7C91.4,-34.3,98.1,-19.6,95.8,-5.7C93.5,8.1,82.2,21.1,70.9,31.7C59.6,42.3,48.3,50.5,36.4,56.8C24.5,63.1,12.1,67.5,-1.6,70.3C-15.3,73.1,-32.3,74.2,-47.4,68.6C-62.5,63,-75.7,50.6,-83.1,35.8C-90.5,21,-92.1,3.8,-87.6,-11.4C-83.1,-26.6,-72.5,-39.8,-60.4,-48.2C-48.3,-56.6,-34.7,-60.2,-21.4,-62.2C-8.1,-64.2,4.9,-64.6,18.4,-64.5" transform="translate(100 100)" />
        </svg>
      </motion.div>

      <motion.h1 
        className="text-7xl font-bold tracking-tighter mb-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        isus
      </motion.h1>

      <motion.p
        className="text-xl font-light tracking-widest text-primary-100 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        the self study helper
      </motion.p>

      <motion.div
        className="mt-12 w-12 h-12 border-4 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
    </div>
  );
};

export default SplashScreen;
