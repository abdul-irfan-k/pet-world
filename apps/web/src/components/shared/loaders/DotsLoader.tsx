'use client';

import { motion } from 'framer-motion';

const colors = ['bg-purple-600', 'bg-pink-400', 'bg-yellow-400', 'bg-cyan-400'];

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const boxVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1, 1, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const DotsLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <motion.div className="flex gap-3" variants={containerVariants} initial="initial" animate="animate">
        {colors.map((color, idx) => (
          <motion.div key={idx} className={`h-6 w-6 rounded-md ${color}`} variants={boxVariants} />
        ))}
      </motion.div>
    </div>
  );
};

export { DotsLoader };
