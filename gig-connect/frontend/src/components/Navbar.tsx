import React from "react";

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          Gignex
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <button onClick={() => onNavigate("find-gigs")} className="hover:text-blue-600">
            Find Gigs
          </button>

          <button onClick={() => onNavigate("post-gig")} className="hover:text-blue-600">
            Post Gig
          </button>

          <button onClick={() => onNavigate("learning")} className="hover:text-blue-600">
            Learn
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="px-3 py-1 rounded-md border text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>

          {/* Auth */}
          {user ? (
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => onNavigate("auth")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
