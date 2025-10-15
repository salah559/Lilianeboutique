import { useState } from 'react';
export default function AdminModal({onClose}) {
  const [pass, setPass] = useState('');
  const handle = ()=> {
    if(pass === (process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123')) {
      window.location.href = '/admin';
    } else {
      alert('كلمة مرور خاطئة');
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-2">دخول الأدمن</h2>
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" className="w-full p-2 border mb-3"/>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-3 py-1">إلغاء</button>
          <button onClick={handle} className="px-3 py-1 bg-yellow-500">دخول</button>
        </div>
      </div>
    </div>
  );
}