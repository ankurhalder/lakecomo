import type { Metadata } from "next";
import { Inter, Limelight, Courier_Prime } from "next/font/google";
import "./globals.css";
import { generateMetadata } from "@/lib/seo/generateMetadata";
import { getOrganizationJsonLd } from "@/lib/seo/structuredData";
import { getLayoutData } from "@/sanity/lib/getLayoutData";
import JsonLd from "@/components/shared/JsonLd";

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

export const metadata: Metadata = generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutData = await getLayoutData();
  const organizationJsonLd = getOrganizationJsonLd({
    logo: layoutData?.navbar?.logoUrl,
    email: layoutData?.footer?.email,
    sameAs: (layoutData?.footer?.socialLinks ?? [])
      .map((social: { url?: string }) => social.url)
      .filter(Boolean),
  });

  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationJsonLd} />
      </head>
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
