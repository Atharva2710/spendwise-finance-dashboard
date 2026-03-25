import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="page-header"
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      <div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em', marginBottom: '0.5rem', lineHeight: 1 }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 500 }}>{subtitle}</p>}
      </div>
      {action && <div style={{ display: 'flex', gap: '1rem' }}>{action}</div>}
    </motion.div>
  );
};

export default PageHeader;
