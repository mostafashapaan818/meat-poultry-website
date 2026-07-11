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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const name = language === "ar" ? product.nameAr : product.nameEn;
  const desc = language === "ar" ? product.descAr : product.descEn;

  // Render stylized product vector/icon based on category
  const renderProductGraphic = () => {
    const categoryColors = {
      meats: "from-red-950/40 via-amber-950/20 to-neutral-950",
      poultry: "from-amber-950/30 via-yellow-950/20 to-neutral-950",
      other: "from-orange-950/30 via-stone-900/20 to-neutral-950"
    };
    
    return (
      <div className={`relative h-48 w-full bg-gradient-to-b ${categoryColors[product.category]} flex items-center justify-center overflow-hidden border-b border-dark-border group-hover:scale-105 transition-transform duration-500`}>
        {/* Subtle decorative circles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
        
        {/* Category-based graphic representation */}
        <div className="flex flex-col items-center justify-center text-center p-4">
          <div className="h-16 w-16 rounded-full bg-dark-bg/80 border border-primary/20 flex items-center justify-center mb-3 shadow-lg group-hover:border-primary/60 transition-colors duration-300">
            {product.category === "meats" ? (
              <span className="text-3xl">🥩</span>
            ) : product.category === "poultry" ? (
              <span className="text-3xl">🍗</span>
            ) : (
              <span className="text-3xl">🔥</span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-80 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {product.weight || "1 kg"}
          </span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-dark-bg/95 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md border border-primary/30 uppercase tracking-wider">
            ❄ {t("frozenBadge")}
          </span>
          {product.isBestSeller && (
            <span className="bg-primary text-dark-bg text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
              ★ {t("bestSellers")}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="group flex flex-col justify-between bg-dark-surface border border-dark-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
      
      {/* Product Image Section */}
      <div className="relative overflow-hidden">
        {renderProductGraphic()}
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
