import React, { useState } from 'react';
import { authAPI } from '../services/api';

interface AuthProps {
  onLogin: (user: any) => void;
  onNavigate: (page: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate: _onNavigate }) => {
  // Keeping onNavigate for future use, prefixed with _ to indicate it's unused

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'worker',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await authAPI.login(formData.email, formData.password);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
      } else {
        // Register
        const response = await authAPI.register(
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center py-12">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-2">GigneX</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {isLogin ? 'Welcome Back' : 'Join Our Community'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field (Register Only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full p-3 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Role Field (Register Only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-2">I am a</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-3 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="worker">Freelancer/Worker</option>
                <option value="client">Client/Employer</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-bold"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-700 font-bold ml-2"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
