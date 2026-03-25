import React from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`page-wrapper ${className}`}
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
