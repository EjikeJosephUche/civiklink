import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import {  FaSearch, FaUser } from 'react-icons/fa';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1 style={{fontWeight: '700', fontSize: '28px'}}>CivicLink</h1>
      </div>

      {/* Hamburger menu icon */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Navigation links, toggle active class based on menuOpen */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
        {menuOpen && (
    <>
      <li style={{display: 'flex'}}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </li>
      
      
    </>
  )}
        <li className={`${location.pathname === '/' ? styles.activeLink : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={`${location.pathname === '/government' ? styles.activeLink : ''}`}>
          <Link to="/government" onClick={() => setMenuOpen(false)}>Government</Link>
        </li>
        <li className={`${location.pathname === '/services' ? styles.activeLink : ''}`}>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        </li>
        <li className={`${location.pathname === '/news' ? styles.activeLink : ''}`}>
          <Link to="/news" onClick={() => setMenuOpen(false)}>News</Link>
        </li>

        {menuOpen && (
    <li className={`${location.pathname === '/login' ? styles.activeLink : ''}`}>
      <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
    </li>
  )}
      </ul>

      <div className={styles.icons}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaSearch /></a>
        <h3 style={{fontSize: '20px'}}>English</h3>

        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaUser /></a>

      </div>
       {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>
      )}
    </nav>
    
    
  );
}

export default Navbar;


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css';

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <h1>CivicLink</h1>
//       </div>

//       <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
//         <span className={styles.bar}></span>
//         <span className={styles.bar}></span>
//         <span className={styles.bar}></span>
//       </div>

//       <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
//         <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//         <li><Link to="/government" onClick={() => setMenuOpen(false)}>Government</Link></li>
//         <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
//         <li><Link to="/news" onClick={() => setMenuOpen(false)}>News</Link></li>
//       </ul>

//       <div className={styles.language}>
//         <h3>English</h3>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

