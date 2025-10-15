
import Link from 'next/link';
import { useState } from 'react';
import AdminModal from './AdminModal';

export default function Header(){ 
  const [show, setShow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  return (
    <header className="bg-brandDark/95 backdrop-blur-md text-brandGold py-3 px-4 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 space-x-reverse">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="h-10 md:h-12 cursor-pointer hover:scale-110 transition-transform" 
              onClick={()=>setShow(true)} 
            />
            <h1 className="text-base md:text-xl font-bold">Lilian Boutique</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 space-x-reverse">
            <Link href="/" className="hover:text-brandRose transition-colors font-medium">الرئيسية</Link>
            <Link href="/products" className="hover:text-brandRose transition-colors font-medium">المنتجات</Link>
            <Link href="/about" className="hover:text-brandRose transition-colors font-medium">من نحن</Link>
            <Link href="/contact" className="hover:text-brandRose transition-colors font-medium">تواصل معنا</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-brandGold p-2 hover:bg-brandAccent/30 rounded-lg transition-colors"
            aria-label="القائمة"
          >
            {mobileMenu ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenu && (
          <nav className="md:hidden mt-4 pb-3 flex flex-col space-y-3 border-t border-brandGold/20 pt-3">
            <Link 
              href="/" 
              className="hover:text-brandRose transition-colors py-2 px-3 rounded-lg hover:bg-brandAccent/20" 
              onClick={() => setMobileMenu(false)}
            >
              الرئيسية
            </Link>
            <Link 
              href="/products" 
              className="hover:text-brandRose transition-colors py-2 px-3 rounded-lg hover:bg-brandAccent/20" 
              onClick={() => setMobileMenu(false)}
            >
              المنتجات
            </Link>
            <Link 
              href="/about" 
              className="hover:text-brandRose transition-colors py-2 px-3 rounded-lg hover:bg-brandAccent/20" 
              onClick={() => setMobileMenu(false)}
            >
              من نحن
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-brandRose transition-colors py-2 px-3 rounded-lg hover:bg-brandAccent/20" 
              onClick={() => setMobileMenu(false)}
            >
              تواصل معنا
            </Link>
          </nav>
        )}
      </div>
      
      {show && <AdminModal onClose={()=>setShow(false)} />}
    </header>
  );
}
