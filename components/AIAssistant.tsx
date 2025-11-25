import React, { useState, useEffect, useRef } from 'react';
import { getGeminiChat } from '../services/geminiService';
import { ChatMessage, UserPreferences } from '../types';
import { Send, Bot, Mic, ChevronLeft } from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";

interface AIAssistantProps {
  user: UserPreferences;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  onBack: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ user, initialQuery, onClearInitialQuery, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: `Hello ${user.name}! I'm Isus. Ready to tackle your study goals?`,
      sender: 'ai',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSentInitialQuery = useRef(false);

  useEffect(() => {
    if (!chatSession.current) {
      const systemInstruction = `You are Isus, a smart, calm, and professional study assistant. The user's name is ${user.name} and their goal is "${user.goal}". Keep responses concise, structured, and educational. Use Markdown formatting.`;
      chatSession.current = getGeminiChat(systemInstruction);
    }
    scrollToBottom();
  }, [user]);

  // Handle Initial Query from other screens (like StudyHub)
  useEffect(() => {
      if (initialQuery && !hasSentInitialQuery.current && chatSession.current) {
          hasSentInitialQuery.current = true;
          handleSend(initialQuery);
          if (onClearInitialQuery) onClearInitialQuery();
      }
  }, [initialQuery, chatSession.current]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;

    if (!textToSend.trim() || !chatSession.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const resultStream = await chatSession.current.sendMessageStream({ message: userMsg.text });
      
      let fullResponseText = '';
      const aiMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: aiMsgId,
        text: '...',
        sender: 'ai',
        timestamp: Date.now()
      }]);

      for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullResponseText += c.text;
            setMessages(prev => prev.map(msg => 
                msg.id === aiMsgId ? { ...msg, text: fullResponseText } : msg
            ));
        }
      }
    } catch (error) {
      console.error("AI Error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I seem to be having trouble connecting. Could you say that again?",
        sender: 'ai',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-slate-100 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={24} />
        </button>
        <div className="bg-primary-600 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-200">
          <Bot size={22} />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 text-sm">Isus Intelligence</h2>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wide flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-24">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.sender === 'ai' && (
                    <span className="text-[10px] text-slate-400 ml-1 mb-1.5 font-bold uppercase tracking-wider">Isus AI</span>
                )}
                <div
                className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-sm'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]'
                }`}
                >
                    <div className="prose prose-sm prose-slate max-w-none dark:prose-invert">
                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                    </div>
                </div>
                {msg.sender === 'user' && (
                     <span className="text-[10px] text-slate-300 mr-1 mt-1 font-medium">Just now</span>
                )}
            </div>
          </div>
        ))}
        {isLoading && messages.length % 2 === 0 && (
           <div className="flex justify-start">
               <div className="bg-white border border-slate-100 p-5 rounded-3xl rounded-tl-sm flex items-center gap-1.5 w-20 justify-center shadow-sm">
                   <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-[2rem] border border-transparent focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-50 focus-within:bg-white transition-all">
            <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                <Mic size={20} />
            </button>
            <input 
                type="text"
                className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium px-1"
                placeholder="Ask anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isLoading}
                className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-all shadow-lg shadow-primary-200 active:scale-95"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;