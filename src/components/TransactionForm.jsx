import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/components.css';

const TransactionForm = ({ isOpen, onClose, onSubmit, editingTransaction }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        category: 'General',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (editingTransaction) {
            setFormData(editingTransaction);
        } else {
            setFormData({
                title: '',
                amount: '',
                type: 'expense',
                category: 'General',
                date: new Date().toISOString().split('T')[0]
            });
        }
    }, [editingTransaction, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header flex justify-between items-center mb-6">
                    <h3 className="text-gradient">{editingTransaction ? 'Edit Transaction' : 'New Transaction'}</h3>
                    <button onClick={onClose} className="btn-icon glass"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="luxury-form">
                    <div className="form-group">
                        <label>Recording Title</label>
                        <input
                            type="text"
                            required
                            placeholder="What was this for?"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="luxury-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Amount (INR)</label>
                        <input
                            type="number"
                            required
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="luxury-input"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="form-group flex-1">
                            <label>Movement Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="luxury-select"
                            >
                                <option value="income">Income (+)</option>
                                <option value="expense">Expense (-)</option>
                            </select>
                        </div>

                        <div className="form-group flex-1">
                            <label>Classification</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="luxury-select"
                            >
                                <option value="General">General</option>
                                <option value="Food">Food & Beverage</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Salary">Salary / Bonus</option>
                                <option value="Health">Healthcare</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Transaction Date</label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="luxury-input"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-2" style={{ padding: '1.15rem' }}>
                        {editingTransaction ? 'Sync Changes' : 'Record Transaction'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
