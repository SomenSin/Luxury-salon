import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Salon | Elegance & Beauty",
  description: "Experience the ultimate luxury salon services. Discover the art of beauty with our premium haircuts, coloring, and styling.",
  keywords: "Salon, Luxury Hair, Beauty, Hairstyle, Haircut, Hair Color",
  openGraph: {
    title: "Lumina Salon | Elegance & Beauty",
    description: "Experience the ultimate luxury salon services.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
          <FloatingContact />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
