export interface DailyRecipe {
  id: string;
  dayIndex: number; // 1 to 31 (representing day of the month)
  dayNameAr: string;
  dayNameEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  prepTimeAr: string;
  prepTimeEn: string;
  servingsAr: string;
  servingsEn: string;
  ingredientsAr: string[];
  ingredientsEn: string[];
  instructionsAr: string[];
  instructionsEn: string[];
  image: string;
  relatedCutCategory: "meats" | "poultry" | "other";
  videoUrl?: string;
}

export const defaultDailyRecipes: DailyRecipe[] = [
  {
    id: "day-1",
    dayIndex: 1,
    dayNameAr: "يوم 1",
    dayNameEn: "Day 1",
    titleAr: "ستيك ريب آي مشوي بصلصة الثوم والأعشاب",
    titleEn: "Grilled Ribeye Steak with Garlic Herb Butter",
    descAr: "قطعيات ريب آي معرّقة فاخرة مطبوخة لدرجة الكمال مع زبدة الثوم والأعشاب، تقدم مع خضار سوتيه ورز بالأعشاب.",
    descEn: "Premium marbled ribeye steak cooked to perfection with garlic herb butter, served alongside sautéed veggies.",
    prepTimeAr: "٣٥ دقيقة",
    prepTimeEn: "35 Mins",
    servingsAr: "٣ - ٤ أفراد",
    servingsEn: "3-4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام ريب آي بقري فاخر من ديليشس ميتس",
      "٥٠ جرام زبدة طبيعية ناعمة",
      "٤ فصوص ثوم مفروم ناعماً",
      "أغصان روزماري وزعتر طازجة",
      "ملح بحري وفلفل أسود مجروش حديثاً",
      "٢ ملعقة كبيرة زيت زيتون نقي"
    ],
    ingredientsEn: [
      "750g Premium Beef Ribeye Steak from Delicious Meats",
      "50g Unsalted natural butter",
      "4 Cloves finely minced garlic",
      "Fresh sprigs of rosemary and thyme",
      "Sea salt and freshly cracked black pepper",
      "2 tbsp Extra virgin olive oil"
    ],
    instructionsAr: [
      "يُخرج ستيك الريب آي من الثلاجة قبل الطهي بـ ٣٠ دقيقة ليصبح بدرجة حرارة الغرفة.",
      "يُجفف اللحم بمحارم المطبخ ويُتبل بسخاء بالملح البحري والفلفل الأسود وزيت الزيتون.",
      "تُسخن المقلاة المقاومة للالتصاق أو الثقيلة جيداً حتى تصبح شديدة السخونة.",
      "يُطهى الستيك لمدة ٣ إلى ٤ دقائق لكل جانب للحصول على درجة طهي ميديوم مثالية.",
      "في الدقيقة الأخيرة، تُضاف الزبدة والثوم والروزماري وتُرش الزبدة المذابة فوق الستيك باستمرار.",
      "يُرفع الستيك على لوح التقطيع ويُترك ليرتاح ٨ دقائق قبل التقطيع والتقديم."
    ],
    instructionsEn: [
      "Take the ribeye steak out of the fridge 30 minutes prior to cooking so it reaches room temperature.",
      "Pat dry with paper towels and season generously with sea salt, pepper, and olive oil.",
      "Heat a heavy skillet or grill pan until smoking hot.",
      "Sear the steak for 3-4 minutes per side for a perfect medium cook.",
      "During the last minute, add butter, garlic, and fresh herbs, basting the melted butter over the steak.",
      "Transfer steak to a cutting board and let it rest for 8 minutes before slicing."
    ],
    image: "/images/recipe_saturday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-2",
    dayIndex: 2,
    dayNameAr: "يوم 2",
    dayNameEn: "Day 2",
    titleAr: "ريش ضاني فاخرة مشوية على الفحم",
    titleEn: "Charcoal Grilled Premium Lamb Chops",
    descAr: "ريش ضاني طرية ومتبلة بالتوابل الشرقية الفاخرة وماء البصل، مشوية على فحم طبيعي لتمنحك طعماً مدخناً أصيلاً.",
    descEn: "Tender lamb chops marinated in exotic oriental spices and onion juice, grilled on natural charcoal.",
    prepTimeAr: "٤٥ دقيقة",
    prepTimeEn: "45 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو ريش ضاني بلدي فاخرة",
      "ماء ٢ بصلة كبيرة مفرومة ومصفاة",
      "١/٢ كوب عصير طماطم طازج",
      "٢ ملعقة كبيرة عصير ليمون وخل تفاح",
      "مزيج بهارات مشويات ديليشس",
      "ملح وفلفل أسود وكمون"
    ],
    ingredientsEn: [
      "1kg Fresh Lamb Chops from Delicious Meats",
      "Strained juice of 2 large onions",
      "1/2 Cup fresh tomato juice",
      "2 tbsp Lemon juice & apple cider vinegar",
      "Delicious Meats signature BBQ spice mix",
      "Salt, black pepper, and cumin"
    ],
    instructionsAr: [
      "تُخلط تتبيلة ماء البصل وعصير الطماطم والليمون والخل مع البهارات والملح.",
      "تُنقع ريش الضاني في التتبيلة لمدة ٤ ساعات على الأقل في الثلاجة.",
      "يُجهز الفحم ويرص اللحم على الشواية فوق جمر متوسط الحرارة.",
      "تُشوى الريش لمدة ٥-٦ دقائق لكل جانب مع التقليب حتى تنضج وتكتسب اللون الذهبي المحمر.",
      "تُقدم ساخنة مع صلصة الطحينة والخبز البلدي الساخن والبقدونس المفروم."
    ],
    instructionsEn: [
      "Mix onion juice, tomato juice, lemon juice, vinegar, and barbecue spices together.",
      "Marinate lamb chops in the mixture for at least 4 hours in the refrigerator.",
      "Prepare charcoal grill and place chops over medium-hot glowing embers.",
      "Grill for 5-6 minutes per side, turning occasionally until perfectly charred.",
      "Serve piping hot with tahini sauce, warm Egyptian baladi bread, and chopped parsley."
    ],
    image: "/images/recipe_sunday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-3",
    dayIndex: 3,
    dayNameAr: "يوم 3",
    dayNameEn: "Day 3",
    titleAr: "طاجن لحم موزة بالبصل الأورمة والبطاطس",
    titleEn: "Beef Shank Tagine with Shallots & Potatoes",
    descAr: "قطع موزة بقري طازجة مطبوخة في طاجن فخار ببطء مع البصل الصغير والبطاطس في صلصة غنية طازجة.",
    descEn: "Fresh gelatinous beef shank chunks slow-cooked in a traditional clay tagine with small baby onions.",
    prepTimeAr: "٦٠ دقيقة",
    prepTimeEn: "60 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "١ كيلو لحم موزة بقري قطعت طازجة",
      "٥٠٠ جرام بصل أورمة صغير مقشر",
      "٢ حبة بطاطس مكعبات كبيرة",
      "٢ كوب عصير طماطم طازج وملعقة صلصة",
      "مكعب مرقة وعود قرفة وفصين حبهان",
      "سمن بلدي وملح وفلفل بهارات لحم"
    ],
    ingredientsEn: [
      "1kg Fresh Beef Shank chunks from Delicious Meats",
      "500g Peeled baby shallot onions",
      "2 Large potatoes cubed",
      "2 Cups fresh tomato juice + 1 tbsp paste",
      "Cinnamon stick, cardamom pods & bay leaves",
      "Pure ghee, salt, black pepper & meat spices"
    ],
    instructionsAr: [
      "في إناء ساخن، يُشوح لحم الموزة في السمن البلدي حتى يتغير لونه ويتحمر.",
      "يُضاف البصل الأورمة المقشر والبطاطس والبهارات والحبهان والقرفة وتُقلب المكونات.",
      "يُسكب عصير الطماطم والصلصة وكوب ماء مغلي ويُترك المزيج يغلي لمدة ١٥ دقيقة.",
      "يُنقل الخليط إلى طاجن فخاري دافئ ويُغطى بورق ألومنيوم ويدخل الفرن لمدة ساعتين.",
      "يُكشف الغطاء أخر ١٠ دقائق ليتحمر الوجه ويُقدم مع أرز بالأشعيرية."
    ],
    instructionsEn: [
      "In a hot pan, sear the beef shank in pure ghee until browned on all sides.",
      "Add small peeled shallots, cubed potatoes, spices, cardamom, and cinnamon stick.",
      "Pour fresh tomato juice, paste, and 1 cup of boiling water; let simmer for 15 minutes.",
      "Transfer to a clay tagine, cover tightly with foil, and bake at 190°C for 2 hours.",
      "Uncover for the last 10 minutes to crisp top layer, then serve with vermicelli rice."
    ],
    image: "/images/recipe_monday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-4",
    dayIndex: 4,
    dayNameAr: "يوم 4",
    dayNameEn: "Day 4",
    titleAr: "عرق روستو بقري مشوي بالفرن مع الأعشاب",
    titleEn: "Herb Oven Roasted Beef Ribeye Roast",
    descAr: "عرق روستو بقري كامل ملفوف بعناية ومتبل بالثوم والروزماري، يطبخ في الفرن ليقدم شرائح لحم طرية ورائعة.",
    descEn: "Whole tied ribeye roast seasoned with garlic and rosemary, slow-roasted in the oven for savory tender slices.",
    prepTimeAr: "٩٠ دقيقة",
    prepTimeEn: "90 Mins",
    servingsAr: "٦ - ٨ أفراد",
    servingsEn: "6-8 Servings",
    ingredientsAr: [
      "١.٥ كيلو عرق روستو بقري ملفوف من ديليشس ميتس",
      "٦ فصوص ثوم صحيحة للتطعيم",
      "روزماري وزعتر طازج مفروم",
      "٢ ملعقة كبيرة سمن بلدي وزيت زيتون",
      "ملح وفلفل أسود مجروش وخردل ناعم"
    ],
    ingredientsEn: [
      "1.5kg Whole Tied Ribeye Roast from Delicious Meats",
      "6 Whole garlic cloves for stuffing incisions",
      "Freshly chopped rosemary and thyme",
      "2 tbsp Pure ghee and olive oil",
      "Sea salt, coarse black pepper, and Dijon mustard"
    ],
    instructionsAr: [
      "تُعمل ثقوب صغيرة في عرق الروستو وتُغرس فيها فصوص الثوم وأوراق الروزماري.",
      "يُدهن العرق بالخردل والسمن والملح والفلفل والأعشاب جيداً.",
      "يُشوح العرق في مقلاة كبيرة حتى يتغطى بلون بني ذهبي من جميع الجهات.",
      "يُنقل إلى صينية فرن مع قليل من الماء ويُلف بالفوليو ويُخبز لمدة ساعة وربع.",
      "يُترك العرق ليرتاح ٢٠ دقيقة قبل إزالة الخيط وتقطيعه لشرائح رفيعة."
    ],
    instructionsEn: [
      "Make small incisions in the roast and insert garlic cloves and fresh rosemary sprigs.",
      "Rub roast generously with Dijon mustard, ghee, sea salt, black pepper, and herbs.",
      "Sear roast in a heavy roasting pan over high heat until browned all over.",
      "Transfer to oven with a splash of water, cover with foil, and roast at 180°C for 75 mins.",
      "Allow roast to rest for 20 minutes before removing string and slicing thin."
    ],
    image: "/images/beef_roast.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-5",
    dayIndex: 5,
    dayNameAr: "يوم 5",
    dayNameEn: "Day 5",
    titleAr: "كباب حلة مصري بلحم الكندوز الطري",
    titleEn: "Traditional Egyptian Kebab Halla",
    descAr: "قطع لحم كندوز صغيرة مطبوخة مع كمية مضاعفة من البصل المكرمل والصوص البني الغني بالنكهة.",
    descEn: "Tender beef cubes braised slowly with caramelized onions creating a rich dark savory gravy.",
    prepTimeAr: "٥٠ دقيقة",
    prepTimeEn: "50 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو لحم كندوز كباب حلة مكعبات",
      "١ كيلو بصل مفروم شرائح رقيقة",
      "٢ ملعقة كبيرة سمن بلدي فاخر",
      "بهارات لحم، جوزة الطيب، فلفل أسود، ملح",
      "فحمة مشتعلة للتفحيم (اختياري)"
    ],
    ingredientsEn: [
      "1kg Tender Beef Kebab Halla Cubes from Delicious Meats",
      "1kg Thinly sliced onions",
      "2 tbsp Pure Egyptian ghee",
      "Meat spices, nutmeg, black pepper, and salt",
      "Glowing charcoal ember for smoking (optional)"
    ],
    instructionsAr: [
      "في إناء عميق، يُسخن السمن وتُشوح مكعبات اللحم على نار عالية حتى تحمر.",
      "يُضاف البصل المفروم ويُقلب مع اللحم ثم تُخفض النار وتُغطى الإناء.",
      "يُضاف ربع كوب ماء مغلي كلما جف الصوص مع التقليب المستمر حتى يذوب البصل تماماً.",
      "تُضاف البهارات والملح في النهاية وتُترك على نار هادئة ٥ دقائق.",
      "تُوضع فحمة مشتعلة في ورقة ألومنيوم مع نقطة زيت داخل الإناء وتُغطى لدقيقتين للحصول على نكهة الفحم."
    ],
    instructionsEn: [
      "In a heavy pot, melt ghee and sear beef cubes on high heat until dark golden.",
      "Add sliced onions, turn heat to low, cover pot, and let onions soften and release juices.",
      "Add 1/4 cup boiling water whenever gravy thickens, stirring until onions caramelize into a sauce.",
      "Season with meat spices, nutmeg, salt, and pepper in the final 5 minutes.",
      "Place a glowing charcoal ember in foil with a droplet of oil inside pot for 2 minutes to smoke."
    ],
    image: "/images/beef_shank.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-6",
    dayIndex: 6,
    dayNameAr: "يوم 6",
    dayNameEn: "Day 6",
    titleAr: "فخدة ضاني محمرة بالفرن بالأعشاب والروزماري",
    titleEn: "Roast Leg of Lamb with Garlic & Herbs",
    descAr: "فخدة ضاني بلدي كاملة مشوية في الفرن ببطء مع الثوم والروزماري والخضروات المشكلة للعزومات الفاخرة.",
    descEn: "Whole leg of lamb slow-roasted with garlic, rosemary, and root vegetables for festive family feasts.",
    prepTimeAr: "١٢٠ دقيقة",
    prepTimeEn: "120 Mins",
    servingsAr: "٦ - ٨ أفراد",
    servingsEn: "6-8 Servings",
    ingredientsAr: [
      "٢.٥ كيلو فخدة ضاني بلدي كاملة",
      "٨ فصوص ثوم قشرت وقطعت أنصاف",
      "حزمة روزماري وزعتر طازج",
      "٣ ملاعق كبيرة زيت زيتون وزبدة",
      "خضروات جذرية (بطاطس، جزر، بصل أورمة)"
    ],
    ingredientsEn: [
      "2.5kg Whole Leg of Lamb from Delicious Meats",
      "8 Garlic cloves halved",
      "Fresh rosemary and thyme bunch",
      "3 tbsp Olive oil and melted butter",
      "Root vegetables (potatoes, carrots, shallots)"
    ],
    instructionsAr: [
      "تُحدث فتحات عميقة في الفخدة وتُحشى بفصوص الثوم وأغصان الروزماري.",
      "تُدهن الفخدة بخلطة الزيت والزبدة والملح والفلفل والبهارات العطرية.",
      "تُرص الخضروات الجذرية في قاع صينية الفرن وتُوضع الفخدة فوقها.",
      "تُغطى الصينية بطبقتين من القصدير وتُخبز في فرن مسخن على ١٨٠ م لمدة ساعتين.",
      "يُرفع القصدير وتُدهن الفخدة بعصارتها وتُحمر تحت الشواية لمدة ١٥ دقيقة."
    ],
    instructionsEn: [
      "Make deep slits across the leg of lamb and insert garlic halves and rosemary sprigs.",
      "Coat leg evenly with olive oil, melted butter, sea salt, black pepper, and ground spices.",
      "Arrange root vegetables in the bottom of a roasting pan and nestle lamb leg on top.",
      "Cover tightly with heavy tin foil and roast at 180°C for 2 hours.",
      "Remove foil, baste lamb with pan juices, and broil for 15 minutes until skin is crispy."
    ],
    image: "/images/lamb_shoulder.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-7",
    dayIndex: 7,
    dayNameAr: "يوم 7",
    dayNameEn: "Day 7",
    titleAr: "كفتة الحاتي المشوية مع صلصة الطحينة",
    titleEn: "Haty Grilled Kofta with Tahini Sauce",
    descAr: "كفتة مفرومة طازجة بنسبة دهن متوازنة متبلة على طريقة الحاتي الأصيلة ومكتسبة رائحة الفحم المشوي.",
    descEn: "Authentic Egyptian Haty style grilled kofta with perfect fat-to-lean meat ratio and smoky finish.",
    prepTimeAr: "٤٠ دقيقة",
    prepTimeEn: "40 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو لحم كفتة مفروم مع ٢٠٪ دوش بلدي",
      "ماء بصل مصفى لتصبيع الكفتة",
      "١ ملعقة كبيرة بيكنج بودر (للهشاشة)",
      "ملح، فلفل أسود، بهارات كفتة حاتي",
      "بقدونس مفروم للتزيين"
    ],
    ingredientsEn: [
      "1kg Freshly Minced Kofta Meat (80/20 lean/fat ratio)",
      "Strained onion juice for shaping skewers",
      "1 tbsp Baking powder (for airy fluffy texture)",
      "Salt, black pepper, and Haty kofta spices",
      "Finely chopped parsley for garnish"
    ],
    instructionsAr: [
      "يُخلط اللحم المفروم مع التوابل والبيكنج بودر ويُعجن جيدا لمدة ٧ دقائق حتى تتكون أنسجة.",
      "يُترك خليط الكفتة في الثلاجة لمدة ساعة ليتماسك.",
      "تُصبع الكفتة على أسياخ خشبية أو معدنية باستعمال ماء البصل.",
      "تُشوى على الشواية الكهربائية أو الفحم لمدة ٨-١٠ دقائق مع التقليب المستمر.",
      "تُقدم على فراش من البقدونس المفروم مع سلطة الطحينة والخبز البلدى."
    ],
    instructionsEn: [
      "Mix minced meat with seasonings and baking powder; knead vigorously for 7 minutes until fibrous.",
      "Chill kofta mixture in the fridge for 1 hour to bind.",
      "Shape kofta mixture onto wooden or stainless skewers using onion juice.",
      "Grill over medium hot coals or griddle for 8-10 minutes, rotating continuously.",
      "Serve on a bed of fresh chopped parsley with tahini dip and baladi pita bread."
    ],
    image: "/images/kofta_haty.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-8",
    dayIndex: 8,
    dayNameAr: "يوم 8",
    dayNameEn: "Day 8",
    titleAr: "بوفتيك بقري (إسكالوب بانيه) مقرمش",
    titleEn: "Crispy Beef Boftek Escalope Pane",
    descAr: "شرائح بوفتيك بقري طرية متبلة بماء البصل والليمون ومغطاة بطبقة مقرمشة ذهبية لا تفصل أثناء القلي.",
    descEn: "Tender beef escalation slices marinated in onion juice and lemon, coated in a crispy non-flaking golden crust.",
    prepTimeAr: "٣٥ دقيقة",
    prepTimeEn: "35 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو شرائح بوفتيك بقري طازج",
      "ماء بصل وعصير ليمون وملعقة خل",
      "٢ بيضة مخفوقة مع ملعقتين حليب",
      "كوب دقيق + كوب بقسماط ناعم",
      "ملح وفلفل أسود وثوم بودرة",
      "زيت غزير للقلي"
    ],
    ingredientsEn: [
      "1kg Fresh Beef Boftek Slices from Delicious Meats",
      "Onion juice, lemon juice & 1 tbsp vinegar",
      "2 Eggs beaten with 2 tbsp milk",
      "1 Cup flour + 1 cup fine breadcrumbs",
      "Salt, black pepper, and garlic powder",
      "Vegetable oil for frying"
    ],
    instructionsAr: [
      "تُدق شرائح البوفتيك خفيفاً بين ورقتي نايلون لتصبح بسُمك متساوٍ.",
      "تُنقع الشرائح في ماء البصل والليمون والخل والبهارات لمدة ساعتين.",
      "تُغمر كل شريحة في الدقيق، ثم في خفق البيض، ثم في البقسماط مع الضغط جيداً.",
      "تُوضع الشرائح في الثلاجة لمدة ٣٠ دقيقة لتثبيت التغليفة.",
      "تُقلى في زيت ساخن متوسط الحرارة حتى تكتسب لوناً ذهبياً مقرمشاً وتُصفى."
    ],
    instructionsEn: [
      "Pound beef slices gently between plastic wrap to achieve uniform thickness.",
      "Marinate slices in onion juice, lemon, vinegar, and spices for 2 hours.",
      "Dredge each slice in flour, dip into egg wash, then coat firmly in breadcrumbs.",
      "Refrigerate breaded slices for 30 minutes to set crust.",
      "Fry in medium hot oil until golden brown and crispy on both sides, then drain."
    ],
    image: "/images/beef_tenderloin.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-9",
    dayIndex: 9,
    dayNameAr: "يوم 9",
    dayNameEn: "Day 9",
    titleAr: "طاجن بامية باللحم الضاني البلدي",
    titleEn: "Okra & Tender Lamb Meat Tagine",
    descAr: "طاجن بامية بلدي صغيرة مطبوخة مع قطع اللحم الضاني الطري في صلصة الطماطم بالثوم والكسبرة.",
    descEn: "Traditional Egyptian baby okra slow simmered with juicy lamb chunks in a garlic-coriander tomato sauce.",
    prepTimeAr: "٥٥ دقيقة",
    prepTimeEn: "55 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "٧٥٠ جرام لحم ضاني بلدي مكعبات",
      "٥٠٠ جرام بامية بلدي قمعت طازجة",
      "٢ كوب عصير طماطم طازج وملعقة صلصة",
      "٦ فصوص ثوم مفروم + ملعقة كسبرة جافة",
      "قرن فلفل حامي وسمن بلدي وملح وفلفل"
    ],
    ingredientsEn: [
      "750g Fresh Lamb Chunks from Delicious Meats",
      "500g Fresh trimmed baby okra",
      "2 Cups fresh tomato juice + 1 tbsp paste",
      "6 Minced garlic cloves + 1 tbsp dry coriander",
      "Green chili pepper, ghee, salt & pepper"
    ],
    instructionsAr: [
      "يُسلق اللحم الضاني مع الحبهان ورق اللوري والبصل حتى ينضج بنسبة ٨٠٪.",
      "في إناء، يُشوح الثوم مع السمن والكسبرة الجافة حتى تطلع ريحته وتُضاف الصلصة وعصير الطماطم.",
      "تُضاف البامية واللحم المسلوق وقرن الفلفل الحامي وكوب من مرقة اللحم.",
      "تُقلب المكونات وتُنقل إلى طاجن فخاري وتُغطى بالفوليو وتُدخل الفرن ٤٠ دقيقة.",
      "تُعصر عليها عثرة ليمون عند التقديم مع أرز أبايض."
    ],
    instructionsEn: [
      "Boil lamb chunks with cardamom, bay leaves, and onion until 80% tender.",
      "Sauté minced garlic with ghee and coriander until fragrant, then add tomato paste and juice.",
      "Add trimmed okra, boiled lamb, green chili, and 1 cup of rich lamb broth.",
      "Transfer to clay tagine, cover with foil, and bake in oven at 190°C for 40 minutes.",
      "Squeeze fresh lemon over top before serving with Egyptian white rice."
    ],
    image: "/images/recipe_tuesday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-10",
    dayIndex: 10,
    dayNameAr: "يوم 10",
    dayNameEn: "Day 10",
    titleAr: "كبده وقوانص دجاج متبلة بالثوم والليمون",
    titleEn: "Garlic Lemon Chicken Liver & Gizzards",
    descAr: "طبق كبدة وقوانص دجاج طازجة مطهوة في المقلاة مع الثوم والفلفل الأخضر ودبس الرمان والليمون.",
    descEn: "Fresh chicken livers and gizzards pan-seared with aromatic garlic, green chili, and pomegranate molasses.",
    prepTimeAr: "٢٥ دقيقة",
    prepTimeEn: "25 Mins",
    servingsAr: "٣ أفراد",
    servingsEn: "3 Servings",
    ingredientsAr: [
      "٥٠٠ جرام كبدة وقوانص دجاج طازجة",
      "٥ فصوص ثوم مفروم ناعماً",
      "٢ قرن فلفل أخضر رومي وحامي",
      "٢ ملعقة كبيرة دبس رمان وعصير ليمون",
      "زبدة وزيت وملح وفلفل أسود وكمون"
    ],
    ingredientsEn: [
      "500g Fresh Chicken Livers & Gizzards",
      "5 Minced garlic cloves",
      "2 Green bell & hot peppers sliced",
      "2 tbsp Pomegranate molasses & fresh lemon juice",
      "Butter, oil, salt, black pepper & cumin"
    ],
    instructionsAr: [
      "تُغسل الكبد والقوانص جيداً وتُقطع القوانص أولاً وتُسلق 10 دقائق لتطرى.",
      "في مقلاة ساخنة، تُسخن الزبدة والزيت وتُشوح القوانص ثم تُضاف الكبدة.",
      "يُضاف الثوم المفروم والفلفل الأخضر والبهارات وتُقلب على نار عالية 7 دقائق.",
      "يُسكب دبس الرمان وعصير الليمون في آخر دقيقة وتُرفع من النار.",
      "تُقدم ساخنة مع الخبز الساخن والبطاطس المحمرة."
    ],
    instructionsEn: [
      "Wash livers and gizzards; parboil gizzards for 10 minutes first to tenderize.",
      "In a hot skillet, melt butter with oil, sauté gizzards then add chicken livers.",
      "Add minced garlic, sliced peppers, and spices; stir fry over high heat for 7 mins.",
      "Drizzle pomegranate molasses and fresh lemon juice during the final minute.",
      "Serve warm with hot Egyptian bread and crispy french fries."
    ],
    image: "/images/poultry.svg",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-11",
    dayIndex: 11,
    dayNameAr: "يوم 11",
    dayNameEn: "Day 11",
    titleAr: "شاورما لحم بلدي بالخلطة الشرقية والزبيشال",
    titleEn: "Oriental Spiced Beef Shawarma",
    descAr: "شرائح لحم بقري رفيعة متبلة بالزبادي والخل والبهارات الشرقية، مطبوخة على الجريل مع البقدونس والبصل والطماطم.",
    descEn: "Thinly sliced beef marinated in yogurt, vinegar, and spices, griddled with fresh parsley and tomatoes.",
    prepTimeAr: "٣٠ دقيقة",
    prepTimeEn: "30 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام شرائح لحم شاورما بقري",
      "١/٢ كوب زبادي طبيعي + ٣ ملاعق خل",
      "١ ملعقة كبيرة بهارات شاورما لحم",
      "شرائح طماطم وبصل وبقدونس مفروم",
      "زيت نباتي وملح وفلفل أسود"
    ],
    ingredientsEn: [
      "750g Thinly Sliced Beef Shawarma Strips",
      "1/2 Cup plain yogurt + 3 tbsp vinegar",
      "1 tbsp Beef shawarma spice mix",
      "Sliced tomatoes, red onions & fresh parsley",
      "Vegetable oil, salt & black pepper"
    ],
    instructionsAr: [
      "تُنقع شرائح اللحم في التتبيلة (الزبادي، الخل، التوابل) لمدة ٣ ساعات.",
      "تُسخن المقلاة أو الشواية جيداً ويُضاف قليل من الزيت.",
      "تُوضع الشاورما وتُقلب على نار عالية حتى تجف عصارتها وتتحمر.",
      "يُضاف البصل والطماطم والبقدونس في آخر دقيقتين ويُقلب خفيفاً.",
      "تُحشى في خبز كايزر أو صاج مع صوص الطحينة والخيار المخلل."
    ],
    instructionsEn: [
      "Marinate beef strips in yogurt, vinegar, and spice blend for at least 3 hours.",
      "Heat a large skillet or flat top griddle with a tablespoon of oil.",
      "Sear shawarma beef on high heat until browned and juices evaporate.",
      "Toss in sliced tomatoes, red onions, and parsley in the final 2 minutes.",
      "Stuff into Saj bread or Kaiser buns with tahini sauce and pickles."
    ],
    image: "/images/sogoq_sharqi.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-12",
    dayIndex: 12,
    dayNameAr: "يوم 12",
    dayNameEn: "Day 12",
    titleAr: "فراخ مشوية متبلة بالزبادي والليمون والأعشاب",
    titleEn: "Yogurt Herb Marinated Whole Roast Chicken",
    descAr: "دجاجة كاملة منظفة متبلة بالزبادي والليمون والأعشاب العطرية، مشوية في الفرن حتى تصبح الذهبية طرية.",
    descEn: "Whole chicken marinated in herb yogurt and lemon, oven roasted until skin is golden and meat juicy.",
    prepTimeAr: "٦٠ دقيقة",
    prepTimeEn: "60 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "دجاجة كاملة طازجة (١.٤ كيلو) من ديليشس",
      "١ كوب زبادي + عصير ٢ ليمونة",
      "٤ فصوص ثوم مفروم وملعقة بابريكا",
      "روزماري وزعتر بري جاف",
      "زيت زيتون وملح وفلفل أسود"
    ],
    ingredientsEn: [
      "1.4kg Whole Cleaned Fresh Chicken from Delicious Meats",
      "1 Cup plain yogurt + juice of 2 lemons",
      "4 Minced garlic cloves + 1 tbsp smoked paprika",
      "Dried rosemary and oregano",
      "Olive oil, salt & black pepper"
    ],
    instructionsAr: [
      "تُغسل الدجاجة وتُجفف جيداً بالمحارم الورقية.",
      "تُخلط مكونات التتبيلة وتُدهن بها الدجاجة من الداخل والخارج وتحت الجلد.",
      "تُترك الدجاجة في التتبيلة لمدة ساعتين على الأقل.",
      "تُوضع في صينية فرن وتُخبز على درجة ١٩٠ م لمدة ٥٥-٦٠ دقيقة.",
      "تُسقى بعصارتها أثناء الخبز وتُحمر تحت الشواية وتُقدم مع الأرز."
    ],
    instructionsEn: [
      "Wash whole chicken and pat dry thoroughly with paper towels.",
      "Combine yogurt marinade ingredients and rub thoroughly all over chicken and under skin.",
      "Marinate chicken in refrigerator for at least 2 hours.",
      "Roast in oven at 190°C for 55-60 minutes until internal temperature reaches 75°C.",
      "Baste with roasting juices and broil top skin until crispy golden."
    ],
    image: "/images/whole_chicken.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-13",
    dayIndex: 13,
    dayNameAr: "يوم 13",
    dayNameEn: "Day 13",
    titleAr: "شيش طاووق فراخ مشوي بالخضروات الملونة",
    titleEn: "Charcoal Grilled Shish Tawook Skewers",
    descAr: "مكعبات صدور وأوراك دجاج متبلة بالزبادي والصلصة والبهارات، مشوية على أسياخ مع الفلفل والبصل.",
    descEn: "Tender chicken cubes marinated in spiced tomato yogurt, skewered with bell peppers and grilled.",
    prepTimeAr: "٤٥ دقيقة",
    prepTimeEn: "45 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو مكعبات شيش طاووق من ديليشس",
      "١/٢ كوب زبادي + ٢ ملعقة صلصة طماطم",
      "عصير ليمونة + ٣ ملاعق زيت زيتون",
      "ثوم بودرة، بصل بودرة، بابريكا، بهارات طاووق",
      "فلفل ألوان وبصل مكعبات للأسياخ"
    ],
    ingredientsEn: [
      "1kg Fresh Shish Tawook Chicken Cubes",
      "1/2 Cup plain yogurt + 2 tbsp tomato paste",
      "Lemon juice + 3 tbsp extra virgin olive oil",
      "Garlic powder, onion powder, paprika & tawook spices",
      "Cubed bell peppers & red onions for skewers"
    ],
    instructionsAr: [
      "تُنقع مكعبات الدجاج في خلطة التتبيلة الغنية لمدة ٣ ساعات.",
      "تُرص مكعبات الدجاج بالتناوب مع الفلفل والبصل على أسياخ خشبية.",
      "تُشوى على الشواية الكهربائية أو الفحم لمدة ١٢-١٥ دقيقة.",
      "تُقلب الأسياخ باستمرار وتُرش بقليل من التتبيلة حتى تنضج.",
      "تُقدم على خبز صاج دافئ مع تومية البطاطس والمخلل."
    ],
    instructionsEn: [
      "Marinate chicken cubes in rich yogurt mixture for 3 hours.",
      "Thread chicken cubes alternately with pepper and onion pieces onto skewers.",
      "Grill over medium coals or flat griddle for 12-15 minutes.",
      "Turn skewers continuously and brush with leftover marinade until tender.",
      "Serve over warm flatbread with creamy toum garlic sauce and pickles."
    ],
    image: "/images/chicken_breasts.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-14",
    dayIndex: 14,
    dayNameAr: "يوم 14",
    dayNameEn: "Day 14",
    titleAr: "برجر لحم فاخر جامبو مع الجبن المذاب",
    titleEn: "Gourmet Jumbo Beef Burger with Cheese",
    descAr: "أقراص برجر لحم بقري صافي متبل بخفة ومشوي على الشواية مع جبنة شيدر مائعة وخس وطماطم.",
    descEn: "Pure beef burger patties lightly seasoned and seared on high heat, topped with melted cheddar cheese.",
    prepTimeAr: "٢٥ دقيقة",
    prepTimeEn: "25 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٤ أقراص برجر لحم فاخر (٢٠٠ جم للقرص) من ديليشس",
      "٤ شرائح جبن شيدر أصفر",
      "خبز برجر سمسم محمص",
      "شرائح طماطم، بصل مكرمل، خس طازج",
      "صوص برجر (مايونيز، كاتشب، خردل)"
    ],
    ingredientsEn: [
      "4 Jumbo Gourmet Beef Burger Patties (200g each) from Delicious",
      "4 Meltable yellow cheddar cheese slices",
      "Toasted sesame burger buns",
      "Sliced tomatoes, caramelized onions, fresh lettuce",
      "Signature burger sauce (mayo, ketchup, mustard)"
    ],
    instructionsAr: [
      "تُسخن المقلاة الثقيلة أو الشواية جيداً وتُرش بقليل من الزيت.",
      "يُشوى البرجر لمدة ٤ دقائق لكل جانب دون الضغط عليه بالملعقة.",
      "تُوضع شريحة الجبن فوق كل قرص في الدقيقة الأخيرة وتُغطى المقلاة لتذوب الجبنة.",
      "يُحمص خبز البرجر وتُدهن القاعدة بصوص البرجر المفضل.",
      "يُوضع البرجر مع الخس والطماطم والبصل المكرمل ويُقدم فوراً."
    ],
    instructionsEn: [
      "Preheat heavy cast-iron skillet or grill to high heat.",
      "Sear beef burger patties for 4 minutes per side without pressing down.",
      "Top each patty with cheddar slice during last minute and cover pan to melt.",
      "Toast burger buns and spread base with signature burger sauce.",
      "Assemble with lettuce, tomato, patty, and caramelized onions."
    ],
    image: "/images/recipe_thursday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-15",
    dayIndex: 15,
    dayNameAr: "يوم 15",
    dayNameEn: "Day 15",
    titleAr: "كوردن بلو دجاج محشو بالجبن والرومي المدخن",
    titleEn: "Chicken Cordon Bleu with Melted Cheese",
    descAr: "صدور دجاج مفرودة محشوة بشرائح الرومي المدخن والجبن الشيدر والموتزاريلا، مقلية بتغليفة الذهبية.",
    descEn: "Tender chicken breasts stuffed with smoked turkey and gooey melted cheese, breaded and fried golden.",
    prepTimeAr: "٤٥ دقيقة",
    prepTimeEn: "45 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٤ قطع صدور دجاج مفرودة للروول",
      "٤ شرائح رومي مدخن (تركيا)",
      "٤ شرائح جبن شيدر أو موزاريلا stick",
      "دقيق، بيض مخفوق، بقسماط مقرمش",
      "ثوم بودرة، بصل بودرة، ملح وفلفل"
    ],
    ingredientsEn: [
      "4 Flattened Chicken Breast Cutlets",
      "4 Slices smoked turkey breast",
      "4 Sticks of swiss or mozzarella cheese",
      "Flour, beaten eggs, crisp panko breadcrumbs",
      "Garlic powder, onion powder, salt & pepper"
    ],
    instructionsAr: [
      "تُتبل صدور الدجاج بالملح والفلفل والثوم البودرة.",
      "تُوضع شريحة رومي مدخن وشريحة جبن داخل كل صدر وتُلف رول محكم.",
      "تُغلف الرولات في بلاستيك وتُجمد في الفريزر لمدة ٣٠ دقيقة لتتماسك.",
      "تُغمر في الدقيق ثم البيض ثم البقسماط المقرمش.",
      "تُقلى في زيت متوسط الغزارة حتى تنضج وتكتسب لوناً ذهبياً رائعاً."
    ],
    instructionsEn: [
      "Season flattened chicken cutlets with garlic powder, salt, and pepper.",
      "Place smoked turkey slice and cheese stick inside each cutlet and roll tightly.",
      "Wrap rolls tightly in plastic wrap and freeze for 30 minutes to hold shape.",
      "Dredge in flour, dip in egg wash, and coat in crisp panko breadcrumbs.",
      "Fry in medium heat oil for 10-12 minutes until cooked through and golden."
    ],
    image: "/images/chicken_breasts.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-16",
    dayIndex: 16,
    dayNameAr: "يوم 16",
    dayNameEn: "Day 16",
    titleAr: "حواوشي اسكندراني باللحم المفروم والبهارات",
    titleEn: "Alexandrian Hawawshi with Spiced Minced Meat",
    descAr: "عجين طازج محشو بخلطة اللحم المفروم البلدي مع البصل والفلفل الأخضر والبهارات الإسكندراني ومخبوز بالفرن.",
    descEn: "Freshly baked dough pockets stuffed with spicy seasoned minced beef, green peppers, and herbs.",
    prepTimeAr: "٤٠ دقيقة",
    prepTimeEn: "40 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام لحم مفروم بنسبة دهن ٢٥٪",
      "٢ بصلة كبيرة مفرومة ناعماً",
      "٢ قرن فلفل أخضر وحامي مفروم",
      "بهارات حواوشي إسكندراني وشطة وكمون",
      "عجينة حواوشي طازجة (دقيق، ماء، خميرة)"
    ],
    ingredientsEn: [
      "750g Minced Beef with 25% Fat",
      "2 Large finely chopped onions",
      "2 Chopped green chili peppers",
      "Alexandrian hawawshi spices, cumin & chili",
      "Fresh hawawshi bread dough rounds"
    ],
    instructionsAr: [
      "يُعجن اللحم المفروم مع البصل والفلفل والبهارات جيدا حتى يتجانس.",
      "تُفرد قرص عجينة ويُفرد فوقها خلطة اللحم وتُغطى بقرص عجين آخر وتُغلق الأطراف.",
      "يُدهن الوجه بالسمن البلدي أو الزيت وتُحدث ثقوب صغيرة بالشوكة.",
      "تُخبز في فرن مسخن على ٢٠٠ م لمدة ٢٠ دقيقة حتى تحمر وتصبح مقرمشة.",
      "تُقدم ساخنة مع المخلل المشكل وسلطة الطحينة."
    ],
    instructionsEn: [
      "Knead minced meat thoroughly with chopped onions, peppers, and spices.",
      "Roll out dough rounds, spread meat mixture inside, top with second dough round and crimp edges.",
      "Brush outer crust with melted ghee and prick top with a fork.",
      "Bake in preheated oven at 200°C for 20 minutes until crust is crispy brown.",
      "Serve piping hot with mixed Egyptian pickles and tahini dip."
    ],
    image: "/images/recipe_wednesday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-17",
    dayIndex: 17,
    dayNameAr: "يوم 17",
    dayNameEn: "Day 17",
    titleAr: "كفتة داود باشا بصلصة الطماطم الغنية",
    titleEn: "Dawood Pasha Meatballs in Tomato Sauce",
    descAr: "كرات كفتة مفرومة محمرة ومطبوخة في صوص طماطم مسبك ومتبل بالثوم والنعناع الجاف.",
    descEn: "Juicy beef meatballs pan-fried and simmered in a garlic mint tomato sauce, served over white rice.",
    prepTimeAr: "٣٥ دقيقة",
    prepTimeEn: "35 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٦٠٠ جرام لحم مفروم كفتة داود باشا",
      "١ بصلة مفرومة ناعماً + ملعقة دقيق",
      "٢ كوب عصير طماطم + ملعقة صلصة",
      "٤ فصوص ثوم مفروم + ملعقة نعناع جاف",
      "سمن بلدي، ملح، فلفل، بهارات"
    ],
    ingredientsEn: [
      "600g Minced Beef Meatballs from Delicious Meats",
      "1 Finely chopped onion + 1 tbsp flour for coating",
      "2 Cups tomato juice + 1 tbsp tomato paste",
      "4 Minced garlic cloves + 1 tsp dried mint",
      "Ghee, salt, pepper, and meat spices"
    ],
    instructionsAr: [
      "تُشكل الكفتة لكرات متساوية وتُعفر بالدقيق خفيفاً.",
      "تُحمر كرات الكفتة في السمن البلدي حتى تشمع وتأخذ لوناً ثم تُرفع جانباً.",
      "في نفس المقلاة، يُشوح الثوم المفروم ثم يُسكب عصير الطماطم والصلصة والنعناع.",
      "يُترك الصوص يغلي ثم تُعاد كرات الكفتة وتُترك تتسبك على نار هادئة ١٥ دقيقة.",
      "تُقدم ساخنة فوق الأرز الأبيض بالسمن البلدي."
    ],
    instructionsEn: [
      "Shape minced meat into round meatballs and lightly dust with flour.",
      "Pan-fry meatballs in ghee until browned on all sides, then remove.",
      "In the same skillet, sauté garlic, pour tomato juice, paste, and dried mint.",
      "Simmer sauce for 5 minutes, return meatballs, and cook on low heat for 15 mins.",
      "Serve warm garnished with parsley over Egyptian white rice."
    ],
    image: "/images/dawood_pasha.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-18",
    dayIndex: 18,
    dayNameAr: "يوم 18",
    dayNameEn: "Day 18",
    titleAr: "ممبار بلدي محشو بالأرز والبهارات المقلي",
    titleEn: "Crispy Golden Stuffed Mombar",
    descAr: "ممبار بلدي مغسول بعناية ومحشو بخلطة الأرز المصرية بالخضرة والصلصة، مسلوق ومقلي حتى يصبح ذهبياً.",
    descEn: "Traditional Egyptian sausage casing stuffed with spiced herb rice, boiled and fried to golden perfection.",
    prepTimeAr: "٦٠ دقيقة",
    prepTimeEn: "60 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو ممبار بلدي تنظيف فاخر من ديليشس",
      "٣ كوب أرز مصري مغسول ومصفى",
      "٣ كوب عصير طماطم مسبك مع بصل",
      "حزمة بقدونس وشبت وكسبرة مفرومة",
      "بهارات ممبار، نعناع، شطة، زيت وسمن"
    ],
    ingredientsEn: [
      "1kg Cleaned Fresh Beef Mombar from Delicious Meats",
      "3 Cups washed Egyptian white rice",
      "3 Cups tomato sauce sautéed with onions",
      "Chopped fresh parsley, dill, and coriander bunch",
      "Mombar spices, dried mint, chili & oil"
    ],
    instructionsAr: [
      "تُخلط مكونات الحشوة (الأرز، الصلصة، الخضرة، التوابل، الزيت) جيداً.",
      "يُحشى الممبار دون إفراط لتجنب انفجاره أثناء السلق.",
      "يُسلق في ماء مغلي مع بصل وحبهان ورق لوري لمدة ٤٥ دقيقة.",
      "يُصفى الممبار جيداً ويُترك ليجف قليلاً.",
      "يُقلى في زيت غزير ساخن حتى يصبح لونه ذهبياً ومقرمشاً ويُرش بالملح والفلفل."
    ],
    instructionsEn: [
      "Mix filling ingredients (rice, tomato sauce, herbs, spices, oil) thoroughly.",
      "Stuff mombar casings loosely to allow rice to expand without bursting.",
      "Boil in a large pot with bay leaves, onion, and cardamom for 45 minutes.",
      "Drain mombar thoroughly and let dry on paper towels.",
      "Deep fry in hot oil until golden brown and crispy; sprinkle with salt and pepper."
    ],
    image: "/images/sogoq_sharqi.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-19",
    dayIndex: 19,
    dayNameAr: "يوم 19",
    dayNameEn: "Day 19",
    titleAr: "صينية ورقة لحمة بالخضروات في الفرن",
    titleEn: "Egyptian Foil Wrapped Meat with Veggies",
    descAr: "شرائح لحم بقري طرية متبلة ومشوية داخل ورقة ألومنيوم مع البطاطس والبصل والفلفل والجزر لامتصاص العصارة.",
    descEn: "Tender beef slices baked inside foil parchment with seasoned potatoes, peppers, onions, and carrots.",
    prepTimeAr: "٧٥ دقيقة",
    prepTimeEn: "75 Mins",
    servingsAr: "٥ أفراد",
    servingsEn: "5 Servings",
    ingredientsAr: [
      "١ كيلو شرائح لحم فلتو أو كولاطة طازج",
      "٣ حبات بطاطس و٢ جزر و٢ فلفل رومي",
      "٢ بصلة كبيرة شرائح طولي",
      "ملعقة كبيرة ثوم مفروم وسمن بلدي",
      "بهارات لحم، جوزة الطيب، ملح، فلفل أسود"
    ],
    ingredientsEn: [
      "1kg Tender Beef Fillet or Culotte Slices",
      "3 Potatoes, 2 Carrots & 2 Bell peppers sliced",
      "2 Large sliced red onions",
      "1 tbsp Minced garlic & pure ghee",
      "Meat spice blend, nutmeg, salt & pepper"
    ],
    instructionsAr: [
      "تُخلط الخضروات المقطعة مع الثوم والسمن والبهارات والملح والفلفل.",
      "تُتبل شرائح اللحم بنفس البهارات وتُخلط مع الخضروات.",
      "تُبطن صينية فرن بورق ألومنيوم وورق زبدة وتُفرغ فيها المكونات.",
      "تُحكم إغلاق ورقة اللحمة تماماً لمنع خروج البخار.",
      "تُخبز في فرن مسخن على ٢٠٠ م لمدة ساعة وربع حتى يستوي اللحم وتُقدم."
    ],
    instructionsEn: [
      "Mix sliced vegetables with garlic, ghee, salt, black pepper, and nutmeg.",
      "Season beef slices with spices and toss together with the vegetables.",
      "Line a baking tray with heavy foil and parchment paper, then fill with mixture.",
      "Seal foil parcel tightly so steam cannot escape during baking.",
      "Bake in preheated oven at 200°C for 75 minutes until meat is tender."
    ],
    image: "/images/recipe_friday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-20",
    dayIndex: 20,
    dayNameAr: "يوم 20",
    dayNameEn: "Day 20",
    titleAr: "ستيك فيلتو تندرلوين بصلصة المشروم",
    titleEn: "Tenderloin Steak with Creamy Mushroom Sauce",
    descAr: "أنعم قطعية فيلتو بقري مشوية لمستوى ميديوم مع صوص المشروم والكريمة اللباني الفاخرة.",
    descEn: "Pan-seared tenderloin fillet served with a velvety rich creamy mushroom reduction sauce.",
    prepTimeAr: "٣٠ دقيقة",
    prepTimeEn: "30 Mins",
    servingsAr: "٣ أفراد",
    servingsEn: "3 Servings",
    ingredientsAr: [
      "٦٠٠ جرام شرائح ستيك فيلتو (تندرلوين) ديليشس",
      "٢٠٠ جرام مشروم طازج شرائح",
      "١ كوب كريمة طهي ناعمة",
      "٢ ملعقة كبيرة زبدة + فصين ثوم",
      "ملح بحري، فلفل أسود، روزماري"
    ],
    ingredientsEn: [
      "600g Tenderloin Beef Fillet Steaks from Delicious Meats",
      "200g Fresh sliced mushrooms",
      "1 Cup heavy cooking cream",
      "2 tbsp Butter + 2 garlic cloves",
      "Sea salt, black pepper, fresh rosemary"
    ],
    instructionsAr: [
      "تُتبل شرائح الفيلتو بالملح والفلفل وزيت الزيتون.",
      "تُشوح في مقلاة ساخنة جداً مع الزبدة والروزماري لمدة ٣ دقائق لكل جانب.",
      "تُرفع قطع الستيك لترتاح، وفي نفس المقلاة يُشوح المشروم والثوم.",
      "تُسكب الكريمة اللباني وتُترك لتغلي وتتسبك لمدة ٣ دقائق.",
      "يُصب صوص المشروم فوق الستيك ويُقدم مع الخضار السوتيه."
    ],
    instructionsEn: [
      "Season tenderloin steaks with sea salt, pepper, and olive oil.",
      "Sear in a hot skillet with butter and rosemary for 3 minutes per side.",
      "Remove steaks to rest; in the same skillet, sauté sliced mushrooms and garlic.",
      "Pour cooking cream and simmer for 3 minutes until sauce thickens.",
      "Spoon creamy mushroom sauce over steaks and serve with sautéed veggies."
    ],
    image: "/images/beef_tenderloin.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-21",
    dayIndex: 21,
    dayNameAr: "يوم 21",
    dayNameEn: "Day 21",
    titleAr: "كفتة أرز بالصلصة الحمراء والبطاطس",
    titleEn: "Rice Kofta in Rich Tomato Sauce",
    descAr: "أصابع كفتة الأرز المصرية المقلية والمطبوخة في مكعبات البطاطس وصوص الطماطم المسبك بالثوم.",
    descEn: "Crispy fried Egyptian rice kofta fingers simmered with potato cubes in garlic tomato gravy.",
    prepTimeAr: "٤٥ دقيقة",
    prepTimeEn: "45 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "٥٠٠ جرام عجينة كفتة أرز طازجة من ديليشس",
      "٢ حبة بطاطس مكعبات صغيرة",
      "٢ كوب عصير طماطم + ملعقة صلصة",
      "٥ فصوص ثوم مفروم وسمن بلدي",
      "ملح، فلفل، بهارات، زيت للقلي"
    ],
    ingredientsEn: [
      "500g Fresh Rice Kofta Dough from Delicious Meats",
      "2 Small potatoes diced",
      "2 Cups tomato juice + 1 tbsp paste",
      "5 Minced garlic cloves & ghee",
      "Salt, black pepper, spices & oil for frying"
    ],
    instructionsAr: [
      "تُصبع كفتة الأرز إلى أصابع صغيرة باستعمال كف مدهون بالزيت.",
      "تُقلى أصابع الكفتة في زيت ساخن حتى تصبح ذهبية ومقرمشة.",
      "في إناء، يُشوح الثوم في السمن ثم يُسكب عصير الطماطم والصلصة.",
      "تُضاف مكعبات البطاطس والبهارات وتُترك لتنضج بنسبة ٧٠٪.",
      "تُضاف أصابع الكفتة المقلية وتُترك تغلي 10 دقائق وتُقدم مع الأرز الأبيض."
    ],
    instructionsEn: [
      "Shape rice kofta dough into small uniform fingers using oiled hands.",
      "Deep fry kofta fingers in hot oil until golden brown and crispy.",
      "In a pot, sauté garlic in ghee, then add tomato juice and paste.",
      "Add potato cubes and spices; simmer until potatoes are 70% cooked.",
      "Add fried kofta fingers, cook for 10 mins, and serve with white rice."
    ],
    image: "/images/dawood_pasha.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-22",
    dayIndex: 22,
    dayNameAr: "يوم 22",
    dayNameEn: "Day 22",
    titleAr: "دجاج كرسبي استربس مع صلصة الشيدر",
    titleEn: "Crispy Chicken Strips with Melted Cheddar",
    descAr: "أصابع صدور دجاج متبلة ومغطاة بتغليفة كرسبي ذهبية مقرمشة، تقدم مع صوص الشيدر الساخن.",
    descEn: "Golden crunchy breaded chicken tender strips served with warm gooey cheddar cheese dip.",
    prepTimeAr: "٣٠ دقيقة",
    prepTimeEn: "30 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام أصابع استربس دجاج طازجة",
      "١/٢ كوب حليب رايب + ملعقة خل",
      "ثوم وبصل بودرة، بابريكا، شطة، ملح",
      "دقيق، نشا، خفق بيض، كورن فليكس مطحون",
      "صوص جبن شيدر ساخن"
    ],
    ingredientsEn: [
      "750g Fresh Chicken Breast Strips",
      "1/2 Cup buttermilk + 1 tbsp vinegar",
      "Garlic & onion powder, paprika, chili, salt",
      "Flour, cornstarch, egg wash, crushed cornflakes",
      "Warm melted cheddar cheese sauce"
    ],
    instructionsAr: [
      "تُنقع أصابع الدجاج في اللبن الرايب والبهارات لمدة ساعتين.",
      "تُغمر كل قطعة في مخلوط الدقيق والنشا، ثم في الماء المثلج، ثم الدقيق مجدداً لعمل الطبقة المقرمشة.",
      "تُقلى في زيت غزير ساخن على درجة ١٧٠ م حتى تصبح الذهبية وشديدة القرمشة.",
      "تُصفى من الزيت على رف سلكي.",
      "تُقدم ساخنة بجانب صوص الجبن الشيدر والبطاطس المقرمشة."
    ],
    instructionsEn: [
      "Marinate chicken strips in seasoned buttermilk for 2 hours.",
      "Dredge strips in flour-cornstarch blend, dip in ice water, then dredge again for crinkly coating.",
      "Deep fry in hot oil at 170°C for 6-8 minutes until golden and extra crunchy.",
      "Drain on a wire rack to maintain crispiness.",
      "Serve hot alongside warm cheddar sauce and french fries."
    ],
    image: "/images/chicken_breasts.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-23",
    dayIndex: 23,
    dayNameAr: "يوم 23",
    dayNameEn: "Day 23",
    titleAr: "طاجن عكاريص (عكاوى) بالبصل المكرمل",
    titleEn: "Slow-Cooked Oxtail Tagine with Onions",
    descAr: "قطع عكاريص بقري طازجة مطبوخة في الفرن داخل طاجن فخار مع البصل المكرمل والفلفل والبهارات العطرية.",
    descEn: "Succulent beef oxtail slow-braised in a clay tagine with caramelized onions and warm spices.",
    prepTimeAr: "١٥٠ دقيقة",
    prepTimeEn: "150 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "١.٥ كيلو عكاريص (عكاوى) بقري طازجة من ديليشس",
      "١ كيلو بصل شرائح",
      "٢ قرن فلفل حامي ورومي",
      "سمن بلدي، حبهان، ورق لوري، قرفة، جوزة الطيب",
      "ملح وفلفل أسود ومكعب مرقة"
    ],
    ingredientsEn: [
      "1.5kg Fresh Beef Oxtail Segments from Delicious Meats",
      "1kg Thinly sliced red onions",
      "2 Green chili & sweet peppers",
      "Pure ghee, cardamom, bay leaves, cinnamon, nutmeg",
      "Salt, black pepper & beef broth"
    ],
    instructionsAr: [
      "تُسلق العكاريص مع المطيبات (بصل، حبهان، ورق لوري) حتى تنضج بنسبة ٨٠٪.",
      "في إناء، يُشوح البصل المفروم في السمن حتى يتكرمل وياخذ لوناً بنياً جميلاً.",
      "تُضاف قطع العكاوى والفلفل والبهارات وكوب من المرقة المركزية.",
      "تُنقل المكونات إلى طاجن فخار وتُغطى بالقصدير وتُخبز ساعتين في الفرن.",
      "تُقدم ساخنة مع الأرز الأبيض والخبز."
    ],
    instructionsEn: [
      "Parboil oxtail segments with aromatic spices until 80% tender.",
      "Sauté onions in ghee until deeply caramelized and sweet.",
      "Add tender oxtails, sliced peppers, spices, and 1 cup rich broth.",
      "Transfer to clay tagine, seal tightly with foil, and bake at 180°C for 2 hours.",
      "Serve piping hot with white rice and baladi pita bread."
    ],
    image: "/images/beef_shank.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-24",
    dayIndex: 24,
    dayNameAr: "يوم 24",
    dayNameEn: "Day 24",
    titleAr: "كباب ضاني مشوي على أسياخ الفحم",
    titleEn: "Charcoal Grilled Lamb Kebab Skewers",
    descAr: "مكعبات لحم ضاني طرية متبلة بماء البصل والطماطم والخل، مشوية على الفحم لتكتسب طعماً مدخناً رائداً.",
    descEn: "Tender lamb leg cubes marinated in onion juice, tomato puree, and vinegar, grilled over charcoal.",
    prepTimeAr: "٤٥ دقيقة",
    prepTimeEn: "45 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو مكعبات كباب ضاني من ديليشس",
      "ماء ٢ بصلة كبيرة + عصير طماطم",
      "٢ ملعقة كبيرة خل تفاح وعصير ليمون",
      "بهارات مشويات، فلفل أسود، ملح",
      "قطع لية ضاني صغيرة للتخلل بين قطع اللحم"
    ],
    ingredientsEn: [
      "1kg Fresh Lamb Kebab Cubes from Delicious Meats",
      "Juice of 2 onions + fresh tomato juice",
      "2 tbsp Apple cider vinegar & lemon juice",
      "BBQ spice blend, black pepper & salt",
      "Small lamb fat tail cubes for skewering"
    ],
    instructionsAr: [
      "تُنقع مكعبات اللحم الضاني في ماء البصل والخل والتوابل لمدة ٤ ساعات.",
      "تُرص مكعبات اللحم في الأسياخ مع قطع اللية الضاني.",
      "تُشوى على جمر الفحم المتوسط مع التقليب المستمر لمدة ١٠-١٢ دقيقة.",
      "تُرش بعصير الليمون والبقدونس المفروم فور رفيعها.",
      "تُقدم ساخنة مع الطحينة وسلطة الدقوس والخبز البلدي."
    ],
    instructionsEn: [
      "Marinate lamb cubes in onion juice, vinegar, and spices for 4 hours.",
      "Thread lamb cubes onto skewers alternating with small lamb fat pieces.",
      "Grill over glowing charcoal embers for 10-12 minutes, turning frequently.",
      "Garnish with fresh lemon juice and chopped parsley right off the grill.",
      "Serve hot with tahini sauce, fresh salad, and Egyptian baladi bread."
    ],
    image: "/images/lamb_chops.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-25",
    dayIndex: 25,
    dayNameAr: "يوم 25",
    dayNameEn: "Day 25",
    titleAr: "فاهيتا دجاج مكسيكية بالفلفل الملون",
    titleEn: "Sizzling Chicken Fajita with Bell Peppers",
    descAr: "شرائح صدور دجاج طرية متبلة ببهارات الفاهيتا ومطهوة على نار عالية مع الفلفل الألوان والبصل.",
    descEn: "Sizzling tender chicken breast strips seasoned with mexican spices, bell peppers, and onions.",
    prepTimeAr: "٢٥ دقيقة",
    prepTimeEn: "25 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام شرائح دجاج فاهيتا من ديليشس",
      "٣ فلفل ألوان (أحمر، أصفر، أخضر) شرائح",
      "١ بصلة كبيرة شرائح طولي",
      "بهارات فاهيتا (كمون، بابريكا، ثوم، فلفل حار)",
      "زيت زيتون وعصير ليمون حامض"
    ],
    ingredientsEn: [
      "750g Fresh Chicken Fajita Strips",
      "3 Bell peppers (red, yellow, green) sliced",
      "1 Large sliced red onion",
      "Fajita spices (cumin, paprika, garlic, chili)",
      "Olive oil & fresh lime juice"
    ],
    instructionsAr: [
      "تُتبل شرائح الدجاج ببهارات الفاهيتا وزيت الزيتون والليمون.",
      "تُسخن المقلاة الحديدية الساخنة جداً وتُشوح شرائح الدجاج حتى تنضج.",
      "تُرفع الدجاج وفي نفس المقلاة يُشوح الفلفل الألوان والبصل لمدة ٣ دقائق.",
      "يُعاد الدجاج للمقلاة وتُقلب جميع المكونات على نار عالية.",
      "تُقدم ساخنة ومطقطقة مع خبز التورتيلا وصوص الكريمة الحامضة."
    ],
    instructionsEn: [
      "Season chicken strips with fajita spices, olive oil, and lime juice.",
      "Sear chicken in a smoking hot iron skillet until fully cooked.",
      "Remove chicken; toss bell peppers and onions in the same skillet for 3 mins.",
      "Return chicken to skillet and toss everything together on high heat.",
      "Serve sizzling hot with warm flour tortillas and sour cream."
    ],
    image: "/images/chicken_breasts.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-26",
    dayIndex: 26,
    dayNameAr: "يوم 26",
    dayNameEn: "Day 26",
    titleAr: "كبدة اسكندراني حارة بالفلفل الأخضر وثوم",
    titleEn: "Spicy Alexandrian Liver with Chili & Garlic",
    descAr: "شرائح كبدة عصافيري صغيرة متبلة بالثوم والكمون والخل والفلفل الحار ومطهوة سريعا على نار عالية.",
    descEn: "Traditional Alexandrian beef liver bites flash-fried with minced garlic, cumin, vinegar, and hot green chili.",
    prepTimeAr: "٢٠ دقيقة",
    prepTimeEn: "20 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام كبدة اسكندراني متبلة طازجة من ديليشس",
      "٨ فصوص ثوم مفروم ناعماً",
      "٤ قرون فلفل أخضر رومي وحامي مقطع",
      "٢ ملعقة كبيرة خل أبيض وعصير ليمون",
      "كمون، كسبرة جافة، ملح، فلفل أسود، زيت"
    ],
    ingredientsEn: [
      "750g Fresh Alexandrian Beef Liver Strips from Delicious",
      "8 Minced garlic cloves",
      "4 Green & hot chili peppers sliced",
      "2 tbsp White vinegar & lemon juice",
      "Cumin, coriander, salt, black pepper & oil"
    ],
    instructionsAr: [
      "تُخلط الكبدة مع الثوم والكمون والخل والكسبرة وتُترك ١٥ دقيقة.",
      "تُسخن مقلاة كبيرة مع كمية مناسبة من الزيت على نار عالية جداً.",
      "تُوضع الكبدة وتُقلب سريعاً لمدة ٥ دقائق دون أن تجف.",
      "يُضاف الفلفل الأخضر والحامي في أخر دقيقة وتُرفع فوراً.",
      "تُعصر حبة ليمون وتُقدم في سندوتشات الفينو مع الطحينة."
    ],
    instructionsEn: [
      "Mix liver with garlic, cumin, vinegar, coriander, and let sit for 15 mins.",
      "Heat oil in a large skillet over maximum heat until smoking.",
      "Add liver strips and flash-fry quickly for 5 minutes without overcooking.",
      "Toss in sliced green chili peppers during the final minute.",
      "Squeeze fresh lemon and stuff into warm fino rolls with tahini."
    ],
    image: "/images/beef_tenderloin.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-27",
    dayIndex: 27,
    dayNameAr: "يوم 27",
    dayNameEn: "Day 27",
    titleAr: "صينية فراخ بالبطاطس والليمون في الفرن",
    titleEn: "Baked Chicken & Potato Tray with Lemon",
    descAr: "قطع دجاج طازجة متبلة بالثوم والليمون والزعتر ومخبوزة في الفرن مع شرائح البطاطس والبصل.",
    descEn: "Fresh chicken cuts baked over seasoned sliced potatoes and onions in a tangy garlic lemon sauce.",
    prepTimeAr: "٥٠ دقيقة",
    prepTimeEn: "50 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "دجاجة مقطعة ٤ أو ٨ قطع طازجة",
      "١ كيلو بطاطس شرائح سميكة",
      "٢ بصلة شرائح + ٦ فصوص ثوم مهروس",
      "١/٢ كوب عصير ليمون طازج + زيت زيتون",
      "زعتر بري، ملح، فلفل أسود، بهارات دجاج"
    ],
    ingredientsEn: [
      "1 Fresh Chicken cut into 4 or 8 pieces",
      "1kg Thickly sliced potatoes",
      "2 Sliced red onions + 6 crushed garlic cloves",
      "1/2 Cup fresh lemon juice + olive oil",
      "Oregano, salt, black pepper & chicken spices"
    ],
    instructionsAr: [
      "تُخلط شرائح البطاطس والبصل مع الثوم والزيت وعصير الليمون والبهارات.",
      "تُرص البطاطس في صينية الفرن وتُوضع قطع الدجاج فوقها.",
      "تُدهن قطع الدجاج بالتتبيلة جيداً وتُغطى الصينية بالقصدير.",
      "تُخبز في فرن مسخن على ٢٠٠ م لمدة ٤٥ دقيقة.",
      "يُرفع القصدير وتُحمر قطع الدجاج تحت الشواية حتى تصبح ذهبية."
    ],
    instructionsEn: [
      "Toss sliced potatoes and onions with garlic, olive oil, lemon juice, and herbs.",
      "Arrange potatoes in baking dish and lay seasoned chicken pieces on top.",
      "Cover dish tightly with foil and roast at 200°C for 45 minutes.",
      "Remove foil and broil chicken under grill until skin is crispy golden brown.",
      "Serve warm with fresh salad and Egyptian vermicelli rice."
    ],
    image: "/images/whole_chicken.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-28",
    dayIndex: 28,
    dayNameAr: "يوم 28",
    dayNameEn: "Day 28",
    titleAr: "سجق بلدي بدبس الرمان والفلفل الحار",
    titleEn: "Oriental Sausage with Pomegranate Molasses",
    descAr: "أصابع سجق ضاني بلدي محشوة بالبهارات ومطهوة في المقلاة مع الفلفل الألوان والصوص الحلو الحامض.",
    descEn: "Oriental lamb sausage links sautéed with bell peppers and glazed in a tangy pomegranate reduction.",
    prepTimeAr: "٢٥ دقيقة",
    prepTimeEn: "25 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "٧٥٠ جرام سجق بلدي طازج من ديليشس",
      "٣ ملاعق كبيرة دبس رمان ممتاز",
      "٢ قرن فلفل ألوان ورومي شرائح",
      "١ بصلة شرائح + ٣ فصوص ثوم",
      "زيت نباتي، ملح، فلفل أسود"
    ],
    ingredientsEn: [
      "750g Fresh Oriental Sausage from Delicious Meats",
      "3 tbsp Premium pomegranate molasses",
      "2 Sliced sweet bell peppers",
      "1 Sliced onion + 3 garlic cloves",
      "Vegetable oil, salt & pepper"
    ],
    instructionsAr: [
      "تُسخن المقلاة وتُشوح أصابع السجق في قليلاً من الزيت حتى تحمر.",
      "يُضاف الثوم والبصل والفلفل الألوان وتُقلب المكونات ٥ دقائق.",
      "يُسكب دبس الرمان وتُقلب السجق حتى يتغلف بالصوص ويتكرمل.",
      "تُرفع المقلاة من النار وتُرش بحبات الرمان الطازجة والبقدونس.",
      "تُقدم ساخنة في سندوتشات خبز بلدي أو مع بطاطس بوريه."
    ],
    instructionsEn: [
      "Sear sausage links in a hot skillet with oil until browned.",
      "Add garlic, onions, and bell peppers; sauté for 5 minutes.",
      "Pour pomegranate molasses over sausage and toss until caramelized.",
      "Remove heat and garnish with fresh pomegranate seeds and parsley.",
      "Serve warm in fresh pita bread or over mashed potatoes."
    ],
    image: "/images/sogoq_sharqi.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-29",
    dayIndex: 29,
    dayNameAr: "يوم 29",
    dayNameEn: "Day 29",
    titleAr: "كوبيبة لحم مقلية بالصنوبر والبهارات",
    titleEn: "Fried Beef Kobeba Stuffed with Pine Nuts",
    descAr: "أقراص كوبيبة البرغل واللحم المحشوة باللحم المفروم المتبل والصنوبر المحمص، مقلية حتى تصبح مقرمشة.",
    descEn: "Traditional fried bulgur meat shells filled with spiced minced beef and toasted pine nuts.",
    prepTimeAr: "٥٠ دقيقة",
    prepTimeEn: "50 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "١ كيلو كوبيبة لحم طازجة جاهزة من ديليشس",
      "زيت غزير للقلي",
      "صلصة طحينة وسلطة زبادي بالخيار للتقديم",
      "شرائح ليمون وبقدونس للتزيين"
    ],
    ingredientsEn: [
      "1kg Fresh Beef Kobeba Shells from Delicious Meats",
      "Deep oil for frying",
      "Tahini sauce and cucumber yogurt dip for serving",
      "Lemon wedges and fresh parsley for garnish"
    ],
    instructionsAr: [
      "تُخرج الكوبيبة من التجميد قبل القلي بـ ١٥ دقيقة.",
      "يُسخن الزيت الغزير في مقلاة عميقة حتى يصل لدرجة ١٨٠ م.",
      "تُقلى قطع الكوبيبة بحذر دون ازدحام المقلاة لمدة ٦-٨ دقائق.",
      "تُصفى الكوبيبة على محارم ورق المطبخ عندما تكتسب لوناً بني ذهبي مقرمش.",
      "تُقدم ساخنة مع سلطة الزبادي بالخيار والنعناع والمقبلات الشامية."
    ],
    instructionsEn: [
      "Take fresh kobeba out of freezer 15 minutes before frying.",
      "Heat deep oil in a deep fryer or saucepan to 180°C.",
      "Fry kobeba pieces gently without overcrowding for 6-8 minutes.",
      "Drain on paper towels when outer bulgur shell is golden brown and crisp.",
      "Serve piping hot with cucumber mint yogurt dip and appetizers."
    ],
    image: "/images/beef_roast.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-30",
    dayIndex: 30,
    dayNameAr: "يوم 30",
    dayNameEn: "Day 30",
    titleAr: "كبسة لحم ضاني بالبهارات الخليجية والمكسرات",
    titleEn: "Gulf Style Lamb Kabsa Rice with Roasted Nuts",
    descAr: "طبق أرز بسمتي فاخر مبهر ومطبوخ في مرقة اللحم الضاني الطري ومزين بالمكسرات المحمصة والزبيب.",
    descEn: "Long grain basmati rice cooked in fragrant lamb broth, topped with tender lamb leg chunks and toasted nuts.",
    prepTimeAr: "٧٥ دقيقة",
    prepTimeEn: "75 Mins",
    servingsAr: "٦ أفراد",
    servingsEn: "6 Servings",
    ingredientsAr: [
      "١.٢ كيلو قطع لحم ضاني فاخرة من ديليشس",
      "٣ كوب أرز بسمتي هندي طويل الحبة",
      "بهارات كبسة صحيحة (لومي، حبهان، قرفة، قرنفل)",
      "٢ طماطم مفرومة + ٢ ملعقة صلصة + بصل مفروم",
      "سمن بلدي، مكسرات محمصة (صنوبر، لوز، زبيب)"
    ],
    ingredientsEn: [
      "1.2kg Fresh Lamb Chunks from Delicious Meats",
      "3 Cups long grain basmati rice",
      "Whole Kabsa spices (black lime, cardamom, cinnamon, cloves)",
      "2 Chopped tomatoes + 2 tbsp paste + 1 chopped onion",
      "Ghee, toasted nuts (almonds, pine nuts, raisins)"
    ],
    instructionsAr: [
      "يُشوح البصل في السمن ثم تُضاف بهارات الكبسة الصحيحة ولحم الضاني وتُحمر المكونات.",
      "تُضاف الطماطم والصلصة والماء المغلي وتُغطى الإناء حتى ينضج اللحم تماماً.",
      "يُنقل اللحم إلى صينية وتحمر في الفرن.",
      "يُضاف الأرز البسمتي المغلي والمرقة المصفاة وتُطبخ الكبسة على نار هادئة.",
      "تُقدم الكبسة في سرفيس كبير وتُرص فوقها قطع اللحم الضاني وتُزين بالمكسرات."
    ],
    instructionsEn: [
      "Sauté onion in ghee, add whole kabsa spices and lamb chunks; sear well.",
      "Add tomatoes, tomato paste, and boiling water; simmer until lamb is tender.",
      "Transfer lamb to a baking tray and brown under oven broiler.",
      "Add basmati rice to the strained spiced broth and cook on low heat.",
      "Serve Kabsa rice on a large platter topped with roast lamb and toasted nuts."
    ],
    image: "/images/lamb_shoulder.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-31",
    dayIndex: 31,
    dayNameAr: "يوم 31",
    dayNameEn: "Day 31",
    titleAr: "صينية مشويات مشكلة فاخرة ديليشس ميتس",
    titleEn: "Delicious Meats Deluxe Mixed Grill Feast",
    descAr: "تشكيلة فاخرة تجمع بين ريش الضاني وكفتة الحاتي والشيش طاووق والستيك المشوي على الفحم.",
    descEn: "Ultimate festive platter featuring lamb chops, Haty kofta, shish tawook, and ribeye steak over charcoal.",
    prepTimeAr: "٦٠ دقيقة",
    prepTimeEn: "60 Mins",
    servingsAr: "٦ - ٨ أفراد",
    servingsEn: "6-8 Servings",
    ingredientsAr: [
      "٥٠٠ جم ريش ضاني + ٥٠٠ جم كفتة حاتي",
      "٥٠٠ جم شيش طاووق + ٥٠٠ جم ستيك مشوي",
      "مزيج التتبيلات الفاخرة وماء البصل والليمون",
      "خبز بلدي، بقدونس، طحينة، ثومية، سلطة خضراء"
    ],
    ingredientsEn: [
      "500g Lamb chops + 500g Haty kofta",
      "500g Shish tawook + 500g Ribeye steak",
      "Signature marinade blend, onion juice & lemon",
      "Baladi bread, parsley, tahini, toum garlic dip & green salad"
    ],
    instructionsAr: [
      "تُنقع قطع المشويات في التتبيلات الخاصة بكل نوع لمدة ٤ ساعات.",
      "يُجهز الفحم الطبيعي وتُشوى القطع حسب وقت طهي كل صنف.",
      "تُرص المشويات فور نضجها على فراش من البقدونس والخبز البلدي الساخن.",
      "تُغطى برغيف خبز بلدي لدقيقتين لتتشرب نكهة الشواء المدخنة.",
      "تُقدم الصينية الملكية مع سلطات الطحينة والتومية والمخللات."
    ],
    instructionsEn: [
      "Marinate each meat cut in its respective signature marinade for 4 hours.",
      "Grill all cuts over charcoal embers according to their respective ideal cooking times.",
      "Arrange freshly grilled meats on a large platter over parsley and warm flatbread.",
      "Cover platter with pita bread for 2 minutes to trap the aromatic smoke.",
      "Serve the royal feast with tahini, toum garlic dip, and pickles."
    ],
    image: "/images/recipe_saturday.png",
    relatedCutCategory: "meats"
  }
];

// LocalStorage helpers for browser side persistence
export function getStoredDailyRecipes(): DailyRecipe[] {
  if (typeof window === "undefined") return defaultDailyRecipes;
  try {
    const stored = localStorage.getItem("delicious_meats_daily_recipes");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const map = new Map<number, DailyRecipe>();
        defaultDailyRecipes.forEach(r => map.set(r.dayIndex, r));
        parsed.forEach((r: DailyRecipe) => {
          if (r && typeof r.dayIndex === "number") map.set(r.dayIndex, r);
        });
        return Array.from(map.values()).sort((a, b) => a.dayIndex - b.dayIndex);
      }
    }
  } catch (e) {
    console.error("Error reading daily recipes from localStorage", e);
  }
  return defaultDailyRecipes;
}

export function saveStoredDailyRecipes(recipes: DailyRecipe[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("delicious_meats_daily_recipes", JSON.stringify(recipes));
  } catch (e) {
    console.error("Error saving daily recipes to localStorage", e);
  }
}
