import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { User, Package, Settings, LogOut, ArrowLeft, Save, Bell, Shield, Key, ChevronRight, ChevronDown, MapPin, CreditCard } from 'lucide-react';

// Mock order data
const MOCK_ORDERS = [
  {
    id: 'HW-8492',
    status: 'Delivered',
    orderDate: '2024.10.20',
    deliveredDate: '2024.10.24',
    total: 24.99,
    items: [
      { name: 'Bone Shaker Limited Edition', qty: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-7311',
    status: 'In Transit',
    orderDate: '2024.09.12',
    deliveredDate: null,
    total: 119.98,
    items: [
      { name: 'Mega Garage Tower', qty: 1, price: 89.99, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80' },
      { name: 'Custom Motors Pack', qty: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Express Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-6522',
    status: 'Delivered',
    orderDate: '2024.08.05',
    deliveredDate: '2024.08.10',
    total: 45.00,
    items: [
      { name: 'Twin Mill III', qty: 2, price: 22.50, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-5419',
    status: 'Delivered',
    orderDate: '2024.07.21',
    deliveredDate: '2024.07.25',
    total: 15.99,
    items: [
      { name: 'Rodger Dodger', qty: 1, price: 15.99, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-4390',
    status: 'Delivered',
    orderDate: '2024.06.15',
    deliveredDate: '2024.06.20',
    total: 35.50,
    items: [
      { name: 'Deora II', qty: 1, price: 35.50, image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3211',
    status: 'Delivered',
    orderDate: '2024.05.10',
    deliveredDate: '2024.05.15',
    total: 55.00,
    items: [
      { name: 'Night Shifter', qty: 1, price: 55.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3210',
    status: 'Delivered',
    orderDate: '2024.05.01',
    deliveredDate: '2024.05.05',
    total: 25.00,
    items: [
      { name: 'Bone Shaker', qty: 1, price: 25.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3209',
    status: 'Delivered',
    orderDate: '2024.04.20',
    deliveredDate: '2024.04.25',
    total: 45.00,
    items: [
      { name: 'Twin Mill', qty: 1, price: 45.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3208',
    status: 'Delivered',
    orderDate: '2024.04.10',
    deliveredDate: '2024.04.15',
    total: 30.00,
    items: [
      { name: 'Rip Rod', qty: 1, price: 30.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3207',
    status: 'Delivered',
    orderDate: '2024.03.25',
    deliveredDate: '2024.03.30',
    total: 60.00,
    items: [
      { name: 'Baja Truck', qty: 1, price: 60.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3206',
    status: 'Delivered',
    orderDate: '2024.03.15',
    deliveredDate: '2024.03.20',
    total: 20.00,
    items: [
      { name: 'Muscle Tone', qty: 1, price: 20.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3205',
    status: 'Delivered',
    orderDate: '2024.03.01',
    deliveredDate: '2024.03.05',
    total: 40.00,
    items: [
      { name: 'Drift King', qty: 1, price: 40.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3204',
    status: 'Delivered',
    orderDate: '2024.02.20',
    deliveredDate: '2024.02.25',
    total: 50.00,
    items: [
      { name: 'Speed Demon', qty: 1, price: 50.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3203',
    status: 'Delivered',
    orderDate: '2024.02.10',
    deliveredDate: '2024.02.15',
    total: 35.00,
    items: [
      { name: 'Street Sweeper', qty: 1, price: 35.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3202',
    status: 'Delivered',
    orderDate: '2024.01.25',
    deliveredDate: '2024.01.30',
    total: 65.00,
    items: [
      { name: 'Track Star', qty: 1, price: 65.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  },
  {
    id: 'HW-3201',
    status: 'Delivered',
    orderDate: '2024.01.10',
    deliveredDate: '2024.01.15',
    total: 45.00,
    items: [
      { name: 'Rally Champ', qty: 1, price: 45.00, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=200&q=80' }
    ],
    shipping: { address: '123 Trackside Blvd, Sector 7G', method: 'Standard Delivery' },
    payment: 'Cash on Delivery'
  }
];

export function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = MOCK_ORDERS.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(MOCK_ORDERS.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#FF6A00] selection:text-white relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#FF6A00] opacity-[0.12] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FF2A00] opacity-[0.08] blur-[120px] rounded-full" />
        
        {/* Dot Matrix Pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
        
        {/* Scanline overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)`
        }} />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-80" />
      </div>

      <nav className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/shop" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono uppercase tracking-widest text-xs hidden sm:inline">Back to Shop</span>
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF2A00]">
          Command Center
        </h1>
        <div className="w-8 sm:w-24" /> {/* Spacer */}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / ID Card */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6A00] to-[#FF2A00]" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF6A00]/5 blur-2xl rounded-full" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-black border border-white/10 rounded-full mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <User size={32} className="text-[#FF6A00]" />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-tighter mb-1">Racer_X</h2>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </div>
                <div className="w-full h-px bg-white/10 my-6" />
                <div className="w-full flex justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
                  <span>Status</span>
                  <span className="text-white">Elite Pilot</span>
                </div>
                <div className="w-full flex justify-between text-xs font-mono text-gray-400 uppercase tracking-widest mt-2">
                  <span>Joined</span>
                  <span className="text-white">2024.10.24</span>
                </div>
              </div>
            </div>

            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex-shrink-0 lg:w-full flex items-center justify-between px-4 py-4 rounded-xl font-mono text-xs uppercase tracking-widest transition-all border ${activeTab === 'orders' ? 'bg-[#FF6A00]/10 border-[#FF6A00]/50 text-[#FF6A00]' : 'bg-[#111] border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Package size={16} /> 
                  <span className="hidden sm:inline">Order History</span>
                  <span className="sm:hidden">Orders</span>
                </div>
                {activeTab === 'orders' && <ChevronRight size={16} className="hidden lg:block" />}
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex-shrink-0 lg:w-full flex items-center justify-between px-4 py-4 rounded-xl font-mono text-xs uppercase tracking-widest transition-all border ${activeTab === 'settings' ? 'bg-[#FF6A00]/10 border-[#FF6A00]/50 text-[#FF6A00]' : 'bg-[#111] border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Settings size={16} /> 
                  <span className="hidden sm:inline">System Settings</span>
                  <span className="sm:hidden">Settings</span>
                </div>
                {activeTab === 'settings' && <ChevronRight size={16} className="hidden lg:block" />}
              </button>
              <Link 
                to="/login"
                className="flex-shrink-0 lg:w-full flex items-center gap-3 bg-[#111] border border-red-500/20 text-red-500 hover:bg-red-500/10 px-4 py-4 rounded-xl font-mono text-xs uppercase tracking-widest transition-all lg:mt-4"
              >
                <LogOut size={16} /> 
                <span className="hidden sm:inline">Terminate Session</span>
                <span className="sm:hidden">Logout</span>
              </Link>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'orders' && (
                <motion.section
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                      <Package size={16} className="text-[#FF6A00]" />
                    </div>
                    <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-white">Acquisition History</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {currentOrders.map((order) => {
                      const isExpanded = expandedOrder === order.id;
                      const isDelivered = order.status === 'Delivered';
                      
                      return (
                        <div 
                          key={order.id}
                          className={`bg-[#111] border rounded-2xl overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'border-[#FF6A00]/50 shadow-[0_0_20px_rgba(255,106,0,0.1)]' : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {/* Order Header (Clickable) */}
                          <button 
                            onClick={() => toggleOrder(order.id)}
                            className="w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left relative overflow-hidden group"
                          >
                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            
                            <div className="flex items-center gap-4 w-full sm:w-auto relative z-10">
                              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border flex items-center justify-center shrink-0 transition-colors ${
                                isExpanded ? 'border-[#FF6A00] bg-[#FF6A00]/10' : 'border-white/10 bg-black'
                              }`}>
                                {order.items.length === 1 ? (
                                  <img src={order.items[0].image} alt={order.items[0].name} className="w-full h-full object-cover opacity-80" />
                                ) : (
                                  <Package size={24} className={isExpanded ? 'text-[#FF6A00]' : 'text-gray-500'} />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-mono text-sm uppercase tracking-widest text-white">ID: {order.id}</h3>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border ${
                                    isDelivered 
                                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                      : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Ordered: {order.orderDate}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0 relative z-10">
                              <span className="font-display text-xl text-[#FF6A00]">৳{order.total.toFixed(2)}</span>
                              <div className="flex items-center gap-2 text-gray-500">
                                <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline">
                                  {isExpanded ? 'Close Details' : 'View Details'}
                                </span>
                                <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#FF6A00]' : ''}`} />
                              </div>
                            </div>
                          </button>

                          {/* Order Details (Expandable) */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 sm:p-6 pt-0 border-t border-white/10 bg-black/20">
                                  
                                  {/* Order Timeline */}
                                  <div className="flex items-center gap-4 mb-6 pt-4">
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Order Placed</span>
                                      <span className="text-sm font-mono text-white">{order.orderDate}</span>
                                    </div>
                                    <div className="flex-1 h-px bg-white/10 relative">
                                      <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${isDelivered ? 'w-full bg-green-500/50' : 'w-1/2 bg-blue-500/50'}`} />
                                    </div>
                                    <div className="flex flex-col text-right">
                                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Delivered</span>
                                      <span className={`text-sm font-mono ${isDelivered ? 'text-green-500' : 'text-gray-500'}`}>
                                        {order.deliveredDate || 'Pending'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Items List */}
                                  <div className="py-4 space-y-4">
                                    <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Acquired Assets</h4>
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="flex items-center justify-between gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-black rounded overflow-hidden border border-white/10 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                                          </div>
                                          <div>
                                            <p className="font-sans text-sm text-white line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-500 font-mono">Qty: {item.qty}</p>
                                          </div>
                                        </div>
                                        <span className="font-mono text-sm text-white shrink-0">৳{item.price.toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Logistics & Payment */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                      <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={14} className="text-[#FF6A00]" />
                                        <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest">Logistics</h4>
                                      </div>
                                      <p className="text-sm text-white mb-1">{order.shipping.method}</p>
                                      <p className="text-xs text-gray-400">{order.shipping.address}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                      <div className="flex items-center gap-2 mb-2">
                                        <CreditCard size={14} className="text-[#FF6A00]" />
                                        <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest">Payment</h4>
                                      </div>
                                      <p className="text-sm text-white">{order.payment}</p>
                                    </div>
                                  </div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-white/10">
                        <button
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-[#FF6A00] disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:text-gray-400 transition-colors"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        
                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => paginate(idx + 1)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm transition-colors ${
                                currentPage === idx + 1
                                  ? 'bg-[#FF6A00]/20 border border-[#FF6A00] text-[#FF6A00]'
                                  : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-[#FF6A00] disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:text-gray-400 transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

              {activeTab === 'settings' && (
                <motion.section
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                      <Settings size={16} className="text-[#FF6A00]" />
                    </div>
                    <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-white">System Configuration</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Profile Information */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:col-span-2">
                      <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <User size={14} className="text-[#FF6A00]" /> Pilot Data
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 ml-1">Callsign (Username)</label>
                          <input type="text" defaultValue="Racer_X" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] outline-none transition-all font-mono text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 ml-1">Comms Channel (Email)</label>
                          <input type="email" defaultValue="racer@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] outline-none transition-all font-mono text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                      <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Shield size={14} className="text-[#FF6A00]" /> Security Protocol
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 ml-1">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] outline-none transition-all font-mono text-sm tracking-widest" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500 ml-1">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] outline-none transition-all font-mono text-sm tracking-widest" />
                        </div>
                        
                        <button className="group relative w-full h-12 bg-transparent text-[#FF6A00] font-mono font-bold tracking-widest uppercase text-xs overflow-hidden transition-all border border-[#FF6A00]/50 hover:border-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] rounded-lg mt-2">
                          <div className="absolute inset-0 bg-[#FF6A00] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                          <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
                            <Key size={14} />
                            UPDATE CREDENTIALS
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                      <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Bell size={14} className="text-[#FF6A00]" /> Alerts & Comms
                      </h3>
                      <div className="space-y-6">
                        <label className="flex items-start justify-between cursor-pointer group">
                          <div className="pr-4">
                            <p className="font-sans font-bold text-sm text-white group-hover:text-[#FF6A00] transition-colors">Acquisition Updates</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">Receive status changes for your orders.</p>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-black border border-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-[#FF6A00] after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:border-[#FF6A00]/50"></div>
                          </div>
                        </label>
                        
                        <div className="w-full h-px bg-white/5" />

                        <label className="flex items-start justify-between cursor-pointer group">
                          <div className="pr-4">
                            <p className="font-sans font-bold text-sm text-white group-hover:text-[#FF6A00] transition-colors">Classified Drops</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">Alerts for limited edition vehicle releases.</p>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-black border border-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 peer-checked:after:bg-[#FF6A00] after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:border-[#FF6A00]/50"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end pt-4">
                      <button className="group relative w-full sm:w-auto px-8 h-12 bg-transparent text-[#FF6A00] font-mono font-bold tracking-widest uppercase text-xs overflow-hidden transition-all border border-[#FF6A00]/50 hover:border-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] rounded-lg">
                        <div className="absolute inset-0 bg-[#FF6A00] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
                          <Save size={14} />
                          SAVE CONFIGURATION
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
