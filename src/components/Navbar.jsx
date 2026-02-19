import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { LogOut, User, Wallet, Moon, Sun, Edit3 } from 'lucide-react';
import ProfileModal from './ProfileModal';
import '../styles/components.css';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useSettings();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="container navbar-content">
                    <Link to="/" className="navbar-brand">
                        <div className="brand-icon">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <img
                            src={darkMode ? "/logoblack.png" : "/Logo2.png"}
                            alt="Finora"
                            className="brand-text-logo"
                        />
                    </Link>

                    <div className="navbar-actions">
                        <button onClick={toggleDarkMode} className="btn-icon theme-toggle" title="Toggle Theme">
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {currentUser ? (
                            <>
                                <div
                                    className="user-profile clickable"
                                    onClick={() => setShowProfile(true)}
                                    title="Edit Profile"
                                >
                                    <div className="avatar-small">
                                        <User size={16} />
                                    </div>
                                    <span className="hidden-mobile">{currentUser.displayName || "User"}</span>
                                </div>
                                <button onClick={handleLogout} className="btn-icon logout" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        )}
                    </div>
                </div>
            </nav>

            <ProfileModal
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
            />
        </>
    );
};

export default Navbar;
