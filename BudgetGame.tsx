import React, { useState } from 'react';
import { ClothingItem } from './types';
import { CLOTHING_ITEMS } from './clothesData';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, playCashRegisterSound, triggerConfetti } from './audioHelper';
import { Wallet, Plus, Trash2, CheckCircle2, Receipt, ArrowRight, Sparkles } from 'lucide-react';

interface BudgetGameProps {
  onEarnCoins: (amount: number) => void;
}

export const BudgetGame: React.FC<BudgetGameProps> = ({ onEarnCoins }) => {
  const INITIAL_BUDGET = 100;
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [discountApplied, setDiscountApplied] = useState<number>(0); // 0, 10, 20, 30, 50

  // Interactive Quiz questions
  const [activeQuestion, setActiveQuestion] = useState<'total' | 'remaining' | 'expensive' | 'cheapest' | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [quizFeedback, setQuizFeedback] = useState<{ messageEs: string; messageHy: string; isSuccess: boolean } | null>(null);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  // Calculate prices
  const rawTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = Math.round(rawTotal * (1 - discountApplied / 100));
  const remainingBudget = INITIAL_BUDGET - finalTotal;

  // Most expensive and cheapest items
  const mostExpensive = selectedItems.length > 0
    ? [...selectedItems].sort((a, b) => b.price - a.price)[0]
    : null;
  const cheapest = selectedItems.length > 0
    ? [...selectedItems].sort((a, b) => a.price - b.price)[0]
    : null;

  const handleAddItem = (item: ClothingItem) => {
    playClickSound();
    if (finalTotal + item.price > INITIAL_BUDGET) {
      playErrorSound();
      alert(`¡Cuidado! Si añades ${item.spanishName}, superarás tu presupuesto de 100 €.\nԶգուշացեք. եթե ավելացնեք այս ապրանքը, կգերազանցեք 100 եվրոյի բյուջեն։`);
      return;
    }
    setSelectedItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    playClickSound();
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    setQuizFeedback(null);
  };

  const handleApplyDiscount = (percent: number) => {
    playClickSound();
    setDiscountApplied(percent);
    speakSpanish(`Descuento del ${percent} por ciento aplicado.`);
  };

  // Check interactive math question
  const checkAnswer = () => {
    if (!activeQuestion) return;

    if (activeQuestion === 'total') {
      const parsed = parseFloat(userAnswer);
      if (Math.abs(parsed - finalTotal) <= 0.5) {
        handleCorrect('¡Correcto! El coste total es de ' + finalTotal + ' euros.', `Ճիշտ է։ Ընդհանուր արժեքը ${finalTotal} եվրո է։`);
      } else {
        handleWrong(`El coste total correcto es ${finalTotal} euros.`);
      }
    } else if (activeQuestion === 'remaining') {
      const parsed = parseFloat(userAnswer);
      if (Math.abs(parsed - remainingBudget) <= 0.5) {
        handleCorrect('¡Muy bien! Te quedan ' + remainingBudget + ' euros de tu presupuesto.', `Ապրե՛ք։ Ձեր բյուջեից մնում է ${remainingBudget} եվրո։`);
      } else {
        handleWrong(`El dinero restante correcto es ${remainingBudget} euros.`);
      }
    } else if (activeQuestion === 'expensive') {
      if (mostExpensive && userAnswer.toLowerCase().includes(mostExpensive.spanishName.toLowerCase().split(' ')[0])) {
        handleCorrect(`¡Exacto! El producto más caro es ${mostExpensive.spanishName} (${mostExpensive.price} €).`, `Ճիշտ է։ Ամենաթանկ ապրանքն է՝ ${mostExpensive.spanishName}։`);
      } else {
        handleWrong(`El producto más caro es ${mostExpensive?.spanishName}.`);
      }
    } else if (activeQuestion === 'cheapest') {
      if (cheapest && userAnswer.toLowerCase().includes(cheapest.spanishName.toLowerCase().split(' ')[0])) {
        handleCorrect(`¡Exacto! El producto más barato es ${cheapest.spanishName} (${cheapest.price} €).`, `Ճիշտ է։ Ամենաէժան ապրանքն է՝ ${cheapest.spanishName}։`);
      } else {
        handleWrong(`El producto más barato es ${cheapest?.spanishName}.`);
      }
    }
  };

  const handleCorrect = (msgEs: string, msgHy: string) => {
    playSuccessSound();
    triggerConfetti();
    setQuizFeedback({ messageEs: msgEs, messageHy: msgHy, isSuccess: true });
    onEarnCoins(30);
  };

  const handleWrong = (msgEs: string) => {
    playErrorSound();
    setQuizFeedback({
      messageEs: msgEs,
      messageHy: 'Սխալ հաշվարկ։ Ստուգեք թվերը և փորձեք նորից։',
      isSuccess: false,
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Añade al menos una prenda a la cesta.\nԶամբյուղի մեջ առնվազն մեկ հագուստ ավելացրեք։');
      return;
    }
    playCashRegisterSound();
    triggerConfetti();
    setShowReceipt(true);
    onEarnCoins(50);
  };

  return (
    <div className="space-y-6">
      {/* Header with budget wallet */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl shadow-md">
              💶
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-200">
                Juego de Finanzas y Ropa
              </span>
              <h2 className="text-2xl font-black">Tienes 100 Euros (Դուք ունեք 100 €)</h2>
              <p className="text-sm font-medium text-amber-100 mt-0.5">
                Կատարեք գնումներ, կառավարեք բյուջեն և պատասխանեք իսպաներեն հաշվարկային հարցերին։
              </p>
            </div>
          </div>

          {/* Budget Meter */}
          <div className="bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/30 text-right min-w-[200px]">
            <span className="text-xs text-amber-200 font-bold block">Մնացած բյուջե (Restante)</span>
            <span className={`text-3xl font-black ${remainingBudget < 0 ? 'text-red-300' : 'text-emerald-300'}`}>
              {remainingBudget} €
            </span>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  remainingBudget < 15 ? 'bg-red-400' : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.max(0, Math.min(100, (remainingBudget / INITIAL_BUDGET) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Store Shelf of Items (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5D5C5]">
            <h3 className="font-extrabold text-[#780016] text-base flex items-center gap-2">
              <span>🛍️</span>
              <span>Prendas disponibles en tienda</span>
            </h3>
            <span className="text-xs font-bold text-gray-500">
              Սեղմեք «+» ապրանքը զամբյուղ ավելացնելու համար
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto p-1">
            {CLOTHING_ITEMS.slice(0, 18).map(item => (
              <div
                key={item.id}
                className="p-3 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] hover:border-[#780016] transition-all flex flex-col justify-between"
              >
                <div className="text-3xl text-center mb-1">{item.icon}</div>
                <h4 className="text-xs font-black text-gray-900 leading-tight">
                  {item.spanishName}
                </h4>
                <p className="text-[10px] font-semibold text-[#EA580C] truncate">
                  {item.armenianName}
                </p>
                <div className="mt-2 pt-2 border-t border-[#E5D5C5]/60 flex items-center justify-between">
                  <span className="text-sm font-black text-[#780016]">
                    {item.price} €
                  </span>
                  <button
                    onClick={() => handleAddItem(item)}
                    className="p-1.5 bg-[#780016] hover:bg-[#600012] text-white rounded-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    title="Añadir a la cesta"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Coupons Bar */}
          <div className="pt-3 border-t border-[#E5D5C5] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-600">Կիրառել զեղչ (Descuento)՝</span>
            {[0, 10, 20, 30, 50].map(pct => (
              <button
                key={pct}
                onClick={() => handleApplyDiscount(pct)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  discountApplied === pct
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-gray-700 hover:bg-orange-50 border border-[#E5D5C5]'
                }`}
              >
                {pct === 0 ? 'Առանց զեղչի' : `-${pct}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Cart, Math Questions, Receipt (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cart Card */}
          <div className="bg-white p-5 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5D5C5]">
              <h3 className="font-extrabold text-[#780016] text-sm flex items-center gap-2">
                <span>🛒</span>
                <span>Tu Cesta de la Compra ({selectedItems.length})</span>
              </h3>
              <span className="text-xs font-black text-[#EA580C]">
                Ընդհանուր՝ {finalTotal} €
              </span>
            </div>

            {selectedItems.length === 0 ? (
              <div className="p-8 text-center text-xs font-bold text-gray-400">
                Զամբյուղը դատարկ է։ Ընտրեք հագուստ ձախ կողմից։
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-bold text-gray-800 truncate">{item.spanishName}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-black text-[#780016]">{item.price} €</span>
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations breakdown */}
            <div className="pt-2 border-t border-[#E5D5C5] space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-gray-600">
                <span>Ապրանքների գումար (Suma inicial):</span>
                <span>{rawTotal} €</span>
              </div>
              {discountApplied > 0 && (
                <div className="flex justify-between font-bold text-emerald-600">
                  <span>Զեղչ ({discountApplied}%):</span>
                  <span>-{(rawTotal - finalTotal).toFixed(0)} €</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm text-[#780016] pt-1">
                <span>Վերջնական վճար (Total a pagar):</span>
                <span>{finalTotal} €</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className="w-full py-3 bg-[#780016] hover:bg-[#600012] disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              <span>Վճարել և ստանալ կտրոն (Pagar en caja)</span>
            </button>
          </div>

          {/* Interactive Math Quiz Questions */}
          <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-200 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#EA580C] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Հաշվարկային հարցեր (Preguntas matemáticas)</span>
            </h4>

            {/* Question buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveQuestion('total');
                  setUserAnswer('');
                  setQuizFeedback(null);
                  speakSpanish('¿Cuánto cuesta todo?');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeQuestion === 'total'
                    ? 'bg-[#780016] text-white shadow-xs'
                    : 'bg-white text-gray-800 hover:bg-orange-100 border border-amber-200'
                }`}
              >
                ¿Cuánto cuesta todo?
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveQuestion('remaining');
                  setUserAnswer('');
                  setQuizFeedback(null);
                  speakSpanish('¿Cuánto dinero te queda?');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeQuestion === 'remaining'
                    ? 'bg-[#780016] text-white shadow-xs'
                    : 'bg-white text-gray-800 hover:bg-orange-100 border border-amber-200'
                }`}
              >
                ¿Cuánto dinero te queda?
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveQuestion('expensive');
                  setUserAnswer('');
                  setQuizFeedback(null);
                  speakSpanish('¿Qué producto es más caro?');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeQuestion === 'expensive'
                    ? 'bg-[#780016] text-white shadow-xs'
                    : 'bg-white text-gray-800 hover:bg-orange-100 border border-amber-200'
                }`}
              >
                ¿Qué producto es más caro?
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveQuestion('cheapest');
                  setUserAnswer('');
                  setQuizFeedback(null);
                  speakSpanish('¿Qué producto es más barato?');
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeQuestion === 'cheapest'
                    ? 'bg-[#780016] text-white shadow-xs'
                    : 'bg-white text-gray-800 hover:bg-orange-100 border border-amber-200'
                }`}
              >
                ¿Qué producto es más barato?
              </button>
            </div>

            {/* Answer Input form */}
            {activeQuestion && (
              <div className="pt-2 space-y-2 animate-in fade-in">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={
                      activeQuestion === 'total' || activeQuestion === 'remaining'
                        ? 'Մուտքագրեք թիվը եվրոյով (օրինակ՝ 45)...'
                        : 'Մուտքագրեք ապրանքի անունը (օրինակ՝ camiseta)...'
                    }
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-amber-300 text-xs text-gray-800 font-semibold focus:outline-none focus:border-[#EA580C]"
                  />
                  <button
                    onClick={checkAnswer}
                    className="px-4 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Ստուգել
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Feedback */}
            {quizFeedback && (
              <div
                className={`p-3 rounded-xl border text-xs font-bold ${
                  quizFeedback.isSuccess
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}
              >
                <p>{quizFeedback.messageEs}</p>
                <p className="font-semibold text-gray-700">{quizFeedback.messageHy}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Realistic Receipt (Ticket de compra) Modal */}
      {showReceipt && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowReceipt(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-dashed border-gray-400 font-mono text-xs space-y-3 animate-in zoom-in-95 duration-200 text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Store Receipt Header */}
            <div className="text-center pb-2 border-b-2 border-dashed border-gray-300">
              <h3 className="font-black text-sm uppercase tracking-wider text-[#780016]">
                ESPAÑOL SHOP S.L.
              </h3>
              <p className="text-[10px] text-gray-500">Calle Gran Vía, 28, Madrid</p>
              <p className="text-[10px] text-gray-500">NIF: B-87654321</p>
              <p className="text-[10px] text-gray-400 mt-1">Ticket simplificado de compra</p>
            </div>

            {/* Itemized lines */}
            <div className="space-y-1.5 py-2 border-b-2 border-dashed border-gray-300">
              {selectedItems.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="truncate max-w-[180px]">{item.spanishName}</span>
                  <span className="font-bold">{item.price}.00 €</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1 font-bold">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{rawTotal}.00 €</span>
              </div>
              {discountApplied > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Descuento (-{discountApplied}%):</span>
                  <span>-{(rawTotal - finalTotal).toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black pt-1 border-t border-gray-200">
                <span>TOTAL A PAGAR:</span>
                <span className="text-[#780016]">{finalTotal}.00 €</span>
              </div>
              <div className="flex justify-between text-gray-600 pt-1">
                <span>Entregado:</span>
                <span>100.00 €</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Su cambio (մանրը):</span>
                <span>{remainingBudget}.00 €</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-3 border-t-2 border-dashed border-gray-300 text-[10px] text-gray-500 space-y-1">
              <p>¡Muchas gracias por su visita!</p>
              <p>Guarde este ticket para cambios en 30 días.</p>
              <button
                onClick={() => setShowReceipt(false)}
                className="mt-3 w-full py-2 bg-[#780016] text-white font-sans font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Փակել կտրոնը (Cerrar)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
