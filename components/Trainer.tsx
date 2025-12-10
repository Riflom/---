import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, RefreshCw, Mic, Volume2, Award, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Exercise, Difficulty, HistoryItem } from '../types';
import { EXERCISES } from '../data';

// --- Type Augmentation for Web Speech API ---
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface TrainerProps {
  initialDifficulty?: Difficulty;
}

export const Trainer: React.FC<TrainerProps> = ({ initialDifficulty = Difficulty.Beginner }) => {
  // --- State ---
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [feedback, setFeedback] = useState<'neutral' | 'match' | 'mismatch'>('neutral');

  // --- Refs ---
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // --- Initialization ---
  useEffect(() => {
    // Load progress
    const storedHistory = localStorage.getItem('diction_history');
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory) as HistoryItem[];
      setHistoryCount(parsed.length);
    }
    pickRandomExercise(difficulty);

    // Init Speech Recognition if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'ru-RU';
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update exercise when difficulty changes
  useEffect(() => {
    pickRandomExercise(difficulty);
  }, [difficulty]);

  // --- Logic ---

  const pickRandomExercise = (diff: Difficulty) => {
    const filtered = EXERCISES.filter(e => e.difficulty === diff);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setExercise(random);
    resetState();
  };

  const resetState = () => {
    setAudioUrl(null);
    setTranscript('');
    setIsRecording(false);
    setIsListening(false);
    setFeedback('neutral');
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          stream.getTracks().forEach(track => track.stop()); // Clean up
        };

        mediaRecorder.start();
        setIsRecording(true);
        setAudioUrl(null);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Не удалось получить доступ к микрофону. Проверьте разрешения.");
      }
    }
  };

  const toggleRecognition = () => {
    if (!recognitionRef.current) {
      alert("Ваш браузер не поддерживает распознавание речи (попробуйте Chrome или Edge).");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedback('neutral');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Compare transcript with target text roughly
  useEffect(() => {
    if (!isListening && transcript && exercise) {
      // Clean texts for comparison
      const normalize = (s: string) => s.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ");
      const tNorm = normalize(transcript);
      const eNorm = normalize(exercise.text);

      // Simple similarity check (contains significant overlap)
      if (eNorm.includes(tNorm) || tNorm.includes(eNorm) || (tNorm.length > 5 && eNorm.startsWith(tNorm.substring(0, 5)))) {
        setFeedback('match');
        saveProgress();
      } else {
        setFeedback('mismatch');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript]);

  const saveProgress = () => {
    if (!exercise) return;
    const history = JSON.parse(localStorage.getItem('diction_history') || '[]');
    const newItem: HistoryItem = {
      exerciseId: exercise.id,
      date: new Date().toISOString()
    };
    history.push(newItem);
    localStorage.setItem('diction_history', JSON.stringify(history));
    setHistoryCount(history.length);
  };

  if (!exercise) return <div className="p-10 text-center">Загрузка...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Level Selector */}
      <div className="flex justify-center mb-8 gap-2">
        {(Object.keys(Difficulty) as Array<keyof typeof Difficulty>).map((key) => {
           const val = Difficulty[key];
           return (
            <button
              key={val}
              onClick={() => setDifficulty(val)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                ${difficulty === val
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
            >
              {val === Difficulty.Beginner ? 'Начальный' : val === Difficulty.Intermediate ? 'Средний' : 'Продвинутый'}
            </button>
           );
        })}
      </div>

      {/* Main Exercise Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative min-h-[400px] flex flex-col items-center justify-center p-8 text-center transition-all duration-300">
        
        {/* Category Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
           <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-full">
             {exercise.category === 'TongueTwister' ? 'Скороговорка' : exercise.category === 'Articulation' ? 'Артикуляция' : 'Текст'}
           </span>
        </div>

        {/* Text Display */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-8 max-w-2xl animate-in zoom-in duration-300">
          {exercise.text}
        </h2>

        {/* Dynamic Transcript Overlay */}
        {transcript && (
          <div className={`mt-4 p-4 rounded-xl max-w-2xl w-full text-lg font-medium transition-colors duration-300
            ${feedback === 'match' ? 'bg-green-50 text-green-700 border border-green-100' : 
              feedback === 'mismatch' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-slate-50 text-slate-600'}`}>
            <div className="flex items-center gap-2 justify-center mb-1 text-xs uppercase tracking-wide opacity-70">
              {feedback === 'match' ? <CheckCircle2 size={14} /> : feedback === 'mismatch' ? <AlertCircle size={14} /> : <Mic size={14} />}
              {feedback === 'match' ? 'Отлично!' : feedback === 'mismatch' ? 'Попробуйте четче' : 'Слушаю...'}
            </div>
            "{transcript}"
          </div>
        )}

        {/* Audio Playback */}
        {audioUrl && !isRecording && (
          <div className="mt-6 flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-full animate-in slide-in-from-bottom-2">
            <button 
              onClick={() => { const a = new Audio(audioUrl); a.play(); }}
              className="flex items-center gap-2 text-brand-blue font-semibold hover:text-blue-700"
            >
              <Volume2 size={20} />
              Прослушать запись
            </button>
            <button 
              onClick={() => setAudioUrl(null)}
              className="text-slate-400 hover:text-red-500 text-xs"
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Record Button */}
        <button
          onClick={toggleRecording}
          disabled={isListening}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-200 group
            ${isRecording 
              ? 'bg-red-50 border-red-200 text-red-600' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-brand-orange/50 hover:shadow-lg hover:shadow-orange-100'}`}
        >
          <div className={`p-4 rounded-full mb-2 transition-all ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-slate-100 group-hover:bg-orange-50 group-hover:text-brand-orange'}`}>
            {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
          </div>
          <span className="font-semibold">{isRecording ? 'Стоп' : 'Записать речь'}</span>
        </button>

        {/* Recognize Button */}
        <button
          onClick={toggleRecognition}
          disabled={isRecording}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-200 group
            ${isListening 
              ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-brand-blue/50 hover:shadow-lg hover:shadow-blue-100'}`}
        >
          <div className={`p-4 rounded-full mb-2 transition-all ${isListening ? 'bg-brand-blue text-white animate-bounce' : 'bg-slate-100 group-hover:bg-blue-50 group-hover:text-brand-blue'}`}>
            <Activity size={24} />
          </div>
          <span className="font-semibold">{isListening ? 'Слушаю...' : 'Проверить дикцию'}</span>
        </button>

        {/* Next Button */}
        <button
          onClick={() => pickRandomExercise(difficulty)}
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
        >
          <div className="p-4 rounded-full bg-slate-100 text-slate-500 mb-2 group-hover:rotate-180 transition-transform duration-500">
            <RefreshCw size={24} />
          </div>
          <span className="font-semibold">След. упражнение</span>
        </button>
      </div>

      {/* Progress Footer */}
      <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm">
        <Award size={16} />
        <span>Выполнено упражнений: <span className="font-bold text-slate-600">{historyCount}</span></span>
      </div>
    </div>
  );
};

// Simple icon for activity
function Activity({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}