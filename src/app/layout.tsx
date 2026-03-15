import type { Metadata } from "next";
import { Inter, Limelight, Courier_Prime } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const limelight = Limelight({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-limelight",
});
const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spiesofstyle.com"),
  title: "Spies of Style",
  description:
    "Luxury Lake Como experiences inspired by cinematic elegance and timeless sophistication.",
  keywords: [
    "Lake Como",
    "cinematic events",
    "spy experiences",
    "luxury events",
    "Italy events",
    "immersive dining",
  ],
  authors: [{ name: "Spies of Style" }],
  openGraph: {
    title: "Spies of Style | Cinematic Event Experiences",
    description:
      "Luxury Lake Como experiences inspired by cinematic elegance and timeless sophistication.",
    url: "https://spiesofstyle.com",
    siteName: "Spies of Style",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Spies of Style - Cinematic Event Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spies of Style | Cinematic Event Experiences",
    description:
      "Luxury Lake Como experiences inspired by cinematic elegance and timeless sophistication.",
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} ${limelight.variable} ${courierPrime.variable} font-sans overflow-x-hidden relative`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
