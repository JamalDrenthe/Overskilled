import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import MarqueeCapabilities from './sections/MarqueeCapabilities'
import Pricing from './sections/Pricing'
import SocialProof from './sections/SocialProof'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0A0A1A' }}>
      <Navigation />
      <Hero />
      <MarqueeCapabilities />
      <Pricing />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  )
}
