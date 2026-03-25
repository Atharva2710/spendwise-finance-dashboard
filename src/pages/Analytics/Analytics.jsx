import React, { useMemo } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import useTransactions from '../../hooks/useTransactions';
import useBudget from '../../hooks/useBudget';
import CategoryPieChart from '../../components/Charts/CategoryPieChart';
import MonthlyTrendChart from '../../components/Charts/MonthlyTrendChart';
import IncomeExpenseBarChart from '../../components/Charts/IncomeExpenseBarChart';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const Analytics = () => {
  const { allTransactions } = useTransactions();
  const { totalIncome, totalExpenses, topCategory, recurringCount } = useBudget();

  // Prepare Pie Chart Data (Expenses by Category)
  const categoryData = useMemo(() => {
    const expenses = allTransactions.filter(t => t.type === 'expense');
    const totals = {};
    expenses.forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
    return Object.entries(totals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [allTransactions]);

  // Prepare Bar Chart Data (Income vs Expense)
  const incomeVsExpenseData = useMemo(() => {
    return [
      { name: 'Total View', income: totalIncome, expense: totalExpenses }
    ];
  }, [totalIncome, totalExpenses]);

  // Prepare Area Chart Data (Monthly Trend)
  const trendData = useMemo(() => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const daysInterval = eachDayOfInterval({ start, end });
    
    return daysInterval.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      let dailyIncome = 0;
      let dailyExpense = 0;
      
      allTransactions.forEach(t => {
        if (t.date.startsWith(dayStr)) {
          if (t.type === 'income') dailyIncome += t.amount;
          else dailyExpense += t.amount;
        }
      });
      
      return {
        date: format(day, 'MMM dd'),
        income: dailyIncome,
        expense: dailyExpense
      };
    });
  }, [allTransactions]);

  return (
    <PageWrapper className="pb-12">
      <PageHeader 
        title="Analytics & Insights" 
        subtitle="Deep dive into your financial habits and monthly trends."
      />

      {/* Mini Insight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Top Expense Category</span>
          <span style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 700 }}>{topCategory}</span>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Active Recurring Plans</span>
          <span style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 700 }}>{recurringCount} items</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-main)' }}>30-Day Cash Flow Trend</h3>
          <MonthlyTrendChart data={trendData} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Expenses by Category</h3>
          <CategoryPieChart data={categoryData} />
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Overall Summary</h3>
          <IncomeExpenseBarChart data={incomeVsExpenseData} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Analytics;
