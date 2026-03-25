import React from 'react';
import { CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';

const SelectFilter = ({ label, value, onChange, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field"
      style={{ minWidth: '160px', padding: '0.625rem 1rem' }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const Filters = ({ filterType, setFilterType, filterCategory, setFilterCategory, dateRange, setDateRange }) => {
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: TRANSACTION_TYPES.INCOME, label: 'Income' },
    { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'thisYear', label: 'This Year' }
  ];

  let validCategories = [];
  if (filterType === TRANSACTION_TYPES.INCOME) {
    validCategories = CATEGORIES.INCOME;
  } else if (filterType === TRANSACTION_TYPES.EXPENSE) {
    validCategories = CATEGORIES.EXPENSE;
  } else {
    validCategories = [...CATEGORIES.INCOME, ...CATEGORIES.EXPENSE];
  }

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...validCategories.map(cat => ({ value: cat, label: cat }))
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end', padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--surface-hover)' }}>
      <SelectFilter label="Transaction Type" value={filterType} onChange={setFilterType} options={typeOptions} />
      <SelectFilter label="Category" value={filterCategory} onChange={setFilterCategory} options={categoryOptions} />
      <SelectFilter label="Date Range" value={dateRange} onChange={setDateRange} options={dateOptions} />
      
      {(filterType !== 'all' || filterCategory !== 'all' || dateRange !== 'all') && (
        <button 
          onClick={() => {
            setFilterType('all');
            setFilterCategory('all');
            setDateRange('all');
          }}
          style={{ padding: '0.625rem 1rem', color: 'var(--primary-dark)', fontSize: '0.875rem', fontWeight: 600, background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default Filters;
