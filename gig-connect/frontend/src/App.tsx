
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/Chatbot';
import Home from './pages/Home';
import FindGigs from './pages/FindGigs';
import PostGig from './pages/PostGigs';
import Dashboard from './pages/Dashboard';
import LearningHub from './pages/LearningHub';
import Auth from './pages/Auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentPage('home');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'find-gigs':
        return <FindGigs />;
      case 'post-gig':
        return user ? <PostGig /> : <Auth onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? <Dashboard /> : <Auth onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'learning':
        return <LearningHub />;
      case 'auth':
        return <Auth onLogin={handleLogin} onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const isAuthPage = currentPage === 'auth';

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        {!isAuthPage && (
          <Navbar
            user={user}
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}

        <main>{renderPage()}</main>

        {!isAuthPage && <Footer />}

        {!isAuthPage && <ChatBot />}
      </div>
    </div>
  );
};

export default App;
