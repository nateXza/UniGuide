'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        <div className="chat-header">
          <div className="chat-header-title">
            <Bot size={20} className="header-icon" />
            <span>UniGuide Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-state">
              <Bot size={40} className="empty-icon" />
              <h3>Hi, I'm your UniGuide Counselor!</h3>
              <p>Ask me about universities, APS scores, NSFAS, or career advice.</p>
            </div>
          )}
          
          {messages.map(m => (
            <div key={m.id} className={`message-wrapper ${m.role === 'user' ? 'user' : 'assistant'}`}>
              <div className="message-icon">
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="message-bubble">
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-wrapper assistant">
              <div className="message-icon"><Bot size={16} /></div>
              <div className="message-bubble typing-indicator">
                <Loader2 size={16} className="spinner" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            className="chat-input"
            value={input}
            placeholder="Type your question..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input?.trim()} className="send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button 
        className={`chat-fab ${isOpen ? 'hidden' : 'visible'}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
