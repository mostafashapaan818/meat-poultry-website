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

const CLOUD_DB_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019fdcc308d70b77";

// Reliable default dataset
let memoryCache: MockOrder[] = [
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

let lastFetchTime = 0;

function normalizeOrder(item: any): MockOrder {
  return {
    id: item.id || `DM-${Math.floor(100000 + Math.random() * 900000)}`,
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
    totalValue: Number(item.totalValue || item.total || 0),
    status: item.status || "new",
    createdAt: item.createdAt || item.created_at || new Date().toISOString()
  };
}

async function fetchCloudOrdersFast(): Promise<MockOrder[]> {
  const now = Date.now();
  if (now - lastFetchTime < 3000 && memoryCache.length > 0) {
    return memoryCache;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const res = await fetch(CLOUD_DB_URL, {
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.orders) && json.data.orders.length > 0) {
        memoryCache = json.data.orders.map(normalizeOrder);
        lastFetchTime = now;
        return memoryCache;
      }
    }
  } catch (e) {
    // Return cached orders on network delay
  }
  return memoryCache;
}

async function saveCloudOrdersBackground(orders: MockOrder[]) {
  memoryCache = orders;
  lastFetchTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    await fetch(CLOUD_DB_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "DM-Orders-Master-Database",
        data: { orders }
      }),
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {
    console.error("Cloud DB bg save error:", e);
  }
}

// GET /api/orders
export async function GET() {
  const orders = await fetchCloudOrdersFast();
  return NextResponse.json({ orders });
}

// POST /api/orders
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const newOrder = normalizeOrder(body);
    const currentOrders = await fetchCloudOrdersFast();
    const filtered = currentOrders.filter((o) => o.id !== newOrder.id);
    const updated = [newOrder, ...filtered];
    
    saveCloudOrdersBackground(updated);

    return NextResponse.json({ success: true, order: newOrder, orders: updated });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/orders
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
    }

    const currentOrders = await fetchCloudOrdersFast();
    const updated = currentOrders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    });

    saveCloudOrdersBackground(updated);
    return NextResponse.json({ success: true, orders: updated });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
