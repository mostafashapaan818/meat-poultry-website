"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Package, Clock, MapPin, Phone, CheckCircle2, Truck, AlertCircle, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  governorate: string;
  area: string;
  address: string;
  items: OrderItem[];
  totalValue: number;
  status: "new" | "preparing" | "delivering" | "delivered" | "cancelled";
  createdAt: string;
}

export default function TrackOrderPage() {
  const { t, language, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundOrders, setFoundOrders] = useState<Order[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto search query from URL parameter if available (?q=DM-123456 or ?phone=010...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get("query") || urlParams.get("q") || urlParams.get("id") || urlParams.get("phone");
      if (queryParam) {
        setSearchQuery(queryParam);
        executeSearch(queryParam);
      }
    }
  }, []);

  const executeSearch = async (queryStr: string) => {
    const cleanQuery = queryStr.trim().toLowerCase();
    if (!cleanQuery) return;

    setIsSearching(true);
    setHasSearched(true);
    setFoundOrders(null);

    let allOrders: Order[] = [];

    // 1. Fetch from server API
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          allOrders = data.orders;
        }
      }
    } catch (err) {
      console.error("Fetch orders API error:", err);
    }

    // 2. Local Storage Backup
    try {
      const local = localStorage.getItem("delicious_meats_orders");
      if (local) {
        const parsed: Order[] = JSON.parse(local);
        const map = new Map<string, Order>();
        allOrders.forEach((o) => map.set(o.id, o));
        parsed.forEach((o) => {
          if (!map.has(o.id)) map.set(o.id, o);
        });
        allOrders = Array.from(map.values());
      }
    } catch (e) {}

    // Filter matching order ID or Phone number
    const matched = allOrders.filter((order) => {
      const idMatch = order.id.toLowerCase().includes(cleanQuery) || cleanQuery.includes(order.id.toLowerCase().replace("#", ""));
      const phoneMatch = order.phone.replaceAll(" ", "").includes(cleanQuery.replaceAll(" ", ""));
      return idMatch || phoneMatch;
    });

    setFoundOrders(matched);
    setIsSearching(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  const getStatusStep = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return 1;
      case "preparing":
        return 2;
      case "delivering":
        return 3;
      case "delivered":
        return 4;
      case "cancelled":
        return -1;
      default:
        return 1;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12 sm:py-16 bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary mb-3">
              <Search className="h-4 w-4" />
              <span>{language === "ar" ? "خدمة العملاء والطلب أونلاين" : "Customer Order Lookup"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === "ar" ? "تتبع حالة طلبك" : "Track Your Order Status"}
            </h1>
            <p className="text-xs sm:text-sm text-dark-text-muted mt-2 leading-relaxed">
              {language === "ar"
                ? "أدخل رقم الهاتف المسجل في الطلب أو كود مرجع الطلب (مثال: DM-384910) لمتابعة حالة التوصيل فوراً."
                : "Enter your registered phone number or order reference code (e.g., DM-384910) to check live status."}
            </p>
          </div>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-dark-surface border border-dark-border rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row gap-3 mb-12"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل رقم التلفون (مثال: 01012345678) أو كود الطلب..."
                    : "Enter phone number or order reference code..."
                }
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="px-8 py-3.5 rounded-xl bg-primary text-dark-bg font-extrabold text-sm hover:bg-primary-hover active:scale-95 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Search className="h-4 w-4 stroke-[3]" />
              <span>{isSearching ? t("loading") : (language === "ar" ? "بحث عن الطلب" : "Track Order")}</span>
            </button>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {foundOrders && foundOrders.length > 0 ? (
                foundOrders.map((order) => {
                  const step = getStatusStep(order.status);
                  const isCancelled = order.status === "cancelled";
                  const formattedDate = new Date(order.createdAt).toLocaleString(
                    language === "ar" ? "ar-EG" : "en-US",
                    { dateStyle: "medium", timeStyle: "short" }
                  );

                  return (
                    <div
                      key={order.id}
                      className="bg-dark-surface border border-dark-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8"
                    >
                      {/* Top Order Info Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-dark-border/80 pb-5 gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-xl sm:text-2xl font-black text-white">
                              {language === "ar" ? "طلب رقم" : "Order"} #{order.id}
                            </span>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                order.status === "delivered"
                                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                                  : isCancelled
                                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                                  : "bg-primary/10 text-primary border-primary/20"
                              }`}
                            >
                              {order.status === "new" && (language === "ar" ? "جديد / معلق" : "Pending")}
                              {order.status === "preparing" && (language === "ar" ? "قيد التجهيز" : "Preparing")}
                              {order.status === "delivering" && (language === "ar" ? "في الطريق للتوصيل" : "Out for Delivery")}
                              {order.status === "delivered" && (language === "ar" ? "تم التسليم بنجاح" : "Delivered")}
                              {order.status === "cancelled" && (language === "ar" ? "ملغي" : "Cancelled")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-dark-text-muted mt-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>{formattedDate}</span>
                          </div>
                        </div>

                        <div className="text-start sm:text-end">
                          <span className="text-xs text-dark-text-muted block">{t("grandTotal")}</span>
                          <span className="text-xl font-black text-primary">
                            {order.totalValue} {t("currency")}
                          </span>
                        </div>
                      </div>

                      {/* Status Stepper (Active Timeline) */}
                      {!isCancelled ? (
                        <div className="space-y-4">
                          <h4 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                            {language === "ar" ? "مراحل تجهيز وتوصيل الطلب" : "Delivery Progress"}
                          </h4>

                          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
                            {/* Step 1: Received */}
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div
                                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm sm:text-base transition-all ${
                                  step >= 1
                                    ? "bg-primary text-dark-bg border-primary shadow-lg shadow-primary/30"
                                    : "bg-dark-bg text-gray-500 border-dark-border"
                                }`}
                              >
                                {step > 1 ? <CheckCircle2 className="h-5 w-5 stroke-[3]" /> : "1"}
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs font-bold ${
                                  step >= 1 ? "text-white" : "text-gray-500"
                                }`}
                              >
                                {language === "ar" ? "تم استلام الطلب" : "Order Placed"}
                              </span>
                            </div>

                            {/* Step 2: Preparing */}
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div
                                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm sm:text-base transition-all ${
                                  step >= 2
                                    ? "bg-primary text-dark-bg border-primary shadow-lg shadow-primary/30"
                                    : "bg-dark-bg text-gray-500 border-dark-border"
                                }`}
                              >
                                {step > 2 ? <CheckCircle2 className="h-5 w-5 stroke-[3]" /> : "2"}
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs font-bold ${
                                  step >= 2 ? "text-white" : "text-gray-500"
                                }`}
                              >
                                {language === "ar" ? "قيد التجهيز" : "Preparing Cuts"}
                              </span>
                            </div>

                            {/* Step 3: Out for delivery */}
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div
                                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm sm:text-base transition-all ${
                                  step >= 3
                                    ? "bg-primary text-dark-bg border-primary shadow-lg shadow-primary/30"
                                    : "bg-dark-bg text-gray-500 border-dark-border"
                                }`}
                              >
                                {step > 3 ? <CheckCircle2 className="h-5 w-5 stroke-[3]" /> : "3"}
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs font-bold ${
                                  step >= 3 ? "text-white" : "text-gray-500"
                                }`}
                              >
                                {language === "ar" ? "جاري التوصيل" : "Out for Delivery"}
                              </span>
                            </div>

                            {/* Step 4: Delivered */}
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div
                                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm sm:text-base transition-all ${
                                  step >= 4
                                    ? "bg-green-500 text-dark-bg border-green-500 shadow-lg shadow-green-500/30"
                                    : "bg-dark-bg text-gray-500 border-dark-border"
                                }`}
                              >
                                {step >= 4 ? <CheckCircle2 className="h-5 w-5 stroke-[3]" /> : "4"}
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs font-bold ${
                                  step >= 4 ? "text-green-400" : "text-gray-500"
                                }`}
                              >
                                {language === "ar" ? "تم الاستلام" : "Delivered"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs sm:text-sm font-semibold">
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          <span>
                            {language === "ar"
                              ? "تم إلغاء هذا الطلب. يرجى التواصل مع الدعم الفني للاستفسار."
                              : "This order has been cancelled. Please contact support for inquiries."}
                          </span>
                        </div>
                      )}

                      {/* Customer Details & Shipping Address */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-dark-bg/60 border border-dark-border/60 rounded-2xl p-5 text-xs sm:text-sm">
                        <div className="space-y-2">
                          <span className="text-dark-text-muted font-bold block uppercase tracking-wider text-[11px]">
                            {t("customerInfo")}
                          </span>
                          <p className="text-white font-bold">{order.customerName}</p>
                          <div className="flex items-center gap-1.5 text-primary font-medium">
                            <Phone className="h-3.5 w-3.5" />
                            <span dir="ltr">{order.phone}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-dark-text-muted font-bold block uppercase tracking-wider text-[11px]">
                            {t("detailedAddress")}
                          </span>
                          <div className="flex items-start gap-1.5 text-gray-300">
                            <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>
                              {order.governorate}, {order.area}, {order.address}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ordered Items Table */}
                      <div className="space-y-3">
                        <h4 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                          {language === "ar" ? "محتويات الطلب" : "Order Items"}
                        </h4>

                        <div className="bg-dark-bg/60 border border-dark-border/60 rounded-2xl divide-y divide-dark-border/40 overflow-hidden">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                              <div>
                                <span className="text-white font-bold block">
                                  {language === "ar" ? item.nameAr : item.nameEn}
                                </span>
                                <span className="text-[11px] text-primary mt-0.5 block">
                                  {item.quantity} x {item.price} {t("currency")}
                                </span>
                              </div>
                              <span className="font-black text-white">
                                {item.quantity * item.price} {t("currency")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="bg-dark-surface border border-dark-border rounded-3xl p-10 text-center space-y-4">
                  <Package className="h-14 w-14 text-dark-text-muted mx-auto stroke-[1.5]" />
                  <h3 className="text-lg font-bold text-white">
                    {language === "ar" ? "لم نجد أي طلبات تطابق بحثك" : "No matching orders found"}
                  </h3>
                  <p className="text-xs text-dark-text-muted max-w-md mx-auto leading-relaxed">
                    {language === "ar"
                      ? "تأكد من إدخال رقم الهاتف المصري المكون من 11 رقمًا الصحيح أو رقم مرجع الطلب (مثال: DM-384910)."
                      : "Please ensure you entered a valid Egyptian phone number or 6-digit order ID."}
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-dark-bg font-extrabold text-xs hover:bg-primary-hover transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>{t("browseProducts")}</span>
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
