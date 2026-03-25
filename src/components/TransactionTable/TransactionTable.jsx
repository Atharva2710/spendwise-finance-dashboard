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
          <thead style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Title & Category</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Amount</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Notes</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={t.id} style={{ 
                borderBottom: index === transactions.length - 1 ? 'none' : '1px solid var(--border-color)', 
                transition: 'background 0.2s' 
              }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--bg-color)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>{t.category}</span>
                    {t.recurring && <span style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center' }} title="Recurring"><FiRefreshCw size={12}/></span>}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '1.125rem', color: t.type === 'income' ? 'var(--success-color)' : 'var(--text-main)' }}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {formatDate(t.date)}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.notes || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>None</span>}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => onEdit(t)} style={{ padding: '0.5rem', color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', cursor: 'pointer' }}>
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(t.id)} style={{ padding: '0.5rem', color: 'var(--danger-color)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', cursor: 'pointer' }}>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
