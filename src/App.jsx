import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Structure
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

// App Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import EditTransaction from './pages/EditTransaction/EditTransaction';
import Budget from './pages/Budget/Budget';
import Analytics from './pages/Analytics/Analytics';

const Layout = ({ children }) => (
  <div className="app-container" style={{ height: '100vh', overflow: 'hidden' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />
      <main className="main-content" style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <FinanceProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/new" element={<AddTransaction />} />
            <Route path="/transactions/:id/edit" element={<EditTransaction />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analytics" element={<Analytics />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
        theme="colored" 
      />
    </FinanceProvider>
  );
}

export default App;
