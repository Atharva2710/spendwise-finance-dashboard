import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import useDebounce from '../../hooks/useDebounce';

const SearchBar = ({ onSearch, placeholder = "Search title or notes..." }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
        <FiSearch size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem 1rem 0.75rem 2.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          background: 'var(--surface-color)',
          color: 'var(--text-main)',
          fontSize: '0.95rem',
          outline: 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', padding: '0.5rem' }}
          title="Clear search"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
