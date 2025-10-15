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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">دخول الأدمن</h2>
        <input 
          value={pass} 
          onChange={e=>setPass(e.target.value)} 
          type="password" 
          placeholder="أدخل كلمة المرور"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-brandGold" 
          disabled={loading}
        />
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors" 
            disabled={loading}
          >
            إلغاء
          </button>
          <button 
            onClick={handle} 
            className="px-4 py-2 bg-brandGold hover:bg-yellow-600 text-white rounded-lg transition-colors" 
            disabled={loading}
          >
            {loading ? 'جاري التحميل...' : 'دخول'}</button>
        </div>
      </div>
    </div>
  );
}