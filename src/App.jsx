import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';

import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { useSettings } from './context/SettingsContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const DashboardLayout = ({ children }) => {
  const { isSidebarOpen, setSidebarOpen } = useSettings();

  return (
    <div className="app-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content-wrapper">
        {children}
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>

          <Route path="/login" element={<><Login /><Footer /></>} />
          <Route path="/signup" element={<><Signup /><Footer /></>} />

          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout><Dashboard /></DashboardLayout></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><DashboardLayout><Transactions /></DashboardLayout></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><DashboardLayout><Analytics /></DashboardLayout></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><DashboardLayout><Settings /></DashboardLayout></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
