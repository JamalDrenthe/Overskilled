import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { ArrowRight, Shield } from 'lucide-react'
import gsap from 'gsap'
import { useLanguage } from '../lib/i18n'

function CircularBadge({ text }: { text: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextPathElement>(null)

  const radius = 160

  return (
    <div className="relative animate-spin-slow animate-float">
      <svg
        ref={svgRef}
        width="360"
        height="360"
        viewBox="0 0 360 360"
        className="w-[220px] h-[220px] md:w-[340px] md:h-[340px]"
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
  const pillRef = useRef<HTMLButtonElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { t, lang } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      if (pillRef.current) {
        gsap.set(pillRef.current, { opacity: 0, y: -15 })
        tl.to(pillRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        })
      }

      // Circular badge: scale bounce
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { scale: 0.5, opacity: 0 })
        tl.to(
          badgeRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        )
      }

      // Headline: word-by-word stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word')
        gsap.set(words, { opacity: 0, y: 30 })
        tl.to(
          words,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '-=0.3'
        )
      }

      // Subtitle fade up
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.2'
        )
      }

      // CTAs fade up
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 })
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.2'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [lang])

  const scrollToPricing = () => {
    const el = document.getElementById('pricing')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const goToServices = () => {
    navigate('/services')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-12 pt-28 pb-16 md:pt-32 md:pb-20"
      style={{ background: '#0A0A1A' }}
    >
      {/* NEW Cloud Security & Migration Pill */}
      <button
        ref={pillRef}
        type="button"
        onClick={goToServices}
        className="group mb-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface border border-border-os hover:border-accent-lime transition-all duration-200 max-w-full"
      >
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent-lime text-dark shrink-0">
          {t.hero.newPillBadge}
        </span>
        <Shield size={14} className="text-accent-lime shrink-0 hidden sm:inline" />
        <span className="text-xs font-mono text-off-white group-hover:text-accent-lime transition-colors truncate">
          {t.hero.newPillText}
        </span>
        <ArrowRight size={14} className="text-accent-lime shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Circular Badge */}
      <div ref={badgeRef} className="mb-8 md:mb-10">
        <CircularBadge text={t.hero.circularText} />
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-[32px] md:text-[56px] font-bold text-off-white text-center max-w-[740px] leading-[1.06] tracking-[-0.02em] font-sans"
      >
        {t.hero.headlineWords.map((word, i) => (
          <span key={`${lang}-${i}`} className="word inline-block mr-[0.3em]">
            {t.hero.highlightWords.includes(word) ? (
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
        className="text-sm sm:text-base font-mono text-secondary-text text-center max-w-[640px] mt-6 leading-relaxed"
      >
        {t.hero.subtitle}
      </p>

      {/* CTA Buttons */}
      <div ref={ctaRef} className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 mt-10">
        <button
          type="button"
          onClick={scrollToPricing}
          className="bg-accent-lime text-dark font-semibold text-sm px-8 py-3.5 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 font-sans w-full sm:w-auto"
        >
          {t.hero.primaryCta}
        </button>
        <button
          type="button"
          onClick={goToServices}
          className="inline-flex items-center justify-center gap-2 bg-transparent text-off-white border border-border-os font-semibold text-sm px-8 py-3.5 rounded-[10px] hover:border-accent-lime hover:text-accent-lime transition-all duration-200 font-sans w-full sm:w-auto"
        >
          <span>{t.hero.secondaryCta}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
