'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Merhaba! Ben Mehmet'in yapay zeka asistanıyım. Projeleri, teknik yetenekleri veya deneyimleri hakkında bana her şeyi sorabilirsin. Nasıl yardımcı olabilirim?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mesaj gelince en aşağı kaydır
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // API'ye istek at (Daha önce kurduğumuz /api/chat endpoint'i)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }] 
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Üzgünüm, şu an bağlantıda bir sorun var. Lütfen daha sonra tekrar dene." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. ANA KAPSAYICIYI ŞEFFAF YAPTIK (bg-transparent) ve çerçeveleri kaldırdık
    <div className="relative w-full h-full flex flex-col bg-transparent">
      
      {/* --- Header Kısmı --- */}
      {/* Arka planı (bg-gray-800/50) yerine daha şeffaf (bg-white/5) yaptık */}
      <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Burchan'ın Asistanı</h3>
            <p className="hidden lg:flex text-blue-400 text-xs items-center gap-1">
              <Sparkles className="w-3 h-3" /> Yapay Zeka Destekli
            </p>
          </div>
        </div>
        <div className="px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
          Beta
        </div>
      </div>

      {/* --- Mesaj Alanı --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {/* ... Mesaj map işlemleri AYNI KALACAK ... */}
        {/* Sadece mesaj baloncuklarının renkleri kalacak, arka plan zaten şeffaf */}
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
               {/* ... İkonlar ve Baloncuklar AYNI KALSIN ... */}
               {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-white/10">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-800/60 text-gray-200 border border-white/5 rounded-bl-none' // Burayı biraz şeffaflaştırdım (/80 -> /60)
                }`}
              >
                {m.content}
              </div>
               {/* ... User İkonu AYNI KALSIN ... */}
               {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-400 text-xs ml-12"
          >
            <Loader2 className="w-3 h-3 animate-spin" />
            Mehmet yazıyor...
          </motion.div>
        )}
      </div>

      {/* --- Input Kısmı --- */}
      {/* Arka planı daha şeffaf yaptık (bg-white/5) */}
      <div className="p-4 bg-white/5 border-t border-white/5">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Bir soru sor..."
            // Input arka planını da şeffaflaştırdık (bg-black/20)
            className="w-full bg-black/20 text-white border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
      
      {/* Arkaplan Glow Efekti - Bunu kaldırabiliriz çünkü arkada çizgiler var, karışmasın */}
      {/* <div className="absolute -z-10 top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none"></div> */}
    </div>
  );
}