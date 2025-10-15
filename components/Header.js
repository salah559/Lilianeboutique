import Link from 'next/link';
import { useState } from 'react';
import AdminModal from './AdminModal';
export default function Header(){ 
  const [show, setShow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  return (
    <header className="bg-brandDark text-brandGold py-4 px-4 md:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <img src="/logo.png" alt="logo" className="h-10 md:h-12 cursor-pointer" onClick={()=>setShow(true)} />
          <h1 className="text-lg md:text-xl font-bold">Lilian Boutique</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <Link href="/" className="mx-3 hover:text-white transition-colors">الرئيسية</Link>
          <Link href="/products" className="mx-3 hover:text-white transition-colors">المنتجات</Link>
          <Link href="/about" className="mx-3 hover:text-white transition-colors">من نحن</Link>
          <Link href="/contact" className="mx-3 hover:text-white transition-colors">تواصل معنا</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-brandGold p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenu && (
        <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
          <Link href="/" className="hover:text-white transition-colors" onClick={() => setMobileMenu(false)}>الرئيسية</Link>
          <Link href="/products" className="hover:text-white transition-colors" onClick={() => setMobileMenu(false)}>المنتجات</Link>
          <Link href="/about" className="hover:text-white transition-colors" onClick={() => setMobileMenu(false)}>من نحن</Link>
          <Link href="/contact" className="hover:text-white transition-colors" onClick={() => setMobileMenu(false)}>تواصل معنا</Link>
        </nav>
      )}
      
      {show && <AdminModal onClose={()=>setShow(false)} />}
    </header>
  );
}