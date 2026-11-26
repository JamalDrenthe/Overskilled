import Navigation from '../sections/Navigation'
import Hero from '../sections/Hero'
import MarqueeCapabilities from '../sections/MarqueeCapabilities'
import ServicesPreview from '../sections/ServicesPreview'
import Pricing from '../sections/Pricing'
import SocialProof from '../sections/SocialProof'
import FinalCTA from '../sections/FinalCTA'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0A0A1A' }}>
      <Navigation />
      <Hero />
      <MarqueeCapabilities />
      <ServicesPreview />
      <Pricing />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  )
}
