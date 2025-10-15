
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function AdminModalContent({onClose}) {
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
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('admin_auth', 'true');
          sessionStorage.setItem('admin_auth_time', Date.now().toString());
        }
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
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]" 
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-black text-white p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl border-2 border-brandGold/30" 
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-brandGold text-center">دخول لوحة الأدمن</h2>
        <form onSubmit={handle} className="space-y-4">
          <input 
            value={pass} 
            onChange={e => setPass(e.target.value)} 
            type="password" 
            placeholder="أدخل كلمة المرور"
            className="w-full p-3 md:p-4 border-2 border-brandGold/30 rounded-xl focus:outline-none focus:border-brandGold transition-colors bg-black/50 text-white placeholder-gray-400" 
            disabled={loading}
            required
          />
          {error && <p className="text-red-400 text-sm text-center bg-red-900/30 p-3 rounded-lg border border-red-500/30">{error}</p>}
          <div className="flex gap-3 flex-col md:flex-row">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium" 
              disabled={loading}
            >
              إلغاء
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-brandGold to-yellow-500 hover:from-yellow-500 hover:to-brandGold text-black rounded-xl transition-colors font-bold disabled:opacity-50" 
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

export default function AdminModal({onClose}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof window === 'undefined') return null;

  return createPortal(
    <AdminModalContent onClose={onClose} />,
    document.body
  );
}
