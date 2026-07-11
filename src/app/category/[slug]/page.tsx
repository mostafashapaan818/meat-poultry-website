"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { mockProducts } from "@/data/products";
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { t, language, dir } = useLanguage();
  
  // Sort states: 'default' | 'price-asc' | 'price-desc'
  const [sortBy, setSortBy] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Fits 8 per page to easily demonstrate pagination

  // Determine category display name
  const categoryNames = {
    meats: { ar: "لحوم فاخرة", en: "Premium Meats" },
    poultry: { ar: "دواجن طازجة", en: "Fresh Poultry" },
    other: { ar: "مستلزمات شواء وأخرى", en: "Grilling & Other" }
  };

  const currentCategoryName = categoryNames[slug as keyof typeof categoryNames] || { ar: slug, en: slug };
  const displayName = language === "ar" ? currentCategoryName.ar : currentCategoryName.en;

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => product.category === slug);
  }, [slug]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    if (sortBy === "price-asc") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return products.sort((a, b) => b.price - a.price);
    }
    return products; // Default
  }, [filteredProducts, sortBy]);

  // Paginated products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset page to 1 on sort change
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 sm:py-12 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Header */}
          <div className="mb-8">
            <div className={`flex items-center gap-2 text-xs sm:text-sm text-dark-text-muted mb-4 ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
              <Link href="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">{displayName}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-6">
              <div>
                <h1 className="text-3xl font-black text-white flex items-center gap-2">
                  <span className="text-primary">✦</span>
                  {displayName}
                </h1>
                <p className="text-xs sm:text-sm text-dark-text-muted mt-1">
                  {t("showingProducts", { count: sortedProducts.length.toString() })}
                </p>
              </div>

              {/* Filters UI */}
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium">
                  {t("sortBy")}:
                </span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="default">{t("sortDefault")}</option>
                  <option value="price-asc">{t("sortPriceLow")}</option>
                  <option value="price-desc">{t("sortPriceHigh")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-dark-border/40">
                  
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-dark-border bg-dark-surface text-gray-300 hover:text-primary hover:border-primary disabled:opacity-40 disabled:hover:text-gray-300 disabled:hover:border-dark-border transition-colors duration-200"
                    aria-label="Previous Page"
                  >
                    {dir === "rtl" ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`h-10 w-10 rounded-lg text-sm font-bold border transition-colors duration-200 ${
                          currentPage === page
                            ? "bg-primary border-primary text-dark-bg"
                            : "border-dark-border bg-dark-surface text-gray-300 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-dark-border bg-dark-surface text-gray-300 hover:text-primary hover:border-primary disabled:opacity-40 disabled:hover:text-gray-300 disabled:hover:border-dark-border transition-colors duration-200"
                    aria-label="Next Page"
                  >
                    {dir === "rtl" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-dark-surface rounded-2xl border border-dark-border">
              <span className="text-4xl">🥩</span>
              <h3 className="text-lg font-bold text-white mt-4">{t("noProducts")}</h3>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
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
