import React, { useState } from 'react';
import { X, User, Save, Mail, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';

const ProfileModal = ({ isOpen, onClose }) => {
    const { currentUser, updateUser } = useAuth();
    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateUser({ displayName });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => {
                onClose();
                setMessage({ type: '', text: '' });
            }, 1500);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        }
        setLoading(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal card glass profile-modal-v3 slide-up">
                <div className="modal-header">
                    <div className="header-icon-wrapper">
                        <User size={20} />
                    </div>
                    <div>
                        <h3>Edit Profile</h3>
                        <p className="subtitle">Update your personal identity</p>
                    </div>
                    <button onClick={onClose} className="close-btn-round">
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    {message.text && (
                        <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} slide-up`}>
                            {message.text}
                        </div>
                    )}

                    <div className="profile-edit-avatar">
                        <div className="avatar-preview">
                            {displayName.charAt(0).toUpperCase() || <User size={32} />}
                            <div className="camera-badge">
                                <Camera size={14} />
                            </div>
                        </div>
                        <div className="avatar-info">
                            <p className="font-bold">{displayName || 'Your Name'}</p>
                            <p className="small text-secondary flex items-center gap-1">
                                <Mail size={12} /> {currentUser?.email}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-form">
                        <div className="form-group-premium">
                            <label>Display Name</label>
                            <div className="input-with-icon">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-actions mt-6">
                            <button type="button" onClick={onClose} className="btn btn-outline" disabled={loading}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">Saving...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Save size={18} /> Save Changes</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .profile-modal-v3 {
                    width: 100%;
                    max-width: 450px;
                    padding: 0 !important;
                    overflow: hidden;
                    border: 1px solid var(--glass-border);
                }

                .profile-modal-v3 .modal-header {
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-bottom: 1px solid var(--glass-border);
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    align-items: center;
                    gap: 1rem;
                }

                .header-icon-wrapper {
                    width: 40px;
                    height: 40px;
                    background: var(--primary-gradient);
                    color: white;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px var(--primary-glow);
                }

                .close-btn-round {
                   background: var(--bg-color);
                   color: var(--text-secondary);
                   width: 32px;
                   height: 32px;
                   border-radius: 50%;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   transition: all 0.2s;
                }

                .close-btn-round:hover {
                    background: var(--border-color);
                    color: var(--text-primary);
                }

                .modal-body {
                    padding: 1.5rem;
                }

                .profile-edit-avatar {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: var(--bg-color);
                    border-radius: var(--radius-lg);
                }

                .avatar-preview {
                    width: 64px;
                    height: 64px;
                    background: var(--primary-gradient);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    position: relative;
                    box-shadow: 0 4px 15px var(--primary-glow);
                }

                .camera-badge {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: var(--text-primary);
                    color: var(--bg-color);
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid var(--bg-color);
                }

                .form-group-premium {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-group-premium label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-left: 0.25rem;
                }

                .input-with-icon {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 1rem;
                    color: var(--text-secondary);
                    opacity: 0.5;
                }

                .input-with-icon input {
                    width: 100%;
                    padding: 0.85rem 1rem 0.85rem 2.75rem;
                    background: var(--bg-color);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }

                .input-with-icon input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px var(--primary-glow);
                }

                .modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                }
            `}} />
        </div>
    );
};

export default ProfileModal;
