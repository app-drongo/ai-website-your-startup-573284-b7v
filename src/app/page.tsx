import type { Metadata } from 'next'

import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'
import Reviews from '@/components/sections/home/Reviews'
import Customer-preview from '@/components/sections/home/Customer-preview'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Home',
}

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
      <section id="customer-preview">
        <Customer-preview />
      </section>
    </>
  )
}
