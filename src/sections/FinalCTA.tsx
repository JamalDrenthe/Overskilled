import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../lib/i18n'
import { useQuoteModal } from '../components/QuoteModal'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const { t, lang } = useLanguage()
  const { openQuoteModal } = useQuoteModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Decorative circle
      if (circleRef.current) {
        gsap.fromTo(
          circleRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
          }
        )
      }

      // Subtext
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: subtextRef.current, start: 'top 85%' },
          }
        )
      }

      // CTA button
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [lang])

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative px-5 md:px-12 py-20 md:py-40 overflow-hidden"
      style={{ background: '#0A0A1A' }}
    >
      {/* Decorative Circle */}
      <div
        ref={circleRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none animate-pulse-circle"
        style={{ border: '1px solid rgba(223, 255, 0, 0.08)' }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto flex flex-col items-center text-center">
        <h2
          ref={headlineRef}
          className="text-[36px] md:text-[64px] font-bold text-off-white font-sans tracking-[-0.02em] leading-[1.0]"
        >
          {t.finalCta.headlineWords.map((word, i) => (
            <span key={`${lang}-${i}`} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        <p
          ref={subtextRef}
          className="text-sm sm:text-base font-mono text-secondary-text max-w-[540px] mt-6 leading-relaxed opacity-0"
        >
          {t.finalCta.subtext}
        </p>

        <button
          ref={ctaRef}
          type="button"
          onClick={() => openQuoteModal()}
          className="mt-10 w-full sm:w-auto bg-accent-lime text-dark font-semibold text-base px-12 py-4 rounded-[10px] hover:bg-accent-lime-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 font-sans animate-pulse-glow opacity-0"
        >
          {t.finalCta.cta}
        </button>
      </div>
    </section>
  )
}
