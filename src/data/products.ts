export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number;
  category: "meats" | "poultry" | "other";
  isBestSeller?: boolean;
  image: string; // Describes the search/placeholder image
  weight?: string; // e.g. "1 kg" or "500g"
}

export const mockProducts: Product[] = [
  // MEATS (لحوم)
  {
    id: "m1",
    nameAr: "لحم موزة بقري فاخر",
    nameEn: "Premium Beef Shank (Moza)",
    descAr: "لحم موزة بقري غني بالجيلاتين والنكهة، مثالي للطواجن والطهي البطيء.",
    descEn: "Gelatinous and flavorful beef shank cut, perfect for tagines and slow cooking.",
    price: 420,
    category: "meats",
    isBestSeller: true,
    image: "beef_shank",
    weight: "1 kg"
  },
  {
    id: "m2",
    nameAr: "عرق ريبستو بقري",
    nameEn: "Beef Ribeye Roast (Ribesto)",
    descAr: "عرق ريبستو كامل مناسب جداً للتحمير في الفرن وإعداد اللحم البارد.",
    descEn: "Whole ribeye roast, perfect for oven roasting and preparing cold cuts.",
    price: 490,
    category: "meats",
    isBestSeller: true,
    image: "beef_roast",
    weight: "1.5 kg"
  },
  {
    id: "m3",
    nameAr: "عرق فلتو بقري (تندرلوين)",
    nameEn: "Beef Tenderloin Filet (Fletto)",
    descAr: "أنعم قطعة في العجل، خالية من الدهون ومثالية للشواء والستيك الفاخر.",
    descEn: "The tenderest beef cut, fat-free and perfect for grilling and premium steaks.",
    price: 550,
    category: "meats",
    isBestSeller: true,
    image: "beef_tenderloin",
    weight: "1 kg"
  },
  {
    id: "m4",
    nameAr: "كتف ضاني بلدي",
    nameEn: "Local Lamb Shoulder",
    descAr: "كتف ضاني بالعظم ذو نكهة غنية وملمس طري ومثالي للشواء بالفرن مع الأرز.",
    descEn: "Bone-in lamb shoulder, rich in flavor and tender, perfect for oven roasting with rice.",
    price: 460,
    category: "meats",
    image: "lamb_shoulder",
    weight: "1.2 kg"
  },
  {
    id: "m5",
    nameAr: "ريش ضاني فاخرة",
    nameEn: "Premium Lamb Chops (Riyash)",
    descAr: "قطع ريش ضاني طرية مجهزة للشواء السريع على الفحم أو الجريل.",
    descEn: "Tender lamb chops prepared for quick grilling on charcoal or griddle.",
    price: 480,
    category: "meats",
    isBestSeller: true,
    image: "lamb_chops",
    weight: "1 kg"
  },
  {
    id: "m6",
    nameAr: "كبدة بقري طازجة مجمدة",
    nameEn: "Fresh-Frozen Beef Liver",
    descAr: "كبدة بقري مقطعة شرائح أو مكعبات حسب الطلب، غنية بالحديد وجاهزة للطهي السريع.",
    descEn: "Sliced or cubed beef liver, rich in iron and ready for quick pan-frying.",
    price: 380,
    category: "meats",
    image: "beef_liver",
    weight: "1 kg"
  },
  {
    id: "m7",
    nameAr: "ستيك ريب آي بقري",
    nameEn: "Beef Ribeye Steak",
    descAr: "شريحة ريب آي معرقة بالدهون لمذاق عصيري وطعم شواء لا يقاوم.",
    descEn: "Marble-textured ribeye steak for a juicy bite and rich grilling flavor.",
    price: 520,
    category: "meats",
    image: "ribeye_steak",
    weight: "800g"
  },
  {
    id: "m8",
    nameAr: "فخدة ضاني كاملة",
    nameEn: "Whole Lamb Leg (Fakhda)",
    descAr: "فخدة ضاني ممتازة للعزومات والمناسبات، مناسبة للشواء الطويل في الفرن.",
    descEn: "Premium whole leg of lamb, perfect for family gatherings and slow oven roasting.",
    price: 980,
    category: "meats",
    image: "lamb_leg",
    weight: "2 kg"
  },
  {
    id: "m9",
    nameAr: "ستيك كندوز متبل جاهز",
    nameEn: "Marinated Veal Steak (Kandooz)",
    descAr: "شرائح لحم كندوز طرية متبلة بخلطتنا الخاصة الجاهزة للطهي الفوري.",
    descEn: "Tender veal slices marinated in our special blend, ready for immediate cooking.",
    price: 450,
    category: "meats",
    image: "marinated_steak",
    weight: "1 kg"
  },
  {
    id: "m10",
    nameAr: "سجق ضاني بلدي",
    nameEn: "Local Lamb Sausage (Sogoq)",
    descAr: "سجق ضاني بلدي محشو بالبهارات الشرقية المميزة وبدون مواد حافظة.",
    descEn: "Traditional lamb sausage stuffed with oriental spices, with no added preservatives.",
    price: 360,
    category: "meats",
    isBestSeller: true,
    image: "lamb_sausage",
    weight: "1 kg"
  },
  {
    id: "m11",
    nameAr: "لحم كباب حلة قطع",
    nameEn: "Kebab Halla Beef Cubes",
    descAr: "قطع لحم بقري صغيرة طرية وقليلة الدهون مثالية لطبق كباب الحلة المصري.",
    descEn: "Small, tender, lean beef cubes ideal for traditional Egyptian Kebab Halla stew.",
    price: 410,
    category: "meats",
    image: "beef_cubes",
    weight: "1 kg"
  },
  {
    id: "m12",
    nameAr: "لحم بقري مفروم فاخر",
    nameEn: "Premium Minced Beef",
    descAr: "لحم بقري مفروم بنسبة دهون متوازنة (٨٠/٢٠) مناسب للرقاق والبشاميل والكفتة.",
    descEn: "Minced beef with balanced fat ratio (80/20) suitable for pasta bake, pastry, and kofta.",
    price: 350,
    category: "meats",
    image: "minced_beef",
    weight: "1 kg"
  },
  {
    id: "m13",
    nameAr: "بيف برجر كلاسيك",
    nameEn: "Classic Beef Burger",
    descAr: "أقراص برجر بقري سميكة ومحضرة من قطعيات لحم فاخرة بدون إضافات فول صويا.",
    descEn: "Thick beef burger patties crafted from premium cuts with no soy additives.",
    price: 390,
    category: "meats",
    image: "beef_burger",
    weight: "800g (8 Patties)"
  },
  {
    id: "m14",
    nameAr: "لحم اسكالوب بقري (بفتيك)",
    nameEn: "Beef Escalope (Boftek)",
    descAr: "شرائح لحم رفيعة ومطرقة جيداً، مثالية لعمل البفتيك المقلي المقرمش.",
    descEn: "Thinly sliced and tenderized beef cuts, perfect for crispy fried escalope.",
    price: 470,
    category: "meats",
    image: "beef_escalope",
    weight: "1 kg"
  },
  {
    id: "m15",
    nameAr: "ستيك انتركوت بقري",
    nameEn: "Beef Entrecote Steak",
    descAr: "شريحة انتركوت فرنسية مميزة مقطعة بسُمك مثالي للطهي على المقلاة بالزبدة والثوم.",
    descEn: "Premium French cut entrecote steak, sliced to perfection for pan-searing with butter and garlic.",
    price: 510,
    category: "meats",
    image: "entrecote_steak",
    weight: "900g"
  },
  {
    id: "m16",
    nameAr: "كفتة حاتي جاهزة للشواء",
    nameEn: "Ready-to-Grill Kofta El Haty",
    descAr: "كفتة بقري متبلة بالبصل والبهارات ومصبعة ومعدة لوضعها مباشرة على السيخ والشواء.",
    descEn: "Beef kofta seasoned with onions and spices, shaped and ready to grill on skewers.",
    price: 340,
    category: "meats",
    image: "beef_kofta",
    weight: "1 kg"
  },

  // POULTRY (دواجن)
  {
    id: "p1",
    nameAr: "دجاجة كاملة منظفة ومجمدة",
    nameEn: "Whole Cleaned Chicken",
    descAr: "دجاجة كاملة مغسولة ومعقمة جيداً ومجمدة سريعاً للحفاظ على قيمتها الغذائية.",
    descEn: "Whole chicken thoroughly cleaned, sanitized, and quick-frozen to preserve nutrients.",
    price: 185,
    category: "poultry",
    isBestSeller: true,
    image: "whole_chicken",
    weight: "1.2 kg"
  },
  {
    id: "p2",
    nameAr: "صدور دجاج مخلية (بانيه)",
    nameEn: "Boneless Chicken Breast (Pane)",
    descAr: "صدور دجاج مخلية من العظم والجلد تماماً، مقطعة شرائح متساوية وجاهزة للتبيل.",
    descEn: "Skinless boneless chicken breast slices, cut evenly and ready for breading/marination.",
    price: 240,
    category: "poultry",
    isBestSeller: true,
    image: "chicken_breasts",
    weight: "1 kg"
  },
  {
    id: "p3",
    nameAr: "أوراك دجاج طازجة مجمدة",
    nameEn: "Frozen Chicken Thighs (Awraq)",
    descAr: "أوراك دجاج نظيفة ومثالية لعمل الحمام الكداب أو الشواء بالفرن مع الخضار.",
    descEn: "Clean chicken thighs, ideal for stuffed chicken rollups or roasting with vegetables.",
    price: 160,
    category: "poultry",
    image: "chicken_thighs",
    weight: "1 kg"
  },
  {
    id: "p4",
    nameAr: "أجنحة دجاج جامبو",
    nameEn: "Jumbo Chicken Wings",
    descAr: "أجنحة دجاج كاملة ممتازة لوصفات البافالو والوينجز المقرمشة بالفرن.",
    descEn: "Whole chicken wings, excellent for crispy oven-baked buffalo wings.",
    price: 110,
    category: "poultry",
    image: "chicken_wings",
    weight: "1 kg"
  },
  {
    id: "p5",
    nameAr: "كبدة وقوانص دجاج نظيفة",
    nameEn: "Clean Chicken Liver & Gizzards",
    descAr: "كبد وقوانص دجاج مغسولة بعناية وخالية من الروائح، مثالية للطواجن المصرية بالأرز.",
    descEn: "Thoroughly washed chicken livers and gizzards, perfect for traditional rice tagines.",
    price: 130,
    category: "poultry",
    image: "chicken_liver",
    weight: "1 kg"
  },
  {
    id: "p6",
    nameAr: "لحم دجاج مفروم",
    nameEn: "Minced Chicken Meat",
    descAr: "صدور وأوراك دجاج مفرومة ناعم لتجهيز كفتة الدجاج والبرجر البيتي الصحي.",
    descEn: "Finely minced chicken breast and thigh meat, ready for healthy chicken kofta or patties.",
    price: 210,
    category: "poultry",
    image: "minced_chicken",
    weight: "1 kg"
  },
  {
    id: "p7",
    nameAr: "بط بلدي مجمد فاخر",
    nameEn: "Premium Local Frozen Duck",
    descAr: "بط بلدي مسمن جيداً ذو لحم غني بالنكهة، منظف ومجهز لعزومات البط بالبرتقال.",
    descEn: "Well-fattened local duck with rich flavorful meat, cleaned and prepped for roasting.",
    price: 320,
    category: "poultry",
    isBestSeller: true,
    image: "frozen_duck",
    weight: "2.2 kg"
  },
  {
    id: "p8",
    nameAr: "ديك رومي كامل مجمد",
    nameEn: "Whole Frozen Turkey (Romy)",
    descAr: "ديك رومي كبير الحجم، نظيف ومجهز ومثالي للمناسبات الكبرى والأعياد.",
    descEn: "Large whole turkey, fully cleaned and prepped, perfect for major holidays and feasts.",
    price: 850,
    category: "poultry",
    image: "frozen_turkey",
    weight: "5 kg"
  },
  {
    id: "p9",
    nameAr: "شيش طاووق متبل جاهز",
    nameEn: "Marinated Shish Tawook Cubes",
    descAr: "مكعبات أوراك دجاج طرية متبلة بالزبادي والليمون والبهارات للشواء على الأسياخ.",
    descEn: "Tender boneless chicken thigh cubes marinated in yogurt, lemon, and spices for skewers.",
    price: 230,
    category: "poultry",
    image: "shish_tawook",
    weight: "1 kg"
  },
  {
    id: "p10",
    nameAr: "دبوس دجاج مقرمش متبل",
    nameEn: "Marinated Chicken Drumsticks",
    descAr: "دبابيس دجاج طازجة متبلة ببهارات كرسبي حارة خفيفة، جاهزة للتحمير السريع.",
    descEn: "Fresh drumsticks marinated in mild spicy crispy spices, ready for golden frying.",
    price: 175,
    category: "poultry",
    image: "chicken_drumsticks",
    weight: "1 kg"
  },

  // OTHER (أخرى)
  {
    id: "o1",
    nameAr: "فحم نباتي طبيعي للشواء",
    nameEn: "Natural Charcoal for Grilling",
    descAr: "فحم شواء طبيعي سريع الاشتعال ويدوم طويلاً بدون دخان كثيف أو روائح غريبة.",
    descEn: "Fast-igniting, long-lasting natural lump charcoal with low smoke and no chemical odor.",
    price: 75,
    category: "other",
    isBestSeller: true,
    image: "natural_charcoal",
    weight: "3 kg"
  },
  {
    id: "o2",
    nameAr: "خلطة بهارات ديليشس للحوم",
    nameEn: "Delicious Meat Seasoning Blend",
    descAr: "تركيبة حصرية من سبع بهارات فاخرة تمنح اللحوم المشوية والمطهية نكهة مميزة.",
    descEn: "Exclusive seven-spice gourmet blend that gives grilled and stewed meats a rich aroma.",
    price: 45,
    category: "other",
    image: "meat_spices",
    weight: "150g"
  },
  {
    id: "o3",
    nameAr: "أسياخ شواء ستانلس ستيل",
    nameEn: "Stainless Steel Grilling Skewers",
    descAr: "طقم أسياخ معدنية للشواء (٦ قطع) قابلة لإعادة الاستخدام ومقاومة للصدأ بيد خشبية.",
    descEn: "Reusable stainless steel grilling skewers set (6 pcs) with wooden handles.",
    price: 120,
    category: "other",
    image: "grilling_skewers",
    weight: "1 Set (6 Skewers)"
  },
  {
    id: "o4",
    nameAr: "خلطة بهارات الدواجن والبرجر",
    nameEn: "Poultry & Burger Spice Mix",
    descAr: "بهارات خاصة لتتبيل الدجاج والبرجر البيتي تعطي طعماً يشبه المطاعم.",
    descEn: "Special seasoning mix for chicken and homemade burger patties for that restaurant taste.",
    price: 45,
    category: "other",
    image: "poultry_spices",
    weight: "150g"
  },
  {
    id: "o5",
    nameAr: "شبكة شواء مزدوجة سلك",
    nameEn: "Double Wire Grilling Basket",
    descAr: "شبكة شواء سلكية مزدوجة مع مقبض خشبي طويل، مثالية لشواء الكفتة والريش والدجاج.",
    descEn: "Double-sided wire grilling basket with a long wooden handle, ideal for kofta and ribs.",
    price: 195,
    category: "other",
    image: "grilling_basket",
    weight: "1 Piece"
  }
];
