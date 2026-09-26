import React, { useState } from 'react';
import { Bot, Send, X, Lightbulb, ChevronRight } from 'lucide-react';

export default function SocraticMentorDrawer({ isOpen, onClose, activeExperiment }) {
  const [inputMsg, setInputMsg] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'mentor',
      text: `Halo! Saya Mentor AI Sokratik untuk eksperimen **${activeExperiment?.title || 'Concept Lab'}**. Tanyakan pada saya: Mengapa perubahan angka slider memicu reaksi tertentu?`
    }
  ]);

  if (!isOpen || !activeExperiment) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    // Append user message
    const userEntry = { sender: 'user', text: query };
    
    // Generate Socratic response
    let answerText = `Dalam rumus **${activeExperiment.formula}**, setiap variabel terikat secara langsung. Ketika angka slider diubah, hukum sebab-akibat terjadi karena hubungan proporsional atau invers kuadrat. Coba amati bagaimana turunan dan variabel berinteraksi!`;

    // Check if matching any socratic questions
    if (activeExperiment.socraticQuestions) {
      const matched = activeExperiment.socraticQuestions.find(
        (sq) => query.toLowerCase().includes(sq.q.substring(0, 15).toLowerCase())
      );
      if (matched) {
        answerText = `💡 **Petunjuk Sokratik:** ${matched.hint}`;
      }
    }

    setChatLog((prev) => [
      ...prev,
      userEntry,
      { sender: 'mentor', text: answerText }
    ]);

    if (!textToSend) setInputMsg('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white border-l border-slate-200 shadow-xl flex flex-col transition-all duration-300">
      
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm text-slate-900">AI Socratic Mentor</h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                Sebab-Akibat
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
              {activeExperiment.title}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Recommended Socratic Questions */}
      {activeExperiment.socraticQuestions && activeExperiment.socraticQuestions.length > 0 && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Pertanyaan Penalaran Sokratik:</span>
          </div>
          <div className="space-y-1.5">
            {activeExperiment.socraticQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.q)}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between group transition-all shadow-xs"
              >
                <span className="line-clamp-2">{item.q}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        {chatLog.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-xs font-medium'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {msg.sender === 'user' ? 'Anda' : 'Socrates AI'}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Tanyakan sebab-akibat perubahan variabel..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
