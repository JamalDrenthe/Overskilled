import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

interface PricingTier {
  label: string
  labelBg?: string
  title: string
  description: string
  price: string
  period: string
  features: string[]
  cta: string
  featured?: boolean
  dashed?: boolean
}

const tiers: PricingTier[] = [
  {
    label: 'STARTER',
    title: 'Starter',
    description: 'Perfect for small projects and MVPs. Get moving fast.',
    price: '$2,500',
    period: '/mo',
    features: [
      '1 dedicated senior engineer',
      '40 hours/month',
      'Email support',
      'Weekly standups',
      'Git repository access',
      'Basic CI/CD setup',
    ],
    cta: 'Choose Starter',
  },
  {
    label: 'MOST POPULAR',
    labelBg: 'rgba(223, 255, 0, 0.15)',
    title: 'Professional',
    description: 'For growing teams that need serious firepower.',
    price: '$5,000',
    period: '/mo',
    features: [
      '2 dedicated senior engineers',
      '80 hours/month',
      'Priority Slack support',
      'Daily standups',
      'Full DevOps setup',
      'Architecture reviews',
      'Weekly progress reports',
      'Code quality audits',
    ],
    cta: 'Choose Professional',
    featured: true,
  },
  {
    label: 'ENTERPRISE',
    title: 'Enterprise',
    description: 'Unlimited scale for organizations that demand the best.',
    price: '$10,000',
    period: '/mo',
    features: [
      '4 dedicated senior engineers',
      '160 hours/month',
      '24/7 on-call support',
      'Twice-daily standups',
      'Full infrastructure management',
      'Quarterly strategy sessions',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated account manager',
    ],
    cta: 'Choose Enterprise',
    dashed: true,
  },
]

// Marquee keywords for the wrapping bands
const marqueeKeywords = [
  'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
  'PostgreSQL', 'GraphQL', 'TypeScript', 'ML', 'CI/CD', 'Terraform',
  'Next.js', 'Redis', 'Stripe', 'Prisma', 'Tailwind', 'gRPC',
]

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className={`pricing-card flex flex-col p-6 md:p-10 rounded-[20px] transition-all duration-300 hover:-translate-y-1 ${
        tier.featured
          ? 'bg-surface border-2 border-accent-lime shadow-lime-glow scale-[1.02]'
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
      <p className="text-sm font-mono text-secondary-text mb-6 line-clamp-2">
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
      <p className="text-xs font-mono text-secondary-text/50 mb-8">
        No hidden fees
      </p>

      {/* Features */}
      <div className="flex-1">
        <p className="text-xs font-mono uppercase tracking-[0.05em] text-secondary-text/30 mb-4">
          Features
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
          className={`w-full py-3.5 px-6 rounded-[10px] font-semibold text-sm font-sans transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
            tier.featured
              ? 'bg-accent-lime text-dark hover:bg-accent-lime-hover'
              : 'bg-accent-lime text-dark hover:bg-accent-lime-hover'
          }`}
        >
          {tier.cta}
        </button>
        <p className="text-center text-xs font-mono text-secondary-text/50 mt-3">
          Cancel anytime
        </p>
      </div>
    </div>
  )
}

// Horizontal marquee band for the top
function HorizontalMarqueeBand() {
  const items = [...marqueeKeywords, ...marqueeKeywords, ...marqueeKeywords, ...marqueeKeywords]
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
        CHOOSE YOUR EDGE
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
            {tiers.map((tier, i) => (
              <PricingCard key={i} tier={tier} index={i} />
            ))}
          </div>

          {/* Vertical marquee on right */}
          <VerticalMarqueeBand />
        </div>
      </div>
    </section>
  )
}
