import Link from 'next/link';
import { useState } from 'react';
import AdminModal from './AdminModal';
export default function Header(){ 
  const [show, setShow] = useState(false);
  return (
    <header className="bg-brandDark text-brandGold py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="logo" className="h-12 cursor-pointer" onClick={()=>setShow(true)} />
        <h1 className="text-xl font-bold">Lilian Boutique</h1>
      </div>
      <nav>
        <Link href="/" className="mx-3">الرئيسية</Link>
        <Link href="/products" className="mx-3">المنتجات</Link>
        <Link href="/about" className="mx-3">من نحن</Link>
        <Link href="/contact" className="mx-3">تواصل معنا</Link>
      </nav>
      {show && <AdminModal onClose={()=>setShow(false)} />}
    </header>
  );
}