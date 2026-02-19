import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useSettings } from '../context/SettingsContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Charts = ({ transactions }) => {
    const { darkMode } = useSettings();

    // Theme-based colors
    const textColor = darkMode ? '#94a3b8' : '#475569';
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    // Aggregate data for Doughnut (Expense by Category)
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categories = {};

    expenseTransactions.forEach(t => {
        const category = t?.category || 'General';
        const amount = parseFloat(t?.amount || 0);
        if (!isNaN(amount)) {
            if (categories[category]) {
                categories[category] += amount;
            } else {
                categories[category] = amount;
            }
        }
    });

    const doughnutData = {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: [
                    '#6366f1', // Indigo
                    '#a855f7', // Violet
                    '#ec4899', // Pink
                    '#f43f5e', // Rose
                    '#f59e0b', // Amber
                    '#10b981', // Emerald
                    '#06b6d4'  // Cyan
                ],
                borderWidth: 0,
                hoverOffset: 15,
                borderRadius: 8,
            },
        ],
    };

    // Aggregate data for Bar (Income vs Expense)
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => {
            const amount = parseFloat(curr?.amount || 0);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => {
            const amount = parseFloat(curr?.amount || 0);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0);

    const barData = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Total Amount',
                data: [totalIncome, totalExpense],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.85)',
                    'rgba(244, 63, 94, 0.85)'
                ],
                borderRadius: 12,
                barThickness: 45,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: 'Inter', size: 12, weight: '500' },
                    color: textColor
                }
            },
            tooltip: {
                backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                titleColor: darkMode ? '#fff' : '#1e293b',
                bodyColor: darkMode ? '#94a3b8' : '#475569',
                padding: 12,
                titleFont: { size: 14, weight: '700' },
                bodyFont: { size: 13 },
                displayColors: true,
                cornerRadius: 10,
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                borderWidth: 1
            }
        }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                titleColor: darkMode ? '#fff' : '#1e293b',
                bodyColor: darkMode ? '#94a3b8' : '#475569',
                padding: 12,
                cornerRadius: 10
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: gridColor, drawBorder: false },
                ticks: { color: textColor, font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: textColor, font: { size: 12, weight: '600' } }
            }
        }
    };

    return (
        <div className="charts-grid flex gap-6 flex-wrap" style={{ width: '100%', padding: '0.5rem' }}>
            <div className="chart-item glass" style={{
                flex: '1 1 300px',
                width: '100%',
                minWidth: 0,
                minHeight: '300px',
                padding: '1rem',
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h4 className="luxury-title mb-6 flex items-center gap-2" style={{ fontSize: '1.1rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '3px', background: 'linear-gradient(45deg, #6366f1, #a855f7)' }}></div>
                    Spending by Category
                </h4>
                <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
                    {Object.keys(categories).length > 0 ? (
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    ) : (
                        <div className="empty-chart flex items-center justify-center h-full border-2 border-dashed border-color rounded-2xl" style={{ opacity: 0.5 }}>
                            <p className="text-secondary">No expense records found</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="chart-item glass" style={{
                flex: '1 1 300px',
                width: '100%',
                minWidth: 0,
                minHeight: '300px',
                padding: '1rem',
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h4 className="luxury-title mb-6 flex items-center gap-2" style={{ fontSize: '1.1rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '3px', background: 'linear-gradient(45deg, #10b981, #3b82f6)' }}></div>
                    Efficiency Overview
                </h4>
                <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
