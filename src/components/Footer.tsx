import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <h2 className={styles.footerLogo}>DOLLY STUDIO</h2>
                        <p>Redefining luxury hair care through precision and movement.</p>
                    </div>

                    <div className={styles.footerLinks}>
                        <div className={styles.linkGroup}>
                            <h4>Explore</h4>
                            <a href="/services">Services</a>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4>Contact</h4>
                            <p>123 Aesthetic Way</p>
                            <p>New York, NY 10012</p>
                            <p>(555) 012-3456</p>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; 2024 Dolly Studio. All Rights Reserved.</p>
                    <div className={styles.socials}>
                        <span>Instagram</span>
                        <span>Twitter</span>
                        <span>Pinterest</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
