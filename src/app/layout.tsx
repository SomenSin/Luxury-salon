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
  title: "Dolly Studio | Luxury Hair & Aesthetic Excellence",
  description: "Experience high-end hair design and restorative treatments at Dolly Studio. Precision cuts and artistic color curated for the modern individual.",
  keywords: "Salon, Luxury Hair, Beauty, Hairstyle, Haircut, Hair Color",
  openGraph: {
    title: "Dolly Studio | Luxury Hair & Aesthetic Excellence",
    description: "Experience high-end hair design and restorative treatments at Dolly Studio.",
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
