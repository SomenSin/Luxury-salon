import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          LUMINA
        </Link>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/booking" className={styles.bookBtn}>Book Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
