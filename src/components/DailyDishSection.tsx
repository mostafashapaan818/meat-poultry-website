"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DailyRecipe, getStoredDailyRecipes } from "@/data/dailyRecipes";
import { mockProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Clock, Users, Sparkles, ChefHat, CheckCircle2, ArrowLeft, ArrowRight, BookOpen, UtensilsCrossed, X, ShoppingBag } from "lucide-react";

export default function DailyDishSection() {
  const { language, dir } = useLanguage();
  const [recipes, setRecipes] = useState<DailyRecipe[]>(getStoredDailyRecipes());
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(6); // Default Saturday
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions">("ingredients");
  const [isCutModalOpen, setIsCutModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Set active day to today's day of week
    const todayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    setSelectedDayIndex(todayIndex);
    
    // Load from localStorage if updated by admin
    const loaded = getStoredDailyRecipes();
    setRecipes(loaded);
  }, []);

  // Listen to custom storage update event if updated in dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      setRecipes(getStoredDailyRecipes());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const currentRecipe = recipes.find((r) => r.dayIndex === selectedDayIndex) || recipes[0];

  // Days order array matching Sat (6), Sun (0), Mon (1), Tue (2), Wed (3), Thu (4), Fri (5)
  const daysOrder = [
    { index: 6, labelAr: "السبت", labelEn: "Sat" },
    { index: 0, labelAr: "الأحد", labelEn: "Sun" },
    { index: 1, labelAr: "الإثنين", labelEn: "Mon" },
    { index: 2, labelAr: "الثلاثاء", labelEn: "Tue" },
    { index: 3, labelAr: "الأربعاء", labelEn: "Wed" },
    { index: 4, labelAr: "الخميس", labelEn: "Thu" },
    { index: 5, labelAr: "الجمعة", labelEn: "Fri" },
  ];

  const todayIndex = typeof window !== "undefined" ? new Date().getDay() : 6;

  return (
    <section className="py-16 sm:py-24 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_70%)] relative border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary mb-3 shadow-inner">
            <ChefHat className="h-4 w-4" />
            <span>{language === "ar" ? "وصفة اليوم الشيف" : "Chef's Daily Special"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>{language === "ar" ? "طبق اليوم ووصفات الأسبوع" : "Dish of the Day & Weekly Recipes"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-dark-text-muted mt-2 leading-relaxed">
            {language === "ar"
              ? "استمتع كل يوم بوصفة مختلفة فاخرة من مطبخ ديليشس ميتس مع المكونات المقترحة وطريقة التحضير خطوة بخطوة."
              : "Discover a delicious new gourmet recipe every single day with suggested ingredients and step-by-step preparation guides."}
          </p>
        </div>

        {/* Days Navigation Bar */}
        <div className="flex justify-center mb-10">
          <div className="bg-dark-surface/80 p-1.5 rounded-2xl border border-dark-border flex flex-wrap gap-1.5 sm:gap-2 justify-center max-w-full overflow-x-auto shadow-2xl">
            {daysOrder.map((day) => {
              const isSelected = selectedDayIndex === day.index;
              const isToday = todayIndex === day.index;
              const label = language === "ar" ? day.labelAr : day.labelEn;

              return (
                <button
                  key={day.index}
                  onClick={() => setSelectedDayIndex(day.index)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-dark-bg shadow-lg shadow-primary/25 scale-[1.03]"
                      : "text-gray-400 hover:text-white hover:bg-dark-bg/60"
                  }`}
                >
                  <span>{label}</span>
                  {isToday && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase ${
                      isSelected ? "bg-dark-bg text-primary" : "bg-primary/20 text-primary"
                    }`}>
                      {language === "ar" ? "اليوم" : "Today"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recipe Display Main Card */}
        {currentRecipe && (
          <div className="bg-dark-surface border border-dark-border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Image Showcase */}
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[500px] bg-dark-bg">
                <Image
                  src={currentRecipe.image}
                  alt={language === "ar" ? currentRecipe.titleAr : currentRecipe.titleEn}
                  fill
                  sizes="(max-w-1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-black/30" />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-dark-bg/80 border border-primary/30 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-white">
                    {language === "ar" ? currentRecipe.dayNameAr : currentRecipe.dayNameEn}
                  </span>
                </div>

                {/* Bottom Quick Info */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap gap-3">
                  <div className="bg-dark-bg/85 border border-dark-border/80 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-200">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{language === "ar" ? currentRecipe.prepTimeAr : currentRecipe.prepTimeEn}</span>
                  </div>
                  <div className="bg-dark-bg/85 border border-dark-border/80 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-200">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{language === "ar" ? currentRecipe.servingsAr : currentRecipe.servingsEn}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Recipe Details & Tabs */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                
                <div>
                  {/* Title & Desc */}
                  <div className="space-y-3 mb-6">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                      {language === "ar" ? currentRecipe.titleAr : currentRecipe.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark-text-muted leading-relaxed">
                      {language === "ar" ? currentRecipe.descAr : currentRecipe.descEn}
                    </p>
                  </div>

                  {/* Tabs Selector for Ingredients vs Steps */}
                  <div className="flex border-b border-dark-border/80 mb-6 gap-6">
                    <button
                      onClick={() => setActiveTab("ingredients")}
                      className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all relative ${
                        activeTab === "ingredients"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <UtensilsCrossed className="h-4 w-4" />
                      <span>{language === "ar" ? "المكونات المقترحة" : "Suggested Ingredients"}</span>
                      <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full font-black">
                        {(language === "ar" ? currentRecipe.ingredientsAr : currentRecipe.ingredientsEn).length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("instructions")}
                      className={`pb-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all relative ${
                        activeTab === "instructions"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{language === "ar" ? "طريقة التحضير" : "Preparation Method"}</span>
                      <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full font-black">
                        {(language === "ar" ? currentRecipe.instructionsAr : currentRecipe.instructionsEn).length}
                      </span>
                    </button>
                  </div>

                  {/* Tab Content 1: Ingredients */}
                  {activeTab === "ingredients" && (
                    <div className="space-y-2.5 animate-in fade-in-50 duration-200">
                      {(language === "ar" ? currentRecipe.ingredientsAr : currentRecipe.ingredientsEn).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 rounded-xl bg-dark-bg/50 border border-dark-border/50 text-xs sm:text-sm text-gray-200 hover:border-primary/30 transition-colors"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content 2: Instructions */}
                  {activeTab === "instructions" && (
                    <div className="space-y-3 animate-in fade-in-50 duration-200">
                      {(language === "ar" ? currentRecipe.instructionsAr : currentRecipe.instructionsEn).map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-dark-bg/50 border border-dark-border/50 text-xs sm:text-sm text-gray-200"
                        >
                          <span className="h-6 w-6 rounded-full bg-primary/20 border border-primary/30 text-primary font-black text-xs flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed mt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* YouTube Video Player */}
                  {currentRecipe.videoUrl && (
                    <div className="mt-5 rounded-2xl overflow-hidden border border-primary/30 shadow-lg shadow-primary/10">
                      <div className="bg-dark-bg/60 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2 border-b border-primary/20">
                        <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="text-xs font-bold text-white">
                          {language === "ar" ? "شاهد فيديو الوصفة" : "Watch Recipe Video"}
                        </span>
                      </div>
                      <div className="relative w-full" style={{paddingBottom: "56.25%"}}>
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${
                            currentRecipe.videoUrl.includes("youtu.be/")
                              ? currentRecipe.videoUrl.split("youtu.be/")[1]?.split("?")[0]
                              : currentRecipe.videoUrl.split("v=")[1]?.split("&")[0]
                          }?rel=0&modestbranding=1`}
                          title={language === "ar" ? currentRecipe.titleAr : currentRecipe.titleEn}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action CTA */}
                <div className="pt-4 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-dark-text-muted">
                    {language === "ar"
                      ? "احصل على أفضل القطعيات الطازجة لتطبيق هذه الوصفة اليوم!"
                      : "Get fresh top-grade cuts delivered to recreate this dish today!"}
                  </div>
                  <button
                    onClick={() => setIsCutModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-dark-bg font-extrabold text-xs sm:text-sm hover:bg-primary-hover active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>
                      {language === "ar" ? "اطلب القطعية الخاصة بهذه الوصفة" : "Order Meat for this Recipe"}
                    </span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Dish Cut Products Popup Modal */}
      {isCutModalOpen && currentRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            onClick={() => setIsCutModalOpen(false)}
            className="absolute inset-0 bg-dark-bg/85 backdrop-blur-md"
          />

          <div className="relative bg-dark-surface border border-dark-border w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 z-10 max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-dark-border/80 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <ChefHat className="h-4 w-4" />
                  <span>{language === "ar" ? "قطعيات طبق اليوم" : "Dish of the Day Cuts"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {language === "ar" ? currentRecipe.titleAr : currentRecipe.titleEn}
                </h3>
              </div>

              <button
                onClick={() => setIsCutModalOpen(false)}
                className="p-2 rounded-xl border border-dark-border text-gray-400 hover:text-white hover:bg-dark-bg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - Products Grid */}
            <div className="overflow-y-auto flex-grow pr-1 pl-1">
              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                {language === "ar"
                  ? "اختر القطعيات والمكونات الطازجة اللازمة لإعداد هذه الوصفة وأضفها لسلتك مباشرة:"
                  : "Select the fresh cuts and ingredients needed for this recipe and add them to your cart:"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                {mockProducts
                  .filter((p) => p.category === (currentRecipe.relatedCutCategory || "meats"))
                  .slice(0, 6)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-dark-border/80 flex justify-end">
              <button
                onClick={() => setIsCutModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-primary text-dark-bg font-extrabold text-xs sm:text-sm hover:bg-primary-hover transition-colors"
              >
                {language === "ar" ? "إغلاق النافذة" : "Close"}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
