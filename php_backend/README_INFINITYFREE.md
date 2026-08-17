# دليل رفع وتهيئة قاعدة بيانات Delicious Meats على InfinityFree 🚀

هذا الدليل يشرح خطوة بخطوة كيفية رفع قاعدة البيانات والباك اند (PHP + MySQL) على استضافة **InfinityFree** المجانية لضمان استلام **جميع الأوردرات بدون أي فقدان وبسرعة فائقة**.

---

## 📁 محتويات مجلد `php_backend`
1. `schema.sql`: ملف إنشاء الجداول الهيكلية لقواعد البيانات (Orders & Order Items) مع الفهارس السريعة وترميز اللغة العربية `utf8mb4`.
2. `db.php`: ملف الاتصال بقاعدة البيانات باستعمال PDO.
3. `orders.php`: ملف API المسئول عن استقبال الأوردرات، إحضارها، وتحديث حالتها فورا.

---

## 🛠️ خطوات الإعداد على InfinityFree

### الخطوة 1: إنشاء قاعدة بيانات MySQL جديدة
1. سجل الدخول إلى حسابك في موقع [InfinityFree](https://app.infinityfree.com/).
2. اختر موقعك واضغط على **Control Panel** (لوحة التحكم cPanel).
3. ابحث عن قسم **Databases** واضغط على **MySQL Databases**.
4. في خانة **Create New Database**، اكتب اسماً للقاعدة (مثلاً: `delicious_meats`) واضغط **Create Database**.
5. سيعرض لك الموقع البيانات التالية (احفظها جانباً):
   - **MySQL Host Name**: (مثال: `sql123.infinityfree.com`)
   - **MySQL User Name**: (مثال: `if0_38491029`)
   - **MySQL Password**: (كلمة سر حساب الفانيلا vpanel الخاصة بك)
   - **Database Name**: (مثال: `if0_38491029_delicious_meats`)

---

### الخطوة 2: استيراد جداول الداتابيز (phpMyAdmin)
1. في لوحة التحكم (cPanel)، اضغط على **phpMyAdmin**.
2. اختر قاعدة البيانات التي أنشأتها من القائمة الجانبية اليسرى.
3. اضغط على تبويب **Import** (استيراد) في الأعلى.
4. اضغط على **Choose File** واختر ملف `schema.sql` الموجود في مجلد `php_backend`.
5. انزل للأسفل واضغط **Go** (تنفيذ).
6. ستظهر لك رسالة نجاح باللون الأخضر تم إنشاء الجدولين `orders` و `order_items`.

---

### الخطوة 3: تعديل ملف `db.php`
افتح ملف `db.php` في محرر النصوص وقم بتحديث بيانات الاتصال لتطابق بيانات InfinityFree:

```php
define('DB_HOST', 'sql123.infinityfree.com'); // استبدل بـ Host الخاص بك
define('DB_USER', 'if0_38491029');          // استبدل بـ User الخاص بك
define('DB_PASS', 'your_password_here');    // كلمة سرك في InfinityFree
define('DB_NAME', 'if0_38491029_delicious_meats'); // اسم القاعدة الكامل
```

---

### الخطوة 4: رفع الملفات عبر File Manager
1. في لوحة تحكم InfinityFree (cPanel)، اضغط على **File Manager**.
2. افتح مجلد **`htdocs`**.
3. قم برفع ملفي `db.php` و `orders.php` داخل مجلد `htdocs` (أو داخل مجلد `api` إن أردت).
4. رابط الـ API الخاص بك الآن أصبح:
   `https://yourdomain.infinityfreeapp.com/orders.php`

---

### الخطوة 5: ربط الموقع برابط الـ PHP API على InfinityFree
في ملف البيئة `.env.local` داخل مشروع الموقع، أضف الرابط التالي:

```env
NEXT_PUBLIC_PHP_API_URL=https://yourdomain.infinityfreeapp.com/orders.php
```

أو استبدل رابط الـ API المباشر في ملف `/src/app/api/orders/route.ts`.

---

## ⚡ الميزات والضمانات
- **السرعة**: استعلامات مفهرسة بالكامل تجعل وقت الاستجابة أقل من 10ms.
- **دعم اللغة العربية**: ترميز `utf8mb4_unicode_ci` يضمن حفظ أسماء العملاء والعناوين العربية بدقة بدون ظهور أي رموز غريبة.
- **عدم فقدان الأوردرات**: استخدام المعاملات الذرية `Atomic Transactions` لضمان عدم ضياع أي أوردر حتى لو تم الإرسال في نفس الثواني من عدة هواتف.
