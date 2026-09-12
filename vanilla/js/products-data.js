/**
 * products-data.js
 * Mock product catalogue — Meats, Poultry, Other
 * Each product: id, name_ar, name_en, desc_ar, desc_en,
 *               price (EGP), category, image, is_bestseller, weight
 */

const PRODUCTS = [
  // ──────────────── MEATS (لحوم) ────────────────
  {
    id: 'm1', category: 'meats',
    name_ar: 'لحم موزة بقري فاخر',
    name_en: 'Premium Beef Shank (Moza)',
    desc_ar: 'لحم موزة بقري غني بالجيلاتين، مثالي للطواجن والطهي البطيء.',
    desc_en: 'Rich gelatinous beef shank — perfect for tagines and slow cooking.',
    price: 420, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm2', category: 'meats',
    name_ar: 'عرق روستو بقري',
    name_en: 'Beef Ribeye Roast (Ribesto)',
    desc_ar: 'عرق روستو كامل مناسب للتحمير في الفرن وإعداد اللحم البارد.',
    desc_en: 'Whole ribeye roast, ideal for oven roasting and cold cuts.',
    price: 490, weight: '1.5 kg', image: 'images/meat.svg', is_bestseller: true
  },
  {
    id: 'm3', category: 'meats',
    name_ar: 'عرق فيلتو (تندرلوين)',
    name_en: 'Beef Tenderloin Filet',
    desc_ar: 'أنعم قطعة في العجل، مثالية للشواء والستيك الفاخر.',
    desc_en: 'The most tender beef cut — ideal for premium steaks and grilling.',
    price: 550, weight: '1 kg', image: 'images/meat.svg', is_bestseller: true
  },
  {
    id: 'm4', category: 'meats',
    name_ar: 'كتف ضاني بلدي',
    name_en: 'Local Lamb Shoulder',
    desc_ar: 'كتف ضاني بالعظم ذو نكهة غنية، مثالي للشواء بالفرن مع الأرز.',
    desc_en: 'Bone-in lamb shoulder — rich flavour, perfect for oven roasting.',
    price: 460, weight: '1.2 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm5', category: 'meats',
    name_ar: 'ريش ضاني فاخرة',
    name_en: 'Premium Lamb Chops (Riyash)',
    desc_ar: 'قطع ريش ضاني طرية جاهزة للشواء على الفحم أو الجريل.',
    desc_en: 'Tender lamb chops — ready for charcoal or griddle grilling.',
    price: 480, weight: '1 kg', image: 'images/meat.svg', is_bestseller: true
  },
  {
    id: 'm6', category: 'meats',
    name_ar: 'كبدة بقري مجمدة',
    name_en: 'Frozen Beef Liver',
    desc_ar: 'كبدة بقري شرائح غنية بالحديد، جاهزة للطهي السريع.',
    desc_en: 'Sliced beef liver, rich in iron — great for quick pan-frying.',
    price: 380, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm7', category: 'meats',
    name_ar: 'ستيك ريب آي بقري',
    name_en: 'Beef Ribeye Steak',
    desc_ar: 'شريحة ريب آي معرقة بالدهون لمذاق عصيري لا يقاوم.',
    desc_en: 'Marbled ribeye steak — juicy, rich grilling flavour.',
    price: 520, weight: '800g', image: 'images/meat.svg', is_bestseller: true
  },
  {
    id: 'm8', category: 'meats',
    name_ar: 'فخدة ضاني كاملة',
    name_en: 'Whole Lamb Leg (Fakhda)',
    desc_ar: 'فخدة ضاني ممتازة للعزومات، تُشوى ببطء في الفرن.',
    desc_en: 'Premium whole leg of lamb — slow-roasted for feasts and gatherings.',
    price: 980, weight: '2 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm9', category: 'meats',
    name_ar: 'كندوز ستيك متبل',
    name_en: 'Marinated Veal Steak',
    desc_ar: 'شرائح كندوز طرية متبلة بخلطتنا الخاصة، جاهزة للطهي.',
    desc_en: 'Tender veal slices marinated in our special blend — cook immediately.',
    price: 450, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm10', category: 'meats',
    name_ar: 'سجق ضاني بلدي',
    name_en: 'Local Lamb Sausage',
    desc_ar: 'سجق ضاني محشو بالبهارات الشرقية، بدون مواد حافظة.',
    desc_en: 'Traditional lamb sausage with oriental spices — preservative-free.',
    price: 360, weight: '1 kg', image: 'images/meat.svg', is_bestseller: true
  },
  {
    id: 'm11', category: 'meats',
    name_ar: 'كباب حلة قطع',
    name_en: 'Beef Kebab Halla Cubes',
    desc_ar: 'قطع لحم بقري صغيرة طرية مثالية لطبق كباب الحلة المصري.',
    desc_en: 'Small tender beef cubes — ideal for traditional Egyptian Kebab Halla.',
    price: 410, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm12', category: 'meats',
    name_ar: 'لحم بقري مفروم فاخر',
    name_en: 'Premium Minced Beef',
    desc_ar: 'لحم بقري مفروم بنسبة دهون متوازنة (٨٠/٢٠) للرقاق والكفتة.',
    desc_en: 'Balanced fat-ratio (80/20) minced beef — great for pasta bakes and kofta.',
    price: 350, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm13', category: 'meats',
    name_ar: 'بيف برجر كلاسيك',
    name_en: 'Classic Beef Burger Patties',
    desc_ar: 'أقراص برجر بقري سميكة من قطعيات فاخرة بدون فول صويا.',
    desc_en: 'Thick beef burger patties from premium cuts — no soy additives.',
    price: 390, weight: '8 patties / 800g', image: 'images/meat.svg', is_bestseller: true
  },
  {
    id: 'm14', category: 'meats',
    name_ar: 'لحم اسكالوب (بفتيك)',
    name_en: 'Beef Escalope (Boftek)',
    desc_ar: 'شرائح لحم رفيعة ومطرقة، مثالية للبفتيك المقلي المقرمش.',
    desc_en: 'Thinly sliced tenderised beef — perfect for crispy fried escalope.',
    price: 470, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm15', category: 'meats',
    name_ar: 'لحم انتركوت بقري',
    name_en: 'Beef Entrecote Steak',
    desc_ar: 'انتركوت فرنسي مميز مقطع بسُمك مثالي للطهي على المقلاة بالزبدة.',
    desc_en: 'French cut entrecote steak — perfect for pan-searing with butter and garlic.',
    price: 510, weight: '900g', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm16', category: 'meats',
    name_ar: 'كفتة حاتي جاهزة للشواء',
    name_en: 'Ready-to-Grill Kofta',
    desc_ar: 'كفتة بقري متبلة بالبصل والبهارات، جاهزة للسيخ والشواء.',
    desc_en: 'Seasoned beef kofta shaped and ready to skewer and grill.',
    price: 340, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm17', category: 'meats',
    name_ar: 'ضاني كامل مجمد',
    name_en: 'Whole Frozen Lamb',
    desc_ar: 'خروف بلدي كامل منظف ومجمد للمناسبات والعزومات الكبرى.',
    desc_en: 'Whole local lamb, cleaned and frozen — ideal for large gatherings.',
    price: 2800, weight: '8–10 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm18', category: 'meats',
    name_ar: 'لحم بقري بالعظم للسلق',
    name_en: 'Bone-in Beef for Broth',
    desc_ar: 'قطع بقري بالعظم تعطي مرقة غنية لطبق المحاشي والأرز.',
    desc_en: 'Bone-in beef cuts that produce a rich broth for stuffed dishes.',
    price: 280, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm19', category: 'meats',
    name_ar: 'ستيك واغيو أسترالي',
    name_en: 'Australian Wagyu Steak',
    desc_ar: 'واغيو أسترالي درجة فخامة عالية، معرق بشكل رائع للذواقة.',
    desc_en: 'Premium-grade Australian Wagyu — beautifully marbled for connoisseurs.',
    price: 950, weight: '500g', image: 'images/meat.svg', is_bestseller: false
  },
  {
    id: 'm20', category: 'meats',
    name_ar: 'ضلع بقري جاهز للشواء',
    name_en: 'BBQ Beef Ribs',
    desc_ar: 'ضلع بقري بالعظم متبل ومجهز للشواء والطهي البطيء في الفرن.',
    desc_en: 'Marinated bone-in beef ribs — ready for BBQ or slow-oven cooking.',
    price: 580, weight: '1.5 kg', image: 'images/meat.svg', is_bestseller: false
  },

  // ──────────────── POULTRY (دواجن) ────────────────
  {
    id: 'p1', category: 'poultry',
    name_ar: 'دجاجة كاملة منظفة',
    name_en: 'Whole Cleaned Chicken',
    desc_ar: 'دجاجة كاملة مغسولة ومجمدة سريعاً للحفاظ على قيمتها الغذائية.',
    desc_en: 'Whole chicken, thoroughly cleaned and quick-frozen to retain nutrients.',
    price: 185, weight: '1.2 kg', image: 'images/poultry.svg', is_bestseller: true
  },
  {
    id: 'p2', category: 'poultry',
    name_ar: 'صدور دجاج مخلية',
    name_en: 'Boneless Chicken Breasts',
    desc_ar: 'صدور دجاج خالية من العظم والجلد، مقطعة شرائح متساوية.',
    desc_en: 'Skinless boneless chicken breast slices, ready for breading or grilling.',
    price: 240, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: true
  },
  {
    id: 'p3', category: 'poultry',
    name_ar: 'أفخاذ دجاج طازجة',
    name_en: 'Chicken Thighs',
    desc_ar: 'أوراك دجاج نظيفة مثالية للشواء بالفرن أو طبخ الطاجن.',
    desc_en: 'Clean chicken thighs — ideal for oven roasting or tagine cooking.',
    price: 160, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p4', category: 'poultry',
    name_ar: 'أجنحة دجاج جامبو',
    name_en: 'Jumbo Chicken Wings',
    desc_ar: 'أجنحة دجاج كاملة لوصفات البافالو والوينجز بالفرن.',
    desc_en: 'Whole chicken wings — excellent for crispy buffalo or oven wings.',
    price: 110, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p5', category: 'poultry',
    name_ar: 'كبدة وقوانص دجاج',
    name_en: 'Chicken Liver & Gizzards',
    desc_ar: 'كبد وقوانص دجاج مغسولة بعناية، مثالية للطواجن بالأرز.',
    desc_en: 'Thoroughly washed chicken livers and gizzards — great for rice tagines.',
    price: 130, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p6', category: 'poultry',
    name_ar: 'دجاج مفروم',
    name_en: 'Minced Chicken',
    desc_ar: 'صدور وأفخاذ دجاج مفرومة ناعم لكفتة الدجاج والبرجر الصحي.',
    desc_en: 'Finely minced chicken breast and thigh — great for healthy kofta and patties.',
    price: 210, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p7', category: 'poultry',
    name_ar: 'بط بلدي مجمد',
    name_en: 'Frozen Local Duck',
    desc_ar: 'بط بلدي ذو لحم غني بالنكهة، منظف ومجهز للعزومات.',
    desc_en: 'Well-fattened local duck with rich flavour — cleaned and ready to roast.',
    price: 320, weight: '2.2 kg', image: 'images/poultry.svg', is_bestseller: true
  },
  {
    id: 'p8', category: 'poultry',
    name_ar: 'ديك رومي كامل مجمد',
    name_en: 'Whole Frozen Turkey',
    desc_ar: 'ديك رومي كبير نظيف ومجهز، مثالي للمناسبات والأعياد.',
    desc_en: 'Large whole turkey, fully cleaned — perfect for holidays and feasts.',
    price: 850, weight: '5 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p9', category: 'poultry',
    name_ar: 'شيش طاووق متبل',
    name_en: 'Marinated Shish Tawook',
    desc_ar: 'مكعبات دجاج متبلة بالزبادي والليمون للشواء على الأسياخ.',
    desc_en: 'Chicken cubes marinated in yogurt and lemon — ready to skewer and grill.',
    price: 230, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: true
  },
  {
    id: 'p10', category: 'poultry',
    name_ar: 'دبابيس دجاج كرسبي',
    name_en: 'Crispy Chicken Drumsticks',
    desc_ar: 'دبابيس دجاج متبلة ببهارات كرسبي، جاهزة للتحمير السريع.',
    desc_en: 'Spiced chicken drumsticks marinated in crispy seasoning — ready to fry.',
    price: 175, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p11', category: 'poultry',
    name_ar: 'صدر دجاج حار متبل',
    name_en: 'Spicy Marinated Chicken Breast',
    desc_ar: 'صدور دجاج متبلة بالبهارات الحارة، جاهزة للشواء أو الشوايه.',
    desc_en: 'Chicken breasts marinated in hot spices — grill-ready for a fiery kick.',
    price: 260, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },
  {
    id: 'p12', category: 'poultry',
    name_ar: 'أجنحة دجاج حارة بالصلصة',
    name_en: 'Hot Sauce Chicken Wings',
    desc_ar: 'أجنحة دجاج مغمورة في صلصة حارة لذيذة جاهزة للأوفن.',
    desc_en: 'Chicken wings soaked in hot sauce — oven-ready for a perfect heat kick.',
    price: 140, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false
  },

  // ──────────────── OTHER (أخرى) ────────────────
  {
    id: 'o1', category: 'other',
    name_ar: 'فحم نباتي طبيعي للشواء',
    name_en: 'Natural Lump Charcoal',
    desc_ar: 'فحم شواء سريع الاشتعال يدوم طويلاً بدون دخان كثيف.',
    desc_en: 'Fast-igniting, long-lasting natural charcoal — low smoke and clean burn.',
    price: 75, weight: '3 kg', image: 'images/other.svg', is_bestseller: true
  },
  {
    id: 'o2', category: 'other',
    name_ar: 'خلطة بهارات ديليشس للحوم',
    name_en: 'Delicious Meat Spice Blend',
    desc_ar: 'تركيبة حصرية من سبع بهارات فاخرة لمنح لحومك طعماً رائعاً.',
    desc_en: 'Exclusive seven-spice gourmet blend — elevates every meat dish.',
    price: 45, weight: '150g', image: 'images/other.svg', is_bestseller: false
  },
  {
    id: 'o3', category: 'other',
    name_ar: 'أسياخ شواء ستانلس ستيل',
    name_en: 'Stainless Steel Skewers',
    desc_ar: 'طقم أسياخ معدنية (٦ قطع) قابلة لإعادة الاستخدام مقاومة للصدأ.',
    desc_en: 'Reusable stainless-steel skewer set (6 pcs) with wooden handles.',
    price: 120, weight: '6 skewers', image: 'images/other.svg', is_bestseller: false
  },
  {
    id: 'o4', category: 'other',
    name_ar: 'بهارات الدواجن والبرجر',
    name_en: 'Poultry & Burger Spice Mix',
    desc_ar: 'بهارات خاصة لتتبيل الدجاج والبرجر لطعم يشبه المطاعم.',
    desc_en: 'Special seasoning for chicken and burger — restaurant-quality taste at home.',
    price: 45, weight: '150g', image: 'images/other.svg', is_bestseller: false
  },
  {
    id: 'o5', category: 'other',
    name_ar: 'شبكة شواء مزدوجة',
    name_en: 'Double Wire Grilling Basket',
    desc_ar: 'شبكة شواء سلكية مزدوجة بمقبض خشبي طويل، مثالية للكفتة والسمك.',
    desc_en: 'Double-sided wire grilling basket with long handle — perfect for kofta and fish.',
    price: 195, weight: '1 piece', image: 'images/other.svg', is_bestseller: false
  },

  // ── 20 New Hidden Meats ──
  { id: 'm_new_1', category: 'meats', name_ar: 'منتج لحوم جديد 1', name_en: 'New Meat Cut 1', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_2', category: 'meats', name_ar: 'منتج لحوم جديد 2', name_en: 'New Meat Cut 2', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_3', category: 'meats', name_ar: 'منتج لحوم جديد 3', name_en: 'New Meat Cut 3', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_4', category: 'meats', name_ar: 'منتج لحوم جديد 4', name_en: 'New Meat Cut 4', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_5', category: 'meats', name_ar: 'منتج لحوم جديد 5', name_en: 'New Meat Cut 5', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_6', category: 'meats', name_ar: 'منتج لحوم جديد 6', name_en: 'New Meat Cut 6', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_7', category: 'meats', name_ar: 'منتج لحوم جديد 7', name_en: 'New Meat Cut 7', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_8', category: 'meats', name_ar: 'منتج لحوم جديد 8', name_en: 'New Meat Cut 8', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_9', category: 'meats', name_ar: 'منتج لحوم جديد 9', name_en: 'New Meat Cut 9', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_10', category: 'meats', name_ar: 'منتج لحوم جديد 10', name_en: 'New Meat Cut 10', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_11', category: 'meats', name_ar: 'منتج لحوم جديد 11', name_en: 'New Meat Cut 11', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_12', category: 'meats', name_ar: 'منتج لحوم جديد 12', name_en: 'New Meat Cut 12', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_13', category: 'meats', name_ar: 'منتج لحوم جديد 13', name_en: 'New Meat Cut 13', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_14', category: 'meats', name_ar: 'منتج لحوم جديد 14', name_en: 'New Meat Cut 14', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_15', category: 'meats', name_ar: 'منتج لحوم جديد 15', name_en: 'New Meat Cut 15', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_16', category: 'meats', name_ar: 'منتج لحوم جديد 16', name_en: 'New Meat Cut 16', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_17', category: 'meats', name_ar: 'منتج لحوم جديد 17', name_en: 'New Meat Cut 17', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_18', category: 'meats', name_ar: 'منتج لحوم جديد 18', name_en: 'New Meat Cut 18', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_19', category: 'meats', name_ar: 'منتج لحوم جديد 19', name_en: 'New Meat Cut 19', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },
  { id: 'm_new_20', category: 'meats', name_ar: 'منتج لحوم جديد 20', name_en: 'New Meat Cut 20', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/meat.svg', is_bestseller: false, is_available: false },

  // ── 20 New Hidden Poultry ──
  { id: 'p_new_1', category: 'poultry', name_ar: 'منتج دواجن جديد 1', name_en: 'New Poultry Item 1', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_2', category: 'poultry', name_ar: 'منتج دواجن جديد 2', name_en: 'New Poultry Item 2', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_3', category: 'poultry', name_ar: 'منتج دواجن جديد 3', name_en: 'New Poultry Item 3', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_4', category: 'poultry', name_ar: 'منتج دواجن جديد 4', name_en: 'New Poultry Item 4', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_5', category: 'poultry', name_ar: 'منتج دواجن جديد 5', name_en: 'New Poultry Item 5', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_6', category: 'poultry', name_ar: 'منتج دواجن جديد 6', name_en: 'New Poultry Item 6', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_7', category: 'poultry', name_ar: 'منتج دواجن جديد 7', name_en: 'New Poultry Item 7', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_8', category: 'poultry', name_ar: 'منتج دواجن جديد 8', name_en: 'New Poultry Item 8', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_9', category: 'poultry', name_ar: 'منتج دواجن جديد 9', name_en: 'New Poultry Item 9', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_10', category: 'poultry', name_ar: 'منتج دواجن جديد 10', name_en: 'New Poultry Item 10', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_11', category: 'poultry', name_ar: 'منتج دواجن جديد 11', name_en: 'New Poultry Item 11', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_12', category: 'poultry', name_ar: 'منتج دواجن جديد 12', name_en: 'New Poultry Item 12', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_13', category: 'poultry', name_ar: 'منتج دواجن جديد 13', name_en: 'New Poultry Item 13', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_14', category: 'poultry', name_ar: 'منتج دواجن جديد 14', name_en: 'New Poultry Item 14', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_15', category: 'poultry', name_ar: 'منتج دواجن جديد 15', name_en: 'New Poultry Item 15', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_16', category: 'poultry', name_ar: 'منتج دواجن جديد 16', name_en: 'New Poultry Item 16', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_17', category: 'poultry', name_ar: 'منتج دواجن جديد 17', name_en: 'New Poultry Item 17', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_18', category: 'poultry', name_ar: 'منتج دواجن جديد 18', name_en: 'New Poultry Item 18', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_19', category: 'poultry', name_ar: 'منتج دواجن جديد 19', name_en: 'New Poultry Item 19', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },
  { id: 'p_new_20', category: 'poultry', name_ar: 'منتج دواجن جديد 20', name_en: 'New Poultry Item 20', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/poultry.svg', is_bestseller: false, is_available: false },

  // ── 20 New Hidden Other ──
  { id: 'o_new_1', category: 'other', name_ar: 'منتج جديد آخر 1', name_en: 'New Other Item 1', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_2', category: 'other', name_ar: 'منتج جديد آخر 2', name_en: 'New Other Item 2', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_3', category: 'other', name_ar: 'منتج جديد آخر 3', name_en: 'New Other Item 3', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_4', category: 'other', name_ar: 'منتج جديد آخر 4', name_en: 'New Other Item 4', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_5', category: 'other', name_ar: 'منتج جديد آخر 5', name_en: 'New Other Item 5', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_6', category: 'other', name_ar: 'منتج جديد آخر 6', name_en: 'New Other Item 6', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_7', category: 'other', name_ar: 'منتج جديد آخر 7', name_en: 'New Other Item 7', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_8', category: 'other', name_ar: 'منتج جديد آخر 8', name_en: 'New Other Item 8', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_9', category: 'other', name_ar: 'منتج جديد آخر 9', name_en: 'New Other Item 9', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_10', category: 'other', name_ar: 'منتج جديد آخر 10', name_en: 'New Other Item 10', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_11', category: 'other', name_ar: 'منتج جديد آخر 11', name_en: 'New Other Item 11', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_12', category: 'other', name_ar: 'منتج جديد آخر 12', name_en: 'New Other Item 12', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_13', category: 'other', name_ar: 'منتج جديد آخر 13', name_en: 'New Other Item 13', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_14', category: 'other', name_ar: 'منتج جديد آخر 14', name_en: 'New Other Item 14', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_15', category: 'other', name_ar: 'منتج جديد آخر 15', name_en: 'New Other Item 15', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_16', category: 'other', name_ar: 'منتج جديد آخر 16', name_en: 'New Other Item 16', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_17', category: 'other', name_ar: 'منتج جديد آخر 17', name_en: 'New Other Item 17', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_18', category: 'other', name_ar: 'منتج جديد آخر 18', name_en: 'New Other Item 18', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_19', category: 'other', name_ar: 'منتج جديد آخر 19', name_en: 'New Other Item 19', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false },
  { id: 'o_new_20', category: 'other', name_ar: 'منتج جديد آخر 20', name_en: 'New Other Item 20', desc_ar: '', desc_en: '', price: 0, weight: '1 kg', image: 'images/other.svg', is_bestseller: false, is_available: false }
];

// Quick lookup by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

// Filter by category
function getProductsByCategory(cat) {
  return PRODUCTS.filter(p => p.category === cat);
}

// Get bestsellers
function getBestsellers() {
  return PRODUCTS.filter(p => p.is_bestseller);
}
