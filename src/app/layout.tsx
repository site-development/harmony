import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmony Real Estate | Find Your Dream Home",
  description: "Discover a curated selection of luxury properties, homes, and investment opportunities in the best neighborhoods.",
  keywords: ["real estate", "homes", "property", "luxury homes", "property comparison", "neighborhoods"],
  authors: [{ name: "Harmony Real Estate" }],
  creator: "Harmony Real Estate",
  metadataBase: new URL("https://harmony-real-estate-advanced.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Harmony Real Estate | Find Your Dream Home",
    description: "Discover a curated selection of luxury properties, homes, and investment opportunities in the best neighborhoods.",
    siteName: "Harmony Real Estate",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harmony Real Estate"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony Real Estate | Find Your Dream Home",
    description: "Discover a curated selection of luxury properties, homes, and investment opportunities in the best neighborhoods.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  );
}
