import { getFaqPage } from '@/sanity/lib/getFaqPage'
import FAQContent from './FAQContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Lake Como Style',
  description: 'Find answers to frequently asked questions about Lake Como Style cinematic experiences, booking, pricing, and more.',
}

export default async function FAQPage() {
  const data = await getFaqPage()
  return <FAQContent data={data} />
}
