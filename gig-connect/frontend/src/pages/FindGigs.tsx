import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { jobsAPI } from '../services/api';
import JobCard from '../components/Jobcard';
import type { Job, Filter as FilterType } from '../types';

const FindGigs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterType>({});
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobsAPI.getAll(filters);
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Find Gigs</h1>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-64 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit sticky top-20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h2>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Gig Type</label>
                <select
                  value={filters.type || ''}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                  className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg"
                >
                  <option value="">All</option>
                  <option value="online">Online</option>
                  <option value="local">Local</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Category</label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg"
                >
                  <option value="">All</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Writing">Writing</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Max Budget</label>
                <input
                  type="number"
                  value={filters.maxBudget || ''}
                  onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value ? parseInt(e.target.value) : undefined })}
                  placeholder="₹"
                  className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg"
                />
              </div>

              <button
                onClick={() => setFilters({})}
                className="w-full bg-gray-200 dark:bg-gray-700 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Jobs List */}
          <div className="flex-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mb-4 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Filter size={18} /> Filters
            </button>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No gigs found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindGigs;
