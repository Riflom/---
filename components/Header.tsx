import React from 'react';
import { Mic, BookOpen, Activity } from 'lucide-react';

interface HeaderProps {
  currentView: 'trainer' | 'info';
  onNavigate: (view: 'trainer' | 'info') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('trainer')}
        >
          <div className="bg-brand-orange p-2 rounded-lg text-white group-hover:scale-105 transition-transform">
            <Mic size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            Diction<span className="text-brand-orange">Master</span>
          </h1>
        </div>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('trainer')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2
              ${currentView === 'trainer' 
                ? 'bg-brand-blue text-white shadow-lg shadow-blue-200' 
                : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Activity size={16} />
            Тренажёр
          </button>
          
          <button
            onClick={() => onNavigate('info')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2
              ${currentView === 'info' 
                ? 'bg-brand-emerald text-white shadow-lg shadow-emerald-200' 
                : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <BookOpen size={16} />
            Зачем это нужно?
          </button>
        </nav>
      </div>
    </header>
  );
};