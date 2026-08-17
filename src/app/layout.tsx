import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ديليشس ميتس | لحوم ودواجن فاخرة طازجة",
  description: "المتجر الرائد لبيع قطعيات اللحوم والدواجن الفاخرة الطازجة وتوصيلها في مصر. جودة عالية ومذاق رائع.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <CartProvider>
        <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable} overflow-x-hidden max-w-full`}>
          <body className="min-h-screen bg-dark-bg text-gray-100 flex flex-col antialiased overflow-x-hidden max-w-full w-full">
            {children}
          </body>
        </html>
      </CartProvider>
    </LanguageProvider>
  );
}
