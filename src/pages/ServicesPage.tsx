import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  Terminal,
} from 'lucide-react'
import Navigation from '../sections/Navigation'
import Footer from '../sections/Footer'
import InteractiveCloudPlanner from '../components/InteractiveCloudPlanner'
import CloudFAQ from '../components/CloudFAQ'
import { useLanguage, type SubServiceTag } from '../lib/i18n'
import { useQuoteModal } from '../components/QuoteModal'
import { getSubServiceIcon } from '../sections/ServicesPreview'

type FilterCategory = 'all' | SubServiceTag

export default function ServicesPage() {
  const { t } = useLanguage()
  const { openQuoteModal } = useQuoteModal()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  // Handle #hash scrolling when arriving at /services#csm-04 or #cloud-faq
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      // Reset filter to 'all' so the target card is guaranteed to be rendered
      setActiveFilter('all')
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.hash, location.pathname])

  const scrollToAnchor = (id: string) => {
    if (activeFilter !== 'all') {
      setActiveFilter('all')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredServices =
    activeFilter === 'all'
      ? t.cloudSubServices
      : t.cloudSubServices.filter((s) => s.tags.includes(activeFilter))

  const filterButtons: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t.servicesPage.filters.all },
    { key: 'security', label: t.servicesPage.filters.security },
    { key: 'migration', label: t.servicesPage.filters.migration },
    { key: 'optimization', label: t.servicesPage.filters.optimization },
    { key: 'managed', label: t.servicesPage.filters.managed },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0A0A1A' }}>
      <Navigation />

      {/* HERO SECTION */}
      <header className="relative pt-28 pb-14 md:pt-36 md:pb-20 px-5 md:px-12 border-b border-border-os/50">
        <div className="max-w-[1200px] mx-auto">
          {/* Back to Home link */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono text-secondary-text hover:text-accent-lime transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>{t.servicesPage.backToHome}</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-[760px]">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime mb-4"
                style={{ background: 'rgba(223, 255, 0, 0.1)' }}
              >
                <Sparkles size={13} />
                {t.servicesPage.eyebrow}
              </span>

              <h1 className="text-[34px] sm:text-[46px] md:text-[64px] font-bold text-off-white font-sans tracking-[-0.02em] leading-[1.03]">
                {t.servicesPage.title}{' '}
                <span className="text-accent-lime">{t.servicesPage.titleAccent}</span>
              </h1>

              <p className="text-sm sm:text-base font-mono text-secondary-text mt-5 leading-relaxed max-w-[680px]">
                {t.servicesPage.subtitle}
              </p>
            </div>

            {/* Hero CTA buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-sm px-7 py-3.5 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
              >
                <span>{t.servicesPage.primaryCta}</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor('tier-mapping')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface text-off-white border border-border-os font-semibold text-sm px-7 py-3.5 rounded-[10px] hover:border-accent-lime hover:text-accent-lime transition-all font-sans"
              >
                <span>{t.servicesPage.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* 4 Key Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-14">
            {t.servicesPage.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-[20px] bg-surface border border-border-os"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-lime font-sans tracking-[-0.02em]">
                  {st.value}
                </div>
                <div className="text-xs font-mono text-secondary-text mt-1.5 leading-snug">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* STICKY QUICK-JUMP BAR (CSM-01..CSM-07) */}
      <div
        className="sticky top-20 z-40 border-b border-border-os px-5 md:px-12 py-3"
        style={{
          background: 'rgba(10, 10, 26, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-secondary-text uppercase tracking-[0.05em] shrink-0">
            {t.servicesPage.quickJumpLabel}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {t.cloudSubServices.map((sub) => (
              <button
                key={sub.code}
                type="button"
                onClick={() => scrollToAnchor(sub.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-surface border border-border-os text-off-white hover:border-accent-lime hover:text-accent-lime transition-colors shrink-0"
              >
                <span className="text-accent-lime font-bold">{sub.code}</span>
                <span className="hidden sm:inline text-secondary-text">•</span>
                <span className="hidden sm:inline">{sub.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="px-5 md:px-12 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto space-y-16 md:space-y-24">
          {/* Interactive Cloud Planner */}
          <section aria-label="Interactive Cloud Planner">
            <InteractiveCloudPlanner />
          </section>

          {/* Banner: Geen losse prijzen per sub-dienst */}
          <section
            className="rounded-[20px] p-6 sm:p-8 md:p-10 border-2 border-accent-lime/60 bg-surface shadow-lime-glow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="max-w-[780px]">
              <div
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold px-3 py-1 rounded-full text-accent-lime mb-3"
                style={{ background: 'rgba(223, 255, 0, 0.14)' }}
              >
                <ShieldCheck size={14} />
                <span>{t.servicesPage.noLoosePricesBanner.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white font-sans tracking-[-0.01em]">
                {t.servicesPage.noLoosePricesBanner.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-secondary-text mt-2.5 leading-relaxed">
                {t.servicesPage.noLoosePricesBanner.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-sm px-7 py-3.5 rounded-[10px] hover:bg-accent-lime-hover transition-all font-sans"
            >
              <span>{t.servicesPage.noLoosePricesBanner.cta}</span>
              <ArrowRight size={16} />
            </button>
          </section>

          {/* FILTER PILLS + DETAILED SUB-SERVICE CARDS */}
          <section id="sub-services-catalog">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {filterButtons.map((fb) => {
                const active = activeFilter === fb.key
                return (
                  <button
                    key={fb.key}
                    type="button"
                    onClick={() => setActiveFilter(fb.key)}
                    className={`px-4 py-2.5 rounded-full text-xs font-mono font-medium transition-all ${
                      active
                        ? 'bg-accent-lime text-dark font-bold'
                        : 'bg-surface border border-border-os text-secondary-text hover:text-off-white hover:border-secondary-text'
                    }`}
                  >
                    {fb.label}
                  </button>
                )
              })}
            </div>

            {/* Detailed Cards */}
            <div className="space-y-6">
              {filteredServices.map((sub) => (
                <article
                  key={sub.id}
                  id={sub.id}
                  className="scroll-mt-36 rounded-[20px] bg-surface border border-border-os hover:border-accent-lime/60 transition-all duration-300 p-6 sm:p-8 md:p-10 shadow-card-hover"
                >
                  <div className="flex flex-col lg:flex-row gap-8 justify-between">
                    {/* Left Column: Info + Description + Metrics */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-accent-lime text-dark">
                          {sub.code}
                        </span>
                        <span
                          className="text-xs font-mono font-medium tracking-[0.04em] px-3 py-1 rounded-full text-accent-lime border border-accent-lime/30"
                          style={{ background: 'rgba(223, 255, 0, 0.08)' }}
                        >
                          {sub.badge}
                        </span>
                        <div className="w-9 h-9 rounded-[10px] bg-dark border border-border-os flex items-center justify-center">
                          {getSubServiceIcon(sub.code)}
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-off-white font-sans tracking-[-0.02em]">
                        {sub.title}
                      </h3>

                      <p className="text-sm sm:text-base font-mono text-accent-lime/90 leading-snug">
                        {sub.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm font-mono text-secondary-text leading-relaxed">
                        {sub.description}
                      </p>

                      {/* 2 Metrics + Recommended Tier Box */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {sub.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-4 rounded-[14px] bg-dark border border-border-os"
                          >
                            <div className="text-xl sm:text-2xl font-bold text-accent-lime font-sans">
                              {m.value}
                            </div>
                            <div className="text-xs font-mono text-secondary-text mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}

                        <div className="p-4 rounded-[14px] bg-dark border border-accent-lime/40">
                          <div className="text-[11px] font-mono uppercase text-secondary-text">
                            {t.servicesPage.cardLabels.recommendedTier}
                          </div>
                          <div className="text-lg font-bold text-off-white font-sans mt-0.5">
                            {sub.recommendedTier}
                          </div>
                          <div className="text-[11px] font-mono text-secondary-text mt-1 leading-snug">
                            {sub.tierRationale}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: 4 Deliverables + CTA Buttons */}
                    <div className="lg:w-[440px] shrink-0 flex flex-col justify-between p-5 sm:p-6 rounded-[16px] bg-dark border border-border-os">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.05em] text-accent-lime mb-4">
                          <Terminal size={14} />
                          <span>{t.servicesPage.cardLabels.deliverables}</span>
                        </div>
                        <ul className="space-y-3">
                          {sub.deliverables.map((deliv, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-off-white leading-relaxed"
                            >
                              <CheckCircle2 size={16} className="text-success-green shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-5 border-t border-border-os flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            openQuoteModal({
                              serviceCode: sub.code,
                              tier: sub.recommendedTier,
                            })
                          }
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-xs sm:text-sm px-5 py-3 rounded-[10px] hover:bg-accent-lime-hover transition-all font-sans"
                        >
                          <span>{t.servicesPage.cardLabels.requestQuote}</span>
                          <ArrowRight size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollToAnchor('tier-mapping')}
                          className="inline-flex items-center justify-center px-4 py-3 rounded-[10px] bg-surface border border-border-os text-xs font-mono text-secondary-text hover:text-off-white hover:border-accent-lime transition-colors"
                        >
                          {t.servicesPage.cardLabels.viewTierPricing} {sub.recommendedTier}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 4-STEP PROTOCOL (Assess -> Architect -> Migrate -> Audit & Continuous Guard) */}
          <section id="execution-protocol" className="pt-4">
            <div className="text-center max-w-[720px] mx-auto mb-12">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime mb-4"
                style={{ background: 'rgba(223, 255, 0, 0.1)' }}
              >
                <Layers size={14} />
                {t.servicesPage.protocol.eyebrow}
              </span>
              <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-off-white font-sans tracking-[-0.02em]">
                {t.servicesPage.protocol.title}
              </h2>
              <p className="text-sm sm:text-base font-mono text-secondary-text mt-3">
                {t.servicesPage.protocol.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.servicesPage.protocol.steps.map((step) => (
                <div
                  key={step.num}
                  className="flex flex-col justify-between p-6 rounded-[20px] bg-surface border border-border-os hover:border-accent-lime/60 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-accent-lime text-dark">
                        {step.phase}
                      </span>
                      <span className="text-2xl font-bold font-mono text-secondary-text/40">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-off-white font-sans mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono text-secondary-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-os/60 text-xs font-mono text-success-green">
                    {step.output}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TIER MAPPING (3 cards with prices and matching sub-services) */}
          <section id="tier-mapping" className="scroll-mt-28 pt-4">
            <div className="text-center max-w-[740px] mx-auto mb-12">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime mb-4"
                style={{ background: 'rgba(223, 255, 0, 0.1)' }}
              >
                <Sparkles size={14} />
                {t.servicesPage.tierMapping.eyebrow}
              </span>
              <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-off-white font-sans tracking-[-0.02em]">
                {t.servicesPage.tierMapping.title}
              </h2>
              <p className="text-sm sm:text-base font-mono text-secondary-text mt-3">
                {t.servicesPage.tierMapping.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {t.servicesPage.tierMapping.tiers.map((tr) => (
                <div
                  key={tr.key}
                  className={`flex flex-col justify-between p-6 sm:p-8 rounded-[20px] bg-surface transition-all ${
                    tr.featured
                      ? 'border-2 border-accent-lime shadow-lime-glow'
                      : 'border border-border-os'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="text-xs font-mono font-semibold px-3 py-1 rounded-full text-accent-lime"
                        style={{ background: 'rgba(223, 255, 0, 0.12)' }}
                      >
                        {tr.name.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-secondary-text">
                        {tr.capacity.split('•')[1]?.trim()}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl sm:text-5xl font-bold text-off-white font-sans tracking-[-0.02em]">
                        {tr.price}
                      </span>
                      <span className="text-base font-mono text-secondary-text">
                        {tr.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-accent-lime mt-2">
                      {tr.capacity}
                    </p>
                    <p className="text-xs sm:text-sm font-mono text-secondary-text mt-3 leading-relaxed">
                      {tr.tagline}
                    </p>

                    {/* Matching Sub-service code badges */}
                    <div className="mt-5 pt-5 border-t border-border-os">
                      <div className="text-[11px] font-mono uppercase tracking-[0.05em] text-secondary-text mb-2.5">
                        {t.servicesPage.tierMapping.includedServicesLabel}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tr.serviceCodes.map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => scrollToAnchor(code.toLowerCase())}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-dark border border-border-os text-accent-lime hover:border-accent-lime transition-colors"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="mt-5 space-y-2.5">
                      {tr.highlights.map((hl, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs font-mono text-off-white leading-relaxed"
                        >
                          <CheckCircle2 size={15} className="text-success-green shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => openQuoteModal({ tier: tr.key })}
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-sm py-3.5 px-6 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.01] transition-all font-sans"
                  >
                    <span>{t.servicesPage.tierMapping.selectTierCta}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* FAQ SECTION */}
      <CloudFAQ />

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
