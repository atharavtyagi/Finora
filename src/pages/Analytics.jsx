import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import Charts from '../components/Charts';
import { User, PieChart, TrendingUp, TrendingDown, Target, Sun, Moon, Bell, Menu } from 'lucide-react';
import '../styles/dashboard.css';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useNotifications } from '../context/NotificationContext';
import ProfileModal from '../components/ProfileModal';
import NotificationDropdown from '../components/NotificationDropdown';
import SummaryCard from '../components/SummaryCard';

const AnalyticsPage = () => {
    const { transactions, loading } = useTransactions();
    const { currentUser } = useAuth();
    const { darkMode, toggleDarkMode, toggleSidebar } = useSettings();
    const { unreadCount } = useNotifications();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    // Stats
    const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const savings = income - expense;
    const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : 0;

    if (loading) return <div className="loading-screen">Loading...</div>;

    return (
        <main className="main-content">
            <header className="dashboard-header">
                <div className="header-left">
                    <button className="icon-btn glass hidden-desktop mr-4" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                    <div className="greeting">
                        <h1>Financial <span className="text-gradient">Analytics</span></h1>
                        <p className="text-secondary">Deep dive into your spending habits.</p>
                    </div>
                </div>

                <div className="header-right">
                    <button className="icon-btn glass" onClick={toggleDarkMode} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="relative">
                        <button
                            className="icon-btn glass relative"
                            title="Notifications"
                            onClick={() => setIsNotifOpen(!isNotifOpen)}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && <span className="notification-dot"></span>}
                        </button>
                        <NotificationDropdown
                            isOpen={isNotifOpen}
                            onClose={() => setIsNotifOpen(false)}
                        />
                    </div>
                    <div className="user-nav glass" onClick={() => setIsProfileModalOpen(true)}>
                        <div className="avatar">
                            {currentUser?.displayName?.charAt(0).toUpperCase() || <User size={18} />}
                        </div>
                        <span className="font-bold hidden-mobile">{currentUser?.displayName?.split(' ')[0] || "Profile"}</span>
                    </div>
                </div>
            </header>

            <div className="dashboard-grid">
                <div className="summary-section">
                    <div className="card glass luxury-card">
                        <div className="luxury-icon-wrapper" style={{ background: 'var(--primary-gradient)' }}>
                            <Target size={24} />
                        </div>
                        <div className="luxury-content">
                            <p className="luxury-label">Savings Rate</p>
                            <h2 className="luxury-amount">{savingsRate}%</h2>
                        </div>
                    </div>
                    <SummaryCard title="Net Savings" amount={savings} type="balance" />
                    <div className="card glass luxury-card">
                        <div className="luxury-icon-wrapper" style={{ background: 'var(--secondary-gradient)' }}>
                            <PieChart size={24} />
                        </div>
                        <div className="luxury-content">
                            <p className="luxury-label">Total Volume</p>
                            <h2 className="luxury-amount">₹{(income + expense).toLocaleString('en-IN')}</h2>
                        </div>
                    </div>
                </div>

                <div className="content-row" style={{ gridTemplateColumns: '1fr' }}>
                    <section className="chart-container card glass">
                        <div className="section-header">
                            <h3>Comprehensive Spending Analysis</h3>
                        </div>
                        <div style={{ height: '400px' }}>
                            <Charts transactions={transactions} />
                        </div>
                    </section>
                </div>
            </div>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </main>
    );
};

export default AnalyticsPage;
