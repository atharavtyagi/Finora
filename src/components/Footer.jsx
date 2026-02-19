import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <span className="footer-text">© {currentYear} Finora. All rights reserved.</span>
                </div>
                <div className="footer-links">
                    <a href="#" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">Terms of Service</a>
                    <a href="#" className="footer-link">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
