import React from 'react';

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'amountHigh', label: 'Amount: High to Low' },
    { value: 'amountLow', label: 'Amount: Low to High' },
    { value: 'categoryAZ', label: 'Category: A-Z' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Sort by</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        style={{ padding: '0.625rem 1rem', minWidth: '200px', cursor: 'pointer', boxShadow: 'none' }}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
