import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { useLanguage } from '../lib/i18n'
import { useQuoteModal } from '../components/QuoteModal'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const { openQuoteModal } = useQuoteModal()
  const navigate = useNavigate()
  const location = useLocation()

  const isServicesPage =
    location.pathname === '/services' || location.pathname === '/diensten'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.1 })
    }
  }, [])

  const scrollToHomeSection = (id: string) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        if (id === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 120)
      return
    }
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goToServicesPage = () => {
    setMobileOpen(false)
    if (!isServicesPage) {
      navigate('/services')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0"
      style={{
        background: scrolled || mobileOpen ? 'rgba(10, 10, 26, 0.92)' : 'transparent',
        backdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled || mobileOpen ? '1px solid #333366' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToHomeSection('hero')}
          className="text-off-white font-extrabold text-xl tracking-[0.08em] font-sans hover:text-accent-lime transition-colors"
        >
          OVERSKILLED
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8 flex-1 justify-center">
          <button
            type="button"
            onClick={() => scrollToHomeSection('hero')}
            className={`text-sm font-medium transition-colors duration-200 font-sans ${
              !isServicesPage ? 'text-off-white' : 'text-secondary-text hover:text-off-white'
            }`}
          >
            {t.nav.home}
          </button>

          <button
            type="button"
            onClick={goToServicesPage}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 font-sans ${
              isServicesPage ? 'text-accent-lime' : 'text-secondary-text hover:text-off-white'
            }`}
          >
            <span>{t.nav.services}</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent-lime text-dark leading-none">
              {t.nav.newBadge}
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToHomeSection('pricing')}
            className="text-sm font-medium text-secondary-text hover:text-off-white transition-colors duration-200 font-sans"
          >
            {t.nav.pricing}
          </button>

          <button
            type="button"
            onClick={() => scrollToHomeSection('social-proof')}
            className="text-sm font-medium text-secondary-text hover:text-off-white transition-colors duration-200 font-sans"
          >
            {t.nav.results}
          </button>
        </div>

        {/* Desktop Right: NL|EN Pill Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* NL | EN Pill Toggle */}
          <div
            className="inline-flex items-center rounded-full p-1 bg-surface border border-border-os"
            role="group"
            aria-label={t.nav.langLabel}
          >
            <button
              type="button"
              onClick={() => setLang('nl')}
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                lang === 'nl'
                  ? 'bg-accent-lime text-dark'
                  : 'text-secondary-text hover:text-off-white'
              }`}
            >
              NL
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-accent-lime text-dark'
                  : 'text-secondary-text hover:text-off-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="bg-accent-lime text-dark font-semibold text-sm px-5 py-2.5 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 font-sans"
          >
            {t.nav.cta}
          </button>
        </div>

        {/* Mobile Right: NL|EN Pill Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2.5">
          <div
            className="inline-flex items-center rounded-full p-0.5 bg-surface border border-border-os"
            role="group"
            aria-label={t.nav.langLabel}
          >
            <button
              type="button"
              onClick={() => setLang('nl')}
              className={`px-2 py-1 rounded-full text-[11px] font-mono font-semibold transition-all ${
                lang === 'nl'
                  ? 'bg-accent-lime text-dark'
                  : 'text-secondary-text hover:text-off-white'
              }`}
            >
              NL
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-full text-[11px] font-mono font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-accent-lime text-dark'
                  : 'text-secondary-text hover:text-off-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="text-off-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-border-os px-6 py-6 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => scrollToHomeSection('hero')}
            className="text-secondary-text hover:text-off-white transition-colors text-left font-sans text-base"
          >
            {t.nav.home}
          </button>

          <button
            type="button"
            onClick={goToServicesPage}
            className="flex items-center justify-between text-off-white hover:text-accent-lime transition-colors text-left font-sans text-base font-medium"
          >
            <span>{t.nav.services}</span>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-accent-lime text-dark">
              {t.nav.newBadge}
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToHomeSection('pricing')}
            className="text-secondary-text hover:text-off-white transition-colors text-left font-sans text-base"
          >
            {t.nav.pricing}
          </button>

          <button
            type="button"
            onClick={() => scrollToHomeSection('social-proof')}
            className="text-secondary-text hover:text-off-white transition-colors text-left font-sans text-base"
          >
            {t.nav.results}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false)
              openQuoteModal()
            }}
            className="bg-accent-lime text-dark font-semibold text-sm px-6 py-3.5 rounded-[10px] w-full mt-2 font-sans"
          >
            {t.nav.cta}
          </button>
        </div>
      )}
    </nav>
  )
}
