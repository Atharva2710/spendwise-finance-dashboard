import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import SortDropdown from '../../components/SortDropdown/SortDropdown';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import useTransactions from '../../hooks/useTransactions';
import { FiPlus, FiGrid, FiList } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const Transactions = () => {
  const navigate = useNavigate();
  // Default to table mode on large screens, card mode on small
  const [viewMode, setViewMode] = useState(window.innerWidth > 768 ? 'table' : 'card'); 
  
  const { 
    transactions, 
    deleteTransaction,
    setSearchTerm,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    dateRange, setDateRange,
    sortBy, setSortBy
  } = useTransactions();

  const handleEdit = (transaction) => {
    navigate(`/transactions/${transaction.id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
    }
  };

  return (
    <PageWrapper className="pb-8">
      <PageHeader 
        title="Transactions" 
        subtitle="Manage and track all your income and expenses securely."
        action={
          <button onClick={() => navigate('/transactions/new')} className="btn btn-primary">
            <FiPlus size={18} /> Add New
          </button>
        }
      />

      <div className="card" style={{ marginBottom: '2.5rem', padding: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <SearchBar onSearch={setSearchTerm} />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <div style={{ width: '1px', height: '32px', background: 'var(--border-color)' }}></div>
            <div style={{ display: 'flex', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.25rem' }}>
              <button 
                onClick={() => setViewMode('table')}
                style={{ padding: '0.5rem', background: viewMode === 'table' ? 'var(--surface-color)' : 'transparent', borderRadius: '0.25rem', color: viewMode === 'table' ? 'var(--primary-color)' : 'var(--text-muted)', boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s ease' }}
                aria-label="Table View"
                title="Table View"
              >
                <FiList size={18} />
              </button>
              <button 
                onClick={() => setViewMode('card')}
                style={{ padding: '0.5rem', background: viewMode === 'card' ? 'var(--surface-color)' : 'transparent', borderRadius: '0.25rem', color: viewMode === 'card' ? 'var(--primary-color)' : 'var(--text-muted)', boxShadow: viewMode === 'card' ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s ease' }}
                aria-label="Card View"
                title="Card View"
              >
                <FiGrid size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <Filters 
          filterType={filterType} setFilterType={setFilterType}
          filterCategory={filterCategory} setFilterCategory={setFilterCategory}
          dateRange={dateRange} setDateRange={setDateRange}
        />
      </div>

      <div>
        {viewMode === 'table' ? (
          <TransactionTable transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {transactions.length > 0 ? (
              transactions.map(t => (
                <TransactionCard key={t.id} transaction={t} onEdit={handleEdit} onDelete={handleDelete} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1' }}>
                 <TransactionTable transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Transactions;
