import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiList, FiPlusSquare, FiTarget, FiBarChart2, FiPieChart } from 'react-icons/fi';
import useBudget from '../../hooks/useBudget';
import { formatCurrency } from '../../utils/currencyFormatter';

const Sidebar = () => {
  const { totalSpent, monthlyBudget } = useBudget();
  const remaining = monthlyBudget - totalSpent;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <FiList size={20} /> },
    { name: 'Add Transaction', path: '/transactions/new', icon: <FiPlusSquare size={20} /> },
    { name: 'Budget', path: '/budget', icon: <FiTarget size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <FiBarChart2 size={20} /> },
  ];

  return (
    <aside style={{
      width: '280px',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-sidebar)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0
    }} className="desktop-sidebar">
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', color: 'white' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', background: 'var(--primary-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)' }}>
          <FiPieChart size={22} color="white" />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '-0.025em', color: 'white' }}>SpendWise</h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/transactions'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              color: isActive ? 'white' : 'var(--text-sidebar)',
              background: isActive ? 'var(--primary-color)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              boxShadow: isActive ? '0 4px 12px rgba(79, 70, 229, 0.4)' : 'none',
              transition: 'all 0.2s ease',
            })}
            className="sidebar-link"
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ padding: '1.25rem', background: 'linear-gradient(145deg, var(--bg-sidebar-hover) 0%, rgba(15,23,42,0.5) 100%)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sidebar)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '0.75rem' }}>Budget Left</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{formatCurrency(remaining > 0 ? remaining : 0)}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sidebar)' }}>this month</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min((totalSpent / monthlyBudget) * 100 || 0, 100)}%`, height: '100%', background: remaining < 0 ? 'var(--danger-color)' : 'var(--primary-color)', boxShadow: '0 0 10px var(--primary-color)' }} />
          </div>
        </div>
      </div>

      <style>{`
        .sidebar-link:hover:not(.active) {
          background: var(--bg-sidebar-hover) !important;
          color: white !important;
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
