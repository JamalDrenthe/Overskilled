import { useEffect } from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { LanguageProvider } from './lib/i18n'
import { QuoteModalProvider } from './components/QuoteModal'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'

gsap.registerPlugin(ScrollTrigger)

function isStandalonePreview(): boolean {
  if (typeof window === 'undefined') return false
  const { protocol, pathname } = window.location
  return (
    protocol === 'file:' ||
    protocol === 'blob:' ||
    pathname.endsWith('.html')
  )
}

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
    }
  }, [])

  const RouterComponent = isStandalonePreview() ? HashRouter : BrowserRouter

  return (
    <LanguageProvider>
      <QuoteModalProvider>
        <RouterComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/diensten" element={<ServicesPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </RouterComponent>
      </QuoteModalProvider>
    </LanguageProvider>
  )
}
