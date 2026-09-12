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
  }
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


