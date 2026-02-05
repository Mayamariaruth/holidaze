import { useLocation } from 'react-router-dom';
import AppRouter from './router';
import Navbar from './components/layout/Navbar';
import NavbarOther from './components/layout/NavbarOther';
import Footer from './components/layout/Footer';

function App() {
  const { pathname } = useLocation();
  const isPublic = pathname === '/' || pathname === '/venues';

  return (
    <>
      {isPublic ? <Navbar /> : <NavbarOther />}
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
