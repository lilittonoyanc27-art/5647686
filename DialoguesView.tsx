import React, { useState } from 'react';
import { DialogueScenario, WordInfo } from './types';
import { DIALOGUES } from './dialoguesData';
import { SentenceCard } from './SentenceCard';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, triggerConfetti } from './audioHelper';
import { Volume2, CheckCircle2, ChevronRight, Sparkles, Shuffle, ArrowLeft } from 'lucide-react';

interface DialoguesViewProps {
  onInspectWord: (info: WordInfo) => void;
  onEarnCoins: (amount: number) => void;
  completedDialogues: string[];
  onCompleteDialogue: (id: string) => void;
}

export const DialoguesView: React.FC<DialoguesViewProps> = ({
  onInspectWord,
  onEarnCoins,
  completedDialogues,
  onCompleteDialogue,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario | null>(null);
  const [currentTurnId, setCurrentTurnId] = useState<string>('t1');
  const [feedback, setFeedback] = useState<{ msgEs: string; msgHy: string; isSuccess: boolean } | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    { speaker: string; textEs: string; textHy: string; avatar: string }[]
  >([]);

  // Mode: Multiple choice vs. compose from words
  const [composeMode, setComposeMode] = useState<boolean>(false);
  const [constructedWords, setConstructedWords] = useState<string[]>([]);

  const startScenario = (sc: DialogueScenario) => {
    playClickSound();
    setSelectedScenario(sc);
    setCurrentTurnId(sc.initialTurnId);
    setFeedback(null);
    setComposeMode(false);
    setConstructedWords([]);

    const initial = sc.turns[sc.initialTurnId];
    setConversationHistory([
      {
        speaker: initial.speakerNameEs,
        textEs: initial.textEs,
        textHy: initial.textHy,
        avatar: initial.avatar,
      },
    ]);
    speakSpanish(initial.textEs);
  };

  const handleSelectOption = (opt: any) => {
    if (!selectedScenario) return;

    if (opt.isCorrect) {
      playSuccessSound();
      setFeedback({
        msgEs: opt.feedbackEs || '¡Muy bien contestado!',
        msgHy: opt.feedbackHy || 'Ճիշտ պատասխան:',
        isSuccess: true,
      });

      // Append customer response
      setConversationHistory(prev => [
        ...prev,
        {
          speaker: 'Alumno (Tú)',
          textEs: opt.textEs,
          textHy: opt.textHy,
          avatar: '🧑',
        },
      ]);

      // If next turn exists
      if (opt.nextTurnId && selectedScenario.turns[opt.nextTurnId]) {
        setTimeout(() => {
          const nextTurn = selectedScenario.turns[opt.nextTurnId];
          setCurrentTurnId(opt.nextTurnId);
          setConversationHistory(prev => [
            ...prev,
            {
              speaker: nextTurn.speakerNameEs,
              textEs: nextTurn.textEs,
              textHy: nextTurn.textHy,
              avatar: nextTurn.avatar,
            },
          ]);
          setFeedback(null);
          speakSpanish(nextTurn.textEs);
        }, 1200);
      } else {
        // Scenario completed!
        setTimeout(() => {
          triggerConfetti();
          onCompleteDialogue(selectedScenario.id);
          onEarnCoins(40);
        }, 1000);
      }
    } else {
      playErrorSound();
      setFeedback({
        msgEs: opt.feedbackEs || 'Esa respuesta no es adecuada para esta situación.',
        msgHy: opt.feedbackHy || 'Այդ պատասխանը հարմար չէ այս իրավիճակին։ Փորձեք նորից։',
        isSuccess: false,
      });
    }
  };

  // Word composer submit
  const handleWordComposerSubmit = (correctOptionText: string, fullOption: any) => {
    const constructed = constructedWords.join(' ').toLowerCase().replace(/[.,!¡?¿]/g, '');
    const target = correctOptionText.toLowerCase().replace(/[.,!¡?¿]/g, '');

    if (constructed === target) {
      handleSelectOption(fullOption);
      setConstructedWords([]);
    } else {
      playErrorSound();
      setFeedback({
        msgEs: 'Las palabras no forman la respuesta correcta.',
        msgHy: 'Բառերը ճիշտ չեն դասավորված։ Փորձեք կրկին։',
        isSuccess: false,
      });
    }
  };

  const currentTurn = selectedScenario?.turns[currentTurnId];
  const correctOption = currentTurn?.options?.find(o => o.isCorrect);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            30 Diálogos Interactivos
          </span>
          <h2 className="text-2xl font-black">Երկխոսություններ Վաճառողի Հետ (Diálogos)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Խաղացեք գնորդի դերը, պատասխանեք հարցերին և կազմեք սեփական պատասխանները բառերից։
          </p>
        </div>

        {selectedScenario && (
          <button
            onClick={() => {
              playClickSound();
              setSelectedScenario(null);
            }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Վերադառնալ ցանկին</span>
          </button>
        )}
      </div>

      {!selectedScenario ? (
        /* Dialogue Scenarios Selector Grid (30 Scenarios) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIALOGUES.map(sc => {
            const isCompleted = completedDialogues.includes(sc.id);
            return (
              <div
                key={sc.id}
                onClick={() => startScenario(sc)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-white hover:bg-orange-50/40 border-[#E5D5C5] hover:border-[#780016]'
                } shadow-xs hover:shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{sc.icon}</span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FAF6F0] border border-[#E5D5C5] text-[#780016]">
                      {sc.level}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                    {sc.titleEs}
                  </h3>
                  <p className="text-xs font-bold text-[#EA580C] mt-0.5">
                    {sc.titleHy}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {sc.situationHy}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5D5C5]/60 flex items-center justify-between">
                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ավարտված է</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#780016] flex items-center gap-1">
                      <span>Սկսել երկխոսությունը</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-semibold">+40 🪙</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Active Dialogue Interface */
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Header Card */}
          <div className="bg-white p-4 rounded-3xl border border-[#E5D5C5] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-[#EA580C] uppercase tracking-wide">
                {selectedScenario.level} • {selectedScenario.titleEs}
              </span>
              <p className="text-xs text-gray-600 font-medium mt-0.5">
                {selectedScenario.situationHy}
              </p>
            </div>

            {/* Toggle compose from words mode */}
            <button
              onClick={() => {
                playClickSound();
                setComposeMode(prev => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                composeMode
                  ? 'bg-[#EA580C] text-white shadow-xs'
                  : 'bg-[#FAF6F0] text-gray-700 border border-[#E5D5C5]'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>{composeMode ? 'Բառերի ռեժիմ (ON)' : 'Հավաքել բառերից'}</span>
            </button>
          </div>

          {/* Conversation History Stream with Sentence Cards */}
          <div className="space-y-3">
            {conversationHistory.map((item, idx) => (
              <SentenceCard
                key={idx}
                textEs={item.textEs}
                textHy={item.textHy}
                speakerName={item.speaker}
                speakerAvatar={item.avatar}
                onInspectWord={onInspectWord}
                className={item.speaker.includes('Alumno') ? 'ml-6 sm:ml-12 border-orange-200 bg-orange-50/30' : 'mr-6 sm:mr-12'}
              />
            ))}
          </div>

          {/* Customer Choice Area */}
          {currentTurn?.options && currentTurn.options.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#780016]/20 shadow-lg space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#780016]">
                  Քո հերթն է (Tu turno de responder)
                </span>
                <span className="text-[11px] text-gray-500 font-bold">
                  Ընտրեք կամ կազմեք ճիշտ պատասխանը
                </span>
              </div>

              {!composeMode ? (
                /* Multiple Choice Options */
                <div className="space-y-2.5">
                  {currentTurn.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full p-4 rounded-2xl bg-[#FAF6F0] hover:bg-orange-50 border border-[#E5D5C5] hover:border-[#EA580C] font-bold text-sm text-gray-800 text-left transition-all cursor-pointer flex items-center justify-between group shadow-2xs hover:shadow-xs"
                    >
                      <div>
                        <span>{opt.textEs}</span>
                        <span className="block text-xs font-semibold text-gray-500 mt-0.5">
                          {opt.textHy}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#EA580C] transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                /* Compose from words mode */
                correctOption && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-600">
                      Թիրախային միտք՝ «{correctOption.textHy}»
                    </p>

                    {/* Constructed sentence box */}
                    <div className="min-h-12 p-3 rounded-2xl bg-[#FAF6F0] border border-[#E5D5C5] flex flex-wrap gap-2 items-center">
                      {constructedWords.length === 0 ? (
                        <span className="text-xs text-gray-400 font-medium">
                          Սեղմեք ստորև գտնվող բառերի վրա նախադասությունը կազմելու համար...
                        </span>
                      ) : (
                        constructedWords.map((word, wIdx) => (
                          <span
                            key={wIdx}
                            onClick={() => setConstructedWords(prev => prev.filter((_, i) => i !== wIdx))}
                            className="px-3 py-1 bg-[#780016] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-red-700"
                          >
                            {word} ✕
                          </span>
                        ))
                      )}
                    </div>

                    {/* Available word tiles */}
                    <div className="flex flex-wrap gap-2">
                      {correctOption.textEs
                        .split(' ')
                        .concat(['ayer', 'mañana', 'tengo'])
                        .sort(() => 0.5 - Math.random())
                        .map((w, wIdx) => (
                          <button
                            key={wIdx}
                            onClick={() => {
                              playClickSound();
                              setConstructedWords(prev => [...prev, w]);
                            }}
                            className="px-3 py-1.5 bg-orange-100 hover:bg-[#EA580C] text-[#EA580C] hover:text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
                          >
                            {w}
                          </button>
                        ))}
                    </div>

                    <button
                      onClick={() => handleWordComposerSubmit(correctOption.textEs, correctOption)}
                      className="w-full py-3 bg-[#780016] hover:bg-[#600012] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      Հաստատել պատասխանը (Confirmar)
                    </button>
                  </div>
                )
              )}

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-4 rounded-2xl border text-xs font-bold ${
                    feedback.isSuccess
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}
                >
                  <p>{feedback.msgEs}</p>
                  <p className="font-semibold text-gray-700">{feedback.msgHy}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
