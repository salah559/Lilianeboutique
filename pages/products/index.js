import Header from '../../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Products(){
  const products = [
    {
      id: '1',
      title: 'فستان سهرة فاخر',
      price: 15000,
      slug: 'evening-dress-luxury',
      category: 'فساتين',
      gradient: 'from-pink-500 to-purple-600',
      description: 'فستان سهرة أنيق مع تفاصيل ذهبية'
    },
    {
      id: '2',
      title: 'فستان كاجوال عصري',
      price: 8500,
      slug: 'casual-dress-modern',
      category: 'فساتين',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'فستان يومي مريح وأنيق'
    },
    {
      id: '3',
      title: 'عباية مطرزة',
      price: 12000,
      slug: 'embroidered-abaya',
      category: 'عبايات',
      gradient: 'from-gray-600 to-gray-900',
      description: 'عباية فاخرة بتطريز يدوي'
    },
    {
      id: '4',
      title: 'جلابة مغربية',
      price: 9500,
      slug: 'moroccan-kaftan',
      category: 'جلابيات',
      gradient: 'from-amber-500 to-orange-600',
      description: 'جلابة تقليدية بلمسة عصرية'
    },
    {
      id: '5',
      title: 'بلوزة حريرية',
      price: 6000,
      slug: 'silk-blouse',
      category: 'بلوزات',
      gradient: 'from-rose-500 to-pink-600',
      description: 'بلوزة أنيقة من الحرير الطبيعي'
    },
    {
      id: '6',
      title: 'تنورة كلاسيكية',
      price: 5500,
      slug: 'classic-skirt',
      category: 'تنورات',
      gradient: 'from-indigo-600 to-slate-800',
      description: 'تنورة رسمية للمناسبات'
    },
    {
      id: '7',
      title: 'فستان أطفال',
      price: 4500,
      slug: 'kids-dress',
      category: 'أطفال',
      gradient: 'from-pink-400 to-rose-500',
      description: 'فستان جميل للبنات الصغيرات'
    },
    {
      id: '8',
      title: 'بدلة رسمية',
      price: 18000,
      slug: 'formal-suit',
      category: 'بدلات',
      gradient: 'from-stone-400 to-amber-700',
      description: 'بدلة احترافية للعمل'
    },
    {
      id: '9',
      title: 'فستان صيفي',
      price: 7000,
      slug: 'summer-dress',
      category: 'فساتين',
      gradient: 'from-yellow-400 to-orange-500',
      description: 'فستان خفيف مثالي للصيف'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-brandGold mb-2">مجموعتنا</h2>
          <p className="text-white/60">اكتشفي أحدث صيحات الموضة</p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map(p => (
            <motion.div
              key={p.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10"
            >
              <div className={`h-64 bg-gradient-to-br ${p.gradient} relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute top-3 right-3 bg-brandGold text-brandDark px-3 py-1 rounded-full text-sm font-semibold">
                  {p.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 text-white">{p.title}</h3>
                <p className="text-white/60 text-sm mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-brandGold">{p.price.toLocaleString()} د.ج</div>
                  <Link 
                    href={'/products/' + p.slug} 
                    className="px-4 py-2 bg-brandGold text-brandDark rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
}