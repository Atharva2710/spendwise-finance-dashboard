import { createContext, useState, useEffect } from 'react';
import { sampleTransactions, sampleBudget } from '../data/sampleData';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('spendwise_transactions_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse transactions", e);
      }
    }
    return sampleTransactions;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('spendwise_budget_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse budget", e);
      }
    }
    return sampleBudget;
  });

  // Force overwrite of data when my code updates the sample data structure
  useEffect(() => {
    if (localStorage.getItem('spendwise_version') !== '3') {
      setTransactions(sampleTransactions);
      setBudget(sampleBudget);
      localStorage.setItem('spendwise_version', '3');
    }
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('spendwise_transactions_v3', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('spendwise_budget_v3', JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updatedData } : t)
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      budget,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setBudget: updateBudget
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
