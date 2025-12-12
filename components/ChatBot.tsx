import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Sparkles, Minus } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste! 🙏 I am GigneX Sahayak. I can help you find work, hire people, or learn new skills. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: userMessage } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    const history = newMessages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getChatResponse(history, userMessage);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl rounded-bl-2xl shadow-2xl w-[350px] sm:w-[380px] h-[500px] flex flex-col mb-4 overflow-hidden border border-orange-100 dark:border-gray-700 transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
          
          {/* Traditional Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 flex justify-between items-center relative overflow-hidden">
             {/* Decorative pattern overlay */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '12px 12px' }}></div>
             
             <div className="flex items-center gap-3 relative z-10 text-white">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                   <span className="text-2xl">👳🏽</span>
                </div>
                <div>
                   <h3 className="font-bold text-lg leading-tight">GigneX Sahayak</h3>
                   <span className="text-xs text-orange-100 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online • 24/7 Support
                   </span>
                </div>
             </div>
             
             <div className="flex gap-2 relative z-10">
                <button onClick={() => setIsMinimized(true)} className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                   <Minus className="w-5 h-5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-colors">
                   <X className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 bg-orange-50 dark:bg-gray-900 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f97316\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
             {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                      msg.role === 'user' 
                         ? 'bg-secondary text-white rounded-tr-none' 
                         : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-orange-100 dark:border-gray-700'
                   }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                         {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                   </div>
                </div>
             ))}
             {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 border border-orange-100 dark:border-gray-700 shadow-sm flex items-center gap-2">
                      <div className="flex space-x-1">
                         <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                         <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                         <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Sahayak is typing...</span>
                   </div>
                </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
             <div className="flex gap-2 items-end bg-gray-50 dark:bg-gray-700 p-2 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:border-orange-300 focus-within:ring-1 focus-within:ring-orange-200 transition-all">
                <textarea 
                   className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm max-h-20 p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                   placeholder="Ask me anything... (Hindi/English)"
                   rows={1}
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={handleKeyPress}
                />
                <button 
                   onClick={handleSend}
                   disabled={!input.trim() || isLoading}
                   className={`p-2 rounded-lg transition-colors ${
                      input.trim() && !isLoading 
                         ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                         : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                   }`}
                >
                   <Send className="w-5 h-5" />
                </button>
             </div>
             <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                   <Sparkles className="w-3 h-3 text-orange-400" /> Powered by Gemini AI
                </span>
             </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
        }}
        className={`${
          isOpen && !isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 group`}
      >
        <div className="relative">
           <MessageCircle className="w-7 h-7" />
           <span className="absolute -top-1 -right-1 flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
           </span>
        </div>
        <span className="font-semibold pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
           Chat with Sahayak
        </span>
      </button>
    </div>
  );
};

export default ChatBot;