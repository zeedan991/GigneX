import React from 'react';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer p-6 border-l-4 border-indigo-600"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{job.description}</p>
        </div>
        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-bold ml-4">
          ₹{job.budget.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Briefcase size={16} />
          <span className="capitalize">{job.type}</span>
        </div>
        {job.location && (
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          {job.bids?.length || 0} Bids
        </span>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
