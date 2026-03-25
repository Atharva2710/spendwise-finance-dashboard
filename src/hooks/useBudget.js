import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

const useBudget = () => {
  const context = useContext(FinanceContext);
  
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }

  const { transactions, budget, setBudget } = context;

  const budgetStats = useMemo(() => {
    // We mainly care about this month's stats for budget tracking
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    let thisMonthTransactions = transactions;
    
    try {
      thisMonthTransactions = transactions.filter(t => 
        isWithinInterval(parseISO(t.date), { start, end })
      );
    } catch(e) {
      console.error("Date parsing error in budget calculation", e);
    }

    let totalIncome = 0;
    let totalExpenses = 0;
    let recurringCount = 0;
    const categoryTotals = {};

    thisMonthTransactions.forEach(t => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else {
        totalExpenses += t.amount;
        
        // Count recurring expenses
        if (t.recurring) recurringCount += 1;

        // Group by category for top spending calculation
        if (categoryTotals[t.category]) {
          categoryTotals[t.category] += t.amount;
        } else {
          categoryTotals[t.category] = t.amount;
        }
      }
    });

    const netBalance = totalIncome - totalExpenses;
    const monthlyBudget = budget?.monthlyBudget || 0;
    const remainingBudget = monthlyBudget - totalExpenses;
    
    // Calculate percentage used, capped at 100% for progress bars
    const budgetPercentageUsed = monthlyBudget > 0 
      ? Math.min(Math.round((totalExpenses / monthlyBudget) * 100), 100) 
      : 0;
    
    const isOverBudget = totalExpenses > monthlyBudget;

    // Find top spending category
    let topCategory = 'None';
    let maxCategoryAmount = 0;
    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (amount > maxCategoryAmount) {
        maxCategoryAmount = amount;
        topCategory = category;
      }
    }

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      remainingBudget,
      budgetPercentageUsed,
      isOverBudget,
      topCategory,
      topCategoryAmount: maxCategoryAmount,
      recurringCount,
      monthlyBudget
    };
  }, [transactions, budget]);

  return {
    ...budgetStats,
    setBudget
  };
};

export default useBudget;
