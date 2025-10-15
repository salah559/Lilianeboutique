import Header from '../components/Header';
import { useState } from 'react';
export default function Admin(){
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
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
  if(!authed) return (
    <>
      <Header />
      <main className="max-w-md mx-auto p-4 md:p-6 mt-8">
        <div className="glass-dark p-6 md:p-8 rounded-2xl">
          <h2 className="text-2xl md:text-3xl mb-6 text-brandGold font-bold text-center">دخول الأدمن</h2>
          <form onSubmit={login} className="space-y-4">
            <input 
              value={pass} 
              onChange={e=>setPass(e.target.value)} 
              type="password" 
              placeholder="كلمة المرور" 
              className="w-full p-3 md:p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-brandGold transition-colors" 
              disabled={loading}
            />
            <button 
              className="w-full px-4 py-3 md:py-4 bg-brandGold hover:bg-yellow-600 text-brandDark font-bold rounded-lg transition-colors disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'دخول'}
            </button>
          </form>
          {message && <p className="mt-4 text-red-400 text-center">{message}</p>}
        </div>
      </main>
    </>
  );
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl mb-4">لوحة الأدمن</h2>
        <p>التحكم في المنتجات وإضافات أخرى. (واجهة تجريبية — اربطها بـ Supabase REST أو Admin SDK لاحقاً)</p>
      </main>
    </>
  )
}