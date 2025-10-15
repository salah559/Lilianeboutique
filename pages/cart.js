import Header from '../components/Header';
import { useCart } from '../components/CartContext';
import Link from 'next/link';
export default function Cart(){
  const { items, removeItem, total } = useCart();
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl mb-4">سلة التسوق</h2>
        {items.length===0 ? <p>السلة فارغة</p> : (
          <div>
            {items.map((it, idx)=>(
              <div key={idx} className="flex justify-between p-3 bg-white/5 mb-2 rounded">
                <div>{it.title} - {it.size} - {it.color} x {it.qty}</div>
                <div>
                  <button onClick={()=>removeItem(idx)} className="px-2 py-1">حذف</button>
                </div>
              </div>
            ))}
            <div className="mt-4">المجموع: {total} د.ج</div>
            <Link href="/checkout" className="mt-3 inline-block text-brandGold">إتمام الطلب</Link>
          </div>
        )}
      </main>
    </>
  );
}