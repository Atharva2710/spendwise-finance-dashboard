import React from 'react';
import { formatCurrency } from '../../utils/currencyFormatter';
import { FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BudgetCard = ({ totalSpent = 0, monthlyBudget = 0, percentageUsed = 0, isOverBudget = false }) => {
  const remaining = monthlyBudget - totalSpent;
  const isWarning = percentageUsed >= 80 && !isOverBudget;
  
  let progressColor = 'var(--success-color)';
  if (isOverBudget) progressColor = 'var(--danger-color)';
  else if (isWarning) progressColor = '#f59e0b'; // amber

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
      style={{
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '200px', height: '200px', background: progressColor, opacity: 0.08, filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', zIndex: 1, position: 'relative' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Monthly Budget Setup</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your expense limit for this month</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', zIndex: 1, position: 'relative' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 500 }}>Total Spent</p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>{formatCurrency(totalSpent)}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 500 }}>Total Budget</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>{formatCurrency(monthlyBudget)}</p>
        </div>
      </div>

      <div style={{ width: '100%', background: 'var(--bg-color)', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1.25rem', zIndex: 1, position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ height: '100%', background: progressColor, borderRadius: '6px', boxShadow: `0 0 10px ${progressColor}60` }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', zIndex: 1, position: 'relative' }}>
        <span style={{ color: isOverBudget ? 'var(--danger-color)' : 'var(--text-muted)', fontWeight: isOverBudget ? 600 : 500 }}>
          {isOverBudget 
            ? `Over spend by ${formatCurrency(Math.abs(remaining))}` 
            : `${formatCurrency(remaining)} left to spend`}
        </span>
        <span style={{ fontWeight: 700, color: progressColor }}>
          {percentageUsed}%
        </span>
      </div>

      {isOverBudget && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}
        >
          <FiAlertCircle size={18} />
          <span style={{ fontWeight: 500 }}>Warning: You have exceeded your monthly budget allowance!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BudgetCard;
