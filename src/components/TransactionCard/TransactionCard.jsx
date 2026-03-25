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
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        borderLeft: isIncome ? '4px solid var(--success-color)' : '4px solid var(--danger-color)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '3rem', height: '3rem', borderRadius: 'var(--radius-md)',
            background: isIncome ? 'var(--success-light)' : 'var(--danger-light)',
            color: isIncome ? 'var(--success-color)' : 'var(--danger-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {isIncome ? <FiArrowUpRight size={22} /> : <FiArrowDownRight size={22} />}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.25rem', lineHeight: 1.2 }}>{transaction.title}</h4>
            <span className="badge" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              {transaction.category}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{formatDate(transaction.date)}</p>
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

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem' }}>
        <button onClick={() => onEdit(transaction)} className="btn-icon-only" aria-label="Edit">
          <FiEdit2 size={16} />
        </button>
        <button onClick={() => onDelete(transaction.id)} className="btn-icon-only" style={{ color: 'var(--danger-color)' }} aria-label="Delete">
          <FiTrash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
