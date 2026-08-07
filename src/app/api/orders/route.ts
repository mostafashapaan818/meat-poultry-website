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

// In-memory cache for ultra-fast instant response
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

async function fetchCloudOrdersFast(): Promise<MockOrder[]> {
  const now = Date.now();
  // Use memory cache if updated within last 3 seconds
  if (now - lastFetchTime < 3000 && memoryCache.length > 0) {
    return memoryCache;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout max

    const res = await fetch(CLOUD_DB_URL, {
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.orders) && json.data.orders.length > 0) {
        memoryCache = json.data.orders;
        lastFetchTime = now;
        return memoryCache;
      }
    }
  } catch (e) {
    // Return memory cache if timeout or error occurs
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
    if (!body || !body.customerName || !body.phone) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const currentOrders = await fetchCloudOrdersFast();
    const newOrder: MockOrder = {
      id: body.id || `DM-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: body.customerName,
      phone: body.phone,
      governorate: body.governorate || "Cairo",
      area: body.area || "",
      address: body.address || "",
      items: body.items || [],
      totalValue: body.totalValue || 0,
      status: "new",
      createdAt: body.createdAt || new Date().toISOString(),
    };

    const filtered = currentOrders.filter((o) => o.id !== newOrder.id);
    const updated = [newOrder, ...filtered];
    
    // Save to memory cache immediately and update cloud DB in background
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
