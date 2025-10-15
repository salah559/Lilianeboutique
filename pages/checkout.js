import Header from '../components/Header';
import { useCart } from '../components/CartContext';
import { useState } from 'react';
import algeria from '../data/algeria-communes.json';
export default function Checkout(){
  const { items, total, clearCart } = useCart();
  const [name,setName]=useState(''); const [phone,setPhone]=useState('');
  const [wilaya,setWilaya]=useState(''); const communes = algeria.find(w=> w.name===wilaya)?.communes || [];
  const [commune,setCommune]=useState('');
  async function submit(e){
    e.preventDefault();
    // call API /api/checkout
    const res = await fetch('/api/checkout', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ name, phone, wilaya, commune, items, total })});
    const data = await res.json();
    if(data.ok){ clearCart(); alert('تم إنشاء الطلب'); window.location.href='/'; }
    else alert('خطأ');
  }
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl mb-4">إتمام الطلب</h2>
        <form onSubmit={submit} className="space-y-4">
          <input required placeholder="الاسم الكامل" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2"/>
          <input required placeholder="رقم الهاتف" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full p-2"/>
          <select required value={wilaya} onChange={e=>setWilaya(e.target.value)} className="w-full p-2">
            <option value="">اختر الولاية</option>
            {algeria.map(w=> <option key={w.code} value={w.name}>{w.name}</option>)}
          </select>
          <select required value={commune} onChange={e=>setCommune(e.target.value)} className="w-full p-2">
            <option value="">اختر البلدية</option>
            {communes.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="px-4 py-2 bg-yellow-500">تأكيد الطلب عند الاستلام</button>
        </form>
      </main>
    </>
  );
}