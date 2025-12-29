import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLayoutData } from "@/sanity/lib/getLayoutData";
import { SanityLive } from "@/sanity/lib/live";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutData = await getLayoutData();

  return (
    <ThemeProvider>
      <Header data={layoutData?.navbar} />
      {children}
      <Footer data={layoutData?.footer} />
      <SanityLive />
    </ThemeProvider>
  );
}
