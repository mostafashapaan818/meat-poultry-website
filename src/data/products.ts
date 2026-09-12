export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  price: number;
  category: "meats" | "poultry" | "other";
  isBestSeller?: boolean;
  isAvailable?: boolean;
  image: string;
  weight?: string;
}

export const mockProducts: Product[] = [
  // ---------------------------------------------------------
  // قائمة المصنعات (meats)
  // ---------------------------------------------------------
  {
    id: "m_burger_lahm",
    nameAr: "برجر لحم",
    nameEn: "Beef Burger",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_sogoq_kandooz",
    nameAr: "سجق كندوز",
    nameEn: "Kandooz Sausage",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/sogoq_sharqi.png",
    weight: "1 كجم"
  },
  {
    id: "m_hawawshi_alex",
    nameAr: "حواوشي اسكندراني",
    nameEn: "Alexandrian Hawawshi",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_hawawshi_mozzarella",
    nameAr: "حواوشي موتزريلا",
    nameEn: "Mozzarella Hawawshi",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_kofta_dawood",
    nameAr: "كفته داود باشا",
    nameEn: "Dawood Pasha Kofta",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/dawood_pasha.png",
    weight: "1 كجم"
  },
  {
    id: "m_kofta_arz",
    nameAr: "كفته ارز",
    nameEn: "Rice Kofta",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/dawood_pasha.png",
    weight: "1 كجم"
  },
  {
    id: "m_kobeba_lahma",
    nameAr: "كوبيبه باللحمه",
    nameEn: "Meat Kobeba",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_roast.png",
    weight: "1 كجم"
  },
  {
    id: "m_kofta_seekh_shawi",
    nameAr: "كفته سيخ شوي",
    nameEn: "Grilled Skewer Kofta",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/kofta_haty.png",
    weight: "1 كجم"
  },
  {
    id: "m_kofta_seekh_dani",
    nameAr: "كفته سيخ ضاني",
    nameEn: "Lamb Skewer Kofta",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/kofta_haty.png",
    weight: "1 كجم"
  },
  {
    id: "m_kofta_forn",
    nameAr: "كفته فرن",
    nameEn: "Oven Baked Kofta",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/kofta_haty.png",
    weight: "1 كجم"
  },
  {
    id: "m_mombar_ready",
    nameAr: "ممبار جاهز علي القلي",
    nameEn: "Ready to Fry Mombar",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/sogoq_sharqi.png",
    weight: "1 كجم"
  },

  // ---------------------------------------------------------
  // قائمة اللحوم (meats)
  // ---------------------------------------------------------
  {
    id: "m_mafroam_melabes",
    nameAr: "لحمه مفرومه ملبس",
    nameEn: "Mixed Minced Beef",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_roast.png",
    weight: "1 كجم"
  },
  {
    id: "m_mafroam_ahmar",
    nameAr: "لحمه مفرومه احمر",
    nameEn: "Lean Minced Beef",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_roast.png",
    weight: "1 كجم"
  },
  {
    id: "m_kebda_sharayeh",
    nameAr: "كبده شرايح(متبل)",
    nameEn: "Marinated Sliced Liver",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_tenderloin.png",
    weight: "1 كجم"
  },
  {
    id: "m_kebda_alex",
    nameAr: "كبده اسكندراني(متبل)",
    nameEn: "Marinated Alexandrian Liver",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_tenderloin.png",
    weight: "1 كجم"
  },
  {
    id: "m_kebab_halla_ahmar",
    nameAr: "كباب حلة احمر",
    nameEn: "Lean Kebab Halla",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_shank.png",
    weight: "1 كجم"
  },
  {
    id: "m_lahma_khodar",
    nameAr: "لحمه خضار(سلق)",
    nameEn: "Boiling Stew Beef",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_shank.png",
    weight: "1 كجم"
  },
  {
    id: "m_boftek",
    nameAr: "بوفتيك",
    nameEn: "Beef Boftek Escalope",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_tenderloin.png",
    weight: "1 كجم"
  },
  {
    id: "m_steak",
    nameAr: "استيك",
    nameEn: "Beef Steak",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/ribeye_steak.png",
    weight: "1 كجم"
  },
  {
    id: "m_lahm_kolata",
    nameAr: "لحم كولاطه",
    nameEn: "Beef Culotte Cut",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_moza.png",
    weight: "1 كجم"
  },
  {
    id: "m_fletto_sharayeh",
    nameAr: "فلتوا شرائح متبل شوي",
    nameEn: "Marinated Fillet Slices for Grill",
    descAr: "",
    descEn: "",
    price: 500,
    category: "meats",
    image: "/images/beef_tenderloin.png",
    weight: "1 كجم"
  },

  // ---------------------------------------------------------
  // قائمة أسعار الدواجن (poultry)
  // ---------------------------------------------------------
  {
    id: "p_ferakh_motabal_shawi",
    nameAr: "فراخ متبل شوي",
    nameEn: "Marinated Grilled Chicken",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/whole_chicken.png",
    weight: "1 كجم"
  },
  {
    id: "p_ferakh_motabal_makhli",
    nameAr: "فراخ متبل شوي مخلي",
    nameEn: "Marinated Boneless Grilled Chicken",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_pane",
    nameAr: "تشكن بانيه",
    nameEn: "Chicken Pane",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_crispy",
    nameAr: "تشكن كرسبي",
    nameEn: "Crispy Chicken",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_strips",
    nameAr: "تشكن استربس",
    nameEn: "Chicken Strips",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_zinger",
    nameAr: "تشكن زنجر",
    nameEn: "Chicken Zinger",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_shish_tawook",
    nameAr: "شيش طاووق",
    nameEn: "Shish Tawook",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_shawarma_ferakh",
    nameAr: "شاورما فراخ",
    nameEn: "Chicken Shawarma",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_cordon_bleu",
    nameAr: "كوردن بلو",
    nameEn: "Chicken Cordon Bleu",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_fajita",
    nameAr: "تشكن فاهيتا",
    nameEn: "Chicken Fajita",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_grill",
    nameAr: "تشكن جريل",
    nameEn: "Grilled Chicken",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },
  {
    id: "p_chicken_francesco",
    nameAr: "تشكن فرانشيسكو",
    nameEn: "Chicken Francesco",
    descAr: "",
    descEn: "",
    price: 500,
    category: "poultry",
    image: "/images/chicken_breasts.png",
    weight: "1 كجم"
  },

  // ---------------------------------------------------------
  // 20 منتج جديد لحوم (غير معروض - سعر 0)
  // ---------------------------------------------------------
  { id: "m_new_1", nameAr: "منتج لحوم جديد 1", nameEn: "New Meat Cut 1", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_2", nameAr: "منتج لحوم جديد 2", nameEn: "New Meat Cut 2", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_3", nameAr: "منتج لحوم جديد 3", nameEn: "New Meat Cut 3", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_4", nameAr: "منتج لحوم جديد 4", nameEn: "New Meat Cut 4", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_5", nameAr: "منتج لحوم جديد 5", nameEn: "New Meat Cut 5", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_6", nameAr: "منتج لحوم جديد 6", nameEn: "New Meat Cut 6", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_7", nameAr: "منتج لحوم جديد 7", nameEn: "New Meat Cut 7", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_8", nameAr: "منتج لحوم جديد 8", nameEn: "New Meat Cut 8", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_9", nameAr: "منتج لحوم جديد 9", nameEn: "New Meat Cut 9", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_10", nameAr: "منتج لحوم جديد 10", nameEn: "New Meat Cut 10", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_11", nameAr: "منتج لحوم جديد 11", nameEn: "New Meat Cut 11", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_12", nameAr: "منتج لحوم جديد 12", nameEn: "New Meat Cut 12", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_13", nameAr: "منتج لحوم جديد 13", nameEn: "New Meat Cut 13", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_14", nameAr: "منتج لحوم جديد 14", nameEn: "New Meat Cut 14", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_15", nameAr: "منتج لحوم جديد 15", nameEn: "New Meat Cut 15", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_16", nameAr: "منتج لحوم جديد 16", nameEn: "New Meat Cut 16", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_17", nameAr: "منتج لحوم جديد 17", nameEn: "New Meat Cut 17", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_18", nameAr: "منتج لحوم جديد 18", nameEn: "New Meat Cut 18", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_19", nameAr: "منتج لحوم جديد 19", nameEn: "New Meat Cut 19", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },
  { id: "m_new_20", nameAr: "منتج لحوم جديد 20", nameEn: "New Meat Cut 20", descAr: "", descEn: "", price: 0, category: "meats", isAvailable: false, image: "/images/ribeye_steak.png", weight: "1 كجم" },

  // ---------------------------------------------------------
  // 20 منتج جديد دواجن (غير معروض - سعر 0)
  // ---------------------------------------------------------
  { id: "p_new_1", nameAr: "منتج دواجن جديد 1", nameEn: "New Poultry Item 1", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_2", nameAr: "منتج دواجن جديد 2", nameEn: "New Poultry Item 2", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_3", nameAr: "منتج دواجن جديد 3", nameEn: "New Poultry Item 3", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_4", nameAr: "منتج دواجن جديد 4", nameEn: "New Poultry Item 4", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_5", nameAr: "منتج دواجن جديد 5", nameEn: "New Poultry Item 5", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_6", nameAr: "منتج دواجن جديد 6", nameEn: "New Poultry Item 6", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_7", nameAr: "منتج دواجن جديد 7", nameEn: "New Poultry Item 7", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_8", nameAr: "منتج دواجن جديد 8", nameEn: "New Poultry Item 8", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_9", nameAr: "منتج دواجن جديد 9", nameEn: "New Poultry Item 9", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_10", nameAr: "منتج دواجن جديد 10", nameEn: "New Poultry Item 10", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_11", nameAr: "منتج دواجن جديد 11", nameEn: "New Poultry Item 11", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_12", nameAr: "منتج دواجن جديد 12", nameEn: "New Poultry Item 12", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_13", nameAr: "منتج دواجن جديد 13", nameEn: "New Poultry Item 13", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_14", nameAr: "منتج دواجن جديد 14", nameEn: "New Poultry Item 14", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_15", nameAr: "منتج دواجن جديد 15", nameEn: "New Poultry Item 15", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_16", nameAr: "منتج دواجن جديد 16", nameEn: "New Poultry Item 16", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_17", nameAr: "منتج دواجن جديد 17", nameEn: "New Poultry Item 17", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_18", nameAr: "منتج دواجن جديد 18", nameEn: "New Poultry Item 18", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_19", nameAr: "منتج دواجن جديد 19", nameEn: "New Poultry Item 19", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },
  { id: "p_new_20", nameAr: "منتج دواجن جديد 20", nameEn: "New Poultry Item 20", descAr: "", descEn: "", price: 0, category: "poultry", isAvailable: false, image: "/images/whole_chicken.png", weight: "1 كجم" },

  // ---------------------------------------------------------
  // 20 منتج جديد أخرى (غير معروض - سعر 0)
  // ---------------------------------------------------------
  { id: "o_new_1", nameAr: "منتج جديد آخر 1", nameEn: "New Other Item 1", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_2", nameAr: "منتج جديد آخر 2", nameEn: "New Other Item 2", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_3", nameAr: "منتج جديد آخر 3", nameEn: "New Other Item 3", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_4", nameAr: "منتج جديد آخر 4", nameEn: "New Other Item 4", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_5", nameAr: "منتج جديد آخر 5", nameEn: "New Other Item 5", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_6", nameAr: "منتج جديد آخر 6", nameEn: "New Other Item 6", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_7", nameAr: "منتج جديد آخر 7", nameEn: "New Other Item 7", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_8", nameAr: "منتج جديد آخر 8", nameEn: "New Other Item 8", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_9", nameAr: "منتج جديد آخر 9", nameEn: "New Other Item 9", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_10", nameAr: "منتج جديد آخر 10", nameEn: "New Other Item 10", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_11", nameAr: "منتج جديد آخر 11", nameEn: "New Other Item 11", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_12", nameAr: "منتج جديد آخر 12", nameEn: "New Other Item 12", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_13", nameAr: "منتج جديد آخر 13", nameEn: "New Other Item 13", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_14", nameAr: "منتج جديد آخر 14", nameEn: "New Other Item 14", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_15", nameAr: "منتج جديد آخر 15", nameEn: "New Other Item 15", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_16", nameAr: "منتج جديد آخر 16", nameEn: "New Other Item 16", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_17", nameAr: "منتج جديد آخر 17", nameEn: "New Other Item 17", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_18", nameAr: "منتج جديد آخر 18", nameEn: "New Other Item 18", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_19", nameAr: "منتج جديد آخر 19", nameEn: "New Other Item 19", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" },
  { id: "o_new_20", nameAr: "منتج جديد آخر 20", nameEn: "New Other Item 20", descAr: "", descEn: "", price: 0, category: "other", isAvailable: false, image: "/images/other.svg", weight: "1 كجم" }
];

// LocalStorage and API helpers for products
export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return mockProducts;
  try {
    const stored = localStorage.getItem("delicious_meats_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading products from localStorage", e);
  }
  return mockProducts;
}

export function saveStoredProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("delicious_meats_products", JSON.stringify(products));
  } catch (e) {
    console.error("Error saving products to localStorage", e);
  }
}

export async function fetchLiveProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        saveStoredProducts(data.products);
        return data.products;
      }
    }
  } catch (e) {
    console.warn("Failed to fetch live products API:", e);
  }
  return getStoredProducts();
}


