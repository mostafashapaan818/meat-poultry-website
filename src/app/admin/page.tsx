"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { mockProducts, Product, getStoredProducts, saveStoredProducts, fetchLiveProducts } from "@/data/products";
import { DailyRecipe, getStoredDailyRecipes, saveStoredDailyRecipes } from "@/data/dailyRecipes";
import { 
  Lock, User, LogOut, CheckCircle, Package, ListOrdered, 
  Trash2, Edit, Plus, Phone, MapPin, X, ChefHat, Sparkles, Clock, Users, BookOpen, UtensilsCrossed, Printer, FileText,
  Eye, EyeOff, Bell, Volume2
} from "lucide-react";

// Global AudioContext singleton for mobile WebKit & browser autoplay policies
let globalAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!globalAudioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      globalAudioCtx = new AudioCtx();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
};

const unlockAudioContext = () => {
  const ctx = getAudioContext();
  if (typeof window !== "undefined" && "Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission().catch(() => {});
  }
  return ctx;
};

// Web Audio API Chime Alert (Loud Bell Chime + Mobile Haptic Vibration)
const playOrderChime = () => {
  try {
    // 1. Mobile Haptic Vibration Alert
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([400, 150, 400, 150, 600]);
      } catch (e) {}
    }

    // 2. Web Audio Context Playback
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    const playNote = (freq: number, startTime: number, duration: number, volume = 0.6) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + startTime);
      gain.gain.setValueAtTime(volume, now + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startTime);
      osc.stop(now + startTime + duration);
    };

    // Loud, clear 3-step bell chime (E5 -> A5 -> C#6)
    playNote(659.25, 0, 0.4, 0.6);
    playNote(880.00, 0.18, 0.5, 0.7);
    playNote(1108.73, 0.38, 0.6, 0.8);
  } catch (e) {
    console.error("Audio chime error:", e);
  }
};

// Web Notification API Helper
const triggerWebNotification = (orderName: string, orderRef: string, total: number) => {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(`🔔 طلب جديد في ديليشس ميتس! #${orderRef}`, {
        body: `العميل: ${orderName}\nالإجمالي: ${total} ج.م`,
        icon: "/images/logo_v2.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(`🔔 طلب جديد في ديليشس ميتس! #${orderRef}`, {
            body: `العميل: ${orderName}\nالإجمالي: ${total} ج.م`,
            icon: "/images/logo_v2.png",
          });
        }
      });
    }
  }
};

interface MockOrder {
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
  contactedVia?: "whatsapp" | "phone" | null;
  contactedAt?: string | null;
}

// Initial mock orders to populate if localStorage is empty
const INITIAL_ORDERS: MockOrder[] = [
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
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
  },
  {
    id: "DM-294012",
    customerName: "Moustafa Shaaban",
    phone: "01287654321",
    governorate: "Giza",
    area: "المهندسين",
    address: "١٢ شارع جامعة الدول العربية، أمام مسجد مصطفى محمود",
    items: [
      { id: "m5", nameAr: "ريش ضاني فاخرة", nameEn: "Premium Lamb Chops (Riyash)", price: 480, quantity: 1 },
      { id: "o1", nameAr: "فحم نباتي طبيعي للشواء", nameEn: "Natural Charcoal for Grilling", price: 75, quantity: 2 }
    ],
    totalValue: 680,
    status: "preparing",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
  },
  {
    id: "DM-109482",
    customerName: "شريف فاروق",
    phone: "01123459876",
    governorate: "Alexandria",
    area: "سموحة",
    address: "عمارات الضباط، عمارة ٦، شقة ١٢",
    items: [
      { id: "p1", nameAr: "دجاجة كاملة منظفة وطازجة", nameEn: "Whole Cleaned Chicken", price: 185, quantity: 3 }
    ],
    totalValue: 605, // includes 50 EGP shipping
    status: "delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString() // 1 day ago
  }
];

export default function AdminDashboard() {
  const { t, language, dir } = useLanguage();
  
  // Auth states & Rate Limiting (5 attempts max / 15 min lockout)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutTimerText, setLockoutTimerText] = useState("");

  // Dashboard states
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "recipes">("orders");
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [dailyRecipes, setDailyRecipes] = useState<DailyRecipe[]>([]);
  
  // Real-time Notification Alert States & Refs
  const [newOrderAlert, setNewOrderAlert] = useState<MockOrder | null>(null);
  const knownOrderIdsRef = React.useRef<Set<string>>(new Set());
  const isOrdersInitializedRef = React.useRef<boolean>(false);

  // Modals / Form states
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Product Form State
  const [prodNameAr, setProdNameAr] = useState("");
  const [prodNameEn, setProdNameEn] = useState("");
  const [prodDescAr, setProdDescAr] = useState("");
  const [prodDescEn, setProdDescEn] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodCategory, setProdCategory] = useState<"meats" | "poultry" | "other">("meats");
  const [prodWeight, setProdWeight] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodIsAvailable, setProdIsAvailable] = useState(true);
  const [formError, setFormError] = useState("");

  // Recipe Modal State
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<DailyRecipe | null>(null);
  const [recTitleAr, setRecTitleAr] = useState("");
  const [recTitleEn, setRecTitleEn] = useState("");
  const [recDescAr, setRecDescAr] = useState("");
  const [recDescEn, setRecDescEn] = useState("");
  const [recPrepAr, setRecPrepAr] = useState("");
  const [recPrepEn, setRecPrepEn] = useState("");
  const [recServAr, setRecServAr] = useState("");
  const [recServEn, setRecServEn] = useState("");
  const [recIngredientsAr, setRecIngredientsAr] = useState("");
  const [recIngredientsEn, setRecIngredientsEn] = useState("");
  const [recInstructionsAr, setRecInstructionsAr] = useState("");
  const [recInstructionsEn, setRecInstructionsEn] = useState("");
  const [recImage, setRecImage] = useState("");
  const [recVideoUrl, setRecVideoUrl] = useState("");

  // Dynamically compute unique YYYY-MM-DD date keys from orders sorted newest first
  const availableOrderDates = React.useMemo(() => {
    const datesSet = new Set<string>();
    orders.forEach((o) => {
      const dateVal = o.createdAt || (o as any).created_at;
      if (dateVal) {
        const d = new Date(dateVal);
        if (!isNaN(d.getTime())) {
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          datesSet.add(`${yyyy}-${mm}-${dd}`);
        }
      }
    });
    return Array.from(datesSet).sort((a, b) => b.localeCompare(a));
  }, [orders]);

  const [selectedReportDate, setSelectedReportDate] = useState<string>("");

  // Auto-select first date when orders load
  useEffect(() => {
    if (availableOrderDates.length > 0 && (!selectedReportDate || !availableOrderDates.includes(selectedReportDate))) {
      setSelectedReportDate(availableOrderDates[0]);
    }
  }, [availableOrderDates, selectedReportDate]);

  // Fetch live orders from central server API so orders from phones appear in real time
  const fetchLiveOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          setOrders((prevOrders) => {
            const localStr = typeof window !== "undefined" ? localStorage.getItem("delicious_meats_orders") : null;
            const storedOrders: MockOrder[] = localStr ? JSON.parse(localStr) : [];

            const map = new Map<string, MockOrder>();
            // 1. Put current component state orders
            prevOrders.forEach((o) => map.set(o.id, o));
            // 2. Put local storage orders
            storedOrders.forEach((o) => map.set(o.id, o));
            // 3. Put server orders (merge status)
            data.orders.forEach((o: MockOrder) => {
              const existing = map.get(o.id);
              map.set(o.id, existing ? { ...existing, ...o } : o);
            });

            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            // Trigger notification sound & visual alert if new order arrives
            if (isOrdersInitializedRef.current) {
              merged.forEach((o) => {
                if (!knownOrderIdsRef.current.has(o.id) && o.status === "new") {
                  // Play immediate chime alarm 3 times to guarantee mobile playback upon order arrival
                  playOrderChime();
                  setTimeout(() => playOrderChime(), 700);
                  setTimeout(() => playOrderChime(), 1400);

                  setNewOrderAlert(o);
                  triggerWebNotification(o.customerName, o.id, o.totalValue);
                }
              });
            }

            // Mark all orders as known
            merged.forEach((o) => knownOrderIdsRef.current.add(o.id));
            isOrdersInitializedRef.current = true;

            try {
              localStorage.setItem("delicious_meats_orders", JSON.stringify(merged));
            } catch (e) {}

            return merged;
          });
        }
      }
    } catch (err) {
      console.error("Error fetching live orders:", err);
      try {
        const local = localStorage.getItem("delicious_meats_orders");
        if (local) setOrders(JSON.parse(local));
      } catch (e) {}
    }
  };

  // Load state on mount and start 3-second live polling
  useEffect(() => {
    // Unlock AudioContext and request notification permissions on user interaction (touch/click)
    const handleUserInteraction = () => {
      unlockAudioContext();
    };
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });

    // Auth Check & Rate Limiter initialization
    const authStatus = localStorage.getItem("delicious_meats_admin_auth");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }

    const savedAttempts = parseInt(localStorage.getItem("dm_login_attempts") || "0", 10);
    const savedLockout = parseInt(localStorage.getItem("dm_login_lockout") || "0", 10);
    if (!isNaN(savedAttempts)) setFailedAttempts(savedAttempts);
    if (!isNaN(savedLockout) && savedLockout > Date.now()) {
      setLockoutUntil(savedLockout);
    }

    // Load Orders from server
    fetchLiveOrders();

    // Auto-poll live orders every 3 seconds for orders placed on phones
    const orderInterval = setInterval(fetchLiveOrders, 3000);

    // Load Products live from server API
    const loadProducts = async () => {
      const liveProds = await fetchLiveProducts();
      setProducts(liveProds);
    };
    loadProducts();

    // Load Daily Recipes live from server API
    const loadRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.recipes && Array.isArray(data.recipes) && data.recipes.length > 0) {
            setDailyRecipes(data.recipes);
            saveStoredDailyRecipes(data.recipes);
            return;
          }
        }
      } catch (e) {}
      setDailyRecipes(getStoredDailyRecipes());
    };
    loadRecipes();

    return () => {
      clearInterval(orderInterval);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  // Lockout Countdown Timer Effect
  useEffect(() => {
    if (!lockoutUntil) return;

    const updateTimer = () => {
      const diff = lockoutUntil - Date.now();
      if (diff <= 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        setLockoutTimerText("");
        localStorage.removeItem("dm_login_lockout");
        localStorage.setItem("dm_login_attempts", "0");
        return;
      }
      const mins = Math.floor(diff / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setLockoutTimerText(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Handle Login with 5 authorized accounts & Rate Limiter
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check active lockout
    if (lockoutUntil && lockoutUntil > Date.now()) {
      setLoginError(
        language === "ar"
          ? `تم حظر محاولات الدخول مؤقتاً لكثرة المحاولات الخاطئة. يرجى الانتظار (${lockoutTimerText}) دقيقة.`
          : `Account locked due to multiple failed login attempts. Retry in (${lockoutTimerText}).`
      );
      return;
    }

    const enteredUser = usernameInput.trim().toLowerCase();
    const enteredPass = passwordInput.trim();

    const AUTHORIZED_STAFF = [
      { username: "amr elhwary", password: "1009" },
      { username: "mostafa_sales", password: "1009" },
      { username: "chef_kitchen", password: "1009" },
      { username: "delivery_admin", password: "1009" },
      { username: "staff_manager", password: "1009" },
    ];

    const isValid = AUTHORIZED_STAFF.some(
      (user) => user.username.toLowerCase() === enteredUser && user.password === enteredPass
    );

    if (isValid) {
      setIsLoggedIn(true);
      setLoginError("");
      setFailedAttempts(0);
      setLockoutUntil(null);
      localStorage.setItem("delicious_meats_admin_auth", "true");
      localStorage.removeItem("dm_login_lockout");
      localStorage.setItem("dm_login_attempts", "0");
      fetchLiveOrders();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem("dm_login_attempts", newAttempts.toString());

      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 15 * 60 * 1000; // 15 mins
        setLockoutUntil(lockoutTime);
        localStorage.setItem("dm_login_lockout", lockoutTime.toString());
        setLoginError(
          language === "ar"
            ? "تم حظر محاولات تسجيل الدخول مؤقتاً لمدة 15 دقيقة لتجاوز 5 محاولات خاطئة."
            : "Too many failed login attempts. Portal locked for 15 minutes."
        );
      } else {
        const remaining = 5 - newAttempts;
        setLoginError(
          language === "ar"
            ? `${t("loginError")} (متبقي ${remaining} محاولات قبل الحظر المؤقت)`
            : `${t("loginError")} (${remaining} attempts remaining before temporary lockout)`
        );
      }
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("delicious_meats_admin_auth");
  };

  // Update order status on server and local state
  const handleUpdateOrderStatus = async (orderId: string, newStatus: MockOrder["status"]) => {
    const updated = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updated);
    try {
      localStorage.setItem("delicious_meats_orders", JSON.stringify(updated));
    } catch (e) {}

    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus })
      });
    } catch (err) {
      console.error("API update order status error:", err);
    }
  };

  // Mark order customer as contacted via WhatsApp or Phone Call
  const handleMarkContacted = (orderId: string, method: "whatsapp" | "phone") => {
    const updated = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          contactedVia: method,
          contactedAt: new Date().toLocaleTimeString(language === "ar" ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })
        };
      }
      return order;
    });
    setOrders(updated);
    try {
      localStorage.setItem("delicious_meats_orders", JSON.stringify(updated));
    } catch (e) {}
  };

  // Delete product
  const handleDeleteProduct = async (prodId: string) => {
    if (!confirm(t("confirmDelete"))) return;
    const updated = products.filter((p) => p.id !== prodId);
    setProducts(updated);
    saveStoredProducts(updated);

    try {
      await fetch(`/api/products?id=${encodeURIComponent(prodId)}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error("API delete product error:", err);
    }
  };

  // Open Add Product Modal
  const openAddModal = () => {
    setModalMode("add");
    setSelectedProductId(null);
    setProdNameAr("");
    setProdNameEn("");
    setProdDescAr("");
    setProdDescEn("");
    setProdPrice("");
    setProdCategory("meats");
    setProdWeight("1 kg");
    setProdImage("/images/meats_banner.png");
    setProdIsAvailable(true);
    setFormError("");
    setShowProductModal(true);
  };

  // Open Edit Product Modal
  const openEditModal = (product: Product) => {
    setModalMode("edit");
    setSelectedProductId(product.id);
    setProdNameAr(product.nameAr);
    setProdNameEn(product.nameEn);
    setProdDescAr(product.descAr);
    setProdDescEn(product.descEn);
    setProdPrice(product.price.toString());
    setProdCategory(product.category);
    setProdWeight(product.weight || "1 kg");
    setProdImage(product.image || "");
    setProdIsAvailable(product.isAvailable !== false);
    setFormError("");
    setShowProductModal(true);
  };

  // Handle Product Form Submit
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameAr = (prodNameAr.trim() || prodNameEn.trim());
    const nameEn = (prodNameEn.trim() || prodNameAr.trim());

    if (!nameAr || !prodPrice) {
      setFormError(t("requiredField"));
      return;
    }

    const priceNum = parseFloat(prodPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError(language === "ar" ? "السعر يجب أن يكون رقماً صحيحاً" : "Price must be a valid positive number");
      return;
    }

    let updatedProducts: Product[] = [];

    if (modalMode === "add") {
      const newProd: Product = {
        id: `m-custom-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
        nameAr: nameAr,
        nameEn: nameEn,
        descAr: prodDescAr.trim() || nameAr,
        descEn: prodDescEn.trim() || nameEn,
        price: priceNum,
        category: prodCategory || "meats",
        weight: prodWeight.trim() || "1 كجم",
        image: prodImage.trim() || "/images/meats_banner.png",
        isAvailable: prodIsAvailable
      };
      updatedProducts = [newProd, ...products];
    } else {
      updatedProducts = products.map((p) => {
        if (p.id === selectedProductId) {
          return {
            ...p,
            nameAr: nameAr,
            nameEn: nameEn,
            descAr: prodDescAr.trim() || p.descAr,
            descEn: prodDescEn.trim() || p.descEn,
            price: priceNum,
            category: prodCategory || p.category,
            weight: prodWeight.trim() || p.weight || "1 كجم",
            image: prodImage.trim() || p.image,
            isAvailable: prodIsAvailable
          };
        }
        return p;
      });
    }

    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);
    setShowProductModal(false);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: updatedProducts })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          saveStoredProducts(data.products);
        }
      }
    } catch (err) {
      console.error("API save products error:", err);
    }
  };

  // Quick 1-click toggle product store visibility (Eye / EyeOff)
  const handleToggleProductAvailability = async (product: Product) => {
    const nextState = product.isAvailable === false ? true : false;
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, isAvailable: nextState };
      }
      return p;
    });
    setProducts(updatedProducts);
    saveStoredProducts(updatedProducts);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: updatedProducts })
      });
    } catch (err) {
      console.error("API toggle product availability error:", err);
    }
  };

  // PDF Export helper for orders
  const handleDownloadPdf = (order: MockOrder) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://deliciousmeats.vercel.app";
    const invoiceUrl = `${currentOrigin}/invoice?id=${encodeURIComponent(order.id)}`;
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(invoiceUrl)}`;

    const itemsRows = order.items
      .map(
        (item, idx) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${idx + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${item.nameAr}</strong><br/><small style="color: #666;">${item.nameEn}</small></td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.price} ج.م</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center; font-weight: bold;">${item.price * item.quantity} ج.م</td>
      </tr>
    `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>فاتورة طلب #${order.id} - ديليشس ميتس</title>
        <style>
          body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; margin: 0; padding: 25px; color: #222; background: #fff; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #D4AF37; padding-bottom: 15px; margin-bottom: 25px; }
          .header h1 { margin: 0; color: #111; font-size: 24px; }
          .header p { margin: 5px 0 0 0; color: #b8860b; font-weight: bold; font-size: 14px; }
          .qr-box { text-align: center; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 12px; }
          .qr-box img { width: 110px; height: 110px; display: block; margin: 0 auto 4px auto; }
          .qr-box small { font-size: 10px; color: #475569; font-weight: bold; display: block; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #fafafa; border: 1px solid #eee; padding: 15px 20px; border-radius: 10px; margin-bottom: 25px; }
          .info-box p { margin: 4px 0; font-size: 14px; }
          .info-title { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 6px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          th { background: #111; color: #fff; padding: 12px 10px; text-align: center; font-size: 13px; }
          .total-box { text-align: right; background: #fff8e6; border: 1px solid #ffe099; padding: 15px 20px; border-radius: 10px; }
          .total-box h2 { margin: 0; color: #b8860b; font-size: 22px; }
          .footer-note { text-align: center; margin-top: 40px; font-size: 12px; color: #777; border-top: 1px dashed #ccc; padding-top: 15px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>🥩 ديليشس ميتس - Delicious Meats</h1>
            <p>تفاصيل إيصال وفاتورة الطلب الرقمية / Customer Order Invoice</p>
          </div>
          <div class="qr-box">
            <img src="${qrCodeApiUrl}" alt="QR Code Invoice #${order.id}" />
            <small>📱 امسح الـ QR للفاتورة أونلاين</small>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-box">
            <div class="info-title">بيانات الطلب</div>
            <p><strong>رقم مرجع الطلب:</strong> #${order.id}</p>
            <p><strong>تاريخ الطلب:</strong> ${new Date(order.createdAt).toLocaleString("ar-EG")}</p>
            <p><strong>حالة الطلب:</strong> ${order.status}</p>
            <p><strong>طريقة الدفع:</strong> نقداً عند الاستلام</p>
          </div>
          <div class="info-box">
            <div class="info-title">بيانات العميل والشحن</div>
            <p><strong>اسم العميل:</strong> ${order.customerName}</p>
            <p><strong>رقم الهاتف:</strong> ${order.phone}</p>
            <p><strong>المحافظة والمنطقة:</strong> ${order.governorate} - ${order.area}</p>
            <p><strong>العنوان التفصيلي:</strong> ${order.address}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>سعر الوحدة</th>
              <th>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="total-box">
          <h2>الإجمالي الكلي: ${order.totalValue} ج.م</h2>
        </div>

        <div class="footer-note">
          شكراً لتسوقكم من ديليشس ميتس - الخط الساخن: 19000 - info@deliciousmeats.me<br/>
          <small style="color: #999;">رابط الفاتورة الرقمية: ${invoiceUrl}</small>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Daily Report PDF Export Handler for selected date
  const handlePrintDailyPdf = (targetDateStr: string) => {
    if (!targetDateStr) return;

    // Filter orders matching target Date YYYY-MM-DD
    const dayOrders = orders.filter((o) => {
      const dateVal = o.createdAt || (o as any).created_at;
      if (!dateVal) return false;
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return false;
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}` === targetDateStr;
    });

    if (dayOrders.length === 0) {
      alert(language === "ar" ? "لا توجد طلبات لهذا اليوم المحدد!" : "No orders for this selected date!");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const formattedDateTitle = new Date(targetDateStr + "T00:00:00").toLocaleDateString(
      language === "ar" ? "ar-EG" : "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    const totalRevenue = dayOrders.reduce((sum, o) => sum + (o.totalValue || (o as any).total || 0), 0);
    const totalItemsCount = dayOrders.reduce(
      (sum, o) => sum + (o.items || []).reduce((itemSum, item) => itemSum + (item.quantity || 1), 0),
      0
    );

    // Status counts
    const statusCounts: Record<string, number> = {
      new: 0,
      preparing: 0,
      delivering: 0,
      delivered: 0,
      cancelled: 0
    };
    dayOrders.forEach((o) => {
      if (statusCounts[o.status] !== undefined) statusCounts[o.status]++;
    });

    const rowsHtml = dayOrders
      .map((o, idx) => {
        const dateVal = o.createdAt || (o as any).created_at;
        const timeStr = dateVal ? new Date(dateVal).toLocaleTimeString(
          language === "ar" ? "ar-EG" : "en-US",
          { hour: "2-digit", minute: "2-digit" }
        ) : "";
        
        const itemsStr = (o.items || [])
          .map((i) => `${i.nameAr || (i as any).name_ar || i.nameEn} (×${i.quantity || 1})`)
          .join(" • ");

        const statusArMap: Record<string, string> = {
          new: "جديد 🆕",
          preparing: "قيد التجهيز 👨‍🍳",
          delivering: "في الطريق 🚚",
          delivered: "تم التسليم ✅",
          cancelled: "ملغي ❌"
        };

        return `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: bold;">${idx + 1}</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
              <strong style="color: #b8860b;">#${o.id}</strong><br/>
              <small style="color: #64748b;">${timeStr}</small>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
              <strong>${o.customerName || (o as any).customer_name}</strong><br/>
              <span dir="ltr" style="font-size: 12px; color: #475569;">📞 ${o.phone}</span>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px;">
              ${o.governorate} - ${o.area}<br/>
              <small style="color: #64748b;">${o.address || (o as any).address_details}</small>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px;">
              ${itemsStr}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 12px; font-weight: bold;">
              ${statusArMap[o.status] || o.status}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 900; color: #1e293b;">
              ${(o.totalValue || (o as any).total || 0).toLocaleString()} ج.م
            </td>
          </tr>
        `;
      })
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>تقرير مبيعات اليوم (${formattedDateTitle}) - ديليشس ميتس</title>
        <style>
          body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; margin: 0; padding: 25px; color: #1e293b; background: #fff; }
          .header { text-align: center; border-bottom: 3px solid #D4AF37; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #0f172a; font-size: 26px; }
          .header p { margin: 5px 0 0 0; color: #b8860b; font-weight: bold; font-size: 16px; }
          
          .summary-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; text-align: center; }
          .card-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 5px; }
          .card-value { font-size: 20px; font-weight: 900; color: #0f172a; }
          .card-value.highlight { color: #b8860b; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px; }
          th { background: #0f172a; color: #fff; padding: 12px 10px; text-align: center; font-size: 12px; }
          
          .grand-total-box { background: #fefce8; border: 2px solid #fef08a; padding: 20px; border-radius: 12px; text-align: center; margin-top: 20px; }
          .grand-total-box h2 { margin: 0; color: #854d0e; font-size: 24px; }
          .grand-total-box p { margin: 5px 0 0 0; color: #a16207; font-weight: bold; font-size: 14px; }

          .footer-note { text-align: center; margin-top: 35px; font-size: 12px; color: #94a3b8; border-top: 1px dashed #cbd5e1; padding-top: 15px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🥩 ديليشس ميتس - Delicious Meats</h1>
          <p>📊 تقرير المبيعات والطلبات اليومي | ${formattedDateTitle}</p>
        </div>

        <div class="summary-cards">
          <div class="card">
            <div class="card-title">إجمالي عدد الطلبات</div>
            <div class="card-value">${dayOrders.length} طلب</div>
          </div>
          <div class="card">
            <div class="card-title">إجمالي مبيعات اليوم</div>
            <div class="card-value highlight">${totalRevenue.toLocaleString()} ج.م</div>
          </div>
          <div class="card">
            <div class="card-title">عدد المنتجات المباعة</div>
            <div class="card-value">${totalItemsCount} قطعة</div>
          </div>
          <div class="card">
            <div class="card-title">الطلبات المسلمة</div>
            <div class="card-value" style="color: #16a34a;">${statusCounts.delivered} طلب</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>رقم الطلب والتاريخ</th>
              <th>بيانات العميل</th>
              <th>عنوان الشحن</th>
              <th>تفاصيل الأصناف</th>
              <th>حالة الطلب</th>
              <th>إجمالي الحساب</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="grand-total-box">
          <h2>💰 إجمالي حساب مبيعات اليوم: ${totalRevenue.toLocaleString()} جنيه مصري</h2>
          <p>تم استخراج هذا التقرير بتاريخ: ${new Date().toLocaleString("ar-EG")}</p>
        </div>

        <div class="footer-note">
          ديليشس ميتس - الخط الساخن: 19000 - info@deliciousmeats.me
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Open Recipe Edit Modal
  const openEditRecipeModal = (recipe: DailyRecipe) => {
    setSelectedRecipe(recipe);
    setRecTitleAr(recipe.titleAr);
    setRecTitleEn(recipe.titleEn);
    setRecDescAr(recipe.descAr);
    setRecDescEn(recipe.descEn);
    setRecPrepAr(recipe.prepTimeAr);
    setRecPrepEn(recipe.prepTimeEn);
    setRecServAr(recipe.servingsAr);
    setRecServEn(recipe.servingsEn);
    setRecIngredientsAr(recipe.ingredientsAr.join("\n"));
    setRecIngredientsEn(recipe.ingredientsEn.join("\n"));
    setRecInstructionsAr(recipe.instructionsAr.join("\n"));
    setRecInstructionsEn(recipe.instructionsEn.join("\n"));
    setRecImage(recipe.image);
    setRecVideoUrl(recipe.videoUrl || "");
    setShowRecipeModal(true);
  };

  // Handle Recipe Submit
  const handleRecipeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipe) return;

    const updatedRecipes = dailyRecipes.map((r) => {
      if (r.id === selectedRecipe.id) {
        return {
          ...r,
          titleAr: recTitleAr,
          titleEn: recTitleEn,
          descAr: recDescAr,
          descEn: recDescEn,
          prepTimeAr: recPrepAr,
          prepTimeEn: recPrepEn,
          servingsAr: recServAr,
          servingsEn: recServEn,
          ingredientsAr: recIngredientsAr.split("\n").map((line) => line.trim()).filter(Boolean),
          ingredientsEn: recIngredientsEn.split("\n").map((line) => line.trim()).filter(Boolean),
          instructionsAr: recInstructionsAr.split("\n").map((line) => line.trim()).filter(Boolean),
          instructionsEn: recInstructionsEn.split("\n").map((line) => line.trim()).filter(Boolean),
          image: recImage,
          videoUrl: recVideoUrl.trim() || undefined
        };
      }
      return r;
    });

    setDailyRecipes(updatedRecipes);
    saveStoredDailyRecipes(updatedRecipes);
    setShowRecipeModal(false);
    setSelectedRecipe(null);

    try {
      await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipes: updatedRecipes })
      });
    } catch (err) {
      console.error("API save recipes error:", err);
    }
  };

  // Render Login Component
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16 bg-dark-bg flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-6 py-10 bg-dark-surface border border-dark-border rounded-2xl shadow-2xl">
            <div className="text-center space-y-2 mb-8">
              <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{t("adminLoginTitle")}</h1>
              <p className="text-xs text-dark-text-muted">{t("adminLoginSub")}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-500 font-semibold text-center">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{t("username")}</span>
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder={language === "ar" ? "أدخل اسم المستخدم" : "Enter username"}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" />
                  <span>{t("password")}</span>
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-primary text-dark-bg font-extrabold text-center hover:bg-primary-hover active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20"
              >
                {t("loginButton")}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="flex flex-col min-h-screen relative">
      
      {/* Real-time Toast Alert Notification when new order arrives */}
      {newOrderAlert && (
        <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-emerald-300/80 flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl shrink-0">
              <Bell className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="text-right space-y-0.5">
              <h4 className="font-black text-sm text-white">🔔 طلب جديد وارد الآن!</h4>
              <p className="text-xs text-emerald-100 font-bold">
                طلب #{newOrderAlert.id} • العميل: {newOrderAlert.customerName}
              </p>
              <p className="text-[11px] text-emerald-200">
                الإجمالي: {newOrderAlert.totalValue} ج.م | {newOrderAlert.governorate} - {newOrderAlert.area}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              onClick={() => {
                setNewOrderAlert(null);
                setActiveTab("orders");
              }}
              className="px-3 py-1.5 rounded-lg bg-white text-emerald-900 font-black text-xs hover:bg-emerald-100 transition-colors shadow-md"
            >
              معاينة ✓
            </button>
            <button
              onClick={() => setNewOrderAlert(null)}
              className="text-[10px] text-emerald-200 hover:text-white underline text-center"
            >
              إغلاق ✕
            </button>
          </div>
        </div>
      )}

      {/* Mini Admin Nav Header */}
      <header className="sticky top-0 z-40 w-full bg-[#08080A] border-b border-dark-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-lg">
              🛠
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white">{t("dashboardTitle")}</h1>
              <span className="text-[10px] text-primary font-bold tracking-widest">{t("brandName")} STAFF</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                playOrderChime();
                if (typeof window !== "undefined" && "Notification" in window) {
                  Notification.requestPermission();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-xs font-bold text-primary hover:bg-primary/20 transition-all duration-200"
              title="اضغط هنا لتفعيل إشعارات الصوت والمتصفح عند وصول أي طلب جديد"
            >
              <Bell className="h-4 w-4 animate-pulse text-primary" />
              <span className="hidden sm:inline">تفعيل إشعارات الصوت 🔔</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("logoutButton")}</span>
            </button>
            <Link
              href="/"
              className="text-xs font-bold text-primary hover:underline"
            >
              {language === "ar" ? "معاينة المتجر" : "Preview Store"}
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs Menu */}
      <div className="bg-dark-surface border-b border-dark-border py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "orders"
                ? "bg-primary text-dark-bg shadow"
                : "text-gray-400 hover:text-white hover:bg-dark-bg/40"
            }`}
          >
            <ListOrdered className="h-4.5 w-4.5" />
            <span>{t("ordersTab")}</span>
            <span className="ml-1 bg-dark-bg/20 text-[10px] px-1.5 py-0.5 rounded-full font-black">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "products"
                ? "bg-primary text-dark-bg shadow"
                : "text-gray-400 hover:text-white hover:bg-dark-bg/40"
            }`}
          >
            <Package className="h-4.5 w-4.5" />
            <span>{t("productsTab")}</span>
            <span className="ml-1 bg-dark-bg/20 text-[10px] px-1.5 py-0.5 rounded-full font-black">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("recipes")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "recipes"
                ? "bg-primary text-dark-bg shadow"
                : "text-gray-400 hover:text-white hover:bg-dark-bg/40"
            }`}
          >
            <ChefHat className="h-4.5 w-4.5" />
            <span>{language === "ar" ? "وصفات طبق اليوم" : "Daily Recipes"}</span>
            <span className="ml-1 bg-dark-bg/20 text-[10px] px-1.5 py-0.5 rounded-full font-black">
              {dailyRecipes.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Dashboard body */}
      <main className="flex-grow py-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* ORDERS TAB PANEL */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              
              {/* Header Refresh & Daily Report Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark-surface p-4 sm:p-5 rounded-2xl border border-dark-border shadow-lg">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>📋</span>
                    <span>{t("ordersTab")} ({orders.length})</span>
                  </h2>
                  <p className="text-xs text-dark-text-muted mt-0.5">
                    {language === "ar"
                      ? "تصل الطلبات من الهواتف أونلاين وتتحدث تلقائياً كل بضع ثوانٍ"
                      : "Orders sync automatically from mobile devices in real time"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  {/* Refresh Button */}
                  <button
                    onClick={fetchLiveOrders}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-dark-bg font-extrabold text-xs hover:bg-primary-hover active:scale-95 transition-all shadow-md shadow-primary/20"
                  >
                    <span className="text-sm">🔄</span>
                    <span>{language === "ar" ? "تحديث الطلبات الآن" : "Refresh Orders"}</span>
                  </button>

                  {/* Daily Report Date Picker + Print PDF Button */}
                  <div className="flex items-center gap-2 bg-dark-bg border border-dark-border p-1 rounded-xl">
                    <select
                      value={selectedReportDate}
                      onChange={(e) => setSelectedReportDate(e.target.value)}
                      className="bg-dark-bg text-white text-xs font-bold px-2 py-1.5 rounded-lg focus:outline-none focus:border-primary border border-transparent"
                    >
                      {availableOrderDates.length === 0 ? (
                        <option value="">{language === "ar" ? "لا توجد تواريخ" : "No dates"}</option>
                      ) : (
                        availableOrderDates.map((dateKey) => {
                          const displayDate = new Date(dateKey + "T00:00:00").toLocaleDateString(
                            language === "ar" ? "ar-EG" : "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          );
                          return (
                            <option key={dateKey} value={dateKey}>
                              📅 {displayDate}
                            </option>
                          );
                        })
                      )}
                    </select>

                    <button
                      onClick={() => handlePrintDailyPdf(selectedReportDate)}
                      disabled={!selectedReportDate}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black hover:bg-amber-500 hover:text-dark-bg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      title={language === "ar" ? "طباعة تقرير مبيعات اليوم المحدد PDF" : "Print Selected Day PDF Report"}
                    >
                      <Printer className="h-4 w-4" />
                      <span>{language === "ar" ? "طباعة تقرير اليوم PDF" : "Print Day PDF"}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Responsive Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => {
                  const statusColors = {
                    new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    preparing: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                    delivering: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                    delivered: "bg-green-500/10 text-green-400 border-green-500/20",
                    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
                  };

                  const dateStr = new Date(order.createdAt).toLocaleTimeString(
                    language === "ar" ? "ar-EG" : "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  );

                  return (
                    <div
                      key={order.id}
                      className="bg-dark-surface border border-dark-border rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-primary/20 transition-all duration-300"
                    >
                      {/* Top Header Card */}
                      <div className="flex items-start justify-between border-b border-dark-border/40 pb-3">
                        <div>
                          <span className="text-xs font-black text-white block">
                            {t("orderId")} {order.id}
                          </span>
                          <span className="text-[10px] text-dark-text-muted mt-0.5 block">
                            {dateStr}
                          </span>
                        </div>
                        
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColors[order.status]}`}>
                          {order.status === "new" && t("statusNew")}
                          {order.status === "preparing" && t("statusPreparing")}
                          {order.status === "delivering" && t("statusOutForDelivery")}
                          {order.status === "delivered" && t("statusDelivered")}
                          {order.status === "cancelled" && t("statusCancelled")}
                        </span>
                      </div>

                      {/* Customer Details info & Contact Actions */}
                      <div className="space-y-3 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <span className="text-primary font-bold">👤</span>
                            <div>
                              <span className="text-white font-bold block">{order.customerName}</span>
                              <a
                                href={`tel:${order.phone}`}
                                onClick={() => handleMarkContacted(order.id, "phone")}
                                className="text-primary font-medium hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="h-3.5 w-3.5" />
                                <span dir="ltr">{order.phone}</span>
                              </a>
                            </div>
                          </div>

                          {/* Contact Status Badge Indicator */}
                          {order.contactedVia && (
                            <span
                              className={`px-2 py-1 rounded-lg text-[10px] font-black border flex items-center gap-1 shrink-0 ${
                                order.contactedVia === "whatsapp"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                              }`}
                              title={order.contactedAt ? `تم في ${order.contactedAt}` : ""}
                            >
                              {order.contactedVia === "whatsapp" ? "🟢 تم التواصل واتساب ✓" : "🔵 تم الاتصال هاتفياً ✓"}
                            </span>
                          )}
                        </div>

                        {/* Customer Contact Action Buttons (WhatsApp & Call) */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              const cleanPhone = order.phone.replace(/\D/g, "");
                              const phoneWithCountry = cleanPhone.startsWith("0") ? `2${cleanPhone}` : cleanPhone;
                              const msg = `أهلاً بك يا ${order.customerName}، معكم متجر ديليشس ميتس 🥩 بخصوص طلبكم رقم #${order.id} بقيمة ${order.totalValue} ج.م`;
                              window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`, "_blank");
                              handleMarkContacted(order.id, "whatsapp");
                            }}
                            className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
                          >
                            <span>💬</span>
                            <span>{language === "ar" ? "تواصل واتساب" : "WhatsApp"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              window.location.href = `tel:${order.phone}`;
                              handleMarkContacted(order.id, "phone");
                            }}
                            className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/40 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-sm"
                          >
                            <span>📞</span>
                            <span>{language === "ar" ? "اتصال هاتفياً" : "Call Phone"}</span>
                          </button>
                        </div>

                        <div className="flex items-start gap-2 pt-1 border-t border-dark-border/40">
                          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 leading-normal">
                            {order.governorate}, {order.area}, {order.address}
                          </span>
                        </div>
                      </div>

                      {/* Order items lists */}
                      <div className="bg-dark-bg/60 border border-dark-border/40 rounded-xl p-3 space-y-2 max-h-36 overflow-y-auto">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <span className="text-gray-300 truncate max-w-[70%]">
                              {language === "ar" ? item.nameAr : item.nameEn}
                            </span>
                            <span className="text-white font-bold flex-shrink-0">
                              {item.quantity} x {item.price} ج.م
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Order controls */}
                      <div className="border-t border-dark-border/40 pt-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-dark-text-muted block">{t("total")}</span>
                          <span className="text-sm font-extrabold text-primary">
                            {order.totalValue} {t("currency")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownloadPdf(order)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-dark-bg transition-colors"
                            title="تنزيل / طباعة فاتورة PDF"
                          >
                            <Printer className="h-3.5 w-3.5" />
                            <span>تنزيل PDF</span>
                          </button>

                          {/* Status updating action dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as MockOrder["status"])}
                            className="bg-dark-bg border border-dark-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="new">{t("statusNew")}</option>
                            <option value="preparing">{t("statusPreparing")}</option>
                            <option value="delivering">{t("statusOutForDelivery")}</option>
                            <option value="delivered">{t("statusDelivered")}</option>
                            <option value="cancelled">{t("statusCancelled")}</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* PRODUCTS TAB PANEL */}
          {activeTab === "products" && (
            <div className="space-y-6">
              
              {/* Product management action header */}
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-lg font-black text-white">
                  {t("productsTab")}
                </h2>
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-dark-bg font-extrabold text-xs sm:text-sm hover:bg-primary-hover active:scale-95 transition-all duration-200"
                >
                  <Plus className="h-4.5 w-4.5 stroke-[3]" />
                  <span>{t("addProduct")}</span>
                </button>
              </div>

              {/* Products Table/List for Phone */}
              <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
                <div className="divide-y divide-dark-border">
                  {products.map((product) => {
                    const name = language === "ar" ? product.nameAr : product.nameEn;
                    const isAvail = product.isAvailable !== false;
                    return (
                      <div
                        key={product.id}
                        className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-all border-b border-dark-border/40 ${
                          isAvail ? "hover:bg-dark-bg/20" : "bg-red-500/10 hover:bg-red-500/15 border-l-4 border-l-red-500"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Thumbnail with status indicator dot */}
                          <div className="relative h-12 w-12 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                            {product.category === "meats" ? "🥩" : product.category === "poultry" ? "🍗" : "🔥"}
                            <span
                              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-dark-surface shadow-md ${
                                isAvail ? "bg-green-500" : "bg-red-500 animate-pulse"
                              }`}
                              title={isAvail ? "المنتج معروض في المتجر" : "المنتج موقوف عن العرض"}
                            />
                          </div>
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm sm:text-base font-black text-white truncate">
                                {name}
                              </span>
                              
                              {/* 1-Click Interactive Status Dot Button */}
                              <button
                                type="button"
                                onClick={() => handleToggleProductAvailability(product)}
                                className={`text-[11px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${
                                  isAvail
                                    ? "bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/30"
                                    : "bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30"
                                }`}
                              >
                                <span className={`w-2.5 h-2.5 rounded-full ${isAvail ? "bg-green-400" : "bg-red-400"}`} />
                                <span>
                                  {isAvail
                                    ? (language === "ar" ? "🟢 معروض (اضغط للإيقاف 🔴)" : "🟢 Visible (Click to hide)")
                                    : (language === "ar" ? "🔴 موقوف (اضغط للعرض 🟢)" : "🔴 Hidden (Click to show)")}
                                </span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-primary uppercase font-black tracking-wider">
                                {t(product.category)}
                              </span>
                              <span className="text-dark-text-muted text-[10px]">
                                | {product.weight || "1 kg"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                          <span className="text-sm sm:text-base font-extrabold text-white">
                            {product.price} <span className="text-[10px] text-primary">{t("currency")}</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                              title={t("editProduct")}
                            >
                              <Edit className="h-4.5 w-4.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                              title={t("deleteProduct")}
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* RECIPES TAB PANEL */}
          {activeTab === "recipes" && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center gap-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    <span>{language === "ar" ? "إدارة وصفات طبق اليوم (أيام الأسبوع)" : "Daily Recipes Management"}</span>
                  </h2>
                  <p className="text-xs text-dark-text-muted mt-1">
                    {language === "ar" 
                      ? "يمكنك تعديل أطباق ومكونات وطريقة تحضير وصور كل يوم من أيام الشهر (31 طبق) وتحدث مباشرة في الموقع." 
                      : "Edit dishes, ingredients, instructions, and images for all 31 days of the month."}
                  </p>
                </div>
              </div>

              {/* Recipes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dailyRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="h-44 w-full relative bg-dark-bg overflow-hidden">
                        {/* eslint-disable-next-html-extension/next-image-unoptimized */}
                        <img
                          src={recipe.image}
                          alt={recipe.titleAr}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-dark-bg/85 border border-primary/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-primary">
                          {language === "ar" ? recipe.dayNameAr : recipe.dayNameEn}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-black text-white leading-snug">
                          {language === "ar" ? recipe.titleAr : recipe.titleEn}
                        </h3>
                        <p className="text-xs text-dark-text-muted line-clamp-2">
                          {language === "ar" ? recipe.descAr : recipe.descEn}
                        </p>
                        
                        <div className="flex items-center gap-3 text-[11px] text-gray-300 font-semibold pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {language === "ar" ? recipe.prepTimeAr : recipe.prepTimeEn}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-primary" />
                            {language === "ar" ? recipe.servingsAr : recipe.servingsEn}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-dark-border/50 bg-dark-bg/30 flex justify-end">
                      <button
                        onClick={() => openEditRecipeModal(recipe)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-dark-bg font-extrabold text-xs transition-all"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span>{language === "ar" ? "تعديل وصفة اليوم" : "Edit Recipe"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </main>

      {/* PRODUCT ADD / EDIT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            onClick={() => setShowProductModal(false)}
            className="absolute inset-0 bg-dark-bg/85 backdrop-blur-sm"
          />

          <div className="relative bg-dark-surface border border-dark-border w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-dark-bg"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <span className="text-primary">✦</span>
              {modalMode === "add" ? t("addProduct") : t("editProduct")}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 pl-2">
              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-500 font-semibold text-center">
                  {formError}
                </div>
              )}

              {/* Name AR */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">{t("productNameAr")}</label>
                <input
                  type="text"
                  value={prodNameAr}
                  onChange={(e) => setProdNameAr(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* Name EN */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">{t("productNameEn")}</label>
                <input
                  type="text"
                  value={prodNameEn}
                  onChange={(e) => setProdNameEn(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  dir="ltr"
                />
              </div>

              {/* Desc AR */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">{t("productDescAr")}</label>
                <textarea
                  value={prodDescAr}
                  onChange={(e) => setProdDescAr(e.target.value)}
                  rows={2}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Desc EN */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">{t("productDescEn")}</label>
                <textarea
                  value={prodDescEn}
                  onChange={(e) => setProdDescEn(e.target.value)}
                  rows={2}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary resize-none"
                  dir="ltr"
                />
              </div>

              {/* Price & Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">{t("productPrice")}</label>
                  <input
                    type="number"
                    step="any"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">
                    {language === "ar" ? "الوزن / العبوة" : "Weight / Size"}
                  </label>
                  <input
                    type="text"
                    value={prodWeight}
                    onChange={(e) => setProdWeight(e.target.value)}
                    placeholder="e.g. 1 kg"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Category selector */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">{t("productCategory")}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["meats", "poultry", "other"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setProdCategory(cat)}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all duration-200 capitalize ${
                        prodCategory === cat
                          ? "bg-primary border-primary text-dark-bg"
                          : "border-dark-border bg-dark-bg text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {t(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Image URL field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">
                  {language === "ar" ? "رابط / مسار صورة المنتج" : "Product Image URL / Path"}
                </label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="e.g. /images/beef_shank.png"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  dir="ltr"
                />
              </div>

              {/* Product Visibility Option */}
              <div className="space-y-1 bg-dark-bg/60 border border-dark-border p-3.5 rounded-xl">
                <label className="text-xs font-bold text-gray-200 block mb-2">
                  {language === "ar" ? "حالة عرض المنتج في المتجر" : "Store Display Visibility"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProdIsAvailable(true)}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                      prodIsAvailable
                        ? "bg-green-500/20 border-green-500/50 text-green-400 shadow-sm"
                        : "border-dark-border bg-dark-bg text-gray-400 hover:text-white"
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    <span>{language === "ar" ? "مفعل (يعرض للعملاء)" : "Visible (Show)"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProdIsAvailable(false)}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                      !prodIsAvailable
                        ? "bg-red-500/20 border-red-500/50 text-red-400 shadow-sm"
                        : "border-dark-border bg-dark-bg text-gray-400 hover:text-white"
                    }`}
                  >
                    <EyeOff className="h-4 w-4" />
                    <span>{language === "ar" ? "موقوف (مخفي)" : "Disabled (Hide)"}</span>
                  </button>
                </div>
              </div>

              {/* Actions submit */}
              <div className="pt-4 border-t border-dark-border/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-dark-border text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-primary text-dark-bg font-extrabold text-xs hover:bg-primary-hover transition-colors"
                >
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECIPE EDIT MODAL */}
      {showRecipeModal && selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            onClick={() => setShowRecipeModal(false)}
            className="absolute inset-0 bg-dark-bg/85 backdrop-blur-sm"
          />

          <div className="relative bg-dark-surface border border-dark-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowRecipeModal(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-dark-bg"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <span>
                {language === "ar"
                  ? `تعديل وصفة يوم (${selectedRecipe.dayNameAr})`
                  : `Edit Recipe (${selectedRecipe.dayNameEn})`}
              </span>
            </h3>

            <form onSubmit={handleRecipeSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 pl-2">
              
              {/* Title AR & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">اسم الطبق (بالعربية)</label>
                  <input
                    type="text"
                    required
                    value={recTitleAr}
                    onChange={(e) => setRecTitleAr(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Dish Name (English)</label>
                  <input
                    type="text"
                    required
                    value={recTitleEn}
                    onChange={(e) => setRecTitleEn(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Desc AR & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">الوصف المختصر (بالعربية)</label>
                  <textarea
                    rows={2}
                    value={recDescAr}
                    onChange={(e) => setRecDescAr(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Short Description (English)</label>
                  <textarea
                    rows={2}
                    value={recDescEn}
                    onChange={(e) => setRecDescEn(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Prep time & Servings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-300 block">وقت التحضير (عربي)</label>
                  <input
                    type="text"
                    value={recPrepAr}
                    onChange={(e) => setRecPrepAr(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-300 block">Prep Time (EN)</label>
                  <input
                    type="text"
                    value={recPrepEn}
                    onChange={(e) => setRecPrepEn(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-300 block">الكمية (عربي)</label>
                  <input
                    type="text"
                    value={recServAr}
                    onChange={(e) => setRecServAr(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-300 block">Servings (EN)</label>
                  <input
                    type="text"
                    value={recServEn}
                    onChange={(e) => setRecServEn(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">رابط الصورة (Image URL / Path)</label>
                <input
                  type="text"
                  required
                  value={recImage}
                  onChange={(e) => setRecImage(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  dir="ltr"
                />
              </div>

              {/* YouTube Video URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  رابط فيديو يوتيوب للوصفة (اختياري - YouTube Video URL)
                </label>
                <input
                  type="url"
                  value={recVideoUrl}
                  onChange={(e) => setRecVideoUrl(e.target.value)}
                  placeholder="https://youtu.be/... أو https://www.youtube.com/watch?v=..."
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-500 placeholder:text-gray-600"
                  dir="ltr"
                />
                {recVideoUrl && (
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <span>✓</span> <span>سيظهر الفيديو في صفحة طبق اليوم</span>
                  </p>
                )}
              </div>

              {/* Ingredients AR & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">المكونات المقترحة (عنصر في كل سطر)</label>
                  <textarea
                    rows={4}
                    value={recIngredientsAr}
                    onChange={(e) => setRecIngredientsAr(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Ingredients (One per line)</label>
                  <textarea
                    rows={4}
                    value={recIngredientsEn}
                    onChange={(e) => setRecIngredientsEn(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Instructions AR & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">طريقة التحضير (خطوة في كل سطر)</label>
                  <textarea
                    rows={4}
                    value={recInstructionsAr}
                    onChange={(e) => setRecInstructionsAr(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Instructions (One step per line)</label>
                  <textarea
                    rows={4}
                    value={recInstructionsEn}
                    onChange={(e) => setRecInstructionsEn(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Actions submit */}
              <div className="pt-4 border-t border-dark-border/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRecipeModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-dark-border text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-primary text-dark-bg font-extrabold text-xs hover:bg-primary-hover transition-colors"
                >
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
