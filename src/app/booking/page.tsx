import styles from './booking.module.css';

const BookingPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.tag}>Reservations</span>
          <h1 className={styles.title}>Book Your Experience</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.bookingCard}>
          <div className={styles.formSection}>
             <h2 className={styles.formTitle}>Reserve Your Session</h2>
             <p className={styles.bookingIntro}>
               To maintain our standard of personalized luxury, all appointments are scheduled directly through our studio coordinators via Call or WhatsApp.
             </p>
             
             <div className={styles.directActions}>
                <a href="tel:5550123456" className={styles.callBtn}>
                  <span className={styles.btnLabel}>Call to Book</span>
                  <span className={styles.btnSub}>(555) 012-3456</span>
                </a>
                
                <a href="https://wa.me/15550123456" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                  <span className={styles.btnLabel}>WhatsApp Us</span>
                  <span className={styles.btnSub}>Message Coordinator</span>
                </a>
             </div>

             <div className={styles.inquiryNotes}>
                <h3>Consultations</h3>
                <p>New clients or those seeking technical color services are encouraged to book a complimentary 15-minute consultation prior to their first visit.</p>
             </div>
          </div>
          
          <div className={styles.policySection}>
             <h3>Reservation Policy</h3>
             <ul>
                <li>Please arrive 10 minutes prior to your appointment.</li>
                <li>Cancellations require 24-hour notice.</li>
                <li>Secure your spot with a consultation first for technical color.</li>
             </ul>
             <div className={styles.contactPrompt}>
                <p>Questions? Call our studio coordinator</p>
                <span className={styles.phone}>(555) 012-3456</span>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
