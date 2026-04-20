"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './page.module.css';
import VideoScrubberHero from '@/components/VideoScrubberHero';
import MainContent from '@/components/MainContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>('.fade-up').forEach((elem) => {
      gsap.fromTo(elem,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className={styles.main}>
      <VideoScrubberHero />
      <MainContent />
    </main>
  );
}
