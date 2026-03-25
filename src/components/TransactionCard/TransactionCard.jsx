import React from 'react';
import { FiEdit2, FiTrash2, FiRefreshCw, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/helpers';
import { motion } from 'framer-motion';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.5rem', height: '2.5rem', borderRadius: '50%',
            background: isIncome ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: isIncome ? 'var(--success-color)' : 'var(--danger-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {isIncome ? <FiArrowUpRight size={20} /> : <FiArrowDownRight size={20} />}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{transaction.title}</h4>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', background: 'var(--bg-color)', padding: '0.125rem 0.5rem', borderRadius: '1rem' }}>
              {transaction.category}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontWeight: 700, color: isIncome ? 'var(--success-color)' : 'var(--text-main)', fontSize: '1.125rem' }}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{formatDate(transaction.date)}</p>
        </div>
      </div>

      {(transaction.notes || transaction.recurring) && (
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontStyle: 'italic', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {transaction.notes || 'No notes'}
          </p>
          {transaction.recurring && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)', fontWeight: 500, fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
              <FiRefreshCw size={12} /> Recurring
            </span>
          )}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button onClick={() => onEdit(transaction)} style={{ padding: '0.5rem', color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} aria-label="Edit">
          <FiEdit2 size={16} />
        </button>
        <button onClick={() => onDelete(transaction.id)} style={{ padding: '0.5rem', color: 'var(--danger-color)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} aria-label="Delete">
          <FiTrash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
