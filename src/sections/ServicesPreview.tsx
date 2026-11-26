import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import {
  ShieldAlert,
  FileCheck2,
  Cpu,
  CloudCog,
  Boxes,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage, type CloudSubService } from '../lib/i18n'
import { useQuoteModal } from '../components/QuoteModal'
import InteractiveCloudPlanner from '../components/InteractiveCloudPlanner'

gsap.registerPlugin(ScrollTrigger)

export function getSubServiceIcon(code: string) {
  switch (code) {
    case 'CSM-01':
      return <ShieldAlert size={20} className="text-accent-lime" />
    case 'CSM-02':
      return <FileCheck2 size={20} className="text-accent-lime" />
    case 'CSM-03':
      return <Cpu size={20} className="text-accent-lime" />
    case 'CSM-04':
      return <CloudCog size={20} className="text-accent-lime" />
    case 'CSM-05':
      return <Boxes size={20} className="text-accent-lime" />
    case 'CSM-06':
      return <ShieldCheck size={20} className="text-accent-lime" />
    case 'CSM-07':
    default:
      return <Activity size={20} className="text-accent-lime" />
  }
}

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { openQuoteModal } = useQuoteModal()
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-preview-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const goToServiceDetail = (sub: CloudSubService) => {
    navigate(`/services#${sub.id}`)
  }

  return (
    <section
      ref={sectionRef}
      id="services-preview"
      className="relative px-5 md:px-12 py-16 md:py-28 border-t border-border-os/40"
      style={{ background: '#0A0A1A' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header + Action Buttons */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div className="max-w-[740px]">
            <span
              className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime mb-4"
              style={{ background: 'rgba(223, 255, 0, 0.1)' }}
            >
              <Sparkles size={13} />
              {t.servicesPreview.eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-off-white font-sans tracking-[-0.02em] leading-[1.08]">
              {t.servicesPreview.title}
            </h2>
            <p className="text-sm sm:text-base font-mono text-secondary-text mt-4 leading-relaxed">
              {t.servicesPreview.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                navigate('/services')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-sm px-6 py-3.5 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
            >
              <span>{t.servicesPreview.viewAllCta}</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center justify-center gap-2 bg-surface text-off-white border border-border-os font-semibold text-sm px-6 py-3.5 rounded-[10px] hover:border-accent-lime hover:text-accent-lime transition-all font-sans"
            >
              <span>{t.servicesPreview.quoteCta}</span>
            </button>
          </div>
        </div>

        {/* Interactive Cloud Planner */}
        <div className="mb-14">
          <InteractiveCloudPlanner />
        </div>

        {/* 7 Sub-Services Preview Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.cloudSubServices.map((sub, idx) => {
            const isLastWide = idx === 6
            return (
              <div
                key={sub.id}
                className={`service-preview-card flex flex-col justify-between p-6 sm:p-7 rounded-[20px] bg-surface border border-border-os hover:border-accent-lime/70 transition-all duration-300 hover:-translate-y-1 shadow-card-hover ${
                  isLastWide ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div>
                  {/* Top Bar: Code + Badge + Icon */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-mono font-bold px-2.5 py-1 rounded-md text-dark bg-accent-lime"
                      >
                        {sub.code}
                      </span>
                      <span
                        className="text-[11px] font-mono font-medium tracking-[0.04em] px-2.5 py-1 rounded-full text-accent-lime border border-accent-lime/30"
                        style={{ background: 'rgba(223, 255, 0, 0.08)' }}
                      >
                        {sub.badge}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-[10px] bg-dark border border-border-os flex items-center justify-center shrink-0">
                      {getSubServiceIcon(sub.code)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-off-white font-sans tracking-[-0.01em]">
                    {sub.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-secondary-text mt-2 leading-relaxed">
                    {sub.subtitle}
                  </p>

                  {/* 2 Key Deliverables */}
                  <div className="mt-5 pt-4 border-t border-border-os/60">
                    <div className="text-[11px] font-mono uppercase tracking-[0.05em] text-secondary-text/70 mb-2.5">
                      {t.servicesPreview.deliverablesLabel}
                    </div>
                    <ul className={`grid gap-2 ${isLastWide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {sub.deliverables.slice(0, 2).map((deliv, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-xs font-mono text-off-white"
                        >
                          <CheckCircle2 size={14} className="text-success-green shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Recommended Tier + Buttons */}
                <div className="mt-6 pt-4 border-t border-border-os/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs font-mono">
                    <span className="text-secondary-text">{t.servicesPreview.recommendedTierLabel}: </span>
                    <span className="text-accent-lime font-semibold">{sub.recommendedTier}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          serviceCode: sub.code,
                          tier: sub.recommendedTier,
                        })
                      }
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] bg-accent-lime text-dark font-semibold text-xs font-sans hover:bg-accent-lime-hover transition-all"
                    >
                      {t.servicesPreview.requestQuoteBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => goToServiceDetail(sub)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[10px] bg-dark border border-border-os text-off-white font-semibold text-xs font-sans hover:border-accent-lime hover:text-accent-lime transition-all"
                    >
                      <span>{t.servicesPreview.detailsBtn}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
