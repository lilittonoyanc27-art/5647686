import React, { useState } from 'react';
import { CartItem } from './types';
import { speakSpanish, playClickSound, playCashRegisterSound, triggerConfetti } from './audioHelper';
import { X, Trash2, Plus, Minus, CreditCard, Banknote, CheckCircle, Receipt } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onEarnCoins: (amount: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onEarnCoins,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'tarjeta' | 'efectivo'>('tarjeta');
  const [checkoutCompleted, setCheckoutCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.clothingItem.discountPercent
      ? item.clothingItem.price * (1 - item.clothingItem.discountPercent / 100)
      : item.clothingItem.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const total = Math.round(subtotal);

  const handlePay = () => {
    if (cartItems.length === 0) return;
    playCashRegisterSound();
    triggerConfetti();
    setCheckoutCompleted(true);
    speakSpanish(
      paymentMethod === 'tarjeta'
        ? 'Pago con tarjeta completado con éxito. Muchas gracias por su visita.'
        : 'Pago en efectivo recibido. Aquí tiene su cambio y su recibo. Buen día.'
    );
    onEarnCoins(total * 2);
    setTimeout(() => {
      onClearCart();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#780016]/20 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#780016] to-[#EA580C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h3 className="text-lg font-black">Cesta de la Compra (Զամբյուղ)</h3>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!checkoutCompleted ? (
            <>
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-xs font-bold text-gray-400">
                  Ձեր զամբյուղը դատարկ է։ Ավելացրեք հագուստ խանութից։
                </div>
              ) : (
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => {
                    const price = item.clothingItem.discountPercent
                      ? item.clothingItem.price * (1 - item.clothingItem.discountPercent / 100)
                      : item.clothingItem.price;

                    return (
                      <div
                        key={idx}
                        className="p-3 bg-[#FAF6F0] rounded-2xl border border-[#E5D5C5] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-2xl">{item.clothingItem.icon}</span>
                          <div>
                            <span className="font-extrabold text-gray-900 block truncate max-w-[150px]">
                              {item.clothingItem.spanishName}
                            </span>
                            <span className="text-[10px] text-gray-500 font-semibold">
                              Չափս՝ {item.selectedSize} • {Math.round(price)} €
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-lg border border-[#E5D5C5]">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="text-gray-500 hover:text-black p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold px-1">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="text-gray-500 hover:text-black p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Total Summary */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-gray-600">
                    <span>Ընդհանուր գումար (Total):</span>
                    <span className="text-base font-black text-[#780016]">{total} €</span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2 border-t border-amber-200 flex gap-2">
                    <button
                      onClick={() => setPaymentMethod('tarjeta')}
                      className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'tarjeta'
                          ? 'bg-[#780016] text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-[#E5D5C5]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Tarjeta (Քարտ)</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('efectivo')}
                      className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'efectivo'
                          ? 'bg-[#780016] text-white shadow-xs'
                          : 'bg-white text-gray-700 border border-[#E5D5C5]'
                      }`}
                    >
                      <Banknote className="w-3.5 h-3.5" />
                      <span>Efectivo (Կանխիկ)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={handlePay}
                  className="w-full py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Վճարել {total} € (Pagar)</span>
                </button>
              )}
            </>
          ) : (
            /* Checkout Success Receipt */
            <div className="py-8 text-center space-y-3">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-black text-gray-900">¡Compra completada con éxito!</h4>
              <p className="text-xs font-bold text-emerald-700">
                Գնումը հաջողությամբ վճարված է։ Շնորհակալություն։
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#780016] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Փակել
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
