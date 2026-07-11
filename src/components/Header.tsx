"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, ShieldAlert, Globe } from "lucide-react";

export default function Header() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const navLinks = [
    { href: "/category/meats", labelKey: "meats" },
    { href: "/category/poultry", labelKey: "poultry" },
    { href: "/category/other", labelKey: "other" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span className="text-primary font-black">★</span>
                {t("brandName")}
              </span>
              <span className="text-[10px] text-primary tracking-widest text-opacity-80">
                {t("brandSub")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {/* Nav links need spacing adjustment for RTL/LTR */}
            <div className={`flex gap-6 ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary border-b border-primary pb-1" : "text-gray-300"
                }`}
              >
                {t("home")}
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary border-b border-primary pb-1"
                      : "text-gray-300"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dark-border bg-dark-bg/60 text-xs sm:text-sm font-semibold text-gray-300 hover:text-primary hover:border-primary transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full border border-dark-border bg-dark-bg/60 text-gray-300 hover:text-primary hover:border-primary transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-dark-bg text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Portal Button */}
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg border border-dark-border bg-dark-bg/40 text-xs text-gray-400 hover:text-primary hover:border-primary hover:bg-dark-bg/80 transition-all duration-200"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>{t("adminLink")}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg border border-dark-border bg-dark-bg/60 text-gray-300 hover:text-primary hover:border-primary transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-effect border-b border-dark-border animate-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center flex flex-col items-center">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block w-full py-3 px-4 rounded-lg text-base font-semibold hover:bg-dark-surface/60 transition-colors ${
                pathname === "/" ? "text-primary bg-dark-surface" : "text-gray-300"
              }`}
            >
              {t("home")}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full py-3 px-4 rounded-lg text-base font-semibold hover:bg-dark-surface/60 transition-colors ${
                  isActive(link.href) ? "text-primary bg-dark-surface" : "text-gray-300"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className={`block w-full py-3 px-4 rounded-lg text-base font-semibold border-t border-dark-border text-gray-400 hover:text-primary transition-colors`}
            >
              {t("adminLink")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
