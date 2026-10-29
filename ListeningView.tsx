import React, { useState } from 'react';
import { ListeningExercise, WordInfo } from './types';
import { LISTENING_EXERCISES } from './listeningData';
import { SentenceCard } from './SentenceCard';
import { speakSpanish, stopSpeech, playClickSound, playSuccessSound, playErrorSound, triggerConfetti } from './audioHelper';
import { Headphones, Play, RotateCcw, Eye, EyeOff, CheckCircle2, ChevronRight, Gauge, ArrowLeft } from 'lucide-react';

interface ListeningViewProps {
  onInspectWord: (info: WordInfo) => void;
  onEarnCoins: (amount: number) => void;
  completedListening: string[];
  onCompleteListening: (id: string) => void;
}

export const ListeningView: React.FC<ListeningViewProps> = ({
  onInspectWord,
  onEarnCoins,
  completedListening,
  onCompleteListening,
}) => {
  const [selectedEx, setSelectedEx] = useState<ListeningExercise | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [showArmenian, setShowArmenian] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Question answers state: { [qId: string]: number }
  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [results, setResults] = useState<{ [qId: string]: boolean }>({});

  const startExercise = (ex: ListeningExercise) => {
    playClickSound();
    setSelectedEx(ex);
    setShowTranscript(false);
    setShowArmenian(false);
    setAnswers({});
    setResults({});
    playAudio(ex.audioTextEs, speechRate);
  };

  const playAudio = async (text: string, rate: number) => {
    setIsPlaying(true);
    await speakSpanish(text, rate);
    setIsPlaying(false);
  };

  const handleSelectOption = (qId: string, optIdx: number, correctIdx: number) => {
    playClickSound();
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setResults(prev => ({ ...prev, [qId]: isCorrect }));

    if (isCorrect) {
      playSuccessSound();
      if (selectedEx && Object.keys(answers).length + 1 >= selectedEx.questions.length) {
        triggerConfetti();
        onCompleteListening(selectedEx.id);
        onEarnCoins(30);
      }
    } else {
      playErrorSound();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            Escucha y Responde (40 Ejercicios)
          </span>
          <h2 className="text-2xl font-black">Ունկնդրում և Հասկացողություն (Audición)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Լսեք վաճառողի և հաճախորդի խոսակցությունները, կարգավորեք արագությունը և պատասխանեք հարցերին։
          </p>
        </div>

        {selectedEx && (
          <button
            onClick={() => {
              stopSpeech();
              setSelectedEx(null);
            }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Վերադառնալ ցանկին</span>
          </button>
        )}
      </div>

      {!selectedEx ? (
        /* Exercises List (40 items across A1, A2, B1, B2) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LISTENING_EXERCISES.map(ex => {
            const isCompleted = completedListening.includes(ex.id);
            return (
              <div
                key={ex.id}
                onClick={() => startExercise(ex)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-white hover:bg-orange-50/40 border-[#E5D5C5] hover:border-[#780016]'
                } shadow-xs hover:shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">🎧</span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FAF6F0] border border-[#E5D5C5] text-[#780016]">
                      {ex.level}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                    {ex.titleEs}
                  </h3>
                  <p className="text-xs font-bold text-[#EA580C] mt-0.5">
                    {ex.titleHy}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Խոսողներ՝ {ex.speaker}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5D5C5]/60 flex items-center justify-between">
                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Անցած է</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#780016] flex items-center gap-1">
                      <span>Լսել վարժությունը</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-semibold">+30 🪙</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Active Exercise Player */
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Audio Controller Card */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#780016]/20 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#EA580C]">
                  {selectedEx.level} • {selectedEx.speaker}
                </span>
                <h3 className="text-xl font-black text-gray-900">{selectedEx.titleEs}</h3>
                <p className="text-xs font-bold text-[#780016]">{selectedEx.titleHy}</p>
              </div>

              {/* Speed rate selector */}
              <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-xl border border-[#E5D5C5]">
                <Gauge className="w-3.5 h-3.5 text-gray-400 ml-1" />
                <button
                  onClick={() => setSpeechRate(0.8)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    speechRate === 0.8 ? 'bg-[#780016] text-white shadow-xs' : 'text-gray-600'
                  }`}
                >
                  0.8x (Դանդաղ)
                </button>
                <button
                  onClick={() => setSpeechRate(0.95)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    speechRate === 0.95 ? 'bg-[#780016] text-white shadow-xs' : 'text-gray-600'
                  }`}
                >
                  1.0x (Նորմալ)
                </button>
              </div>
            </div>

            {/* Play & Repeat Action Bar */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => playAudio(selectedEx.audioTextEs, speechRate)}
                disabled={isPlaying}
                className="flex-1 py-3 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlaying ? 'Հնչում է...' : 'Վերարտադրել (Reproducir)'}</span>
              </button>

              <button
                onClick={() => playAudio(selectedEx.audioTextEs, speechRate)}
                className="py-3 px-4 bg-[#FAF6F0] hover:bg-[#E5D5C5] text-[#780016] font-bold text-xs rounded-2xl border border-[#E5D5C5] flex items-center gap-1.5 transition-all cursor-pointer"
                title="Կրկնել աուդիոն"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Կրկնել</span>
              </button>
            </div>

            {/* Transcript & Armenian Toggles */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E5D5C5]/60">
              <button
                onClick={() => setShowTranscript(prev => !prev)}
                className="px-3.5 py-1.5 bg-[#FAF6F0] hover:bg-orange-50 text-gray-700 font-bold text-xs rounded-xl border border-[#E5D5C5] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showTranscript ? 'Թաքցնել տեքստը' : 'Իսպաներեն տրանսկրիպցիա'}</span>
              </button>

              <button
                onClick={() => setShowArmenian(prev => !prev)}
                className="px-3.5 py-1.5 bg-[#FAF6F0] hover:bg-orange-50 text-gray-700 font-bold text-xs rounded-xl border border-[#E5D5C5] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {showArmenian ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showArmenian ? 'Թաքցնել հայերենը' : 'Հայերեն թարգմանություն'}</span>
              </button>
            </div>

            {/* Transcript Area */}
            {showTranscript && (
              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80 space-y-2 animate-in fade-in">
                <span className="text-[11px] font-black uppercase text-[#EA580C] block">
                  Transcripción en español:
                </span>
                <p className="text-sm font-semibold text-gray-900 italic">
                  «{selectedEx.transcriptEs}»
                </p>
                {showArmenian && (
                  <p className="text-sm font-medium text-gray-700 pt-2 border-t border-orange-200">
                    «{selectedEx.transcriptHy}»
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#780016] uppercase tracking-wide">
              Հարցեր ըստ լսածի (Preguntas de comprensión)
            </h4>

            {selectedEx.questions.map((q, qIdx) => {
              const selectedOpt = answers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = results[q.id];

              return (
                <div key={q.id} className="p-5 bg-white rounded-3xl border border-[#E5D5C5] shadow-xs space-y-3">
                  <p className="text-sm font-extrabold text-gray-900">{q.questionEs}</p>
                  <p className="text-xs font-semibold text-gray-500">{q.questionHy}</p>

                  <div className="space-y-2 pt-1">
                    {q.optionsEs.map((optEs, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                        className={`w-full p-3.5 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                          selectedOpt === optIdx
                            ? optIdx === q.correctIndex
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-red-600 text-white shadow-xs'
                            : 'bg-[#FAF6F0] hover:bg-orange-50 text-gray-800 border border-[#E5D5C5]'
                        }`}
                      >
                        <span>{optEs}</span>
                        <span className="text-[11px] opacity-75">{q.optionsHy[optIdx]}</span>
                      </button>
                    ))}
                  </div>

                  {isAnswered && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-red-100 text-red-900'
                      }`}
                    >
                      <p>{isCorrect ? '¡Correcto!' : 'Incorrecto.'} {q.explanationHy}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
