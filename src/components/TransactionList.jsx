import React, { useState } from 'react';
import {
    Trash2,
    Edit3,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    MoreVertical,
    Utensils,
    Car,
    Lightbulb,
    Tv,
    Briefcase,
    HeartPulse,
    ShoppingBag,
    Tag,
    Pencil
} from 'lucide-react';
import '../styles/components.css';

const categoryIcons = {
    Food: <Utensils size={18} />,
    Transport: <Car size={18} />,
    Utilities: <Lightbulb size={18} />,
    Entertainment: <Tv size={18} />,
    Salary: <Briefcase size={18} />,
    Health: <HeartPulse size={18} />,
    General: <ShoppingBag size={18} />
};

const TransactionList = ({ transactions, onDelete, onEdit, hideControls = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const displayTransactions = hideControls ? transactions : transactions.filter(t => {
        const description = t?.description || '';
        const category = t?.category || '';
        const matchesSearch = description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(transactions.map(t => t.category))];

    return (
        <div className="transaction-list-v2">
            {!hideControls && (
                <div className="list-controls glass luxury-controls slide-up">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search activity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="category-select glass"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="transaction-items">
                {displayTransactions.length > 0 ? (
                    displayTransactions.map((t) => (
                        <div key={t.id} className="transaction-item glass slide-up">
                            <div className="item-left">
                                <div className={`category-icon ${t.type}`}>
                                    {categoryIcons[t.category] || <Tag size={20} />}
                                </div>
                                <div className="item-info">
                                    <p className="item-desc font-bold text-primary">{t.description}</p>
                                    <div className="item-meta">
                                        <span className="meta-tag glass">{t.category}</span>
                                        <span className="meta-date text-secondary">{t.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="item-right">
                                <span className={`item-amount font-bold ${t.type}`}>
                                    <span>{t.type === 'expense' ? '-' : '+'}</span>
                                    <span>₹{parseFloat(t.amount).toLocaleString('en-IN')}</span>
                                </span>
                                <div className="item-actions">
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => onEdit(t)}
                                        title="Edit Transaction"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => onDelete(t.id)}
                                        title="Delete Transaction"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state text-center p-8">
                        <p className="text-secondary">No transactions match your search</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
