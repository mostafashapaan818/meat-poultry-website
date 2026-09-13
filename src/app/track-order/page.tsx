"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Package, Clock, MapPin, Phone, CheckCircle2, Truck, AlertCircle, ShoppingBag, Utensils, Sparkles, RefreshCw, ChevronRight } from "lucide-react";
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

// Live 24-Hour Countdown Decreasing Progress Bar Component
function CountdownBar({ createdAt, language }: { createdAt: string; language: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    percentRemaining: number;
    isExpired: boolean;
  }>({ hours: 24, minutes: 0, seconds: 0, percentRemaining: 100, isExpired: false });

  useEffect(() => {
    const updateTimer = () => {
      const orderTime = new Date(createdAt).getTime();
      const deadline = orderTime + 24 * 60 * 60 * 1000;
      const now = Date.now();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, percentRemaining: 0, isExpired: true });
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      const total24h = 24 * 60 * 60 * 1000;
      const pct = Math.max(0, Math.min(100, (diff / total24h) * 100));

      setTimeLeft({ hours: h, minutes: m, seconds: s, percentRemaining: pct, isExpired: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <div className="bg-gradient-to-br from-dark-bg/90 to-dark-surface border border-primary/30 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 animate-pulse">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-white">
              {language === "ar" ? "الوقت المتبقي المتوقع للتوصيل (خلال 24 ساعة)" : "Estimated Delivery Countdown (within 24 hours)"}
            </h4>
            <p className="text-xs text-dark-text-muted mt-0.5">
              {language === "ar" ? "التوصيل يتم خلال 24 ساعة كحد أقصى من وقت اعتماد الطلب" : "Delivered within 24 hours of order placement"}
            </p>
          </div>
        </div>

        {/* Dynamic Digital Counter Display */}
        {!timeLeft.isExpired ? (
          <div className="flex items-center gap-1.5 self-center sm:self-auto dir-ltr">
            <div className="bg-dark-bg border border-primary/40 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
              <span className="text-lg sm:text-xl font-black text-primary block leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[9px] text-gray-400 font-bold">ساعة</span>
            </div>
            <span className="text-primary font-bold text-lg animate-ping">:</span>
            <div className="bg-dark-bg border border-primary/40 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
              <span className="text-lg sm:text-xl font-black text-primary block leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[9px] text-gray-400 font-bold">دقيقة</span>
            </div>
            <span className="text-primary font-bold text-lg animate-ping">:</span>
            <div className="bg-dark-bg border border-primary/40 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
              <span className="text-lg sm:text-xl font-black text-primary block leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[9px] text-gray-400 font-bold">ثانية</span>
            </div>
          </div>
        ) : (
          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {language === "ar" ? "قريب جداً من الوصول 🎉" : "Arriving Shortly 🎉"}
          </span>
        )}
      </div>

      {/* Decreasing Visual Progress Bar */}
      <div className="space-y-1.5 relative z-10">
        <div className="w-full bg-dark-bg/80 border border-dark-border/80 h-4 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary to-amber-500 transition-all duration-1000 shadow-md shadow-primary/20 relative"
            style={{ width: `${timeLeft.percentRemaining}%` }}
          >
            <div className="absolute inset-0 bg-white/25 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-dark-text-muted font-bold px-1">
          <span>{language === "ar" ? "تأكيد الطلب" : "Order Placed"}</span>
          <span className="text-primary font-extrabold">{Math.round(timeLeft.percentRemaining)}% {language === "ar" ? "متبقي من مهلة 24h" : "remaining of 24h"}</span>
          <span>{language === "ar" ? "الوصول النهائي" : "Estimated Arrival"}</span>
        </div>
      </div>
    </div>
  );
}

// Interactive Status Pipeline Stepper Component
function OrderStatusPipeline({ status, language }: { status: Order["status"]; language: string }) {
  const steps = [
    {
      id: "new",
      titleAr: "تم استلام الطلب",
      titleEn: "Order Placed",
      descAr: "تأكيد الطلب وحجزه بالنظام",
      descEn: "Confirmed & logged",
      icon: ShoppingBag,
    },
    {
      id: "preparing",
      titleAr: "قيد التجهيز والتقطيع",
      titleEn: "Butchering & Prep",
      descAr: "تقطيع طازج وتغليف حراري",
      descEn: "Fresh cuts & thermal seal",
      icon: Utensils,
    },
    {
      id: "delivering",
      titleAr: "في الطريق للتوصيل",
      titleEn: "Out for Delivery",
      descAr: "خرج مع مندوب التبريد",
      descEn: "In refrigerated van",
      icon: Truck,
    },
    {
      id: "delivered",
      titleAr: "تم التسليم بنجاح",
      titleEn: "Delivered",
      descAr: "تم الاستلام وتسليم الوجبة",
      descEn: "Handed over safely",
      icon: CheckCircle2,
    },
  ];

  const getActiveIndex = () => {
    switch (status) {
      case "new": return 0;
      case "preparing": return 1;
      case "delivering": return 2;
      case "delivered": return 3;
      default: return 0;
    }
  };

  const activeIdx = getActiveIndex();
  const progressPercent = (activeIdx / (steps.length - 1)) * 100;

  return (
    <div className="space-y-6 bg-dark-bg/60 border border-dark-border/80 rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-dark-border/60 pb-3">
        <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{language === "ar" ? "شريط مراحل وحالة الطلب التفاعلي" : "Interactive Order Pipeline"}</span>
        </h4>
        <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
          {language === "ar" ? `المرحلة ${activeIdx + 1} من 4` : `Stage ${activeIdx + 1} of 4`}
        </span>
      </div>

      <div className="relative py-4">
        {/* Background Connector Bar */}
        <div className="absolute top-8 left-6 right-6 sm:left-12 sm:right-12 h-2 bg-dark-bg border border-dark-border rounded-full z-0" />
        
        {/* Active Progress Connector Bar */}
        <div
          className="absolute top-8 left-6 sm:left-12 h-2 bg-gradient-to-r from-primary to-emerald-500 rounded-full z-0 transition-all duration-700"
          style={{ width: `calc(${progressPercent}% - 12px)` }}
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-4 gap-2 relative z-10">
          {steps.map((st, idx) => {
            const isDone = idx < activeIdx;
            const isActive = idx === activeIdx;
            const Icon = st.icon;

            return (
              <div key={st.id} className="flex flex-col items-center text-center space-y-2 group">
                <div
                  className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "bg-primary text-dark-bg border-primary shadow-xl shadow-primary/40 scale-110 ring-4 ring-primary/20"
                      : isDone
                      ? "bg-emerald-500 text-dark-bg border-emerald-500 shadow-md"
                      : "bg-dark-surface text-gray-500 border-dark-border"
                  }`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5] ${isActive ? "animate-bounce" : ""}`} />
                </div>

                <div className="space-y-0.5">
                  <span
                    className={`text-[11px] sm:text-xs font-black block transition-colors ${
                      isActive ? "text-primary text-xs sm:text-sm" : isDone ? "text-emerald-400" : "text-gray-400"
                    }`}
                  >
                    {language === "ar" ? st.titleAr : st.titleEn}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-dark-text-muted hidden sm:block leading-tight">
                    {language === "ar" ? st.descAr : st.descEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  const { t, language, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundOrders, setFoundOrders] = useState<Order[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto search query from URL parameter if available (?q=DM-123456 or ?id=DM-123456 or ?phone=010...)
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
      const local = localStorage.getItem("delicious_meats_orders") || localStorage.getItem("dm_orders");
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12 sm:py-16 bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary mb-3">
              <Search className="h-4 w-4" />
              <span>{language === "ar" ? "خدمة العملاء ومتابعة الشحنات" : "Order Tracking & Customer Support"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === "ar" ? "تتبع حالة طلبك التفاعلية 🚚" : "Live Interactive Order Tracking"}
            </h1>
            <p className="text-xs sm:text-sm text-dark-text-muted mt-2 leading-relaxed">
              {language === "ar"
                ? "أدخل رقم الهاتف المسجل بالطلب أو كود الطلب المرجعي لمتابعة حالة التوصيل والعد التنازلي المباشر."
                : "Enter your phone number or order reference code to track live progress and countdown."}
            </p>
          </div>

          {/* Search Input Box */}
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
                    ? "أدخل رقم التلفون (مثال: 01012345678) أو كود الطلب (مثال: DM-384910)..."
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
              <span>{isSearching ? t("loading") : (language === "ar" ? "تتبع الطلب الآن" : "Track Order")}</span>
            </button>
          </form>

          {/* Search Results Display */}
          {hasSearched && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {foundOrders && foundOrders.length > 0 ? (
                foundOrders.map((order) => {
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
                      {/* Top Order Summary Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-dark-border/80 pb-5 gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-xl sm:text-2xl font-black text-white">
                              {language === "ar" ? "طلب رقم" : "Order"} #{order.id}
                            </span>
                            <span
                              className={`text-xs font-black px-3.5 py-1 rounded-full border ${
                                order.status === "delivered"
                                  ? "bg-green-500/15 text-green-400 border-green-500/30"
                                  : isCancelled
                                  ? "bg-red-500/15 text-red-400 border-red-500/30"
                                  : "bg-primary/15 text-primary border-primary/30"
                              }`}
                            >
                              {order.status === "new" && (language === "ar" ? "تم استلام الطلب ✨" : "Order Received ✨")}
                              {order.status === "preparing" && (language === "ar" ? "قيد التجهيز والتقطيع 🥩" : "Butchering & Prep 🥩")}
                              {order.status === "delivering" && (language === "ar" ? "في الطريق للتوصيل 🚚" : "Out for Delivery 🚚")}
                              {order.status === "delivered" && (language === "ar" ? "تم التسليم بنجاح 🎉" : "Delivered Safely 🎉")}
                              {order.status === "cancelled" && (language === "ar" ? "ملغي ❌" : "Cancelled ❌")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-dark-text-muted mt-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>تاريخ الطلب: {formattedDate}</span>
                          </div>
                        </div>

                        <div className="text-start sm:text-end">
                          <span className="text-xs text-dark-text-muted block">{t("grandTotal")}</span>
                          <span className="text-xl font-black text-primary">
                            {order.totalValue} {t("currency")}
                          </span>
                        </div>
                      </div>

                      {/* Motion Status Banner Animation */}
                      {!isCancelled && (
                        <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/30 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xl flex-shrink-0 animate-pulse">
                            {order.status === "new" && "✨"}
                            {order.status === "preparing" && "🥩"}
                            {order.status === "delivering" && "🚚"}
                            {order.status === "delivered" && "🎉"}
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-black text-white">
                              {order.status === "new" && (language === "ar" ? "جاري مراجعة طلبك وإسناده لخبراء الجزارة 🔪" : "Order is being reviewed and routed for fresh butchering")}
                              {order.status === "preparing" && (language === "ar" ? "جاري تقطيع اللحوم/الدواجن الفاخرة وتغليفها حرارياً 🥩" : "Your premium cuts are being prepared and fresh-sealed")}
                              {order.status === "delivering" && (language === "ar" ? "مندوب الشحن المبرد في الطريق إلى عنوانك الآن 🚚" : "Your order is out for delivery in a temperature controlled vehicle")}
                              {order.status === "delivered" && (language === "ar" ? "نتمنى لك وجبة شهية وصحية من ديليشس ميتس 🎉" : "Delivered! Bon appétit from Delicious Meats")}
                            </h4>
                            <p className="text-xs text-dark-text-muted mt-0.5">
                              {language === "ar" ? "يتم تحديث المزيج والتنقل تلقائياً عند تغيير حالة الطلب من الإدارة." : "Pipeline updates automatically as staff progresses your order."}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Live 24-Hour Countdown Bar (Active when not delivered or cancelled) */}
                      {!isCancelled && order.status !== "delivered" && (
                        <CountdownBar createdAt={order.createdAt} language={language} />
                      )}

                      {/* Dynamic Interactive Order Pipeline Stepper */}
                      {!isCancelled ? (
                        <OrderStatusPipeline status={order.status} language={language} />
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

                      {/* Customer Info & Detailed Address */}
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

                      {/* WhatsApp Direct Inquiry & Action Button */}
                      <div className="pt-4 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-dark-text-muted">
                          {language === "ar"
                            ? "هل لديك أي استفسار حول هذا الطلب؟ تواصل معنا مباشرة عبر واتساب."
                            : "Have a question regarding this order? Contact support directly via WhatsApp."}
                        </div>
                        <a
                          href={`https://wa.me/201043066133?text=${encodeURIComponent(
                            `متابعة حالة الطلب - كود الطلب: #${order.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 transition-all flex-shrink-0"
                        >
                          <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.555 4.197 1.608 6.02L.051 24l6.096-1.597c1.764.962 3.766 1.47 5.884 1.47 6.647 0 12.032-5.385 12.032-12.031S18.678 0 12.031 0zm6.541 17.001c-.274.773-1.359 1.416-2.215 1.596-.587.123-1.353.223-3.931-.844-3.3-1.365-5.426-4.71-5.59-4.93-.163-.22-1.336-1.78-1.336-3.396 0-1.616.844-2.41 1.144-2.738.3-.327.654-.409.873-.409.219 0 .437.003.627.013.201.01.47-.076.735.56.274.654.929 2.27.1009 2.434.081.164.136.356.027.573-.109.219-.164.355-.327.546-.164.191-.345.427-.148.766.196.338.871 1.437 1.87 2.327 1.285 1.144 2.368 1.5 2.707 1.664.338.164.536.136.733-.092.197-.228.844-.982 1.07-1.319.227-.338.455-.282.764-.164.309.119 1.961.925 2.298 1.093.338.164.563.246.646.382.082.137.082.793-.192 1.566z" />
                          </svg>
                          <span>{language === "ar" ? "تواصل عبر واتساب لمتابعة الطلب" : "Inquire via WhatsApp"}</span>
                        </a>
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
