import React, { useState, useEffect } from 'react';
import { ClothingItem } from './types';
import { CLOTHING_ITEMS } from './clothesData';
import { speakSpanish, playClickSound, playSuccessSound, playErrorSound, playCashRegisterSound, triggerConfetti } from './audioHelper';
import { Sparkles, Trophy, Clock, CheckCircle2, RotateCcw, Volume2, HelpCircle } from 'lucide-react';

interface MiniGamesProps {
  onEarnCoins: (amount: number) => void;
}

export const MiniGames: React.FC<MiniGamesProps> = ({ onEarnCoins }) => {
  const [selectedGame, setSelectedGame] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);

  // ----------------------------------------------------
  // JUEGO 1: Encuentra la ropa (Find the target item)
  // ----------------------------------------------------
  const [j1Target, setJ1Target] = useState<ClothingItem>(CLOTHING_ITEMS[0]);
  const [j1Options, setJ1Options] = useState<ClothingItem[]>([]);

  const startJ1 = () => {
    const target = CLOTHING_ITEMS[Math.floor(Math.random() * CLOTHING_ITEMS.length)];
    const others = CLOTHING_ITEMS.filter(i => i.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setJ1Target(target);
    setJ1Options([target, ...others].sort(() => Math.random() - 0.5));
    speakSpanish(target.spanishName);
  };

  const handleJ1Select = (item: ClothingItem) => {
    if (item.id === j1Target.id) {
      playSuccessSound();
      triggerConfetti();
      setScore(s => s + 20);
      onEarnCoins(20);
      setTimeout(startJ1, 800);
    } else {
      playErrorSound();
    }
  };

  // ----------------------------------------------------
  // JUEGO 2: Compra rápida (Fast shopping rush with timer)
  // ----------------------------------------------------
  const [j2Timer, setJ2Timer] = useState<number>(15);
  const [j2Active, setJ2Active] = useState<boolean>(false);
  const [j2Target, setJ2Target] = useState<ClothingItem>(CLOTHING_ITEMS[1]);
  const [j2Grid, setJ2Grid] = useState<ClothingItem[]>([]);

  const startJ2 = () => {
    setJ2Timer(15);
    setJ2Active(true);
    pickJ2Round();
  };

  const pickJ2Round = () => {
    const target = CLOTHING_ITEMS[Math.floor(Math.random() * CLOTHING_ITEMS.length)];
    const others = CLOTHING_ITEMS.filter(i => i.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);
    setJ2Target(target);
    setJ2Grid([target, ...others].sort(() => Math.random() - 0.5));
    speakSpanish(`Rápido, busca: ${target.spanishName}`);
  };

  useEffect(() => {
    if (!j2Active) return;
    const interval = setInterval(() => {
      setJ2Timer(t => {
        if (t <= 1) {
          setJ2Active(false);
          playErrorSound();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [j2Active]);

  const handleJ2Click = (item: ClothingItem) => {
    if (!j2Active) return;
    if (item.id === j2Target.id) {
      playSuccessSound();
      setScore(s => s + 30);
      onEarnCoins(30);
      pickJ2Round();
    } else {
      playErrorSound();
    }
  };

  // ----------------------------------------------------
  // JUEGO 3: ¿Cuánto cuesta? (Guess or calculate price)
  // ----------------------------------------------------
  const [j3Item, setJ3Item] = useState<ClothingItem>(CLOTHING_ITEMS[2]);
  const [j3Choices, setJ3Choices] = useState<number[]>([]);

  const startJ3 = () => {
    const item = CLOTHING_ITEMS[Math.floor(Math.random() * CLOTHING_ITEMS.length)];
    const actual = item.price;
    const fake1 = Math.max(5, actual + 10);
    const fake2 = Math.max(5, actual - 8);
    const fake3 = actual + 18;
    setJ3Item(item);
    setJ3Choices([actual, fake1, fake2, fake3].sort(() => Math.random() - 0.5));
  };

  const handleJ3Choice = (val: number) => {
    if (val === j3Item.price) {
      playSuccessSound();
      triggerConfetti();
      setScore(s => s + 25);
      onEarnCoins(25);
      setTimeout(startJ3, 1000);
    } else {
      playErrorSound();
    }
  };

  // ----------------------------------------------------
  // JUEGO 4: Viste al personaje (Dress character by prompt)
  // ----------------------------------------------------
  const [j4Prompt, setJ4Prompt] = useState<{ es: string; hy: string; correctCategory: string; icon: string }>({
    es: 'Lleva una prenda abrigada para el cuello',
    hy: 'Հագցրեք պարանոցի համար տաք հագուստ',
    correctCategory: 'accesorios',
    icon: '🧣',
  });

  const J4_PROMPTS = [
    { es: 'Ponte una prenda formal para bodas o reuniones', hy: 'Հագեք հանդիսավոր հագուստ հարսանիքների համար', correctCategory: 'hombre', icon: '🤵' },
    { es: 'Ponte calzado para salir a correr', hy: 'Հագեք վազքի կոշիկներ', correctCategory: 'calzado', icon: '👟' },
    { es: 'Ponte una prenda cómoda para dormir', hy: 'Հագեք քնելու հարմարավետ հագուստ', correctCategory: 'hombre', icon: '🛌' },
  ];

  const handleJ4Pick = (item: ClothingItem) => {
    if (item.category === j4Prompt.correctCategory || item.spanishName.includes('bufanda')) {
      playSuccessSound();
      triggerConfetti();
      setScore(s => s + 35);
      onEarnCoins(35);
      setJ4Prompt(J4_PROMPTS[Math.floor(Math.random() * J4_PROMPTS.length)]);
    } else {
      playErrorSound();
    }
  };

  // ----------------------------------------------------
  // JUEGO 5: El cliente difícil (Customer service challenge)
  // ----------------------------------------------------
  const [j5Step, setJ5Step] = useState<number>(0);
  const J5_SCENARIOS = [
    {
      clientSayEs: '¡Esta chaqueta tiene una costura rota! ¡Exijo una solución ya!',
      clientSayHy: 'Այս բաճկոնի կարը պատռված է։ Ես անհապաղ լուծում եմ պահանջում։',
      options: [
        { text: 'Disculpe las molestias. Le ofrecemos un cambio inmediato o reembolso con su ticket.', isCorrect: true },
        { text: 'No es mi problema, usted la rompió.', isCorrect: false },
        { text: 'Vuelva el próximo mes que estamos cerrando.', isCorrect: false },
      ],
    },
    {
      clientSayEs: 'Llevo esperando diez minutos para pagar y hay una sola caja abierta.',
      clientSayHy: 'Տասը րոպե է սպասում եմ վճարելու համար, իսկ միայն մեկ դրամարկղ է բաց։',
      options: [
        { text: 'Tiene toda la razón, abrimos inmediatamente la segunda caja para atenderle.', isCorrect: true },
        { text: 'Pues espere otros diez minutos con paciencia.', isCorrect: false },
      ],
    },
  ];

  const handleJ5Option = (isCorrect: boolean) => {
    if (isCorrect) {
      playSuccessSound();
      triggerConfetti();
      setScore(s => s + 40);
      onEarnCoins(40);
      setJ5Step(s => (s + 1) % J5_SCENARIOS.length);
    } else {
      playErrorSound();
    }
  };

  // ----------------------------------------------------
  // JUEGO 6: El detective de ropa (Clothing detective clues)
  // ----------------------------------------------------
  const [j6ClueIndex, setJ6ClueIndex] = useState<number>(0);
  const J6_MYSTERIES = [
    {
      cluesEs: [
        'Pista 1: Es de cuero vacuno o sintético.',
        'Pista 2: Nos protege del frío en invierno.',
        'Pista 3: Cubre los pies y llega por encima del tobillo.',
      ],
      cluesHy: [
        'Հուշում 1. Կաշվից կամ սինթետիկից է։',
        'Հուշում 2. Ձմռանը պաշտպանում է ցրտից։',
        'Հուշում 3. Ծածկում է ոտքերը և բարձրանում կոճից վերև։',
      ],
      correctItem: 'Las botas',
      options: ['Las botas', 'Las sandalias', 'El sombrero', 'La camiseta'],
    },
    {
      cluesEs: [
        'Pista 1: Tiene una visera en la parte frontal.',
        'Pista 2: Se usa mucho para hacer deporte al aire libre.',
        'Pista 3: Nos resguarda los ojos del sol.',
      ],
      cluesHy: [
        'Հուշում 1. Առջևի մասում ունի հովար։',
        'Հուշում 2. Շատ են օգտագործում բացօթյա սպորտի ժամանակ։',
        'Հուշում 3. Աչքերը պաշտպանում է արևից։',
      ],
      correctItem: 'La gorra',
      options: ['La gorra', 'El pijama', 'La corbata', 'El bañador'],
    },
  ];

  // ----------------------------------------------------
  // JUEGO 7: Memoria (Flip cards: Spanish word & visual icon)
  // ----------------------------------------------------
  const [memCards, setMemCards] = useState<{ id: number; content: string; pairId: number; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  const startMemory = () => {
    const rawPairs = [
      { text: 'La camiseta', icon: '👕' },
      { text: 'Los vaqueros', icon: '👖' },
      { text: 'El vestido', icon: '👗' },
      { text: 'Los zapatos', icon: '👟' },
    ];
    let cards: any[] = [];
    rawPairs.forEach((p, idx) => {
      cards.push({ id: idx * 2, content: p.text, pairId: idx, isFlipped: false, isMatched: false });
      cards.push({ id: idx * 2 + 1, content: p.icon, pairId: idx, isFlipped: false, isMatched: false });
    });
    setMemCards(cards.sort(() => Math.random() - 0.5));
    setFlippedIndices([]);
  };

  const handleCardClick = (idx: number) => {
    playClickSound();
    if (memCards[idx].isFlipped || memCards[idx].isMatched || flippedIndices.length === 2) return;

    const newCards = [...memCards];
    newCards[idx].isFlipped = true;
    setMemCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memCards[first].pairId === memCards[second].pairId) {
        playSuccessSound();
        triggerConfetti();
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setMemCards(newCards);
        setFlippedIndices([]);
        setScore(s => s + 25);
        onEarnCoins(25);
      } else {
        setTimeout(() => {
          playErrorSound();
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setMemCards(newCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // ----------------------------------------------------
  // JUEGO 8: La caja registradora (Cashier change calculation)
  // ----------------------------------------------------
  const [j8BillTotal, setJ8BillTotal] = useState<number>(37);
  const [j8GivenAmount, setJ8GivenAmount] = useState<number>(50);
  const [j8UserChange, setJ8UserChange] = useState<string>('');
  const [j8Feedback, setJ8Feedback] = useState<string | null>(null);

  const startJ8Round = () => {
    const total = Math.floor(Math.random() * 40) + 10;
    const given = total < 20 ? 20 : total < 50 ? 50 : 100;
    setJ8BillTotal(total);
    setJ8GivenAmount(given);
    setJ8UserChange('');
    setJ8Feedback(null);
  };

  const handleJ8Submit = () => {
    const expected = j8GivenAmount - j8BillTotal;
    const user = parseFloat(j8UserChange);
    if (Math.abs(user - expected) < 0.1) {
      playCashRegisterSound();
      triggerConfetti();
      setJ8Feedback(`¡Excelente! El cambio exacto es ${expected} euros.`);
      setScore(s => s + 35);
      onEarnCoins(35);
      setTimeout(startJ8Round, 1400);
    } else {
      playErrorSound();
      setJ8Feedback(`Error: ${j8GivenAmount} - ${j8BillTotal} = ${expected} euros.`);
    }
  };

  // Initialize
  useEffect(() => {
    startJ1();
    startJ3();
    startMemory();
    startJ8Round();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner with Game Selector */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
            8 Mini-Juegos Educativos
          </span>
          <h2 className="text-2xl font-black">Խաղային Գոտի (Mini-Juegos)</h2>
          <p className="text-sm font-medium text-amber-100 mt-1">
            Ամրապնդեք հագուստի բառապաշարն ու հաշվարկները 8 ինտերակտիվ խաղերով։
          </p>
        </div>

        {/* Global Game Score */}
        <div className="bg-white/20 px-5 py-3 rounded-2xl border border-white/30 text-center">
          <span className="text-xs font-bold text-amber-200 block">Ընդհանուր միավորներ</span>
          <span className="text-2xl font-black text-amber-300">{score} pts</span>
        </div>
      </div>

      {/* 8 Game Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {[
          { id: 1, title: '1. Encuentra', icon: '🔍' },
          { id: 2, title: '2. Rápido', icon: '⚡' },
          { id: 3, title: '3. Precio', icon: '🏷️' },
          { id: 4, title: '4. Viste', icon: '👗' },
          { id: 5, title: '5. Cliente', icon: '😠' },
          { id: 6, title: '6. Detective', icon: '🕵️' },
          { id: 7, title: '7. Memoria', icon: '🧠' },
          { id: 8, title: '8. La Caja', icon: '💵' },
        ].map(g => (
          <button
            key={g.id}
            onClick={() => {
              playClickSound();
              setSelectedGame(g.id);
            }}
            className={`p-3 rounded-2xl font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer ${
              selectedGame === g.id
                ? 'bg-[#780016] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-orange-50 border border-[#E5D5C5]'
            }`}
          >
            <span className="text-xl">{g.icon}</span>
            <span className="truncate">{g.title}</span>
          </button>
        ))}
      </div>

      {/* Active Game Area */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5D5C5] shadow-xs">
        {/* GAME 1 */}
        {selectedGame === 1 && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <div>
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 1: Encuentra la ropa</span>
              <h3 className="text-xl font-black text-gray-900 mt-1">
                Գտեք այս հագուստը՝ <span className="text-[#780016]">«{j1Target.spanishName}»</span>
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">({j1Target.armenianName})</p>
            </div>

            <button
              onClick={() => speakSpanish(j1Target.spanishName)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-[#EA580C] font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Լսել անվանումը</span>
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {j1Options.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJ1Select(item)}
                  className="p-5 bg-[#FAF6F0] hover:bg-orange-50 border-2 border-[#E5D5C5] hover:border-[#780016] rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                >
                  <span className="text-5xl">{item.icon}</span>
                  <span className="text-xs font-extrabold text-gray-800">{item.spanishName}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 2 */}
        {selectedGame === 2 && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-gray-600">Ժամանակ՝</span>
              <span className="text-2xl font-black text-[#EA580C]">{j2Timer} վրկ</span>
            </div>

            {!j2Active ? (
              <div className="space-y-4 py-8">
                <h3 className="text-xl font-black text-gray-900">Compra Rápida (Արագ գնումների մրցավազք)</h3>
                <p className="text-xs font-medium text-gray-600">
                  Վաճառողն ասում է ապրանքը, դուք պետք է շատ արագ գտնեք այն 15 վայրկյանում։
                </p>
                <button
                  onClick={startJ2}
                  className="py-3 px-6 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold rounded-2xl shadow-md cursor-pointer text-sm"
                >
                  Սկսել խաղը (Empezar)
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-[#780016]">
                  Գտեք՝ «{j2Target.spanishName}»
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {j2Grid.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleJ2Click(item)}
                      className="p-4 bg-[#FAF6F0] hover:bg-orange-100 rounded-2xl border border-[#E5D5C5] text-4xl hover:scale-105 transition-transform cursor-pointer"
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GAME 3 */}
        {selectedGame === 3 && (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <div>
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 3: ¿Cuánto cuesta?</span>
              <div className="text-6xl my-3">{j3Item.icon}</div>
              <h3 className="text-xl font-black text-gray-900">{j3Item.spanishName}</h3>
              <p className="text-xs text-gray-500 font-semibold">{j3Item.armenianName}</p>
            </div>

            <p className="text-sm font-bold text-gray-700">
              Գուշակեք կամ հաշվեք ճիշտ գինը.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {j3Choices.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJ3Choice(val)}
                  className="py-4 px-4 bg-[#FAF6F0] hover:bg-[#780016] text-[#780016] hover:text-white border-2 border-[#E5D5C5] hover:border-[#780016] font-black rounded-2xl text-lg transition-all cursor-pointer shadow-xs"
                >
                  {val} €
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 4 */}
        {selectedGame === 4 && (
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <div>
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 4: Viste al personaje</span>
              <h3 className="text-lg font-black text-gray-900 mt-1">«{j4Prompt.es}»</h3>
              <p className="text-xs font-bold text-[#780016] mt-0.5">{j4Prompt.hy}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CLOTHING_ITEMS.slice(0, 8).map(item => (
                <button
                  key={item.id}
                  onClick={() => handleJ4Pick(item)}
                  className="p-3 bg-[#FAF6F0] hover:bg-orange-50 border border-[#E5D5C5] rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-bold text-gray-800 truncate w-full">{item.spanishName}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 5 */}
        {selectedGame === 5 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 5: El cliente difícil</span>
              <h3 className="text-lg font-black text-gray-900 mt-1">Դժվար հաճախորդի սպասարկում</h3>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-3">
              <span className="text-3xl">😠</span>
              <div>
                <p className="text-sm font-bold text-red-950 italic">
                  «{J5_SCENARIOS[j5Step].clientSayEs}»
                </p>
                <p className="text-xs font-semibold text-gray-700 mt-1">
                  «{J5_SCENARIOS[j5Step].clientSayHy}»
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-600 block">Ընտրեք լավագույն պրոֆեսիոնալ պատասխանը.</span>
              {J5_SCENARIOS[j5Step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJ5Option(opt.isCorrect)}
                  className="w-full p-3.5 text-left rounded-2xl bg-[#FAF6F0] hover:bg-orange-50 border border-[#E5D5C5] text-xs font-bold text-gray-800 transition-colors cursor-pointer"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 6 */}
        {selectedGame === 6 && (
          <div className="space-y-6 max-w-lg mx-auto text-center">
            <div>
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 6: El detective de ropa</span>
              <h3 className="text-lg font-black text-gray-900 mt-1">Գուշակեք ըստ հուշումների</h3>
            </div>

            <div className="space-y-2 text-left bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs">
              {J6_MYSTERIES[0].cluesEs.map((c, i) => (
                <div key={i} className="font-semibold text-gray-800">
                  <p>🔍 {c}</p>
                  <p className="text-gray-500 text-[11px] font-normal pl-5">{J6_MYSTERIES[0].cluesHy[i]}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {J6_MYSTERIES[0].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (opt === J6_MYSTERIES[0].correctItem) {
                      playSuccessSound();
                      triggerConfetti();
                      setScore(s => s + 30);
                      onEarnCoins(30);
                      alert('¡Correcto, detective!');
                    } else {
                      playErrorSound();
                    }
                  }}
                  className="p-3 bg-[#FAF6F0] hover:bg-[#780016] hover:text-white font-extrabold rounded-xl border border-[#E5D5C5] text-xs transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 7: Memory */}
        {selectedGame === 7 && (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <div>
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 7: Memoria (Հիշողության խաղ)</span>
              <h3 className="text-lg font-black text-gray-900 mt-1">Գտեք զույգերը՝ իսպաներեն բառը և պատկերը</h3>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {memCards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`h-24 rounded-2xl border-2 flex items-center justify-center font-bold text-xs p-2 transition-all cursor-pointer shadow-xs ${
                    card.isFlipped || card.isMatched
                      ? 'bg-amber-100 border-[#780016] text-[#780016] scale-102'
                      : 'bg-[#780016] border-[#600012] text-white hover:bg-[#991B1B]'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <span className={card.content.length <= 2 ? 'text-3xl' : 'text-xs'}>
                      {card.content}
                    </span>
                  ) : (
                    <span className="text-xl">❓</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={startMemory}
              className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Վերսկսել քարտերը
            </button>
          </div>
        )}

        {/* GAME 8: Cashier Change */}
        {selectedGame === 8 && (
          <div className="space-y-6 max-w-md mx-auto text-center">
            <div>
              <span className="text-xs font-bold uppercase text-[#EA580C]">Juego 8: La caja registradora</span>
              <h3 className="text-xl font-black text-gray-900 mt-1">Գանձապահի հաշվարկ</h3>
              <p className="text-xs font-medium text-gray-600 mt-0.5">
                Հաճախորդը տալիս է գումարը, դուք պետք է ճիշտ մանրը վերադարձնեք։
              </p>
            </div>

            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span>Հաշիվ (Cuenta):</span>
                <span className="font-black text-[#780016]">{j8BillTotal} €</span>
              </div>
              <div className="flex justify-between">
                <span>Տրված գումար (Entregado):</span>
                <span className="font-black text-emerald-700">{j8GivenAmount} €</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-700 block">
                Որքա՞ն է մանրը (¿Cuánto es el cambio?):
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={j8UserChange}
                  onChange={(e) => setJ8UserChange(e.target.value)}
                  placeholder="Եվրոյով (ej. 13)..."
                  className="flex-1 px-4 py-2.5 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] text-sm font-bold focus:outline-none focus:border-[#EA580C]"
                />
                <button
                  onClick={handleJ8Submit}
                  className="px-5 py-2.5 bg-[#780016] hover:bg-[#600012] text-white text-xs font-extrabold rounded-xl shadow-xs cursor-pointer"
                >
                  Վճարել
                </button>
              </div>
            </div>

            {j8Feedback && (
              <div className="p-3 bg-amber-100 rounded-xl text-xs font-bold text-gray-800 animate-in fade-in">
                {j8Feedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
