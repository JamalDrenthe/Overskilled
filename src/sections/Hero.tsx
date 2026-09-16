import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function CircularBadge() {
  const svgRef = useRef<SVGSVGElement>(null)
  const text = 'OVERSKILLED \u2022 ELITE TECH \u2022 ON DEMAND \u2022 '
  const textRef = useRef<SVGTextPathElement>(null)

  const radius = 160

  return (
    <div className="relative animate-spin-slow animate-float">
      <svg
        ref={svgRef}
        width="360"
        height="360"
        viewBox="0 0 360 360"
        className="w-[240px] h-[240px] md:w-[360px] md:h-[360px]"
      >
        <defs>
          <path
            id="circlePath"
            d={`M 180, 180 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <circle cx="180" cy="180" r="170" fill="#DFFF00" />
        <text
          fill="#0A0A1A"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="28"
          letterSpacing="8"
        >
          <textPath
            ref={textRef}
            href="#circlePath"
            startOffset="0%"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Circular badge: scale bounce
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { scale: 0.5, opacity: 0 })
        tl.to(badgeRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
      }

      // Headline: word-by-word stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word')
        gsap.set(words, { opacity: 0, y: 30 })
        tl.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
        }, '-=0.3')
      }

      // Subtitle fade up
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.2')
      }

      // CTAs fade up
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 })
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        }, '-=0.2')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = 'Tech expertise without the overhead. Pay monthly, cancel anytime.'.split(' ')

  const scrollToPricing = () => {
    const el = document.getElementById('pricing')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-12 pt-32 pb-20"
      style={{ background: '#0A0A1A' }}
    >
      {/* Circular Badge */}
      <div ref={badgeRef} className="mb-10 md:mb-12">
        <CircularBadge />
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-[32px] md:text-[56px] font-bold text-off-white text-center max-w-[680px] leading-[1.05] tracking-[-0.02em] font-sans"
      >
        {headlineWords.map((word, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">
            {word === 'without' || word === 'the' || word === 'overhead.' ? (
              <span className="text-accent-lime">{word}</span>
            ) : (
              word
            )}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-base md:text-base font-mono text-secondary-text text-center max-w-[560px] mt-6 leading-relaxed"
      >
        Full-stack development, DevOps, cloud architecture, and AI integration — handled by senior engineers. No hiring, no contracts, just results.
      </p>

      {/* CTA Buttons */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mt-10">
        <button
          onClick={scrollToPricing}
          className="bg-accent-lime text-dark font-semibold text-sm px-8 py-3.5 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 font-sans w-full sm:w-auto"
        >
          Start Your Subscription
        </button>
        <button
          onClick={scrollToPricing}
          className="bg-transparent text-off-white border border-border-os font-semibold text-sm px-8 py-3.5 rounded-[10px] hover:border-accent-lime hover:text-accent-lime transition-all duration-200 font-sans w-full sm:w-auto"
        >
          View Pricing
        </button>
      </div>
    </section>
  )
}
