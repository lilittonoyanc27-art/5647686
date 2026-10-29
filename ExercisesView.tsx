import React, { useState } from 'react';
import { ExerciseItem, ExerciseType, WordInfo } from './types';
import { EXERCISES_BY_TYPE, GUESS_RIDDLES } from './exercisesData';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, triggerConfetti } from './audioHelper';
import { CheckCircle2, RotateCcw, Volume2, Sparkles, Filter, ChevronRight, HelpCircle } from 'lucide-react';

interface ExercisesViewProps {
  onInspectWord: (info: WordInfo) => void;
  onEarnCoins: (amount: number) => void;
  onRecordMistake: (question: string, userAns: string, correctAns: string, explanationHy: string) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  onInspectWord,
  onEarnCoins,
  onRecordMistake,
}) => {
  const [selectedType, setSelectedType] = useState<string>('guess_by_description');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Type categories
  const EXERCISE_CATEGORIES = [
    { id: 'guess_by_description', labelEs: 'Adivina por descripción', labelHy: 'Գուշակիր ըստ նկարագրության (50+)', icon: '🕵️' },
    { id: 'multiple_choice', labelEs: 'Opción múltiple', labelHy: 'Ընտրեք ճիշտ տարբերակը', icon: '🔘' },
    { id: 'translation', labelEs: 'Traducción', labelHy: 'Թարգմանություն', icon: '🌐' },
    { id: 'match_image', labelEs: 'Unir imagen', labelHy: 'Միացրեք պատկերին', icon: '🖼️' },
    { id: 'sentence_builder', labelEs: 'Constructor de frases', labelHy: 'Կառուցեք նախադասությունը', icon: '🧱' },
    { id: 'fix_error', labelEs: 'Corrige el error', labelHy: 'Ուղղեք սխալը', icon: '✏️' },
    { id: 'fill_blanks', labelEs: 'Rellenar huecos', labelHy: 'Լրացրեք բաց թողնվածը', icon: '📝' },
    { id: 'true_false', labelEs: 'Verdadero o falso', labelHy: 'Ճի՞շտ, թե՞ Սխալ', icon: '⚖️' },
    { id: 'odd_one_out', labelEs: 'Palabra sobrante', labelHy: 'Ավելորդ բառը', icon: '❌' },
    { id: 'choose_size', labelEs: 'Elegir talla', labelHy: 'Ընտրեք չափսը', icon: '📏' },
    { id: 'calculate_cost', labelEs: 'Calcular precio', labelHy: 'Հաշվեք գինը', icon: '🧮' },
    { id: 'continue_dialogue', labelEs: 'Continuar diálogo', labelHy: 'Շարունակեք երկխոսությունը', icon: '💬' },
    { id: 'choose_clothes', labelEs: 'Ropa adecuada', labelHy: 'Համապատասխան հագուստ', icon: '👔' },
    { id: 'translate_sentence', labelEs: 'Traducir frase', labelHy: 'Թարգմանեք նախադասությունը', icon: '📖' },
  ];

  // Current items
  const activeList: ExerciseItem[] =
    selectedType === 'guess_by_description'
      ? GUESS_RIDDLES
      : EXERCISES_BY_TYPE[selectedType] || GUESS_RIDDLES;

  const currentItem = activeList[currentIndex % activeList.length];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    playClickSound();
    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === Number(currentItem.correctAnswer);
    setIsCorrect(correct);

    if (correct) {
      playSuccessSound();
      triggerConfetti();
      onEarnCoins(20);
    } else {
      playErrorSound();
      const userTxt = currentItem.options ? currentItem.options[idx] : String(idx);
      const corrTxt = currentItem.options ? currentItem.options[Number(currentItem.correctAnswer)] : String(currentItem.correctAnswer);
      onRecordMistake(currentItem.promptEs || 'Վարժություն', userTxt, corrTxt, currentItem.explanationHy);
    }
  };

  const handleNext = () => {
    playClickSound();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentIndex(i => (i + 1) % activeList.length);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            15 Tipos de Ejercicios Interactivos
          </span>
          <h2 className="text-2xl font-black">Ինտերակտիվ Վարժություններ (Ejercicios)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Ընտրեք 15 տարբեր տեսակի վարժություններից և լուծեք 50+ հանելուկներ նկարագրությամբ։
          </p>
        </div>
      </div>

      {/* Exercise Types Horizontal Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {EXERCISE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              playClickSound();
              setSelectedType(cat.id);
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              selectedType === cat.id
                ? 'bg-[#780016] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-orange-50 border border-[#E5D5C5]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.labelHy}</span>
          </button>
        ))}
      </div>

      {/* Main Exercise Card */}
      {currentItem && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#780016]/20 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5D5C5]">
            <span className="text-xs font-black uppercase text-[#EA580C]">
              Հարց #{currentIndex + 1} / {activeList.length}
            </span>
            <span className="text-xs font-bold text-gray-500">
              Մակարդակ՝ <strong>{currentItem.level}</strong>
            </span>
          </div>

          {/* Visual Icon / Graphic if applicable */}
          {currentItem.image && (
            <div className="text-6xl text-center py-2 animate-in zoom-in-90">
              {currentItem.image}
            </div>
          )}

          {/* Instruction & Prompt */}
          <div className="space-y-2">
            <h3 className="text-lg font-black text-gray-900 leading-snug">
              {currentItem.promptEs || currentItem.instructionEs}
            </h3>
            {currentItem.promptHy && (
              <p className="text-sm font-semibold text-[#780016]">
                {currentItem.promptHy}
              </p>
            )}
            <button
              onClick={() => speakSpanish(currentItem.promptEs || currentItem.instructionEs)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-[#EA580C] font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Լսել արտասանությունը</span>
            </button>
          </div>

          {/* Options Grid */}
          {currentItem.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentItem.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectChoice = idx === Number(currentItem.correctAnswer);

                let btnStyle = 'bg-[#FAF6F0] hover:bg-orange-50 text-gray-800 border-[#E5D5C5]';
                if (isAnswered) {
                  if (isSelected && isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-red-600 text-white border-red-600 shadow-md';
                  else if (isCorrectChoice) btnStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {currentItem.optionsHy && currentItem.optionsHy[idx] && (
                      <span className="text-[11px] opacity-75 font-normal block">
                        ({currentItem.optionsHy[idx]})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation upon answer */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border text-xs font-bold space-y-1 animate-in fade-in ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-red-50 border-red-300 text-red-800'
              }`}
            >
              <p>{isCorrect ? '¡Excelente respuesta!' : 'Respuesta incorrecta.'}</p>
              <p className="font-semibold text-gray-700">{currentItem.explanationHy}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-[#780016] hover:bg-[#600012] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Հաջորդ հարցը (Siguiente)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
