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

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(0,0,0,0.8)',
                padding: 12,
                titleFont: { size: 14, weight: '700' },
                bodyFont: { size: 13 },
                displayColors: true,
                cornerRadius: 10,
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: true, color: gridColor },
                ticks: { color: textColor, font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: textColor, font: { size: 12, weight: '600' } }
            }
        }
    };

    return (
        <div className="charts-grid flex gap-8 flex-wrap" style={{ width: '100%', padding: '1rem' }}>
            <div className="chart-item" style={{ flex: '1.2', minWidth: '320px', height: '350px' }}>
                <h4 className="text-secondary mb-6 font-semibold flex items-center gap-2">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-color)' }}></span>
                    Expenses by Category
                </h4>
                {Object.keys(categories).length > 0 ? (
                    <Doughnut data={doughnutData} options={options} />
                ) : (
                    <div className="empty-chart flex items-center justify-center h-full border-2 border-dashed border-color rounded-xl">
                        <p className="text-secondary">No expense records found</p>
                    </div>
                )}
            </div>
            <div className="chart-item" style={{ flex: '1', minWidth: '320px', height: '350px' }}>
                <h4 className="text-secondary mb-6 font-semibold flex items-center gap-2">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--secondary-color)' }}></span>
                    Income vs Expense
                </h4>
                <Bar data={barData} options={options} />
            </div>
        </div>
    );
};

export default Charts;
