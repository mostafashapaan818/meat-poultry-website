export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number;
  category: "meats" | "poultry" | "other";
  isBestSeller?: boolean;
  image: string;
  weight?: string;
}

export const mockProducts: Product[] = [
  // ---------------------------------------------------------
  // MEATS (اللحوم الفاخرة - القائمة الرسمية المعتمدة)
  // ---------------------------------------------------------
  {
    id: "m_moza",
    nameAr: "لحم موزة",
    nameEn: "Beef Shank (Moza)",
    descAr: "قطعية موزة بقري طازجة غنية بالجيلاتين والنكهة، مثالية للطواجن والطهي البطيء.",
    descEn: "Fresh gelatinous beef shank cut, rich in flavor, perfect for tagines and slow cooking.",
    price: 550,
    category: "meats",
    isBestSeller: true,
    image: "/images/beef_shank.png",
    weight: "1 كجم"
  },
  {
    id: "m_roasto",
    nameAr: "لحم عرق روستو",
    nameEn: "Beef Ribeye Roast (Roasto)",
    descAr: "عرق روستو كامل ملفوف بعناية، مناسب جداً للتحمير بالفرن وإعداد اللحم البارد.",
    descEn: "Whole tied ribeye roast, ideal for oven roasting and delicious cold cuts.",
    price: 900,
    category: "meats",
    isBestSeller: true,
    image: "/images/beef_roast.png",
    weight: "1.5 كجم"
  },
  {
    id: "m_fletto",
    nameAr: "لحم عرق فلتو",
    nameEn: "Beef Tenderloin (Fletto)",
    descAr: "أنعم وأطرى قطعة لحم بقري خالية تماماً من الدهون، مثالية للستيك الفاخر والشواء.",
    descEn: "The tenderest fat-free beef cut, perfect for premium steaks and gourmet grilling.",
    price: 1300,
    category: "meats",
    isBestSeller: true,
    image: "/images/beef_tenderloin.png",
    weight: "2 كجم"
  },
  {
    id: "m_kataf_dani",
    nameAr: "كتف ضاني",
    nameEn: "Local Lamb Shoulder",
    descAr: "كتف ضاني بلدي طازج بالعظم، نكهة غنية وملمس طري للشواء في الفرن مع الأرز.",
    descEn: "Fresh bone-in lamb shoulder, rich in flavor and tender, perfect for slow roasting.",
    price: 1750,
    category: "meats",
    image: "/images/lamb_shoulder.png",
    weight: "3 كجم"
  },
  {
    id: "m_fakhda_dani",
    nameAr: "فخدة ضاني",
    nameEn: "Lamb Leg (Fakhda)",
    descAr: "فخدة ضاني بلدي فاخرة بالعظم، اختيارك المثالي للعزومات والمناسبات الكبرى.",
    descEn: "Premium whole leg of local lamb, perfect for family feasts and roast banquets.",
    price: 1100,
    category: "meats",
    isBestSeller: true,
    image: "/images/lamb_shoulder.png",
    weight: "2 كجم"
  },
  {
    id: "m_riyash_dani",
    nameAr: "لحم ريش ضاني",
    nameEn: "Lamb Chops (Riyash)",
    descAr: "قطع ريش ضاني طازجة ومجهزة للشواء السريع على الفحم أو الجريل.",
    descEn: "Tender local lamb chops prepared for quick grilling on charcoal or griddle.",
    price: 675,
    category: "meats",
    isBestSeller: true,
    image: "/images/lamb_chops.png",
    weight: "1 كجم"
  },
  {
    id: "m_dani_kamel",
    nameAr: "ضاني كامل",
    nameEn: "Whole Lamb",
    descAr: "خروف ضاني بلدي كامل منظف ومجهز بالكامل للعزومات والمناسبات الفاخرة.",
    descEn: "Whole local lamb, fully cleaned and prepped for major events and celebrations.",
    price: 13000,
    category: "meats",
    image: "/images/lamb_shoulder.png",
    weight: "22 كجم"
  },
  {
    id: "m_ribeye",
    nameAr: "لحم ريب آي",
    nameEn: "Beef Ribeye Steak",
    descAr: "شرائح ستيك ريب آي معرقة بالدهون لمذاق عصيري وطعم شواء لا يقاوم.",
    descEn: "Well-marbled ribeye steak slices for a juicy bite and rich grilling taste.",
    price: 550,
    category: "meats",
    isBestSeller: true,
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_kebda_baqary",
    nameAr: "كبدة بقري",
    nameEn: "Fresh Beef Liver",
    descAr: "كبدة بقري طازجة مقطعة حسب الطلب، غنية بالحديد وجاهزة للطهي السريع.",
    descEn: "Freshly sliced beef liver, rich in nutrients and iron, perfect for quick cooking.",
    price: 550,
    category: "meats",
    image: "/images/beef_tenderloin.png",
    weight: "1 كجم"
  },
  {
    id: "m_kandooz_steak",
    nameAr: "كندوز ستيك متبل",
    nameEn: "Marinated Veal Steak (Kandooz)",
    descAr: "شرائح لحم كندوز طرية متبلة بخلطة ديليشس الخاصة الجاهزة للطهي الفوري.",
    descEn: "Tender veal steak slices marinated in our signature seasoning blend.",
    price: 550,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_sogoq_dani",
    nameAr: "سجق ضاني",
    nameEn: "Lamb Sausage (Sogoq)",
    descAr: "سجق ضاني بلدي محشو بالبهارات الشرقية المميزة وبدون مواد حافظة.",
    descEn: "Traditional lamb sausage crafted with oriental spices and natural casing.",
    price: 525,
    category: "meats",
    isBestSeller: true,
    image: "/images/lamb_chops.png",
    weight: "1 كجم"
  },
  {
    id: "m_kebab_halla",
    nameAr: "كباب حلة",
    nameEn: "Kebab Halla Beef Cubes",
    descAr: "قطع لحم بقري طرية حمراء قليلة الدهون مثالية لطبق كباب الحلة المصري.",
    descEn: "Tender lean beef cubes perfect for traditional Egyptian Kebab Halla stew.",
    price: 550,
    category: "meats",
    image: "/images/beef_shank.png",
    weight: "1 كجم"
  },
  {
    id: "m_beef_cubes",
    nameAr: "لحم بقري قطع",
    nameEn: "Beef Meat Cubes",
    descAr: "قطع لحم بقري طازجة ومقطعة بعناية مناسبة للطواجن والخضار والطهي اليومي.",
    descEn: "Fresh beef cubes expertly cut for stews, tagines, and daily cooking.",
    price: 500,
    category: "meats",
    image: "/images/beef_shank.png",
    weight: "1 كجم"
  },
  {
    id: "m_beef_cubes_super",
    nameAr: "لحم بقري سوبر قطع",
    nameEn: "Super Beef Cubes",
    descAr: "قطع لحم بقري سوبر ممتازة من أفضل قطعيات العجل طرية وحمراء خالية من الدهون.",
    descEn: "Super premium lean beef cuts from choice tender muscle groups.",
    price: 550,
    category: "meats",
    isBestSeller: true,
    image: "/images/beef_roast.png",
    weight: "1 كجم"
  },
  {
    id: "m_minced_beef",
    nameAr: "لحم مفروم",
    nameEn: "Minced Beef",
    descAr: "لحم بقري مفروم طازج بنسبة دهون متوازنة مناسب للرقاق والبشاميل والكفتة.",
    descEn: "Freshly minced beef with balanced fat ratio for pasta bakes and meatballs.",
    price: 450,
    category: "meats",
    image: "/images/beef_roast.png",
    weight: "1 كجم"
  },
  {
    id: "m_minced_beef_super",
    nameAr: "لحم مفروم سوبر",
    nameEn: "Super Minced Beef",
    descAr: "لحم مفروم سوبر أحمر خالي من الدهون ومحضر من قطعيات اللحم الصافي.",
    descEn: "Super lean extra-grade minced beef crafted from prime cuts.",
    price: 550,
    category: "meats",
    image: "/images/beef_roast.png",
    weight: "1 كجم"
  },
  {
    id: "m_sogoq_sharqi",
    nameAr: "سجق شرقي",
    nameEn: "Oriental Sausage (Sogoq)",
    descAr: "سجق شرقي متبل بالثوم والبهارات المصرية الجاهزة للتحمير أو الصينية.",
    descEn: "Egyptian oriental beef sausage seasoned with garlic and authentic spices.",
    price: 450,
    category: "meats",
    image: "/images/lamb_chops.png",
    weight: "1 كجم"
  },
  {
    id: "m_sogoq_sharqi_super",
    nameAr: "سجق شرقي سوبر",
    nameEn: "Super Oriental Sausage",
    descAr: "سجق شرقي سوبر فاخر بقطعيات لحم حمراء مفرومة ناعم وبدون إضافة دهون زائدة.",
    descEn: "Super extra-grade oriental sausage made from select lean meat.",
    price: 525,
    category: "meats",
    image: "/images/lamb_chops.png",
    weight: "1 كجم"
  },
  {
    id: "m_beef_burger",
    nameAr: "بيف برجر",
    nameEn: "Classic Beef Burger",
    descAr: "أقراص برجر بقري سميكة ومحضرة من لحم صافي بدون فول صويا.",
    descEn: "Thick, juicy beef burger patties crafted from pure meat with no soy.",
    price: 450,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_beef_burger_super",
    nameAr: "بيف برجر سوبر",
    nameEn: "Super Beef Burger",
    descAr: "أقراص برجر بقري سوبر فاخرة من قطعيات الستيك المعرقة بطعم الشواء الأصلي.",
    descEn: "Super gourmet steakhouse-grade burger patties for the ultimate BBQ bite.",
    price: 525,
    category: "meats",
    isBestSeller: true,
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_escalope",
    nameAr: "لحم اسكالوب",
    nameEn: "Beef Escalope (Boftek)",
    descAr: "شرائح لحم رفيعة ومطرقة جيداً، مثالية لإعداد البفتيك المقلي المقرمش.",
    descEn: "Thinly sliced, tenderized beef cutlets ready for crispy fried escalope.",
    price: 550,
    category: "meats",
    image: "/images/beef_tenderloin.png",
    weight: "1 كجم"
  },
  {
    id: "m_entrecote",
    nameAr: "لحم انتركوت",
    nameEn: "Beef Entrecote Steak",
    descAr: "شريحة انتركوت فرنسية مميزة مقطعة بسُمك مثالي للطهي بالزبدة والثوم.",
    descEn: "Prime French entrecote steak cut, sliced for pan-searing with butter.",
    price: 550,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_dawood_pasha",
    nameAr: "كفتة داوود باشا",
    nameEn: "Dawood Pasha Meatballs",
    descAr: "كرات كفتة متبلة ومصبعة على الطريقة المصرية الأصلية لطهيها مع الصلصة.",
    descEn: "Seasoned beef meatballs prepared in traditional style for tomato sauce stew.",
    price: 425,
    category: "meats",
    image: "/images/meats_banner.png",
    weight: "1 كجم"
  },
  {
    id: "m_kofta_haty",
    nameAr: "كفتة حاتي بقري",
    nameEn: "Beef Kofta El Haty",
    descAr: "كفتة بقري متبلة بالبصل والبهارات ومصبعة ومعدة لوضعها مباشرة على سيخ الشواء.",
    descEn: "Classic beef kofta seasoned and shaped, ready to grill directly on skewers.",
    price: 425,
    category: "meats",
    isBestSeller: true,
    image: "/images/meats_banner.png",
    weight: "1 كجم"
  },

  // ---------------------------------------------------------
  // POULTRY (الدواجن الطازجة)
  // ---------------------------------------------------------
  {
    id: "p1",
    nameAr: "دجاجة كاملة منظفة",
    nameEn: "Whole Cleaned Chicken",
    descAr: "دجاجة كاملة مغسولة ومعقمة جيداً محفوظة بعناية للحفاظ على قيمتها الغذائية.",
    descEn: "Whole chicken thoroughly cleaned and sanitized to preserve nutrients.",
    price: 185,
    category: "poultry",
    isBestSeller: true,
    image: "/images/whole_chicken.png",
    weight: "1.2 كجم"
  },
  {
    id: "p2",
    nameAr: "صدور دجاج مخلية (بانيه)",
    nameEn: "Boneless Chicken Breast (Pane)",
    descAr: "صدور دجاج مخلية من العظم والجلد تماماً، مقطعة شرائح متساوية وجاهزة للتبيل.",
    descEn: "Skinless boneless chicken breast slices, cut evenly for breading.",
    price: 240,
    category: "poultry",
    isBestSeller: true,
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p3",
    nameAr: "أوراك دجاج طازجة",
    nameEn: "Fresh Chicken Thighs (Awraq)",
    descAr: "أوراك دجاج نظيفة ومثالية لعمل الحمام الكداب أو الشواء بالفرن مع الخضار.",
    descEn: "Clean chicken thighs, ideal for stuffed chicken rollups or roasting.",
    price: 160,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p4",
    nameAr: "شيش طاووق متبل جاهز",
    nameEn: "Marinated Shish Tawook Cubes",
    descAr: "مكعبات أوراك دجاج طرية متبلة بالزبادي والليمون والبهارات للشواء على الأسياخ.",
    descEn: "Tender chicken thigh cubes marinated in yogurt and lemon for skewers.",
    price: 230,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p5",
    nameAr: "بط بلدي فاخر",
    nameEn: "Premium Local Duck",
    descAr: "بط بلدي مسمن جيداً ذو لحم غني بالنكهة، منظف ومجهز لعزومات البط بالبرتقال.",
    descEn: "Well-fattened local duck with rich flavorful meat, cleaned for roasting.",
    price: 320,
    category: "poultry",
    image: "/images/whole_chicken.png",
    weight: "2.2 كجم"
  },
  {
    id: "p6",
    nameAr: "ديك رومي كامل",
    nameEn: "Whole Turkey (Romy)",
    descAr: "ديك رومي كبير الحجم، نظيف ومجهز ومثالي للمناسبات الكبرى والأعياد.",
    descEn: "Large whole turkey, fully cleaned and prepped for holidays and feasts.",
    price: 850,
    category: "poultry",
    image: "/images/recipe_saturday.png",
    weight: "5 كجم"
  },

  // ---------------------------------------------------------
  // OTHER (مستلزمات الشواء والبهارات)
  // ---------------------------------------------------------
  {
    id: "o1",
    nameAr: "فحم نباتي طبيعي للشواء",
    nameEn: "Natural Charcoal for Grilling",
    descAr: "فحم شواء طبيعي سريع الاشتعال ويدوم طويلاً بدون دخان كثيف أو روائح غريبة.",
    descEn: "Fast-igniting, long-lasting natural lump charcoal with low smoke.",
    price: 75,
    category: "other",
    isBestSeller: true,
    image: "/images/other_banner.png",
    weight: "3 كجم"
  },
  {
    id: "o2",
    nameAr: "خلطة بهارات ديليشس للحوم",
    nameEn: "Delicious Meat Seasoning Blend",
    descAr: "تركيبة حصرية من سبع بهارات فاخرة تمنح اللحوم المشوية والمطهية نكهة مميزة.",
    descEn: "Exclusive seven-spice gourmet blend for grilled and stewed meats.",
    price: 45,
    category: "other",
    image: "/images/other_banner.png",
    weight: "150 جرام"
  },
  {
    id: "o3",
    nameAr: "أسياخ شواء ستانلس ستيل",
    nameEn: "Stainless Steel Grilling Skewers",
    descAr: "طقم أسياخ معدنية للشواء (٦ قطع) قابلة لإعادة الاستخدام ومقاومة للصدأ بيد خشبية.",
    descEn: "Reusable stainless steel grilling skewers set (6 pcs) with wooden handles.",
    price: 120,
    category: "other",
    image: "/images/other_banner.png",
    weight: "طقم (6 أسياخ)"
  }
];
