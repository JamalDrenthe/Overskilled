import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const stat1Ref = useRef<HTMLDivElement>(null)
  const stat2Ref = useRef<HTMLDivElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stat 1 count-up
      if (stat1Ref.current) {
        const numEl = stat1Ref.current.querySelector('.stat-number')
        gsap.fromTo(
          stat1Ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: stat1Ref.current, start: 'top 85%' },
          }
        )
        if (numEl) {
          gsap.fromTo(
            { val: 0 },
            { val: 50 },
            {
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: { trigger: stat1Ref.current, start: 'top 85%' },
              onUpdate: function () {
                if (numEl) numEl.textContent = Math.floor(this.targets()[0].val) + '+'
              },
            }
          )
        }
      }

      // Stat 2 count-up
      if (stat2Ref.current) {
        const numEl = stat2Ref.current.querySelector('.stat-number')
        gsap.fromTo(
          stat2Ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: stat2Ref.current, start: 'top 85%' },
          }
        )
        if (numEl) {
          gsap.fromTo(
            { val: 0 },
            { val: 98 },
            {
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: { trigger: stat2Ref.current, start: 'top 85%' },
              onUpdate: function () {
                if (numEl) numEl.textContent = Math.floor(this.targets()[0].val) + '%'
              },
            }
          )
        }
      }

      // Testimonial fade up
      if (testimonialRef.current) {
        gsap.fromTo(
          testimonialRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: testimonialRef.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="px-5 md:px-12 py-16 md:py-20"
      style={{ background: '#141432' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 md:gap-12 items-start md:items-center justify-between">
        {/* Stats */}
        <div className="flex gap-12 md:gap-12 shrink-0">
          <div ref={stat1Ref} className="opacity-0">
            <div className="stat-number text-[48px] font-bold text-accent-lime font-sans tracking-[-0.02em]">
              0+
            </div>
            <div className="text-xs font-mono text-secondary-text tracking-[0.05em] mt-1">
              Projects Delivered
            </div>
          </div>
          <div ref={stat2Ref} className="opacity-0">
            <div className="stat-number text-[48px] font-bold text-accent-lime font-sans tracking-[-0.02em]">
              0%
            </div>
            <div className="text-xs font-mono text-secondary-text tracking-[0.05em] mt-1">
              Client Satisfaction
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div ref={testimonialRef} className="max-w-[560px] opacity-0">
          <blockquote className="border-l-[3px] border-accent-lime pl-6">
            <p className="text-base font-mono text-off-white italic leading-relaxed">
              "OVERSKILLED replaced our entire dev team. We shipped 3x faster and cut costs by 40%. The best tech decision we've made."
            </p>
          </blockquote>
          <p className="text-sm font-mono text-secondary-text mt-4 pl-6">
            — Sarah Chen, CTO at Nexus Labs
          </p>
        </div>
      </div>
    </section>
  )
}
