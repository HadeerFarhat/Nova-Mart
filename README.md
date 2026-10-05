# NovaMart — متجر إلكتروني

## طريقة التشغيل (مهم)

1. فك الضغط عن الملف zip
2. ادخل على فولدر **NovaMart**
3. افتح ملف **index.html** بمتصفح Chrome أو Edge

أو من التيرمينال:
```
cd NovaMart
python3 -m http.server 8080
```
ثم افتح: http://localhost:8080

## الملفات
- index.html — الصفحة الرئيسية
- css/common.css — التنسيق المشترك (الهيدر، الفوتر، الكروت، الأزرار، الوضع الداكن...)
- css/<page>.css — تنسيق خاص بكل صفحة (index, category, product, cart, checkout, login, wishlist, about)
- js/common.js — المنطق المشترك (السلة، المفضلة، اللغة، الثيم، الهيدر والفوتر)
- js/<page>.js — سكربت خاص بكل صفحة
- assets/products.js — المنتجات
- assets/en.js / ar.js — اللغات
- img/ — صور المنتجات

## المميزات
- سلة ومفضلة (LocalStorage)
- عربي / English مع RTL
- وضع داكن
- أقسام، بحث، ترتيب
- صفحة منتج + منتجات مشابهة
- تسجيل دخول ودفع تجريبي
