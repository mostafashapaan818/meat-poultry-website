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

// Configurable external PHP MySQL Backend endpoint
const PHP_API_URL = process.env.NEXT_PUBLIC_PHP_API_URL || "http://delicious-meats.infinityfreeapp.com/orders.php";

// Robust local persistent order store
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

// Fetch orders from PHP MySQL Backend with fallback
async function fetchOrdersFromSource(): Promise<MockOrder[]> {
  if (PHP_API_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(PHP_API_URL, {
        cache: "no-store",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.orders)) {
          const remoteOrders = json.orders.map(normalizeOrder);
          // Merge local and remote
          const mergedMap = new Map<string, MockOrder>();
          remoteOrders.forEach((o: MockOrder) => mergedMap.set(o.id, o));
          localMemoryOrders.forEach((o: MockOrder) => {
            if (!mergedMap.has(o.id)) mergedMap.set(o.id, o);
          });
          localMemoryOrders = Array.from(mergedMap.values());
          return localMemoryOrders;
        }
      }
    } catch (e) {
      console.warn("PHP MySQL API fetch failed, serving local orders fallback.");
    }
  }
  return localMemoryOrders;
}

// Send order to PHP MySQL backend in background
async function syncOrderToPhpBackend(order: MockOrder) {
  if (!PHP_API_URL) return;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    await fetch(PHP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {
    console.error("Background sync order error:", e);
  }
}

// Sync order status update to PHP MySQL backend
async function syncStatusToPhpBackend(orderId: string, status: string) {
  if (!PHP_API_URL) return;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    await fetch(PHP_API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {
    console.error("Background status update error:", e);
  }
}

// GET /api/orders
export async function GET() {
  const orders = await fetchOrdersFromSource();
  return NextResponse.json({ success: true, orders });
}

// POST /api/orders
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const newOrder = normalizeOrder(body);

    // Update local memory store instantly to prevent any loss
    const filtered = localMemoryOrders.filter((o) => o.id !== newOrder.id);
    localMemoryOrders = [newOrder, ...filtered];

    // Async sync to PHP MySQL database on InfinityFree
    syncOrderToPhpBackend(newOrder);

    return NextResponse.json({ success: true, order: newOrder, orders: localMemoryOrders });
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

    // Update local memory
    localMemoryOrders = localMemoryOrders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    });

    // Async status update to PHP backend
    syncStatusToPhpBackend(orderId, status);

    return NextResponse.json({ success: true, orders: localMemoryOrders });
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
