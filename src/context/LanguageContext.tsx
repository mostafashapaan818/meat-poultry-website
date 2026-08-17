"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ar" | "en";

interface TranslationDictionary {
  [key: string]: string;
}

const translations: Record<Language, TranslationDictionary> = {
  ar: {
    // General
    brandName: "ديليشس ميتس",
    brandSub: "لحوم ودواجن فاخرة طازجة",
    currency: "ج.م",
    frozenBadge: "طازجة فاخرة",
    backToShop: "العودة للتسوق",
    loading: "جاري التحميل...",
    
    // Header
    home: "الرئيسية",
    meats: "لحوم",
    poultry: "دواجن",
    other: "أخرى",
    trackOrder: "تتبع الطلب",
    dashboard: "لوحة التحكم",
    adminLink: "بوابة الموظفين",
    cart: "السلة",
    
    // Homepage
    heroTitle: "مذاق الفخامة في كل قطعية",
    heroSubtitle: "نقدم لكم أجود أنواع اللحوم والدواجن الطازجة بعناية فائقة وتوصيل سريع حتى باب منزلكم. جودة تثق بها لعائلتك.",
    heroCTA: "تسوق منتجاتنا الفاخرة",
    bestSellers: "الأكثر مبيعاً",
    bestSellersSub: "منتجات مختارة بعناية تحظى برضا عملائنا",
    categories: "أقسام المنتجات",
    categoriesSub: "تصفح تشكيلتنا المتنوعة من اللحوم والدواجن الفاخرة",
    categoryMeatsDesc: "قطعيات لحم بقري وضاني فاخرة ومقطعة حسب رغبتكم.",
    categoryPoultryDesc: "دواجن طازجة كاملة أو قطع نظيفة وجاهزة للطهي.",
    categoryOtherDesc: "توابل فاخرة، أسياخ فحم، ومستلزمات الشواء لإتمام وجبتكم.",
    viewCategory: "عرض القسم",
    
    // Category Page
    sortBy: "ترتيب حسب",
    sortDefault: "الافتراضي",
    sortPriceLow: "السعر: من الأقل للأعلى",
    sortPriceHigh: "السعر: من الأعلى للأقل",
    filterTitle: "تصنيف المنتجات",
    showingProducts: "عرض {count} منتج",
    addToCart: "إضافة للسلة",
    addedToCart: "تمت الإضافة!",
    noProducts: "لا توجد منتجات في هذا القسم حالياً.",
    loadMore: "عرض المزيد من المنتجات",
    paginationPrev: "السابق",
    paginationNext: "التالي",
    
    // Cart Page
    cartTitle: "سلة التسوق الخاصة بك",
    cartEmpty: "سلة التسوق فارغة حالياً!",
    cartEmptyDesc: "يبدو أنك لم تقم بإضافة أي منتجات للسلة بعد. ابدأ بتصفح منتجاتنا الفاخرة الآن.",
    browseProducts: "تصفح المنتجات",
    product: "المنتج",
    price: "السعر",
    quantity: "الكمية",
    total: "الإجمالي",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    deliveryFee: "تكلفة التوصيل",
    deliveryFree: "مجاني",
    grandTotal: "الإجمالي الكلي",
    cashOnDeliveryOnly: "الدفع نقدًا عند الاستلام فقط",
    checkoutButton: "إتمام الطلب الآن",
    removeItem: "إزالة",
    
    // Checkout Page
    checkoutTitle: "إتمام الطلب وتفاصيل الشحن",
    customerInfo: "بيانات العميل",
    customerName: "اسم العميل",
    customerNamePlaceholder: "أدخل الاسم الثنائي أو الثلاثي",
    phoneNumber: "رقم الهاتف (الخلوي)",
    phoneNumberPlaceholder: "رقم الهاتف المصري (مثال: 01012345678)",
    governorate: "المحافظة",
    selectGovernorate: "اختر المحافظة",
    area: "المنطقة / الحي",
    areaPlaceholder: "مثال: المعادي، مصر الجديدة، التجمع الخامس...",
    detailedAddress: "العنوان بالتفصيل",
    detailedAddressPlaceholder: "رقم الشارع، رقم العمارة، الطابق، رقم الشقة أو أي علامة مميزة...",
    requiredField: "هذا الحقل مطلوب",
    invalidPhone: "يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقم (مثال: 010، 011، 012، 015)",
    orderReview: "مراجعة طلبك",
    submitOrder: "تأكيد وإرسال الطلب",
    submitting: "جاري إرسال طلبك...",
    
    // Checkout Success
    successTitle: "تم استلام طلبك بنجاح!",
    successSubtitle: "شكراً لتسوقك من ديليشس ميتس. سيقوم أحد ممثلينا بالتواصل معك قريباً لتأكيد الطلب وموعد التوصيل.",
    orderRef: "رقم مرجع الطلب",
    paymentMethod: "طريقة الدفع",
    paymentMethodVal: "نقداً عند الاستلام",
    continueShopping: "الاستمرار في التسوق",
    
    // Admin / Staff Login
    adminLoginTitle: "بوابة الموظفين والشركاء",
    adminLoginSub: "تسجيل الدخول لإدارة الطلبات والمنتجات",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    loginButton: "تسجيل الدخول",
    loginError: "اسم المستخدم أو كلمة المرور غير صحيحة",
    logoutButton: "تسجيل الخروج",
    
    // Admin / Staff Dashboard
    dashboardTitle: "لوحة تحكم الإدارة والطلبات",
    ordersTab: "الطلبات الواردة",
    productsTab: "إدارة المنتجات",
    totalOrders: "إجمالي الطلبات",
    pendingOrders: "طلبات قيد التجهيز",
    deliveredOrders: "الطلبات المسلمة",
    orderId: "طلب رقم",
    customer: "العميل",
    phone: "الهاتف",
    address: "العنوان",
    status: "حالة الطلب",
    actions: "الإجراءات",
    updateStatus: "تحديث الحالة",
    statusNew: "جديد",
    statusPreparing: "قيد التجهيز",
    statusOutForDelivery: "في الطريق للتوصيل",
    statusDelivered: "تم التسليم",
    statusCancelled: "ملغي",
    
    // Admin Products Management
    addProduct: "إضافة منتج جديد",
    editProduct: "تعديل المنتج",
    deleteProduct: "حذف المنتج",
    productNameAr: "اسم المنتج باللغة العربية",
    productNameEn: "اسم المنتج باللغة الإنجليزية",
    productDescAr: "الوصف باللغة العربية",
    productDescEn: "الوصف باللغة الإنجليزية",
    productPrice: "السعر (ج.م)",
    productCategory: "القسم",
    imagePlaceholder: "رابط الصورة أو الاسم البديل",
    save: "حفظ",
    cancel: "إلغاء",
    confirmDelete: "هل أنت متأكد من رغبتك في حذف هذا المنتج؟",
    productAddedSuccess: "تم إضافة المنتج بنجاح!",
    productUpdatedSuccess: "تم تحديث المنتج بنجاح!",
    productDeletedSuccess: "تم حذف المنتج بنجاح!",
  },
  en: {
    // General
    brandName: "Delicious Meats",
    brandSub: "Premium Fresh Meat & Poultry",
    currency: "EGP",
    frozenBadge: "Premium Fresh",
    backToShop: "Back to Shop",
    loading: "Loading...",
    
    // Header
    home: "Home",
    meats: "Meats",
    poultry: "Poultry",
    other: "Other",
    trackOrder: "Track Order",
    dashboard: "Dashboard",
    adminLink: "Staff Portal",
    cart: "Cart",
    
    // Homepage
    heroTitle: "Taste Premium Quality in Every Cut",
    heroSubtitle: "We deliver the finest select cuts of fresh meats and poultry, carefully processed and delivered directly to your doorstep. Quality you can trust.",
    heroCTA: "Shop Premium Cuts",
    bestSellers: "Best Sellers",
    bestSellersSub: "Hand-picked favorites highly rated by our customers",
    categories: "Categories",
    categoriesSub: "Browse our premium selection of meat, poultry, and grilling essentials",
    categoryMeatsDesc: "Premium cuts of beef and lamb, expertly sliced to your requirements.",
    categoryPoultryDesc: "Fresh whole chicken, clean cuts, and pieces ready to cook.",
    categoryOtherDesc: "Exquisite seasonings, natural charcoal, and skewers to complete your BBQ.",
    viewCategory: "View Category",
    
    // Category Page
    sortBy: "Sort By",
    sortDefault: "Default",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    filterTitle: "Product Filters",
    showingProducts: "Showing {count} products",
    addToCart: "Add to Cart",
    addedToCart: "Added!",
    noProducts: "No products found in this category.",
    loadMore: "Load More Products",
    paginationPrev: "Previous",
    paginationNext: "Next",
    
    // Cart Page
    cartTitle: "Your Shopping Cart",
    cartEmpty: "Your cart is currently empty!",
    cartEmptyDesc: "Looks like you haven't added any products to your cart yet. Start browsing our delicious cuts now.",
    browseProducts: "Browse Products",
    product: "Product",
    price: "Price",
    quantity: "Quantity",
    total: "Total",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    deliveryFree: "Free",
    grandTotal: "Grand Total",
    cashOnDeliveryOnly: "Cash on Delivery Only",
    checkoutButton: "Order Now",
    removeItem: "Remove",
    
    // Checkout Page
    checkoutTitle: "Checkout & Shipping Details",
    customerInfo: "Customer Information",
    customerName: "Customer Name",
    customerNamePlaceholder: "Enter your full name",
    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "Egyptian phone number (e.g. 01012345678)",
    governorate: "Governorate",
    selectGovernorate: "Select Governorate",
    area: "Area / District",
    areaPlaceholder: "e.g. Maadi, Heliopolis, New Cairo...",
    detailedAddress: "Detailed Address",
    detailedAddressPlaceholder: "Street name, building number, floor, apartment number, or landmarks...",
    requiredField: "This field is required",
    invalidPhone: "Please enter a valid 11-digit Egyptian phone number (starts with 010, 011, 012, or 015)",
    orderReview: "Review Your Order",
    submitOrder: "Place Order",
    submitting: "Placing your order...",
    
    // Checkout Success
    successTitle: "Order Placed Successfully!",
    successSubtitle: "Thank you for shopping at Delicious Meats. One of our representatives will contact you shortly to confirm your order and delivery details.",
    orderRef: "Order Reference ID",
    paymentMethod: "Payment Method",
    paymentMethodVal: "Cash on Delivery",
    continueShopping: "Continue Shopping",
    
    // Admin / Staff Login
    adminLoginTitle: "Staff & Admin Portal",
    adminLoginSub: "Log in to manage orders and products",
    username: "Username",
    password: "Password",
    loginButton: "Log In",
    loginError: "Invalid username or password",
    logoutButton: "Log Out",
    
    // Admin / Staff Dashboard
    dashboardTitle: "Staff Operations Dashboard",
    ordersTab: "Incoming Orders",
    productsTab: "Manage Products",
    totalOrders: "Total Orders",
    pendingOrders: "Preparing",
    deliveredOrders: "Delivered",
    orderId: "Order #",
    customer: "Customer",
    phone: "Phone",
    address: "Address",
    status: "Order Status",
    actions: "Actions",
    updateStatus: "Update Status",
    statusNew: "New",
    statusPreparing: "Preparing",
    statusOutForDelivery: "Out for Delivery",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
    
    // Admin Products Management
    addProduct: "Add New Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete Product",
    productNameAr: "Product Name (Arabic)",
    productNameEn: "Product Name (English)",
    productDescAr: "Description (Arabic)",
    productDescEn: "Description (English)",
    productPrice: "Price (EGP)",
    productCategory: "Category",
    imagePlaceholder: "Image URL or Placeholder description",
    save: "Save Changes",
    cancel: "Cancel",
    confirmDelete: "Are you sure you want to delete this product?",
    productAddedSuccess: "Product added successfully!",
    productUpdatedSuccess: "Product updated successfully!",
    productDeletedSuccess: "Product deleted successfully!",
  },
};

interface LanguageContextProps {
  language: Language;
  dir: "rtl" | "ltr";
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Language;
    if (savedLang === "ar" || savedLang === "en") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const dir = language === "ar" ? "rtl" : "ltr";
  const fontClass = language === "ar" ? "font-cairo" : "font-inter";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    document.documentElement.className = fontClass;
  }, [language, dir, fontClass]);

  const t = (key: string, replacements?: Record<string, string>): string => {
    let text = translations[language][key] || translations["ar"][key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, t, fontClass }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
