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
  
  // Auto Pilot State
  const [isAutoPilot, setIsAutoPilot] = useState(false);
  const [autoPilotSpeed, setAutoPilotSpeed] = useState(3);
  
  // Speedometer Logic
  const lastScrollTop = useRef(0);
  const currentSpeed = useRef(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame(() => {
    if (scroll.el) {
      // Auto Pilot Scrolling
      if (isAutoPilot) {
        scroll.el.scrollTop += autoPilotSpeed;
      }
      
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

        {/* Bottom Left: Auto Pilot Module */}
        <div className="absolute bottom-8 left-8 pointer-events-auto">
          <div className="bg-[#0a0a0c]/90 backdrop-blur-md border-l-4 border-[#FF6A00] p-4 shadow-[0_0_30px_rgba(255,106,0,0.15)] w-[380px] flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#FFD500] font-mono text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <Cpu size={14} className={isAutoPilot ? 'text-[#FF2A00] animate-pulse' : 'text-[#FFD500]'} />
                <span>Auto-Nav System</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={12} className={isAutoPilot ? 'text-[#FF2A00] animate-pulse' : 'text-gray-600'} />
                <span className={isAutoPilot ? 'text-[#FF2A00] font-bold animate-pulse' : 'text-gray-500'}>
                  {isAutoPilot ? 'ENGAGED' : 'STANDBY'}
                </span>
              </div>
            </div>
            
            <div className="flex items-stretch gap-3">
              {/* Radar/Visualizer */}
              <div className={`flex-shrink-0 w-16 h-16 bg-black/80 border items-center justify-center relative overflow-hidden transition-colors duration-300 ${isAutoPilot ? 'border-[#FF2A00] shadow-[0_0_15px_rgba(255,42,0,0.3)]' : 'border-[#333]'}`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FFD500 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                <Radio size={24} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isAutoPilot ? 'text-[#FF2A00] animate-ping opacity-50' : 'text-gray-600'}`} />
                <Crosshair size={32} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${isAutoPilot ? 'text-[#FFD500] animate-[spin_4s_linear_infinite]' : 'text-gray-600'}`} />
                {isAutoPilot && (
                  <div className="absolute inset-0 border-t-2 border-[#FF2A00] rounded-full animate-[spin_2s_linear_infinite] opacity-50 scale-90"></div>
                )}
              </div>

              <div className="flex flex-col flex-grow gap-2">
                {/* Toggle Button */}
                <button 
                  onClick={() => setIsAutoPilot(!isAutoPilot)}
                  className={`relative overflow-hidden group flex items-center justify-center gap-2 h-8 border transition-all duration-300 ${
                    isAutoPilot 
                      ? 'bg-[#FF2A00]/20 border-[#FF2A00] text-[#FF2A00]' 
                      : 'bg-[#111] border-[#333] text-white hover:border-[#FF6A00] hover:text-[#FFD500]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-sweep"></div>
                  <Power size={14} className={`transition-transform duration-300 ${isAutoPilot ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-display text-xs tracking-widest uppercase">
                    {isAutoPilot ? 'Disengage' : 'Initialize'}
                  </span>
                </button>

                {/* Speed Controller */}
                <div className={`flex-grow flex items-center bg-black/80 border px-3 transition-colors duration-300 ${isAutoPilot ? 'border-[#FF6A00]' : 'border-[#333] opacity-50'}`}>
                  <Rocket size={14} className={isAutoPilot ? 'text-[#FFD500]' : 'text-gray-600'} />
                  
                  <div className="flex-grow relative flex items-center h-full mx-3">
                    <div className="absolute w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF2A00] to-[#FFD500] transition-all duration-100"
                        style={{ width: `${(autoPilotSpeed / 10) * 100}%` }}
                      ></div>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={autoPilotSpeed} 
                      onChange={(e) => setAutoPilotSpeed(Number(e.target.value))}
                      disabled={!isAutoPilot}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className={`absolute w-3 h-3 rounded-full border border-black transition-all duration-100 pointer-events-none ${isAutoPilot ? 'bg-[#FFD500] shadow-[0_0_8px_#FFD500]' : 'bg-gray-500'}`}
                      style={{ left: `calc(${(autoPilotSpeed / 10) * 100}% - 6px)` }}
                    ></div>
                  </div>

                  <span className={`font-display text-sm w-6 text-right ${isAutoPilot ? 'text-white' : 'text-gray-600'}`}>
                    {autoPilotSpeed}x
                  </span>
                </div>
              </div>
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
