import Header from '../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home(){
  const features = [
    { icon: '✨', title: 'جودة عالية', desc: 'أفضل الخامات والتصاميم' },
    { icon: '🚚', title: 'توصيل سريع', desc: 'لجميع أنحاء الجزائر' },
    { icon: '💎', title: 'تصاميم حصرية', desc: 'موديلات فريدة وعصرية' },
    { icon: '🎁', title: 'عروض خاصة', desc: 'خصومات وهدايا مستمرة' }
  ];

  return (
    <>
      <Header />
      
      <main>
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-brandDark to-pink-900/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brandGold via-yellow-300 to-brandGold bg-clip-text text-transparent">
                Lilian Boutique
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
                ملابس نساء وأطفال
              </p>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                اكتشفي عالماً من الأناقة والرقي مع مجموعتنا الحصرية من الأزياء العصرية
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link 
                  href="/products" 
                  className="px-8 py-4 bg-brandGold text-brandDark rounded-full font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
                >
                  تسوقي الآن
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  من نحن
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-b from-brandDark to-black/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-brandGold">لماذا تختارين ليليان؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/60">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-brandGold">جاهزة للتسوق؟</h2>
            <p className="text-xl text-white/80 mb-8">
              استكشفي مجموعتنا الواسعة من الفساتين، العبايات، والملابس العصرية
            </p>
            <Link 
              href="/products" 
              className="inline-block px-10 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-brandDark rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              شاهدي المنتجات
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}