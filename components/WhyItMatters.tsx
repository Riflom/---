import React from 'react';
import { GraduationCap, Briefcase, Smile, Mic2, ArrowLeft } from 'lucide-react';

interface WhyItMattersProps {
  onBack: () => void;
}

export const WhyItMatters: React.FC<WhyItMattersProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Сила голоса — ваш инструмент успеха
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Чёткая дикция — это не только про красивое звучание. Это про уверенность,
          понимание и способность доносить свои мысли до окружающих.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-brand-blue rounded-xl flex items-center justify-center mb-6">
            <GraduationCap size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Для учёбы и науки</h3>
          <p className="text-slate-600 leading-relaxed">
            Защита диплома, выступление с докладом или участие в дебатах требуют
            ясности речи. Уверенная подача материала повышает оценку компетентности
            в глазах преподавателей и коллег.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-orange-100 text-brand-orange rounded-xl flex items-center justify-center mb-6">
            <Briefcase size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">В карьере</h3>
          <p className="text-slate-600 leading-relaxed">
            Вне зависимости от профессии, будь то продажи, менеджмент или IT,
            умение чётко формулировать мысли — ключевой навык лидера. Вас будут
            слушать и слышать.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-brand-emerald rounded-xl flex items-center justify-center mb-6">
            <Smile size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">В повседневной жизни</h3>
          <p className="text-slate-600 leading-relaxed">
            Хорошая дикция избавляет от необходимости повторять сказанное дважды.
            Это делает общение лёгким и приятным, повышает вашу социальную уверенность.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
            <Mic2 size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Цифровая среда</h3>
          <p className="text-slate-600 leading-relaxed">
            В эпоху Zoom, подкастов и голосовых сообщений качество вашего голоса
            становится вашей визитной карточкой в цифровом пространстве.
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        >
          <ArrowLeft size={20} />
          Вернуться к тренировке
        </button>
      </div>
    </div>
  );
};