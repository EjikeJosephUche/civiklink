import { Link } from 'react-router-dom';
import './Navbar.module.css';

const Navbar = () => (
  <>
 <nav className="navbar">
  <div>
    <h1 className="logo">CivicLink</h1>
  </div>
    <div>
 <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/government">Government</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/news">News</Link></li>
    </ul>
    </div>
    
   <div>
    <h3>English</h3>
    </div>
  </nav>
   </>
);

export default Navbar;