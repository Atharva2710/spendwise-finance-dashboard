import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/currencyFormatter';

const Card = ({ title, amount, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="card"
    style={{
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      borderTop: `4px solid ${color}`
    }}
  >
    <div style={{
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '50%',
      background: `${color}15`,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>
        {title}
      </p>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
        {typeof amount === 'number' ? formatCurrency(amount) : amount}
      </h3>
    </div>
  </motion.div>
);

const DashboardCards = ({ totalIncome = 0, totalExpenses = 0, netBalance = 0, topCategory = 'None' }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    }}>
      <Card 
        title="Total Income" 
        amount={totalIncome} 
        icon={<FiTrendingUp />} 
        color="#10b981" 
        delay={0.1} 
      />
      <Card 
        title="Total Expenses" 
        amount={totalExpenses} 
        icon={<FiTrendingDown />} 
        color="#ef4444" 
        delay={0.2} 
      />
      <Card 
        title="Net Balance" 
        amount={netBalance} 
        icon={<FiDollarSign />} 
        color="#4f46e5" 
        delay={0.3} 
      />
      <Card 
        title="Top Category" 
        amount={topCategory} 
        icon={<FiStar />} 
        color="#f59e0b" 
        delay={0.4} 
      />
    </div>
  );
};

export default DashboardCards;
