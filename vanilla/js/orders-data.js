/**
 * orders-data.js
 * Mock order data for the staff dashboard
 */

const MOCK_ORDERS = [
  {
    id: 'DM-384910',
    customer_name: 'أحمد محمد عبد الله',
    phone: '01012345678',
    governorate: 'القاهرة',
    area: 'المعادي',
    address_details: 'شارع ٩، عمارة ٤ب، الدور الثالث، شقة ٦',
    items: [
      { product_id: 'm3', name_ar: 'عرق فيلتو (تندرلوين)', name_en: 'Beef Tenderloin Filet', quantity: 2, price: 550 },
      { product_id: 'p2', name_ar: 'صدور دجاج مخلية', name_en: 'Boneless Chicken Breasts', quantity: 1, price: 240 }
    ],
    total: 1390,
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'DM-294012',
    customer_name: 'Moustafa Shaaban',
    phone: '01287654321',
    governorate: 'الجيزة',
    area: 'المهندسين',
    address_details: '١٢ شارع جامعة الدول العربية، أمام مسجد مصطفى محمود',
    items: [
      { product_id: 'm5', name_ar: 'ريش ضاني فاخرة', name_en: 'Premium Lamb Chops', quantity: 1, price: 480 },
      { product_id: 'o1', name_ar: 'فحم نباتي طبيعي', name_en: 'Natural Lump Charcoal', quantity: 2, price: 75 }
    ],
    total: 680,
    status: 'preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 'DM-109482',
    customer_name: 'شريف فاروق',
    phone: '01123459876',
    governorate: 'الإسكندرية',
    area: 'سموحة',
    address_details: 'عمارات الضباط، عمارة ٦، شقة ١٢',
    items: [
      { product_id: 'p1', name_ar: 'دجاجة كاملة منظفة', name_en: 'Whole Cleaned Chicken', quantity: 3, price: 185 }
    ],
    total: 605,
    status: 'delivering',
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString()
  },
  {
    id: 'DM-500371',
    customer_name: 'Dina Hassan',
    phone: '01555123456',
    governorate: 'القاهرة',
    area: 'مدينة نصر',
    address_details: 'شارع عباس العقاد، برج بلو سكاي، شقة ٢٠١',
    items: [
      { product_id: 'm7', name_ar: 'ستيك ريب آي', name_en: 'Beef Ribeye Steak', quantity: 2, price: 520 },
      { product_id: 'm13', name_ar: 'بيف برجر كلاسيك', name_en: 'Classic Beef Burger', quantity: 1, price: 390 }
    ],
    total: 1480,
    status: 'delivered',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 'DM-618204',
    customer_name: 'محمود السيد',
    phone: '01011223344',
    governorate: 'الشرقية',
    area: 'العاشر من رمضان',
    address_details: 'الحي الأول، بلوك ٣، منزل رقم ٤٥',
    items: [
      { product_id: 'p9', name_ar: 'شيش طاووق متبل', name_en: 'Marinated Shish Tawook', quantity: 2, price: 230 },
      { product_id: 'o2', name_ar: 'خلطة بهارات للحوم', name_en: 'Meat Spice Blend', quantity: 1, price: 45 }
    ],
    total: 555,
    status: 'new',
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString()
  }
];
