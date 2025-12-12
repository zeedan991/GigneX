import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FindGigs from './pages/FindGigs';
import PostGig from './pages/PostGig';
import LearningHub from './pages/LearningHub';
import Auth from './pages/Auth';
import ChatBot from './components/ChatBot';
import { PageView, User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? <Dashboard user={user} /> : <Auth onLogin={handleLogin} />;
      case 'find-gigs':
        return <FindGigs />;
      case 'post-gig':
        return <PostGig />;
      case 'learning':
        return <LearningHub />;
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  // Hide Navbar/Footer on Auth page for cleaner look
  const isAuthPage = currentPage === 'auth';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {!isAuthPage && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          user={user} 
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {!isAuthPage && <Footer />}
      
      {/* AI Chatbot available on all pages except Auth */}
      {!isAuthPage && <ChatBot />}
    </div>
  );
};

export default App;