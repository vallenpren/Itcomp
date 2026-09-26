import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  HelpCircle, 
  Lightbulb, 
  MessageSquare, 
  CheckCircle2, 
  RotateCcw,
  Zap
} from 'lucide-react';

export default function SocraticAIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo! Aku **Socrates AI Mentor**. Aku di sini bukan untuk langsung memberi jawaban instan, tapi untuk memandu nalar kritis dan pemahaman konsepmu. Materi apa yang sedang ingin kamu eksplor hari ini?',
      timestamp: '11:45',
      showQuiz: true,
      quizData: {
        question: 'Coba tes nalar cepat: Kenapa nilai turunan pertama f\'(x) sama dengan NOL di titik puncak parabola?',
        options: [
          { id: 'A', text: 'Karena di titik puncak, garis singgungnya sejajar horizontal (kemiringan = 0)', isCorrect: true },
          { id: 'B', text: 'Karena titik puncak nilainya selalu minus', isCorrect: false },
          { id: 'C', text: 'Karena nilai x di puncak tidak terdefinisi', isCorrect: false }
        ],
        answered: false,
        selectedOption: null
      }
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "💡 Beri aku analogi dunia nyata",
    "🧩 Uji pemahamanku dengan teka-teki logika",
    "❓ Kenapa rumusnya bisa dapat begitu?"
  ];

  const handleSendMessage = (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate Socratic AI guiding response
    setTimeout(() => {
      let aiText = "Pertanyaan nalar yang sangat tajam! Mari kita bedah bersama: Coba bayangkan sebuah bayangan pohon di siang hari...";
      
      if (textToSend.includes("analogi dunia nyata")) {
        aiText = "💡 **Analogi Dunia Nyata:** Bayangkan fungsi turunan kalkulus $f'(x)$ seperti **spedometer mobil**. Nilai posisi $f(x)$ adalah jarak total yang kamu tempuh, sedangkan $f'(x)$ adalah kecepatan instan jarum spedometer pada detik tersebut!";
      } else if (textToSend.includes("teka-teki logika")) {
        aiText = "🧩 **Teka-teki Socratic:** Jika sebuah mobil melaju dengan rumus jarak $S(t) = 5t^2$, pada detik ke berapa kecepatan jarum spedometer tepat berada di angka 40 m/s? (Petunjuk: Gunakan turunan $S'(t) = 10t$).";
      } else if (textToSend.includes("rumus")) {
        aiText = "❓ **Mengapa Rumus Ini Ada?** Rumus determinan matriks $det(A) = ad - bc$ ditemukan saat matematikawan mencoba menghitung luasan bidang jajaran genjang 2D tanpa memotong kertas!";
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSelectQuizOption = (msgId, optId, isCorrect) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.quizData) {
        return {
          ...m,
          quizData: {
            ...m.quizData,
            answered: true,
            selectedOption: optId
          }
        };
      }
      return m;
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col h-[560px] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      
      {/* Header Bar */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm">Socrates AI Study Buddy</h3>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-300">Mentor Nalar & Analogi Konseptual</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isAi
                    ? 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-none'
                    : 'bg-blue-600 text-white font-medium rounded-tr-none shadow-md shadow-blue-600/20'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {/* Optional Interactive Mini-Poll Quiz inside AI message */}
                {isAi && m.quizData && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-blue-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Kuis Pemantik Nalar Socratic:
                    </span>
                    <p className="font-bold text-slate-900 text-xs">{m.quizData.question}</p>
                    
                    <div className="space-y-1.5 pt-1">
                      {m.quizData.options.map((opt) => {
                        const isSelected = m.quizData.selectedOption === opt.id;
                        let btnStyle = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';

                        if (m.quizData.answered) {
                          if (opt.isCorrect) btnStyle = 'bg-teal-50 text-teal-800 border-teal-300 font-bold';
                          else if (isSelected) btnStyle = 'bg-red-50 text-red-700 border-red-200';
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={m.quizData.answered}
                            onClick={() => handleSelectQuizOption(m.id, opt.id, opt.isCorrect)}
                            className={`w-full text-left p-2 rounded-lg border text-[11px] transition-all flex items-start gap-2 ${btnStyle}`}
                          >
                            <span className="font-extrabold">{opt.id}.</span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[9px] text-slate-400 px-1 font-mono">{m.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <Bot className="w-4 h-4 animate-bounce text-blue-600" />
            <span>Socrates AI sedang meracik nalar...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp)}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[10px] font-bold shrink-0 transition-colors border border-slate-200"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Tanyakan nalar atau konsep materi..."
          className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20"
        />
        <button
          onClick={() => handleSendMessage()}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md shadow-blue-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
