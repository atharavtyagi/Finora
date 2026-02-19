import React, { useState, useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useNotifications } from '../context/NotificationContext';
import ProfileModal from '../components/ProfileModal';
import NotificationDropdown from '../components/NotificationDropdown';
import {
    Plus,
    User,
    Bell,
    Search,
    Filter,
    TrendingUp,
    TrendingDown,
    Activity,
    ChevronRight,
    Calendar,
    Tag,
    Sun,
    Moon,
    Menu
} from 'lucide-react';
import '../styles/dashboard.css';
import '../styles/transactions.css';

const TransactionsPage = () => {
    const { transactions, addTransaction, deleteTransaction, updateTransaction, loading } = useTransactions();
    const { currentUser } = useAuth();
    const { toggleSidebar, darkMode, toggleDarkMode } = useSettings();
    const { unreadCount } = useNotifications();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [error, setError] = useState('');

    // Filtering State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['General', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Salary', 'Health'];

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const description = t?.description || '';
            const category = t?.category || '';
            const matchesSearch = description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || t.type === filterType;
            const matchesCategory = filterCategory === 'all' || category === filterCategory;
            return matchesSearch && matchesType && matchesCategory;
        });
    }, [transactions, searchTerm, filterType, filterCategory]);

    const stats = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => {
                const amount = parseFloat(curr?.amount || 0);
                return acc + (isNaN(amount) ? 0 : amount);
            }, 0);
        const expense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => {
                const amount = parseFloat(curr?.amount || 0);
                return acc + (isNaN(amount) ? 0 : amount);
            }, 0);
        return { income, expense, count: filteredTransactions.length };
    }, [filteredTransactions]);

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
            {/* Header */}
            <header className="dashboard-header slide-up">
                <div className="header-left">
                    <button className="icon-btn glass hidden-desktop mr-4" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                    <div className="greeting">
                        <h1>Transaction <span className="text-gradient">History</span></h1>
                        <p className="text-secondary">Review and manage your financial records.</p>
                    </div>
                </div>

                <div className="header-right">
                    <div className="search-bar">
                        <Search size={18} className="text-secondary" />
                        <input
                            type="text"
                            placeholder="Search everything..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
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

            {error && <div className="alert alert-danger slide-up">{error}</div>}

            <div className="summary-section stats-grid">
                <div className="card glass stat-mini-card">
                    <div className="mini-icon" style={{ background: 'var(--secondary-gradient)', boxShadow: '0 4px 12px var(--secondary-glow)' }}>
                        <TrendingUp size={20} color="white" />
                    </div>
                    <div className="mini-info">
                        <p>Filtered Income</p>
                        <h4>₹{stats.income.toLocaleString('en-IN')}</h4>
                    </div>
                </div>
                <div className="card glass stat-mini-card">
                    <div className="mini-icon" style={{ background: 'var(--danger-gradient)', boxShadow: '0 4px 12px var(--danger-glow)' }}>
                        <TrendingDown size={20} color="white" />
                    </div>
                    <div className="mini-info">
                        <p>Filtered Expense</p>
                        <h4>₹{stats.expense.toLocaleString('en-IN')}</h4>
                    </div>
                </div>
                <div className="card glass stat-mini-card">
                    <div className="mini-icon" style={{ background: 'var(--primary-gradient)', boxShadow: '0 4px 12px var(--primary-glow)' }}>
                        <Activity size={20} color="white" />
                    </div>
                    <div className="mini-info">
                        <p>Showing</p>
                        <h4>{stats.count} Transactions</h4>
                    </div>
                </div>
            </div>

            <div className="transactions-layout-v2">
                {/* Main Ledger */}
                <section className="transactions-ledger card glass">
                    <div className="section-header">
                        <div className="header-title-group">
                            <h3>Ledger History</h3>
                        </div>

                        <div className="header-actions">
                            <div className="filter-wrapper">
                                <button
                                    className={`icon-btn glass ${showFilters ? 'active' : ''}`}
                                    onClick={() => setShowFilters(!showFilters)}
                                    title="Filter Transactions"
                                >
                                    <Filter size={18} />
                                </button>

                                {showFilters && (
                                    <div className="filter-dropdown glass slide-up">
                                        <div className="dropdown-section">
                                            <p className="dropdown-label">Type</p>
                                            <div className="dropdown-options">
                                                <button
                                                    className={`filter-dot-btn ${filterType === 'all' ? 'active' : ''}`}
                                                    onClick={() => setFilterType('all')}
                                                >
                                                    All
                                                </button>
                                                <button
                                                    className={`filter-dot-btn ${filterType === 'income' ? 'active' : ''}`}
                                                    onClick={() => setFilterType('income')}
                                                >
                                                    Income
                                                </button>
                                                <button
                                                    className={`filter-dot-btn ${filterType === 'expense' ? 'active' : ''}`}
                                                    onClick={() => setFilterType('expense')}
                                                >
                                                    Expenses
                                                </button>
                                            </div>
                                        </div>

                                        <div className="dropdown-divider"></div>

                                        <div className="dropdown-section">
                                            <p className="dropdown-label">Category</p>
                                            <div className="dropdown-grid">
                                                <button
                                                    className={`filter-dot-btn ${filterCategory === 'all' ? 'active' : ''}`}
                                                    onClick={() => setFilterCategory('all')}
                                                >
                                                    All
                                                </button>
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat}
                                                        className={`filter-dot-btn ${filterCategory === cat ? 'active' : ''}`}
                                                        onClick={() => setFilterCategory(cat)}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="btn btn-primary btn-sm" onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }}>
                                <Plus size={16} /> Add Record
                            </button>
                        </div>
                    </div>

                    <TransactionList
                        transactions={filteredTransactions}
                        onDelete={deleteTransaction}
                        onEdit={openEditModal}
                        hideControls
                    />
                </section>
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

export default TransactionsPage;
