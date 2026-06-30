"use client";

import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm the digital version of Montassar. I can answer questions about my engineering experience, ROS projects, or availability. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add user message to UI immediately
    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      // 2. Send the message to your Next.js backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      // 3. Add the real backend response to the UI
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.message }
      ]);
      
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Warning: Connection to main engine lost. Please check your network or console." }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      
      {/* Animated Attention Grabber (Disappears when open) */}
      {!isOpen && (
        <div className="mb-4 mr-2 animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-white/50 text-sm font-semibold flex items-center gap-2">
            <span className="animate-wave text-lg">👋</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Chat with Montassar AI
            </span>
          </div>
          <div className="w-3 h-3 bg-white/90 border-r border-b border-white/50 transform rotate-45 absolute -bottom-1.5 right-6"></div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[380px] h-[550px] bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/60 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-6 duration-300 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-white/50 backdrop-blur-md border-b border-white/40 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
                    <img src="/profile.jpg" alt="Montassar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="font-bold text-gray-900 leading-none mb-1">Montassar AI</div>
                <div className="text-xs text-purple-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></span> Agent Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 hover:bg-gray-200 text-gray-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-gradient-to-b from-transparent to-white/30 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none" 
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-4 bg-white/80 backdrop-blur-md border-t border-white/50">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-gray-100/50 border border-gray-200 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all"
              />
              <button type="submit" className="absolute right-1.5 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors shadow-md disabled:opacity-50">
                <svg className="w-4 h-4 transform translate-x-px -translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Avatar Trigger Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="relative group focus:outline-none">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-30 group-hover:opacity-50 animate-pulse blur-md transition-opacity"></div>
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 p-[2px] shadow-2xl transform transition-transform duration-300 hover:scale-105">
          <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center relative">
            <img src="/profile.jpg" alt="Montassar" className="w-full h-full object-cover" />
            {isOpen && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
            )}
          </div>
        </div>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        .animate-wave { display: inline-block; animation: wave 1.5s infinite; transform-origin: 70% 70%; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}