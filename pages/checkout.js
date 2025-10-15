import Header from '../components/Header';
import { useCart } from '../components/CartContext';
import { useState, useMemo } from 'react';
import algeriaData from '../data/algeria-communes.json';

export default function Checkout(){
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState(''); 
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState(''); 
  const [commune, setCommune] = useState('');

  // استخراج الولايات الفريدة
  const wilayas = useMemo(() => {
    const uniqueWilayas = [...new Set(algeriaData.map(item => item.wilaya_name))];
    return uniqueWilayas.sort();
  }, []);

  // استخراج البلديات للولاية المختارة
  const communes = useMemo(() => {
    if (!wilaya) return [];
    return algeriaData
      .filter(item => item.wilaya_name === wilaya)
      .map(item => item.commune_name)
      .sort();
  }, [wilaya]);

  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/checkout', {
      method:'POST', 
      headers:{'content-type':'application/json'}, 
      body: JSON.stringify({ name, phone, wilaya, commune, items, total })
    });
    const data = await res.json();
    if(data.ok){ 
      clearCart(); 
      alert('تم إنشاء الطلب بنجاح!'); 
      window.location.href='/'; 
    } else {
      alert('حدث خطأ في إنشاء الطلب');
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-6 min-h-screen">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-brandGold/20">
          <h2 className="text-3xl font-bold mb-6 text-brandGold text-center">إتمام الطلب</h2>
          
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-brandGold mb-2 text-sm">الاسم الكامل</label>
              <input 
                required 
                placeholder="أدخل اسمك الكامل" 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                className="w-full p-3 rounded-lg bg-black/30 border border-brandGold/30 text-white placeholder-gray-400 focus:border-brandGold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-brandGold mb-2 text-sm">رقم الهاتف</label>
              <input 
                required 
                type="tel"
                placeholder="05xxxxxxxx" 
                value={phone} 
                onChange={e=>setPhone(e.target.value)} 
                className="w-full p-3 rounded-lg bg-black/30 border border-brandGold/30 text-white placeholder-gray-400 focus:border-brandGold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-brandGold mb-2 text-sm">الولاية</label>
              <select 
                required 
                value={wilaya} 
                onChange={e=>{setWilaya(e.target.value); setCommune('');}} 
                className="w-full p-3 rounded-lg bg-black/30 border border-brandGold/30 text-white focus:border-brandGold focus:outline-none transition-colors"
              >
                <option value="" className="bg-black">اختر الولاية</option>
                {wilayas.map(w=> <option key={w} value={w} className="bg-black">{w}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-brandGold mb-2 text-sm">البلدية</label>
              <select 
                required 
                value={commune} 
                onChange={e=>setCommune(e.target.value)} 
                disabled={!wilaya}
                className="w-full p-3 rounded-lg bg-black/30 border border-brandGold/30 text-white focus:border-brandGold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-black">اختر البلدية</option>
                {communes.map(c=> <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
            </div>

            <button 
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-brandGold/50 transition-all duration-300 transform hover:scale-105"
            >
              تأكيد الطلب عند الاستلام
            </button>
          </form>

          <div className="mt-6 p-4 bg-black/20 rounded-lg border border-brandGold/20">
            <p className="text-brandGold text-sm">
              <strong>المجموع الكلي:</strong> {total} دج
            </p>
            <p className="text-gray-400 text-xs mt-2">
              سيتم الدفع عند استلام الطلب
            </p>
          </div>
        </div>
      </main>
    </>
  );
}