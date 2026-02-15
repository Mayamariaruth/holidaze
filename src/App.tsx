import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './router';
import Navbar from './components/layout/Navbar';
import NavbarOther from './components/layout/NavbarOther';
import Footer from './components/layout/Footer';
import Alert from './components/ui/Alert';

type GlobalAlert = {
  type: 'success' | 'danger';
  message: string;
} | null;

function App() {
  const { pathname } = useLocation();
  const isPublic = pathname === '/' || pathname === '/venues';
  const [globalAlert, setGlobalAlert] = useState<GlobalAlert>(null);

  return (
    <>
      {isPublic ? (
        <Navbar setGlobalAlert={setGlobalAlert} />
      ) : (
        <NavbarOther setGlobalAlert={setGlobalAlert} />
      )}

      {/* Global Alert */}
      {globalAlert && (
        <div className="position-fixed top-0 end-0 p-3 mt-3" style={{ zIndex: 1050 }}>
          <Alert
            type={globalAlert.type}
            message={globalAlert.message}
            onClose={() => setGlobalAlert(null)}
            autoDismiss={5000}
          />
        </div>
      )}
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
