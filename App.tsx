import React, { useState, useEffect } from 'react';
import { Navigation, ActiveTab } from './Navigation';
import { Shop2D } from './Shop2D';
import { Shop3D } from './Shop3D';
import { DialoguesView } from './DialoguesView';
import { FittingRoom } from './FittingRoom';
import { BudgetGame } from './BudgetGame';
import { ListeningView } from './ListeningView';
import { ExercisesView } from './ExercisesView';
import { GrammarView } from './GrammarView';
import { MiniGames } from './MiniGames';
import { ExamView } from './ExamView';
import { TeacherMode } from './TeacherMode';
import { WordModal } from './WordModal';
import { CartModal } from './CartModal';
import { ClothingItem, CartItem, WordInfo, StudentProgress, TeacherSettings, ExamQuestion } from './types';
import { playClickSound, playCoinSound } from './audioHelper';

const STORAGE_KEY = 'espanol_shop_progress_v1';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('shop');
  const [shopMode3D, setShopMode3D] = useState<boolean>(false);

  // Student Progress (stored in localStorage)
  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return {
      coins: 150,
      score: 0,
      streak: 3,
      level: 'A1',
      completedDialogues: [],
      completedGrammar: [],
      completedListening: [],
      completedExercises: [],
      examScores: {},
      mistakes: [],
    };
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage unavailable
    }
  }, [progress]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Word Inspector Modal State
  const [inspectedWord, setInspectedWord] = useState<WordInfo | null>(null);

  // Teacher Settings
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>({
    hideArmenianTranslation: false,
    selectedLevel: 'all',
    selectedTopic: 'todos',
    questionCount: 10,
    soundEnabled: true,
  });

  // Handlers
  const handleEarnCoins = (amount: number) => {
    playCoinSound();
    setProgress(prev => ({
      ...prev,
      coins: prev.coins + amount,
      score: prev.score + amount,
    }));
  };

  const handleAddToCart = (item: ClothingItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.clothingItem.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.clothingItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          clothingItem: item,
          quantity: 1,
          selectedSize: item.size,
          selectedColor: item.color,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (idx: number, delta: number) => {
    setCartItems(prev => {
      const next = [...prev];
      const newQty = next[idx].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== idx);
      }
      next[idx] = { ...next[idx], quantity: newQty };
      return next;
    });
  };

  const handleRemoveCartItem = (idx: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleRecordMistake = (
    question: string,
    userAnswer: string,
    correctAnswer: string,
    explanationHy: string
  ) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setProgress(prev => ({
      ...prev,
      mistakes: [
        { timestamp, question, userAnswer, correctAnswer, explanationHy },
        ...prev.mistakes.slice(0, 49),
      ],
    }));
  };

  const handleRecordExamScore = (level: string, score: number, total: number) => {
    const date = new Date().toISOString().split('T')[0];
    setProgress(prev => ({
      ...prev,
      examScores: {
        ...prev.examScores,
        [level]: { score, total, date },
      },
    }));
  };

  const handleCompleteDialogue = (id: string) => {
    setProgress(prev => ({
      ...prev,
      completedDialogues: prev.completedDialogues.includes(id)
        ? prev.completedDialogues
        : [...prev.completedDialogues, id],
    }));
  };

  const handleCompleteGrammar = (id: string) => {
    setProgress(prev => ({
      ...prev,
      completedGrammar: prev.completedGrammar.includes(id)
        ? prev.completedGrammar
        : [...prev.completedGrammar, id],
    }));
  };

  const handleCompleteListening = (id: string) => {
    setProgress(prev => ({
      ...prev,
      completedListening: prev.completedListening.includes(id)
        ? prev.completedListening
        : [...prev.completedListening, id],
    }));
  };

  const handleAddCustomQuestion = (q: ExamQuestion) => {
    setProgress(prev => ({
      ...prev,
      customQuestions: [...(prev.customQuestions || []), q],
    }));
  };

  const handleClearMistakes = () => {
    setProgress(prev => ({ ...prev, mistakes: [] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1810] flex flex-col font-sans selection:bg-[#EA580C]/20 selection:text-[#780016]">
      {/* Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          playClickSound();
          setActiveTab(tab);
        }}
        coins={progress.coins}
        streak={progress.streak}
        level={progress.level}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        shopMode3D={shopMode3D}
        onToggleShopMode3D={() => {
          playClickSound();
          setShopMode3D(prev => !prev);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'shop' && (
          shopMode3D ? (
            <Shop3D
              onSelectItem={(item) => handleAddToCart(item)}
              onAddToCart={(item) => handleAddToCart(item)}
              onInspectItemForQuiz={(item) => {
                setActiveTab('exercises');
              }}
            />
          ) : (
            <Shop2D
              onAddToCart={handleAddToCart}
              onInspectItemForQuiz={(item) => {
                setActiveTab('exercises');
              }}
              onGoToFittingRoom={() => setActiveTab('fitting')}
              onGoToCashier={() => setIsCartOpen(true)}
            />
          )
        )}

        {activeTab === 'dialogues' && (
          <DialoguesView
            onInspectWord={(info) => setInspectedWord(info)}
            onEarnCoins={handleEarnCoins}
            completedDialogues={progress.completedDialogues}
            onCompleteDialogue={handleCompleteDialogue}
          />
        )}

        {activeTab === 'fitting' && (
          <FittingRoom onEarnCoins={handleEarnCoins} />
        )}

        {activeTab === 'budget' && (
          <BudgetGame onEarnCoins={handleEarnCoins} />
        )}

        {activeTab === 'listening' && (
          <ListeningView
            onInspectWord={(info) => setInspectedWord(info)}
            onEarnCoins={handleEarnCoins}
            completedListening={progress.completedListening}
            onCompleteListening={handleCompleteListening}
          />
        )}

        {activeTab === 'exercises' && (
          <ExercisesView
            onInspectWord={(info) => setInspectedWord(info)}
            onEarnCoins={handleEarnCoins}
            onRecordMistake={handleRecordMistake}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarView
            onInspectWord={(info) => setInspectedWord(info)}
            onEarnCoins={handleEarnCoins}
            completedGrammar={progress.completedGrammar}
            onCompleteGrammar={handleCompleteGrammar}
          />
        )}

        {activeTab === 'minigames' && (
          <MiniGames onEarnCoins={handleEarnCoins} />
        )}

        {activeTab === 'exam' && (
          <ExamView
            onEarnCoins={handleEarnCoins}
            onRecordExamScore={handleRecordExamScore}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherMode
            settings={teacherSettings}
            onUpdateSettings={setTeacherSettings}
            progress={progress}
            onClearMistakes={handleClearMistakes}
            onAddCustomQuestion={handleAddCustomQuestion}
          />
        )}
      </main>

      {/* Global Interactive Word Inspector Modal */}
      <WordModal
        wordInfo={inspectedWord}
        onClose={() => setInspectedWord(null)}
      />

      {/* Global Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onEarnCoins={handleEarnCoins}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E5D5C5] bg-white py-6 text-center text-xs font-semibold text-gray-500">
        <p>
          Español Shop — Aprende Comprando • Իսպաներեն հագուստի խանութում հայերեն բացատրություններով
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          Գույներ՝ Բորդո (#780016), Կրեմային (#FAF6F0), Նարնջագույն (#EA580C) և Սպիտակ (#FFFFFF)
        </p>
      </footer>
    </div>
  );
}
