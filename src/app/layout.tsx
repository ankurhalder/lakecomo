import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLayoutData } from "@/sanity/lib/getLayoutData"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lake Como Style",
  description: "Cinematic Event Experiences",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const layoutData = await getLayoutData();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <SmoothScroll>
          <Header data={layoutData?.navbar} />
          {children}
          <Footer data={layoutData?.footer} />
        </SmoothScroll>
      </body>
    </html>
  );
}