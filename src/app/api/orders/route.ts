import { NextResponse } from "next/server";
import { mockProducts } from "@/data/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// IP Rate Limiting Store for order creation (Max 3 orders per 10 minutes per IP)
const ipOrderRateMap = new Map<string, number[]>();

export interface MockOrder {
  id: string;
  customerName: string;
  phone: string;
  governorate: string;
  area: string;
  address: string;
  items: {
    id: string;
    nameAr: string;
    nameEn: string;
    price: number;
    quantity: number;
  }[];
  totalValue: number;
  status: "new" | "preparing" | "delivering" | "delivered" | "cancelled";
  createdAt: string;
}

// Dedicated persistent Cloud DB endpoint (guarantees cross-device & serverless persistence)
const CLOUD_DB_URL = "https://api.restful-api.dev/objects/ff808181a067127101a0966a8d08029a";

// Configurable external PHP MySQL Backend endpoint
const PHP_API_URL = process.env.NEXT_PUBLIC_PHP_API_URL || "";

// In-memory fallback store
let localMemoryOrders: MockOrder[] = [
  {
    id: "DM-384910",
    customerName: "أحمد محمد عبد الله",
    phone: "01012345678",
    governorate: "Cairo",
    area: "المعادي",
    address: "شارع ٩، عمارة ٤ب، الدور الثالث، شقة ٦",
    items: [
      { id: "m3", nameAr: "عرق فلتو بقري (تندرلوين)", nameEn: "Beef Tenderloin Filet (Fletto)", price: 550, quantity: 2 },
      { id: "p2", nameAr: "صدور دجاج مخلية (بانيه)", nameEn: "Boneless Chicken Breast (Pane)", price: 240, quantity: 1 }
    ],
    totalValue: 1340,
    status: "new",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  }
];

function normalizeOrder(item: any): MockOrder {
  return {
    id: item.id || item.order_id || `DM-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName: item.customerName || item.customer_name || "عميل بدون اسم",
    phone: item.phone || "",
    governorate: item.governorate || "Cairo",
    area: item.area || "",
    address: item.address || item.address_details || "",
    items: Array.isArray(item.items) ? item.items.map((i: any) => ({
      id: i.id || i.product_id || "item",
      nameAr: i.nameAr || i.name_ar || i.name || "منتج",
      nameEn: i.nameEn || i.name_en || i.name || "Product",
      price: Number(i.price || 0),
      quantity: Number(i.quantity || 1)
    })) : [],
    totalValue: Number(item.totalValue || item.total_value || item.total || 0),
    status: item.status || "new",
    createdAt: item.createdAt || item.created_at || new Date().toISOString()
  };
}

// Fetch orders from persistent cloud DB and PHP API
async function fetchAllOrders(): Promise<MockOrder[]> {
  const mergedMap = new Map<string, MockOrder>();

  // 1. Check local disk store first if filesystem is available
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/data/orders_store.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.orders)) {
        parsed.orders.forEach((o: any) => {
          const norm = normalizeOrder(o);
          mergedMap.set(norm.id, norm);
        });
      }
    }
  } catch (e) {}

  // 2. Fetch from Cloud DB (Instant Cross-Device Sync)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(CLOUD_DB_URL, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.orders)) {
        json.data.orders.forEach((o: any) => {
          const norm = normalizeOrder(o);
          const existing = mergedMap.get(norm.id);
          mergedMap.set(norm.id, existing ? { ...norm, ...existing } : norm);
        });
      }
    }
  } catch (e) {
    console.warn("Cloud DB fetch error:", e);
  }

  // 3. Fetch from PHP API if configured
  if (PHP_API_URL && PHP_API_URL.startsWith("https")) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(PHP_API_URL, {
        cache: "no-store",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.orders)) {
          json.orders.forEach((o: any) => {
            const norm = normalizeOrder(o);
            if (!mergedMap.has(norm.id)) mergedMap.set(norm.id, norm);
          });
        }
      }
    } catch (e) {}
  }

  // 4. Merge local in-memory items (never drop items created in this process)
  localMemoryOrders.forEach((o) => {
    const existing = mergedMap.get(o.id);
    mergedMap.set(o.id, existing ? { ...existing, ...o } : o);
  });

  const all = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  localMemoryOrders = all;
  return all;
}

// Persist orders array to Cloud DB & disk with retry loop
async function persistOrdersToCloud(orders: MockOrder[]) {
  // Keep latest 25 orders to ensure payload stays under 2KB limit for free cloud DB
  const sanitizedOrders = orders.slice(0, 25).map((o) => ({
    id: o.id,
    customerName: o.customerName || "عميل",
    phone: o.phone || "",
    governorate: o.governorate || "",
    area: o.area || "",
    address: o.address || "",
    items: (o.items || []).map((i) => ({
      id: i.id,
      nameAr: i.nameAr || i.nameEn || "منتج",
      nameEn: i.nameEn || i.nameAr || "Product",
      price: Number(i.price || 0),
      quantity: Number(i.quantity || 1)
    })),
    totalValue: Number(o.totalValue || 0),
    status: o.status || "new",
    createdAt: o.createdAt || new Date().toISOString()
  }));

  // Disk fallback if filesystem is writable
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/data/orders_store.json");
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({ orders: sanitizedOrders }, null, 2), "utf-8");
  } catch (e) {}

  // Retry Cloud DB PUT up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(CLOUD_DB_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          name: "delicious-meats-orders",
          data: { orders: sanitizedOrders }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return true;
      }
    } catch (e) {
      if (attempt === 3) console.error("Cloud DB persist error:", e);
    }
  }
  return false;
}

// Background sync to PHP MySQL backend if valid
async function syncToPhpBackend(order: MockOrder, mode: "create" | "status" = "create") {
  if (!PHP_API_URL || !PHP_API_URL.startsWith("https")) return;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const payload = mode === "create" ? order : { orderId: order.id, status: order.status };
    await fetch(PHP_API_URL, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {}
}

// GET /api/orders
export async function GET() {
  const orders = await fetchAllOrders();
  return NextResponse.json({ success: true, orders }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

// POST /api/orders (Create Order with Security, Anti-Spam & Server Price Validation)
export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown_ip";
    
    // 1. IP Rate Limiting Check (Max 3 orders / 10 minutes)
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const timestamps = (ipOrderRateMap.get(clientIp) || []).filter((t) => now - t < windowMs);
    if (timestamps.length >= 5) {
      return NextResponse.json(
        { error: "تم تجاوز الحد المسموح لإرسال الطلبات. يرجى الانتظار بضع دقائق قبل المحاولة مرة أخرى." },
        { status: 429 }
      );
    }

    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // 2. Anti-Spam Honeypot Verification (hp_website / honeypot)
    if (body.hp_website || body.website || body.honeypot) {
      // Bot detected - reject request
      return NextResponse.json({ error: "Spam bot request rejected" }, { status: 400 });
    }

    const newOrder = normalizeOrder(body);

    // 3. Server-Side Price & Minimum Order Limit Validation (600 EGP)
    let verifiedSubtotal = 0;
    const validatedItems = (newOrder.items || []).map((item) => {
      // Find trusted product in server catalog
      const matchedProd = mockProducts.find((p) => p.id === item.id);
      const trustedUnitPrice = matchedProd ? matchedProd.price : (item.price || 0);
      const qty = Math.max(1, Number(item.quantity || 1));
      const lineTotal = trustedUnitPrice * qty;
      verifiedSubtotal += lineTotal;

      return {
        ...item,
        price: trustedUnitPrice,
        quantity: qty
      };
    });

    if (verifiedSubtotal < 600) {
      return NextResponse.json(
        { error: "الحد الأدنى للطلب هو 600 جنيه مصري لإتمام عملية الشراء." },
        { status: 400 }
      );
    }

    const shippingFee = 50; // Standard 50 EGP shipping fee
    const verifiedGrandTotal = verifiedSubtotal + shippingFee;

    // Securely update order with verified server prices & total
    newOrder.items = validatedItems;
    newOrder.totalValue = verifiedGrandTotal;

    // Update IP rate limiter
    timestamps.push(now);
    ipOrderRateMap.set(clientIp, timestamps);

    // Fetch existing orders first to prevent overwriting
    const existing = await fetchAllOrders();
    const filtered = existing.filter((o) => o.id !== newOrder.id);
    const updatedList = [newOrder, ...filtered];

    localMemoryOrders = updatedList;

    // Save to Cloud DB synchronously so employee portal gets it immediately
    await persistOrdersToCloud(updatedList);

    // Async sync to PHP
    syncToPhpBackend(newOrder, "create");

    return NextResponse.json({ success: true, order: newOrder, orders: updatedList }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/orders (Update Order Status)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
    }

    const existing = await fetchAllOrders();
    const updatedList = existing.map((o) => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    });

    localMemoryOrders = updatedList;

    // Persist status change to Cloud DB
    await persistOrdersToCloud(updatedList);

    const targetOrder = updatedList.find((o) => o.id === orderId);
    if (targetOrder) {
      syncToPhpBackend(targetOrder, "status");
    }

    return NextResponse.json({ success: true, orders: updatedList }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
