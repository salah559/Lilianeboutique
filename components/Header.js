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
        <Link href="/"><a className="mx-3">الرئيسية</a></Link>
        <Link href="/products"><a className="mx-3">المنتجات</a></Link>
        <Link href="/about"><a className="mx-3">من نحن</a></Link>
        <Link href="/contact"><a className="mx-3">تواصل معنا</a></Link>
      </nav>
      {show && <AdminModal onClose={()=>setShow(false)} />}
    </header>
  );
}