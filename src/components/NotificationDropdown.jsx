import React, { useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const NotificationDropdown = ({ isOpen, onClose }) => {
    const { notifications, markAsRead, markAllRead, clearNotifications, unreadCount } = useNotifications();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={18} className="text-emerald-500" />;
            case 'warning': return <AlertTriangle size={18} className="text-amber-500" />;
            default: return <Info size={18} className="text-indigo-500" />;
        }
    };

    return (
        <div className="notification-dropdown glass slide-up" ref={dropdownRef}>
            <div className="dropdown-header flex justify-between items-center px-4 py-3 border-b border-color">
                <div className="flex items-center gap-2">
                    <h4 className="font-bold">Notifications</h4>
                    {unreadCount > 0 && (
                        <span className="count-badge">{unreadCount}</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        className="text-xs text-primary font-bold hover:underline"
                        onClick={markAllRead}
                    >
                        Mark all read
                    </button>
                    <button onClick={onClose} className="text-secondary hover:text-primary">
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="notification-list custom-scrollbar">
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <div
                            key={n.id}
                            className={`notification-item ${!n.read ? 'unread' : ''}`}
                            onClick={() => markAsRead(n.id)}
                        >
                            <div className="item-icon">
                                {getIcon(n.type)}
                            </div>
                            <div className="item-content">
                                <p className="item-title">{n.title}</p>
                                <p className="item-msg">{n.message}</p>
                                <p className="item-time">{n.time}</p>
                            </div>
                            {!n.read && <div className="unread-indicate" />}
                        </div>
                    ))
                ) : (
                    <div className="empty-state p-8 text-center text-secondary">
                        <Bell size={32} className="mx-auto mb-2 opacity-20" />
                        <p>No notifications yet</p>
                    </div>
                )}
            </div>

            {notifications.length > 0 && (
                <div className="dropdown-footer p-2 text-center border-t border-color">
                    <button
                        className="text-xs text-danger font-bold flex items-center justify-center gap-2 w-full py-2 hover:bg-rose-500/10 rounded-lg transition-all"
                        onClick={clearNotifications}
                    >
                        <Trash2 size={12} /> Clear all history
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
