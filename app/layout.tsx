import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "URL Shortner",
  icons: {
    icon: "/favicon.ico",
  },
  description: "Simple URL Shortner",
  keywords: ["URL Shortner"],
  openGraph: {
    title: "URL Shortner",
    description: "Simple URL Shortner",
    url: "https://urlshortner-next.vercel.app",
    siteName: "URL Shortner",
    images: [
      {
        url: "https://urlshortner-next.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "og-image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Shortner",
    description: "Simple URL Shortner",
    images: ["https://urlshortner-next.vercel.app/og-image.png"],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
