import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Left side: Logo + copyright */}
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>CivicLink</h2>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} CivicLink. All rights reserved.</p>
        </div>

        {/* Right side: Links and Info */}
        <div className={styles.infoGrid}>
          <div className={styles.section}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/government">Government</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/news">News</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>About Us</h3>
           <ul>
              <li><Link to="/">Missions</Link></li>
              <li><Link to="#">Leadership</Link></li>
              
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Contact Us</h3>
            <p>Email: support@civiclink.ng</p>
            <p>Phone: +234 800 123 4567</p>
            <div className={styles.socials}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
