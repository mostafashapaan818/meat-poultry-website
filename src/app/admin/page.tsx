"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { mockProducts, Product } from "@/data/products";
import { 
  Lock, User, LogOut, CheckCircle, Package, ListOrdered, 
  Trash2, Edit, Plus, Phone, MapPin, X, Info, Layers 
} from "lucide-react";

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
      { id: "p1", nameAr: "دجاجة كاملة منظفة ومجمدة", nameEn: "Whole Cleaned Chicken", price: 185, quantity: 3 }
    ],
    totalValue: 605, // includes 50 EGP shipping
    status: "delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString() // 1 day ago
  }
];

export default function AdminDashboard() {
  const { t, language, dir } = useLanguage();
  
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Dashboard states
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
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
  const [formError, setFormError] = useState("");

  // Load state on mount
  useEffect(() => {
    // Auth Check
    const authStatus = localStorage.getItem("delicious_meats_admin_auth");
    if (authStatus === "true") {
      setIsLoggedIn(true);
    }

    // Load Orders
    const storedOrders = localStorage.getItem("delicious_meats_orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        setOrders(INITIAL_ORDERS);
      }
    } else {
      setOrders(INITIAL_ORDERS);
      localStorage.setItem("delicious_meats_orders", JSON.stringify(INITIAL_ORDERS));
    }

    // Load Products
    const storedProducts = localStorage.getItem("delicious_meats_products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        setProducts(mockProducts);
      }
    } else {
      setProducts(mockProducts);
      localStorage.setItem("delicious_meats_products", JSON.stringify(mockProducts));
    }
  }, []);

  // Handle Login Mock
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (usernameInput.toLowerCase() === "admin" && passwordInput === "admin") ||
      (usernameInput.toLowerCase() === "staff" && passwordInput === "123456")
    ) {
      setIsLoggedIn(true);
      setLoginError("");
      localStorage.setItem("delicious_meats_admin_auth", "true");
    } else {
      setLoginError(t("loginError"));
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("delicious_meats_admin_auth");
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: MockOrder["status"]) => {
    const updated = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem("delicious_meats_orders", JSON.stringify(updated));
  };

  // Delete product
  const handleDeleteProduct = (prodId: string) => {
    if (!confirm(t("confirmDelete"))) return;
    const updated = products.filter((p) => p.id !== prodId);
    setProducts(updated);
    localStorage.setItem("delicious_meats_products", JSON.stringify(updated));
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
    setFormError("");
    setShowProductModal(true);
  };

  // Handle Product Form Submit
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodNameAr || !prodNameEn || !prodPrice) {
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
        id: `m-custom-${Math.floor(1000 + Math.random() * 9000)}`,
        nameAr: prodNameAr,
        nameEn: prodNameEn,
        descAr: prodDescAr,
        descEn: prodDescEn,
        price: priceNum,
        category: prodCategory,
        weight: prodWeight,
        image: "custom_product"
      };
      updatedProducts = [newProd, ...products];
    } else {
      updatedProducts = products.map((p) => {
        if (p.id === selectedProductId) {
          return {
            ...p,
            nameAr: prodNameAr,
            nameEn: prodNameEn,
            descAr: prodDescAr,
            descEn: prodDescEn,
            price: priceNum,
            category: prodCategory,
            weight: prodWeight
          };
        }
        return p;
      });
    }

    setProducts(updatedProducts);
    localStorage.setItem("delicious_meats_products", JSON.stringify(updatedProducts));
    setShowProductModal(false);
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

            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="admin / staff"
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
                  placeholder="admin / 123456"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg text-[10px] text-primary/80 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" />
                  <span>{language === "ar" ? "بيانات الدخول التجريبية:" : "Demo Login Credentials:"}</span>
                </p>
                <ul className="list-disc pl-4 pr-4">
                  <li>{language === "ar" ? "المدير: admin / كلمة المرور: admin" : "Admin: admin / Password: admin"}</li>
                  <li>{language === "ar" ? "الموظف: staff / كلمة المرور: 123456" : "Staff: staff / Password: 123456"}</li>
                </ul>
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
    <div className="flex flex-col min-h-screen">
      
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

          <div className="flex items-center gap-3">
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
        <div className="max-w-7xl mx-auto px-4 flex gap-4">
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
        </div>
      </div>

      {/* Main Dashboard body */}
      <main className="flex-grow py-8 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* ORDERS TAB PANEL */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              
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

                      {/* Customer Details info */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="text-primary font-bold">👤</span>
                          <div>
                            <span className="text-white font-bold block">{order.customerName}</span>
                            <a
                              href={`tel:${order.phone}`}
                              className="text-primary font-medium hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              <span dir="ltr">{order.phone}</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
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
                      <div className="border-t border-dark-border/40 pt-3 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-dark-text-muted block">{t("total")}</span>
                          <span className="text-sm font-extrabold text-primary">
                            {order.totalValue} {t("currency")}
                          </span>
                        </div>

                        {/* Status updating action dropdown */}
                        <div className="flex flex-col">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as MockOrder["status"])}
                            className="bg-dark-bg border border-dark-border rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-primary transition-colors"
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
                    return (
                      <div
                        key={product.id}
                        className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-dark-bg/20 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Thumbnail */}
                          <div className="h-12 w-12 rounded bg-dark-bg border border-dark-border flex items-center justify-center text-xl flex-shrink-0">
                            {product.category === "meats" ? "🥩" : product.category === "poultry" ? "🍗" : "🔥"}
                          </div>
                          
                          <div className="min-w-0">
                            <span className="text-sm font-bold text-white block truncate">
                              {name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                                {t(product.category)}
                              </span>
                              <span className="text-dark-text-muted text-[10px]">
                                | {product.weight || "1 kg"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price & actions */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="text-sm font-extrabold text-white">
                            {product.price} <span className="text-[10px] text-primary">{t("currency")}</span>
                          </span>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title={t("editProduct")}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              title={t("deleteProduct")}
                            >
                              <Trash2 className="h-4 w-4" />
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

        </div>
      </main>

      {/* PRODUCT ADD / EDIT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay backdrop blur */}
          <div
            onClick={() => setShowProductModal(false)}
            className="absolute inset-0 bg-dark-bg/85 backdrop-blur-sm"
          />

          {/* Modal Panel content */}
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

      <Footer />
    </div>
  );
}
