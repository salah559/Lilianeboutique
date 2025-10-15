import Header from '../components/Header';
import { useCart } from '../components/CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart(){
  const { items, removeItem, total } = useCart();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-6 min-h-screen">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          سلة التسوق
        </motion.h2>
        
        {items.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-8xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              🛍️
            </motion.div>
            <p className="text-3xl text-white/70 mb-8">سلة التسوق فارغة</p>
            <Link href="/products">
              <motion.div
                className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-xl cursor-pointer relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">تصفح المنتجات</span>
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2 space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    layout
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <div className="flex gap-6 relative z-10">
                      <motion.div 
                        className="w-32 h-32 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-xl flex-shrink-0 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      </motion.div>
                      
                      <div className="flex-grow">
                        <h3 className="font-bold text-2xl text-white mb-3">{item.title}</h3>
                        <div className="flex flex-wrap gap-4 text-base text-white/70 mb-4">
                          <div className="flex items-center gap-2">
                            <span>المقاس:</span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-white font-semibold">{item.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>اللون:</span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-white font-semibold">{item.color}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>الكمية:</span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-white font-semibold">{item.qty}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <motion.div 
                            className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            {(item.price * item.qty).toLocaleString()} د.ج
                          </motion.div>
                          <motion.button
                            onClick={() => removeItem(idx)}
                            className="px-6 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-bold transition-all border border-red-500/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            حذف
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 sticky top-6 shadow-2xl">
                <h3 className="text-3xl font-bold mb-8 text-white">ملخص الطلب</h3>
                
                <div className="space-y-4 mb-8">
                  <motion.div 
                    className="flex justify-between text-lg text-white/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span>عدد المنتجات:</span>
                    <span className="font-bold text-white">{items.reduce((sum, item) => sum + item.qty, 0)}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between text-lg text-white/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold text-white">{total.toLocaleString()} د.ج</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between text-lg text-white/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span>التوصيل:</span>
                    <motion.span 
                      className="font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      مجاني ✨
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="border-t border-white/30 pt-4 mt-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex justify-between text-2xl font-bold">
                      <span className="text-white">المجموع الكلي:</span>
                      <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                        {total.toLocaleString()} د.ج
                      </span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/checkout">
                    <motion.div
                      className="block w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center rounded-xl font-bold text-xl mb-4 cursor-pointer relative overflow-hidden"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">إتمام الطلب 🎉</span>
                    </motion.div>
                  </Link>
                  
                  <Link href="/products">
                    <motion.div
                      className="block w-full py-3 text-center border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      متابعة التسوق
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
