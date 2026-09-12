import { NextResponse } from "next/server";
import { mockProducts, Product } from "@/data/products";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Dedicated persistent Cloud DB endpoint for products
const CLOUD_DB_PRODUCTS_URL = "https://api.restful-api.dev/objects/ff808181a067127101a095eca86001d3";
const LOCAL_FILE_PATH = path.join(process.cwd(), "src/data/products_store.json");

interface CloudStore {
  customProducts: Product[];
  editedProducts: Product[];
  deletedIds: string[];
}

// Global server memory cache across lambda invocations
let globalStoreMemory: CloudStore | null = null;

function normalizeProduct(item: any): Product {
  const rawAr = (item.nameAr || item.name_ar || "").toString().trim();
  const rawEn = (item.nameEn || item.name_en || "").toString().trim();

  const nameAr = rawAr || rawEn || "منتج جديد";
  const nameEn = rawEn || rawAr || "New Product";

  return {
    id: item.id || `m-custom-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    nameAr: nameAr,
    nameEn: nameEn,
    descAr: item.descAr || item.desc_ar || "",
    descEn: item.descEn || item.desc_en || "",
    price: Math.max(0, Number(item.price || 0)),
    category: (item.category === "poultry" || item.category === "other") ? item.category : "meats",
    isBestSeller: Boolean(item.isBestSeller),
    image: item.image?.trim() || "/images/meats_banner.png",
    weight: item.weight || "1 كجم"
  };
}

// Check if a base product was actually modified by staff
function isProductEdited(orig: Product, p: Product): boolean {
  return (
    orig.nameAr !== p.nameAr ||
    orig.nameEn !== p.nameEn ||
    Number(orig.price) !== Number(p.price) ||
    orig.category !== p.category ||
    (orig.descAr || "").trim() !== (p.descAr || "").trim() ||
    (orig.descEn || "").trim() !== (p.descEn || "").trim() ||
    (orig.image || "").trim() !== (p.image || "").trim() ||
    (orig.weight || "").trim() !== (p.weight || "").trim()
  );
}

// Merge base mockProducts with dynamic cloud store
function computeMergedProducts(store: CloudStore): Product[] {
  const { customProducts = [], editedProducts = [], deletedIds = [] } = store;

  // Filter base products
  let merged = mockProducts.filter((p) => !deletedIds.includes(p.id));

  // Apply edits to base products
  merged = merged.map((p) => {
    const ed = editedProducts.find((e) => e.id === p.id);
    return ed ? normalizeProduct({ ...p, ...ed }) : p;
  });

  // Active custom products
  const activeCustom = customProducts
    .filter((p) => !deletedIds.includes(p.id))
    .map(normalizeProduct);

  return [...activeCustom, ...merged];
}

// Read cloud store state
async function fetchCloudStore(): Promise<CloudStore> {
  // 1. Check Cloud DB first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(CLOUD_DB_PRODUCTS_URL, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        const store: CloudStore = {
          customProducts: Array.isArray(json.data.customProducts) ? json.data.customProducts : [],
          editedProducts: Array.isArray(json.data.editedProducts) ? json.data.editedProducts : [],
          deletedIds: Array.isArray(json.data.deletedIds) ? json.data.deletedIds : []
        };
        globalStoreMemory = store;
        return store;
      }
    }
  } catch (e) {
    console.warn("Cloud DB fetch store error:", e);
  }

  // 2. Check global memory if cloud DB timeout
  if (globalStoreMemory) {
    return globalStoreMemory;
  }

  // 3. Disk fallback check
  try {
    if (fs.existsSync(LOCAL_FILE_PATH)) {
      const content = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const store: CloudStore = {
          customProducts: parsed.customProducts || [],
          editedProducts: parsed.editedProducts || [],
          deletedIds: parsed.deletedIds || []
        };
        globalStoreMemory = store;
        return store;
      }
    }
  } catch (e) {}

  return { customProducts: [], editedProducts: [], deletedIds: [] };
}

// Persist cloud store state with retries
async function saveCloudStore(store: CloudStore) {
  globalStoreMemory = store;

  // Save disk cache if filesystem is writable
  try {
    const dir = path.dirname(LOCAL_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {}

  // Sync to Cloud DB with 3 retries
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch(CLOUD_DB_PRODUCTS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "delicious-meats-products",
          data: store
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        break;
      }
    } catch (e) {
      console.warn(`Cloud DB save store attempt ${attempt} error:`, e);
    }
  }
}

// GET /api/products
export async function GET() {
  const store = await fetchCloudStore();
  const products = computeMergedProducts(store);

  return NextResponse.json({ success: true, products, store }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

// POST /api/products (Add or update full products list)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid product payload" }, { status: 400 });
    }

    const currentStore = await fetchCloudStore();
    const baseIds = new Set(mockProducts.map((p) => p.id));

    let updatedProducts: Product[] = [];
    if (Array.isArray(body.products)) {
      updatedProducts = body.products.map(normalizeProduct);
    } else if (body.product || body.nameAr || body.nameEn) {
      const newProd = normalizeProduct(body.product || body);
      const existingMerged = computeMergedProducts(currentStore);
      updatedProducts = [newProd, ...existingMerged.filter((p) => p.id !== newProd.id)];
    } else {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    // Separate into custom vs edited vs deleted with strict property comparison
    const customProducts: Product[] = [];
    const editedProducts: Product[] = [];
    const presentIds = new Set(updatedProducts.map((p) => p.id));

    updatedProducts.forEach((p) => {
      if (!baseIds.has(p.id)) {
        customProducts.push(p);
      } else {
        const orig = mockProducts.find((m) => m.id === p.id);
        if (orig && isProductEdited(orig, p)) {
          editedProducts.push(p);
        }
      }
    });

    // Retain any existing custom products from store
    currentStore.customProducts.forEach((existingCustom) => {
      if (!customProducts.some((c) => c.id === existingCustom.id) && !currentStore.deletedIds.includes(existingCustom.id)) {
        customProducts.push(existingCustom);
      }
    });

    const deletedIds = mockProducts.filter((m) => !presentIds.has(m.id)).map((m) => m.id);

    const newStore: CloudStore = { customProducts, editedProducts, deletedIds };
    await saveCloudStore(newStore);

    const merged = computeMergedProducts(newStore);

    return NextResponse.json({ success: true, products: merged }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/products
export async function PUT(req: Request) {
  return POST(req);
}

// DELETE /api/products?id=...
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let idToDelete = searchParams.get("id");

    if (!idToDelete) {
      try {
        const body = await req.json();
        idToDelete = body?.id;
      } catch (e) {}
    }

    if (!idToDelete) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    const currentStore = await fetchCloudStore();
    currentStore.customProducts = currentStore.customProducts.filter((p) => p.id !== idToDelete);
    currentStore.editedProducts = currentStore.editedProducts.filter((p) => p.id !== idToDelete);

    if (mockProducts.some((m) => m.id === idToDelete) && !currentStore.deletedIds.includes(idToDelete)) {
      currentStore.deletedIds.push(idToDelete);
    }

    await saveCloudStore(currentStore);
    const merged = computeMergedProducts(currentStore);

    return NextResponse.json({ success: true, products: merged }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
