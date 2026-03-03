import React from 'react';
import { motion } from 'motion/react';
import { Star, Activity, Gauge, Weight } from 'lucide-react';
import { Product } from '../../data/products';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col"
    >
      <p className="text-[#FFD500] text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
        {product.category}
      </p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter mb-4 text-white leading-none">
        {product.name}
      </h1>
      
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/5">
          <Star size={16} className="text-[#FFD500] fill-[#FFD500] sm:w-[18px] sm:h-[18px]" />
          <span className="font-bold text-base sm:text-lg text-white">{product.rating}</span>
        </div>
        <span className="text-gray-400 font-medium text-sm sm:text-base">124 Reviews</span>
        
        {!product.inStock && (
          <span className="bg-red-500/20 text-red-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-red-500/30">
            Out of Stock
          </span>
        )}
      </div>

      <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
        {product.description || 'Experience the thrill of the track with this premium Hot Wheels collectible. Built for speed, designed for glory.'}
      </p>

      {/* Creative Specs Section */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
          <Gauge size={20} className="text-[#FF6A00] mb-1 sm:mb-2 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Top Speed</span>
          <span className="font-display text-base sm:text-xl text-white">320 MPH</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
          <Weight size={20} className="text-[#FFD500] mb-1 sm:mb-2 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Weight</span>
          <span className="font-display text-base sm:text-xl text-white">3.2 OZ</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
          <Activity size={20} className="text-[#FF2A00] mb-1 sm:mb-2 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Handling</span>
          <span className="font-display text-base sm:text-xl text-white">Max</span>
        </div>
      </div>
    </motion.div>
  );
}
