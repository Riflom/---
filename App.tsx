import React, { useState } from 'react';
import { Header } from './components/Header';
import { Trainer } from './components/Trainer';
import { WhyItMatters } from './components/WhyItMatters';

function App() {
  const [currentView, setCurrentView] = useState<'trainer' | 'info'>('trainer');

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />
      
      <main className="flex-grow relative">
        {/* Background blobs for visual appeal */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-brand-emerald/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>

        <div className="container mx-auto">
          {currentView === 'trainer' ? (
            <div className="animate-in fade-in duration-500">
              {/* Hero Text */}
              <div className="text-center pt-10 pb-2">
                <h2 className="text-2xl font-light text-slate-500">Тренировка дикции</h2>
                <p className="text-sm text-slate-400 mt-1">Улучшайте свою речь каждый день</p>
              </div>
              
              <Trainer />
            </div>
          ) : (
            <WhyItMatters onBack={() => setCurrentView('trainer')} />
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Diction Master. Работает полностью в браузере.</p>
      </footer>
    </div>
  );
}

export default App;