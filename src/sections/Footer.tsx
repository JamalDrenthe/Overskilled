export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'Services', id: 'hero' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Docs', id: 'pricing' },
    { label: 'Blog', id: 'social-proof' },
    { label: 'Privacy', id: 'hero' },
    { label: 'Terms', id: 'hero' },
  ]

  return (
    <footer
      className="px-5 md:px-12 py-12 border-t border-border-os"
      style={{ background: '#0A0A1A' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="text-secondary-text font-extrabold text-base tracking-[0.08em] font-sans">
          OVERSKILLED
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-[13px] font-mono text-secondary-text hover:text-off-white transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[13px] font-mono text-secondary-text/60">
          © 2025 OVERSKILLED. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
