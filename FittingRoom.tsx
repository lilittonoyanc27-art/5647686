import React, { useState } from 'react';
import { ClothingItem, ClothingColor, ClothingSize } from './types';
import { CLOTHING_ITEMS } from './clothesData';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, triggerConfetti } from './audioHelper';
import { Sparkles, Trophy, CheckCircle, RefreshCw, Volume2, ShieldCheck } from 'lucide-react';

interface FittingRoomProps {
  onEarnCoins: (amount: number) => void;
}

interface CharacterOutfit {
  top: { nameEs: string; color: string; icon: string; id: string } | null;
  bottom: { nameEs: string; color: string; icon: string; id: string } | null;
  shoes: { nameEs: string; color: string; icon: string; id: string } | null;
  accessory: { nameEs: string; color: string; icon: string; id: string } | null;
}

export const FittingRoom: React.FC<FittingRoomProps> = ({ onEarnCoins }) => {
  const [outfit, setOutfit] = useState<CharacterOutfit>({
    top: { nameEs: 'Camiseta básica blanca', color: '#FFFFFF', icon: '👕', id: 'h-4' },
    bottom: { nameEs: 'Pantalones vaqueros azules', color: '#1E3A8A', icon: '👖', id: 'h-2' },
    shoes: { nameEs: 'Zapatillas blancas', color: '#FFFFFF', icon: '👟', id: 'c-1' },
    accessory: null,
  });

  const [activeCategory, setActiveCategory] = useState<'top' | 'bottom' | 'shoes' | 'accessory'>('top');
  const [selectedSize, setSelectedSize] = useState<ClothingSize>('M');

  // Question Prompt State: "¿Qué quieres ponerte?"
  const [pendingItem, setPendingItem] = useState<ClothingItem | null>(null);
  const [questionOptions, setQuestionOptions] = useState<{ textEs: string; isCorrect: boolean }[]>([]);
  const [feedback, setFeedback] = useState<{ messageEs: string; messageHy: string; isSuccess: boolean } | null>(null);

  // Challenge Missions
  const [currentMissionIndex, setCurrentMissionIndex] = useState<number>(0);
  const [missionCompleted, setMissionCompleted] = useState<boolean>(false);

  const MISSIONS = [
    {
      id: 'm-fiesta',
      titleEs: 'Viste al personaje para una fiesta',
      titleHy: 'Հագցրեք կերպարին տոնակատարության/երեկույթի համար',
      instructionEs: 'Elige ropa elegante: camisa formal, vestido o blazer, y zapatos elegantes.',
      instructionHy: 'Ընտրեք էլեգանտ հագուստ՝ վերնաշապիկ, զգեստ կամ բլեյզեր, և էլեգանտ կոշիկներ։',
      isValid: (o: CharacterOutfit) =>
        (o.top?.nameEs.includes('Camisa') || o.top?.nameEs.includes('Vestido') || o.top?.nameEs.includes('Traje') || o.top?.nameEs.includes('Blazer')) &&
        (o.shoes?.nameEs.includes('tacón') || o.shoes?.nameEs.includes('Mocasines') || o.shoes?.nameEs.includes('charol') || o.shoes?.nameEs.includes('Botines')),
      reward: 50,
    },
    {
      id: 'm-colegio',
      titleEs: 'Viste al personaje para ir al colegio',
      titleHy: 'Հագցրեք կերպարին դպրոց գնալու համար',
      instructionEs: 'Ropa cómoda y juvenil: camiseta o polo, vaqueros y zapatillas deportivas.',
      instructionHy: 'Հարմարավետ և երիտասարդական հագուստ՝ շապիկ կամ պոլո, ջինսեր և կեդեր։',
      isValid: (o: CharacterOutfit) =>
        (o.top?.nameEs.includes('Camiseta') || o.top?.nameEs.includes('Polo') || o.top?.nameEs.includes('Sudadera')) &&
        (o.bottom?.nameEs.includes('vaqueros') || o.bottom?.nameEs.includes('chinos')) &&
        o.shoes?.nameEs.includes('Zapatillas'),
      reward: 50,
    },
    {
      id: 'm-futbol',
      titleEs: 'Viste al personaje para jugar al fútbol',
      titleHy: 'Հագցրեք կերպարին ֆուտբոլ խաղալու համար',
      instructionEs: 'Ropa deportiva: camiseta o sudadera, pantalones cortos o chándal y zapatillas.',
      instructionHy: 'Սպորտային հագուստ՝ շապիկ կամ հուդի, կարճ տաբատ կամ շորտիկ և կեդեր։',
      isValid: (o: CharacterOutfit) =>
        (o.top?.nameEs.includes('Camiseta') || o.top?.nameEs.includes('Sudadera')) &&
        (o.bottom?.nameEs.includes('cortos') || o.bottom?.nameEs.includes('chándal') || o.bottom?.nameEs.includes('vaqueros')) &&
        o.shoes?.nameEs.includes('Zapatillas'),
      reward: 50,
    },
    {
      id: 'm-invierno',
      titleEs: 'Viste al personaje para el invierno',
      titleHy: 'Հագցրեք կերպարին ձմռան ցրտի համար',
      instructionEs: 'Ropa muy abrigada: abrigo o jersey de lana, botas y bufanda o gorro.',
      instructionHy: 'Շատ տաք հագուստ՝ վերարկու կամ բրդյա սվիտեր, բոտեր և շարֆ կամ գլխարկ։',
      isValid: (o: CharacterOutfit) =>
        (o.top?.nameEs.includes('Abrigo') || o.top?.nameEs.includes('Jersey') || o.top?.nameEs.includes('Chaqueta')) &&
        (o.shoes?.nameEs.includes('Botas') || o.shoes?.nameEs.includes('Botines')) &&
        (o.accessory?.nameEs.includes('Bufanda') || o.accessory?.nameEs.includes('Gorro') || o.accessory?.nameEs.includes('Guantes')),
      reward: 70,
    },
  ];

  const currentMission = MISSIONS[currentMissionIndex];

  // Initiate item selection with question "¿Qué quieres ponerte?"
  const startSelectClothingItem = (item: ClothingItem) => {
    playClickSound();
    setPendingItem(item);
    setFeedback(null);

    // Form question choices
    const correctPhrase = `Quiero ponerme ${item.spanishName.toLowerCase()}.`;
    const wrong1 = `No tengo ganas de comer nada.`;
    const wrong2 = `Mañana voy a la playa a nadar.`;
    const wrong3 = `Quiero dormir hasta las diez.`;

    const options = [
      { textEs: correctPhrase, isCorrect: true },
      { textEs: wrong1, isCorrect: false },
      { textEs: wrong2, isCorrect: false },
      { textEs: wrong3, isCorrect: false },
    ].sort(() => Math.random() - 0.5);

    setQuestionOptions(options);
    speakSpanish('¿Qué quieres ponerte?');
  };

  // User submits answer to the question
  const handleAnswerQuestion = (isCorrect: boolean, textEs: string) => {
    if (isCorrect && pendingItem) {
      playSuccessSound();
      setFeedback({
        messageEs: `¡Correcto! Te has puesto: ${pendingItem.spanishName}`,
        messageHy: `Ճիշտ է։ Դուք հագաք՝ ${pendingItem.armenianName}`,
        isSuccess: true,
      });

      // Update character outfit
      setOutfit(prev => {
        const next = { ...prev };
        const piece = {
          nameEs: pendingItem.spanishName,
          color: pendingItem.colorHex,
          icon: pendingItem.icon,
          id: pendingItem.id,
        };

        if (activeCategory === 'top') next.top = piece;
        else if (activeCategory === 'bottom') next.bottom = piece;
        else if (activeCategory === 'shoes') next.shoes = piece;
        else if (activeCategory === 'accessory') next.accessory = piece;

        return next;
      });

      setTimeout(() => {
        setPendingItem(null);
      }, 1200);
    } else {
      playErrorSound();
      setFeedback({
        messageEs: 'Respuesta incorrecta. Recuerda usar: «Quiero ponerme...»',
        messageHy: 'Սխալ պատասխան։ Հիշեք օգտագործել «Quiero ponerme...» (Ուզում եմ հագնել...) կառույցը։',
        isSuccess: false,
      });
    }
  };

  // Check mission status
  const handleCheckMission = () => {
    if (currentMission.isValid(outfit)) {
      playSuccessSound();
      triggerConfetti();
      setMissionCompleted(true);
      onEarnCoins(currentMission.reward);
    } else {
      playErrorSound();
      alert(`Todavía no cumples las condiciones del desafío.\n${currentMission.instructionHy}`);
    }
  };

  // Reset outfit
  const handleResetOutfit = () => {
    playClickSound();
    setOutfit({
      top: null,
      bottom: null,
      shoes: null,
      accessory: null,
    });
    setMissionCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            Probador Virtual Interactivo
          </span>
          <h2 className="text-2xl font-black">Վիրտուալ Հանդերձարան</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Հագցրեք կերպարին իսպաներեն հարցերի միջոցով և կատարեք թեմատիկ առաջադրանքները։
          </p>
        </div>

        <button
          onClick={handleResetOutfit}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Սկսել նորից (Reiniciar)</span>
        </button>
      </div>

      {/* Main Fitting Room Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Character Avatar (4 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E5D5C5] shadow-sm flex flex-col items-center justify-between min-h-[500px]">
          <div className="w-full text-center pb-2 border-b border-[#E5D5C5]">
            <span className="text-xs font-extrabold text-[#780016] uppercase tracking-wider">
              Tu Personaje (Քո կերպարը)
            </span>
            <div className="text-xs text-gray-500 font-semibold mt-0.5">
              Չափս՝ <strong>{selectedSize}</strong>
            </div>
          </div>

          {/* Character visual stage */}
          <div className="relative w-48 sm:w-56 h-84 flex flex-col items-center justify-center my-4 p-4 rounded-3xl bg-gradient-to-b from-amber-50/50 to-[#FAF6F0] border-2 border-dashed border-[#E5D5C5]">
            {/* Accessory (Hat / Glasses) */}
            <div className="h-10 flex items-center justify-center text-3xl">
              {outfit.accessory ? outfit.accessory.icon : '🧢'}
            </div>

            {/* Head */}
            <div className="w-16 h-16 rounded-full bg-[#F5D0B5] border-2 border-[#D4A373] flex items-center justify-center text-2xl shadow-xs">
              😊
            </div>

            {/* Top piece */}
            <div
              style={{ backgroundColor: outfit.top?.color || '#FFFFFF' }}
              className="w-28 h-24 rounded-2xl border-2 border-gray-400/40 shadow-md flex items-center justify-center text-4xl mt-1 transition-all"
              title={outfit.top ? outfit.top.nameEs : 'Sin camiseta'}
            >
              {outfit.top ? outfit.top.icon : '👕'}
            </div>

            {/* Bottom piece */}
            <div
              style={{ backgroundColor: outfit.bottom?.color || '#1E3A8A' }}
              className="w-24 h-24 rounded-b-2xl border-2 border-gray-400/40 shadow-md flex items-center justify-center text-4xl mt-0.5 transition-all"
              title={outfit.bottom ? outfit.bottom.nameEs : 'Sin pantalones'}
            >
              {outfit.bottom ? outfit.bottom.icon : '👖'}
            </div>

            {/* Shoes */}
            <div className="flex gap-2 text-3xl mt-1">
              {outfit.shoes ? outfit.shoes.icon : '👟'}
            </div>
          </div>

          {/* Current Outfit Spec */}
          <div className="w-full bg-[#FAF6F0] p-3 rounded-2xl border border-[#E5D5C5] space-y-1 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-500">Վերնահագուստ՝</span>
              <span className="text-gray-900 font-bold truncate max-w-[170px]">
                {outfit.top?.nameEs || 'Չընտրված'}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-500">Տաբատ՝</span>
              <span className="text-gray-900 font-bold truncate max-w-[170px]">
                {outfit.bottom?.nameEs || 'Չընտրված'}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-500">Կոշիկներ՝</span>
              <span className="text-gray-900 font-bold truncate max-w-[170px]">
                {outfit.shoes?.nameEs || 'Չընտրված'}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-500">Աքսեսուար՝</span>
              <span className="text-gray-900 font-bold truncate max-w-[170px]">
                {outfit.accessory?.nameEs || 'Չընտրված'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Wardrobe Selector & Question Prompts (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Mission Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-3xl border-2 border-amber-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#EA580C]" />
                <span className="text-xs font-black uppercase text-[#EA580C]">
                  Առաջադրանք #{currentMissionIndex + 1} / {MISSIONS.length}
                </span>
              </div>
              <span className="text-xs font-black text-[#780016] bg-amber-200/60 px-3 py-1 rounded-full">
                +{currentMission.reward} մետաղադրամ
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900">
                {currentMission.titleEs}
              </h3>
              <p className="text-xs font-bold text-[#780016] mt-0.5">
                {currentMission.titleHy}
              </p>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                {currentMission.instructionHy}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleCheckMission}
                className="py-2.5 px-5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Ստուգել հագուստը (Comprobar)</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setCurrentMissionIndex((prev) => (prev + 1) % MISSIONS.length);
                  setMissionCompleted(false);
                }}
                className="text-xs font-bold text-gray-600 hover:text-[#780016] p-2 cursor-pointer"
              >
                Հաջորդ առաքելությունը →
              </button>
            </div>
          </div>

          {/* Wardrobe Category Tabs */}
          <div className="bg-white p-4 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'top', labelEs: 'Prendas arriba', labelHy: 'Վերնամաս', icon: '👕' },
                { id: 'bottom', labelEs: 'Pantalones', labelHy: 'Տաբատներ', icon: '👖' },
                { id: 'shoes', labelEs: 'Calzado', labelHy: 'Կոշիկներ', icon: '👟' },
                { id: 'accessory', labelEs: 'Accesorios', labelHy: 'Աքսեսուարներ', icon: '🧣' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setActiveCategory(cat.id as any);
                  }}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1 font-bold text-xs transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#780016] text-white shadow-md'
                      : 'bg-[#FAF6F0] text-gray-700 hover:bg-orange-50 border border-[#E5D5C5]'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.labelHy}</span>
                </button>
              ))}
            </div>

            {/* Size selector */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E5D5C5]/60">
              <span className="text-xs font-bold text-gray-600">Չափսի ընտրություն (Talla):</span>
              <div className="flex gap-1.5">
                {(['XS', 'S', 'M', 'L', 'XL'] as ClothingSize[]).map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      playClickSound();
                      setSelectedSize(size);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-[#FAF6F0] text-gray-700 hover:bg-orange-100 border border-[#E5D5C5]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Items Grid for this Category */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
              {CLOTHING_ITEMS.filter(item => {
                if (activeCategory === 'top') return item.category === 'hombre' || item.category === 'mujer';
                if (activeCategory === 'bottom') return item.spanishName.includes('pantal') || item.spanishName.includes('vaquero') || item.spanishName.includes('falda');
                if (activeCategory === 'shoes') return item.category === 'calzado';
                if (activeCategory === 'accessory') return item.category === 'accesorios';
                return true;
              }).map(item => (
                <div
                  key={item.id}
                  onClick={() => startSelectClothingItem(item)}
                  className="p-3 bg-[#FAF6F0] hover:bg-white rounded-2xl border border-[#E5D5C5] hover:border-[#780016] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div className="text-3xl text-center mb-1">{item.icon}</div>
                  <h4 className="text-xs font-extrabold text-gray-900 leading-tight">
                    {item.spanishName}
                  </h4>
                  <p className="text-[10px] font-bold text-[#EA580C] mt-0.5 truncate">
                    {item.armenianName}
                  </p>
                  <span className="text-xs font-black text-[#780016] mt-2 block">
                    {item.price} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* "¿Qué quieres ponerte?" Interactive Modal */}
      {pendingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-[#780016]/30 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header with audio prompt */}
            <div className="bg-gradient-to-r from-[#780016] to-[#EA580C] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{pendingItem.icon}</span>
                <div>
                  <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
                    Հարց հանդերձարանում
                  </span>
                  <h3 className="text-xl font-black">¿Qué quieres ponerte?</h3>
                </div>
              </div>
              <button
                onClick={() => speakSpanish('¿Qué quieres ponerte?')}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors cursor-pointer"
                title="Escuchar pregunta"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-bold text-gray-600">
                  Նշեք ճիշտ իսպաներեն արտահայտությունը՝ հագուստը կրելու համար։
                </p>
              </div>

              {/* Options list */}
              <div className="space-y-2.5">
                {questionOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerQuestion(opt.isCorrect, opt.textEs)}
                    className="w-full p-4 text-left rounded-2xl bg-[#FAF6F0] hover:bg-orange-50 border border-[#E5D5C5] hover:border-[#EA580C] font-bold text-sm text-gray-800 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.textEs}</span>
                    <span className="text-xs text-[#EA580C] font-semibold">Ընտրել</span>
                  </button>
                ))}
              </div>

              {/* Instant Feedback Alert */}
              {feedback && (
                <div
                  className={`p-4 rounded-2xl border font-bold text-xs space-y-1 ${
                    feedback.isSuccess
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-red-50 border-red-300 text-red-900'
                  }`}
                >
                  <p>{feedback.messageEs}</p>
                  <p className="font-semibold">{feedback.messageHy}</p>
                </div>
              )}

              <button
                onClick={() => setPendingItem(null)}
                className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                Չեղարկել (Cancelar)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
