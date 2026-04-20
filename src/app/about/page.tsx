import styles from './about.module.css';

const AboutPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.tag}>Our Story</span>
          <h1 className={styles.title}>Simplicity is the <br/>Ultimate Sophistication</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageBlock}>
             <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop" alt="Salon Interior" />
          </div>
          
          <div className={styles.textBlock}>
            <h2>Crafting Beauty Since 2024</h2>
            <p>
              Born from a passion for precision and a love for cinematic movement, Salon Lumina was established to redefine what it means to experience luxury hair care.
            </p>
            <p>
              We believe that every appointment is an opportunity for a masterpiece. Our team of master stylists and color specialists are dedicated to one thing: bringing your unique vision to life through technical excellence and artistic flair.
            </p>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span>12+</span>
                    <p>Master Stylists</p>
                </div>
                <div className={styles.stat}>
                    <span>5000+</span>
                    <p>Happy Clients</p>
                </div>
                <div className={styles.stat}>
                    <span>15+</span>
                    <p>AWARD WINS</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
