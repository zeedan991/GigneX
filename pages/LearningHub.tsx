import React from 'react';
import { MOCK_COURSES } from '../constants';
import { Star, Users, PlayCircle } from 'lucide-react';

const LearningHub: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark dark:text-white mb-4">Upskill & Earn More</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Take your career to the next level with industry-recognized courses tailored for the gig economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_COURSES.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-900 px-2 py-1 rounded text-xs font-bold text-gray-800 dark:text-gray-200">
                  {course.level}
                </div>
              </div>
              
              <div className="p-5">
                <div className="text-xs text-primary font-bold uppercase tracking-wide mb-1">{course.category}</div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 h-14">
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{course.instructor}</span>
                  <div className="flex items-center gap-1">
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <span className="text-gray-700 dark:text-gray-300 font-medium">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Users className="w-3 h-3" />
                    {course.students} students
                  </div>
                  <div className="font-bold text-lg text-secondary dark:text-blue-400">
                    {course.price === 0 ? 'Free' : `₹${course.price}`}
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-50 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white text-gray-800 dark:text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                   Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;