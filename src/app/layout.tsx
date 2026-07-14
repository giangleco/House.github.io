import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/anim/Preloader";
import CustomCursor from "@/components/anim/CustomCursor";
import { studio } from "@/data/projects";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nguyensonhai.com"),
  title: {
    default: `${studio.name} — ${studio.role}`,
    template: `%s — ${studio.name}`,
  },
  description: studio.tagline,
  authors: [{ name: studio.owner }],
  creator: studio.owner,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: studio.name,
    title: `${studio.name} — ${studio.role}`,
    description: studio.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${studio.name} — ${studio.role}`,
    description: studio.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
