import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useLanguage } from '../lib/i18n'

export default function CloudFAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section id="cloud-faq" className="px-5 md:px-12 py-16 md:py-24" style={{ background: '#0A0A1A' }}>
      <div className="max-w-[920px] mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span
            className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime mb-4"
            style={{ background: 'rgba(223, 255, 0, 0.1)' }}
          >
            <HelpCircle size={14} />
            {t.faq.eyebrow}
          </span>
          <h2 className="text-[28px] md:text-[44px] font-bold text-off-white font-sans tracking-[-0.02em]">
            {t.faq.title}
          </h2>
          <p className="text-sm md:text-base font-mono text-secondary-text mt-3 max-w-[600px] mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-[20px] border transition-all duration-200 ${
                  isOpen
                    ? 'bg-surface border-accent-lime/70 shadow-card-hover'
                    : 'bg-surface/70 border-border-os hover:border-secondary-text'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6"
                >
                  <span className="text-base sm:text-lg font-semibold text-off-white font-sans">
                    {item.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-[10px] border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-accent-lime text-dark border-accent-lime rotate-180'
                        : 'border-border-os text-secondary-text'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0">
                    <div className="pt-4 border-t border-border-os/60 text-xs sm:text-sm font-mono text-secondary-text leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
