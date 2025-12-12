import React, { useState } from 'react';
import { Menu, X, Globe, User, LogOut, Briefcase, PlusCircle, BookOpen, Home, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { PageView, User as UserType } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  user: UserType | null;
  onLogout: () => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onLogout, isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'find-gigs', label: 'Find Gigs', icon: Briefcase },
    { id: 'post-gig', label: 'Post Gig', icon: PlusCircle },
    { id: 'learning', label: 'Learn Skills', icon: BookOpen },
  ];

  if (user) {
      navItems.push({ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard });
  }

  const handleNav = (page: string) => {
      onNavigate(page as PageView);
      setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">G</div>
              <span className="font-bold text-xl text-dark dark:text-white tracking-tight">GigneX</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'text-primary bg-green-50 dark:bg-green-900/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {toggleDarkMode && (
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center text-gray-500 dark:text-gray-300 hover:text-primary"
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{lang === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>
            
            {user ? (
               <div className="flex items-center gap-3 pl-4 border-l dark:border-gray-700">
                 <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</span>
                 </div>
                 <button onClick={onLogout} className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                    <LogOut className="w-5 h-5" />
                 </button>
               </div>
            ) : (
              <div className="flex items-center gap-2">
                 <button 
                    onClick={() => handleNav('auth')} 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium px-3 py-2"
                  >
                    Log In
                 </button>
                 <button 
                    onClick={() => handleNav('auth')}
                    className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                 >
                    Sign Up
                 </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            {/* Mobile Dark Mode Toggle */}
             {toggleDarkMode && (
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center w-full gap-3 px-3 py-3 rounded-md text-base font-medium ${
                  currentPage === item.id 
                    ? 'text-primary bg-green-50 dark:bg-green-900/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            {!user && (
                 <button
                 onClick={() => handleNav('auth')}
                 className="flex items-center w-full gap-3 px-3 py-3 rounded-md text-base font-medium text-primary hover:bg-green-50 dark:hover:bg-green-900/20"
               >
                 <User className="w-5 h-5" />
                 Login / Sign Up
               </button>
            )}
            {user && (
                 <button
                 onClick={onLogout}
                 className="flex items-center w-full gap-3 px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
               >
                 <LogOut className="w-5 h-5" />
                 Logout
               </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;