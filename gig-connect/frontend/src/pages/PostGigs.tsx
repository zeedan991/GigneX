import React, { useState } from 'react';
import { jobsAPI } from '../services/api';
import { Wand2 } from 'lucide-react';

const PostGig: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    budget: '',
    type: 'online',
    skills: '',
    location: '',
  });
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

   
  const handleGenerateDescription = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title first!');
      return;
    }

    setGenerating(true);
    try {
      const response = await jobsAPI.generateDescription(formData.title);
      setFormData((prev) => ({
        ...prev,
        description: response.data.description,
      }));
    } catch (error) {
      console.error('Error generating description:', error);
      alert('Error generating description. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      const jobData = {
        ...formData,
        budget: parseInt(formData.budget),
        skills: skillsArray,
      };

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await jobsAPI.create(jobData, user.id);

      alert('✅ Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'Development',
        budget: '',
        type: 'online',
        skills: '',
        location: '',
      });
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Post a Gig</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold mb-2">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Build a React E-commerce Website"
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold">Job Description *</label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={generating}
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-sm"
              >
                <Wand2 size={16} />
                {generating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the job in detail..."
              rows={6}
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
              <option value="Local Services">Local Services</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-bold mb-2">Budget (₹) *</label>
            <input
              type="number"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="₹"
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-bold mb-2">Job Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="online">Online</option>
              <option value="local">Local</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-bold mb-2">Required Skills (comma-separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="React, Node.js, MongoDB"
              className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Location */}
          {formData.type === 'local' && (
            <div>
              <label className="block text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State"
                className="w-full p-3 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-bold"
          >
            {submitting ? 'Posting...' : 'Post Gig'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostGig;
