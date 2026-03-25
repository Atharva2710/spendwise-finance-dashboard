import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiList, FiPlusSquare, FiTarget, FiBarChart2, FiPieChart } from 'react-icons/fi';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <FiList size={20} /> },
    { name: 'Add Transaction', path: '/transactions/new', icon: <FiPlusSquare size={20} /> },
    { name: 'Budget', path: '/budget', icon: <FiTarget size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <FiBarChart2 size={20} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--surface-color)',
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0
    }} className="desktop-sidebar">
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', color: 'var(--primary-color)' }}>
        <FiPieChart size={28} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '-0.025em' }}>SpendWise</h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/transactions'} // Keep transactions root active only on overview list
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius-lg)',
              color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)',
              background: isActive ? 'var(--primary-light)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s ease',
            })}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>


      <style>{`
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
