"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Truck, CreditCard, Sparkles } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060608] border-t border-dark-border mt-auto pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features list */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-dark-border/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-dark-surface border border-primary/20 text-primary">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {language === "ar" ? "توصيل طازج وسريع" : "Fast Fresh Delivery"}
              </h4>
              <p className="text-[10px] sm:text-xs text-dark-text-muted mt-0.5">
                {language === "ar" ? "سيارات مجهزة مبردة تحفظ طلبك طازجاً" : "Refrigerated temperature controlled logistics"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-dark-surface border border-primary/20 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {language === "ar" ? "جودة مضمونة ١٠٠٪" : "100% Quality Guaranteed"}
              </h4>
              <p className="text-[10px] sm:text-xs text-dark-text-muted mt-0.5">
                {language === "ar" ? "أعلى معايير النظافة والتعقيم" : "Highest sanitation standards"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-dark-surface border border-primary/20 text-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {t("paymentMethodVal")}
              </h4>
              <p className="text-[10px] sm:text-xs text-dark-text-muted mt-0.5">
                {t("cashOnDeliveryOnly")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-dark-surface border border-primary/20 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {language === "ar" ? "أفضل القطعيات" : "Premium Select Cuts"}
              </h4>
              <p className="text-[10px] sm:text-xs text-dark-text-muted mt-0.5">
                {language === "ar" ? "مجهزة على أيدي خبراء الجزارة" : "Crafted by professional butchers"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 text-xl font-bold text-white mb-3">
              {/* eslint-disable-next-html-extension/next-image-unoptimized */}
              <img
                src="/images/logo_v2.png"
                alt={t("brandName")}
                className="w-9 h-9 rounded-full object-cover border border-primary/40 flex-shrink-0"
              />
              <span>{t("brandName")}</span>
            </div>
            <p className="text-xs sm:text-sm text-dark-text-muted leading-relaxed">
              {language === "ar" 
                ? "علامة تجارية رائدة تقدم أجود أنواع اللحوم الحمراء والدواجن الفاخرة الطازجة في مصر، نوفر لبيتك أفضل تجربة تسوق آمنة وسريعة." 
                : "A leading brand delivering the finest selected fresh meats and premium poultry across Egypt. We ensure a safe, high-end shopping experience."}
            </p>
          </div>

          {/* Column 2: Categories Links */}
          <div className="flex flex-col md:items-center">
            <div>
              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                {language === "ar" ? "أقسام المتجر" : "Store Sections"}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-dark-text-muted">
                <li>
                  <Link href="/category/meats" className="hover:text-primary transition-colors">
                    {t("meats")}
                  </Link>
                </li>
                <li>
                  <Link href="/category/poultry" className="hover:text-primary transition-colors">
                    {t("poultry")}
                  </Link>
                </li>
                <li>
                  <Link href="/category/other" className="hover:text-primary transition-colors">
                    {t("other")}
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-primary transition-colors text-primary font-semibold">
                    {language === "ar" ? "🔍 تتبع الطلب" : "🔍 Track Order"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact & Social Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-dark-text-muted">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{language === "ar" ? "العنوان: القاهرة والجيزة، مصر" : "Address: Cairo & Giza, Egypt"}</span>
              </li>
              <li>
                <a
                  href="https://wa.me/201043066133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 font-bold hover:underline"
                >
                  <span>💬</span>
                  <span>{language === "ar" ? "واتساب للتتبع والدعم: 01043066133" : "WhatsApp Support: +201043066133"}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:aelhawary557@gmail.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <span>✉️</span>
                  <span>aelhawary557@gmail.com</span>
                </a>
              </li>
            </ul>

            {/* Social Media Buttons */}
            <div className="mt-4 pt-3 border-t border-dark-border/40">
              <h5 className="text-[11px] font-bold text-gray-300 mb-2.5">
                {language === "ar" ? "تابعنا على شبكات التواصل:" : "Follow us on social media:"}
              </h5>
              <div className="flex items-center gap-3">
                {/* Facebook Button */}
                <a
                  href="https://www.facebook.com/people/ديليشس-ميتس/61593413048377/?rdid=V5pFPPM3yFPvPBt4&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19RoBJBhqE%2F%3Fref%3D1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold shadow-sm"
                  title="صفحة فيسبوك ديليشس ميتس"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>فيسبوك</span>
                </a>

                {/* Instagram Button */}
                <a
                  href="https://www.instagram.com/delicious_meats.eg?stkn=ZHVieG1ibmM5ZXF2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/20 text-pink-400 border border-pink-500/30 hover:bg-pink-600 hover:text-white transition-all text-xs font-bold shadow-sm"
                  title="إنستغرام ديليشس ميتس"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>إنستغرام</span>
                </a>

                {/* WhatsApp Support Button */}
                <a
                  href="https://wa.me/201043066133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold shadow-sm"
                  title="واتساب الدعم والمتابعة"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.555 4.197 1.608 6.02L.051 24l6.096-1.597c1.764.962 3.766 1.47 5.884 1.47 6.647 0 12.032-5.385 12.032-12.031S18.678 0 12.031 0zm6.541 17.001c-.274.773-1.359 1.416-2.215 1.596-.587.123-1.353.223-3.931-.844-3.3-1.365-5.426-4.71-5.59-4.93-.163-.22-1.336-1.78-1.336-3.396 0-1.616.844-2.41 1.144-2.738.3-.327.654-.409.873-.409.219 0 .437.003.627.013.201.01.47-.076.735.56.274.654.929 2.27.1009 2.434.081.164.136.356.027.573-.109.219-.164.355-.327.546-.164.191-.345.427-.148.766.196.338.871 1.437 1.87 2.327 1.285 1.144 2.368 1.5 2.707 1.664.338.164.536.136.733-.092.197-.228.844-.982 1.07-1.319.227-.338.455-.282.764-.164.309.119 1.961.925 2.298 1.093.338.164.563.246.646.382.082.137.082.793-.192 1.566z" />
                  </svg>
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-dark-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-dark-text-muted">
          <div>
            © {year} {t("brandName")}. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
        </div>

      </div>
    </footer>
  );
}
