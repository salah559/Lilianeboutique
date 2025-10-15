import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    price: '',
    variants: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
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

  function openAddModal() {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      category: '',
      price: '',
      variants: []
    });
    setShowModal(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description || '',
      category: product.category || '',
      price: product.price,
      variants: product.variants || []
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const variantsToSend = formData.variants.map(v => ({
        ...v,
        images: Array.isArray(v.images) ? v.images.map(img => typeof img === 'string' ? img : img.url || img) : []
      }));
      
      const body = editingProduct 
        ? { ...formData, id: editingProduct.id, variants: variantsToSend }
        : { ...formData, variants: variantsToSend };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setShowModal(false);
        fetchProducts();
      } else {
        const errorData = await response.json();
        alert('حدث خطأ أثناء حفظ المنتج: ' + (errorData.error || 'خطأ غير معروف'));
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('حدث خطأ أثناء حفظ المنتج');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId })
      });

      if (response.ok) {
        fetchProducts();
      } else {
        alert('حدث خطأ أثناء حذف المنتج');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('حدث خطأ أثناء حذف المنتج');
    }
  }

  function addVariant() {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: '', color: '', sku: '', stock: 0, images: [] }]
    });
  }

  function updateVariant(index, field, value) {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  }

  function removeVariant(index) {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  }

  async function uploadImage(file, variantIndex) {
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    const adminPassword = typeof window !== 'undefined' ? sessionStorage.getItem('admin_password') : null;

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminPassword}`
        },
        body: formDataUpload
      });

      const data = await response.json();
      if (data.success) {
        const newVariants = [...formData.variants];
        if (!newVariants[variantIndex].images) {
          newVariants[variantIndex].images = [];
        }
        newVariants[variantIndex].images.push(data.url);
        setFormData({ ...formData, variants: newVariants });
      } else {
        alert('فشل رفع الصورة: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploading(false);
    }
  }

  function removeImage(variantIndex, imageIndex) {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].images = newVariants[variantIndex].images.filter((_, i) => i !== imageIndex);
    setFormData({ ...formData, variants: newVariants });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-white">إدارة المنتجات</h3>
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-brandGold text-black rounded-lg hover:bg-yellow-500 transition-colors font-medium"
        >
          + إضافة منتج جديد
        </button>
      </div>

      {loading && !showModal ? (
        <div className="text-center text-brandGold py-8">جاري التحميل...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-white/70 py-8 bg-black/20 rounded-lg">
          لا توجد منتجات حالياً
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-black/30 rounded-lg p-4 border border-brandGold/20 hover:border-brandGold/50 transition-colors"
            >
              <h4 className="text-white font-semibold mb-2">{product.title}</h4>
              <p className="text-brandGold mb-2">{product.price} دج</p>
              <p className="text-white/70 text-sm mb-3">{product.category}</p>
              <p className="text-white/60 text-xs mb-3">
                المتغيرات: {product.variants?.length || 0}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => openEditModal(product)}
                  className="flex-1 px-3 py-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                >
                  تعديل
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-3 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-brandGold/30 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-brandGold mb-6">
              {editingProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">اسم المنتج *</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-brandGold/30 rounded-lg text-white focus:outline-none focus:border-brandGold"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2 text-sm">الرابط (Slug) *</label>
                  <input 
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-brandGold/30 rounded-lg text-white focus:outline-none focus:border-brandGold"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">الفئة</label>
                  <input 
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-brandGold/30 rounded-lg text-white focus:outline-none focus:border-brandGold"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2 text-sm">السعر (دج) *</label>
                  <input 
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-brandGold/30 rounded-lg text-white focus:outline-none focus:border-brandGold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">الوصف</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-brandGold/30 rounded-lg text-white focus:outline-none focus:border-brandGold"
                  rows="3"
                />
              </div>

              <div className="border-t border-brandGold/20 pt-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-semibold">المقاسات والألوان</h4>
                  <button 
                    type="button"
                    onClick={addVariant}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    + إضافة متغير
                  </button>
                </div>

                {formData.variants.map((variant, vIndex) => (
                  <div key={vIndex} className="bg-black/30 rounded-lg p-4 mb-4 border border-brandGold/20">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-brandGold text-sm font-semibold">متغير {vIndex + 1}</h5>
                      <button 
                        type="button"
                        onClick={() => removeVariant(vIndex)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        حذف
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-3 mb-3">
                      <input 
                        type="text"
                        placeholder="المقاس"
                        value={variant.size || ''}
                        onChange={(e) => updateVariant(vIndex, 'size', e.target.value)}
                        className="p-2 bg-black/50 border border-brandGold/30 rounded-lg text-white text-sm focus:outline-none focus:border-brandGold"
                      />
                      <input 
                        type="text"
                        placeholder="اللون"
                        value={variant.color || ''}
                        onChange={(e) => updateVariant(vIndex, 'color', e.target.value)}
                        className="p-2 bg-black/50 border border-brandGold/30 rounded-lg text-white text-sm focus:outline-none focus:border-brandGold"
                      />
                      <input 
                        type="text"
                        placeholder="SKU"
                        value={variant.sku || ''}
                        onChange={(e) => updateVariant(vIndex, 'sku', e.target.value)}
                        className="p-2 bg-black/50 border border-brandGold/30 rounded-lg text-white text-sm focus:outline-none focus:border-brandGold"
                      />
                      <input 
                        type="number"
                        placeholder="الكمية"
                        value={variant.stock || 0}
                        onChange={(e) => updateVariant(vIndex, 'stock', parseInt(e.target.value) || 0)}
                        className="p-2 bg-black/50 border border-brandGold/30 rounded-lg text-white text-sm focus:outline-none focus:border-brandGold"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-xs">صور هذا اللون/المقاس</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {variant.images && variant.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                            <button 
                              type="button"
                              onClick={() => removeImage(vIndex, imgIndex)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            uploadImage(e.target.files[0], vIndex);
                          }
                        }}
                        className="text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-brandGold file:text-black hover:file:bg-yellow-500"
                        disabled={uploading}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-brandGold text-black rounded-lg hover:bg-yellow-500 transition-colors font-medium disabled:opacity-50"
                  disabled={loading || uploading}
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  disabled={loading}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
