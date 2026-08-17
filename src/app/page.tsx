"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import DailyDishSection from "@/components/DailyDishSection";
import { useLanguage } from "@/context/LanguageContext";
import { mockProducts } from "@/data/products";
import { ArrowLeft, ArrowRight, ShieldCheck, Flame, Award } from "lucide-react";

export default function Home() {
  const { t, language, dir } = useLanguage();

  // Filter 6-8 best selling products
  const bestSellers = mockProducts.filter((product) => product.isBestSeller).slice(0, 8);

  const categories = [
    {
      id: "meats",
      slug: "meats",
      titleKey: "meats",
      descKey: "categoryMeatsDesc",
      image: "/images/meats_banner.png",
      color: "border-red-500/20 hover:border-red-500/40"
    },
    {
      id: "poultry",
      slug: "poultry",
      titleKey: "poultry",
      descKey: "categoryPoultryDesc",
      image: "/images/poultry_banner.png",
      color: "border-amber-500/20 hover:border-amber-500/40"
    },
    {
      id: "other",
      slug: "other",
      titleKey: "other",
      descKey: "categoryOtherDesc",
      image: "/images/other_banner.png",
      color: "border-orange-500/20 hover:border-orange-500/40"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pb-24 lg:pt-20 lg:pb-32 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_70%)]">
          {/* Logo Background Watermark */}
          <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[550px] sm:h-[550px] opacity-10 sm:opacity-15 pointer-events-none select-none z-0">
            {/* eslint-disable-next-html-extension/next-image-unoptimized */}
            <img
              src="/images/logo.png"
              alt=""
              className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(212,175,55,0.3)] brightness-125"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column (Content) */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs sm:text-sm font-bold text-primary">
                  <Award className="h-4 w-4" />
                  <span>
                    {language === "ar" ? "لحوم فاخرة مضمونة المصدر" : "Premium Origin Guaranteed Meats"}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {t("heroTitle")}
                </h1>
                
                <p className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {t("heroSubtitle")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/category/meats"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-dark-bg font-extrabold text-center hover:bg-primary-hover active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <span>{t("heroCTA")}</span>
                    {dir === "rtl" ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                  </Link>
                  <Link
                    href="/category/poultry"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-dark-border bg-dark-surface/40 hover:bg-dark-surface hover:border-primary/40 font-bold text-center transition-all duration-200 text-white"
                  >
                    {language === "ar" ? "تصفح الدواجن" : "Browse Poultry"}
                  </Link>
                </div>

                {/* Subtle Trust Indicators */}
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 text-xs text-dark-text-muted">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>{language === "ar" ? "مطابق للمواصفات الصحية" : "100% Food Safe"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-primary" />
                    <span>{language === "ar" ? "جاهز للشواء والطهي" : "Ready for Cooking"}</span>
                  </div>
                </div>
              </div>

              {/* Right Column (Aesthetic Image Showcase) */}
              <div className="lg:col-span-6 relative">
                <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-dark-border p-2 bg-dark-surface/30">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary/30 to-transparent rounded-2xl blur-lg opacity-40 animate-pulse-slow" />
                  
                  <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[400px] w-full">
                    <Image
                      src="/images/meats_banner.png"
                      alt="Premium Ribeye Steak"
                      fill
                      priority
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 bg-dark-bg/85 border border-primary/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {language === "ar" ? "ريب آي معرق ذهبي" : "Golden Marbled Ribeye"}
                        </h4>
                        <p className="text-[10px] text-primary mt-0.5 font-semibold">
                          {language === "ar" ? "متوفر حالياً بالقسم" : "Available in stock"}
                        </p>
                      </div>
                      <span className="text-lg font-black text-white">
                        520 <span className="text-xs text-primary">{t("currency")}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-16 bg-[#0B0B0E] border-t border-b border-dark-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 text-center sm:text-start gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  ★ {t("bestSellers")}
                </h2>
                <p className="text-xs sm:text-sm text-dark-text-muted mt-1.5">
                  {t("bestSellersSub")}
                </p>
              </div>
              <Link
                href="/category/meats"
                className="text-xs sm:text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1"
              >
                <span>{language === "ar" ? "عرض جميع المنتجات" : "View All Products"}</span>
                {dir === "rtl" ? <span>←</span> : <span>→</span>}
              </Link>
            </div>

            {/* Horizontal Scroll Grid on Mobile, Grid on Desktop */}
            <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin scrollbar-thumb-dark-border snap-x hide-scrollbar md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0">
              {bestSellers.map((product) => (
                <div key={product.id} className="min-w-[280px] sm:min-w-[300px] snap-align-start md:min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Dish / Dish of the Day Section */}
        <DailyDishSection />

        {/* Categories Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                {t("categories")}
              </h2>
              <p className="text-xs sm:text-sm text-dark-text-muted mt-2">
                {t("categoriesSub")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((cat) => {
                const title = t(cat.titleKey);
                const desc = t(cat.descKey);

                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className={`group relative flex flex-col justify-between h-[360px] rounded-2xl overflow-hidden border ${cat.color} bg-dark-surface/40 hover:bg-dark-surface transition-all duration-300 shadow-xl`}
                  >
                    {/* Background Image Container */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={cat.image}
                        alt={title}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="object-cover brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                    </div>

                    {/* Category Label at Top */}
                    <div className="relative z-10 p-6 flex justify-between items-start">
                      <span className="text-2xl">
                        {cat.id === "meats" ? "🥩" : cat.id === "poultry" ? "🍗" : "🔥"}
                      </span>
                      <span className="bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase">
                        {language === "ar" ? "قـسـم" : "Section"}
                      </span>
                    </div>

                    {/* Category Content at Bottom */}
                    <div className="relative z-10 p-6 space-y-3">
                      <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {desc}
                      </p>
                      
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline">
                        <span>{t("viewCategory")}</span>
                        {dir === "rtl" ? <span>←</span> : <span>→</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
