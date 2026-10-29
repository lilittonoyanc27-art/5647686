import React, { useState } from 'react';
import { ExamQuestion } from './types';
import { generateExam } from './examData';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, triggerConfetti } from './audioHelper';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, Volume2, ArrowRight, Award, AlertTriangle } from 'lucide-react';

interface ExamViewProps {
  onEarnCoins: (amount: number) => void;
  onRecordExamScore: (level: string, score: number, total: number) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ onEarnCoins, onRecordExamScore }) => {
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Mistakes log during exam:
  const [mistakesList, setMistakesList] = useState<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanationHy: string;
    exampleEs: string;
    exampleHy: string;
  }[]>([]);

  const [examFinished, setExamFinished] = useState<boolean>(false);

  const startExam = (lvl: 'A1' | 'A2' | 'B1' | 'B2') => {
    playClickSound();
    setSelectedLevel(lvl);
    const qList = generateExam(lvl);
    setQuestions(qList);
    setCurrentIndex(0);
    setUserScore(0);
    setSelectedOptIndex(null);
    setIsAnswered(false);
    setMistakesList([]);
    setExamFinished(false);
    setExamStarted(true);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    playClickSound();
    setSelectedOptIndex(idx);
    setIsAnswered(true);

    const chosen = currentQ.options[idx];
    if (chosen.isCorrect) {
      playSuccessSound();
      setUserScore(s => s + 1);
    } else {
      playErrorSound();
      const correctOpt = currentQ.options.find(o => o.isCorrect);
      setMistakesList(prev => [
        ...prev,
        {
          question: currentQ.promptEs,
          userAnswer: chosen.textEs,
          correctAnswer: correctOpt?.textEs || '',
          explanationHy: currentQ.explanationHy,
          exampleEs: currentQ.exampleEs,
          exampleHy: currentQ.exampleHy,
        },
      ]);
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOptIndex(null);
      setIsAnswered(false);
    } else {
      // Finished
      triggerConfetti();
      setExamFinished(true);
      const totalScore = userScore + (currentQ?.options[selectedOptIndex || 0]?.isCorrect ? 1 : 0);
      onRecordExamScore(selectedLevel, totalScore, questions.length);
      onEarnCoins(totalScore * 5);
    }
  };

  const percentage = questions.length > 0 ? Math.round((userScore / questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            Examen Oficial: Comprando Ropa en Español
          </span>
          <h2 className="text-2xl font-black">Պաշտոնական Քննություն (Modo Examen)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            40 համապարփակ հարցեր՝ բառապաշար (10), քերականություն (10), երկխոսություն (10), ունկնդրում (5), իրավիճակ (5)։
          </p>
        </div>

        {examStarted && !examFinished && (
          <div className="bg-white/20 px-4 py-2 rounded-2xl border border-white/30 text-center">
            <span className="text-[11px] font-bold text-amber-200 block">Հարց</span>
            <span className="text-lg font-black text-white">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        )}
      </div>

      {!examStarted ? (
        /* Level Selection Screen */
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-[#E5D5C5] shadow-sm text-center space-y-6">
          <GraduationCap className="w-16 h-16 text-[#780016] mx-auto" />
          <div>
            <h3 className="text-xl font-black text-gray-900">Ընտրեք Ձեր քննության մակարդակը</h3>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Յուրաքանչյուր քննություն բաղկացած է 40 հարցից պատահական դասավորությամբ պատասխաններով։
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { lvl: 'A1', desc: 'Սկսնակ (Բազային բառապաշար, գներ, չափսեր)' },
              { lvl: 'A2', desc: 'Տարրական (Զեղչեր, փոխանակում, անցյալ ժամանակ)' },
              { lvl: 'B1', desc: 'Միջին (Ոճային ընտրություն, նյութեր, ապառնի)' },
              { lvl: 'B2', desc: 'Բարձր (Պաշտոնական բողոքներ, երաշխիքներ)' },
            ].map(item => (
              <button
                key={item.lvl}
                onClick={() => startExam(item.lvl as any)}
                className="p-4 rounded-2xl border-2 border-[#E5D5C5] hover:border-[#780016] bg-[#FAF6F0] hover:bg-orange-50 transition-all text-left group cursor-pointer shadow-xs hover:scale-102"
              >
                <span className="text-xl font-black text-[#780016] block group-hover:text-[#EA580C]">
                  Nivel {item.lvl}
                </span>
                <span className="text-[11px] text-gray-600 font-medium block mt-1">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : !examFinished ? (
        /* Active Question Display */
        currentQ && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#780016]/20 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5D5C5]">
              <span className="text-xs font-black uppercase text-[#EA580C] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                {currentQ.section.toUpperCase()} • Nivel {currentQ.level}
              </span>
              <span className="text-xs font-bold text-gray-500">
                Միավորներ՝ <strong>{userScore}</strong>
              </span>
            </div>

            {/* Context / Audio if present */}
            {currentQ.contextEs && (
              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] text-xs font-semibold text-gray-800 italic">
                «{currentQ.contextEs}»
              </div>
            )}

            {currentQ.audioText && (
              <button
                onClick={() => speakSpanish(currentQ.audioText || '')}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-100 hover:bg-orange-200 text-[#EA580C] font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Լսել աուդիո հատվածը</span>
              </button>
            )}

            {/* Prompt */}
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                {currentQ.promptEs}
              </h3>
              <p className="text-xs font-semibold text-[#780016]">{currentQ.promptHy}</p>
            </div>

            {/* Randomized Options */}
            <div className="space-y-2.5 pt-1">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptIndex === idx;
                let btnStyle = 'bg-[#FAF6F0] hover:bg-orange-50 text-gray-800 border-[#E5D5C5]';

                if (isAnswered) {
                  if (isSelected && opt.isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                  else if (isSelected && !opt.isCorrect) btnStyle = 'bg-red-600 text-white border-red-600';
                  else if (opt.isCorrect) btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt.textEs}</span>
                    {opt.textHy && <span className="text-[11px] opacity-75">{opt.textHy}</span>}
                  </button>
                );
              })}
            </div>

            {/* Immediate explanation on mistake */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in ${
                  currentQ.options[selectedOptIndex || 0]?.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                <p className="font-extrabold">
                  {currentQ.options[selectedOptIndex || 0]?.isCorrect ? '¡Correcto!' : 'Respuesta incorrecta.'}
                </p>
                <p className="font-semibold text-gray-700">💡 {currentQ.explanationHy}</p>
                <p className="italic text-gray-600 pt-1 border-t border-[#E5D5C5]/60">
                  Օրինակ՝ «{currentQ.exampleEs}» ({currentQ.exampleHy})
                </p>
              </div>
            )}

            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-[#780016] hover:bg-[#600012] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{currentIndex + 1 < questions.length ? 'Հաջորդ հարցը' : 'Ավարտել քննությունը'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )
      ) : (
        /* Exam Completion Score Card */
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-[#E5D5C5] shadow-lg text-center space-y-6">
          <Award className="w-16 h-16 text-amber-500 mx-auto" />
          <div>
            <h3 className="text-2xl font-black text-gray-900">Քննությունն Ավարտված է</h3>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Մակարդակ՝ <strong>{selectedLevel}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-5 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5]">
            <div>
              <span className="text-xs text-gray-500 font-bold block">Ընդհանուր միավոր</span>
              <span className="text-3xl font-black text-[#780016]">
                {userScore} / {questions.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-bold block">Ճշգրտության տոկոս</span>
              <span className="text-3xl font-black text-[#EA580C]">{percentage}%</span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="text-left p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
            <span className="font-extrabold text-[#780016] block">Հանձնարարականներ կրկնության համար՝</span>
            <p className="text-gray-700">
              {percentage >= 80
                ? 'Շնորհավորո՜ւմ ենք։ Դուք գերազանց տիրապետում եք հագուստի գնման բոլոր թեմաներին։ Կարող եք անցնել հաջորդ մակարդակին։'
                : 'Խորհուրդ ենք տալիս կրկնել քերականության բաժինը և ունկնդրման վարժությունները՝ արդյունքը բարելավելու համար։'}
            </p>
          </div>

          {/* Retake exam button */}
          <div className="flex gap-3">
            <button
              onClick={() => startExam(selectedLevel)}
              className="flex-1 py-3 px-4 bg-[#780016] hover:bg-[#600012] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Անցնել քննությունը նորից</span>
            </button>
            <button
              onClick={() => setExamStarted(false)}
              className="py-3 px-4 bg-[#FAF6F0] hover:bg-[#E5D5C5] text-gray-700 font-extrabold text-xs rounded-xl border border-[#E5D5C5] cursor-pointer"
            >
              Մակարդակների ցանկ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
