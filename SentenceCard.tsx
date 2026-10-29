import React, { useState } from 'react';
import { Volume2, Eye, EyeOff } from 'lucide-react';
import { speakSpanish, playClickSound } from './audioHelper';
import { lookupWord } from './dictionaryData';
import { WordInfo } from './types';

interface SentenceCardProps {
  textEs: string;
  textHy: string;
  speakerName?: string;
  speakerAvatar?: string;
  onInspectWord: (info: WordInfo) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const SentenceCard: React.FC<SentenceCardProps> = ({
  textEs,
  textHy,
  speakerName,
  speakerAvatar,
  onInspectWord,
  className = '',
  defaultExpanded = false,
}) => {
  const [showTranslation, setShowTranslation] = useState<boolean>(defaultExpanded);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Split words while preserving punctuation
  const words = textEs.split(/(\s+|[.,!¡?¿;:"])/).filter(Boolean);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    await speakSpanish(textEs);
    setIsSpeaking(false);
  };

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    playClickSound();
    const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»¡¿]/g, '').trim();
    if (clean.length > 0) {
      const info = lookupWord(clean);
      onInspectWord(info);
    }
  };

  const toggleTranslation = () => {
    playClickSound();
    setShowTranslation(prev => !prev);
  };

  return (
    <div
      onClick={toggleTranslation}
      className={`group relative p-4 rounded-2xl bg-white border border-[#E5D5C5] shadow-xs hover:shadow-md transition-all cursor-pointer ${
        showTranslation ? 'border-[#780016]/40 bg-gradient-to-b from-white to-[#FAF6F0]' : ''
      } ${className}`}
      title="Սեղմեք ամբողջ նախադասության վրա թարգմանությունը բացելու / փակելու համար"
    >
      {/* Speaker header if present */}
      {speakerName && (
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#E5D5C5]/60">
          {speakerAvatar && <span className="text-xl">{speakerAvatar}</span>}
          <span className="text-xs font-bold text-[#780016] uppercase tracking-wide">
            {speakerName}
          </span>
        </div>
      )}

      {/* Spanish words (clickable individually) */}
      <div className="flex items-start justify-between gap-3">
        <div className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed flex-1 flex flex-wrap items-center">
          {words.map((w, idx) => {
            const isPunctuationOrSpace = /^[\s.,!¡?¿;:"]+$/.test(w);
            if (isPunctuationOrSpace) {
              return <span key={idx}>{w}</span>;
            }
            return (
              <span
                key={idx}
                onClick={(e) => handleWordClick(e, w)}
                className="inline-block px-1 py-0.5 rounded-md hover:bg-orange-100 hover:text-[#780016] hover:underline decoration-[#EA580C] decoration-2 transition-colors cursor-pointer select-none"
                title={`Սեղմեք բառարանային քարտը դիտելու համար՝ "${w}"`}
              >
                {w}
              </span>
            );
          })}
        </div>

        {/* Audio speech button */}
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={`shrink-0 p-2.5 rounded-xl transition-all ${
            isSpeaking
              ? 'bg-[#EA580C] text-white animate-pulse'
              : 'bg-orange-50 text-[#EA580C] hover:bg-[#EA580C] hover:text-white'
          } shadow-xs cursor-pointer`}
          title="Escuchar en español"
          aria-label="Escuchar en español"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Armenian translation toggle strip */}
      <div className="mt-2.5 pt-2 flex items-center justify-between border-t border-dashed border-[#E5D5C5]">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#780016]/80">
          {showTranslation ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Փակել թարգմանությունը</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Սեղմեք հայերեն թարգմանության համար</span>
            </>
          )}
        </div>
        <span className="text-[10px] text-gray-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          Հպեք ցանկացած բառի
        </span>
      </div>

      {/* Armenian translation content */}
      {showTranslation && (
        <div className="mt-2 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 animate-in fade-in duration-150">
          <p className="text-sm font-semibold text-[#2A1810] leading-snug">
            {textHy}
          </p>
        </div>
      )}
    </div>
  );
};
