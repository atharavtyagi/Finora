import React, { useState } from 'react';
import {
    User,
    Settings,
    Bell,
    Shield,
    Moon,
    Sun,
    Monitor,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Mail,
    Smartphone
} from 'lucide-react';
import '../styles/dashboard.css';
import '../styles/settings.css';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useNotifications } from '../context/NotificationContext';
import ProfileModal from '../components/ProfileModal';
import NotificationDropdown from '../components/NotificationDropdown';

const SettingsPage = () => {
    const { currentUser, logout } = useAuth();
    const { darkMode, toggleDarkMode, notificationsEnabled, toggleNotifications, toggleSidebar } = useSettings();
    const { unreadCount } = useNotifications();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <main className="main-content">
            <header className="dashboard-header slide-up">
                <div className="header-left">
                    <div className="greeting">
                        <h1>App <span className="text-gradient">Settings</span></h1>
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

            <div className="settings-container slide-up">
                <div className="settings-grid">
                    {/* Profile Section */}
                    <section className="settings-card glass">
                        <div className="card-header">
                            <div className="header-icon user">
                                <User size={20} />
                            </div>
                            <div className="header-text">
                                <h3>Account Profile</h3>
                                <p className="subtitle text-secondary small">Update your personal information</p>
                            </div>
                        </div>

                        <div className="settings-body">
                            <div className="profile-row">
                                <div className="profile-info">
                                    <div className="avatar-large">
                                        {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="info-text">
                                        <h4>{currentUser?.displayName || 'User Name'}</h4>
                                        <p className="text-secondary small">{currentUser?.email}</p>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm" onClick={() => setIsProfileModalOpen(true)}>
                                    Edit Profile
                                </button>
                            </div>

                            <div className="settings-list">
                                <div className="list-item">
                                    <div className="item-icon"><Mail size={18} /></div>
                                    <div className="item-content">
                                        <p className="label font-bold">Email Address</p>
                                        <p className="value text-secondary small">{currentUser?.email}</p>
                                    </div>
                                    <ChevronRight size={18} className="chevron text-secondary" />
                                </div>
                                <div className="list-item">
                                    <div className="item-icon"><Smartphone size={18} /></div>
                                    <div className="item-content">
                                        <p className="label font-bold">Phone Number</p>
                                        <p className="value text-secondary small">Not linked</p>
                                    </div>
                                    <ChevronRight size={18} className="chevron text-secondary" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="settings-column">
                        {/* Preferences */}
                        <section className="settings-card glass">
                            <div className="card-header">
                                <div className="header-icon pref">
                                    <Monitor size={20} />
                                </div>
                                <div className="header-text">
                                    <h3>Preferences</h3>
                                    <p className="subtitle text-secondary small">App appearance and alerts</p>
                                </div>
                            </div>

                            <div className="settings-body">
                                <div className="action-row">
                                    <div className="row-content">
                                        <div className="row-icon"><Moon size={18} /></div>
                                        <div>
                                            <p className="font-bold">Dark Mode</p>
                                            <p className="small text-secondary">Switch to dark theme</p>
                                        </div>
                                    </div>
                                    <div className={`toggle-switch ${darkMode ? 'on' : ''}`} onClick={toggleDarkMode}>
                                        <div className="switch-thumb" />
                                    </div>
                                </div>

                                <div className="action-row">
                                    <div className="row-content">
                                        <div className="row-icon"><Bell size={18} /></div>
                                        <div>
                                            <p className="font-bold">Notifications</p>
                                            <p className="small text-secondary">Email and push alerts</p>
                                        </div>
                                    </div>
                                    <div className={`toggle-switch ${notificationsEnabled ? 'on' : ''}`} onClick={toggleNotifications}>
                                        <div className="switch-thumb" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Security */}
                        <section className="settings-card glass">
                            <div className="card-header">
                                <div className="header-icon security">
                                    <Shield size={20} />
                                </div>
                                <div className="header-text">
                                    <h3>Security</h3>
                                    <p className="subtitle text-secondary small">Protect your account</p>
                                </div>
                            </div>
                            <div className="settings-body">
                                <button className="btn btn-outline w-full justify-between mb-4">
                                    <span>Change Password</span>
                                    <ChevronRight size={18} />
                                </button>
                                <button
                                    className="btn btn-outline w-full justify-between text-danger"
                                    onClick={handleLogout}
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </div>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </main>
    );
};

export default SettingsPage;
