import type { Metadata } from "next"
import ContactContent from "./ContactContent"
import { getContactPageData } from "@/sanity/lib/getContactPage"

export const metadata: Metadata = {
  title: "Contact | Lake Como Style",
  description: "Get in touch with Lake Como Style to create your cinematic event. The spotlight awaits in Italy.",
  openGraph: {
    title: "Contact Us | Lake Como Style", 
    description: "Create your cinematic event with Lake Como Style.",
    type: "website",
  },
}

export default async function ContactPage() {
  const data = await getContactPageData()
  
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ContactContent data={data} />
    </main>
  )
}
