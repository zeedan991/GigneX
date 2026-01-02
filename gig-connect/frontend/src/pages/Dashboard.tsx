import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Briefcase, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [earningsData] = useState([
    { month: 'Jan', earnings: 5000 },
    { month: 'Feb', earnings: 8000 },
    { month: 'Mar', earnings: 6500 },
    { month: 'Apr', earnings: 12000 },
    { month: 'May', earnings: 9800 },
    { month: 'Jun', earnings: 15000 },
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Total Earnings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Earnings</p>
                  <h3 className="text-3xl font-bold text-indigo-600">₹{user.totalEarnings?.toLocaleString('en-IN') || '0'}</h3>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg">
                  <TrendingUp className="text-indigo-600 dark:text-indigo-400" size={32} />
                </div>
              </div>
            </div>

            {/* Card 2: Active Jobs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Active Jobs</p>
                  <h3 className="text-3xl font-bold text-green-600">5</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                  <Briefcase className="text-green-600 dark:text-green-400" size={32} />
                </div>
              </div>
            </div>

            {/* Card 3: Rating */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Rating</p>
                  <h3 className="text-3xl font-bold text-yellow-600">{user.rating || '4.5'} ⭐</h3>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                  <Star className="text-yellow-600 dark:text-yellow-400" size={32} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Earnings Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#FFF' }}
                formatter={(value) => value ? `${value.toLocaleString('en-IN')}` : '0'}

              />
              <Legend />
              <Bar dataKey="earnings" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Posted a new gig', date: '2 hours ago', icon: '📝' },
              { action: 'Received a bid', date: '5 hours ago', icon: '💼' },
              { action: 'Completed a job', date: '1 day ago', icon: '✅' },
              { action: 'Got a 5-star review', date: '2 days ago', icon: '⭐' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b dark:border-gray-700 last:border-b-0">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
