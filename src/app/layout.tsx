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
  openGraph: {
    title: "ديليشس ميتس | لحوم ودواجن فاخرة طازجة",
    description: "المتجر الرائد لبيع قطعيات اللحوم والدواجن الفاخرة الطازجة وتوصيلها في مصر. جودة عالية ومذاق رائع.",
    url: "https://deliciousmeats.vercel.app",
    siteName: "ديليشس ميتس | Delicious Meats",
    images: [
      {
        url: "https://deliciousmeats.vercel.app/images/logo.png",
        width: 800,
        height: 800,
        alt: "Delicious Meats",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ديليشس ميتس | لحوم ودواجن فاخرة طازجة",
    description: "المتجر الرائد لبيع قطعيات اللحوم والدواجن الفاخرة الطازجة وتوصيلها في مصر. جودة عالية ومذاق رائع.",
    images: ["https://deliciousmeats.vercel.app/images/logo.png"],
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
