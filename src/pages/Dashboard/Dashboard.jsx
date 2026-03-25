import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import DashboardCards from '../../components/DashboardCards/DashboardCards';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import useBudget from '../../hooks/useBudget';
import useTransactions from '../../hooks/useTransactions';
import IncomeExpenseBarChart from '../../components/Charts/IncomeExpenseBarChart';
import { FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const Dashboard = () => {
  const budgetStats = useBudget();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  // Get 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5);

  // Prepare simple chart data for overview
  const chartData = useMemo(() => {
    return [
      { name: 'Income', income: budgetStats.totalIncome, expense: 0 },
      { name: 'Expense', income: 0, expense: budgetStats.totalExpenses }
    ];
  }, [budgetStats]);

  const handleEdit = (t) => navigate(`/transactions/${t.id}/edit`);

  return (
    <PageWrapper>
      <PageHeader 
        title="Dashboard Overview" 
        subtitle={`Welcome back! Here's your financial summary for ${format(new Date(), 'MMMM yyyy')}.`}
        action={
          <Link to="/transactions/new" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-color)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, boxShadow: 'var(--shadow-md)' }}>
            <FiPlus /> Add Transaction
          </Link>
        }
      />

      <DashboardCards {...budgetStats} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Monthly Budget</h3>
          <BudgetCard 
            totalSpent={budgetStats.totalExpenses}
            monthlyBudget={budgetStats.monthlyBudget}
            percentageUsed={budgetStats.budgetPercentageUsed}
            isOverBudget={budgetStats.isOverBudget}
          />
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Income vs Expenses</h3>
          <IncomeExpenseBarChart data={chartData} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>Recent Transactions</h3>
          <Link to="/transactions" style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.95rem' }}>View All &rarr;</Link>
        </div>
        
        {/* Desktop Table View */}
        <div className="desktop-only" style={{ display: 'none' }}>
           <TransactionTable transactions={recentTransactions} onEdit={handleEdit} onDelete={() => navigate('/transactions')} />
        </div>
        <style>{`@media (min-width: 768px) { .desktop-only { display: block !important; } .mobile-only { display: none !important; } }`}</style>
        
        {/* Mobile Card View */}
        <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentTransactions.map(t => (
            <TransactionCard key={t.id} transaction={t} onEdit={handleEdit} onDelete={() => navigate('/transactions')} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
