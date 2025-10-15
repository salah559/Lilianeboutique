import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCart } from '../../components/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { addItem } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const allProducts = [
    { id: '1', title: 'فستان سهرة فاخر', price: 15000, slug: 'evening-dress-luxury', category: 'فساتين', gradient: 'from-pink-500 to-purple-600', description: 'فستان سهرة أنيق مع تفاصيل ذهبية', details: 'فستان سهرة فاخر مصنوع من أجود أنواع الأقمشة، مزين بتطريز ذهبي يدوي. مثالي للمناسبات الخاصة والحفلات.' },
    { id: '2', title: 'فستان كاجوال عصري', price: 8500, slug: 'casual-dress-modern', category: 'فساتين', gradient: 'from-blue-500 to-cyan-500', description: 'فستان يومي مريح وأنيق', details: 'فستان كاجوال عملي ومريح للاستخدام اليومي، تصميم عصري يجمع بين الأناقة والراحة.' },
    { id: '3', title: 'عباية مطرزة', price: 12000, slug: 'embroidered-abaya', category: 'عبايات', gradient: 'from-gray-600 to-gray-900', description: 'عباية فاخرة بتطريز يدوي', details: 'عباية فاخرة من قماش فاخر مع تطريز يدوي دقيق، تجمع بين الأصالة والعصرية.' },
    { id: '4', title: 'جلابة مغربية', price: 9500, slug: 'moroccan-kaftan', category: 'جلابيات', gradient: 'from-amber-500 to-orange-600', description: 'جلابة تقليدية بلمسة عصرية', details: 'جلابة مغربية تقليدية بتصميم عصري، مثالية للمناسبات والأعياد.' },
    { id: '5', title: 'بلوزة حريرية', price: 6000, slug: 'silk-blouse', category: 'بلوزات', gradient: 'from-rose-500 to-pink-600', description: 'بلوزة أنيقة من الحرير الطبيعي', details: 'بلوزة أنيقة من الحرير الطبيعي 100%، ناعمة ومريحة للارتداء اليومي أو الرسمي.' },
    { id: '6', title: 'تنورة كلاسيكية', price: 5500, slug: 'classic-skirt', category: 'تنورات', gradient: 'from-indigo-600 to-slate-800', description: 'تنورة رسمية للمناسبات', details: 'تنورة كلاسيكية رسمية مناسبة للعمل والمناسبات الرسمية.' },
    { id: '7', title: 'فستان أطفال', price: 4500, slug: 'kids-dress', category: 'أطفال', gradient: 'from-pink-400 to-rose-500', description: 'فستان جميل للبنات الصغيرات', details: 'فستان أطفال جميل وملون، مصنوع من قماش مريح وآمن للأطفال.' },
    { id: '8', title: 'بدلة رسمية', price: 18000, slug: 'formal-suit', category: 'بدلات', gradient: 'from-stone-400 to-amber-700', description: 'بدلة احترافية للعمل', details: 'بدلة نسائية احترافية بقصة أنيقة، مثالية لبيئة العمل والاجتماعات الرسمية.' },
    { id: '9', title: 'فستان صيفي', price: 7000, slug: 'summer-dress', category: 'فساتين', gradient: 'from-yellow-400 to-orange-500', description: 'فستان خفيف مثالي للصيف', details: 'فستان صيفي خفيف ومريح من قماش قطني يسمح بالتهوية، مثالي للأيام الحارة.' }
  ];

  const product = allProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto p-6 text-center">
          <h2 className="text-3xl mb-4">المنتج غير موجود</h2>
          <Link href="/products" className="text-brandGold hover:underline">
            العودة للمنتجات
          </Link>
        </main>
      </>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['أسود', 'أبيض', 'بيج', 'وردي', 'أزرق'];

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('الرجاء اختيار اللون');
      return;
    }
    
    addItem({
      title: product.title,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      qty: quantity
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <Link href="/products" className="text-brandGold hover:underline mb-6 inline-block">
          ← العودة للمنتجات
        </Link>
        
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`aspect-square bg-gradient-to-br ${product.gradient} rounded-2xl shadow-2xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-4 right-4 bg-brandGold text-brandDark px-4 py-2 rounded-full font-bold">
              {product.category}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">{product.title}</h1>
            <div className="text-3xl font-bold text-brandGold mb-6">
              {product.price.toLocaleString()} د.ج
            </div>
            
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              {product.details}
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-white/90 mb-2 font-semibold">المقاس:</label>
                <div className="flex gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-brandGold text-brandDark'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/90 mb-2 font-semibold">اللون:</label>
                <div className="flex gap-3 flex-wrap">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                        selectedColor === color
                          ? 'bg-brandGold text-brandDark'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/90 mb-2 font-semibold">الكمية:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-brandGold text-brandDark hover:bg-yellow-400 transform hover:scale-105'
                }`}
              >
                {added ? '✓ تمت الإضافة للسلة' : 'أضف للسلة'}
              </button>

              <Link
                href="/cart"
                className="block w-full py-4 text-center border-2 border-brandGold text-brandGold rounded-xl font-bold text-lg hover:bg-brandGold hover:text-brandDark transition-all"
              >
                عرض السلة
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
