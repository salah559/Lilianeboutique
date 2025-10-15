Lilian Boutique - Next.js starter
================================

ملف جاهز لمشروع بوتيك نساء وأطفال باستخدام Next.js + Tailwind + Supabase skeleton.

محتويات الأرشيف:
- كود واجهة Next.js (صفحات رئيسية، منتجات، منتج مفرد، سلة، checkout، صفحة أدمن)
- مثال عن schema SQL لـ Supabase: `supabase/schema.sql`
- ملف بيانات placeholder للولايات والبلديات: `data/algeria-communes.json`
- صورة اللوغو في `public/logo.png`
- ملف .env.example مع متغيرات البيئة

ملاحظات مهمة:
1. ملف البيانات الكامل للولايات والبلديات غير مضمّن بالكامل داخل هذا الأرشيف لأنّه كبير. استعمل هذا المستودع للحصول على JSON جاهز ومحدث:
   - othmanus/algeria-cities (GitHub): https://github.com/othmanus/algeria-cities
   قم بتحميل الملف `json/ar/communes.json` أو أي صيغة تناسبك وضعه في `data/algeria-communes.json`.

2. لتهيئة Supabase:
   - أنشئ مشروع في Supabase.
   - انسخ محتوى `supabase/schema.sql` ونفذها في SQL Editor.
   - ضع مفاتيح البيئة في `.env.local` وفق `.env.example`.

3. صفحة الأدمن محمية بكلمة مرور افتراضية `admin123`. يمكنك تغييرها من داخل صفحة الأدمن بعد الدخول.

تشغيل محلي:
--------------
1. npm install
2. أضف .env.local من .env.example
3. npm run dev