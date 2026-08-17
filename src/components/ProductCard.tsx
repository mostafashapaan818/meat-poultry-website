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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
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
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-dark-bg/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-primary/30">
            {product.weight || "1 kg"}
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
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-border/60">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-white">
              {product.price}
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
