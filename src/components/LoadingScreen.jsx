import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const LoadingScreen = () => {
  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          className="inline-block mb-8"
        >
          <Trophy className="h-20 w-20 text-white drop-shadow-lg" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold font-[Oswald] text-white mb-4"
        >
          SoccerLive
        </motion.h1>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear"
            }}
            className="h-full bg-white rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;