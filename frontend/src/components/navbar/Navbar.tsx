
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>CivicLink</h1>
      </div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/government" onClick={() => setMenuOpen(false)}>Government</Link></li>
        <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
        <li><Link to="/news" onClick={() => setMenuOpen(false)}>News</Link></li>
      </ul>

      <div className={styles.language}>
        <h3>English</h3>
      </div>
    </nav>
  );
};

export default Navbar;

// import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css';

// const Navbar = () => (
//   <>
//  <nav className={styles.navbar}>
//   <div>
//     <h1 className={styles.logo}>CivicLink</h1>
//   </div>
//     <div>
//  <ul className={styles.navLinks}>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/government">Government</Link></li>
//       <li><Link to="/services">Services</Link></li>
//       <li><Link to="/news">News</Link></li>
//     </ul>
//     </div>
    
//    <div>
//     <h3>English</h3>
//     </div>
//   </nav>
//    </>
// );

// export default Navbar;