
import { useState } from 'react';

export default function AdminModal({onClose}) {
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
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
        setError('كلمة مرور خاطئة. تأكد من إضافة ADMIN_PASSWORD في Secrets');
        setLoading(false);
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-brandLight text-brandDark p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-brandAccent text-center">دخول الأدمن</h2>
        <form onSubmit={handle} className="space-y-4">
          <input 
            value={pass} 
            onChange={e => setPass(e.target.value)} 
            type="password" 
            placeholder="أدخل كلمة المرور"
            className="w-full p-3 md:p-4 border-2 border-brandAccent/30 rounded-xl focus:outline-none focus:border-brandGold transition-colors bg-white" 
            disabled={loading}
            required
          />
          {error && <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}
          <div className="flex gap-3 flex-col md:flex-row">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium" 
              disabled={loading}
            >
              إلغاء
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-brandGold hover:bg-brandAccent text-white rounded-xl transition-colors font-bold disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'دخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
