import { useEffect } from 'react';
import './App.css';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { DEFAULT_USERNAME } from './utils/constants';

function App() {
  useEffect(() => {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      window.history.replaceState(null, '', `/${DEFAULT_USERNAME}`);
    }
  }, []);

  return <ProfilePage />;
}

export default App;
