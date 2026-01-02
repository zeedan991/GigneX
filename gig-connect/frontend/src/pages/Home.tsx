import React from 'react';
import { Search, MapPin, Briefcase, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [searchLocation, setSearchLocation] = React.useState('');

  const handleSearch = () => {
    // Navigate to FindGigs with search params
    onNavigate('find-gigs');
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Find Work You Love</h1>
          <p className="text-xl mb-12 opacity-90">
            Connect with freelancers or hire experts. India's most trusted gig marketplace.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="What work do you need done?"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-0 focus:outline-none text-gray-900"
                />
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="City or Online"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-0 focus:outline-none text-gray-900"
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition font-bold"
              >
                Search
              </button>
            </div>
          </div>

          <p className="text-sm opacity-75 mt-4">Popular: Web Development • Logo Design • Content Writing • Digital Marketing</p>
        </div>
      </div>

      {/* Two Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Find Your Way</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Local Services Card */}
          <div
            onClick={() => onNavigate('find-gigs')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="mb-6">
              <div className="bg-blue-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Briefcase size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Local Services</h3>
            <p className="text-blue-100 mb-6">
              Find plumbers, electricians, painters, and other local service providers in your area.
            </p>
            <div className="flex items-center gap-2">
              <span>Browse Local Jobs</span>
              <ArrowRight size={20} />
            </div>
          </div>

          {/* Online Work Card */}
          <div
            onClick={() => onNavigate('find-gigs')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-8 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="mb-6">
              <div className="bg-purple-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Briefcase size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Online Work</h3>
            <p className="text-purple-100 mb-6">
              Explore freelance opportunities in design, development, writing, and digital marketing.
            </p>
            <div className="flex items-center gap-2">
              <span>Browse Online Jobs</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GigneX?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Secure Payments', description: 'Safe and secure payment methods with buyer protection.' },
              { title: 'Verified Users', description: 'All users are verified to ensure quality and safety.' },
              { title: 'AI-Powered', description: 'AI assistance for job descriptions and skill matching.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-indigo-600 dark:text-indigo-400" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
