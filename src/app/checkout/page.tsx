"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ChevronRight, ChevronLeft, CreditCard, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";

// List of all 27 Egyptian governorates
const GOVERNORATES = [
  { ar: "القاهرة", en: "Cairo" },
  { ar: "الجيزة", en: "Giza" },
  { ar: "الإسكندرية", en: "Alexandria" },
  { ar: "القليوبية", en: "Qalyubia" },
  { ar: "الدقهلية", en: "Dakahlia" },
  { ar: "الشرقية", en: "Sharkia" },
  { ar: "المنوفية", en: "Monufia" },
  { ar: "الغربية", en: "Gharbia" },
  { ar: "البحيرة", en: "Beheira" },
  { ar: "كفر الشيخ", en: "Kafr El Sheikh" },
  { ar: "دمياط", en: "Damietta" },
  { ar: "بورسعيد", en: "Port Said" },
  { ar: "الإسماعيلية", en: "Ismailia" },
  { ar: "السويس", en: "Suez" },
  { ar: "الشرقية", en: "Sharkia" },
  { ar: "الفيوم", en: "Fayoum" },
  { ar: "بني سويف", en: "Beni Suef" },
  { ar: "المنيا", en: "Minya" },
  { ar: "أسيوط", en: "Assiut" },
  { ar: "سوهاج", en: "Sohag" },
  { ar: "قنا", en: "Qena" },
  { ar: "الأقصر", en: "Luxor" },
  { ar: "أسوان", en: "Aswan" },
  { ar: "البحر الأحمر", en: "Red Sea" },
  { ar: "الوادي الجديد", en: "New Valley" },
  { ar: "مطروح", en: "Matrouh" },
  { ar: "شمال سيناء", en: "North Sinai" },
  { ar: "جنوب سيناء", en: "South Sinai" },
];

export default function CheckoutPage() {
  const { t, language, dir } = useLanguage();
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

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

    setIsSubmitting(true);

    const randRef = `DM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(randRef);

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
      createdAt: new Date().toISOString()
    };

    // Save order details to localstorage
    try {
      const savedOrders = JSON.parse(localStorage.getItem("delicious_meats_orders") || "[]");
      savedOrders.unshift(newOrder);
      localStorage.setItem("delicious_meats_orders", JSON.stringify(savedOrders));
    } catch (err) {
      console.error(err);
    }

    // Send order to central backend API with multi-layer submission
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });
    } catch (err) {
      console.error("API send order error:", err);
    }

    // Direct backup POST to PHP MySQL URL if defined
    const phpUrl = process.env.NEXT_PUBLIC_PHP_API_URL;
    if (phpUrl) {
      try {
        await fetch(phpUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder)
        });
      } catch (err) {
        console.error("Direct PHP POST error:", err);
      }
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    const whatsappMessage = encodeURIComponent(`مرحباً، كود طلبي هو: #${orderRef}`);
    const whatsappUrl = `https://wa.me/201092719920?text=${whatsappMessage}`;

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16 bg-dark-bg flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-6 py-12 bg-dark-surface border border-dark-border rounded-2xl text-center space-y-6 shadow-xl animate-in fade-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto stroke-[2.5] animate-bounce" />
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{t("successTitle")}</h1>
              <p className="text-sm text-dark-text-muted leading-relaxed">
                {t("successSubtitle")}
              </p>
            </div>

            <div className="bg-dark-bg border border-dark-border/80 rounded-xl p-4 divide-y divide-dark-border/40 text-sm">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-dark-text-muted">{t("orderRef")}</span>
                <span className="font-extrabold text-primary">#{orderRef}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-dark-text-muted">{t("paymentMethod")}</span>
                <span className="font-bold text-white">{t("paymentMethodVal")}</span>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-600 text-white font-extrabold hover:bg-green-500 active:scale-95 transition-all duration-200 shadow-lg shadow-green-600/30 text-sm"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.555 4.197 1.608 6.02L.051 24l6.096-1.597c1.764.962 3.766 1.47 5.884 1.47 6.647 0 12.032-5.385 12.032-12.031S18.678 0 12.031 0zm6.541 17.001c-.274.773-1.359 1.416-2.215 1.596-.587.123-1.353.223-3.931-.844-3.3-1.365-5.426-4.71-5.59-4.93-.163-.22-1.336-1.78-1.336-3.396 0-1.616.844-2.41 1.144-2.738.3-.327.654-.409.873-.409.219 0 .437.003.627.013.201.01.47-.076.735.56.274.654.929 2.27.1009 2.434.081.164.136.356.027.573-.109.219-.164.355-.327.546-.164.191-.345.427-.148.766.196.338.871 1.437 1.87 2.327 1.285 1.144 2.368 1.5 2.707 1.664.338.164.536.136.733-.092.197-.228.844-.982 1.07-1.319.227-.338.455-.282.764-.164.309.119 1.961.925 2.298 1.093.338.164.563.246.646.382.082.137.082.793-.192 1.566z" />
                </svg>
                <span>أرسل كود طلبك على واتساب</span>
              </a>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-dark-border bg-dark-bg text-gray-300 font-bold hover:text-white hover:border-primary/40 transition-all duration-200 text-xs"
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
              
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 bg-dark-surface border border-dark-border rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-lg font-bold text-white border-b border-dark-border pb-3">
                  {t("customerInfo")}
                </h2>

                <div className="space-y-4">
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

                  {/* Governorate dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("governorate")} <span className="text-primary">*</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
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

                  {/* Area field */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-300 block">
                      {t("area")} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder={t("areaPlaceholder")}
                      className={`w-full bg-dark-bg border ${errors.area ? "border-red-500" : "border-dark-border"} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
                  </div>

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
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-primary text-dark-bg font-extrabold text-center hover:bg-primary-hover active:scale-95 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? t("submitting") : t("submitOrder")}</span>
                  {!isSubmitting && (dir === "rtl" ? <ArrowLeft className="h-4.5 w-4.5" /> : <ArrowRight className="h-4.5 w-4.5" />)}
                </button>
              </form>

              {/* Order Summary Sidebar */}
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
                      {deliveryFee > 0 ? `${deliveryFee} ${t("currency")}` : <span className="text-green-500 font-bold">{t("deliveryFree")}</span>}
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
