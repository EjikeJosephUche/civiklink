import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../components/navbar/Navbar.module.css';

const MainLayout = () => (
  <>
    <Navbar />
    <main style={{ padding: '2rem', minHeight: '80vh' }}>
      <Outlet />
    
    </main>
    <Footer />
  </>
);

export default MainLayout;