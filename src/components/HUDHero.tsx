import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CarSideWireframe = () => (
  <svg viewBox="0 0 400 150" className="w-full text-[#FF1A00] drop-shadow-[0_0_5px_rgba(255,26,0,0.8)] fill-none stroke-current stroke-[2]" vectorEffect="non-scaling-stroke">
    <path d="M 40,110 L 15,90 L 25,70 L 80,60 L 150,45 L 220,35 L 280,45 L 350,70 L 380,90 L 385,110 Z" />
    <path d="M 150,45 L 180,90 L 350,90 L 350,70" />
    <circle cx="90" cy="110" r="28" className="stroke-[#FFB800] stroke-[3]" strokeDasharray="6 3" />
    <circle cx="90" cy="110" r="12" />
    <circle cx="310" cy="110" r="28" className="stroke-[#FFB800] stroke-[3]" strokeDasharray="6 3" />
    <circle cx="310" cy="110" r="12" />
    <line x1="180" y1="90" x2="180" y2="110" className="stroke-[#FF1A00]/50" />
    <line x1="280" y1="90" x2="280" y2="110" className="stroke-[#FF1A00]/50" />
  </svg>
);

const CarTopWireframe = () => (
  <svg viewBox="0 0 400 180" className="w-full text-[#FF1A00] drop-shadow-[0_0_5px_rgba(255,26,0,0.8)] fill-none stroke-current stroke-[2]" vectorEffect="non-scaling-stroke">
    <path d="M 50,40 L 110,20 L 290,20 L 350,40 L 380,90 L 350,140 L 290,160 L 110,160 L 50,140 Z" />
    <path d="M 150,40 L 250,40 L 270,90 L 250,140 L 150,140 L 130,90 Z" />
    <line x1="130" y1="90" x2="270" y2="90" className="stroke-[#FFB800]/50 stroke-[1]" />
    <path d="M 60,30 L 90,30" className="stroke-[#FF1A00] stroke-[3]" />
    <path d="M 60,150 L 90,150" className="stroke-[#FF1A00] stroke-[3]" />
    <path d="M 320,30 L 350,30" className="stroke-[#FF1A00]" />
    <path d="M 320,150 L 350,150" className="stroke-[#FF1A00]" />
  </svg>
);

const GlobeRadar = () => (
  <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center -mt-8">
    <div className="absolute inset-2 rounded-full border-[3px] border-[#FF1A00] shadow-[0_0_15px_#FF1A00,inset_0_0_15px_#FF1A00]" />
    <div className="absolute inset-6 rounded-full border-[10px] border-[#FF1A00]/30" />
    <div className="absolute inset-[-10px] border border-[#FFB800] rounded-full opacity-40 border-dashed animate-[spin_60s_linear_infinite]" />
    <div className="absolute inset-[-15px] border-l-2 border-r-2 border-[#FF1A00] rounded-full opacity-80 animate-[spin_40s_linear_infinite_reverse]" />

    <div className="absolute inset-[30px] rounded-full bg-[#FF1A00]/10 overflow-hidden border border-[#FFB800]/50 shadow-[inset_0_0_40px_rgba(255,26,0,0.6)]">
      {[...Array(7)].map((_, i) => (
        <div key={`lat-${i}`} className="absolute w-[200%] h-full border border-[#FF1A00]/60 left-1/2 -translate-x-1/2 rounded-[100%]" style={{ transform: `translateX(-50%) scaleX(${0.15 + i * 0.15})` }} />
      ))}
      {[...Array(7)].map((_, i) => (
        <div key={`lon-${i}`} className="absolute w-full h-[200%] border border-[#FF1A00]/60 top-1/2 -translate-y-1/2 rounded-[100%]" style={{ transform: `translateY(-50%) scaleY(${0.15 + i * 0.15})` }} />
      ))}
      <motion.div
        className="absolute w-full h-[2px] bg-[#FFB800] shadow-[0_0_10px_#FFB800] left-0"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>

    <div className="absolute w-[120%] h-[3px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent shadow-[0_0_15px_#FFB800]" />
    <div className="absolute h-[120%] w-[3px] bg-gradient-to-b from-transparent via-[#FFB800] to-transparent shadow-[0_0_15px_#FFB800]" />
    <div className="absolute w-[80px] h-[80px] bg-[#FFB800]/80 rounded-full blur-[40px]" />
  </div>
);

const CockpitFrame = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center overflow-hidden opacity-70">
    <svg viewBox="0 0 1920 1080" className="w-[120vw] min-w-[1920px] max-w-[2500px] h-full object-cover">
      <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <path
        d="M 100,200 L 400,200 L 480,380 L 680,420 L 780,720 L 800,900 L 1120,900 L 1140,720 L 1240,420 L 1440,380 L 1520,200 L 1820,200"
        fill="none"
        stroke="#FF1A00"
        strokeWidth="8"
        filter="url(#neon-glow)"
      />

      <path
        d="M 150,220 L 380,220 L 450,400 L 650,440 L 730,700 L 840,860 L 1080,860 L 1190,700 L 1270,440 L 1470,400 L 1540,220 L 1770,220"
        fill="none"
        stroke="#FFB800"
        strokeWidth="2"
        strokeDasharray="8 4"
        opacity="0.8"
      />

      <path d="M 680,420 L 550,600 L 500,800" fill="none" stroke="#FF1A00" strokeWidth="4" filter="url(#neon-glow)" opacity="0.5" />
      <path d="M 1240,420 L 1370,600 L 1420,800" fill="none" stroke="#FF1A00" strokeWidth="4" filter="url(#neon-glow)" opacity="0.5" />
    </svg>
  </div>
);

const TickerBars = ({ reverse = false, highValues = false }: { reverse?: boolean, highValues?: boolean }) => (
  <div className="flex w-full items-end h-[60px] gap-[2px] px-2 border-b border-[#FF1A00]/50 pb-2">
    {[...Array(32)].map((_, i) => {
      const heightPercent = reverse
        ? (32 - i) / 32 * 100 * Math.random() + 20
        : i / 32 * 100 * Math.random() + 20;

      let colorClass = "bg-[#FF1A00]";
      if (highValues && i > 26) colorClass = "bg-[#FFF0B3] shadow-[0_0_8px_#FFF0B3]";
      else if (heightPercent > 70) colorClass = "bg-[#FFB800]";

      return (
        <motion.div
          key={i}
          className={`flex-1 ${colorClass} opacity-90`}
          initial={{ height: '10%' }}
          animate={{ height: `${heightPercent}%` }}
          transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: 'reverse' }}
        />
      );
    })}
  </div>
);

export function HUDHero({ onShopClick }: { onShopClick: () => void }) {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 42;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setSpeed(Math.floor(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="bg-transparent pointer-events-none min-h-[100vh] w-full flex items-center justify-center font-rajdhani overflow-hidden relative selection:bg-[#FF1A00] selection:text-white pb-10 pt-10 xl:pt-0 z-10">

      <CockpitFrame />

      <div className="relative z-20 w-full max-w-[1920px] px-4 md:px-8 flex flex-col xl:flex-row items-center justify-between gap-8 pointer-events-auto mt-0 xl:mt-10 lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100 origin-center">

        {/* LEFT SECTION */}
        <div className="w-[350px] flex flex-col items-center flex-shrink-0 relative">
          <div className="w-[80%] mb-12 self-start pl-8 hidden lg:block">
            <div className="text-[10px] text-[#FFB800] font-bold tracking-[0.2em] mb-1">TEMP <span className="float-right text-[#FF1A00] bg-[#FF1A00]/10 px-1 border border-[#FF1A00]/50">DEGREES F</span></div>
            <TickerBars reverse />
            <div className="flex justify-between text-[8px] text-[#FF1A00] mt-1 font-bold">
              <span>260</span><span>240</span><span>220</span><span>200</span><span>180</span><span>160</span><span>140</span><span>120</span>
            </div>
          </div>

          <div className="relative mb-2">
            <GlobeRadar />
            <div className="absolute top-[-20px] left-[-20px] w-4 h-4 border-t-2 border-l-2 border-[#FF1A00]" />
            <div className="absolute top-[-20px] right-[-20px] w-4 h-4 border-t-2 border-r-2 border-[#FF1A00]" />
            <div className="absolute bottom-[-20px] left-[-20px] w-4 h-4 border-b-2 border-l-2 border-[#FF1A00]" />
            <div className="absolute bottom-[-20px] right-[-20px] w-4 h-4 border-b-2 border-r-2 border-[#FF1A00]" />
          </div>

          <div className="text-center font-black text-4xl text-[#FFB800] tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,184,0,0.8)] mb-4 bg-gradient-to-b from-white to-[#FFB800] bg-clip-text text-transparent">
            2.75.G.
          </div>
          <div className="text-[10px] text-[#FF1A00] uppercase tracking-[0.3em] font-bold mb-8">Brake Balance Mod</div>

          <div className="w-[120px] h-[80px] bg-[#FF1A00]/10 flex gap-1 p-2 border-b-4 border-[#FF1A00] skew-x-[-15deg]">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i} className="flex-1 bg-[#FFB800]"
                animate={{ height: [`${40 + Math.random() * 60}%`, `${40 + Math.random() * 60}%`] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
          </div>
          <div className="text-[#FF1A00] text-xl font-bold tracking-[0.4em] mt-2">E V K</div>

          <div className="absolute right-[-140px] top-[280px] w-[200px] h-[350px] bg-[#FF1A00]/10 border-l-4 border-[#FF1A00] hidden lg:flex flex-col justify-center gap-3 p-4 z-30 transition-all hover:bg-[#FF1A00]/20 group backdrop-blur-[2px]" style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)' }}>
            <div className="absolute inset-0 bg-[#FF1A00]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            {['G-FORCE <', 'NAVIGATION', 'SYSTEM', 'WARNINGS'].map((t, i) => (
              <button key={t} className={`group/btn w-full py-3 px-4 text-right font-bold text-sm tracking-widest relative overflow-hidden transition-all ${i === 0 ? 'bg-gradient-to-r from-[#FF1A00] to-[#FF4A1A] text-white shadow-[0_0_15px_#FF1A00]' : 'bg-[#FF1A00]/10 text-[#FFB800] border-t border-b border-[#FFB800]/20 hover:bg-[#FF1A00]/30 hover:border-[#FFB800]/60 hover:text-white'}`}>
                {t}
                {i === 0 && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white]"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex-1 flex flex-col items-center justify-center relative xl:mx-[100px] mt-10 xl:mt-0 min-h-[700px] z-20">

          <div className="absolute top-[-80px] flex flex-col items-center w-full">
            <div className="text-[#FF1A00] font-black text-xl tracking-[0.3em] border-b-[3px] border-r-[3px] border-l-[3px] border-[#FF1A00] px-16 py-3 shadow-[inset_0_-15px_30px_rgba(255,26,0,0.4)] bg-[#0A0000] drop-shadow-[0_5px_15px_rgba(255,26,0,0.5)]">
              LV-426 &lt;&nbsp;&nbsp;&nbsp;&nbsp;DN3A416
            </div>
            <div className="w-[500px] h-[25px] border-b-2 border-t-2 border-x-2 border-[#FF1A00]/80 mt-6 hidden sm:flex justify-between items-end px-3 py-1 bg-[#FF1A00]/10 relative">
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-[4px] h-[40px] bg-[#FFB800] shadow-[0_0_10px_#FFB800] z-20"></div>
              {[70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70].map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-[2px] bg-[#FFB800] ${i % 2 === 0 ? 'h-[12px]' : 'h-[6px]'}`}></div>
                  {i % 2 === 0 && <span className="text-[8px] text-[#FF1A00] mt-[2px] font-bold">{v}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] flex items-center justify-center mt-20 xl:mt-0 xl:-translate-y-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#110000] to-transparent shadow-[0_0_150px_rgba(255,26,0,0.2)]" />

            <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]">
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#FF1A00" strokeWidth="8" strokeDasharray="20 10 40 10 80 20" opacity="0.9" strokeLinecap="round" />
              <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#FFB800" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            </svg>

            <div className="absolute inset-[40px] rounded-full border-[4px] border-[#FFB800] border-dashed animate-[spin_50s_linear_infinite_reverse] opacity-50" />

            <div className="absolute inset-[80px] rounded-full border-[18px] border-[#FF1A00] shadow-[0_0_40px_#FF1A00,inset_0_0_40px_rgba(255,26,0,0.6)]" />
            <div className="absolute inset-[98px] rounded-full border border-[#FFF0B3] opacity-30" />

            <svg className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] opacity-60">
              <path d="M 50,200 A 300 300 0 0 1 200,50" fill="none" stroke="#FFB800" strokeWidth="2" />
              <path d="M 50,400 A 300 300 0 0 0 200,550" fill="none" stroke="#FFB800" strokeWidth="2" />
            </svg>

            <button
              onClick={onShopClick}
              className="absolute inset-[100px] rounded-full bg-gradient-to-b from-[#2a0A05] to-[#0A0000] flex flex-col items-center justify-center cursor-pointer group hover:bg-[#3d0f05] transition-colors border-4 border-[#FF1A00]/30 overflow-hidden shadow-[inset_0_0_50px_rgba(255,26,0,0.5)] z-20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.1)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <span className="text-[100px] md:text-[140px] lg:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#FFB800] drop-shadow-[0_0_40px_rgba(255,26,0,1)] leading-[0.8] mt-6 group-hover:scale-105 transition-transform duration-500">
                {speed}
              </span>

              <span className="text-sm md:text-lg text-[#FFB800] font-bold tracking-[0.4em] border-t-2 border-b-2 border-[#FF1A00] py-2 mt-4 w-[75%] uppercase bg-[#FF1A00]/20 flex justify-center items-center gap-4 group-hover:border-[#FFB800] group-hover:bg-[#FF1A00]/40 transition-colors">
                KM/H <span className="text-[8px] md:text-[10px] text-white opacity-80 leading-tight">VELOCITY<br />REDISTART</span>
              </span>

              <div className="flex gap-2 text-[10px] text-[#FF1A00] mt-3 tracking-widest font-black uppercase rounded">
                <span className="flex items-center gap-1 before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-[#FF1A00] before:rounded-full">SET</span>
                <span className="flex items-center gap-1 before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-[#FFB800] before:rounded-full text-[#FFB800]">ODOMETER</span>
              </div>

              <div className="absolute top-[30px] w-full text-center text-[#FF1A00] text-[10px] tracking-[0.4em] font-bold opacity-60">AREA 2B</div>
            </button>

            <div className="absolute right-[20px] top-1/2 -translate-y-1/2 translate-x-1/2 bg-[#FF1A00]/90 px-6 py-2 border-2 border-[#FFB800] text-black font-black text-xl tracking-widest shadow-[0_0_25px_#FF1A00] z-30 skew-x-[-15deg] group hover:bg-[#FFB800] cursor-pointer" onClick={onShopClick}>
              <div className="skew-x-[15deg] whitespace-nowrap">GEAR &gt; 1 &lt;</div>
            </div>

            <div className="absolute bottom-[-20px] bg-black border-2 border-[#FF1A00] px-8 py-1 text-[#FF1A00] font-bold text-sm tracking-[0.3em] z-30 shadow-[0_0_15px_#FF1A00]">
              L/R FLUX-AM-9B7
            </div>
          </div>

          <div className="absolute bottom-[-160px] hidden sm:flex flex-col items-center">
            <div className="w-[100px] h-[40px] border-l-4 border-r-4 border-[#FF1A00] mt-[-20px] flex items-center justify-center opacity-50 relative">
              <div className="w-[20px] h-full bg-[#FF1A00]/20 hidden sm:block"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-[#FF1A00] text-[10px] rotate-180 animate-pulse">▽</span>
                <span className="text-[#FFB800] text-[10px] rotate-180 mb-4 animate-pulse" style={{ animationDelay: '0.2s' }}>▽</span>
              </div>
            </div>

            <div className="w-[320px] h-[130px] bg-[#0A0000] border-t-[5px] border-b-[5px] border-[#FF1A00] flex flex-col justify-center items-center px-8 relative shadow-[0_0_30px_rgba(255,26,0,0.3)] mt-2" style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}>
              <div className="absolute left-[-20px] top-1/2 w-4 h-[60%] bg-[#FFB800] blur-md" />

              <div className="w-full flex justify-between text-[#FFB800] text-xs font-bold tracking-widest mb-3 border-b-2 border-[#FF1A00]/50 pb-1">
                <span>FUEL</span>
                <div className="flex gap-2 text-[#FF1A00]"><span className="rotate-180">△</span><span className="rotate-180">△</span><span className="rotate-180 text-white">△</span></div>
              </div>

              <div className="w-full h-[50px] flex p-1.5 gap-1.5 border-2 border-[#FF1A00]/80 bg-[#FF1A00]/10">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className={`flex-1 ${i < 9 ? 'bg-gradient-to-t from-[#FF1A00] to-[#FFB800] shadow-[0_0_8px_#FFB800]' : 'bg-transparent border border-[#FF1A00]/30'}`} />
                ))}
              </div>

              <div className="flex w-full justify-between items-end mt-2">
                <div className="w-2 h-2 rounded-full bg-[#FF1A00] shadow-[0_0_8px_#FF1A00]"></div>
                <div className="text-xs text-[#FF1A00] font-bold tracking-[0.3em]">ERC. AB0002</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-[350px] flex flex-col items-center flex-shrink-0 relative">
          <div className="w-[80%] mb-20 self-end pr-8 hidden lg:block">
            <div className="text-[10px] text-[#FFB800] tracking-[0.2em] mb-1 flex justify-between items-center">
              <span className="bg-[#FF1A00]/10 border border-[#FF1A00]/50 px-2 py-0.5">SET MODULATION</span>
              <span className="text-[#FF1A00] text-sm font-bold">RPM <span className="text-[10px]">x1000</span></span>
            </div>
            <TickerBars highValues />
            <div className="flex justify-between text-[12px] text-white mt-1 font-black px-1">
              <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
            </div>
          </div>

          <div className="absolute left-[-140px] top-[260px] w-[200px] h-[350px] bg-[#FF1A00]/10 border-r-4 border-[#FF1A00] hidden lg:flex flex-col justify-center gap-3 p-4 z-30 transition-all hover:bg-[#FF1A00]/20 group backdrop-blur-[2px]" style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)' }}>
            <div className="absolute inset-0 bg-[#FF1A00]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            {['STATUS', 'TECHNICAL', 'I/O SETTINGS', 'CALIBRATION'].map((t, i) => (
              <button key={t} className={`w-full py-3 px-4 text-left font-bold text-sm tracking-widest relative overflow-hidden transition-all ${i === 1 ? 'bg-gradient-to-r from-[#FF4A1A] to-[#FF1A00] text-white shadow-[0_0_15px_#FF1A00]' : 'bg-[#FF1A00]/10 text-[#FFB800] border-t border-b border-[#FFB800]/20 hover:bg-[#FF1A00]/30 hover:border-[#FFB800]/60 hover:text-white'}`}>
                {t}
                {i === 1 && <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white]"></span>}
              </button>
            ))}
          </div>

          <div className="w-[320px] flex flex-col gap-14 mt-0 xl:-mt-8">
            <div className="relative group cursor-pointer hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-[#FF1A00]/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity border border-transparent group-hover:border-[#FF1A00]/30 rounded-[50%]" />
              <div className="text-[#FFB800] text-[12px] tracking-widest border-b border-[#FF1A00]/80 mb-4 pb-1 font-bold pl-2 inline-block">TYRES / PSI</div>
              <CarSideWireframe />
              <div className="w-[90%] mx-auto h-[8px] border-2 border-[#FF1A00] mt-6 flex items-center p-[1px] relative">
                <div className="w-[65%] h-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]"></div>
                <div className="w-2 h-4 bg-white ml-2 rounded-[2px]" />
                <div className="absolute top-full left-0 w-[4px] h-[4px] mt-1 bg-[#FF1A00]"></div>
                <div className="absolute top-full right-0 w-[4px] h-[4px] mt-1 bg-[#FF1A00]"></div>
              </div>
              <div className="flex justify-between text-[#FF1A00] text-[9px] tracking-[0.2em] font-bold px-2 mt-2">
                <span>FRONT-LEFT</span><span>REAR-LEFT</span>
              </div>
            </div>

            <div className="relative group cursor-pointer hover:scale-105 transition-transform mt-4">
              <div className="absolute inset-0 bg-[#FF1A00]/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <CarTopWireframe />
            </div>

            <div className="w-[120px] h-[80px] bg-[#FF1A00]/10 flex gap-1 p-2 border-b-4 border-[#FF1A00] self-end mt-4 skew-x-[15deg]">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i} className="flex-1 bg-[#FFB800]"
                  animate={{ height: [`${40 + Math.random() * 60}%`, `${40 + Math.random() * 60}%`] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
                />
              ))}
            </div>
            <div className="text-[#FF1A00] text-xl font-bold tracking-[0.4em] mt-2 self-end">W T Y</div>
          </div>

        </div>

      </div>

      <div className="absolute bottom-6 left-8 text-[#FF1A00]/60 text-xs tracking-widest font-rajdhani z-50">
        SYS.VELOCITY_OS // OVERRIDE_ACTIVE
      </div>
      <div className="absolute bottom-6 right-8 text-[#FF1A00]/60 text-xs tracking-widest font-orbitron z-50 opacity-50 border-b-2 border-[#FF1A00] pb-1">
        J M
      </div>
    </section>
  );
}
