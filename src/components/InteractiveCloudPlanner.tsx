import { useState } from 'react'
import {
  Layers,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Clock,
  TrendingDown,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '../lib/i18n'
import { useQuoteModal } from './QuoteModal'

export default function InteractiveCloudPlanner() {
  const { t } = useLanguage()
  const { openQuoteModal } = useQuoteModal()

  const [activeTab, setActiveTab] = useState<'blueprint' | 'scope'>('blueprint')
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<'aws-gcp' | 'aws-azure' | 'sec-finops'>('aws-gcp')
  const [selectedScopeId, setSelectedScopeId] = useState<'audit' | 'migration' | 'enterprise'>('migration')

  const activeBlueprint =
    t.planner.blueprints.find((b) => b.id === selectedBlueprintId) || t.planner.blueprints[0]
  const activeScope =
    t.planner.scopes.find((s) => s.id === selectedScopeId) || t.planner.scopes[0]

  const handleOpenQuoteFromBlueprint = () => {
    if (activeBlueprint.id === 'aws-gcp') {
      openQuoteModal({
        serviceCode: 'CSM-04',
        environment: 'AWS → GCP Migration',
        tier: 'Professional',
      })
    } else if (activeBlueprint.id === 'aws-azure') {
      openQuoteModal({
        serviceCode: 'CSM-05',
        environment: 'AWS → Azure Migration',
        tier: 'Professional',
      })
    } else {
      openQuoteModal({
        serviceCode: 'CSM-03',
        environment: 'Cloud Native (Single Cloud)',
        tier: 'Professional',
      })
    }
  }

  const handleOpenQuoteFromScope = () => {
    const firstCode = activeScope.matchedServices[0] || 'FULL_SUITE'
    openQuoteModal({
      serviceCode: activeScope.id === 'enterprise' ? 'CSM-07' : firstCode,
      tier: activeScope.recommendedTier,
    })
  }

  return (
    <div className="rounded-[20px] bg-surface border border-border-os p-5 sm:p-8 md:p-10 shadow-card-hover">
      {/* Header + Main Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border-os">
        <div>
          <span
            className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.05em] px-3.5 py-1.5 rounded-full text-accent-lime mb-3"
            style={{ background: 'rgba(223, 255, 0, 0.1)' }}
          >
            <Sparkles size={13} />
            {t.planner.eyebrow}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white font-sans tracking-[-0.02em]">
            {t.planner.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-secondary-text mt-2 max-w-[680px] leading-relaxed">
            {t.planner.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row gap-2 bg-dark p-1.5 rounded-[12px] border border-border-os shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('blueprint')}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'blueprint'
                ? 'bg-accent-lime text-dark font-semibold'
                : 'text-secondary-text hover:text-off-white'
            }`}
          >
            <Layers size={15} />
            <span>{t.planner.tabBlueprint}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scope')}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'scope'
                ? 'bg-accent-lime text-dark font-semibold'
                : 'text-secondary-text hover:text-off-white'
            }`}
          >
            <Sliders size={15} />
            <span>{t.planner.tabScope}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CLOUD BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="mt-6">
          {/* Scenario selector pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {t.planner.blueprints.map((bp) => {
              const selected = bp.id === activeBlueprint.id
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setSelectedBlueprintId(bp.id)}
                  className={`text-left p-4 rounded-[14px] border transition-all ${
                    selected
                      ? 'bg-dark border-accent-lime shadow-lime-glow'
                      : 'bg-dark/60 border-border-os hover:border-secondary-text'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-accent-lime">{bp.badge}</span>
                    {selected && <span className="w-2 h-2 rounded-full bg-accent-lime" />}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-off-white font-sans">
                    {bp.label}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm font-mono text-secondary-text mt-5 leading-relaxed">
            {activeBlueprint.summary}
          </p>

          {/* Desktop Table + Mobile Stack Cards */}
          <div className="mt-5 hidden md:block overflow-hidden rounded-[14px] border border-border-os bg-dark">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-os bg-surface/60 text-[11px] font-mono uppercase tracking-[0.05em] text-secondary-text">
                  <th className="py-3.5 px-4">{t.planner.blueprintColumns.category}</th>
                  <th className="py-3.5 px-4">{t.planner.blueprintColumns.source}</th>
                  <th className="py-3.5 px-4 text-accent-lime">{t.planner.blueprintColumns.target}</th>
                  <th className="py-3.5 px-4 text-success-green">{t.planner.blueprintColumns.guardrail}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-os/60 text-xs font-mono">
                {activeBlueprint.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-off-white font-sans">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-secondary-text">{row.source}</td>
                    <td className="py-3.5 px-4 text-off-white font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <ArrowRight size={13} className="text-accent-lime shrink-0" />
                        <span>{row.target}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-success-green">
                      <span className="inline-flex items-start gap-1.5">
                        <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                        <span>{row.guardrail}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards for blueprint rows */}
          <div className="mt-5 md:hidden space-y-3">
            {activeBlueprint.rows.map((row, idx) => (
              <div key={idx} className="p-4 rounded-[14px] bg-dark border border-border-os space-y-2 text-xs font-mono">
                <div className="text-sm font-bold text-off-white font-sans">{row.category}</div>
                <div>
                  <span className="text-secondary-text/70 block text-[11px]">
                    {t.planner.blueprintColumns.source}:
                  </span>
                  <span className="text-secondary-text">{row.source}</span>
                </div>
                <div>
                  <span className="text-accent-lime/80 block text-[11px]">
                    {t.planner.blueprintColumns.target}:
                  </span>
                  <span className="text-off-white font-medium">{row.target}</span>
                </div>
                <div className="pt-1 border-t border-border-os/50 text-success-green flex items-start gap-1.5">
                  <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                  <span>{row.guardrail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border-os/60">
            <div className="text-xs font-mono text-secondary-text">
              <span className="text-accent-lime font-semibold">{activeBlueprint.badge}</span> —{' '}
              {activeBlueprint.label}
            </div>
            <button
              type="button"
              onClick={handleOpenQuoteFromBlueprint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-xs sm:text-sm px-6 py-3 rounded-[10px] hover:bg-accent-lime-hover transition-all font-sans"
            >
              <span>{t.planner.scopeLabels.ctaButton}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: SCOPE & TIER MATCH */}
      {activeTab === 'scope' && (
        <div className="mt-6">
          <p className="text-xs font-mono uppercase tracking-[0.05em] text-secondary-text mb-3">
            {t.planner.scopeLabels.selectScale}
          </p>

          {/* Scale selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {t.planner.scopes.map((sc) => {
              const selected = sc.id === activeScope.id
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScopeId(sc.id)}
                  className={`text-left p-4 rounded-[14px] border transition-all ${
                    selected
                      ? 'bg-dark border-accent-lime shadow-lime-glow'
                      : 'bg-dark/60 border-border-os hover:border-secondary-text'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-accent-lime">
                      {sc.recommendedTier} ({sc.price}
                      {sc.period})
                    </span>
                    {selected && <span className="w-2 h-2 rounded-full bg-accent-lime" />}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-off-white font-sans">
                    {sc.label}
                  </div>
                  <p className="text-xs font-mono text-secondary-text mt-1 line-clamp-2">
                    {sc.subtitle}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Match output box */}
          <div className="mt-6 p-5 sm:p-6 rounded-[16px] bg-dark border border-border-os">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-border-os">
              {/* Recommended Tier & Price */}
              <div className="p-4 rounded-[12px] bg-surface border border-accent-lime/50">
                <div className="text-[11px] font-mono text-secondary-text uppercase">
                  {t.planner.scopeLabels.recommendedTier}
                </div>
                <div className="text-xl font-bold text-accent-lime font-sans mt-1">
                  {activeScope.recommendedTier}
                </div>
                <div className="text-lg font-bold text-off-white font-sans mt-0.5">
                  {activeScope.price}
                  <span className="text-xs font-mono text-secondary-text">{activeScope.period}</span>
                </div>
              </div>

              {/* Capacity */}
              <div className="p-4 rounded-[12px] bg-surface/60 border border-border-os">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-secondary-text uppercase">
                  <Users size={13} className="text-accent-lime" />
                  <span>{t.planner.scopeLabels.engineeringCapacity}</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-off-white mt-2 leading-snug">
                  {activeScope.capacity}
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 rounded-[12px] bg-surface/60 border border-border-os">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-secondary-text uppercase">
                  <Clock size={13} className="text-accent-lime" />
                  <span>{t.planner.scopeLabels.estimatedTimeline}</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-off-white mt-2 leading-snug">
                  {activeScope.timeline}
                </div>
              </div>

              {/* Savings / Impact */}
              <div className="p-4 rounded-[12px] bg-surface/60 border border-border-os">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-secondary-text uppercase">
                  <TrendingDown size={13} className="text-success-green" />
                  <span>{t.planner.scopeLabels.expectedImpact}</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-success-green mt-2 leading-snug">
                  {activeScope.savings}
                </div>
              </div>
            </div>

            {/* Description + Matched Sub-Services */}
            <div className="mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-[680px]">
                <p className="text-xs sm:text-sm font-mono text-off-white leading-relaxed">
                  {activeScope.description}
                </p>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.05em] text-secondary-text block mb-2">
                    {t.planner.scopeLabels.matchedSubServices}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeScope.matchedServices.map((code) => {
                      const sub = t.cloudSubServices.find((s) => s.code === code)
                      return (
                        <span
                          key={code}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-surface border border-border-os text-off-white"
                        >
                          <CheckCircle2 size={12} className="text-success-green" />
                          <span className="text-accent-lime font-semibold">{code}</span>
                          {sub && <span className="text-secondary-text hidden sm:inline">• {sub.title}</span>}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenQuoteFromScope}
                className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-accent-lime text-dark font-semibold text-sm px-7 py-3.5 rounded-[10px] hover:bg-accent-lime-hover transition-all font-sans"
              >
                <span>{t.planner.scopeLabels.ctaButton}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
