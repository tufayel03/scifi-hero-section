import React, { useEffect, useRef, useState } from 'react';
import { Scroll, useScroll, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Flame, Radio, Activity, ShoppingCart, Cpu, Power, Rocket, Crosshair, Terminal, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HUDHero } from './HUDHero';

export function OverlayUI({ onShopClick }: { onShopClick: () => void }) {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const scroll = useScroll();



  // Speedometer Logic
  const lastScrollTop = useRef(0);
  const currentSpeed = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame(() => {
    if (scroll.el) {


      // Speedometer Calculation
      const currentScrollTop = scroll.el.scrollTop;
      const delta = currentScrollTop - lastScrollTop.current;
      lastScrollTop.current = currentScrollTop;

      // Smooth the speed value
      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, Math.abs(delta) * 15, 0.1);

      // Update DOM element directly for performance
      const speedValueEl = document.getElementById('speed-value');
      const speedNeedleEl = document.getElementById('speed-needle');
      const speedGlowEl = document.getElementById('speed-glow');

      if (speedValueEl) {
        speedValueEl.innerText = Math.round(currentSpeed.current).toString();
      }

      if (speedNeedleEl) {
        // Map speed to angle: 0 -> -135deg, 200 -> 135deg
        const displaySpeed = Math.min(currentSpeed.current, 200);
        const angle = -135 + (displaySpeed / 200) * 270;
        speedNeedleEl.style.transform = `rotate(${angle}deg)`;
      }

      if (speedGlowEl) {
        // Glow intensity based on speed
        const opacity = Math.min(currentSpeed.current / 200, 1) * 0.6;
        speedGlowEl.style.opacity = opacity.toString();
      }
    }
  });

  return (
    <>
      {/* FIXED HUD ELEMENTS */}
      <Html fullscreen className="pointer-events-none z-40">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#FF2A00] font-mono text-sm font-bold tracking-[0.3em] uppercase">
              <Terminal size={16} />
              <span>Syndicate.OS</span>
            </div>
            <div className="text-white/50 font-mono text-xs tracking-widest uppercase">
              v2.4.9 // Secure Connection
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-[#FFD500] font-mono text-sm font-bold tracking-[0.2em] uppercase bg-black/50 px-3 py-1 border border-[#FFD500]/30 backdrop-blur-md">
              <AlertTriangle size={14} className="animate-pulse" />
              <span>Live Drop: 14:59:22</span>
            </div>
            <div className="text-white/50 font-mono text-xs tracking-widest uppercase">
              Sector 7G
            </div>
          </div>
        </div>


      </Html>

      {/* SCROLLING CONTENT */}
      <Scroll html style={{ width: '100%' }}>
        {/* 1. HERO */}
        <HUDHero onShopClick={onShopClick} />

        {/* SPACER */}
        <div className="h-[1400vh] pointer-events-none"></div>

        {/* FOOTER */}
        <section className="h-[100vh] flex flex-col items-center justify-center text-center px-4 relative pointer-events-none">
          <div className="relative z-10 pointer-events-auto bg-black/80 p-12 border border-[#333] backdrop-blur-md max-w-3xl w-full">
            <div className="mb-8">
              <Flame className="w-12 h-12 text-[#FF2A00] mx-auto mb-4" />
              <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tighter text-white mb-4">
                Join The <span className="text-[#FFD500]">Syndicate</span>
              </h2>
              <p className="font-mono text-gray-400 text-sm tracking-widest uppercase">
                Encrypted alerts for the next drop.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-0 w-full" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ENTER SECURE COMMS (EMAIL)"
                className="bg-black border border-[#333] text-white font-mono text-sm px-6 py-4 outline-none focus:border-[#FF2A00] transition-colors flex-grow uppercase placeholder-gray-600"
              />
              <button type="submit" className="bg-[#FF2A00] hover:bg-[#FFD500] text-black font-display text-lg px-8 py-4 uppercase tracking-widest transition-colors duration-300">
                Transmit
              </button>
            </form>
          </div>
        </section>
      </Scroll>
    </>
  );
}
