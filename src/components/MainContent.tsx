import React from 'react';
import Link from 'next/link';
import styles from './MainContent.module.css';

const MainContent = () => {
  const services = [
    { id: "precision-haircut", title: "Precision Haircut", price: "from $85", desc: "Crafting the perfect silhouette for your face shape.", image: "/images/services/precision_haircut.png" },
    { id: "signature-balayage", title: "Signature Balayage", price: "from $210", desc: "Hand-painted highlights for a sun-kissed, natural look.", image: "/images/services/signature_balayage.png" },
    { id: "deep-repair-mask", title: "Deep Repair Mask", price: "from $45", desc: "Intensive moisture treatment for damaged hair.", image: "/images/services/repair_mask.png" },
    { id: "blowouts", title: "Blowouts", price: "from $65", desc: "Signature styling for any occasion with maximum volume.", image: "/images/services/blowout_styling.png" },
    { id: "mens-grooming", title: "Men's Grooming", price: "from $60", desc: "Technical cut and style consultation for the modern man.", image: "/images/services/men_grooming.png" },
    { id: "full-foil", title: "Full Foil", price: "from $180", desc: "Full head highlights with multidimensional tones.", image: "/images/services/technical_foils.png" },
    { id: "keratin-smooth", title: "Keratin Smooth", price: "from $350", desc: "Professional smoothing treatment for frizz-free hair.", image: "/images/services/keratin_smooth.png" },
    { id: "root-smudge", title: "Root Smudge", price: "from $95", desc: "Perfect for blending natural growth and extending color.", image: "/images/services/root_smudge.png" },
    { id: "scalp-detox", title: "Scalp Detox", price: "from $55", desc: "Exfoliating treatment for a healthy hair foundation.", image: "/images/services/scalp_detox.png" }
  ];

  const stylists = [
    { name: "Elena Rossi", role: "Master Stylist", image: "/images/elena_rossi.png" },
    { name: "Marcus Chen", role: "Color Specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Sophia Vogt", role: "Art Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop" }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Services Section */}
      <section className={styles.section} id="services">
        <div className={styles.container}>
          <span className={styles.sectionTag}>Signature Menu</span>
          <h2 className={styles.sectionTitle}>Elevate Your Aesthetic</h2>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <Link key={i} href={`/services#${s.id}`} className={styles.serviceLink}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceImageWrapper}>
                    <img src={s.image} alt={s.title} />
                  </div>
                  <div className={styles.serviceContent}>
                    <div className={styles.serviceHeader}>
                      <h3>{s.title}</h3>
                      <span className={styles.price}>{s.price}</span>
                    </div>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/services" className={styles.seeMoreBtn}>
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Stylist Section */}
      <section className={styles.section} id="stylists">
        <div className={styles.container}>
          <span className={styles.sectionTag}>The Collective</span>
          <h2 className={styles.sectionTitle}>Masters of the Craft</h2>
          <div className={styles.stylistGrid}>
            {stylists.map((s, i) => (
              <div key={i} className={styles.stylistCard}>
                <div className={styles.imageWrapper}>
                  <img src={s.image} alt={s.name} />
                </div>
                <h3>{s.name}</h3>
                <p>{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default MainContent;
