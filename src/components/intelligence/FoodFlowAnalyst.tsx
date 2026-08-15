'use client';

import React, { useState } from 'react';
import { FoodFlowAnalystMessage } from '@/types';
import { BrainCircuit, Send, Sparkles, LineChart, Truck, AlertTriangle } from 'lucide-react';

interface FoodFlowAnalystProps {
  initialMessages: FoodFlowAnalystMessage[];
}

export function FoodFlowAnalyst({ initialMessages }: FoodFlowAnalystProps) {
  const [messages, setMessages] = useState<FoodFlowAnalystMessage[]>(initialMessages);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg: FoodFlowAnalystMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputQuery,
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = inputQuery;
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `Based on Gamo Food System models, harvest forecasts for ${currentQuery.includes('Maize') ? 'Maize' : 'agricultural supply'} indicate high spatial density around Arba Minch Zuria with transport fleet capacity reaching maximum limits during Wk 43 peak.`;
      
      if (currentQuery.toLowerCase().includes('reroute') || currentQuery.toLowerCase().includes('route')) {
        replyText = 'Re-routing recommendations: Re-allocate 20 tons of flatbed truck capacity from Chencha Highland spur to the Arba Minch – Mirab Abaya corridor. Expected margin optimization: +14.8%.';
      }

      const aiMsg: FoodFlowAnalystMessage = {
        id: `ai-${Date.now()}`,
        sender: 'analyst',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: replyText,
        evidenceCards: [
          {
            type: 'capacity',
            title: 'Fleet Capacity Evaluation',
            stat: '412t Available',
            detail: 'Evaluated across 4 active Gamo transport cooperatives',
          },
          {
            type: 'risk',
            title: 'Escarpment Bottleneck',
            stat: '+45m Transit Delay',
            detail: 'Route A7 slowdown detected on Chencha Pass',
          },
        ],
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="foodflow-card flex flex-col h-[580px] bg-white overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 bg-[#09281C] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300">
            <BrainCircuit className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-xs tracking-tight text-white flex items-center gap-2">
              FoodFlow Intelligence Analyst
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-950 text-emerald-300 rounded border border-emerald-700">
                Decision Support
              </span>
            </h3>
            <p className="text-[11px] text-emerald-200/70">AI agricultural coordination assistant for Gamo</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Quick Buttons */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        <span className="text-slate-400 text-[11px] shrink-0 font-normal">Quick Queries:</span>
        {[
          'Why is Zone A at risk?',
          'What is the Maize price outlook?',
          'How to solve Arba Minch bottleneck?',
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInputQuery(q)}
            className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-[#155D3B] text-[11px] rounded-full shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-4 text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#155D3B] text-white rounded-br-none'
                  : 'bg-slate-100 border border-slate-200 text-slate-900 rounded-bl-none space-y-3'
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/40 pb-1 mb-1">
                <span className="font-bold text-[10px] uppercase tracking-wider opacity-75">
                  {msg.sender === 'user' ? 'Coordinator' : 'FoodFlow Analyst System'}
                </span>
                <span className="text-[10px] opacity-60 font-mono">{msg.timestamp}</span>
              </div>

              <p className="leading-relaxed font-medium">{msg.text}</p>

              {msg.evidenceCards && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  {msg.evidenceCards.map((card, cIdx) => (
                    <div key={cIdx} className="bg-white rounded-lg p-2.5 border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">{card.title}</div>
                      <div className="text-sm font-extrabold text-[#7C4A21] mt-0.5">{card.stat}</div>
                      <div className="text-[10px] text-slate-500 mt-1 leading-snug">{card.detail}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 p-2">
            <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Analyzing Gamo GIS models and supply chain telemetry...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask FoodFlow Analyst about harvest, transport, prices, or routes..."
          className="flex-1 bg-white border border-slate-300 text-slate-900 text-xs rounded-lg px-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#155D3B]"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="px-4 py-2.5 bg-[#155D3B] hover:bg-[#0F472D] disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask AI</span>
        </button>
      </form>
    </div>
  );
}
