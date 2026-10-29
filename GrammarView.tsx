import React, { useState } from 'react';
import { GrammarTopic, WordInfo } from './types';
import { GRAMMAR_TOPICS } from './grammarData';
import { SentenceCard } from './SentenceCard';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, triggerConfetti } from './audioHelper';
import { BookOpen, CheckCircle, Volume2, ArrowLeft, HelpCircle, ChevronRight, Award } from 'lucide-react';

interface GrammarViewProps {
  onInspectWord: (info: WordInfo) => void;
  onEarnCoins: (amount: number) => void;
  completedGrammar: string[];
  onCompleteGrammar: (id: string) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  onInspectWord,
  onEarnCoins,
  completedGrammar,
  onCompleteGrammar,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [qIndex: number]: number }>({});
  const [quizResults, setQuizResults] = useState<{ [qIndex: number]: boolean }>({});

  const handleStartTopic = (topic: GrammarTopic) => {
    playClickSound();
    setSelectedTopic(topic);
    setQuizAnswers({});
    setQuizResults({});
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number, correctIdx: number) => {
    playClickSound();
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setQuizResults(prev => ({ ...prev, [qIdx]: isCorrect }));

    if (isCorrect) {
      playSuccessSound();
      if (selectedTopic && Object.keys(quizAnswers).length + 1 >= selectedTopic.quiz.length) {
        triggerConfetti();
        onCompleteGrammar(selectedTopic.id);
        onEarnCoins(35);
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
            21 Temas Gramaticales en Contexto
          </span>
          <h2 className="text-2xl font-black">Իսպաներեն Քերականություն (Gramática)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Քերականական կանոններ խանութում հագուստ գնելու օրինակներով, հայերեն բացատրություններով և թեստերով։
          </p>
        </div>

        {selectedTopic && (
          <button
            onClick={() => setSelectedTopic(null)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Վերադառնալ թեմաների ցանկին</span>
          </button>
        )}
      </div>

      {!selectedTopic ? (
        /* Topic Selection Grid (21 topics) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GRAMMAR_TOPICS.map(topic => {
            const isCompleted = completedGrammar.includes(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => handleStartTopic(topic)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-white hover:bg-orange-50/40 border-[#E5D5C5] hover:border-[#780016]'
                } shadow-xs hover:shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FAF6F0] border border-[#E5D5C5] text-[#780016]">
                      {topic.level}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                    {topic.titleEs}
                  </h3>
                  <p className="text-xs font-bold text-[#EA580C] mt-0.5">
                    {topic.titleHy}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {topic.summaryHy}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5D5C5]/60 flex items-center justify-between">
                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Անցած է</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#780016] flex items-center gap-1">
                      <span>Սովորել թեման</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-semibold">+35 🪙</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Topic View */
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{selectedTopic.icon}</span>
              <div>
                <span className="text-xs font-black uppercase text-[#EA580C]">
                  {selectedTopic.level} • Քերականություն
                </span>
                <h3 className="text-xl font-black text-gray-900">{selectedTopic.titleEs}</h3>
              </div>
            </div>
            <p className="text-sm font-bold text-[#780016]">{selectedTopic.titleHy}</p>
          </div>

          {/* Theory in Spanish & Armenian */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-[#780016] uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#EA580C]" />
              <span>Տեսական մաս և կանոններ (Teoría)</span>
            </h4>

            {/* Spanish theory bullet list */}
            <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200/80 space-y-1.5 text-xs font-semibold text-gray-800">
              <span className="text-[11px] font-black uppercase text-[#EA580C] block mb-1">
                En español:
              </span>
              {selectedTopic.theoryEs.map((t, idx) => (
                <p key={idx}>• {t}</p>
              ))}
            </div>

            {/* Armenian explanations */}
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-1.5 text-xs font-medium text-gray-800">
              <span className="text-[11px] font-black uppercase text-[#780016] block mb-1">
                Հայերեն բացատրություն:
              </span>
              {selectedTopic.theoryHy.map((t, idx) => (
                <p key={idx}>• {t}</p>
              ))}
            </div>
          </div>

          {/* Real Shopping Examples with interactive sentence cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#780016] uppercase tracking-wide flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#EA580C]" />
              <span>Օրինակներ խանութում (Ejemplos en la tienda)</span>
            </h4>

            {selectedTopic.rules.map((r, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-600 px-1">
                  <span>Կանոն՝ {r.ruleEs}</span>
                  <span className="text-[#EA580C]">{r.ruleHy}</span>
                </div>
                <SentenceCard
                  textEs={r.exampleEs}
                  textHy={r.exampleHy}
                  onInspectWord={onInspectWord}
                  defaultExpanded={true}
                />
              </div>
            ))}
          </div>

          {/* Interactive Topic Quiz */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#780016]/20 shadow-md space-y-5">
            <h4 className="text-sm font-extrabold text-[#780016] uppercase tracking-wide flex items-center gap-2">
              <Award className="w-4 h-4 text-[#EA580C]" />
              <span>Գիտելիքի ստուգում (Comprobación de conocimientos)</span>
            </h4>

            {selectedTopic.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = quizResults[qIdx];

              return (
                <div key={qIdx} className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] space-y-3">
                  <p className="text-sm font-extrabold text-gray-900">{q.questionEs}</p>
                  <p className="text-xs font-semibold text-gray-500">{q.questionHy}</p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(qIdx, optIdx, q.correctIndex)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                          selectedOpt === optIdx
                            ? optIdx === q.correctIndex
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-red-600 text-white shadow-xs'
                            : 'bg-white hover:bg-orange-50 text-gray-800 border border-[#E5D5C5]'
                        }`}
                      >
                        {opt}
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
