"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Plus, Check, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<"1kg" | "0.5kg">("1kg");

  const isMeatCategory = product.category === "meats";
  const currentPrice = isMeatCategory && selectedWeight === "0.5kg" ? Math.round(product.price / 2) : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMeatCategory && selectedWeight === "0.5kg") {
      const halfItem: Product = {
        ...product,
        id: `${product.id}_05kg`,
        nameAr: `${product.nameAr} (نصف كجم)`,
        nameEn: `${product.nameEn} (0.5 kg)`,
        price: Math.round(product.price / 2),
        weight: language === "ar" ? "نصف كجم" : "0.5 kg"
      };
      addToCart(halfItem, 1);
    } else {
      addToCart(product, 1);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const name = language === "ar" ? product.nameAr : product.nameEn;
  const desc = language === "ar" ? product.descAr : product.descEn;

  // Determine image source: if valid path/url use it, otherwise fallback to category banner
  const hasRealImage = product.image && (product.image.startsWith("/") || product.image.startsWith("http"));
  const fallbackBanner = `/images/${product.category === "meats" ? "meats" : product.category === "poultry" ? "poultry" : "other"}_banner.png`;
  const imgSrc = hasRealImage && !imgError ? product.image : fallbackBanner;

  const categoryColors = {
    meats: "from-red-950/40 via-amber-950/20 to-neutral-950",
    poultry: "from-amber-950/30 via-yellow-950/20 to-neutral-950",
    other: "from-orange-950/30 via-stone-900/20 to-neutral-950"
  };

  const displayWeightTag = isMeatCategory
    ? selectedWeight === "0.5kg"
      ? language === "ar" ? "نصف كجم" : "0.5 kg"
      : language === "ar" ? "1 كجم" : "1 kg"
    : product.weight || "1 kg";

  return (
    <div className="group flex flex-col justify-between bg-dark-surface border border-dark-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
      
      {/* Product Image Section */}
      <div className={`relative h-48 w-full bg-gradient-to-b ${categoryColors[product.category]} overflow-hidden border-b border-dark-border`}>
        {/* Real Product Image */}
        {/* eslint-disable-next-html-extension/next-image-unoptimized */}
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 via-transparent to-black/20 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-primary text-dark-bg text-[10px] font-black px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider">
              ★ {t("bestSellers")}
            </span>
          )}
        </div>

        {/* Weight Tag */}
        <div className="absolute bottom-2.5 right-3 z-10">
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-dark-bg/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-primary/30 shadow-md">
            ⚖️ {displayWeightTag}
          </span>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-dark-text-muted mt-1.5 line-clamp-2 leading-relaxed min-h-[40px]">
            {desc}
          </p>

          {/* Interactive Weight Selection Pill for Meat Products */}
          {isMeatCategory && (
            <div className="mt-3 p-1 bg-dark-bg/90 border border-dark-border rounded-xl flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight("1kg");
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-extrabold text-[11px] transition-all flex items-center justify-center gap-1 ${
                  selectedWeight === "1kg"
                    ? "bg-primary text-dark-bg shadow-md scale-[1.02]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{language === "ar" ? "1 كجم" : "1 kg"}</span>
                <span className="opacity-80">({product.price} ج.م)</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight("0.5kg");
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-extrabold text-[11px] transition-all flex items-center justify-center gap-1 ${
                  selectedWeight === "0.5kg"
                    ? "bg-primary text-dark-bg shadow-md scale-[1.02]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{language === "ar" ? "نصف كجم" : "0.5 kg"}</span>
                <span className="opacity-80">({Math.round(product.price / 2)} ج.م)</span>
              </button>
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-border/60">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-white">
              {currentPrice}
              <span className="text-xs sm:text-sm font-medium text-primary ml-1 mr-1">
                {t("currency")}
              </span>
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-lg border transition-all duration-300 flex items-center justify-center gap-1.5 ${
              added
                ? "bg-primary border-primary text-dark-bg scale-95"
                : "bg-dark-bg border-dark-border text-primary hover:bg-primary hover:text-dark-bg hover:border-primary"
            }`}
            title={t("addToCart")}
            aria-label={t("addToCart")}
          >
            {added ? (
              <>
                <Check className="h-4.5 w-4.5 stroke-[3]" />
                <span className="text-xs font-bold sm:inline hidden">{t("addedToCart")}</span>
              </>
            ) : (
              <>
                <Plus className="h-4.5 w-4.5 stroke-[3]" />
                <span className="text-xs font-bold sm:inline hidden">{t("addToCart")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
