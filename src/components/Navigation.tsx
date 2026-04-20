"use client";
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.nav}>
      <Link href="#home" onClick={(e) => scrollTo(e, 'home')} className={styles.logo}>
        Dolly Studio
      </Link>
      <div className={styles.menu}>
        <a href="#services" onClick={(e) => scrollTo(e, 'services')} className={styles.link}>Services</a>
        <a href="#about" onClick={(e) => scrollTo(e, 'about')} className={styles.link}>About</a>
        <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className={styles.link}>Contact</a>
      </div>
    </nav>
  );
}
