import React, { createContext, useContext, useEffect, useState } from 'react'
import { X, ShieldCheck, CheckCircle2, Cloud, Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage, type TierKey } from '../lib/i18n'

export interface QuoteModalPrefill {
  serviceCode?: string
  environment?: string
  tier?: TierKey | string
}

interface QuoteModalContextValue {
  openQuoteModal: (prefill?: QuoteModalPrefill) => void
  closeQuoteModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextValue | undefined>(undefined)

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext)
  if (!ctx) {
    throw new Error('useQuoteModal must be used within QuoteModalProvider')
  }
  return ctx
}

function mapTierToOptionValue(tier: string | undefined): string {
  if (!tier) return 'Professional ($5,000/mo)'
  const normalized = tier.toLowerCase()
  if (normalized.includes('starter')) return 'Starter ($2,500/mo)'
  if (normalized.includes('professional')) return 'Professional ($5,000/mo)'
  if (normalized.includes('enterprise')) return 'Enterprise ($10,000/mo)'
  return tier
}

function inferEnvironmentFromService(serviceCode?: string): string {
  if (!serviceCode) return 'AWS → GCP Migration'
  const upper = serviceCode.toUpperCase()
  if (upper.includes('CSM-04')) return 'AWS → GCP Migration'
  if (upper.includes('CSM-05')) return 'AWS → Azure Migration'
  if (upper.includes('CSM-07')) return 'Multi-Cloud / Hybrid'
  return 'Cloud Native (Single Cloud)'
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('FULL_SUITE')
  const [environment, setEnvironment] = useState<string>('AWS → GCP Migration')
  const [tier, setTier] = useState<string>('Professional ($5,000/mo)')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const openQuoteModal = (prefill?: QuoteModalPrefill) => {
    setSubmitted(false)
    if (prefill?.serviceCode) {
      setSelectedService(prefill.serviceCode)
      const matched = t.cloudSubServices.find(
        (s) => s.code.toLowerCase() === prefill.serviceCode?.toLowerCase() || s.id === prefill.serviceCode?.toLowerCase()
      )
      if (matched && !prefill.tier) {
        setTier(mapTierToOptionValue(matched.recommendedTier))
      }
    } else {
      setSelectedService('FULL_SUITE')
    }

    if (prefill?.environment) {
      setEnvironment(prefill.environment)
    } else if (prefill?.serviceCode) {
      setEnvironment(inferEnvironmentFromService(prefill.serviceCode))
    }

    if (prefill?.tier) {
      setTier(mapTierToOptionValue(prefill.tier))
    }

    setIsOpen(true)
  }

  const closeQuoteModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuoteModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setSubmitted(true)
  }

  const selectedServiceLabel =
    selectedService === 'FULL_SUITE'
      ? t.quoteModal.fullSuiteOption
      : (() => {
          const found = t.cloudSubServices.find(
            (s) => s.code.toLowerCase() === selectedService.toLowerCase() || s.id === selectedService.toLowerCase()
          )
          return found ? `${found.code} — ${found.title}` : selectedService
        })()

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-dark/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeQuoteModal()
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <div className="relative w-full max-w-[640px] rounded-[20px] bg-surface border border-border-os shadow-card-hover p-6 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeQuoteModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-[10px] border border-border-os flex items-center justify-center text-secondary-text hover:text-off-white hover:border-accent-lime transition-colors"
              aria-label={t.quoteModal.closeBtn}
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <div>
                {/* Header Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-accent-lime mb-4" style={{ background: 'rgba(223, 255, 0, 0.12)' }}>
                  <ShieldCheck size={14} />
                  <span>{t.quoteModal.badge}</span>
                </div>

                <h3 id="quote-modal-title" className="text-2xl sm:text-3xl font-bold text-off-white font-sans tracking-[-0.02em]">
                  {t.quoteModal.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-secondary-text mt-2 leading-relaxed">
                  {t.quoteModal.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Sub-service selector */}
                  <div>
                    <label className="block text-xs font-mono text-off-white mb-1.5">
                      {t.quoteModal.serviceLabel}
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => {
                        const val = e.target.value
                        setSelectedService(val)
                        const matched = t.cloudSubServices.find((s) => s.code === val)
                        if (matched) {
                          setTier(mapTierToOptionValue(matched.recommendedTier))
                          setEnvironment(inferEnvironmentFromService(matched.code))
                        }
                      }}
                      className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white outline-none transition-colors"
                    >
                      <option value="FULL_SUITE">{t.quoteModal.fullSuiteOption}</option>
                      {t.cloudSubServices.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.code} — {s.title} ({s.recommendedTier})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cloud Environment & Tier preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-off-white mb-1.5">
                        {t.quoteModal.environmentLabel}
                      </label>
                      <select
                        value={environment}
                        onChange={(e) => setEnvironment(e.target.value)}
                        className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white outline-none transition-colors"
                      >
                        {t.quoteModal.environments.map((env) => (
                          <option key={env.value} value={env.value}>
                            {env.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-off-white mb-1.5">
                        {t.quoteModal.tierLabel}
                      </label>
                      <select
                        value={tier}
                        onChange={(e) => setTier(e.target.value)}
                        className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white outline-none transition-colors"
                      >
                        {t.quoteModal.tiers.map((tr) => (
                          <option key={tr.value} value={tr.value}>
                            {tr.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-off-white mb-1.5">
                        {t.quoteModal.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.quoteModal.namePlaceholder}
                        className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white placeholder:text-secondary-text/50 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-off-white mb-1.5">
                        {t.quoteModal.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.quoteModal.emailPlaceholder}
                        className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white placeholder:text-secondary-text/50 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono text-off-white mb-1.5">
                      {t.quoteModal.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.quoteModal.companyPlaceholder}
                      className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white placeholder:text-secondary-text/50 outline-none transition-colors"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-mono text-off-white mb-1.5">
                      {t.quoteModal.notesLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.quoteModal.notesPlaceholder}
                      className="w-full bg-dark border border-border-os focus:border-accent-lime rounded-[10px] px-3.5 py-2.5 text-sm font-mono text-off-white placeholder:text-secondary-text/50 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="flex items-start gap-2.5 p-3.5 rounded-[10px] bg-dark/80 border border-border-os/70">
                    <Sparkles size={16} className="text-accent-lime shrink-0 mt-0.5" />
                    <p className="text-xs font-mono text-secondary-text leading-relaxed">
                      {t.quoteModal.noLoosePriceNote}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeQuoteModal}
                      className="w-full sm:w-auto px-5 py-3 rounded-[10px] border border-border-os text-sm font-semibold font-sans text-secondary-text hover:text-off-white hover:border-off-white transition-colors"
                    >
                      {t.quoteModal.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-[10px] bg-accent-lime text-dark font-semibold text-sm font-sans hover:bg-accent-lime-hover hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      <span>{t.quoteModal.submitBtn}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success state */
              <div className="py-4 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 border border-success-green/40"
                  style={{ background: 'rgba(59, 201, 160, 0.12)' }}
                >
                  <CheckCircle2 size={32} className="text-success-green" />
                </div>

                <h3 className="text-2xl font-bold text-off-white font-sans">
                  {t.quoteModal.successTitle}
                </h3>
                <p className="text-sm font-mono text-secondary-text mt-3 max-w-[480px] mx-auto leading-relaxed">
                  {t.quoteModal.successMessage}
                </p>

                <div className="mt-6 text-left p-4 rounded-[14px] bg-dark border border-border-os space-y-2 text-xs font-mono">
                  <div className="text-accent-lime font-semibold mb-2 flex items-center gap-2">
                    <Cloud size={14} />
                    <span>{t.quoteModal.successSummaryLabel}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-secondary-text">Scope:</span>
                    <span className="text-off-white text-right">{selectedServiceLabel}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-secondary-text">Cloud:</span>
                    <span className="text-off-white text-right">{environment}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-secondary-text">Tier:</span>
                    <span className="text-accent-lime text-right">{tier}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-secondary-text">Contact:</span>
                    <span className="text-off-white text-right">
                      {name} ({email})
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeQuoteModal}
                  className="mt-6 w-full sm:w-auto px-8 py-3 rounded-[10px] bg-accent-lime text-dark font-semibold text-sm font-sans hover:bg-accent-lime-hover transition-all"
                >
                  {t.quoteModal.closeBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  )
}

export default QuoteModalProvider
