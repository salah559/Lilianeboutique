import { useState } from 'react';
export default function AdminModal({onClose}) {
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handle = async ()=> {
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        window.location.href = '/admin';
      } else {
        alert('كلمة مرور خاطئة');
        setLoading(false);
      }
    } catch (error) {
      alert('حدث خطأ، حاول مرة أخرى');
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-2">دخول الأدمن</h2>
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" className="w-full p-2 border mb-3" disabled={loading}/>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-3 py-1" disabled={loading}>إلغاء</button>
          <button onClick={handle} className="px-3 py-1 bg-yellow-500" disabled={loading}>{loading ? 'جاري التحميل...' : 'دخول'}</button>
        </div>
      </div>
    </div>
  );
}