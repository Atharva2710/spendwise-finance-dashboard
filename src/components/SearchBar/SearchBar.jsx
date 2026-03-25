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
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }}>
        <FiSearch size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-field"
        style={{ paddingLeft: '3.25rem', paddingRight: '2.5rem' }}
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
