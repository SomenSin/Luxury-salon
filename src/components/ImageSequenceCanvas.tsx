"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./ImageSequenceCanvas.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive Canvas Resizing for high-DPI displays
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Handle Retina Displays perfectly
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
        render();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    
    // Total frames for sequence animation
    const frameCount = 150;
    const currentFrame = (index: number) => 
      `/frames/scissor_${(index + 1).toString().padStart(4, "0")}.png`;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };
    let fallbackImage: HTMLImageElement | null = null;
    
    // Load Fallback/Placeholder
    const baseImg = new Image();
    baseImg.src = "/frames/scissor_0001.png";
    baseImg.onload = () => {
        fallbackImage = baseImg;
        resizeCanvas(); 
        setLoaded(true);
    };

    // Load Actual Image Sequence frames (Prelaoding)
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i); 
        images.push(img);
    }

    function render() {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Fill canvas background (blending seamless borders)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      // Current frame in scroll
      let imgToDraw = images[Math.floor(imageSeq.frame)];
      
      const progress = imageSeq.frame / (frameCount - 1);
      
      // Dynamic rendering logic depending on if the user dropped in genuine frames yet
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
          imgToDraw = fallbackImage as HTMLImageElement;
          
          if (imgToDraw) {
              // --- AI PLACEHOLDER ENGINE ---
              // Since the user might not have 150 rendered 3d frames yet,
              // we apply dynamic GSAP Canvas transforms directly onto the image
              // to simulate a perfect 3D Apple sequence scrolling effect!
              ctx.save();
              ctx.translate(w / 2, h / 2);
              
              const scale = 1 + (progress * 1.5); // Zooms into the scissor details
              const rotation = progress * (Math.PI / 1.5); // Cinematic tilt
              
              ctx.scale(scale, scale);
              ctx.rotate(rotation);
              
              // Draw image centered in view with relative zoom ratio for hero screen
              const hRatio = w / imgToDraw.width;
              const vRatio = h / imgToDraw.height;
              const ratio  = Math.max(hRatio, vRatio) * 0.6; // Adjust scaling bounds
              
              ctx.drawImage(
                imgToDraw, 
                -(imgToDraw.width * ratio) / 2, 
                -(imgToDraw.height * ratio) / 2, 
                imgToDraw.width * ratio, 
                imgToDraw.height * ratio
              );
              
              ctx.restore();
              return;
          }
          return;
      }

      // --- GENUINE FRAME RENDERER ---
      // This logic will run natively when the user adds 150 frames.
      const hRatio = w / imgToDraw.width;
      const vRatio = h / imgToDraw.height;
      const ratio  = Math.max(hRatio, vRatio);
      const centerShift_x = (w - imgToDraw.width * ratio) / 2;
      const centerShift_y = (h - imgToDraw.height * ratio) / 2;

      ctx.drawImage(
        imgToDraw,
        0, 0, imgToDraw.width, imgToDraw.height,
        centerShift_x, centerShift_y, imgToDraw.width * ratio, imgToDraw.height * ratio
      );
    }

    // ScrollTrigger Animation directly dictating the frame integer
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000", // Makes the scrolling massive, typical of Apple product pages
        scrub: 1.2,    // Smooth lag interpolation
        pin: true,     // Sticky scroll!
      }
    });

    // Advance frame
    tl.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(),
    });

    // Animate the text overlaps to sync with the frame positions
    gsap.utils.toArray<HTMLElement>(".sequence-text").forEach((el, i) => {
       tl.fromTo(el, 
         { opacity: 0, y: 50 },
         { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
         (i + 1) * (1 / 4) // Inject timeline dynamically
       ).to(el, 
         { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" },
         (i + 1) * (1 / 4) + 0.1
       );
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.sequenceContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      {!loaded && <div className={styles.loader}>Loading High-Res Sequence...</div>}

      <div className={styles.overlayTextContainer}>
         <div className="sequence-text" style={{ opacity: 0, position: "absolute", top: "40%", width: "100%", textAlign: "center" }}>
            <h1 className={styles.heroText}>A Cut Above</h1>
            <p className={styles.subText}>The sharpest evolution in hair. Smooth scrolling.</p>
         </div>
         <div className="sequence-text" style={{ opacity: 0, position: "absolute", top: "50%", width: "100%", textAlign: "center" }}>
            <h1 className={styles.heroText}>24fps Cinematic Smoothness</h1>
            <p className={styles.subText}>Frame by frame interaction.</p>
         </div>
         <div className="sequence-text" style={{ opacity: 0, position: "absolute", top: "60%", width: "100%", textAlign: "center" }}>
            <h1 className={styles.heroText}>Built For Precision</h1>
            <p className={styles.subText}>Replace public/frames to inject your own video.</p>
         </div>
      </div>
    </div>
  );
}
