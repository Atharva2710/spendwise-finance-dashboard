import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ icon, title, message, action }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-lg)',
        border: `1px dashed var(--border-color)`,
        textAlign: 'center'
      }}
    >
      {icon && <div style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{icon}</div>}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px' }}>{message}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
