"use client";

import { useEffect } from 'react';
import styles from './services.module.css';

const ServicesPage = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const serviceCategories = [
    {
      name: "Haircuts & Styling",
      items: [
        { id: "precision-haircut", name: "Precision Haircut", price: "$85+", desc: "Includes wash, scalp massage, and specialized styling.", image: `${basePath}/images/services/precision_haircut.png` },
        { id: "blowouts", name: "Blowouts", price: "$65+", desc: "Signature styling for any occasion.", image: `${basePath}/images/services/blowout_styling.png` },
        { id: "mens-grooming", name: "Men's Grooming", price: "$60+", desc: "Technical cut and style consultation.", image: `${basePath}/images/services/men_grooming.png` }
      ]
    },
    {
        name: "Technical Color",
        items: [
          { id: "signature-balayage", name: "Signature Balayage", price: "$210+", desc: "Artistic hand-painting for seamless depth.", image: `${basePath}/images/services/signature_balayage.png` },
          { id: "full-foil", name: "Full Foil", price: "$180+", desc: "Full head highlights with multidimensional tones.", image: `${basePath}/images/services/technical_foils.png` },
          { id: "root-smudge", name: "Root Smudge", price: "$95+", desc: "Perfect for blending natural growth.", image: `${basePath}/images/services/root_smudge.png` }
        ]
      },
      {
        name: "Restoration",
        items: [
          { id: "keratin-smooth", name: "Keratin Smooth", price: "$350+", desc: "Professional smoothing treatment for frizz-free hair.", image: `${basePath}/images/services/keratin_smooth.png` },
          { id: "deep-repair-mask", name: "Deep Repair Mask", price: "$45+", desc: "Intensive moisture treatment for damaged hair.", image: `${basePath}/images/services/repair_mask.png` },
          { id: "scalp-detox", name: "Scalp Detox", price: "$55+", desc: "Exfoliating treatment for a healthy foundation.", image: `${basePath}/images/services/scalp_detox.png` }
        ]
      }
  ];
  
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Offset for sticky header if needed
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.tag}>Signature Menu</span>
          <h1 className={styles.title}>The Art of Service</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.menuGrid}>
          {serviceCategories.map((cat, i) => (
            <div key={i} className={styles.category}>
              <h2 className={styles.categoryName}>{cat.name}</h2>
              <div className={styles.itemList}>
                {cat.items.map((item, j) => (
                  <div key={j} id={item.id} className={styles.item}>
                    <div className={styles.itemImageWrapper}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemHeader}>
                        <h3>{item.name}</h3>
                        <span className={styles.price}>{item.price}</span>
                      </div>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
