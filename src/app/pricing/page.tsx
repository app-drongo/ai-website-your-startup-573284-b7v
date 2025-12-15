import type { Metadata } from 'next'

import Page-header from '@/components/sections/pricing/Page-header'
import Pricing from '@/components/sections/pricing/Pricing'
import Faq from '@/components/sections/pricing/Faq'
import Cta from '@/components/sections/pricing/Cta'

export const metadata: Metadata = {
  title: 'Your Startup',
  description: 'Welcome to Pricing',
}

export default function PricingPage() {
  return (
    <>
      <section id="page-header">
        <Page-header />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <section id="cta">
        <Cta />
      </section>
    </>
  )
}
