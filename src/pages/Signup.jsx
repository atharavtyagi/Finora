import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create account: ' + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center" style={{ flex: 1, background: 'var(--bg-color)', padding: '2rem 0' }}>
            <div className="card glass luxury-card" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem' }}>
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <div className="brand-logo" style={{ width: '60px', height: '60px', borderRadius: '16px' }}>
                            <img src="/logo.png" alt="Finora Logo" className="logo-img" />
                        </div>
                    </div>
                    <h2 className="luxury-title" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Create Account</h2>
                    <p className="text-secondary small">Join the premium finance tracker</p>
                </div>

                {error && <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="luxury-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            required
                            className="luxury-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            className="luxury-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            className="luxury-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-2" style={{ padding: '0.875rem' }}>Sign Up</button>
                </form>

                <div className="mt-6 text-center" style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
                    <span className="text-secondary">Already have an account? </span>
                    <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
