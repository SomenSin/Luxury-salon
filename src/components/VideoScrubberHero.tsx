import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './VideoScrubberHero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrubberHero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const frameCount = 128;
  const currentFrame = (index: number) => (
    `/frames/ezgif-frame-${(Math.min(254, index * 2) + 1).toString().padStart(3, '0')}.jpg`
  );

  // Preload images into memory
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const loadImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = currentFrame(index);
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / frameCount) * 100));
          resolve();
        };
        img.onerror = () => resolve(); // Continue even if one fails
        preloadedImages[index] = img;
      });
    };

    const loadAll = async () => {
      // Load first frame for background visibility
      await loadImage(0);
      setImages([...preloadedImages]);

      // Load all frames in chunks
      const chunks = [];
      for (let i = 0; i < frameCount; i += 10) {
        const chunk = [];
        for (let j = i; j < Math.min(i + 10, frameCount); j++) {
          chunk.push(loadImage(j));
        }
        await Promise.all(chunk);
        setImages([...preloadedImages]);
      }
      setLoaded(true);
    };

    loadAll();
  }, []);

  // Lock scroll while loading
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !containerRef.current || !leftColRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // GSAP Sequence object
    const sequence = { frame: 0 };

    // Drawing helper for high-quality, non-pixelated rendering
    const render = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Enable high-quality smoothing
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      // Balanced scaling: Slightly larger than "Contain" for a premium look
      const ratio = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight) * 1.4;
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      
      // Perfectly centered with a slight right-align offset for aesthetic balance
      const x = ((canvasWidth - newWidth) / 2) + 30;
      const y = (canvasHeight - newHeight) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, newWidth, newHeight);
    };

    // Responsive Canvas
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
      }, 250);
    };

    window.addEventListener('resize', resize);
    resize();

    // GSAP Sequence - Work everywhere including mobile
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=4000', // Reduced for less scrolling effort
        scrub: 0.5, // Faster, more direct response
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      }
    });

    let lastRenderedFrame = -1;
    tl.to(sequence, {
      frame: frameCount - 1,
      ease: "none",
      overwrite: true,
      onUpdate: () => {
        const currentFrame = Math.round(sequence.frame);
        if (currentFrame !== lastRenderedFrame) {
          render(currentFrame);
          lastRenderedFrame = currentFrame;
        }
      },
      duration: 100
    }, 0);

    // Precise text synchronization
    const textElements = gsap.utils.toArray<HTMLElement>('.hero-text');
    const segmentDuration = 100 / textElements.length;

    textElements.forEach((el, index) => {
      const start = index * segmentDuration;
      const end = (index + 1) * segmentDuration;
      
      // For the first element, start with opacity 1 and no blur/move
      if (index === 0) {
        gsap.set(el, { opacity: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'all' });
        
        tl.to(el,
          { 
            opacity: 0, 
            y: -30, 
            filter: 'blur(10px)',
            pointerEvents: 'none',
            duration: segmentDuration * 0.3,
            ease: 'power2.in' 
          },
          end - (segmentDuration * 0.3)
        );
      } else {
        tl.fromTo(el,
          { opacity: 0, y: 30, filter: 'blur(10px)', pointerEvents: 'none' },
          { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            pointerEvents: 'all',
            duration: segmentDuration * 0.3,
            ease: 'power2.out' 
          },
          start
        ).to(el,
          { 
            opacity: 0, 
            y: -30, 
            filter: 'blur(10px)',
            pointerEvents: 'none',
            duration: segmentDuration * 0.3,
            ease: 'power2.in' 
          },
          end - (segmentDuration * 0.3)
        );
      }
    });

    // Initial render
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
          <div className={styles.loaderLogo}>LUMINA</div>
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
            {/* Group 1: Services */}
            <div className={`hero-text ${styles.textGroup}`}>
              <span className={styles.tag}>Signature Services</span>
              <h1 className={styles.title}>What We Do.</h1>
              <p className={styles.subtitle}>
                From master precision cuts to artistic hand-painted color. See our full menu of luxury services and pricing.
              </p>
              <div className={styles.ctaContainer}>
                <button className={styles.ctaButton} onClick={() => router.push('/services')}>Explore Services</button>
              </div>
            </div>

            {/* Group 2: About */}
            <div className={`hero-text ${styles.textGroup}`}>
              <span className={styles.tag}>Our Story</span>
              <h1 className={styles.title}>Who We Are.</h1>
              <p className={styles.subtitle}>
                A technical approach to luxury. Meet our master stylists and learn about our commitment to precision.
              </p>
              <div className={styles.ctaContainer}>
                <button className={styles.ctaButton} onClick={() => router.push('/about')}>Read Our Story</button>
              </div>
            </div>

            {/* Group 3: Booking */}
            <div className={`hero-text ${styles.textGroup}`}>
              <span className={styles.tag}>Reservations</span>
              <h1 className={styles.title}>Book Your Chair.</h1>
              <p className={styles.subtitle}>
                We manage all reservations via Call or WhatsApp to ensure a personalized luxury experience. Contact our coordinator today.
              </p>
              <div className={styles.ctaContainer} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className={styles.ctaButton} onClick={() => window.location.href='tel:5550123456'}>Call to Book</button>
                <button className={`${styles.ctaButton} ${styles.ctaSecondary}`} onClick={() => window.open('https://wa.me/15550123456', '_blank')}>WhatsApp Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
