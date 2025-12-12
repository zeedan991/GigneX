import React, { useState } from 'react';
import { generateGigDescription } from '../services/geminiService';
import { Sparkles, Loader2, DollarSign, Calendar, MapPin } from 'lucide-react';

const PostGig: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    skills: '',
    description: '',
    budget: '',
    location: '',
    type: 'online'
  });

  const handleGenerateAI = async () => {
    if (!formData.title) {
      alert("Please enter a job title first.");
      return;
    }
    setLoading(true);
    const desc = await generateGigDescription(formData.title, formData.category, formData.skills);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gig posted successfully! (Simulation)");
    // In a real app, this would send data to the backend
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 transition-colors duration-200">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Post a New Gig</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Get matched with the best talent in minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gig Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., React Developer needed for Fintech App"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>

            {/* Type & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="online">Online / Remote</option>
                  <option value="local">Local Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Web Development</option>
                  <option>Graphic Design</option>
                  <option>Content Writing</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Cleaning</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Location (Conditional) */}
            {formData.type === 'local' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Andheri East, Mumbai"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, TypeScript, Tailwind"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Description with AI */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={loading}
                  className="text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-800 dark:hover:text-purple-300 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Generate with AI
                </button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Describe the job requirements details..."
              ></textarea>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 font-bold">₹</span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="5000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
              >
                Post Gig Now
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                By posting, you agree to our Terms of Service.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostGig;