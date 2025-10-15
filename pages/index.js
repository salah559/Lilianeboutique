import Header from '../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home(){
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: '✨', title: 'جودة عالية', desc: 'أفضل الخامات والتصاميم', color: 'from-purple-500 to-pink-500' },
    { icon: '🚚', title: 'توصيل سريع', desc: 'لجميع أنحاء الجزائر', color: 'from-blue-500 to-cyan-500' },
    { icon: '💎', title: 'تصاميم حصرية', desc: 'موديلات فريدة وعصرية', color: 'from-amber-500 to-orange-500' },
    { icon: '🎁', title: 'عروض خاصة', desc: 'خصومات وهدايا مستمرة', color: 'from-rose-500 to-red-500' }
  ];

  return (
    <>
      <Header />

      <main className="relative">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-brandDark to-pink-900/30"></div>

          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-brandGold via-yellow-300 to-brandGold bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Lilian Boutique
              </motion.h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-brandGold mb-4 font-light">
                ملابس نساء وأطفال
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-4"
              >
                <motion.p 
                  className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  اكتشفي عالماً من الأناقة والرقي مع مجموعتنا الحصرية من الأزياء العصرية
                </motion.p>
              </motion.div>

              <motion.div 
                className="flex gap-6 justify-center flex-wrap mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Link href="/products">
                  <motion.div
                    className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white rounded-full font-bold text-xl shadow-2xl cursor-pointer relative overflow-hidden group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">تسوقي الآن ✨</span>
                  </motion.div>
                </Link>

                <Link href="/about">
                  <motion.div
                    className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-xl border-2 border-white/30 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    من نحن
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-b from-brandDark via-purple-900/20 to-brandDark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-200 to-pink-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              لماذا تختارين ليليان؟
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="relative group"
                >
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity`}
                  ></div>

                  <div className="relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 transition-all h-full">
                    <motion.div 
                      className="text-6xl mb-6"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-white/70 text-lg">{feature.desc}</p>

                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
                جاهزة للتسوق؟
              </h2>
              <p className="text-2xl text-white/80 mb-12 leading-relaxed">
                استكشفي مجموعتنا الواسعة من الفساتين، العبايات، والملابس العصرية
              </p>

              <Link href="/products">
                <motion.div
                  className="inline-block px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-bold text-2xl shadow-2xl cursor-pointer relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    شاهدي المنتجات
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ←
                    </motion.span>
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}