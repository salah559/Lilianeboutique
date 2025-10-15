import Header from '../components/Header';
import { useState } from 'react';
export default function Admin(){
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [message, setMessage] = useState('');
  function login(e){
    e.preventDefault();
    if(pass === (process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123')) setAuthed(true);
    else setMessage('كلمة مرور خاطئة');
  }
  if(!authed) return (
    <>
      <Header />
      <main className="max-w-md mx-auto p-6">
        <h2 className="text-2xl mb-4">دخول الأدمن</h2>
        <form onSubmit={login}>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="كلمة المرور" className="w-full p-2 mb-3"/>
          <button className="px-3 py-1 bg-yellow-500">دخول</button>
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