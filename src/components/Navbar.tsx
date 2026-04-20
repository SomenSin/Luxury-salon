'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DOLLY STUDIO
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
          <Link href="/services" className={pathname === '/services' ? styles.active : ''}>Services</Link>
          <Link href="/about" className={pathname === '/about' ? styles.active : ''}>About</Link>
          <Link href="/contact" className={pathname === '/contact' ? styles.active : ''}>Contact</Link>
          <Link href="/booking" className={styles.bookBtn}>Book Now</Link>
        </div>

        {/* Hamburger Button */}
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuVisible : ''}`}>
          <div className={styles.mobileLinks}>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/booking" className={styles.mobileBookBtn} onClick={() => setIsOpen(false)}>Book Appointment</Link>
          </div>
          <div className={styles.mobileFooter}>
            <p>555.012.3456</p>
            <p>concierge@dollystudio.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
