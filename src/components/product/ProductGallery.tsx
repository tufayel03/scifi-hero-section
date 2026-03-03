import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductGalleryProps {
  image: string;
  badge?: string;
  name: string;
}

export function ProductGallery({ image, badge, name }: ProductGalleryProps) {
  // Generate mock gallery images based on the main image
  const galleryImages = [
    image,
    image.replace('w=600', 'w=601'), // Slight change to force different crop/image if unsplash allows, or just use it as a placeholder
    image.replace('w=600', 'w=602'),
    image.replace('w=600', 'w=603'),
  ];

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10"
      >
        {badge && (
          <div className="absolute top-6 left-6 z-10 bg-[#FF2A00] text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
            {badge}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={galleryImages[activeImage]} 
            alt={`${name} view ${activeImage + 1}`}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-transparent to-transparent opacity-60 pointer-events-none" />
      </motion.div>

      {/* Thumbnails */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4"
      >
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              activeImage === idx ? 'border-[#FF6A00] scale-105' : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
