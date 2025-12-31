import { getProcessPageData } from "@/sanity/lib/getProcessPage";
import ProcessContent from "./ProcessContent";
import { Suspense } from "react";
import PageLoading from "@/components/shared/PageLoading";

export const metadata = {
  title: "The Movie Process | Lake Como Style",
  description: "From concept to cinema - discover how we create unforgettable cinematic experiences at Lake Como Style.",
};

async function ProcessPageContent() {
  const data = await getProcessPageData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-primary)' }}>Loading...</p>
      </div>
    );
  }

  return <ProcessContent data={data} />;
}

export default async function ProcessPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ProcessPageContent />
    </Suspense>
  );
}
