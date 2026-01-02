import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatWithSahayak } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! 🙏 Main GigneX Sahayak hoon. Aapko kaise madad kar sakta hoon? (Hello! How can I help you today?)',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Get AI response
    try {
      const response = await chatWithSahayak(input);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-96 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <div>
              <h3 className="font-bold">GigneX Sahayak</h3>
              <p className="text-sm opacity-90">Your AI Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t dark:border-gray-700 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
