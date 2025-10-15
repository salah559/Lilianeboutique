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
      <main className="max-w-md mx-auto p-6">
        <h2 className="text-2xl mb-4">دخول الأدمن</h2>
        <form onSubmit={login}>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="كلمة المرور" className="w-full p-2 mb-3" disabled={loading}/>
          <button className="px-3 py-1 bg-yellow-500" disabled={loading}>{loading ? 'جاري التحميل...' : 'دخول'}</button>
        </form>
        <p className="mt-3 text-red-400">{message}</p>
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