import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Activity
} from 'lucide-react';
import '../styles/components.css';

const SummaryCard = ({ title, amount, type }) => {
    let icon, bgGlow, gradient;

    if (type === 'income') {
        icon = <TrendingUp size={24} />;
        bgGlow = 'var(--secondary-glow)';
        gradient = 'var(--secondary-gradient)';
    } else if (type === 'expense') {
        icon = <TrendingDown size={24} />;
        bgGlow = 'var(--danger-glow)';
        gradient = 'var(--danger-gradient)';
    } else {
        icon = <Activity size={24} />;
        bgGlow = 'var(--primary-glow)';
        gradient = 'var(--primary-gradient)';
    }

    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);

    return (
        <div className="card glass luxury-card slide-up">
            <div className="luxury-icon-wrapper" style={{
                background: gradient,
                boxShadow: `0 12px 24px -8px ${bgGlow}, var(--shadow-md)`
            }}>
                {icon}
            </div>
            <div className="luxury-content" style={{ minWidth: 0 }}>
                <p className="luxury-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</p>
                <h2 className="luxury-amount" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.85rem)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formattedAmount}</h2>
            </div>
        </div>
    );
};

export default SummaryCard;
