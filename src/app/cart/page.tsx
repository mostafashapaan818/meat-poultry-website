"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Info } from "lucide-react";

export default function CartPage() {
  const { t, language, dir } = useLanguage();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total
  } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 sm:py-12 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-8 flex items-center gap-2">
            <span className="text-primary">🛒</span>
            {t("cartTitle")}
          </h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-dark-text-muted uppercase tracking-wider border-b border-dark-border">
                  <div className="col-span-6">{t("product")}</div>
                  <div className="col-span-2 text-center">{t("price")}</div>
                  <div className="col-span-2 text-center">{t("quantity")}</div>
                  <div className="col-span-2 text-end">{t("total")}</div>
                </div>

                {cart.map((item) => {
                  const name = language === "ar" ? item.product.nameAr : item.product.nameEn;
                  const itemTotal = item.product.price * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className="bg-dark-surface border border-dark-border rounded-xl p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 transition-all duration-300 hover:border-primary/30"
                    >
                      {/* Product details info */}
                      <div className="col-span-6 flex items-center gap-4">
                        {/* Thumbnail icon graphic */}
                        <div className="h-16 w-16 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-2xl flex-shrink-0">
                          {item.product.category === "meats" ? "🥩" : item.product.category === "poultry" ? "🍗" : "🔥"}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-1">
                            {name}
                          </h3>
                          <span className="text-[10px] sm:text-xs text-primary font-semibold mt-0.5 block">
                            {item.product.weight || "1 kg"}
                          </span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-2 text-start sm:text-center flex sm:block items-center justify-between">
                        <span className="text-xs text-dark-text-muted sm:hidden">{t("price")}:</span>
                        <span className="text-sm font-extrabold text-white">
                          {item.product.price} <span className="text-[10px] font-medium text-primary">{t("currency")}</span>
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="col-span-2 flex sm:justify-center items-center gap-1.5 justify-between">
                        <span className="text-xs text-dark-text-muted sm:hidden">{t("quantity")}:</span>
                        <div className="flex items-center border border-dark-border bg-dark-bg rounded-lg overflow-hidden h-9">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-dark-surface transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 stroke-[3]" />
                          </button>
                          <span className="px-3 py-1 text-sm font-bold text-white bg-transparent text-center min-w-[2.5rem]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-dark-surface transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 stroke-[3]" />
                          </button>
                        </div>
                      </div>

                      {/* Line Total & Remove button */}
                      <div className="col-span-2 flex items-center justify-between sm:justify-end gap-4">
                        <span className="text-xs text-dark-text-muted sm:hidden">{t("total")}:</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm sm:text-base font-black text-white">
                            {itemTotal} <span className="text-[10px] font-semibold text-primary">{t("currency")}</span>
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            title={t("removeItem")}
                            aria-label={t("removeItem")}
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-dark-surface border border-dark-border rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-black text-white border-b border-dark-border pb-4">
                  {t("orderSummary")}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-text-muted">{t("subtotal")}</span>
                    <span className="font-bold text-white">
                      {subtotal} {t("currency")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-text-muted">{t("deliveryFee")}</span>
                    <span className="font-bold text-white">
                      {deliveryFee > 0 ? (
                        `${deliveryFee} ${t("currency")}`
                      ) : (
                        <span className="text-green-500 font-bold">{t("deliveryFree")}</span>
                      )}
                    </span>
                  </div>

                  {subtotal < 1500 && (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-[10px] sm:text-xs text-primary leading-relaxed flex gap-2">
                      <Info className="h-4 w-4 flex-shrink-0" />
                      <span>
                        {language === "ar"
                          ? "أضف بـ بقيمة " + (1500 - subtotal) + " ج.م إضافية للحصول على شحن مجاني!"
                          : "Add " + (1500 - subtotal) + " EGP more for FREE shipping!"}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-dark-border/60 pt-4 flex items-center justify-between">
                    <span className="text-base font-bold text-white">{t("grandTotal")}</span>
                    <span className="text-xl font-black text-primary">
                      {total} {t("currency")}
                    </span>
                  </div>
                </div>

                {/* Cash on Delivery Notice */}
                <div className="bg-dark-bg/60 border border-dark-border/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span>💵</span>
                    <span>{t("cashOnDeliveryOnly")}</span>
                  </div>
                  <p className="text-[10px] text-dark-text-muted leading-relaxed">
                    {language === "ar"
                      ? "نوفر الدفع نقدًا عند استلام طلبك لضمان معاينة وجودة المنتجات قبل الدفع."
                      : "We support cash on delivery to guarantee you inspect the cuts before making payment."}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-xl bg-primary text-dark-bg font-extrabold text-center hover:bg-primary-hover active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span>{t("checkoutButton")}</span>
                  {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Link>

                <Link
                  href="/"
                  className="w-full block py-2.5 text-center text-xs font-bold text-dark-text-muted hover:text-primary transition-colors duration-200"
                >
                  {t("backToShop")}
                </Link>
              </div>

            </div>
          ) : (
            /* Empty Cart State */
            <div className="max-w-md mx-auto text-center py-16 px-6 bg-dark-surface rounded-2xl border border-dark-border space-y-6 shadow-xl">
              <div className="h-20 w-20 mx-auto rounded-full bg-dark-bg border border-dark-border flex items-center justify-center text-3xl">
                🛒
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black text-white">{t("cartEmpty")}</h2>
                <p className="text-xs sm:text-sm text-dark-text-muted leading-relaxed">
                  {t("cartEmptyDesc")}
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-dark-bg font-extrabold hover:bg-primary-hover active:scale-95 transition-all duration-200 shadow-md"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                <span>{t("browseProducts")}</span>
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
