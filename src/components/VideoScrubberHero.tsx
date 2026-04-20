import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './VideoScrubberHero.module.css';

gsap.registerPlugin(ScrollTrigger);

const LOADING_PHRASES = [
  "WELCOME TO DOLLY STUDIO",
  "PREPARING YOUR EXPERIENCE",
  "LOADING CINEMATIC VISUALS",
  "ALMOST READY",
  "DOLLY STUDIO EXPERIENCE"
];

export default function VideoScrubberHero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const frameCount = 306;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const currentFrame = (index: number) => (
    `${basePath}/images/frames/${(index + 1).toString().padStart(4, '0')}.jpg`
  );

  // Rotate phrases every 2s for readability
  useEffect(() => {
    if (loaded) return;
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % LOADING_PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loaded]);

  // High-performance streaming preloader
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];
    const essentialFrames = 10; // Frames needed to start the page

    const loadAll = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loadedCount++;
          preloadedImages[i] = img;
          
          // Update progress bar
          const currentProgress = Math.round((loadedCount / frameCount) * 100);
          setProgress(currentProgress);

          // Once essential frames are in, we can potentially show the canvas
          // but we wait for 100% for the "smooth scrub" guarantee
          if (loadedCount === frameCount) {
            setImages(preloadedImages);
            setLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImages(preloadedImages);
            setLoaded(true);
          }
        };
      }
    };

    loadAll();
  }, []);

  // Lock scroll while loading + Normalize scroll for mobile smoothness
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Smooth scroll normalization for mobile (fixes address bar jitter)
      ScrollTrigger.normalizeScroll(true);
    }
    return () => { 
      document.body.style.overflow = ''; 
      ScrollTrigger.normalizeScroll(false);
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !containerRef.current || !leftColRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Performance optimization
    if (!context) return;

    // Hint browser for optimization
    canvas.style.willChange = 'transform';

    const sequence = { frame: 0 };

    const render = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'medium'; // Faster than 'high' but looks same on mobile

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      context.drawImage(img, x, y, newWidth, newHeight);
    };

    let resizeTimeout: NodeJS.Timeout;
    const resize = () => {
      if (!leftColRef.current) return;
      
      const isMobile = window.innerWidth <= 768;
      const targetWidth = isMobile ? window.innerWidth : window.innerWidth * 0.333;
      const targetHeight = window.innerHeight;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          render(Math.round(sequence.frame));
          ScrollTrigger.refresh();
        });
      }, 150);
    };

    window.addEventListener('resize', resize);
    resize();

    // Smoother GSAP setup
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=5000', // Adjusted for 306 frames
        scrub: 0.15, // Perfect balance for touch fluidity
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      }
    });

    let lastRenderedFrame = -1;
    const updateFrames = () => {
      const currentFrame = Math.round(sequence.frame);
      if (currentFrame !== lastRenderedFrame) {
        render(currentFrame);
        lastRenderedFrame = currentFrame;
      }
    };

    // Chapter 1: (Frames 0-101)
    tl.to(sequence, {
      frame: 101,
      ease: "none",
      onUpdate: updateFrames,
      duration: 0.33
    }, 0);

    // Chapter 2: (Frames 102-203)
    tl.to(sequence, {
      frame: 203,
      ease: "none",
      onUpdate: updateFrames,
      duration: 0.33
    }, 0.33);

    // Chapter 3: (Frames 204-305)
    tl.to(sequence, {
      frame: 305,
      ease: "none",
      onUpdate: updateFrames,
      duration: 0.34
    }, 0.66);

    // Precise text synchronization for the 3 chapters
    const textElements = gsap.utils.toArray<HTMLElement>('.hero-text');
    
    textElements.forEach((el, index) => {
      if (index === 0) {
        // Section 1: Starts visible
        gsap.set(el, { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'all' });
        tl.to(el, { 
          opacity: 0, y: -30, filter: 'blur(10px)', pointerEvents: 'none', duration: 0.1 
        }, 0.28);
      } else if (index === textElements.length - 1) {
        // Section 3: Fades in at 0.66 and stays
        tl.fromTo(el,
          { opacity: 0, y: 30, filter: 'blur(10px)', pointerEvents: 'none' },
          { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'all', duration: 0.1 },
          0.66
        );
      } else {
        // Section 2: Fades in at 0.33 and out at 0.61
        tl.fromTo(el,
          { opacity: 0, y: 30, filter: 'blur(10px)', pointerEvents: 'none' },
          { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'all', duration: 0.1 },
          0.33
        ).to(el,
          { opacity: 0, y: -30, filter: 'blur(10px)', pointerEvents: 'none', duration: 0.1 },
          0.61
        );
      }
    });

    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded, images]);

  return (
    <>
      <div className={`${styles.loadingScreen} ${loaded ? styles.fadeOut : ''}`}>
        <div className={styles.loaderContent}>
          <div className={styles.loaderLogo}>DOLLY STUDIO</div>
          <div className={styles.rotatingPhrase}>{LOADING_PHRASES[phraseIndex]}</div>
          <div className={styles.loaderBar}>
            <div 
              className={styles.loaderProgress} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.loaderText}>{progress}%</div>
        </div>
      </div>

      <div ref={containerRef} className={styles.heroContainer}>
      <div className={styles.splitLayout}>
        <div ref={leftColRef} className={styles.leftCol}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.canvasOverlay}></div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.textStack}>
            <div className={`hero-text ${styles.textGroup}`}>
              <span className={styles.tag}>Signature Services</span>
              <h1 className={styles.title}>What We Do.</h1>
              <p className={styles.subtitle}>
                Precision cuts, artistic color, and premium restorative treatments. Explore the Dolly Studio menu.
              </p>
              <div className={styles.ctaContainer}>
                <button className={styles.ctaButton} onClick={() => router.push('/services')}>Explore Services</button>
              </div>
            </div>

            <div className={`hero-text ${styles.textGroup}`}>
              <span className={styles.tag}>The Dolly Method</span>
              <h1 className={styles.title}>Who We Are.</h1>
              <p className={styles.subtitle}>
                A technical approach to aesthetic excellence. Meet our masters and rediscover your signature style.
              </p>
              <div className={styles.ctaContainer}>
                <button className={styles.ctaButton} onClick={() => router.push('/about')}>Our Story</button>
              </div>
            </div>

            <div className={`hero-text ${styles.textGroup}`}>
              <span className={styles.tag}>Reservations</span>
              <h1 className={styles.title}>Your Chair Awaits.</h1>
              <p className={styles.subtitle}>
                Personalized booking for a luxury experience. Contact our studio via Call or WhatsApp today.
              </p>
              <div className={styles.ctaContainer} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className={styles.ctaButton} onClick={() => window.location.href='tel:5550123456'}>Call Studio</button>
                <button className={`${styles.ctaButton} ${styles.ctaSecondary}`} onClick={() => window.open('https://wa.me/15550123456', '_blank')}>WhatsApp Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
