import { useContext, useMemo, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { isWithinInterval, parseISO, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

const useTransactions = () => {
  const context = useContext(FinanceContext);
  
  if (!context) {
    throw new Error('useTransactions must be used within a FinanceProvider');
  }

  const { transactions, addTransaction, updateTransaction, deleteTransaction } = context;

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState('all'); // 'all', 'thisMonth', 'thisYear'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'amountHigh', 'amountLow', 'categoryAZ'

  // Memoized filtered and sorted transactions list
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // 1. Search by title or notes
    if (searchTerm) {
      const lower= searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          (t.notes && t.notes.toLowerCase().includes(lower))
      );
    }

    // 2. Filter by Transaction Type (income / expense)
    if (filterType !== 'all') {
      result = result.filter((t) => t.type === filterType);
    }

    // 3. Filter by Category
    if (filterCategory !== 'all') {
      result = result.filter((t) => t.category === filterCategory);
    }

    // 4. Filter by Date Range
    const today = new Date();
    if (dateRange === 'thisMonth') {
      const start = startOfMonth(today);
      const end = endOfMonth(today);
      result = result.filter((t) => {
        try {
          return isWithinInterval(parseISO(t.date), { start, end });
        } catch (e) {
          return false;
        }
      });
    } else if (dateRange === 'thisYear') {
      const start = startOfYear(today);
      const end = endOfYear(today);
      result = result.filter((t) => {
        try {
          return isWithinInterval(parseISO(t.date), { start, end });
        } catch (e) {
          return false;
        }
      });
    }

    // 5. Sort the results based on selected criteria
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amountHigh':
          return b.amount - a.amount;
        case 'amountLow':
          return a.amount - b.amount;
        case 'categoryAZ':
          return a.category.localeCompare(b.category);
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [transactions, searchTerm, filterType, filterCategory, dateRange, sortBy]);

  return {
    // Data
    transactions: filteredAndSortedTransactions,
    allTransactions: transactions,
    
    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    
    // States and setters for UI to bind to
    searchTerm, setSearchTerm,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    dateRange, setDateRange,
    sortBy, setSortBy,
  };
};

export default useTransactions;
