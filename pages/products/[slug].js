import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  async function fetchProduct() {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.products) {
        const foundProduct = data.products.find(p => p.slug === slug);
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.variants && foundProduct.variants.length > 0) {
            setSelectedVariant(foundProduct.variants[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto p-6 text-center">
          <div className="text-brandGold text-2xl">جاري التحميل...</div>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto p-6 text-center">
          <h2 className="text-3xl mb-4 text-white">المنتج غير موجود</h2>
          <Link href="/products" className="text-brandGold hover:underline">
            العودة للمنتجات
          </Link>
        </main>
      </>
    );
  }

  const uniqueColors = [...new Set(product.variants?.map(v => v.color).filter(Boolean))];
  const uniqueSizes = [...new Set(product.variants?.map(v => v.size).filter(Boolean))];

  const availableVariants = product.variants?.filter(v => {
    if (selectedVariant?.color && v.color !== selectedVariant.color) return false;
    if (selectedVariant?.size && v.size !== selectedVariant.size) return false;
    return true;
  }) || [];

  const currentImages = selectedVariant?.images || [];

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('الرجاء اختيار المقاس واللون');
      return;
    }
    
    addItem({
      title: product.title,
      price: product.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      variantId: selectedVariant.id,
      qty: quantity,
      image: currentImages[0] || null
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const selectColor = (color) => {
    const variant = product.variants?.find(v => 
      v.color === color && (!selectedVariant?.size || v.size === selectedVariant.size)
    );
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const selectSize = (size) => {
    const variant = product.variants?.find(v => 
      v.size === size && (!selectedVariant?.color || v.color === selectedVariant.color)
    );
    if (variant) {
      setSelectedVariant(variant);
    }
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
            className="space-y-4"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl relative overflow-hidden">
              {currentImages.length > 0 ? (
                <img 
                  src={currentImages[selectedImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  لا توجد صورة
                </div>
              )}
              {product.category && (
                <div className="absolute top-4 right-4 bg-brandGold text-brandDark px-4 py-2 rounded-full font-bold">
                  {product.category}
                </div>
              )}
            </div>

            {currentImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-brandGold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">{product.title}</h1>
            <div className="text-3xl font-bold text-brandGold mb-6">
              {parseFloat(product.price).toLocaleString()} د.ج
            </div>
            
            {product.description && (
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="space-y-6">
              {uniqueColors.length > 0 && (
                <div>
                  <label className="block text-white/90 mb-2 font-semibold">اللون:</label>
                  <div className="flex gap-3 flex-wrap">
                    {uniqueColors.map(color => (
                      <button
                        key={color}
                        onClick={() => selectColor(color)}
                        className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                          selectedVariant?.color === color
                            ? 'bg-brandGold text-brandDark'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {uniqueSizes.length > 0 && (
                <div>
                  <label className="block text-white/90 mb-2 font-semibold">المقاس:</label>
                  <div className="flex gap-3">
                    {uniqueSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => selectSize(size)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                          selectedVariant?.size === size
                            ? 'bg-brandGold text-brandDark'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedVariant && (
                <div className="text-white/70 text-sm">
                  الكمية المتوفرة: {selectedVariant.stock || 0}
                </div>
              )}

              <div>
                <label className="block text-white/90 mb-2 font-semibold">الكمية:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-12 text-center text-white">{quantity}</span>
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
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : selectedVariant && selectedVariant.stock > 0
                    ? 'bg-brandGold text-brandDark hover:bg-yellow-400 transform hover:scale-105'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!selectedVariant 
                  ? 'اختر المقاس واللون' 
                  : selectedVariant.stock === 0
                  ? 'غير متوفر'
                  : added 
                  ? '✓ تمت الإضافة للسلة' 
                  : 'أضف للسلة'}
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
