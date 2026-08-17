/**
 * i18n.js — Bilingual translation dictionary
 * Arabic (ar) is RTL default; English (en) is LTR.
 */

const TRANSLATIONS = {
  ar: {
    // Brand
    brandName: 'ديليشس ميتس',
    brandTagline: 'لحوم ودواجن فاخرة طازجة',

    // Nav
    navHome: 'الرئيسية',
    navMeats: 'لحوم',
    navPoultry: 'دواجن',
    navOther: 'أخرى',
    navCart: 'السلة',
    navStaff: 'بوابة الموظفين',
    langToggle: 'English',

    // Hero
    heroTitle: 'مذاق الفخامة في كل قطعة',
    heroSubtitle: 'أجود أنواع اللحوم والدواجن الفاخرة الطازجة — جودة تثق بها لعائلتك، موصلة حتى باب منزلك.',
    heroCTA: 'تسوق الآن',

    // Badges
    frozenBadge: '🍃 طازج فاخر',
    bestsellerBadge: '★ الأكثر مبيعاً',

    // Sections
    bestSellersTitle: 'الأكثر مبيعاً',
    bestSellersSubtitle: 'منتجات مختارة بعناية تحظى بأعلى تقييمات عملائنا',
    categoriesTitle: 'تصفح الأقسام',
    categoriesSubtitle: 'اختر من تشكيلتنا المتنوعة من اللحوم والدواجن الفاخرة',
    viewCategory: 'عرض القسم',
    categoryMeatsTitle: 'لحوم',
    categoryMeatsDesc: 'قطعيات لحم بقري وضاني فاخرة ومتنوعة.',
    categoryPoultryTitle: 'دواجن',
    categoryPoultryDesc: 'دواجن طازجة كاملة أو قطع نظيفة.',
    categoryOtherTitle: 'أخرى',
    categoryOtherDesc: 'توابل وفحم وأسياخ ومستلزمات الشواء.',

    // Features
    feat1Title: 'توصيل سريع مجمد',
    feat1Desc: 'سيارات مجهزة للحفاظ على التجميد حتى بابك',
    feat2Title: 'جودة مضمونة ١٠٠٪',
    feat2Desc: 'أعلى معايير النظافة والسلامة الغذائية',
    feat3Title: 'نقداً عند الاستلام',
    feat3Desc: 'ادفع فقط عند استلام طلبك بسلامة',
    feat4Title: 'قطعيات فاخرة',
    feat4Desc: 'جزارون محترفون ومعايير أعلى جودة',

    // Product Card
    addToCart: 'أضف للسلة',
    addedToCart: 'تمت الإضافة ✓',
    egp: 'ج.م',
    viewAll: 'عرض الكل',

    // Category page
    catPageTitle: 'منتجات القسم',
    sortLabel: 'ترتيب:',
    sortDefault: 'الافتراضي',
    sortPriceAsc: 'السعر: من الأقل',
    sortPriceDesc: 'السعر: من الأعلى',
    noProducts: 'لا توجد منتجات في هذا القسم.',
    loadMore: 'عرض المزيد',
    showing: 'يعرض',
    of: 'من',
    products: 'منتج',

    // Cart page
    cartTitle: 'سلة التسوق',
    cartEmpty: 'سلتك فارغة حالياً!',
    cartEmptyDesc: 'لم تضف أي منتجات بعد. تصفح تشكيلتنا الفاخرة الآن.',
    browseProducts: 'تصفح المنتجات',
    product: 'المنتج',
    unitPrice: 'سعر الوحدة',
    qty: 'الكمية',
    lineTotal: 'الإجمالي',
    remove: 'حذف',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    delivery: 'رسوم التوصيل',
    deliveryFree: 'مجاني',
    grandTotal: 'الإجمالي الكلي',
    cashOnly: 'الدفع نقداً عند الاستلام فقط',
    freeShipHint: 'أضف {amount} ج.م للحصول على شحن مجاني!',
    checkoutBtn: 'إتمام الطلب الآن',
    backToShop: 'العودة للتسوق',
    continueShopping: 'مواصلة التسوق',

    // Checkout
    checkoutTitle: 'إتمام الطلب',
    checkoutSubtitle: 'بيانات الشحن والتوصيل',
    fieldName: 'اسم العميل',
    fieldNamePH: 'أدخل اسمك الثنائي أو الثلاثي',
    fieldPhone: 'رقم الهاتف',
    fieldPhonePH: 'مثال: 01012345678',
    fieldGov: 'المحافظة',
    fieldGovPH: 'اختر المحافظة',
    fieldArea: 'المنطقة / الحي',
    fieldAreaPH: 'مثال: المعادي، مصر الجديدة...',
    fieldAddress: 'العنوان بالتفصيل',
    fieldAddressPH: 'رقم الشارع، العمارة، الدور، الشقة...',
    orderReview: 'مراجعة طلبك',
    placeOrder: 'تأكيد وإرسال الطلب',
    placing: 'جاري إرسال طلبك...',
    required: 'هذا الحقل مطلوب',
    invalidPhone: 'يرجى إدخال رقم مصري صحيح (01X مكون من 11 رقم)',
    emptyCart: 'سلتك فارغة! أضف منتجات أولاً.',

    // Order success
    successTitle: 'تم استلام طلبك بنجاح! 🎉',
    successDesc: 'شكراً لتسوقك من ديليشس ميتس. سيتواصل معك أحد ممثلينا لتأكيد موعد التوصيل.',
    orderRef: 'رقم الطلب المرجعي',
    payMethod: 'طريقة الدفع',
    cashOnDelivery: 'نقداً عند الاستلام',
    keepShopping: 'الاستمرار في التسوق',

    // Staff Login
    staffLoginTitle: 'بوابة الموظفين',
    staffLoginSubtitle: 'تسجيل الدخول لإدارة الطلبات والمنتجات',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    loginBtn: 'تسجيل الدخول',
    loginError: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    demoCredentials: 'بيانات تجريبية: admin / admin123',

    // Staff Dashboard
    dashboardTitle: 'لوحة تحكم الموظفين',
    tabOrders: 'الطلبات',
    tabProducts: 'المنتجات',
    logoutBtn: 'تسجيل الخروج',
    previewStore: 'معاينة المتجر',
    ordersTitle: 'الطلبات الواردة',
    productsTitle: 'إدارة المنتجات',
    orderId: 'طلب رقم',
    customer: 'العميل',
    phone: 'الهاتف',
    address: 'العنوان',
    status: 'الحالة',
    total: 'الإجمالي',
    updateStatus: 'تحديث الحالة',
    statusNew: 'جديد',
    statusPreparing: 'قيد التجهيز',
    statusDelivering: 'في الطريق',
    statusDelivered: 'تم التسليم',
    statusCancelled: 'ملغي',
    addProduct: 'إضافة منتج',
    editProduct: 'تعديل',
    deleteProduct: 'حذف',
    confirmDelete: 'هل أنت متأكد من حذف هذا المنتج؟',
    category: 'القسم',
    price: 'السعر',
    name: 'الاسم',
    actions: 'الإجراءات',

    // Modal
    modalAddTitle: 'إضافة منتج جديد',
    modalEditTitle: 'تعديل المنتج',
    fieldNameAr: 'الاسم بالعربية',
    fieldNameEn: 'الاسم بالإنجليزية',
    fieldDescAr: 'الوصف بالعربية',
    fieldDescEn: 'الوصف بالإنجليزية',
    fieldPrice: 'السعر (ج.م)',
    fieldCategory: 'القسم',
    fieldWeight: 'الوزن / الحجم',
    saveBtn: 'حفظ',
    cancelBtn: 'إلغاء',

    // Footer
    footerAbout: 'علامة تجارية رائدة في مصر لبيع اللحوم والدواجن الفاخرة المجمدة.',
    footerSections: 'أقسام المتجر',
    footerContact: 'تواصل معنا',
    footerAddress: 'التجمع الخامس، القاهرة، مصر',
    footerPhone: 'خط ساخن: 19000',
    footerEmail: 'info@deliciousmeats.me',
    footerCopy: 'جميع الحقوق محفوظة',
  },

  en: {
    brandName: 'Delicious Meats',
    brandTagline: 'Premium Frozen Meat & Poultry',

    navHome: 'Home',
    navMeats: 'Meats',
    navPoultry: 'Poultry',
    navOther: 'Other',
    navCart: 'Cart',
    navStaff: 'Staff Portal',
    langToggle: 'العربية',

    heroTitle: 'Taste Premium Quality in Every Cut',
    heroSubtitle: 'The finest select cuts of fresh-frozen meats and poultry — quality you can trust, delivered to your doorstep.',
    heroCTA: 'Shop Now',

    frozenBadge: '❄ Premium Frozen',
    bestsellerBadge: '★ Best Seller',

    bestSellersTitle: 'Best Sellers',
    bestSellersSubtitle: 'Hand-picked favourites highly rated by our customers',
    categoriesTitle: 'Browse Categories',
    categoriesSubtitle: 'Choose from our premium selection of meat, poultry, and grilling essentials',
    viewCategory: 'View Category',
    categoryMeatsTitle: 'Meats',
    categoryMeatsDesc: 'Premium beef and lamb cuts, expertly prepared.',
    categoryPoultryTitle: 'Poultry',
    categoryPoultryDesc: 'Fresh-frozen whole chickens and clean pieces.',
    categoryOtherTitle: 'Other',
    categoryOtherDesc: 'Seasonings, charcoal, skewers & BBQ essentials.',

    feat1Title: 'Fast Frozen Delivery',
    feat1Desc: 'Temperature-controlled vehicles keep your order frozen',
    feat2Title: '100% Quality Guaranteed',
    feat2Desc: 'Highest food safety and sanitation standards',
    feat3Title: 'Cash on Delivery',
    feat3Desc: 'Pay only when your order arrives safely',
    feat4Title: 'Premium Cuts',
    feat4Desc: 'Professional butchers and top-quality standards',

    addToCart: 'Add to Cart',
    addedToCart: 'Added ✓',
    egp: 'EGP',
    viewAll: 'View All',

    catPageTitle: 'Category Products',
    sortLabel: 'Sort:',
    sortDefault: 'Default',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    noProducts: 'No products found in this category.',
    loadMore: 'Load More',
    showing: 'Showing',
    of: 'of',
    products: 'products',

    cartTitle: 'Shopping Cart',
    cartEmpty: 'Your cart is empty!',
    cartEmptyDesc: "You haven't added any products yet. Browse our premium selection now.",
    browseProducts: 'Browse Products',
    product: 'Product',
    unitPrice: 'Unit Price',
    qty: 'Qty',
    lineTotal: 'Total',
    remove: 'Remove',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    delivery: 'Delivery Fee',
    deliveryFree: 'Free',
    grandTotal: 'Grand Total',
    cashOnly: 'Cash on Delivery Only',
    freeShipHint: 'Add {amount} EGP more for FREE shipping!',
    checkoutBtn: 'Order Now',
    backToShop: 'Back to Shop',
    continueShopping: 'Continue Shopping',

    checkoutTitle: 'Checkout',
    checkoutSubtitle: 'Shipping & Delivery Details',
    fieldName: 'Customer Name',
    fieldNamePH: 'Enter your full name',
    fieldPhone: 'Phone Number',
    fieldPhonePH: 'e.g. 01012345678',
    fieldGov: 'Governorate',
    fieldGovPH: 'Select Governorate',
    fieldArea: 'Area / District',
    fieldAreaPH: 'e.g. Maadi, Heliopolis...',
    fieldAddress: 'Detailed Address',
    fieldAddressPH: 'Street, building, floor, apartment...',
    orderReview: 'Review Your Order',
    placeOrder: 'Place Order',
    placing: 'Placing your order...',
    required: 'This field is required',
    invalidPhone: 'Please enter a valid Egyptian number (01X, 11 digits)',
    emptyCart: 'Your cart is empty! Add some products first.',

    successTitle: 'Order Placed Successfully! 🎉',
    successDesc: 'Thank you for shopping at Delicious Meats. A representative will contact you to confirm your delivery.',
    orderRef: 'Order Reference',
    payMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery',
    keepShopping: 'Continue Shopping',

    staffLoginTitle: 'Staff Portal',
    staffLoginSubtitle: 'Log in to manage orders and products',
    username: 'Username',
    password: 'Password',
    loginBtn: 'Log In',
    loginError: 'Invalid username or password',
    demoCredentials: 'Demo: admin / admin123',

    dashboardTitle: 'Staff Dashboard',
    tabOrders: 'Orders',
    tabProducts: 'Products',
    logoutBtn: 'Log Out',
    previewStore: 'Preview Store',
    ordersTitle: 'Incoming Orders',
    productsTitle: 'Manage Products',
    orderId: 'Order #',
    customer: 'Customer',
    phone: 'Phone',
    address: 'Address',
    status: 'Status',
    total: 'Total',
    updateStatus: 'Update Status',
    statusNew: 'New',
    statusPreparing: 'Preparing',
    statusDelivering: 'Out for Delivery',
    statusDelivered: 'Delivered',
    statusCancelled: 'Cancelled',
    addProduct: 'Add Product',
    editProduct: 'Edit',
    deleteProduct: 'Delete',
    confirmDelete: 'Are you sure you want to delete this product?',
    category: 'Category',
    price: 'Price',
    name: 'Name',
    actions: 'Actions',

    modalAddTitle: 'Add New Product',
    modalEditTitle: 'Edit Product',
    fieldNameAr: 'Name (Arabic)',
    fieldNameEn: 'Name (English)',
    fieldDescAr: 'Description (Arabic)',
    fieldDescEn: 'Description (English)',
    fieldPrice: 'Price (EGP)',
    fieldCategory: 'Category',
    fieldWeight: 'Weight / Size',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',

    footerAbout: 'Egypt\'s leading brand for premium frozen meat and poultry — quality you can trust.',
    footerSections: 'Store Sections',
    footerContact: 'Contact Us',
    footerAddress: 'Fifth Settlement, Cairo, Egypt',
    footerPhone: 'Hotline: 19000',
    footerEmail: 'info@deliciousmeats.me',
    footerCopy: 'All rights reserved',
  }
};

// Egyptian Governorates list
const GOVERNORATES = {
  ar: ['القاهرة','الجيزة','الإسكندرية','القليوبية','الدقهلية','الشرقية','المنوفية','الغربية','البحيرة','كفر الشيخ','دمياط','بورسعيد','الإسماعيلية','السويس','الفيوم','بني سويف','المنيا','أسيوط','سوهاج','قنا','الأقصر','أسوان','البحر الأحمر','الوادي الجديد','مطروح','شمال سيناء','جنوب سيناء'],
  en: ['Cairo','Giza','Alexandria','Qalyubia','Dakahlia','Sharkia','Monufia','Gharbia','Beheira','Kafr El Sheikh','Damietta','Port Said','Ismailia','Suez','Fayoum','Beni Suef','Minya','Assiut','Sohag','Qena','Luxor','Aswan','Red Sea','New Valley','Matrouh','North Sinai','South Sinai']
};

// ──────────────────────────────────────────────
// i18n engine — tiny, framework-free
// ──────────────────────────────────────────────
const i18n = (() => {
  let currentLang = localStorage.getItem('lang') || 'ar';

  function getLang() { return currentLang; }

  function t(key, vars = {}) {
    let text = (TRANSLATIONS[currentLang] || TRANSLATIONS['ar'])[key] || key;
    Object.entries(vars).forEach(([k, v]) => { text = text.replace(`{${k}}`, v); });
    return text;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyLang();
  }

  function toggleLang() {
    setLang(currentLang === 'ar' ? 'en' : 'ar');
  }

  function applyLang() {
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir  = currentLang === 'ar' ? 'rtl' : 'ltr';
    html.dataset.lang = currentLang;

    // Swap every element that has a data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t(key);
      } else {
        el.textContent = t(key);
      }
    });
    // data-i18n-html for elements with HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    // Emit a custom event so page-specific JS can react
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  // Init on first load
  function init() {
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir  = currentLang === 'ar' ? 'rtl' : 'ltr';
    html.dataset.lang = currentLang;
    // Static elements translated after DOM ready
    document.addEventListener('DOMContentLoaded', applyLang);
  }

  init();

  return { getLang, t, setLang, toggleLang, applyLang };
})();
