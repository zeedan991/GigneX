import React, { useState } from 'react';
import { MOCK_GIGS } from '../constants';
import { Search, MapPin, Filter, Star, Clock, CheckCircle } from 'lucide-react';
import { Gig } from '../types';

const FindGigs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [gigType, setGigType] = useState<'all' | 'online' | 'local'>('all');

  const filteredGigs = MOCK_GIGS.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
    const matchesType = gigType === 'all' || gig.type === gigType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = ['All', ...Array.from(new Set(MOCK_GIGS.map(g => g.category)))];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm sticky top-24 transition-colors duration-200 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Filters</h2>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3 text-gray-900 dark:text-gray-200">Gig Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="type" className="accent-primary" checked={gigType === 'all'} onChange={() => setGigType('all')} />
                    <span className="text-sm text-gray-700 dark:text-gray-400">All Gigs</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="type" className="accent-primary" checked={gigType === 'online'} onChange={() => setGigType('online')} />
                    <span className="text-sm text-gray-700 dark:text-gray-400">Online / Remote</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="type" className="accent-primary" checked={gigType === 'local'} onChange={() => setGigType('local')} />
                    <span className="text-sm text-gray-700 dark:text-gray-400">Local Service</span>
                  </label>
                </div>
              </div>

              {/* Budget Range (Visual only for now) */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3 text-gray-900 dark:text-gray-200">Budget Range</h3>
                <input type="range" className="w-full accent-primary h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>₹100</span>
                  <span>₹1L+</span>
                </div>
              </div>

              {/* Category Chips */}
              <div>
                <h3 className="font-semibold text-sm mb-3 text-gray-900 dark:text-gray-200">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        selectedCategory === cat 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Header */}
            <div className="mb-6">
               <div className="relative">
                 <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                 <input 
                    type="text" 
                    placeholder="Search for jobs, skills, or keywords..." 
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Found {filteredGigs.length} opportunities</p>
            </div>

            {/* Gig List */}
            <div className="space-y-4">
              {filteredGigs.map((gig) => (
                <div key={gig.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                          gig.type === 'online' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        }`}>
                          {gig.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {gig.postedDate}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">
                        {gig.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1 font-medium">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          {gig.postedBy.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-current" />
                          {gig.postedBy.rating}
                        </span>
                        {gig.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {gig.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹{gig.budget.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">{gig.budgetType}</div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {gig.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {gig.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{gig.applicants} applicants</span>
                    <button className="bg-dark hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {filteredGigs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No gigs found matching your filters.</p>
                  <button onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setGigType('all')}} className="mt-4 text-primary font-medium hover:underline">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindGigs;