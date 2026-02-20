import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, LayoutDashboard, PieChart, ShieldCheck, ChevronRight } from 'lucide-react';
import '../styles/landing.css';
import '../styles/global.css';

const LandingPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="bg-glow"></div>

            {/* Navbar */}
            <nav className="landing-nav glass">
                <div className="nav-container">
                    <Link to="/" className="nav-brand">
                        <img src="/logo.png" alt="Finora" className="nav-logo-icon" />
                        <span className="font-bold text-xl" style={{ fontSize: '1.5rem' }}>Finora</span>
                    </Link>



                    <div className="flex items-center gap-4">
                        {currentUser ? (
                            <Link to="/dashboard" className="btn btn-primary">
                                Go to Dashboard <ArrowRight size={18} />
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link hidden-mobile">Login</Link>
                                <Link to="/signup" className="btn btn-primary">
                                    Get Started <ChevronRight size={18} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                {/* <div className="hero-badge">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    v2.0 is now live
                </div> */}

                <h1 className="hero-title">
                    Master Your Money <br />
                    <span className="text-gradient">With Precision & Style</span>
                </h1>

                <p className="hero-subtitle">
                    Experience the future of personal finance tracking.
                    Monitor expenses, visualize trends, and achieve your financial goals with
                    an interface designed for clarity.
                </p>

                <div className="hero-cta">
                    {currentUser ? (
                        <Link to="/dashboard" className="btn btn-primary py-3 px-8 text-lg">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            {/* <Link to="/signup" className="btn btn-primary py-3 px-8 text-lg">
                                Start Your Journey
                            </Link>
                            <Link to="/login" className="btn glass py-3 px-8 text-lg">
                                Login to Account
                            </Link> */}
                        </>
                    )}
                </div>

                {/* Hero Image / Dashboard Preview */}
                <div className="hero-image-wrapper glass">
                    <div style={{
                        height: 'auto',
                        width: '100%',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-luxury)',
                        border: '1px solid var(--surface-border)'
                    }}>
                        <img
                            src="/landing.png"
                            alt="Finora Dashboard"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="features-section">
                <div className="section-title">
                    <h2 className="mb-4">Why Choose Finora?</h2>
                    <p className="text-secondary max-w-2xl mx-auto">
                        Powerful features packaged in a beautiful, intuitive interface.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card glass">
                        <div className="feature-icon">
                            <LayoutDashboard size={28} />
                        </div>
                        <h3 className="feature-title">Smart Dashboard</h3>
                        <p className="feature-desc">
                            Get a bird's-eye view of your finances with real-time updates and intuitive visualizations.
                        </p>
                    </div>

                    <div className="feature-card glass">
                        <div className="feature-icon">
                            <PieChart size={28} />
                        </div>
                        <h3 className="feature-title">Detailed Analytics</h3>
                        <p className="feature-desc">
                            Understand your spending habits with comprehensive charts and categorized breakdowns.
                        </p>
                    </div>

                    <div className="feature-card glass">
                        <div className="feature-icon">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="feature-title">Secure & Private</h3>
                        <p className="feature-desc">
                            Your financial data is encrypted and secure. We prioritize your privacy above all else.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="section-title">
                    <h2>How It Works</h2>
                    <p className="text-secondary">Three simple steps to financial freedom</p>
                </div>

                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3 className="text-lg font-bold mb-2">Sign Up</h3>
                        <p className="text-secondary text-sm">Create your free account in seconds and set up your secure profile.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3 className="text-lg font-bold mb-2">Track Expenses</h3>
                        <p className="text-secondary text-sm">Log your daily transactions and categorize them with ease.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3 className="text-lg font-bold mb-2">Visualize Growth</h3>
                        <p className="text-secondary text-sm">Watch your savings grow with our powerful analytics tools.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <h2 className="mb-6 text-3xl md:text-4xl">Ready to take control?</h2>
                    <p className="text-secondary mb-8 max-w-xl mx-auto text-lg">
                        Join thousands of users who are already managing their finances smarter with Finora.
                    </p>
                    <Link to="/signup" className="btn btn-primary py-3 px-8 text-lg">
                        Get Started for Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="glass mt-0 py-12 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <img src="/logo.png" alt="Finora" style={{ width: '32px' }} />
                        <span className="font-bold text-lg">Finora</span>
                    </div>
                    <p className="text-secondary text-sm mb-6">
                        © {new Date().getFullYear()} Finora Finance. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-secondary">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
