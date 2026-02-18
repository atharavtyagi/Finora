import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('darkMode');
            return saved ? JSON.parse(saved) : false;
        } catch (e) {
            console.error("Error parsing darkMode from localStorage", e);
            return false;
        }
    });

    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        try {
            const saved = localStorage.getItem('notificationsEnabled');
            return saved ? JSON.parse(saved) : true;
        } catch (e) {
            console.error("Error parsing notificationsEnabled from localStorage", e);
            return true;
        }
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Apply theme to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Persist notifications
    useEffect(() => {
        localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    }, [notificationsEnabled]);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const setSidebarOpen = (isOpen) => setIsSidebarOpen(isOpen);

    return (
        <SettingsContext.Provider value={{
            darkMode,
            toggleDarkMode,
            notificationsEnabled,
            toggleNotifications,
            isSidebarOpen,
            toggleSidebar,
            setSidebarOpen
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
