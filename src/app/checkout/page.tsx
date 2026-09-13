"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ChevronRight, ChevronLeft, CreditCard, ShoppingBag, ArrowLeft, ArrowRight, Clock, Utensils, Truck, Sparkles } from "lucide-react";

// List of allowed delivery governorates (Cairo and Giza only)
const GOVERNORATES = [
  { ar: "القاهرة", en: "Cairo" },
  { ar: "الجيزة", en: "Giza" }
];

// Dependent Areas list for Cairo and Giza with Free Delivery markers
const AREAS_BY_GOVERNORATE: Record<string, { ar: string; en: string; isFree: boolean }[]> = {
  Cairo: [
    { ar: "مدينة نصر", en: "Nasr City", isFree: true },
    { ar: "التجمع (القاهرة الجديدة)", en: "El Tagamoa (New Cairo)", isFree: true },
    { ar: "مصر الجديدة", en: "Heliopolis", isFree: true },
    { ar: "المعادي", en: "Maadi", isFree: false },
    { ar: "الزمالك", en: "Zamalek", isFree: false },
    { ar: "وسط البلد", en: "Downtown", isFree: false },
    { ar: "الشروق", en: "El Shorouk", isFree: false },
    { ar: "مدينتي", en: "Madinaty", isFree: false },
    { ar: "الرحاب", en: "El Rehab", isFree: false },
    { ar: "شبرا", en: "Shubra", isFree: false },
    { ar: "العباسية", en: "Abbassia", isFree: false },
    { ar: "المقطم", en: "Mokattam", isFree: false },
    { ar: "عين شمس", en: "Ain Shams", isFree: false },
    { ar: "الزيتون", en: "El Zeitoun", isFree: false },
    { ar: "منطقة أخرى بالقاهرة", en: "Other Cairo Area", isFree: false },
  ],
  Giza: [
    { ar: "الدقي", en: "Dokki", isFree: false },
    { ar: "المهندسين", en: "Mohandessin", isFree: false },
    { ar: "الشيخ زايد", en: "Sheikh Zayed", isFree: false },
    { ar: "٦ أكتوبر", en: "6th of October", isFree: false },
    { ar: "الهرم", en: "Haram", isFree: false },
    { ar: "فيصل", en: "Faisal", isFree: false },
    { ar: "العجوزة", en: "Agouza", isFree: false },
    { ar: "حدائق الأهرام", en: "Haram Gardens", isFree: false },
    { ar: "منطقة أخرى بالجيزة", en: "Other Giza Area", isFree: false },
  ]
};

const checkIsFreeArea = (selectedArea: string) => {
  if (!selectedArea) return false;
  const freeKeys = ["مدينة نصر", "nasr city", "التجمع", "el tagamoa", "new cairo", "مصر الجديدة", "heliopolis"];
  return freeKeys.some(key => selectedArea.toLowerCase().includes(key));
};

// Live 24-Hour Decreasing Countdown Bar for Checkout Success Screen
function CheckoutCountdownBar({ createdAt, language }: { createdAt: string; language: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    percentRemaining: number;
    isExpired: boolean;
  }>({ hours: 24, minutes: 0, seconds: 0, percentRemaining: 100, isExpired: false });

  useEffect(() => {
    const updateTimer = () => {
      const orderTime = createdAt ? new Date(createdAt).getTime() : Date.now();
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
    <div className="bg-gradient-to-br from-dark-bg/90 to-dark-surface border border-primary/30 rounded-3xl p-5 text-start space-y-4 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 animate-pulse">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white">
              {language === "ar" ? "الوقت المتبقي المتوقع للتوصيل (خلال 24 ساعة)" : "Estimated Delivery Countdown (within 24 hours)"}
            </h4>
            <p className="text-[11px] text-dark-text-muted mt-0.5">
              {language === "ar" ? "التوصيل يتم خلال 24 ساعة كحد أقصى من موعد إرسال الطلب" : "Delivered within 24 hours max"}
            </p>
          </div>
        </div>

        {!timeLeft.isExpired ? (
          <div className="flex items-center gap-1.5 self-center sm:self-auto dir-ltr">
            <div className="bg-dark-bg border border-primary/40 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
              <span className="text-base font-black text-primary block leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[8px] text-gray-400 font-bold">ساعة</span>
            </div>
            <span className="text-primary font-bold text-base animate-ping">:</span>
            <div className="bg-dark-bg border border-primary/40 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
              <span className="text-base font-black text-primary block leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[8px] text-gray-400 font-bold">دقيقة</span>
            </div>
            <span className="text-primary font-bold text-base animate-ping">:</span>
            <div className="bg-dark-bg border border-primary/40 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
              <span className="text-base font-black text-primary block leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[8px] text-gray-400 font-bold">ثانية</span>
            </div>
          </div>
        ) : (
          <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {language === "ar" ? "قريب جداً من الوصول 🎉" : "Arriving Shortly 🎉"}
          </span>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <div className="w-full bg-dark-bg/80 border border-dark-border/80 h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary to-amber-500 transition-all duration-1000 shadow-md shadow-primary/20 relative"
            style={{ width: `${timeLeft.percentRemaining}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-dark-text-muted font-bold px-1">
          <span>{language === "ar" ? "تأكيد الطلب" : "Order Placed"}</span>
          <span className="text-primary font-extrabold">{Math.round(timeLeft.percentRemaining)}% {language === "ar" ? "متبقي من مهلة 24h" : "remaining"}</span>
          <span>{language === "ar" ? "الوصول النهائي" : "Arrival"}</span>
        </div>
      </div>
    </div>
  );
}

// Interactive 4-Stage Status Stepper for Checkout Success Screen
function CheckoutStatusPipeline({ language }: { language: string }) {
  const steps = [
    { id: "new", titleAr: "تم استلام الطلب", titleEn: "Order Placed", icon: ShoppingBag, active: true },
    { id: "preparing", titleAr: "قيد التجهيز والتقطيع", titleEn: "Butchering & Prep", icon: Utensils, active: false },
    { id: "delivering", titleAr: "في الطريق للتوصيل", titleEn: "Out for Delivery", icon: Truck, active: false },
    { id: "delivered", titleAr: "تم التسليم بنجاح", titleEn: "Delivered", icon: CheckCircle2, active: false },
  ];

  return (
    <div className="space-y-4 bg-dark-bg/60 border border-dark-border/80 rounded-3xl p-5 text-start">
      <div className="flex items-center justify-between border-b border-dark-border/60 pb-3">
        <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{language === "ar" ? "شريط مراحل وحالة الطلب التفاعلي" : "Interactive Order Pipeline"}</span>
        </h4>
        <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
          المرحلة 1 من 4
        </span>
      </div>

      <div className="relative py-2">
        <div className="absolute top-7 left-6 right-6 sm:left-10 sm:right-10 h-1.5 bg-dark-bg border border-dark-border rounded-full z-0" />
        
        <div className="grid grid-cols-4 gap-2 relative z-10">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isActive = idx === 0;

            return (
              <div key={st.id} className="flex flex-col items-center text-center space-y-1.5">
                <div
                  className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-dark-bg border-primary shadow-lg shadow-primary/30 scale-110 ring-4 ring-primary/20"
                      : "bg-dark-surface text-gray-500 border-dark-border"
                  }`}
                >
                  <Icon className={`h-5 w-5 stroke-[2.5] ${isActive ? "animate-bounce" : ""}`} />
                </div>
                <span className={`text-[10px] sm:text-xs font-black block ${isActive ? "text-primary font-bold" : "text-gray-500"}`}>
                  {language === "ar" ? st.titleAr : st.titleEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { t, language, dir } = useLanguage();
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("Cairo");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  // Saved order info for success screen
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    orderRef: string;
    isFreeDelivery: boolean;
    governorate: string;
    area: string;
    address: string;
    name: string;
    createdAt: string;
  } | null>(null);

  // Validation logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t("requiredField");
    }

    // Egyptian phone validation: Starts with 010, 011, 012, or 015 and has 11 digits
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phone.trim()) {
      newErrors.phone = t("requiredField");
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = t("invalidPhone");
    }

    if (!governorate) {
      newErrors.governorate = t("requiredField");
    }

    if (!area.trim()) {
      newErrors.area = t("requiredField");
    }

    if (!address.trim()) {
      newErrors.address = t("requiredField");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (subtotal < 600) {
      alert(
        language === "ar"
          ? `عذراً، الحد الأدنى لإتمام الطلب هو 600 ج.م. إجمالي السلة الحالي: ${subtotal} ج.م (باقي ${600 - subtotal} ج.م).`
          : `Minimum order limit is 600 EGP. Current cart subtotal: ${subtotal} EGP (${600 - subtotal} EGP left).`
      );
      return;
    }

    setIsSubmitting(true);

    const randRef = `DM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(randRef);

    const createdAtIso = new Date().toISOString();
    const isFree = checkIsFreeArea(area);

    setLastOrderDetails({
      orderRef: randRef,
      isFreeDelivery: isFree,
      governorate,
      area,
      address,
      name,
      createdAt: createdAtIso
    });

    const newOrder = {
      id: randRef,
      customerName: name,
      phone,
      governorate,
      area,
      address,
      items: cart.map(item => ({
        id: item.product.id,
        nameAr: item.product.nameAr,
        nameEn: item.product.nameEn,
        price: item.product.price,
        quantity: item.quantity
      })),
      totalValue: total,
      status: "new",
      createdAt: createdAtIso
    };

    // Save order details to localstorage
    try {
      const savedOrders = JSON.parse(localStorage.getItem("delicious_meats_orders") || "[]");
      savedOrders.unshift(newOrder);
      localStorage.setItem("delicious_meats_orders", JSON.stringify(savedOrders));
      localStorage.setItem("dm_orders", JSON.stringify(savedOrders));
    } catch (err) {
      console.error(err);
    }

    // Send order to central backend API
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });
    } catch (err) {
      console.error("API send order error:", err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess && lastOrderDetails) {
    const isFree = lastOrderDetails.isFreeDelivery;
    
    // Custom WhatsApp message & button label based on free vs paid area
    let whatsappText = "";
    if (!isFree) {
      whatsappText = `مرحباً، أود الاستفسار عن رسوم التوصيل لطلبي رقم: #${lastOrderDetails.orderRef}\nاسم العميل: ${lastOrderDetails.name}\nالعنوان: ${lastOrderDetails.governorate} - ${lastOrderDetails.area} - ${lastOrderDetails.address}`;
    } else {
      whatsappText = `مرحباً، كود طلبي هو: #${lastOrderDetails.orderRef}\nاسم العميل: ${lastOrderDetails.name}\nالعنوان: ${lastOrderDetails.governorate} - ${lastOrderDetails.area}`;
    }

    const whatsappUrl = `https://wa.me/201043066133?text=${encodeURIComponent(whatsappText)}`;

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12 bg-dark-bg flex items-center justify-center">
          <div className="max-w-2xl w-full mx-auto px-6 py-10 bg-dark-surface border border-dark-border rounded-3xl text-center space-y-6 shadow-2xl animate-in fade-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto stroke-[2.5] animate-bounce" />
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{t("successTitle")}</h1>
              <p className="text-xs text-dark-text-muted leading-relaxed">
                {t("successSubtitle")}
              </p>
            </div>

            {/* Order Reference Details */}
            <div className="bg-dark-bg border border-dark-border/80 rounded-2xl p-4 divide-y divide-dark-border/40 text-xs text-start">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-dark-text-muted">{t("orderRef")}</span>
                <span className="font-extrabold text-primary text-sm">#{lastOrderDetails.orderRef}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-dark-text-muted">المنطقة والعنوان:</span>
                <span className="font-bold text-white text-right max-w-[250px] truncate">{lastOrderDetails.governorate} - {lastOrderDetails.area}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-dark-text-muted">حالة التوصيل:</span>
                <span className={`font-bold ${isFree ? "text-emerald-400" : "text-amber-400"}`}>
                  {isFree ? "توصيل مجاني 🎉" : "رسوم التوصيل تتحدد لاحقاً 💬"}
                </span>
              </div>
            </div>

            {/* Dynamic Motion Visual Banner */}
            <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/30 rounded-2xl p-4 flex items-center gap-4 text-start">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xl flex-shrink-0 animate-pulse">
                ✨
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">
                  {language === "ar" ? "تم استلام طلبك بنجاح وجاري مراجعة وتجهيز الوجبة 🔪" : "Order received and being routed to expert butchers"}
                </h4>
                <p className="text-[11px] text-dark-text-muted mt-0.5">
                  {language === "ar" ? "شاهد العد التنازلي التفاعلي ومراحل التوصيل أدناه." : "View live countdown and pipeline progress below."}
                </p>
              </div>
            </div>

            {/* Live 24-Hour Countdown Bar (Embedded Directly) */}
            <CheckoutCountdownBar createdAt={lastOrderDetails.createdAt} language={language} />

            {/* Interactive 4-Stage Order Pipeline Stepper (Embedded Directly) */}
            <CheckoutStatusPipeline language={language} />

            {/* QR Code & Digital Invoice Button */}
            <div className="bg-dark-bg/80 border border-dark-border/80 rounded-2xl p-4 text-center space-y-2">
              <div className="flex justify-center">
                {/* eslint-disable-next-html-extension/next-image-unoptimized */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                    (typeof window !== "undefined" ? window.location.origin : "https://deliciousmeats.vercel.app") + `/invoice?id=${encodeURIComponent(lastOrderDetails.orderRef)}`
                  )}`}
                  alt={`QR Code Invoice #${lastOrderDetails.orderRef}`}
                  className="w-20 h-20 object-contain rounded-lg bg-white p-1 shadow-md"
                />
              </div>
              <p className="text-[10px] text-gray-400 font-bold">
                📱 امسح كود الـ QR للوصول للفاتورة الرقمية وطباعتها أونلاين
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">

              {/* Special WhatsApp Inquiry Button for Custom Fee Areas */}
              {!isFree ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-500 active:scale-95 transition-all duration-200 shadow-xl shadow-emerald-600/30 text-xs sm:text-sm animate-pulse"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.555 4.197 1.608 6.02L.051 24l6.096-1.597c1.764.962 3.766 1.47 5.884 1.47 6.647 0 12.032-5.385 12.032-12.031S18.678 0 12.031 0zm6.541 17.001c-.274.773-1.359 1.416-2.215 1.596-.587.123-1.353.223-3.931-.844-3.3-1.365-5.426-4.71-5.59-4.93-.163-.22-1.336-1.78-1.336-3.396 0-1.616.844-2.41 1.144-2.738.3-.327.654-.409.873-.409.219 0 .437.003.627.013.201.01.47-.076.735.56.274.654.929 2.27.1009 2.434.081.164.136.356.027.573-.109.219-.164.355-.327.546-.164.191-.345.427-.148.766.196.338.871 1.437 1.87 2.327 1.285 1.144 2.368 1.5 2.707 1.664.338.164.536.136.733-.092.197-.228.844-.982 1.07-1.319.227-.338.455-.282.764-.164.309.119 1.961.925 2.298 1.093.338.164.563.246.646.382.082.137.082.793-.192 1.566z" />
                  </svg>
                  <span>الاستفسار عن رسوم التوصيل 💬</span>
                </a>
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 text-white font-extrabold hover:bg-green-500 active:scale-95 transition-all duration-200 shadow-lg shadow-green-600/30 text-xs"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.555 4.197 1.608 6.02L.051 24l6.096-1.597c1.764.962 3.766 1.47 5.884 1.47 6.647 0 12.032-5.385 12.032-12.031S18.678 0 12.031 0zm6.541 17.001c-.274.773-1.359 1.416-2.215 1.596-.587.123-1.353.223-3.931-.844-3.3-1.365-5.426-4.71-5.59-4.93-.163-.22-1.336-1.78-1.336-3.396 0-1.616.844-2.41 1.144-2.738.3-.327.654-.409.873-.409.219 0 .437.003.627.013.201.01.47-.076.735.56.274.654.929 2.27.1009 2.434.081.164.136.356.027.573-.109.219-.164.355-.327.546-.164.191-.345.427-.148.766.196.338.871 1.437 1.87 2.327 1.285 1.144 2.368 1.5 2.707 1.664.338.164.536.136.733-.092.197-.228.844-.982 1.07-1.319.227-.338.455-.282.764-.164.309.119 1.961.925 2.298 1.093.338.164.563.246.646.382.082.137.082.793-.192 1.566z" />
                  </svg>
                  <span>أرسل كود طلبك على واتساب</span>
                </a>
              )}

              <Link
                href={`/track-order?id=${encodeURIComponent(lastOrderDetails.orderRef)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-primary text-dark-bg font-black hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25 text-xs sm:text-sm animate-pulse"
              >
                <span>🚚 تتبع حالة الطلب التفاعلية والعد التنازلي</span>
              </Link>

              <Link
                href={`/invoice?id=${encodeURIComponent(lastOrderDetails.orderRef)}`}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-bg border border-primary/40 text-primary font-extrabold hover:bg-primary/10 active:scale-95 transition-all duration-200 shadow-md text-xs"
              >
                <span>📄 عرض وتنزيل الفاتورة PDF</span>
              </Link>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-dark-border bg-dark-bg text-gray-300 font-bold hover:text-white hover:border-primary/40 transition-all duration-200 text-xs"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{t("continueShopping")}</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedAreasList = AREAS_BY_GOVERNORATE[governorate] || AREAS_BY_GOVERNORATE.Cairo;
  const isSelectedAreaFree = checkIsFreeArea(area);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 sm:py-12 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-8 flex items-center gap-2">
            <span className="text-primary">📝</span>
            {t("checkoutTitle")}
          </h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Customer Info Form */}
              <div className="lg:col-span-7 bg-dark-surface border border-dark-border rounded-2xl p-6 sm:p-8 space-y-6">
                
                {/* Header banner clarifying free delivery areas */}
                <div className="bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30 p-4 rounded-xl space-y-1">
                  <span className="text-xs font-black text-primary flex items-center gap-1.5">
                    <span>🎉</span>
                    <span>التوصيل مجاني للمناطق التالية:</span>
                  </span>
                  <p className="text-xs text-gray-200 font-bold">
                    (مدينة نصر • التجمع • مصر الجديدة)
                  </p>
                  <p className="text-[11px] text-gray-400">
                    للمناطق الأخرى داخل القاهرة والجيزة، سيتم تحديد وتأكيد رسوم التوصيل معكم عبر الواتساب.
                  </p>
                </div>

                <h2 className="text-lg font-black text-white border-b border-dark-border pb-4">
                  {t("shippingInfo")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("customerName")} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("customerNamePlaceholder")}
                      className={`w-full bg-dark-bg border ${errors.name ? "border-red-500" : "border-dark-border"} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("phoneNumber")} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("phoneNumberPlaceholder")}
                      className={`w-full bg-dark-bg border ${errors.phone ? "border-red-500" : "border-dark-border"} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
                      dir="ltr"
                    />
                    {errors.phone && <p className="text-xs text-red-500 leading-relaxed">{errors.phone}</p>}
                  </div>

                  {/* Governorate dropdown (Cairo and Giza ONLY) */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("governorate")} <span className="text-primary">*</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => {
                        setGovernorate(e.target.value);
                        setArea("");
                      }}
                      className={`w-full bg-dark-bg border ${errors.governorate ? "border-red-500" : "border-dark-border"} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors`}
                    >
                      <option value="">{t("selectGovernorate")}</option>
                      {GOVERNORATES.map((gov) => {
                        const label = language === "ar" ? gov.ar : gov.en;
                        return (
                          <option key={gov.en} value={gov.en}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                    {errors.governorate && <p className="text-xs text-red-500">{errors.governorate}</p>}
                  </div>

                  {/* Area dependent dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("area")} <span className="text-primary">*</span>
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className={`w-full bg-dark-bg border ${errors.area ? "border-red-500" : "border-dark-border"} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors`}
                    >
                      <option value="">
                        {!governorate
                          ? (language === "ar" ? "-- اختر المحافظة أولاً --" : "-- Select Governorate First --")
                          : (language === "ar" ? `-- اختر المنطقة داخل ${governorate === "Cairo" ? "القاهرة" : "الجيزة"} --` : `-- Select Area in ${governorate === "Cairo" ? "Cairo" : "Giza"} --`)}
                      </option>
                      {governorate && selectedAreasList.map((aObj) => {
                        const label = language === "ar" ? aObj.ar : aObj.en;
                        const freeTag = aObj.isFree ? (language === "ar" ? " (توصيل مجاني 🎉)" : " (Free Delivery 🎉)") : "";
                        return (
                          <option key={aObj.en} value={aObj.ar}>
                            {label}{freeTag}
                          </option>
                        );
                      })}
                    </select>
                    {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
                  </div>

                  {/* Dynamic Delivery Fee Alert Notice based on selected area */}
                  {area && (
                    <div className="pt-1">
                      {isSelectedAreaFree ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                          <span>🎉 التوصيل مجاني لهذه المنطقة ({area})!</span>
                        </div>
                      ) : (
                        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-3.5 rounded-xl text-xs leading-relaxed font-semibold flex items-start gap-2.5">
                          <span className="text-base shrink-0">💬</span>
                          <div>
                            <strong className="block text-amber-400 font-bold mb-0.5">تنبيه رسوم التوصيل:</strong>
                            <span>التوصيل مجاني لمناطق (مدينة نصر، التجمع، مصر الجديدة). بالنسبة لمنطقة ({area}) يتم تحديد رسوم التوصيل لاحقاً وتأكيدها معكم فور الطلب.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Detailed Address field */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("detailedAddress")} <span className="text-primary">*</span>
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t("detailedAddressPlaceholder")}
                      rows={3}
                      className={`w-full bg-dark-bg border ${errors.address ? "border-red-500" : "border-dark-border"} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none`}
                    />
                    {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-primary text-dark-bg font-extrabold text-sm sm:text-base hover:bg-primary-hover active:scale-98 transition-all duration-200 shadow-lg shadow-primary/25 disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? t("placingOrder") : t("placeOrder")}
                  </button>

                </form>
              </div>

              {/* Right: Order Review */}
              <div className="lg:col-span-5 bg-dark-surface border border-dark-border rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-black text-white border-b border-dark-border pb-4">
                  {t("orderReview")}
                </h2>

                {/* Items preview list */}
                <div className="divide-y divide-dark-border/40 max-h-60 overflow-y-auto pr-2">
                  {cart.map((item) => {
                    const name = language === "ar" ? item.product.nameAr : item.product.nameEn;
                    return (
                      <div key={item.product.id} className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <span className="h-8 w-8 rounded bg-dark-bg border border-dark-border flex items-center justify-center text-base flex-shrink-0">
                            {item.product.category === "meats" ? "🥩" : item.product.category === "poultry" ? "🍗" : "🔥"}
                          </span>
                          <div>
                            <span className="font-bold text-white block line-clamp-1">{name}</span>
                            <span className="text-[10px] text-primary block mt-0.5">{item.product.weight || "1 kg"} x {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-white flex-shrink-0">
                          {item.product.price * item.quantity} {t("currency")}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-dark-border pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-dark-text-muted">{t("subtotal")}</span>
                    <span className="font-bold text-white">{subtotal} {t("currency")}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-dark-text-muted">{t("deliveryFee")}</span>
                    <span className="font-bold text-white">
                      {!area || isSelectedAreaFree ? (
                        <span className="text-emerald-400 font-bold">مجانًا 🎉</span>
                      ) : (
                        <span className="text-amber-400 font-extrabold">سيتم التحديد لاحقاً 💬</span>
                      )}
                    </span>
                  </div>

                  <div className="border-t border-dark-border/60 pt-4 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-bold text-white">{t("grandTotal")}</span>
                    <span className="text-lg sm:text-xl font-black text-primary">{total} {t("currency")}</span>
                  </div>
                </div>

                {/* Cash on delivery warning */}
                <div className="bg-dark-bg/60 border border-dark-border/80 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-dark-text-muted">
                  <div className="text-base">💵</div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">{t("cashOnDeliveryOnly")}</span>
                    {language === "ar"
                      ? "الدفع عند استلام منتجاتك يدويًا. لا توجد قنوات دفع إلكتروني متاحة حاليًا."
                      : "Handover payment upon receiving your cuts. Electronic payment channels are unavailable."}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-12 px-6 bg-dark-surface rounded-2xl border border-dark-border space-y-6">
              <span className="text-4xl">🛒</span>
              <h2 className="text-xl font-bold text-white">{language === "ar" ? "سلتك فارغة، لا يوجد شيء لدفعه!" : "Your cart is empty, nothing to checkout!"}</h2>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-xl bg-primary text-dark-bg font-extrabold hover:bg-primary-hover transition-all duration-200"
              >
                {t("backToShop")}
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
