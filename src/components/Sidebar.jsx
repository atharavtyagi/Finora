import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
    LayoutDashboard,
    ArrowLeftRight,
    PieChart,
    Settings,
    Wallet,
    X,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { darkMode } = useSettings();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />

            <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <div className="brand-logo">
                            <img src="/logo.png" alt="Finora Logo" className="logo-img" />
                        </div>
                        <img
                            src={darkMode ? "/logoblack.png" : "/Logo2.png"}
                            alt="Finora"
                            className="brand-text-logo"
                        />
                    </div>
                    <button className="close-sidebar hidden-desktop" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" className="nav-link" end onClick={onClose}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/transactions" className="nav-link" onClick={onClose}>
                        <ArrowLeftRight size={20} />
                        <span>Transactions</span>
                    </NavLink>
                    <NavLink to="/analytics" className="nav-link" onClick={onClose}>
                        <PieChart size={20} />
                        <span>Analytics</span>
                    </NavLink>
                    <NavLink to="/settings" className="nav-link" onClick={onClose}>
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-link logout-btn w-full" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
