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
      width: '280px',
      background: 'var(--bg-sidebar)',
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
