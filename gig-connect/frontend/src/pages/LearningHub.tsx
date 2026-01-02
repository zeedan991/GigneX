import React, { useState, useEffect } from 'react';
import { coursesAPI } from '../services/api';
import { Star, Users, Clock,  } from 'lucide-react';
import type { Course } from '../types';

const LearningHub: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(courses.map((c) => c.category))];
  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Learning Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Upskill yourself with our curated vocational and tech courses
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 flex items-center justify-center">
                  <div className="text-white text-5xl">📚</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{course.description}</p>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users size={16} />
                      <span>{course.students.toLocaleString('en-IN')} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                    <span className="text-xl font-bold text-indigo-600">
                      {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;
