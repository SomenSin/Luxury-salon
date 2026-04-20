import styles from './contact.module.css';

const ContactPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.tag}>Connect</span>
          <h1 className={styles.title}>Visit the Studio</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoGroup}>
              <h3>Location</h3>
              <p>123 Aesthetic Way<br />SoHo, New York, NY 10012</p>
            </div>
            <div className={styles.infoGroup}>
              <h3>Hours</h3>
              <p>Tue – Fri: 10am – 8pm</p>
              <p>Sat: 9am – 6pm</p>
              <p>Sun – Mon: Closed</p>
            </div>
            <div className={styles.infoGroup}>
              <h3>Get in Touch</h3>
              <p>hello@salonlumina.com</p>
              <p>(555) 012-3456</p>
            </div>
          </div>

          <div className={styles.formSection}>
             <form className={styles.form}>
                <div className={styles.inputRow}>
                   <input type="text" placeholder="Full Name" />
                   <input type="email" placeholder="Email Address" />
                </div>
                <select>
                   <option>General Inquiry</option>
                   <option>Reservation Request</option>
                   <option>Careers</option>
                </select>
                <textarea placeholder="How can we help?"></textarea>
                <button type="submit" className={styles.submitBtn}>Send Message</button>
             </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
