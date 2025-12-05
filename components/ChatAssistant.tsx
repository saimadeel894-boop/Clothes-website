import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { createStylistChat, StylistChat } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I\'m your AhmedHub AI Stylist. Looking for outfit ideas or something specific?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<StylistChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session on mount
  useEffect(() => {
    try {
      chatRef.current = createStylistChat();
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const result = await chatRef.current.sendMessage({ message: userMsg });
      const text = result.text;

      // Safety check in case text is undefined
      if (text) {
        setMessages(prev => [...prev, { role: 'model', text: text }]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the fashion mainframe right now. Please check your connection or try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center border-2 border-white ${isOpen ? 'bg-gray-200 text-gray-800 rotate-90' : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-110'}`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 left-4 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl shadow-2xl z-40 transition-all duration-300 origin-bottom-right border border-gray-100 flex flex-col overflow-hidden ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ maxHeight: '600px', height: 'calc(100vh - 120px)' }}
      >

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
            <Sparkles className="text-yellow-400" size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold">AI Stylist</h3>
            <p className="text-slate-300 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-700'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot size={14} />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-transparent focus-within:border-orange-500 focus-within:bg-white focus-within:shadow-sm transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for advice..."
              className="flex-1 bg-transparent text-sm outline-none text-slate-900 placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-1.5 rounded-full transition-colors ${input.trim() ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              <Send size={14} />
            </button>
          </div>
          <div className="text-[10px] text-center text-gray-400 mt-2">
            Powered by Google Gemini
          </div>
        </div>
      </div>
    </>
  );
};