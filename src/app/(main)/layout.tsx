import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLayoutData } from "@/sanity/lib/getLayoutData";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutData = await getLayoutData();

  return (
    <SmoothScroll>
      <Header data={layoutData?.navbar} />
      {children}
      <Footer data={layoutData?.footer} />
    </SmoothScroll>
  );
}
