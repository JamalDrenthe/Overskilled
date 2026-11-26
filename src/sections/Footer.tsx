import { useLocation, useNavigate } from 'react-router'
import { useLanguage } from '../lib/i18n'

export default function Footer() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToHomeSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 120)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const goToServices = () => {
    navigate('/services')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="px-5 md:px-12 py-12 border-t border-border-os"
      style={{ background: '#0A0A1A' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToHomeSection('hero')}
          className="text-secondary-text hover:text-off-white font-extrabold text-base tracking-[0.08em] font-sans transition-colors"
        >
          OVERSKILLED
        </button>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <button
            type="button"
            onClick={goToServices}
            className="text-[13px] font-mono text-secondary-text hover:text-accent-lime transition-colors duration-200"
          >
            {t.footer.services}
          </button>
          <button
            type="button"
            onClick={() => scrollToHomeSection('pricing')}
            className="text-[13px] font-mono text-secondary-text hover:text-off-white transition-colors duration-200"
          >
            {t.footer.pricing}
          </button>
          <button
            type="button"
            onClick={() => scrollToHomeSection('social-proof')}
            className="text-[13px] font-mono text-secondary-text hover:text-off-white transition-colors duration-200"
          >
            {t.footer.results}
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('/services#cloud-faq')
            }}
            className="text-[13px] font-mono text-secondary-text hover:text-off-white transition-colors duration-200"
          >
            {t.footer.faq}
          </button>
          <button
            type="button"
            onClick={() => scrollToHomeSection('hero')}
            className="text-[13px] font-mono text-secondary-text hover:text-off-white transition-colors duration-200"
          >
            {t.footer.privacy}
          </button>
          <button
            type="button"
            onClick={() => scrollToHomeSection('hero')}
            className="text-[13px] font-mono text-secondary-text hover:text-off-white transition-colors duration-200"
          >
            {t.footer.terms}
          </button>
        </div>

        {/* Copyright */}
        <p className="text-[13px] font-mono text-secondary-text/60 text-center">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
