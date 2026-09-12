"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Printer, CheckCircle2, Phone, MapPin, QrCode, ArrowRight, ShoppingBag, FileText } from "lucide-react";

interface OrderItem {
  id?: string;
  nameAr?: string;
  nameEn?: string;
  name_ar?: string;
  name_en?: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: string;
  customerName?: string;
  customer_name?: string;
  phone: string;
  governorate: string;
  area: string;
  address?: string;
  address_details?: string;
  items: OrderItem[];
  totalValue?: number;
  total?: number;
  status: string;
  createdAt?: string;
  created_at?: string;
}

function InvoiceContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.orders)) {
            const found = data.orders.find(
              (o: any) => String(o.id).toLowerCase() === String(orderId).toLowerCase()
            );
            if (found) {
              setOrder(found);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Error fetching invoice order:", err);
      }

      // LocalStorage fallback
      try {
        const local = localStorage.getItem("delicious_meats_orders") || localStorage.getItem("dm_orders");
        if (local) {
          const parsed: OrderDetails[] = JSON.parse(local);
          const found = parsed.find(
            (o) => String(o.id).toLowerCase() === String(orderId).toLowerCase()
          );
          if (found) setOrder(found);
        }
      } catch (e) {}

      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400">جاري تحميل الفاتورة الرقمية...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-dark-bg">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-4">
            <FileText className="h-14 w-14 text-primary/60 mx-auto" />
            <h1 className="text-xl font-bold text-white">لم يتم العثور على الفاتورة</h1>
            <p className="text-xs text-gray-400">
              تأكد من صحة كود الطلب أو رابط الفاتورة المكتوب.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-dark-bg font-bold rounded-xl text-xs hover:bg-primary-hover transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              العودة للمتجر
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const customerName = order.customerName || order.customer_name || "عميل ديليشس ميتس";
  const address = order.address || order.address_details || "";
  const totalAmount = order.totalValue !== undefined ? order.totalValue : (order.total || 0);
  const createdDate = order.createdAt || order.created_at || new Date().toISOString();
  
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://deliciousmeats.vercel.app";
  const invoiceUrl = `${currentOrigin}/invoice?id=${encodeURIComponent(order.id)}`;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(invoiceUrl)}`;

  const statusMap: Record<string, { labelAr: string; color: string }> = {
    new: { labelAr: "طلب جديد 🆕", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    preparing: { labelAr: "قيد التجهيز 👨‍🍳", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    delivering: { labelAr: "في الطريق للتوصيل 🚚", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    delivered: { labelAr: "تم التسليم بنجاح ✅", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    cancelled: { labelAr: "طلب ملغي ❌", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" }
  };

  const statusInfo = statusMap[order.status] || { labelAr: order.status, color: "bg-gray-500/20 text-gray-300" };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg print:bg-white print:text-black">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Action Header Bar for Screen */}
          <div className="print:hidden flex items-center justify-between gap-4 mb-6 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة للمتجر</span>
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-dark-bg font-extrabold text-xs shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>طباعة الفاتورة / حفظ PDF</span>
            </button>
          </div>

          {/* Invoice Card Component */}
          <div className="bg-dark-surface border border-dark-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
            
            {/* Header section with brand & QR code */}
            <div className="flex items-start justify-between border-b border-dark-border/80 print:border-gray-300 pb-6 gap-6 flex-wrap sm:flex-nowrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🥩</span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white print:text-black">
                    ديليشس ميتس - Delicious Meats
                  </h1>
                </div>
                <p className="text-xs text-primary font-bold">إيصال وفاتورة الطلب الرسمية | Official Order Receipt</p>
                <p className="text-xs text-gray-400 print:text-gray-600 mt-1">الخط الساخن: 19000 • info@deliciousmeats.me</p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center text-center bg-dark-bg print:bg-gray-50 border border-dark-border/80 print:border-gray-300 p-3 rounded-2xl shrink-0">
                {/* eslint-disable-next-html-extension/next-image-unoptimized */}
                <img
                  src={qrCodeApiUrl}
                  alt={`QR Code Invoice #${order.id}`}
                  className="w-28 h-28 object-contain rounded-lg bg-white p-1"
                />
                <span className="text-[10px] text-gray-400 print:text-gray-700 font-bold mt-1.5 flex items-center gap-1">
                  <QrCode className="h-3 w-3 text-primary print:text-black" />
                  امسح الـ QR للفاتورة الرقمية
                </span>
              </div>
            </div>

            {/* Info Grid: Order Details & Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-dark-bg/60 print:bg-gray-50 border border-dark-border/60 print:border-gray-200 p-5 rounded-2xl">
              <div className="space-y-2 text-xs">
                <div className="text-[11px] font-black text-gray-400 print:text-gray-500 uppercase tracking-wider">تفاصيل مرجع الطلب</div>
                <p><span className="text-gray-400 print:text-gray-600">رقم الطلب:</span> <strong className="text-primary print:text-black font-extrabold text-sm">#{order.id}</strong></p>
                <p><span className="text-gray-400 print:text-gray-600">تاريخ الإنشاء:</span> <strong className="text-gray-200 print:text-black">{new Date(createdDate).toLocaleString("ar-EG")}</strong></p>
                <p><span className="text-gray-400 print:text-gray-600">طريقة الدفع:</span> <strong className="text-gray-200 print:text-black">الدفع نقداً عند الاستلام (COD)</strong></p>
                <div className="pt-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${statusInfo.color}`}>
                    {statusInfo.labelAr}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t sm:border-t-0 sm:border-r border-dark-border/40 print:border-gray-200 pt-4 sm:pt-0 sm:pr-6">
                <div className="text-[11px] font-black text-gray-400 print:text-gray-500 uppercase tracking-wider">بيانات العميل والشحن</div>
                <p><span className="text-gray-400 print:text-gray-600">اسم العميل:</span> <strong className="text-white print:text-black font-bold">{customerName}</strong></p>
                <p><span className="text-gray-400 print:text-gray-600">رقم الهاتف:</span> <strong dir="ltr" className="text-gray-200 print:text-black font-bold">📞 {order.phone}</strong></p>
                <p><span className="text-gray-400 print:text-gray-600">المنطقة:</span> <strong className="text-gray-200 print:text-black">{order.governorate} - {order.area}</strong></p>
                <p><span className="text-gray-400 print:text-gray-600">العنوان:</span> <strong className="text-gray-200 print:text-black">{address}</strong></p>
              </div>
            </div>

            {/* Order Items Table */}
            <div>
              <h2 className="text-sm font-extrabold text-white print:text-black mb-3">الأصناف والمنتجات المطلوبة:</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-dark-bg print:bg-gray-100 text-gray-300 print:text-black border-b border-dark-border print:border-gray-300">
                      <th className="py-3 px-3 text-center w-12">#</th>
                      <th className="py-3 px-4">اسم المنتج</th>
                      <th className="py-3 px-3 text-center">الكمية</th>
                      <th className="py-3 px-3 text-center">سعر الوحدة</th>
                      <th className="py-3 px-4 text-center">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border/60 print:divide-gray-200">
                    {order.items.map((item, idx) => {
                      const name = item.nameAr || item.name_ar || item.nameEn || item.name_en || "منتج ديليشس ميتس";
                      const itemTotal = item.price * item.quantity;
                      return (
                        <tr key={idx} className="hover:bg-dark-bg/40 print:hover:bg-transparent">
                          <td className="py-3 px-3 text-center font-bold text-gray-400 print:text-gray-600">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-white print:text-black">{name}</td>
                          <td className="py-3 px-3 text-center font-extrabold text-primary print:text-black">{item.quantity}</td>
                          <td className="py-3 px-3 text-center text-gray-300 print:text-black">{item.price.toLocaleString()} ج.م</td>
                          <td className="py-3 px-4 text-center font-black text-white print:text-black">{itemTotal.toLocaleString()} ج.م</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Box */}
            <div className="bg-primary/10 print:bg-yellow-50 border-2 border-primary/30 print:border-yellow-200 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs text-primary print:text-amber-800 font-bold block">إجمالي الفاتورة النهائي</span>
                <span className="text-xs text-gray-400 print:text-gray-600">شامل الضرائب والتغليف الحراري الفاخر</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-primary print:text-amber-900">
                {totalAmount.toLocaleString()} جنيه مصري
              </div>
            </div>

            {/* Footer note */}
            <div className="text-center pt-6 border-t border-dark-border/60 print:border-gray-200 text-xs text-gray-400 print:text-gray-600 space-y-1">
              <p className="font-bold">✨ ديليشس ميتس نتمنى لكم وجبة شهية وصحية!</p>
              <p className="text-[11px] text-gray-500">تم استخراج هذه الفاتورة إلكترونياً • رابط الفاتورة: {invoiceUrl}</p>
            </div>

          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  );
}
