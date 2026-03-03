import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Bell, Check, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <div className="mt-8">
      <div className="flex items-end gap-2 sm:gap-4 mb-8">
        <div className="text-5xl sm:text-6xl font-display text-white leading-none">
          ৳{Math.floor(product.price)}
        </div>
        <div className="text-xl sm:text-2xl font-display text-[#FF6A00] mb-1">
          .{(product.price % 1).toFixed(2).substring(2)}
        </div>
      </div>

      {product.inStock ? (
        <button 
          onClick={() => addToCart(product)}
          className="group relative w-full bg-[#141414] border border-white/10 p-2 rounded-2xl overflow-hidden transition-all hover:border-[#FF6A00]/50 mb-8"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF2A00] to-[#FF6A00] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          
          <div className="relative flex items-center bg-[#0a0a0a] rounded-xl overflow-hidden">
            <div className="flex-1 py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3">
              <Zap size={24} className="text-[#FF6A00] group-hover:text-[#FFD500] transition-colors" /> 
              <span className="font-display text-xl sm:text-2xl uppercase tracking-wider text-white group-hover:text-[#FFD500] transition-colors">
                Add to Pit Crew
              </span>
            </div>
          </div>
        </button>
      ) : (
        <button 
          onClick={handleNotify}
          disabled={notified}
          className={`group relative w-full bg-[#141414] border p-2 rounded-2xl overflow-hidden transition-all mb-8 ${
            notified ? 'border-green-500/50' : 'border-white/10 hover:border-white/30'
          }`}
        >
          <div className="relative flex items-center bg-[#0a0a0a] rounded-xl overflow-hidden">
            <div className={`flex-1 py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 transition-colors ${
              notified ? 'bg-green-500/10' : 'group-hover:bg-white/5'
            }`}>
              {notified ? (
                <>
                  <Check size={24} className="text-green-400" />
                  <span className="font-display text-lg sm:text-xl uppercase tracking-wider text-green-400">
                    We'll let you know!
                  </span>
                </>
              ) : (
                <>
                  <Bell size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                  <span className="font-display text-lg sm:text-xl uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
                    Notify Me When Available
                  </span>
                </>
              )}
            </div>
          </div>
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8">
        <div className="flex items-center gap-3 text-gray-400 bg-white/5 p-4 rounded-xl border border-white/5">
          <Truck size={24} className="text-[#FFD500] shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">Free Shipping<br/>over ৳50</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 bg-white/5 p-4 rounded-xl border border-white/5">
          <ShieldCheck size={24} className="text-[#FFD500] shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">Authenticity<br/>Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
