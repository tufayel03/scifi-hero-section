import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Navbar } from './Navbar';
import { CartSidebar } from './CartSidebar';
import { ProductGallery } from './product/ProductGallery';
import { ProductInfo } from './product/ProductInfo';
import { ProductActions } from './product/ProductActions';

export function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center">
        <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-[#FF6A00] hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#FF6A00] selection:text-white relative overflow-x-hidden">
      {/* Dynamic Background matching ShopPage */}
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
      
      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <ProductGallery 
              image={product.image} 
              badge={product.badge} 
              name={product.name} 
            />

            {/* Product Info & Actions */}
            <div className="flex flex-col">
              <ProductInfo product={product} />
              <ProductActions product={product} />
            </div>
          </div>
        </main>
      </div>

      <CartSidebar />
    </div>
  );
}
