import React, { useState } from 'react';
import { ClothingItem, Category } from './types';
import { CLOTHING_ITEMS, CATEGORIES } from './clothesData';
import { speakSpanish, playClickSound, playCoinSound } from './audioHelper';
import { Volume2, ShoppingBag, Eye, Search, Sparkles, Filter, Check, Tag } from 'lucide-react';

interface Shop2DProps {
  onAddToCart: (item: ClothingItem) => void;
  onInspectItemForQuiz: (item: ClothingItem) => void;
  onGoToFittingRoom: () => void;
  onGoToCashier: () => void;
}

export const Shop2D: React.FC<Shop2DProps> = ({
  onAddToCart,
  onInspectItemForQuiz,
  onGoToFittingRoom,
  onGoToCashier,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [showArmenianTranslation, setShowArmenianTranslation] = useState<boolean>(false);
  const [clerkMessage, setClerkMessage] = useState<string>(
    '¡Hola! ¡Bienvenidos a Español Shop! ¿Buscas alguna prenda en especial?'
  );

  // Clerk dialogue triggers
  const speakClerk = (msg: string) => {
    setClerkMessage(msg);
    speakSpanish(msg);
  };

  // Filter items
  const filteredItems = CLOTHING_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesColor =
      selectedColor === 'all' || item.color.toLowerCase() === selectedColor;
    const matchesSearch =
      item.spanishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.armenianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionEs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesColor && matchesSearch;
  });

  const handleItemCardClick = (item: ClothingItem) => {
    playClickSound();
    setSelectedItem(item);
    setShowArmenianTranslation(false);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Boutique Floor Map & Staff Strip */}
      <div className="bg-gradient-to-r from-[#780016] via-[#991B1B] to-[#EA580C] text-white p-6 rounded-3xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Clerk María */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => speakClerk('¡Hola! Soy María, la dependienta. Si necesitas una talla o probarte algo, avísame.')}
              className="relative w-16 h-16 rounded-2xl bg-white/20 border-2 border-amber-300 p-1 flex items-center justify-center text-4xl shadow-md hover:scale-105 transition-transform cursor-pointer"
              title="Սեղմեք վաճառողուհու հետ զրուցելու համար"
            >
              👩‍💼
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">María (Dependienta)</h3>
                <span className="text-xs bg-amber-300/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/40 font-semibold">
                  Վաճառողուհի
                </span>
              </div>
              <p className="text-sm font-medium text-amber-100 italic mt-0.5 max-w-md">
                «{clerkMessage}»
              </p>
            </div>
          </div>

          {/* Quick Department Shortcuts */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                onGoToFittingRoom();
              }}
              className="px-3.5 py-2 bg-white/15 hover:bg-white/25 rounded-xl border border-white/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🚪</span>
              <span>Probador (Հանդերձարան)</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onGoToCashier();
              }}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-[#780016] rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>💳</span>
              <span>Caja (Դրամարկղ)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#E5D5C5] shadow-xs space-y-4">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#780016] text-white shadow-md shadow-[#780016]/20'
                  : 'bg-[#FAF6F0] text-gray-700 hover:bg-orange-50 border border-[#E5D5C5]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameEs}</span>
              <span className="text-[10px] opacity-75">({cat.nameHy})</span>
            </button>
          ))}
        </div>

        {/* Search & Color Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-[#E5D5C5]/60">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Փնտրել հագուստ իսպաներեն կամ հայերեն (ej. camiseta, falda, շապիկ...)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
            />
          </div>

          {/* Color filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Գույն՝</span>
            {['all', 'rojo', 'azul', 'verde', 'negro', 'blanco', 'amarillo'].map((col) => (
              <button
                key={col}
                onClick={() => {
                  playClickSound();
                  setSelectedColor(col);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedColor === col
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-gray-600 hover:bg-orange-50 border border-[#E5D5C5]'
                }`}
              >
                {col === 'all' ? 'Բոլորը' : col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Interactive Clothing Cards (Minimum 80 items available) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemCardClick(item)}
            className="group relative bg-white rounded-3xl border border-[#E5D5C5] hover:border-[#780016]/40 p-4 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            {/* Top item badge */}
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-bold text-[#780016] bg-[#FAF6F0] px-2.5 py-0.5 rounded-full border border-[#E5D5C5]">
                {item.category.toUpperCase()}
              </span>
              {item.discountPercent ? (
                <span className="text-xs font-extrabold text-white bg-red-600 px-2 py-0.5 rounded-full">
                  -{item.discountPercent}%
                </span>
              ) : item.isPopular ? (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  ⭐ Top
                </span>
              ) : null}
            </div>

            {/* Icon Graphic */}
            <div className="h-28 rounded-2xl bg-gradient-to-b from-[#FAF6F0] to-[#F4EFE6] flex items-center justify-center text-5xl mb-3 group-hover:scale-108 transition-transform">
              {item.icon}
            </div>

            {/* Names in Spanish and Armenian */}
            <div className="space-y-1 mb-3">
              <h4 className="text-base font-extrabold text-gray-900 group-hover:text-[#780016] transition-colors leading-tight">
                {item.spanishName}
              </h4>
              <p className="text-xs font-bold text-[#EA580C] leading-snug">
                {item.armenianName}
              </p>
            </div>

            {/* Price and Action Bar */}
            <div className="pt-2 border-t border-[#E5D5C5]/60 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-[#780016]">
                  {item.discountPercent
                    ? (item.price * (1 - item.discountPercent / 100)).toFixed(0)
                    : item.price}{' '}
                  €
                </span>
                {item.discountPercent && (
                  <span className="text-xs text-gray-400 line-through ml-1.5 font-medium">
                    {item.price} €
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(item.spanishName);
                  }}
                  className="p-2 rounded-xl bg-orange-50 hover:bg-[#EA580C] text-[#EA580C] hover:text-white transition-colors cursor-pointer"
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playCoinSound();
                    onAddToCart(item);
                  }}
                  className="p-2 rounded-xl bg-[#780016] hover:bg-[#600012] text-white shadow-xs transition-colors cursor-pointer"
                  title="Añadir a la cesta"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-[#780016]/20 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#780016] to-[#EA580C] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2.5 bg-white/20 rounded-2xl shadow-inner">
                  {selectedItem.icon}
                </span>
                <div>
                  <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
                    {selectedItem.department}
                  </span>
                  <h3 className="text-2xl font-black">{selectedItem.spanishName}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Armenian Name */}
              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5]">
                <span className="text-xs font-bold uppercase text-[#780016]/70 block mb-0.5">
                  Հայերեն թարգմանություն
                </span>
                <p className="text-lg font-bold text-gray-900">{selectedItem.armenianName}</p>
              </div>

              {/* Price and Details */}
              <div className="grid grid-cols-3 gap-2 p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                <div>
                  <span className="text-[11px] text-gray-500 font-bold block">Գին (Precio)</span>
                  <span className="text-xl font-black text-[#780016]">
                    {selectedItem.discountPercent
                      ? (selectedItem.price * (1 - selectedItem.discountPercent / 100)).toFixed(0)
                      : selectedItem.price}{' '}
                    €
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 font-bold block">Չափս (Talla)</span>
                  <span className="text-sm font-bold text-gray-800">{selectedItem.size}</span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 font-bold block">Գույն (Color)</span>
                  <span className="text-sm font-bold capitalize text-gray-800">
                    {selectedItem.color}
                  </span>
                </div>
              </div>

              {/* Full sentence in Spanish with price & audio */}
              <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] block">
                  Օրինակ խանութում (Frase en tienda)
                </span>
                <p className="text-base font-bold text-gray-900 italic">
                  «{selectedItem.exampleEs}»
                </p>
                {showArmenianTranslation && (
                  <p className="text-sm font-medium text-gray-700 animate-in fade-in">
                    «{selectedItem.exampleHy}»
                  </p>
                )}
              </div>

              {/* Action Buttons: Escuchar, Traducción, Comprar, Practicar */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => speakSpanish(selectedItem.exampleEs)}
                  className="py-3 px-4 bg-[#FAF6F0] hover:bg-[#E5D5C5] text-[#780016] font-bold rounded-xl border border-[#E5D5C5] flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <Volume2 className="w-4 h-4 text-[#EA580C]" />
                  <span>🔊 Escuchar</span>
                </button>

                <button
                  onClick={() => setShowArmenianTranslation(prev => !prev)}
                  className="py-3 px-4 bg-[#FAF6F0] hover:bg-[#E5D5C5] text-gray-800 font-bold rounded-xl border border-[#E5D5C5] flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <Eye className="w-4 h-4 text-[#780016]" />
                  <span>📖 {showArmenianTranslation ? 'Թաքցնել' : 'Traducción'}</span>
                </button>

                <button
                  onClick={() => {
                    playCoinSound();
                    onAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="py-3 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>🛒 Comprar</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    onInspectItemForQuiz(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="py-3 px-4 bg-[#780016] hover:bg-[#600012] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <span>🎮 Practicar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
