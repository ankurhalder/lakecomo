import type { Metadata } from "next"
import ContactContent from "./ContactContent"

export const metadata: Metadata = {
  title: "Contact | Lake Como Style",
  description: "Get in touch with Lake Como Style to create your cinematic event. The spotlight awaits in Italy.",
  openGraph: {
    title: "Contact Us | Lake Como Style", 
    description: "Create your cinematic event with Lake Como Style.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ContactContent />
    </main>
  )
}
