import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage, type PricingTierTranslation } from '../lib/i18n'
import { useQuoteModal } from '../components/QuoteModal'

gsap.registerPlugin(ScrollTrigger)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke="#3BC9A0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Marquee keywords for the wrapping bands (expanded with cloud & security terms)
const marqueeKeywords = [
  'Cloud Security', 'AWS → GCP', 'AWS → Azure', 'Terraform', 'OpenTofu', 'Zero-Trust',
  'SOC 2 / ISO 27001', 'NIS2 & GDPR', '24/7 CSPM', 'GKE / AKS', 'AlloyDB', 'FinOps',
  'React', 'Node.js', 'Python', 'Kubernetes', 'PostgreSQL', 'TypeScript', 'CI/CD',
]

function PricingCard({
  tier,
  index,
  noHiddenFees,
  featuresLabel,
  cancelAnytime,
  onSelectTier,
}: {
  tier: PricingTierTranslation
  index: number
  noHiddenFees: string
  featuresLabel: string
  cancelAnytime: string
  onSelectTier: (tierKey: PricingTierTranslation['key']) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className={`pricing-card flex flex-col p-6 md:p-10 rounded-[20px] transition-all duration-300 hover:-translate-y-1 ${
        tier.featured
          ? 'bg-surface border-2 border-accent-lime shadow-lime-glow md:scale-[1.02]'
          : tier.dashed
          ? 'bg-surface border border-dashed border-border-os'
          : 'bg-surface border border-border-os'
      } hover:border-opacity-100`}
      style={{
        borderColor: tier.featured ? '#DFFF00' : tier.dashed ? '#333366' : undefined,
      }}
      data-card-index={index}
    >
      {/* Label */}
      <div className="mb-4">
        <span
          className="inline-block text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime"
          style={{ background: tier.labelBg || 'rgba(223, 255, 0, 0.1)' }}
        >
          {tier.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-off-white font-sans mb-2">
        {tier.title}
      </h3>

      {/* Description */}
      <p className="text-sm font-mono text-secondary-text mb-6">
        {tier.description}
      </p>

      {/* Price */}
      <div className="mb-2">
        <span className="text-[36px] md:text-[48px] font-bold text-off-white font-sans tracking-[-0.02em]">
          {tier.price}
        </span>
        <span className="text-base font-sans text-secondary-text ml-1">
          {tier.period}
        </span>
      </div>
      <p className="text-xs font-mono text-secondary-text/60 mb-8">
        {noHiddenFees}
      </p>

      {/* Features */}
      <div className="flex-1">
        <p className="text-xs font-mono uppercase tracking-[0.05em] text-secondary-text/40 mb-4">
          {featuresLabel}
        </p>
        <ul className="space-y-3">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-mono text-off-white">
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <button
          type="button"
          onClick={() => onSelectTier(tier.key)}
          className="w-full py-3.5 px-6 rounded-[10px] font-semibold text-sm font-sans transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] bg-accent-lime text-dark hover:bg-accent-lime-hover"
        >
          {tier.cta}
        </button>
        <p className="text-center text-xs font-mono text-secondary-text/50 mt-3">
          {cancelAnytime}
        </p>
      </div>
    </div>
  )
}

// Horizontal marquee band for the top
function HorizontalMarqueeBand() {
  const items = [...marqueeKeywords, ...marqueeKeywords, ...marqueeKeywords]
  return (
    <div className="hidden lg:flex overflow-hidden whitespace-nowrap py-4 border-b border-border-os/30">
      <div className="flex items-center shrink-0 animate-marquee-left-fast">
        {items.map((item, i) => (
          <span key={i} className="text-sm font-mono text-secondary-text/30 mx-4 flex items-center gap-2 shrink-0">
            {item}
            <CheckIcon />
          </span>
        ))}
      </div>
    </div>
  )
}

// Vertical marquee band for the right side
function VerticalMarqueeBand() {
  const items = [...marqueeKeywords, ...marqueeKeywords]
  return (
    <div className="hidden lg:flex h-[520px] self-start flex-col overflow-hidden items-center border-l border-border-os/30 min-w-[80px]">
      <div className="flex flex-col items-center shrink-0 animate-marquee-left-fast">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-sm font-mono text-secondary-text/30 my-3 whitespace-nowrap shrink-0"
            style={{ writingMode: 'vertical-rl' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { openQuoteModal } = useQuoteModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Cards stagger entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pricing-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative px-5 md:px-12 py-16 md:py-[120px]"
      style={{ background: '#0A0A1A' }}
    >
      {/* Section Header */}
      <h2
        ref={headerRef}
        className="text-[28px] md:text-[48px] font-bold text-off-white text-center font-sans tracking-[-0.01em] mb-12 md:mb-20 opacity-0"
      >
        {t.pricing.title}
      </h2>

      {/* Marquee + Cards Layout */}
      <div className="max-w-[1200px] mx-auto">
        {/* Horizontal marquee at top */}
        <HorizontalMarqueeBand />

        {/* Main area: cards + vertical marquee */}
        <div className="flex">
          {/* Cards Grid */}
          <div
            ref={cardsRef}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 py-6"
          >
            {t.pricing.tiers.map((tier, i) => (
              <PricingCard
                key={tier.key}
                tier={tier}
                index={i}
                noHiddenFees={t.pricing.noHiddenFees}
                featuresLabel={t.pricing.featuresLabel}
                cancelAnytime={t.pricing.cancelAnytime}
                onSelectTier={(tierKey) => openQuoteModal({ tier: tierKey })}
              />
            ))}
          </div>

          {/* Vertical marquee on right */}
          <VerticalMarqueeBand />
        </div>
      </div>
    </section>
  )
}
