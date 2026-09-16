import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block ml-2 mr-6 shrink-0">
    <path
      d="M2 7L5.5 10.5L12 4"
      stroke="#E6E6FA"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

interface MarqueeItem {
  text: string
  highlight: 'blue' | 'lime' | 'purple' | 'green'
}

const row1Items: MarqueeItem[] = [
  { text: 'React', highlight: 'blue' },
  { text: 'Node.js', highlight: 'lime' },
  { text: 'Python', highlight: 'blue' },
  { text: 'AWS', highlight: 'lime' },
  { text: 'Docker', highlight: 'blue' },
  { text: 'Kubernetes', highlight: 'lime' },
  { text: 'PostgreSQL', highlight: 'blue' },
  { text: 'GraphQL', highlight: 'lime' },
  { text: 'TypeScript', highlight: 'blue' },
  { text: 'Machine Learning', highlight: 'lime' },
  { text: 'CI/CD', highlight: 'blue' },
  { text: 'Terraform', highlight: 'lime' },
]

const row2Items: MarqueeItem[] = [
  { text: 'Next.js', highlight: 'purple' },
  { text: 'Redis', highlight: 'green' },
  { text: 'Stripe', highlight: 'purple' },
  { text: 'Elasticsearch', highlight: 'green' },
  { text: 'Prisma', highlight: 'purple' },
  { text: 'WebSockets', highlight: 'green' },
  { text: 'Tailwind', highlight: 'purple' },
  { text: 'gRPC', highlight: 'green' },
]

function HighlightedText({ text, variant }: { text: string; variant: 'blue' | 'lime' | 'purple' | 'green' }) {
  const colorMap = {
    blue: 'text-marquee-blue',
    lime: 'text-accent-lime',
    purple: 'text-marquee-purple',
    green: 'text-marquee-green',
  }

  const strokeMap = {
    blue: '',
    lime: '[-webkit-text-stroke:1px_rgba(223,255,0,0.5)]',
    purple: '',
    green: '',
  }

  return (
    <span className={`${colorMap[variant]} ${strokeMap[variant] || ''}`}>
      {text}
    </span>
  )
}

function MarqueeRow({
  items,
  direction,
  speed,
  opacity = 1,
  className = '',
}: {
  items: MarqueeItem[]
  direction: 'left' | 'right'
  speed: string
  opacity?: number
  className?: string
}) {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`flex whitespace-nowrap overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <div
        className={`flex items-center shrink-0 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } ${speed}`}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className="text-[48px] md:text-[80px] font-bold font-sans tracking-[-0.02em] flex items-center shrink-0"
          >
            <HighlightedText text={item.text} variant={item.highlight} />
            <CheckIcon />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { x: '30%', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.6,
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="py-10 md:py-12 overflow-hidden opacity-0"
      style={{ background: '#0A0A1A' }}
    >
      <MarqueeRow
        items={row1Items}
        direction="left"
        speed="md:animate-marquee-left animate-marquee-left-fast"
      />
      <MarqueeRow
        items={row2Items}
        direction="right"
        speed="md:animate-marquee-right animate-marquee-right-fast"
        opacity={0.7}
        className="mt-4 hidden md:flex"
      />
    </div>
  )
}
