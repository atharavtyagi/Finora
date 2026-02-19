import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import SummaryCard from '../components/SummaryCard';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import Charts from '../components/Charts';
import { Plus, User, Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import '../styles/dashboard.css';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useNotifications } from '../context/NotificationContext';
import ProfileModal from '../components/ProfileModal';
import NotificationDropdown from '../components/NotificationDropdown';

const Dashboard = () => {
    const { transactions, addTransaction, deleteTransaction, updateTransaction, loading } = useTransactions();
    const { currentUser } = useAuth();
    const { notificationsEnabled, toggleSidebar, darkMode, toggleDarkMode } = useSettings();
    const { unreadCount } = useNotifications();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [error, setError] = useState('');

    // Calculate totals
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => {
            const amount = parseFloat(curr?.amount || 0);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => {
            const amount = parseFloat(curr?.amount || 0);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);

    const balance = income - expense;

    const handleAddTransaction = async (transaction) => {
        try {
            setError('');
            if (editingTransaction) {
                await updateTransaction(editingTransaction.id, transaction);
            } else {
                await addTransaction(transaction);
            }
            setEditingTransaction(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to save transaction:", err);
            setError("Failed to save transaction.");
            setTimeout(() => setError(''), 5000);
        }
    };

    const openEditModal = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    if (loading) return <div className="loading-screen">Loading...</div>;

    return (
        <main className="main-content">
            {/* Executive Header */}
            <header className="dashboard-header slide-up">
                <div className="header-left">
                    <button className="icon-btn glass hidden-desktop mr-4" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                    <div className="greeting">
                        <h1>Welcome back, <span className="text-gradient">{currentUser?.displayName?.split(' ')[0] || 'User'}</span></h1>
                        <p className="text-secondary">Your finances are looking healthy today.</p>
                    </div>
                </div>

                <div className="header-right">
                    <div className="search-bar">
                        <Search size={18} className="text-secondary" />
                        <input type="text" placeholder="Search transactions, reports..." />
                    </div>
                    {notificationsEnabled && (
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
                    )}
                    <button className="icon-btn glass" onClick={toggleDarkMode} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="user-nav glass" onClick={() => setIsProfileModalOpen(true)}>
                        <div className="avatar">
                            {currentUser?.displayName?.charAt(0).toUpperCase() || <User size={18} />}
                        </div>
                        <span className="font-bold hidden-mobile">{currentUser?.displayName?.split(' ')[0] || "Profile"}</span>
                    </div>
                </div>
            </header>

            {error && (
                <div className="alert alert-danger slide-up">
                    {error}
                </div>
            )}

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Summary Row */}
                <div className="summary-section">
                    <SummaryCard title="Live Balance" amount={balance} type="balance" />
                    <SummaryCard title="Total Income" amount={income} type="income" />
                    <SummaryCard title="Total Spending" amount={expense} type="expense" />
                </div>

                {/* Chart & List Row */}
                <div className="content-row">
                    <section className="chart-container card glass slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="section-header">
                            <h3>Spending Analysis</h3>
                        </div>
                        <Charts transactions={transactions} />
                    </section>

                    <section className="transactions-container card glass slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="section-header">
                            <h3>Recent Activity</h3>
                            <button className="btn btn-primary btn-sm" onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }}>
                                <Plus size={16} /> Add New
                            </button>
                        </div>
                        <TransactionList
                            transactions={transactions}
                            onDelete={deleteTransaction}
                            onEdit={openEditModal}
                        />
                    </section>
                </div>
            </div>

            <TransactionForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTransaction}
                editingTransaction={editingTransaction}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </main>
    );
};

export default Dashboard;
