import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Gavel, Users, Activity, Zap, ShieldCheck, Eye, DollarSign, ChevronDown, ChevronUp, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { CartSidebar } from './CartSidebar';
import { AUCTIONS, Auction } from '../data/auctions';

const MOCK_USERS = ['Racer_X', 'Collector99', 'SpeedDemon', 'DiecastKing', 'VintageHunter', 'ApexApex'];

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('00:00:00');
        setIsUrgent(false);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      setIsUrgent(distance < 1000 * 60 * 2);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <span className={`font-mono font-bold tracking-widest ${isUrgent ? 'text-red-500 animate-pulse' : 'text-white'}`}>
      {timeLeft}
    </span>
  );
}

export function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [auctionsData, setAuctionsData] = useState<Auction[]>(AUCTIONS);
  const [customBidAmount, setCustomBidAmount] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeAuction = auctionsData.find(a => a.id === id);

  // Simulated Live Bidding
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionsData(prev => prev.map(auction => {
        if (auction.status === 'LIVE' && Math.random() > 0.85) {
          const highest = auction.bids.length > 0 ? Math.max(...auction.bids.map(b => b.amount)) : auction.startingBid;
          const newBid = {
            id: Date.now().toString() + Math.random(),
            user: MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)],
            amount: highest + Math.floor(Math.random() * 5 + 1) * 100,
            time: new Date().toLocaleTimeString(),
            isUser: false
          };
          return { ...auction, bids: [newBid, ...auction.bids].slice(0, 50), viewers: auction.viewers + Math.floor(Math.random() * 5) - 2 };
        }
        return auction.status === 'LIVE' && Math.random() > 0.5 ? { ...auction, viewers: auction.viewers + Math.floor(Math.random() * 5) - 2 } : auction;
      }));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!activeAuction) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Auction Not Found</h2>
          <button onClick={() => navigate('/auction')} className="text-[#FFD500] hover:underline">Return to Auctions</button>
        </div>
      </div>
    );
  }

  const currentBid = activeAuction.bids.length > 0 ? Math.max(...activeAuction.bids.map(b => b.amount)) : activeAuction.startingBid;

  const handleCustomBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customBidAmount.replace(/,/g, ''), 10);
    if (!isNaN(amount) && amount > currentBid) {
      setAuctionsData(prev => prev.map(auction => {
        if (auction.id === activeAuction.id) {
          const newBid = { id: Date.now().toString(), user: 'YOU', amount, time: new Date().toLocaleTimeString(), isUser: true };
          return { ...auction, bids: [newBid, ...auction.bids].slice(0, 50) };
        }
        return auction;
      }));
      setCustomBidAmount('');
    }
  };

  const handleBuyNow = () => {
    alert(`Purchasing ${activeAuction.name} for $${activeAuction.buyNowPrice.toLocaleString()}!`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF6A00] selection:text-white flex flex-col pt-24 pb-12">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/auction')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Network
        </button>

        {/* NEW SPLIT LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: GALLERY (Sticky on Desktop) */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-28 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-[#111] border border-white/5 aspect-[4/3] shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeAuction.gallery?.[activeImageIndex] || activeAuction.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={activeAuction.gallery?.[activeImageIndex] || activeAuction.image} 
                  alt={activeAuction.name} 
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                {activeAuction.status === 'LIVE' && (
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
                  </div>
                )}
                {activeAuction.status === 'ENDED' && (
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 text-gray-400">
                    Ended
                  </div>
                )}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
                  <Eye size={12} className="text-gray-400" /> {activeAuction.viewers}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {activeAuction.gallery && activeAuction.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {activeAuction.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                      activeImageIndex === index ? 'border-[#FFD500] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${activeAuction.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: DETAILS & BIDDING */}
          <div className="w-full lg:w-[45%] flex flex-col gap-10">
            
            {/* Header Info */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                <span className="bg-white/10 text-white px-3 py-1 rounded-full">LOT {activeAuction.id}</span>
                <span>{activeAuction.year}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-green-500"/> {activeAuction.authenticity}</span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-6xl uppercase tracking-tighter text-white leading-[0.9]">
                {activeAuction.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm font-mono text-gray-400 uppercase tracking-widest mt-2">
                <p>Condition: <span className="text-white">{activeAuction.condition}</span></p>
              </div>
            </div>

            {/* Bidding Panel */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD500]/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Current Bid</span>
                  <motion.div 
                    key={currentBid}
                    initial={{ color: '#FFD500', y: -5 }}
                    animate={{ color: '#FFFFFF', y: 0 }}
                    className="font-display text-6xl tracking-tighter text-white flex items-center gap-1 leading-none"
                  >
                    <span className="text-[#FFD500] text-4xl">$</span>
                    {currentBid.toLocaleString()}
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-black/40 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Timer size={16} className="text-gray-400" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                    {activeAuction.status === 'ENDED' ? 'Ended' : 'Ends In'}
                  </span>
                </div>
                <div className="text-xl">
                  {activeAuction.status === 'ENDED' ? (
                    <span className="font-mono font-bold text-gray-500">00:00:00</span>
                  ) : (
                    <CountdownTimer endTime={activeAuction.endTime} />
                  )}
                </div>
              </div>

              {activeAuction.status === 'LIVE' && (
                <div className="flex flex-col gap-4 mt-2">
                  <form onSubmit={handleCustomBidSubmit} className="flex flex-col gap-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <DollarSign size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={customBidAmount}
                        onChange={(e) => setCustomBidAmount(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder={`Min bid: ${(currentBid + 100).toLocaleString()}`}
                        className="w-full bg-black border border-white/10 focus:border-[#FFD500] rounded-2xl py-5 pl-12 pr-5 text-white font-mono text-xl outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!customBidAmount || parseInt(customBidAmount) <= currentBid}
                      className="w-full bg-white text-black font-bold uppercase tracking-widest py-5 rounded-2xl hover:bg-[#FFD500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      <Gavel size={18} /> Place Bid
                    </button>
                  </form>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-600 font-mono text-[10px] uppercase tracking-widest">or</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <button 
                    onClick={handleBuyNow}
                    className="w-full group flex items-center justify-between bg-transparent border border-white/10 hover:border-white/30 px-6 py-5 rounded-2xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span className="font-bold text-white uppercase tracking-widest text-xs">Buy It Now</span>
                    </div>
                    <span className="font-mono text-sm text-white">${activeAuction.buyNowPrice.toLocaleString()}</span>
                  </button>
                </div>
              )}
              {activeAuction.status === 'ENDED' && (
                <div className="w-full bg-white/5 text-gray-400 font-bold uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-2">
                  Auction Closed
                </div>
              )}
            </div>

            {/* Bid History */}
            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
              <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="w-full flex items-center justify-between p-6 lg:p-8 bg-transparent hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-[#FFD500]" />
                  <span className="font-sans font-bold uppercase tracking-widest text-sm text-white">Bid History</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono text-gray-400 ml-2">
                    {activeAuction.bids.length}
                  </span>
                </div>
                {isHistoryOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              
              <AnimatePresence>
                {isHistoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <div className="p-6 lg:p-8 pt-4">
                      <div className="grid grid-cols-12 gap-2 pb-4 border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                        <div className="col-span-5">Bidder</div>
                        <div className="col-span-4 text-right">Amount</div>
                        <div className="col-span-3 text-right">Time</div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4 max-h-[300px] overflow-y-auto scrollbar-hide pr-2">
                        {activeAuction.bids.map((bid, index) => (
                          <div key={bid.id} className={`grid grid-cols-12 gap-2 p-3 rounded-xl items-center transition-colors ${index === 0 ? 'bg-[#FFD500]/10 border border-[#FFD500]/20' : 'hover:bg-white/5 border border-transparent'}`}>
                            <div className="col-span-5 flex items-center gap-3 overflow-hidden">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${index === 0 ? 'bg-[#FFD500] text-black' : bid.isUser ? 'bg-white text-black' : 'bg-white/10 text-gray-400'}`}>
                                {bid.isUser ? <Zap size={10} /> : <Users size={10} />}
                              </div>
                              <span className={`font-mono text-xs uppercase tracking-widest truncate ${index === 0 ? 'text-[#FFD500] font-bold' : bid.isUser ? 'text-white font-bold' : 'text-gray-400'}`}>
                                {bid.user}
                              </span>
                            </div>
                            <div className={`col-span-4 text-right font-mono font-bold text-sm ${index === 0 ? 'text-[#FFD500]' : 'text-white'}`}>
                              ${bid.amount.toLocaleString()}
                            </div>
                            <div className="col-span-3 text-right text-[10px] font-mono text-gray-500">
                              {bid.time}
                            </div>
                          </div>
                        ))}
                        {activeAuction.bids.length === 0 && (
                          <div className="text-center py-8 text-gray-500 font-mono text-xs uppercase tracking-widest">No bids placed</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Lots */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm text-white flex items-center gap-2">
                  <Activity size={16} className="text-[#FF6A00]" /> Live Network
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {auctionsData.filter(a => a.id !== activeAuction.id && a.status === 'LIVE').slice(0, 4).map(auction => {
                  const highest = auction.bids.length > 0 ? Math.max(...auction.bids.map(b => b.amount)) : auction.startingBid;
                  return (
                    <button
                      key={auction.id}
                      onClick={() => navigate(`/auction/${auction.id}`)}
                      className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex items-center gap-4 p-3 hover:border-white/20 hover:bg-white/5 transition-all text-left"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-black">
                        <img src={auction.image} alt={auction.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500" />
                      </div>
                      <div className="flex flex-col justify-center flex-1 overflow-hidden">
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">LOT {auction.id}</span>
                        <h4 className="font-sans text-xs text-white leading-tight mb-2 truncate">{auction.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#FFD500] text-sm">${highest.toLocaleString()}</span>
                          <ArrowRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>

      <CartSidebar />
    </div>
  );
}
