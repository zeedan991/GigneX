import React from 'react';
import { User, Gig } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, Star, Clock, Briefcase } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const data = [
  { name: 'Jan', earnings: 12000 },
  { name: 'Feb', earnings: 19000 },
  { name: 'Mar', earnings: 15000 },
  { name: 'Apr', earnings: 28000 },
  { name: 'May', earnings: 22000 },
  { name: 'Jun', earnings: 35000 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Here is what's happening with your gigs today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</p>
            <h3 className="text-2xl font-bold text-dark dark:text-white mt-1">₹35,000</h3>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">+12% from last month</span>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Gigs</p>
            <h3 className="text-2xl font-bold text-dark dark:text-white mt-1">3</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">2 pending completion</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Briefcase className="w-6 h-6 text-secondary" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Rating</p>
            <h3 className="text-2xl font-bold text-dark dark:text-white mt-1">4.8</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Based on 24 reviews</span>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Star className="w-6 h-6 text-accent" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hours Worked</p>
            <h3 className="text-2xl font-bold text-dark dark:text-white mt-1">124h</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">This month</span>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Earnings Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} refX="₹" tick={{fill: '#9CA3AF'}} />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Earnings']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#14a800' }}
                />
                <Bar dataKey="earnings" fill="#14a800" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Payment Received</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">From TechSolutions for "UI Redesign"</p>
                <p className="text-xs font-bold text-primary mt-1">+ ₹12,000</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">2h ago</span>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New Gig Application</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">You applied for "Python Chatbot"</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">5h ago</span>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New Review</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">5 star rating from Rahul Sharma</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">1d ago</span>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-sm text-secondary font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;