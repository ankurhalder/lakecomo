import type { Metadata } from "next";
import { Inter, Limelight, Courier_Prime } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const limelight = Limelight({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-limelight'
});
const courierPrime = Courier_Prime({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: '--font-courier'
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lakecomostyle.it"),
  title: "Lake Como Style",
  description: "Transform your celebration into an unforgettable cinematic experience. Themed parties, professional videography, and custom movie trailers in Lake Como, Italy.",
  keywords: ["Lake Como", "cinematic events", "themed parties", "movie trailers", "Italy events", "wedding videography"],
  authors: [{ name: "Lake Como Style" }],
  openGraph: {
    title: "Lake Como Style | Cinematic Event Experiences",
    description: "Transform your celebration into an unforgettable cinematic experience in Lake Como, Italy.",
    url: "https://lakecomostyle.it",
    siteName: "Lake Como Style",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Lake Como Style - Cinematic Event Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lake Como Style | Cinematic Event Experiences",
    description: "Transform your celebration into an unforgettable cinematic experience in Lake Como, Italy.",
    images: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
  (function() {
    try {
      var saved = sessionStorage.getItem('theme');
      var theme = saved || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${limelight.variable} ${courierPrime.variable} font-sans overflow-x-hidden`}>
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