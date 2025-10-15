import Header from '../../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Products(){
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('الكل');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const categories = ['الكل', ...new Set(products.map(p => p.category).filter(Boolean))];
  
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

  const getProductImage = (product) => {
    if (product.variants && product.variants.length > 0) {
      const firstVariantWithImage = product.variants.find(v => v.images && v.images.length > 0);
      if (firstVariantWithImage) {
        return firstVariantWithImage.images[0];
      }
    }
    return null;
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

        {loading ? (
          <div className="text-center text-brandGold text-2xl py-20">
            جاري التحميل...
          </div>
        ) : (
          <>
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map(p => {
                const productImage = getProductImage(p);
                return (
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
                      <div className="h-72 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        {productImage ? (
                          <img 
                            src={productImage} 
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/30">
                            لا توجد صورة
                          </div>
                        )}
                        
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

                        {p.category && (
                          <motion.div 
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {p.category}
                          </motion.div>
                        )}

                        <motion.div
                          className="absolute bottom-4 left-4 right-4"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
                            <div className="text-white text-sm font-light">السعر</div>
                            <div className="text-white text-2xl font-bold">{parseFloat(p.price).toLocaleString()} د.ج</div>
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
                        <p className="text-white/70 text-base mb-4 leading-relaxed line-clamp-2">
                          {p.description || 'منتج رائع'}
                        </p>
                        
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
                      className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === p.id ? 0.5 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
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
          </>
        )}
      </main>
    </>
  );
}
