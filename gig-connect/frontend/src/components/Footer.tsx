import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">GigneX</h3>
            <p className="text-gray-400">India's premier gig marketplace for freelancers and local services.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Find Work</li>
              <li>Pricing</li>
              <li>Profile Tips</li>
              <li>Safety</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">For Clients</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Post a Job</li>
              <li>How It Works</li>
              <li>Plans</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2025 GigneX. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
