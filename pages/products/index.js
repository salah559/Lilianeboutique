import Header from '../../components/Header';
import Link from 'next/link';
export default function Products(){
  // This is a placeholder. Connect to Supabase to fetch real products.
  const sample = [
    {id:'1', title:'فستان مشجر', price:12000, slug:'dress-1'}
  ];
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl mb-4">المنتجات</h2>
        <div className="grid grid-cols-3 gap-6">
          {sample.map(p=>(
            <div key={p.id} className="bg-white/5 p-4 rounded">
              <div className="h-48 bg-gray-700 mb-3"></div>
              <h3 className="font-semibold">{p.title}</h3>
              <div className="mt-2">{p.price} د.ج</div>
              <Link href={'/products/'+p.slug}><a className="mt-3 inline-block text-brandGold">عرض المنتج</a></Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}