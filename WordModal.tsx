import React from 'react';
import { Volume2, X, Sparkles } from 'lucide-react';
import { WordInfo } from './types';
import { speakSpanish, playClickSound } from './audioHelper';

interface WordModalProps {
  wordInfo: WordInfo | null;
  onClose: () => void;
}

export const WordModal: React.FC<WordModalProps> = ({ wordInfo, onClose }) => {
  if (!wordInfo) return null;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakSpanish(wordInfo.word);
  };

  const handleSpeakExample = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakSpanish(wordInfo.exampleEs);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-[#780016]/20 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with burgundy gradient */}
        <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-200">
              {wordInfo.partOfSpeech || 'Բառարան'}
            </span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* 1. Spanish Word & Audio */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-extrabold text-[#780016] tracking-tight">
                {wordInfo.word}
              </h3>
              {/* 3. Pronunciation */}
              <div className="text-xs font-mono text-[#EA580C] font-semibold mt-1 bg-amber-50 px-2 py-1 rounded-md inline-block border border-amber-200">
                🔊 {wordInfo.pronunciation}
              </div>
            </div>

            <button
              onClick={handleSpeak}
              className="p-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              title="Escuchar pronunciación"
            >
              <Volume2 className="w-5 h-5" />
              <span className="text-xs font-bold">Escuchar</span>
            </button>
          </div>

          {/* 2. Armenian Translation */}
          <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#780016]/70 block mb-1">
              Հայերեն թարգմանություն
            </span>
            <p className="text-lg font-bold text-gray-900 leading-snug">
              {wordInfo.translationHy}
            </p>
          </div>

          {/* 4. Example in Spanish & 5. Armenian Translation */}
          <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                Օրինակ կոնտեքստում (Ejemplo)
              </span>
              <button
                onClick={handleSpeakExample}
                className="text-[#EA580C] hover:text-[#C2410C] p-1 rounded-md hover:bg-orange-100 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Լսել</span>
              </button>
            </div>

            <p className="text-sm font-semibold text-gray-800 italic">
              «{wordInfo.exampleEs}»
            </p>
            <p className="text-sm text-gray-600 font-medium">
              «{wordInfo.exampleHy}»
            </p>
          </div>

          {/* Close Action */}
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-full py-2.5 bg-[#780016] hover:bg-[#600012] text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Փակել (Cerrar)
          </button>
        </div>
      </div>
    </div>
  );
};
