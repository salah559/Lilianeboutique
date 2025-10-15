import Header from '../../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Products(){
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('الكل');

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

  const categories = ['الكل', 'فساتين', 'عبايات', 'جلابيات', 'بلوزات', 'تنورات', 'أطفال', 'بدلات'];
  
  const filteredProducts = filter === 'الكل' 
    ? products 
    : products.filter(p => p.category === filter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-6 min-h-screen">
        <div className="text-center mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
              مجموعتنا
            </h2>
            <p className="text-xl text-white/70">اكتشفي أحدث صيحات الموضة</p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-3 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === cat 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map(p => (
            <motion.div
              key={p.id}
              variants={item}
              layout
              onHoverStart={() => setHoveredId(p.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative group"
            >
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 h-full"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`h-72 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <motion.div 
                    className="absolute inset-0 bg-black/30"
                    animate={{ 
                      opacity: hoveredId === p.id ? 0 : 0.3 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredId === p.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div 
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {p.category}
                  </motion.div>

                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
                      <div className="text-white text-sm font-light">السعر</div>
                      <div className="text-white text-2xl font-bold">{p.price.toLocaleString()} د.ج</div>
                    </div>
                  </motion.div>
                </div>

                <div className="p-6">
                  <motion.h3 
                    className="font-bold text-2xl mb-3 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {p.title}
                  </motion.h3>
                  <p className="text-white/70 text-base mb-4 leading-relaxed">{p.description}</p>
                  
                  <Link href={'/products/' + p.slug}>
                    <motion.div
                      className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-center cursor-pointer relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        عرض التفاصيل
                        <motion.span
                          animate={{ x: hoveredId === p.id ? [0, 5, 0] : 0 }}
                          transition={{ duration: 0.6, repeat: hoveredId === p.id ? Infinity : 0 }}
                        >
                          ←
                        </motion.span>
                      </span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${p.gradient} rounded-2xl blur-xl -z-10`}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === p.id ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-white/60">لا توجد منتجات في هذا التصنيف</p>
          </motion.div>
        )}
      </main>
    </>
  );
}
