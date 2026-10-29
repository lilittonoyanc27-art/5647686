import React from 'react';
import { ShoppingBag, Flame, Coins, Sparkles, Layers, Box } from 'lucide-react';

export type ActiveTab =
  | 'shop'
  | 'dialogues'
  | 'fitting'
  | 'budget'
  | 'listening'
  | 'exercises'
  | 'grammar'
  | 'minigames'
  | 'exam'
  | 'teacher';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  coins: number;
  streak: number;
  level: string;
  cartCount: number;
  onOpenCart: () => void;
  shopMode3D: boolean;
  onToggleShopMode3D: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  coins,
  streak,
  level,
  cartCount,
  onOpenCart,
  shopMode3D,
  onToggleShopMode3D,
}) => {
  const NAV_ITEMS = [
    { id: 'shop', labelEs: 'Tienda', labelHy: 'Խանութ', icon: '🏬' },
    { id: 'dialogues', labelEs: 'Diálogos', labelHy: 'Երկխոսություն', icon: '💬' },
    { id: 'fitting', labelEs: 'Probador', labelHy: 'Հանդերձարան', icon: '👗' },
    { id: 'budget', labelEs: '100 Euros', labelHy: '100 € Բյուջե', icon: '💰' },
    { id: 'listening', labelEs: 'Audición', labelHy: 'Ունկնդրում', icon: '🎧' },
    { id: 'exercises', labelEs: 'Ejercicios', labelHy: 'Վարժություններ', icon: '✍️' },
    { id: 'grammar', labelEs: 'Gramática', labelHy: 'Քերականություն', icon: '📖' },
    { id: 'minigames', labelEs: 'Mini-Juegos', labelHy: 'Խաղեր', icon: '🎮' },
    { id: 'exam', labelEs: 'Examen', labelHy: 'Քննություն', icon: '🎓' },
    { id: 'teacher', labelEs: 'Profesor', labelHy: 'Ուսուցիչ', icon: '👨‍🏫' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5D5C5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header Row */}
        <div className="py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onSelectTab('shop')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#780016] to-[#EA580C] text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🛍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-[#780016] tracking-tight">
                  ESPAÑOL SHOP
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#EA580C] bg-orange-100 px-2 py-0.5 rounded-full">
                  Aprende Comprando
                </span>
              </div>
              <p className="text-[11px] font-bold text-gray-500">
                Իսպաներեն հագուստի խանութում • Հայերեն բացատրություններով
              </p>
            </div>
          </div>

          {/* Right Status Indicators (Clean, static, zero pulsating dots) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 3D / 2D Shop View Switcher button when on shop tab */}
            {activeTab === 'shop' && (
              <button
                onClick={onToggleShopMode3D}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-[#E5D5C5] text-xs font-extrabold text-[#780016] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                title="Փոխել 2D կատալոգի և 3D վիրտուալ տարածքի միջև"
              >
                {shopMode3D ? <Layers className="w-4 h-4 text-[#EA580C]" /> : <Box className="w-4 h-4 text-[#780016]" />}
                <span className="hidden md:inline">{shopMode3D ? 'Տեսնել 2D Կատալոգը' : '3D Խանութ (3D Mode)'}</span>
                <span className="md:hidden">{shopMode3D ? '2D' : '3D'}</span>
              </button>
            )}

            {/* Level Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5D5C5] text-xs font-black text-[#780016] shadow-2xs hidden sm:flex items-center gap-1">
              <span>Nivel:</span>
              <span className="text-[#EA580C] uppercase">{level}</span>
            </div>

            {/* Streak */}
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5D5C5] text-xs font-extrabold text-orange-600 flex items-center gap-1 shadow-2xs">
              <Flame className="w-4 h-4 text-[#EA580C]" />
              <span>{streak} օր</span>
            </div>

            {/* Coin wallet */}
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E5D5C5] text-xs font-extrabold text-amber-700 flex items-center gap-1 shadow-2xs">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>{coins} 🪙</span>
            </div>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#780016] hover:bg-[#600012] text-white shadow-xs transition-colors cursor-pointer"
              title="Ver cesta de compras"
              aria-label="Cesta de compras"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#EA580C] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF6F0] shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-[#E5D5C5]/60 pt-1.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as ActiveTab)}
              className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[#780016] text-white shadow-sm'
                  : 'text-gray-700 hover:text-[#780016] hover:bg-orange-100/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.labelEs}</span>
              <span className="text-[10px] opacity-75 font-normal hidden md:inline">
                ({item.labelHy})
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
