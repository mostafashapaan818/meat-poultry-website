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
            <div className="flex items-center gap-1.5 text-xl font-bold text-white mb-3">
              <span className="text-primary">★</span>
              {t("brandName")}
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

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-dark-text-muted">
              <li>
                {language === "ar" ? "📍 العنوان: التجمع الخامس، القاهرة، مصر" : "📍 Address: Fifth Settlement, Cairo, Egypt"}
              </li>
              <li>
                {language === "ar" ? "📞 هاتف: ١٩٠٠٠ (الخط الساخن)" : "📞 Hotline: 19000"}
              </li>
              <li>
                {language === "ar" ? "✉ البريد: info@deliciousmeats.me" : "✉ Email: info@deliciousmeats.me"}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-dark-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-dark-text-muted">
          <div>
            © {year} {t("brandName")}. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-primary underline transition-colors">
              {t("adminLink")}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
