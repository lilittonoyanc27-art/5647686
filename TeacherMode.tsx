import React, { useState, useEffect } from 'react';
import { TeacherSettings, StudentProgress, ExamQuestion } from './types';
import { speakSpanish, playClickSound, playSuccessSound } from './audioHelper';
import { Settings, Users, BookOpen, AlertCircle, PlusCircle, CheckCircle, BarChart3, Save, Download } from 'lucide-react';

interface TeacherModeProps {
  settings: TeacherSettings;
  onUpdateSettings: (newSettings: TeacherSettings) => void;
  progress: StudentProgress;
  onClearMistakes: () => void;
  onAddCustomQuestion: (q: ExamQuestion) => void;
}

export const TeacherMode: React.FC<TeacherModeProps> = ({
  settings,
  onUpdateSettings,
  progress,
  onClearMistakes,
  onAddCustomQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'control' | 'results' | 'mistakes' | 'builder'>('control');

  // Custom question builder state
  const [customPromptEs, setCustomPromptEs] = useState('');
  const [customPromptHy, setCustomPromptHy] = useState('');
  const [customExplanationHy, setCustomExplanationHy] = useState('');
  const [customOpt1, setCustomOpt1] = useState('');
  const [customOpt2, setCustomOpt2] = useState('');
  const [customOpt3, setCustomOpt3] = useState('');
  const [customOpt4, setCustomOpt4] = useState('');
  const [customCorrectIdx, setCustomCorrectIdx] = useState(0);

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPromptEs || !customOpt1 || !customOpt2) {
      alert('Լրացրեք հարցը և առնվազն երկու պատասխանի տարբերակ։');
      return;
    }

    const newQuestion: ExamQuestion = {
      id: `custom-${Date.now()}`,
      section: 'vocabulario',
      level: 'A1',
      promptEs: customPromptEs,
      promptHy: customPromptHy || 'Ուսուցչի հատուկ հարց',
      explanationHy: customExplanationHy || 'Ուսուցչի բացատրություն',
      exampleEs: customPromptEs,
      exampleHy: customPromptHy,
      options: [
        { textEs: customOpt1, textHy: '', isCorrect: customCorrectIdx === 0 },
        { textEs: customOpt2, textHy: '', isCorrect: customCorrectIdx === 1 },
        { textEs: customOpt3 || 'Opción 3', textHy: '', isCorrect: customCorrectIdx === 2 },
        { textEs: customOpt4 || 'Opción 4', textHy: '', isCorrect: customCorrectIdx === 3 },
      ],
    };

    onAddCustomQuestion(newQuestion);
    playSuccessSound();
    alert('¡Pregunta personalizada guardada con éxito!\nՀատուկ հարցը հաջողությամբ պահպանվեց։');

    // Reset fields
    setCustomPromptEs('');
    setCustomPromptHy('');
    setCustomExplanationHy('');
    setCustomOpt1('');
    setCustomOpt2('');
    setCustomOpt3('');
    setCustomOpt4('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            Panel de Control del Docente
          </span>
          <h2 className="text-2xl font-black">Ուսուցչի Կառավարման Վահանակ (Modo Profesor)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Կառավարեք ուսուցման մակարդակը, անջատեք թարգմանությունը ստուգման համար և վերլուծեք սխալները։
          </p>
        </div>

        <div className="bg-white/20 p-3 rounded-2xl border border-white/30 text-center">
          <span className="text-xs font-bold text-amber-200 block">Աշակերտի մակարդակ</span>
          <span className="text-xl font-black text-amber-300 uppercase">{progress.level}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5D5C5] pb-2 overflow-x-auto">
        {[
          { id: 'control', label: 'Կառավարում (Control)', icon: Settings },
          { id: 'results', label: 'Արդյունքներ (Resultados)', icon: BarChart3 },
          { id: 'mistakes', label: `Սխալների կրկնություն (${progress.mistakes.length})`, icon: AlertCircle },
          { id: 'builder', label: 'Ստեղծել հարց (Crear Pregunta)', icon: PlusCircle },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#780016] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-[#E5D5C5]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Control & Settings */}
      {activeTab === 'control' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-[#780016] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#EA580C]" />
            <span>Կարգավորումներ և ուսուցման ռեժիմներ</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Toggle Armenian Translation */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-gray-900 block">
                  Արմատական իսպաներեն (առանց հայերենի)
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Թաքցնել հայերեն ակնարկներն ու թարգմանությունները ստուգման համար
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.hideArmenianTranslation}
                onChange={(e) => onUpdateSettings({ ...settings, hideArmenianTranslation: e.target.checked })}
                className="w-6 h-6 accent-[#780016] cursor-pointer"
              />
            </div>

            {/* Level Selector */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] space-y-2">
              <span className="font-extrabold text-sm text-gray-900 block">
                Ուսուցանվող մակարդակ (Nivel)
              </span>
              <div className="flex gap-2">
                {(['all', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      playClickSound();
                      onUpdateSettings({ ...settings, selectedLevel: lvl });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase transition-all cursor-pointer ${
                      settings.selectedLevel === lvl
                        ? 'bg-[#780016] text-white shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-orange-100 border border-[#E5D5C5]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Question count selector */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] space-y-2">
              <span className="font-extrabold text-sm text-gray-900 block">
                Հարցերի քանակը վարժություններում
              </span>
              <div className="flex gap-2">
                {[5, 10, 20, 30, 40].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => {
                      playClickSound();
                      onUpdateSettings({ ...settings, questionCount: cnt });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      settings.questionCount === cnt
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-orange-100 border border-[#E5D5C5]'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound toggle */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-gray-900 block">
                  Աուդիո և ձայնային էֆեկտներ
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Արտասանություն և խաղային հնչյուններ
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onUpdateSettings({ ...settings, soundEnabled: e.target.checked })}
                className="w-6 h-6 accent-[#EA580C] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Results & Analytics */}
      {activeTab === 'results' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-5">
          <h3 className="text-base font-extrabold text-[#780016]">Աշակերտի վիճակագրություն</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] text-center">
              <span className="text-xs text-gray-500 font-bold block">Մետաղադրամներ</span>
              <span className="text-2xl font-black text-[#780016]">{progress.coins} 🪙</span>
            </div>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] text-center">
              <span className="text-xs text-gray-500 font-bold block">Օրերի հաջորդականություն</span>
              <span className="text-2xl font-black text-[#EA580C]">{progress.streak} օր 🔥</span>
            </div>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] text-center">
              <span className="text-xs text-gray-500 font-bold block">Անցած երկխոսություններ</span>
              <span className="text-2xl font-black text-gray-800">{progress.completedDialogues.length} / 30</span>
            </div>
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] text-center">
              <span className="text-xs text-gray-500 font-bold block">Ուսումնասիրված քերականություն</span>
              <span className="text-2xl font-black text-gray-800">{progress.completedGrammar.length} / 21</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Mistakes Review */}
      {activeTab === 'mistakes' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5D5C5]">
            <h3 className="text-base font-extrabold text-[#780016]">
              Աշակերտի թույլ տված սխալների մատյան
            </h3>
            {progress.mistakes.length > 0 && (
              <button
                onClick={onClearMistakes}
                className="text-xs font-bold text-red-600 hover:text-red-800 p-1 cursor-pointer"
              >
                Մաքրել պատմությունը
              </button>
            )}
          </div>

          {progress.mistakes.length === 0 ? (
            <div className="p-8 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-2xl border border-emerald-200">
              🎉 Հրաշալի՜ է։ Ընթացիկ սխալներ չկան, աշակերտը կատարել է բոլոր առաջադրանքները գերազանց։
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {progress.mistakes.map((m, idx) => (
                <div key={idx} className="p-4 bg-[#FAF6F0] rounded-2xl border border-red-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-gray-900">{m.question}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{m.timestamp}</span>
                  </div>
                  <div className="flex gap-4 font-semibold">
                    <span className="text-red-600">Աշակերտի պատասխան՝ {m.userAnswer}</span>
                    <span className="text-emerald-700">Ճիշտ պատասխան՝ {m.correctAnswer}</span>
                  </div>
                  <p className="text-gray-600 font-medium italic pt-1 border-t border-[#E5D5C5]/60">
                    💡 Բացատրություն՝ {m.explanationHy}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Custom Question & Dialogue Builder */}
      {activeTab === 'builder' && (
        <form onSubmit={handleSaveQuestion} className="bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#780016] flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#EA580C]" />
            <span>Ստեղծել նոր հարց խանութի թեմայով</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Հարց իսպաներեն (Pregunta en español):
              </label>
              <input
                type="text"
                value={customPromptEs}
                onChange={(e) => setCustomPromptEs(e.target.value)}
                placeholder="Օրինակ՝ ¿De qué color es la falda?"
                className="w-full px-3.5 py-2.5 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] text-xs font-semibold focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Հարցի հայերեն թարգմանություն:
              </label>
              <input
                type="text"
                value={customPromptHy}
                onChange={(e) => setCustomPromptHy(e.target.value)}
                placeholder="Օրինակ՝ Ի՞նչ գույնի է կիսաշրջազգեստը։"
                className="w-full px-3.5 py-2.5 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] text-xs font-semibold focus:outline-none focus:border-[#EA580C]"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-gray-700 block">
              Պատասխանի տարբերակներ (նշեք ռադիո-կոճակով ճիշտ տարբերակը).
            </label>
            {[
              { val: customOpt1, set: setCustomOpt1, idx: 0 },
              { val: customOpt2, set: setCustomOpt2, idx: 1 },
              { val: customOpt3, set: setCustomOpt3, idx: 2 },
              { val: customOpt4, set: setCustomOpt4, idx: 3 },
            ].map((item) => (
              <div key={item.idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctOpt"
                  checked={customCorrectIdx === item.idx}
                  onChange={() => setCustomCorrectIdx(item.idx)}
                  className="w-4 h-4 accent-[#780016] cursor-pointer"
                />
                <input
                  type="text"
                  value={item.val}
                  onChange={(e) => item.set(e.target.value)}
                  placeholder={`Տարբերակ #${item.idx + 1}`}
                  className="flex-1 px-3.5 py-2 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] text-xs font-semibold focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Բացատրություն հայերեն (սխալի դեպքում ցուցադրելու համար):
            </label>
            <input
              type="text"
              value={customExplanationHy}
              onChange={(e) => setCustomExplanationHy(e.target.value)}
              placeholder="Օրինակ՝ Ճիշտ է, քանի որ կարմիր է նշված նկարագրության մեջ..."
              className="w-full px-3.5 py-2 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] text-xs font-semibold focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#780016] hover:bg-[#600012] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Պահպանել հարցը տվյալների բազայում</span>
          </button>
        </form>
      )}
    </div>
  );
};
