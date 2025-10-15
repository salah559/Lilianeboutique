import Header from '../components/Header';
import { useState, useEffect } from 'react';

export default function Admin(){
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  async function login(e){
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setAuthed(true);
      } else {
        setMessage('كلمة مرور خاطئة');
      }
    } catch (error) {
      setMessage('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) {
      fetchOrders();
    }
  }, [authed]);

  async function fetchOrders() {
    setLoadingOrders(true);
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  }

  if(!authed) return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl border border-brandGold/20">
          <h2 className="text-2xl md:text-3xl mb-6 text-brandGold font-bold text-center">دخول الأدمن</h2>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-brandGold mb-2 text-sm">كلمة المرور</label>
              <input 
                value={pass} 
                onChange={e=>setPass(e.target.value)} 
                type="password" 
                placeholder="أدخل كلمة المرور" 
                className="w-full p-3 md:p-4 bg-black/30 border-2 border-brandGold/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-brandGold transition-colors" 
                disabled={loading}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full px-4 py-3 md:py-4 bg-gradient-to-r from-brandGold to-yellow-500 hover:from-yellow-500 hover:to-brandGold text-black font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg" 
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'دخول'}
            </button>
          </form>
          {message && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-center text-sm">{message}</p>
              <p className="text-red-300/70 text-center text-xs mt-2">تأكد من إضافة ADMIN_PASSWORD في Secrets</p>
            </div>
          )}
        </div>
      </main>
    </>
  );

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-6 min-h-screen">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-brandGold/20">
          <h2 className="text-3xl font-bold mb-6 text-brandGold">لوحة الأدمن</h2>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-white">الطلبيات</h3>
              <button 
                onClick={fetchOrders}
                className="px-4 py-2 bg-brandGold text-black rounded-lg hover:bg-yellow-500 transition-colors"
              >
                تحديث
              </button>
            </div>

            {loadingOrders ? (
              <div className="text-center text-brandGold py-8">جاري التحميل...</div>
            ) : orders.length === 0 ? (
              <div className="text-center text-white/70 py-8 bg-black/20 rounded-lg">
                لا توجد طلبيات حالياً
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-black/30 rounded-lg p-6 border border-brandGold/20 hover:border-brandGold/50 transition-colors"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-brandGold font-semibold mb-2">معلومات العميل</p>
                        <p className="text-white">الاسم: {order.customerName}</p>
                        <p className="text-white">الهاتف: {order.phone}</p>
                        <p className="text-white">الولاية: {order.wilaya}</p>
                        <p className="text-white">البلدية: {order.commune}</p>
                      </div>
                      <div>
                        <p className="text-brandGold font-semibold mb-2">تفاصيل الطلب</p>
                        <p className="text-white">المجموع: {order.total} دج</p>
                        <p className="text-white">الحالة: {order.status === 'pending' ? 'قيد الانتظار' : order.status}</p>
                        <p className="text-white/70 text-sm">التاريخ: {new Date(order.createdAt).toLocaleDateString('ar-DZ')}</p>
                      </div>
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-brandGold/20">
                        <p className="text-brandGold font-semibold mb-2">المنتجات:</p>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-white/90 text-sm">
                              • {item.title} - {item.price} دج (الكمية: {item.quantity || 1})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}