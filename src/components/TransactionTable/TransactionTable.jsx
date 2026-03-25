import React from 'react';
import { FiEdit2, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/helpers';
import EmptyState from '../EmptyState/EmptyState';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return <EmptyState title="No transactions found" message="Try adjusting your filters or add a new transaction." />;
  }

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title & Category</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notes</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={t.id} className="table-row" style={{ 
                borderBottom: index === transactions.length - 1 ? 'none' : '1px solid var(--border-color)', 
                transition: 'all 0.2s ease'
              }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.375rem', fontSize: '1rem' }}>{t.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge" style={{ background: 'var(--border-light)', color: 'var(--text-muted)' }}>{t.category}</span>
                    {t.recurring && <span style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', background: 'var(--primary-light)', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }} title="Recurring"><FiRefreshCw size={12} style={{marginRight: '0.25rem'}}/> Recurring</span>}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, fontSize: '1.125rem', color: t.type === 'income' ? 'var(--success-color)' : 'var(--text-main)' }}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
                  {formatDate(t.date)}
                </td>
                <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.notes || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>-</span>}
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.25rem' }}>
                    <button onClick={() => onEdit(t)} className="btn-icon-only" aria-label="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(t.id)} className="btn-icon-only" style={{ color: 'var(--danger-color)' }} aria-label="Delete">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .table-row:hover { background-color: var(--surface-hover); cursor: default; }
      `}</style>
    </div>
  );
};

export default TransactionTable;
