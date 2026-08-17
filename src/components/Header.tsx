"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, Globe } from "lucide-react";

export default function Header() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const navLinks = [
    { href: "/category/meats", labelKey: "meats" },
    { href: "/category/poultry", labelKey: "poultry" },
    { href: "/category/other", labelKey: "other" },
    { href: "/track-order", labelKey: "trackOrder" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Container */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5">
              {!logoError ? (
                <Image
                  src="/images/logo.png"
                  alt={t("brandName")}
                  width={42}
                  height={42}
                  className="rounded-xl object-contain w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : null}
              <div className="flex flex-col">
                <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white leading-tight">
                  {t("brandName")}
                </span>
                <span className="text-[9px] sm:text-[10px] text-primary tracking-widest opacity-90 hidden sm:block">
                  {t("brandSub")}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <div className={`flex gap-6 ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
              <Link
                href="/"
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary border-b-2 border-primary pb-1" : "text-gray-300"
                }`}
              >
                {t("home")}
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-gray-300"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-dark-border bg-dark-bg/80 text-xs font-bold text-gray-200 hover:text-primary hover:border-primary transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 sm:p-2.5 rounded-full border border-dark-border bg-dark-bg/80 text-gray-200 hover:text-primary hover:border-primary transition-all duration-200 flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-dark-bg text-[10px] font-black h-4.5 w-4.5 sm:h-5 sm:w-5 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl border border-dark-border bg-dark-bg/80 text-gray-200 hover:text-primary hover:border-primary transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-surface/95 border-b border-dark-border shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-3 duration-200">
          <div className="px-4 pt-3 pb-5 space-y-2 text-center flex flex-col items-center">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block w-full py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                pathname === "/" ? "text-primary bg-dark-bg/80 border border-primary/20" : "text-gray-200 hover:bg-dark-bg/40"
              }`}
            >
              {t("home")}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.href) ? "text-primary bg-dark-bg/80 border border-primary/20" : "text-gray-200 hover:bg-dark-bg/40"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
