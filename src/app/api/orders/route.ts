import { NextResponse } from "next/server";

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
const CLOUD_DB_URL = "https://api.restful-api.dev/objects/ff8081819ff5b11001a010834d4d3926";

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

  // 1. Fetch from Cloud DB (Instant Cross-Device Sync)
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
          mergedMap.set(norm.id, norm);
        });
      }
    }
  } catch (e) {
    console.warn("Cloud DB fetch error:", e);
  }

  // 2. Fetch from PHP API if configured
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

  // 3. Merge local in-memory items
  localMemoryOrders.forEach((o) => {
    if (!mergedMap.has(o.id)) mergedMap.set(o.id, o);
  });

  const all = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  localMemoryOrders = all;
  return all;
}

// Persist orders array to Cloud DB
async function persistOrdersToCloud(orders: MockOrder[]) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    await fetch(CLOUD_DB_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "delicious-meats-orders",
        data: { orders }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {
    console.error("Cloud DB persist error:", e);
  }
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

// POST /api/orders (Create Order)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const newOrder = normalizeOrder(body);

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
