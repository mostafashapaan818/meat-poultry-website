export interface DailyRecipe {
  id: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
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
}

export const defaultDailyRecipes: DailyRecipe[] = [
  {
    id: "day-sat",
    dayIndex: 6, // Saturday
    dayNameAr: "السبت",
    dayNameEn: "Saturday",
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
    id: "day-sun",
    dayIndex: 0, // Sunday
    dayNameAr: "الأحد",
    dayNameEn: "Sunday",
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
      "٢ ملعقة كبيرة عصير ليمون وخلف تفاح",
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
      "تُرص الريش الضاني وتُتبل بماء البصل وعصير الطماطم والليمون والبهارات.",
      "تُترك في التتبيلة داخل الثلاجة لمدة ٤ ساعات على الأقل لتتشرب النكهة.",
      "يُجهز شواية الفحم النباتي الطبيعي حتى يصبح الفحم جمراً أحمر هادئاً.",
      "تُرص الريش على شبكة الشواء وتُقلب كل دقيقتين حتى تكتسب لوناً محمراً شهياً.",
      "تُرفع وتُغطى بورق ألومنيوم لمدة ٥ دقائق وتُقدم مع الطحينة والخبز البلدي."
    ],
    instructionsEn: [
      "Marinate lamb chops in onion juice, tomato blend, lemon, and spices.",
      "Refrigerate for at least 4 hours to absorb rich oriental flavors.",
      "Prepare natural charcoal grill until hot and glowing softly.",
      "Grill chops for 3-4 minutes per side turning frequently until charred and juicy.",
      "Cover with foil for 5 minutes then serve warm with tahini and fresh pita bread."
    ],
    image: "/images/recipe_sunday.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-mon",
    dayIndex: 1, // Monday
    dayNameAr: "الإثنين",
    dayNameEn: "Monday",
    titleAr: "صدور دجاج بالكريمة والمشروم والروزماري",
    titleEn: "Creamy Rosemary & Mushroom Chicken",
    descAr: "صدور دجاج مخلية ومطبوخة في صلصة الكريمة الغنية بالمشروم الطازج ونكهة الروزماري العطرية الساحرة.",
    descEn: "Boneless chicken breasts cooked in rich cream sauce with fresh mushrooms and aromatic rosemary.",
    prepTimeAr: "٣٠ دقيقة",
    prepTimeEn: "30 Mins",
    servingsAr: "٣ أفراد",
    servingsEn: "3 Servings",
    ingredientsAr: [
      "٨٠٠ جرام صدور دجاج مخلية (بانيه) ديليشس",
      "٢٥٠ جرام مشروم طازج شرائح",
      "١.٥ كوب كريمة طهي طازجة",
      "٢ ملعقة زبدة مع ٢ فص ثوم مهروس",
      "أوراق روزماري وطازجة وملح وفلفل"
    ],
    ingredientsEn: [
      "800g Boneless Chicken Breast from Delicious Meats",
      "250g Sliced fresh mushrooms",
      "1.5 Cups fresh cooking cream",
      "2 tbsp Butter with 2 cloves minced garlic",
      "Fresh rosemary leaves, salt and pepper"
    ],
    instructionsAr: [
      "تُشوح صدور الدجاج بالزبدة والملح والفلفل على المقلاة حتى تكتسب لوناً ذهبياً ثم تُرفع.",
      "في نفس المقلاة، يُشوح الثوم والمشروم حتى يطرى ويذبل.",
      "تُضاف كريمة الطهي وأوراق الروزماري وتُترك لتغلي غلية خفيفة لمدة ٣ دقائق.",
      "يُعاد الدجاج المقلي إلى المقلاة ويُترك على نار هادئة لمدة ٧ دقائق حتى يتشرب الصلصة."
    ],
    instructionsEn: [
      "Sear chicken breasts in butter until golden on both sides, then set aside.",
      "In the same skillet, sauté garlic and sliced mushrooms until tender.",
      "Pour in cooking cream and fresh rosemary, bringing to a gentle simmer.",
      "Return chicken to the sauce and simmer on low heat for 7 minutes."
    ],
    image: "/images/poultry_banner.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-tue",
    dayIndex: 2, // Tuesday
    dayNameAr: "الثلاثاء",
    dayNameEn: "Tuesday",
    titleAr: "عرق فلتو بقري مشوي بالفرن بصلصة الجرافي",
    titleEn: "Oven Roast Beef Tenderloin with Gravy",
    descAr: "عرق فلتو بقري طري مشوي بالفرن مع البطاطس والجزر والأعشاب العطرية، يذوب في الفم مع صلصة الجرافي.",
    descEn: "Tender beef tenderloin roasted in the oven with root vegetables and savory gravy sauce.",
    prepTimeAr: "٥٠ دقيقة",
    prepTimeEn: "50 Mins",
    servingsAr: "٥ أفراد",
    servingsEn: "5 Servings",
    ingredientsAr: [
      "١.٥ كيلو عرق فلتو بقري (تندرلوين) كامل",
      "بطاطس وجزر وبصل قطع كبيرة",
      "١ كوب مرقة لحم مركزة",
      "زبدة وثوم وروزماري",
      "ملح وفلفل أسود مجروش"
    ],
    ingredientsEn: [
      "1.5kg Whole Beef Tenderloin Filet (Fletto)",
      "Chunked potatoes, carrots, and onions",
      "1 Cup rich beef stock",
      "Butter, garlic, and rosemary sprigs",
      "Salt and coarse black pepper"
    ],
    instructionsAr: [
      "يُربط عرق الفلتو بخيط المطبخ ويُتبل جيداً بالملح والفلفل والأعشاب.",
      "يُحمر العرق من كل الاتجاهات في زبدة ساخنة بحلة ثقيلة ليحبس السوائل.",
      "يُنقل إلى صينية فرن حوله الخضروات والجزر ويدخل فرناً ساخناً على حرارة ٢٠٠ مئوية لمدة ٤٠ دقيقة.",
      "يُستغل سائل الصينية لعمل صلصة الجرافي الغنية وتُقدم دافئة مع شرائح الفلتو."
    ],
    instructionsEn: [
      "Tie tenderloin with kitchen twine and season with salt, pepper, and herbs.",
      "Sear all sides in melted butter over high heat to lock in juices.",
      "Place in roasting pan surrounded by vegetables and bake at 200°C for 40 minutes.",
      "Use pan drippings to craft a rich gravy sauce, slicing filet thinly to serve."
    ],
    image: "/images/meats_banner.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-wed",
    dayIndex: 3, // Wednesday
    dayNameAr: "الأربعاء",
    dayNameEn: "Wednesday",
    titleAr: "شيش طاووق مدخن بالتوابل التركية والزبادي",
    titleEn: "Smoky Turkish Chicken Shish Taouk",
    descAr: "شيشت طاووق طري ومتبل بالزبادي والبابريكا المدخنة والمعجون العطري، مشوي في أسياخ مع الفلفل الألوان.",
    descEn: "Juicy chicken shish taouk marinated in yogurt, smoked paprika, and aromatic herbs.",
    prepTimeAr: "٤٠ دقيقة",
    prepTimeEn: "40 Mins",
    servingsAr: "٤ أفراد",
    servingsEn: "4 Servings",
    ingredientsAr: [
      "١ كيلو أوراك أو صدور دجاج مكعبات من ديليشس",
      "١ كوب زبادي بلدي طازج",
      "٢ ملعقة معجون طماطم وبابريكا مدخنة",
      "فلفل رومي ألوان وبصل قطع",
      "أسياخ خشبية مبلولة بالماء"
    ],
    ingredientsEn: [
      "1kg Diced Chicken Thighs/Breasts from Delicious Meats",
      "1 Cup plain Greek yogurt",
      "2 tbsp Tomato paste & smoked paprika",
      "Bell peppers and onions cubed",
      "Soaked wooden skewers"
    ],
    instructionsAr: [
      "تُنقع مكعبات الدجاج في التتبيلة المصنوعة من الزبادي والمعجون والبابريكا والليمون.",
      "تُرص مكعبات الدجاج بالتبادل مع الفلفل الألوان والبصل في الأسياخ.",
      "تُشوى الأسياخ على الجريل أو الصاج مع التقليب حتى تنضج تماماً.",
      "تُبخر بجمرة فحم صغيرة مع قطرة زيت داخل الصينية للحصول على نكهة الشواء الاصطناعية."
    ],
    instructionsEn: [
      "Marinate chicken cubes in yogurt, tomato paste, paprika, and lemon juice.",
      "Thread chicken onto wooden skewers alternating with peppers and onions.",
      "Grill on stovetop pan or outdoor grill, flipping until completely cooked.",
      "Pop a small burning coal with oil in the pan to infuse authentic smoky aromas."
    ],
    image: "/images/poultry_banner.png",
    relatedCutCategory: "poultry"
  },
  {
    id: "day-thu",
    dayIndex: 4, // Thursday
    dayNameAr: "الخميس",
    dayNameEn: "Thursday",
    titleAr: "برجر ديليشس المزدوج بالشيدر والصلصة السرية",
    titleEn: "Delicious Double Cheddar Smash Burger",
    descAr: "برجر بلدي فاخر مصنوع من أفضل قطعيات اللحم البقري الصافي، مع شرائح الشيدر الصفراء الذائبة والمخلل.",
    descEn: "Gourmet double smash burger crafted from prime beef blend with melted yellow cheddar and special sauce.",
    prepTimeAr: "٢٥ دقيقة",
    prepTimeEn: "25 Mins",
    servingsAr: "٣ أفراد",
    servingsEn: "3 Servings",
    ingredientsAr: [
      "٨٠٠ جرام لحم بقري مفروم (نسبة دسم ٢٠٪)",
      "شرائح جبن شيدر أصفر فاخر",
      "خبز برجر بريوش طازج ومحمص",
      "شرائح خيار مخلل وطماطم وخس",
      "صلصة البرجر الخاصة (مايونيز، كاتشب، خردل)"
    ],
    ingredientsEn: [
      "800g Fresh Ground Beef (20% fat ratio)",
      "Aged yellow cheddar cheese slices",
      "Toasted Brioche burger buns",
      "Pickles, tomato slices, and fresh lettuce",
      "Special burger sauce blend"
    ],
    instructionsAr: [
      "يُقسم اللحم المفروم إلى ٦ كرات متساوية دون عجن زاد لتظل هشة.",
      "تُسخن مقلاة صاج مسطحة وتوضع كرات اللحم وتُكبس بقوة لتصبح شرائح برجر رقيقة.",
      "تُتبل بالملح والفلفل فقط وتُطهى لمدة دقيقتين لكل جانب، وتوضع الجبنة لتذوب فوقها.",
      "يُحمص خبز البريوش وتُرص الشرائح مع المخلل والصلصة وتُقدم فوراً."
    ],
    instructionsEn: [
      "Divide ground beef into 6 equal round balls without overworking.",
      "Heat flat griddle skillet, place ball and smash flat with spatula.",
      "Season generously with salt & pepper, cook 2 mins per side and top with cheddar.",
      "Assemble inside toasted brioche bun with special sauce, pickles and lettuce."
    ],
    image: "/images/other_banner.png",
    relatedCutCategory: "meats"
  },
  {
    id: "day-fri",
    dayIndex: 5, // Friday
    dayNameAr: "الجمعة",
    dayNameEn: "Friday",
    titleAr: "دجاجة كاملة محمّرة بالفرن بالأعشاب والليمون",
    titleEn: "Herbed Lemon Oven Roasted Whole Chicken",
    descAr: "دجاجة كاملة فاخرة منظفة، محشوة بالليمون والأعشاب ومحمّرة بالفرن حتى تكتسب جلداً مقرمشاً ولحماً طرياً.",
    descEn: "Fresh whole chicken stuffed with lemon and herbs, roasted to golden crispy perfection.",
    prepTimeAr: "٦٠ دقيقة",
    prepTimeEn: "60 Mins",
    servingsAr: "٤ - ٥ أفراد",
    servingsEn: "4-5 Servings",
    ingredientsAr: [
      "دجاجة كاملة منظفة من ديليشس ميتس (١.٣ كيلو)",
      "شرائح ليمون وثوم صحيح",
      "١٠٠ جرام زبدة طرية متبلة بالأعشاب",
      "بابريكا، ثوم بودرة، بصل بودرة، ملح وفلفل",
      "بطاطس صغيرة محمرة كجانب"
    ],
    ingredientsEn: [
      "1 Whole Cleaned Chicken from Delicious Meats (1.3kg)",
      "Lemon wedges and whole garlic cloves",
      "100g Softened herb butter",
      "Paprika, garlic powder, onion powder, salt & pepper",
      "Baby potatoes for roasting side"
    ],
    instructionsAr: [
      "تُجفف الدجاجة تماماً بالمناديل الورقية لتضمن قرمشة الجلد.",
      "تُدهن الدجاجة بالزبدة والأعشاب والتوابل تحت الجلد وفوقه بانتظام.",
      "تُحشى الدجاجة بالليمون وفصوص الثوم والروزماري وتُرص مع البطاطس الصغير في صينية الفرن.",
      "تُخبز في فرن ساخن على حرارة ١٩٠ مئوية لمدة ٦٥ دقيقة حتى تتحمر وتكتسب لوناً ذهبياً أسطورياً."
    ],
    instructionsEn: [
      "Pat whole chicken thoroughly dry with paper towels for crispiness.",
      "Rub herb butter and spices under and over the skin evenly.",
      "Stuff cavity with lemon wedges, garlic cloves, and fresh rosemary sprigs.",
      "Roast at 190°C for 65 minutes alongside baby potatoes until skin is golden brown."
    ],
    image: "/images/recipe_friday.png",
    relatedCutCategory: "poultry"
  }
];

// LocalStorage helpers for browser side persistence
export function getStoredDailyRecipes(): DailyRecipe[] {
  if (typeof window === "undefined") return defaultDailyRecipes;
  try {
    const stored = localStorage.getItem("delicious_meats_daily_recipes");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === 7) {
        return parsed;
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
