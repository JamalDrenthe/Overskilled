import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.1 })
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const navLinks = [
    { label: 'Services', id: 'hero' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Docs', id: 'pricing' },
    { label: 'Blog', id: 'social-proof' },
  ]

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0"
      style={{
        background: scrolled ? 'rgba(10, 10, 26, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #333366' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-off-white font-extrabold text-xl tracking-[0.08em] font-sans">
          OVERSKILLED
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-secondary-text hover:text-off-white transition-colors duration-200 font-sans"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo('pricing')}
          className="hidden md:block bg-accent-lime text-dark font-semibold text-sm px-6 py-2.5 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 font-sans"
        >
          Get Started
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-off-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-border-os px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-secondary-text hover:text-off-white transition-colors text-left font-sans text-base"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('pricing')}
            className="bg-accent-lime text-dark font-semibold text-sm px-6 py-3 rounded-[10px] w-full mt-2 font-sans"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  )
}
