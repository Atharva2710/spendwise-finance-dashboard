import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import useBudget from '../../hooks/useBudget';
import { toast } from 'react-toastify';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const Budget = () => {
  const { monthlyBudget, totalExpenses, budgetPercentageUsed, isOverBudget, setBudget } = useBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(monthlyBudget || 0);

  const handleSave = () => {
    if (newBudget < 0) {
      toast.error("Budget cannot be negative");
      return;
    }
    setBudget({ monthlyBudget: Number(newBudget) });
    setIsEditing(false);
    toast.success("Monthly budget updated successfully!");
  };

  return (
    <PageWrapper className="pb-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <PageHeader 
        title="Budget Setup" 
        subtitle="Manage your monthly spending constraints"
        action={
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none' }}>
            &larr; Back to Dashboard
          </Link>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <BudgetCard 
          totalSpent={totalExpenses}
          monthlyBudget={monthlyBudget}
          percentageUsed={budgetPercentageUsed}
          isOverBudget={isOverBudget}
        />

        <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Budget Configuration
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Set Monthly Limit (₹)</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input 
                type="number" 
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                disabled={!isEditing}
                className="input-field"
                style={{ opacity: isEditing ? 1 : 0.7, background: isEditing ? 'var(--bg-color)' : 'var(--surface-color)' }}
              />
              {isEditing ? (
                <button onClick={handleSave} className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                  Edit
                </button>
              )}
            </div>
            {isEditing && (
              <button 
                onClick={() => { setIsEditing(false); setNewBudget(monthlyBudget); }} 
                style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0.25rem', fontWeight: 500 }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Budget;
