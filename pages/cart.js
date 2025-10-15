import Header from '../components/Header';
import { useCart } from '../components/CartContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Cart(){
  const { items, removeItem, total } = useCart();
  
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-4xl font-bold mb-8 text-brandGold">سلة التسوق</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-2xl text-white/60 mb-6">سلة التسوق فارغة</p>
            <Link 
              href="/products" 
              className="inline-block px-8 py-3 bg-brandGold text-brandDark rounded-full font-bold hover:bg-yellow-400 transition-all"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-brandGold/30 to-purple-500/30 rounded-lg flex-shrink-0"></div>
                    
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
                      <div className="flex gap-4 text-sm text-white/60 mb-3">
                        <span>المقاس: <span className="text-white/90 font-semibold">{item.size}</span></span>
                        <span>اللون: <span className="text-white/90 font-semibold">{item.color}</span></span>
                        <span>الكمية: <span className="text-white/90 font-semibold">{item.qty}</span></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-brandGold">
                          {(item.price * item.qty).toLocaleString()} د.ج
                        </div>
                        <button
                          onClick={() => removeItem(idx)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-semibold transition-all"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-6">
                <h3 className="text-2xl font-bold mb-6 text-white">ملخص الطلب</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>عدد المنتجات:</span>
                    <span className="font-semibold">{items.reduce((sum, item) => sum + item.qty, 0)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>المجموع الفرعي:</span>
                    <span className="font-semibold">{total.toLocaleString()} د.ج</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>التوصيل:</span>
                    <span className="font-semibold text-green-400">مجاني</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">المجموع الكلي:</span>
                      <span className="text-brandGold">{total.toLocaleString()} د.ج</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-brandGold text-brandDark text-center rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 mb-3"
                >
                  إتمام الطلب
                </Link>
                
                <Link
                  href="/products"
                  className="block w-full py-3 text-center border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all"
                >
                  متابعة التسوق
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}