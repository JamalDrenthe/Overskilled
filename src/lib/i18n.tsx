import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'nl' | 'en'
export type SubServiceTag = 'security' | 'optimization' | 'migration' | 'managed'
export type TierKey = 'Starter' | 'Professional' | 'Enterprise'

export interface SubServiceMetric {
  value: string
  label: string
}

export interface CloudSubService {
  id: string
  code: string
  badge: string
  title: string
  subtitle: string
  description: string
  deliverables: [string, string, string, string]
  recommendedTier: TierKey
  tierRationale: string
  metrics: [SubServiceMetric, SubServiceMetric]
  tags: SubServiceTag[]
}

export interface BlueprintRow {
  category: string
  source: string
  target: string
  guardrail: string
}

export interface BlueprintOption {
  id: 'aws-gcp' | 'aws-azure' | 'sec-finops'
  label: string
  badge: string
  summary: string
  rows: BlueprintRow[]
}

export interface ScopeMatchOption {
  id: 'audit' | 'migration' | 'enterprise'
  label: string
  subtitle: string
  recommendedTier: TierKey
  price: string
  period: string
  capacity: string
  timeline: string
  savings: string
  matchedServices: string[]
  description: string
}

export interface PricingTierTranslation {
  key: TierKey
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

export interface FAQItem {
  q: string
  a: string
}

export interface Translations {
  nav: {
    home: string
    services: string
    newBadge: string
    pricing: string
    results: string
    cta: string
    langLabel: string
  }
  hero: {
    newPillBadge: string
    newPillText: string
    circularText: string
    headlineWords: string[]
    highlightWords: string[]
    subtitle: string
    primaryCta: string
    secondaryCta: string
  }
  servicesPreview: {
    eyebrow: string
    title: string
    subtitle: string
    viewAllCta: string
    quoteCta: string
    recommendedTierLabel: string
    deliverablesLabel: string
    requestQuoteBtn: string
    detailsBtn: string
  }
  servicesPage: {
    backToHome: string
    eyebrow: string
    title: string
    titleAccent: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    stats: {
      value: string
      label: string
    }[]
    quickJumpLabel: string
    noLoosePricesBanner: {
      badge: string
      title: string
      description: string
      cta: string
    }
    filters: {
      all: string
      security: string
      migration: string
      optimization: string
      managed: string
    }
    cardLabels: {
      deliverables: string
      recommendedTier: string
      requestQuote: string
      viewTierPricing: string
    }
    protocol: {
      eyebrow: string
      title: string
      subtitle: string
      steps: {
        num: string
        phase: string
        title: string
        description: string
        output: string
      }[]
    }
    tierMapping: {
      eyebrow: string
      title: string
      subtitle: string
      includedServicesLabel: string
      selectTierCta: string
      tiers: {
        key: TierKey
        name: string
        price: string
        period: string
        tagline: string
        capacity: string
        featured?: boolean
        serviceCodes: string[]
        highlights: string[]
      }[]
    }
  }
  planner: {
    eyebrow: string
    title: string
    subtitle: string
    tabBlueprint: string
    tabScope: string
    blueprintColumns: {
      category: string
      source: string
      target: string
      guardrail: string
    }
    blueprints: BlueprintOption[]
    scopeLabels: {
      selectScale: string
      recommendedTier: string
      monthlyInvestment: string
      engineeringCapacity: string
      estimatedTimeline: string
      expectedImpact: string
      matchedSubServices: string
      ctaButton: string
    }
    scopes: ScopeMatchOption[]
  }
  cloudSubServices: CloudSubService[]
  faq: {
    eyebrow: string
    title: string
    subtitle: string
    items: FAQItem[]
  }
  quoteModal: {
    badge: string
    title: string
    subtitle: string
    serviceLabel: string
    fullSuiteOption: string
    environmentLabel: string
    environments: {
      value: string
      label: string
    }[]
    tierLabel: string
    tiers: {
      value: string
      label: string
    }[]
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    notesLabel: string
    notesPlaceholder: string
    noLoosePriceNote: string
    submitBtn: string
    cancelBtn: string
    successTitle: string
    successMessage: string
    successSummaryLabel: string
    closeBtn: string
  }
  pricing: {
    title: string
    noHiddenFees: string
    featuresLabel: string
    cancelAnytime: string
    tiers: PricingTierTranslation[]
  }
  socialProof: {
    stat1Label: string
    stat2Label: string
    quote: string
    author: string
  }
  finalCta: {
    headlineWords: string[]
    subtext: string
    cta: string
  }
  footer: {
    services: string
    pricing: string
    results: string
    faq: string
    privacy: string
    terms: string
    copyright: string
  }
}

export const translations: Record<Language, Translations> = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      newBadge: 'NEW',
      pricing: 'Prijzen',
      results: 'Resultaten',
      cta: 'Offerte / Intake',
      langLabel: 'Taal',
    },
    hero: {
      newPillBadge: 'NEW',
      newPillText: 'Cloud Security & Migration Suite (AWS → GCP / Azure)',
      circularText: 'OVERSKILLED • ON DEMAND • ',
      headlineWords: 'Tech expertise zonder de overhead. Betaal per maand, altijd opzegbaar.'.split(' '),
      highlightWords: ['zonder', 'de', 'overhead.'],
      subtitle:
        'Cloud security, zero-downtime migraties (AWS → GCP/Azure), DevOps, full-stack engineering en AI — uitgevoerd door senior engineers. Geen werving, geen losse uurtarieven, alleen resultaat.',
      primaryCta: 'Start Jouw Abonnement',
      secondaryCta: 'Bekijk Cloud Security & Migration',
    },
    servicesPreview: {
      eyebrow: 'NIEUWE DIENST • CLOUD SECURITY & MIGRATION',
      title: 'BEVEILIG, OPTIMALISEER & MIGREER ZONDER DOWNTIME',
      subtitle:
        'Van diepgaande Cloud Security Assessments en SOC2/NIS2 compliance tot volledige AWS → GCP en AWS → Azure migraties. Geen losse prijzen per sub-dienst: alles draait flexibel binnen onze vaste maandelijkse tiers.',
      viewAllCta: 'Bekijk volledige dienstenpagina',
      quoteCta: 'Offerte aanvragen',
      recommendedTierLabel: 'Aanbevolen tier',
      deliverablesLabel: 'Kern-deliverables',
      requestQuoteBtn: 'Request Quote',
      detailsBtn: 'Details',
    },
    servicesPage: {
      backToHome: 'Terug naar overzicht',
      eyebrow: 'ENTERPRISE SUITE • CSM-01 T/M CSM-07',
      title: 'CLOUD SECURITY &',
      titleAccent: 'MIGRATION',
      subtitle:
        'End-to-end cloud beveiliging, architectuur-optimalisatie en zero-downtime migraties van AWS naar Google Cloud (GCP) of Microsoft Azure. Uitgevoerd door dedicated senior cloud architects binnen één transparant maandelijks abonnement.',
      primaryCta: 'Request Quote / Scope Intake',
      secondaryCta: 'Bekijk Tier Mapping',
      stats: [
        { value: '99.99%', label: 'Uptime SLA bij migraties' },
        { value: '-38%', label: 'Gem. cloud kostenreductie' },
        { value: 'Zero', label: 'Data loss & productie-onderbreking' },
        { value: '24/7', label: 'CSPM & continue bewaking' },
      ],
      quickJumpLabel: 'DIRECT NAAR SUB-DIENST:',
      noLoosePricesBanner: {
        badge: 'TRANSPARANT TIER-MODEL',
        title: 'Geen losse prijzen of uurtje-factuurtje per sub-dienst',
        description:
          'Elke cloud-omgeving is anders. Daarom rekenen wij geen onvoorspelbare projectprijzen per sub-dienst, maar koppelen we jouw scope aan onze bestaande Starter ($2,500/mo), Professional ($5,000/mo) of Enterprise ($10,000/mo) tiers. Combineer meerdere sub-diensten en pauzeer of zeg maandelijks op.',
        cta: 'Start Scope Intake',
      },
      filters: {
        all: 'Alle sub-diensten (7)',
        security: 'Security & Audits',
        migration: 'Cloud Migratie (AWS → GCP/Azure)',
        optimization: 'Architectuur & Compliance',
        managed: '24/7 Continuous Guard',
      },
      cardLabels: {
        deliverables: 'CONCRETE DELIVERABLES',
        recommendedTier: 'AANBEVOLEN TIER',
        requestQuote: 'Request Quote / Scope Intake',
        viewTierPricing: 'Past in',
      },
      protocol: {
        eyebrow: 'HOE WIJ WERKEN',
        title: 'HET 4-STAPPEN ZERO-DOWNTIME PROTOCOL',
        subtitle:
          'Elke engagement volgt een strikt engineering-protocol zodat security, compliance en uptime op geen enkel moment in gevaar komen.',
        steps: [
          {
            num: '01',
            phase: 'ASSESS',
            title: 'Diepgaande Audit & Threat Modeling',
            description:
              'We brengen je volledige huidige cloud-footprint, IAM-rechten, netwerk-topologie, kostenlekken en compliance-gaps (SOC2, ISO27001, NIS2) geautomatiseerd en handmatig in kaart.',
            output: 'Output: Geprioriteerde Risk Matrix & Remediation Backlog',
          },
          {
            num: '02',
            phase: 'ARCHITECT',
            title: 'Target Blueprint & IaC Landing Zone',
            description:
              'We ontwerpen de doelarchitectuur in Terraform/OpenTofu met Zero-Trust netwerksegmentatie, KMS-encryptie, FinOps-guardrails en geautomatiseerde policy-as-code.',
            output: 'Output: Geteste Terraform Modules & Cutover Runbook',
          },
          {
            num: '03',
            phase: 'MIGRATE',
            title: 'Zero-Downtime Replicatie & Cutover',
            description:
              'Gefaseerde workload- en datamigratie (EKS → GKE/AKS, RDS → AlloyDB/Cloud SQL/Azure PostgreSQL) met live CDC-replicatie, canary traffic shifting en directe rollback-garantie.',
            output: 'Output: Productie Cutover zonder dataverlies of downtime',
          },
          {
            num: '04',
            phase: 'AUDIT & CONTINUOUS GUARD',
            title: 'Post-Migration Sign-Off & 24/7 CSPM',
            description:
              'Na de migratie ruimen we legacy AWS-resources op, verifiëren we drift en bewaken we de omgeving 24/7 met geautomatiseerde patching, SIEM/SOAR en incident response.',
            output: 'Output: Formeel Security Sign-Off Rapport & 24/7 SLA',
          },
        ],
      },
      tierMapping: {
        eyebrow: 'TIER KOPPELING',
        title: 'WELKE TIER PAST BIJ JOUW CLOUD SCOPE?',
        subtitle:
          'Geen verrassingen achteraf. Kies de snelheid en engineering-capaciteit die past bij jouw fase. Je kunt op elk moment opschalen of afschalen.',
        includedServicesLabel: 'Ideaal voor deze sub-diensten:',
        selectTierCta: 'Request Quote met deze Tier',
        tiers: [
          {
            key: 'Starter',
            name: 'Starter',
            price: '$2,500',
            period: '/mnd',
            tagline: 'Voor gerichte security audits, compliance reviews en post-migration sign-offs.',
            capacity: '1 dedicated senior cloud engineer • 40 uur/maand',
            serviceCodes: ['CSM-01', 'CSM-02', 'CSM-06'],
            highlights: [
              'Volledige Cloud Security Assessment (CSM-01) in 2-3 weken',
              'SOC2 / ISO27001 / NIS2 / GDPR gap-analyse & roadmap (CSM-02)',
              'Post-Migration Security Audit & legacy resource cleanup (CSM-06)',
              'Wekelijkse standups & directe Git/IaC pull requests',
            ],
          },
          {
            key: 'Professional',
            name: 'Professional',
            price: '$5,000',
            period: '/mnd',
            tagline: 'Voor actieve cloud herarchitectuur en volledige AWS → GCP of AWS → Azure migraties.',
            capacity: '2 dedicated senior cloud engineers • 80 uur/maand',
            featured: true,
            serviceCodes: ['CSM-03', 'CSM-04', 'CSM-05', 'CSM-01', 'CSM-02', 'CSM-06'],
            highlights: [
              'Volledige AWS → GCP (CSM-04) of AWS → Azure (CSM-05) productie-migratie',
              'Cloud Architecture Optimization, HA & FinOps kostenreductie (CSM-03)',
              'Inclusief voorafgaande security assessment & post-migration sign-off',
              'Dagelijkse standups, Priority Slack & zero-downtime cutover executie',
            ],
          },
          {
            key: 'Enterprise',
            name: 'Enterprise',
            price: '$10,000',
            period: '/mnd',
            tagline: 'Voor multi-cloud transformaties op schaal en 24/7 Continuous Cloud Security Management.',
            capacity: '4 dedicated senior cloud engineers • 160 uur/maand',
            serviceCodes: ['CSM-07', 'CSM-01', 'CSM-02', 'CSM-03', 'CSM-04', 'CSM-05', 'CSM-06'],
            highlights: [
              '24/7 Continuous Cloud Security Management, CSPM & on-call (CSM-07)',
              'Parallelle multi-region migraties & volledige infrastructuur-overname',
              'Geautomatiseerde patching, SIEM/SOAR-integratie & SLA-garantie',
              'Dedicated cloud lead architect & kwartaal-strategie sessies',
            ],
          },
        ],
      },
    },
    planner: {
      eyebrow: 'INTERACTIEVE CLOUD PLANNER',
      title: 'ONTWERP JOUW MIGRATIE- & SECURITY BLUEPRINT',
      subtitle:
        'Verken onze referentie-architecturen van bron naar doel óf bereken direct welke maandelijkse tier het beste past bij jouw cloud-vraagstuk.',
      tabBlueprint: '1. Cloud Blueprint (Bron → Doel)',
      tabScope: '2. Scope & Tier Match',
      blueprintColumns: {
        category: 'Laag / Domein',
        source: 'Huidige Omgeving (Bron)',
        target: 'Doelarchitectuur (Target)',
        guardrail: 'Ingebouwde Security Guardrail',
      },
      blueprints: [
        {
          id: 'aws-gcp',
          label: 'AWS → Google Cloud (GCP)',
          badge: 'CSM-04 • Zero-Downtime',
          summary:
            'Volledige container-, database- en IAM-transformatie van AWS naar Google Cloud met behoud van uptime via live CDC-replicatie en hybride VPN/Interconnect.',
          rows: [
            {
              category: 'Compute & Containers',
              source: 'Amazon EKS / ECS / EC2',
              target: 'GKE Autopilot / Cloud Run',
              guardrail: 'Binary Authorization, Workload Identity & gVisor sandboxing',
            },
            {
              category: 'Databases & Opslag',
              source: 'Amazon RDS / Aurora / S3',
              target: 'AlloyDB / Cloud SQL + Cloud Storage',
              guardrail: 'Database Migration Service (CDC), CMEK encryptie & VPC Service Controls',
            },
            {
              category: 'Netwerk & Edge',
              source: 'AWS VPC / ALB / CloudFront',
              target: 'Shared VPC / Cloud Load Balancing / Cloud Armor',
              guardrail: 'WAF DDoS-bescherming, Private Service Connect & Zero-Trust IAP',
            },
            {
              category: 'Identity & Secrets',
              source: 'AWS IAM / Secrets Manager / KMS',
              target: 'Cloud IAM / Secret Manager / Cloud KMS',
              guardrail: 'Least-privilege OIDC federatie, geen long-lived service account keys',
            },
          ],
        },
        {
          id: 'aws-azure',
          label: 'AWS → Microsoft Azure',
          badge: 'CSM-05 • Enterprise Landing Zone',
          summary:
            'Naadloze overstap van AWS naar Microsoft Azure volgens het Cloud Adoption Framework (CAF), inclusief Entra ID-integratie en geautomatiseerde Bicep/Terraform Landing Zones.',
          rows: [
            {
              category: 'Compute & Containers',
              source: 'Amazon EKS / EC2 / Lambda',
              target: 'Azure Kubernetes Service (AKS) / Container Apps',
              guardrail: 'Defender for Containers, Azure Policy & Managed Identities',
            },
            {
              category: 'Databases & Opslag',
              source: 'Amazon RDS / DynamoDB / S3',
              target: 'Azure Database for PostgreSQL / Cosmos DB / Blob',
              guardrail: 'Private Endpoints, Customer-Managed Keys (Key Vault) & TDE',
            },
            {
              category: 'Netwerk & Edge',
              source: 'AWS VPC / Transit Gateway / Route53',
              target: 'Azure Virtual WAN / Hub-Spoke VNet / Front Door',
              guardrail: 'Azure Firewall Premium, NSG microsegmentatie & DDoS Protection',
            },
            {
              category: 'Identity & Governance',
              source: 'AWS Organizations / IAM',
              target: 'Microsoft Entra ID / Management Groups',
              guardrail: 'Conditional Access, PIM (Just-in-Time) & Defender for Cloud CSPM',
            },
          ],
        },
        {
          id: 'sec-finops',
          label: 'Security, FinOps & Compliance',
          badge: 'CSM-01 • CSM-02 • CSM-03',
          summary:
            'Optimaliseer en beveilig je bestaande AWS-, GCP- of Azure-stack zonder van provider te wisselen: sluit security-risico’s, behaal SOC2/NIS2 compliance en verlaag de maandelijkse cloud-factuur.',
          rows: [
            {
              category: 'Security Posture',
              source: 'Handmatige IAM & versnipperde security groups',
              target: 'Zero-Trust IAM + Geautomatiseerde CSPM',
              guardrail: 'CIS Benchmark hardening, 100% MFA/SSO & automatische drift-alerts',
            },
            {
              category: 'Compliance Frameworks',
              source: 'Losse spreadsheets & ad-hoc audit bewijslast',
              target: 'SOC2 / ISO27001 / NIS2 / GDPR Policy-as-Code',
              guardrail: 'Continue compliance-bewaking met exporteerbare audit-trails',
            },
            {
              category: 'FinOps & Kosten',
              source: 'Overprovisioned instances & ongebruikte volumes',
              target: 'Autoscaling, Rightsizing & Commitment Plans',
              guardrail: 'Gemiddeld 25%–45% structurele kostenbesparing met budget-anomaliemeldingen',
            },
            {
              category: 'Infrastructure-as-Code',
              source: 'ClickOps in de cloud console & configuratie-drift',
              target: '100% Modulaire Terraform / OpenTofu Pipelines',
              guardrail: 'Pre-commit security scans (tfsec/Checkov) & GitOps goedkeuringen',
            },
          ],
        },
      ],
      scopeLabels: {
        selectScale: 'Kies jouw gewenste scope & schaal:',
        recommendedTier: 'Aanbevolen Tier',
        monthlyInvestment: 'Maandelijkse Investering',
        engineeringCapacity: 'Dedicated Capaciteit',
        estimatedTimeline: 'Gemiddelde Doorlooptijd',
        expectedImpact: 'Verwachte Impact / Besparing',
        matchedSubServices: 'Passende Sub-diensten binnen deze Tier:',
        ctaButton: 'Open Scope Intake met deze selectie',
      },
      scopes: [
        {
          id: 'audit',
          label: 'Security Audit & Compliance Readiness',
          subtitle: 'Ideaal voor penetratie-/configuratie-audit, SOC2/NIS2 voorbereiding of post-migration controle.',
          recommendedTier: 'Starter',
          price: '$2,500',
          period: '/mnd',
          capacity: '1 Senior Cloud Security Engineer (40u/mnd)',
          timeline: '2 – 4 weken tot volledig audit-rapport & fixes',
          savings: 'Elimineert kritieke IAM/netwerk-lekken & versnelt compliance-certificering met 60%',
          matchedServices: ['CSM-01', 'CSM-02', 'CSM-06'],
          description:
            'Binnen de Starter-tier voeren we een volledige Cloud Security Assessment of Compliance Review uit, inclusief concrete Terraform PR’s om kritieke bevindingen direct te dichten.',
        },
        {
          id: 'migration',
          label: 'Productie Cloud Migratie & Herarchitectuur',
          subtitle: 'Ideaal voor zero-downtime AWS → GCP of AWS → Azure migraties en FinOps/Terraform modernisatie.',
          recommendedTier: 'Professional',
          price: '$5,000',
          period: '/mnd',
          capacity: '2 Senior Cloud Architects (80u/mnd)',
          timeline: '4 – 8 weken voor end-to-end productie cutover',
          savings: 'Gemiddeld 38% lagere cloudkosten + 99.99% uptime tijdens de migratie',
          matchedServices: ['CSM-03', 'CSM-04', 'CSM-05', 'CSM-01', 'CSM-06'],
          description:
            'Onze meest gekozen tier: twee senior engineers bouwen je nieuwe GCP of Azure Landing Zone in Terraform, zetten live database-replicatie op en begeleiden de cutover zonder downtime.',
        },
        {
          id: 'enterprise',
          label: 'Enterprise Multi-Cloud & 24/7 Managed Security',
          subtitle: 'Ideaal voor bedrijfskritische omgevingen die 24/7 CSPM, continue patching en volledige ontzorging vereisen.',
          recommendedTier: 'Enterprise',
          price: '$10,000',
          period: '/mnd',
          capacity: '4 Senior Cloud & Security Engineers (160u/mnd + 24/7 on-call)',
          timeline: 'Continue 24/7 dekking + versnelde multi-region uitrol',
          savings: 'Vervangt een intern cloud/SecOps team van $450k+/jaar met 15-min SLA response',
          matchedServices: ['CSM-07', 'CSM-01', 'CSM-02', 'CSM-03', 'CSM-04', 'CSM-05', 'CSM-06'],
          description:
            'Volledige ontzorging: toegang tot alle 7 sub-diensten tegelijk, inclusief 24/7 Continuous Cloud Security Management, incident response en kwartaal-architectuursessies.',
        },
      ],
    },
    cloudSubServices: [
      {
        id: 'csm-01',
        code: 'CSM-01',
        badge: 'SECURITY AUDIT',
        title: 'Cloud Security Assessment',
        subtitle: 'Diepgaande doorlichting van IAM, netwerk, containers, secrets en data-encryptie.',
        description:
          'We analyseren je volledige AWS-, GCP- of Azure-omgeving op misconfiguraties, te ruime IAM-permissies, publieke endpoints, onversleutelde opslag en kwetsbare container-images. Je krijgt geen theoretisch PDF-rapport, maar een geprioriteerde herstel-roadmap én directe Infrastructure-as-Code fixes.',
        deliverables: [
          'IAM & Least-Privilege Matrix (rollen, service accounts, OIDC federatie)',
          'Netwerk-, VPC-, Firewall- & Public Exposure kwetsbaarhedenrapport',
          'KMS-encryptie, Secrets Management & Container Image CVE-scan',
          'Geprioriteerde Remediation Backlog + kant-en-klare Terraform/OpenTofu fixes',
        ],
        recommendedTier: 'Starter',
        tierRationale:
          'Uitstekend uit te voeren binnen Starter ($2,500/mo) in 2–3 weken, of als startfase binnen Professional.',
        metrics: [
          { value: '100%', label: 'IAM & Netwerk zichtbaarheid' },
          { value: '<14 dgn', label: 'Tot compleet herstelplan' },
        ],
        tags: ['security'],
      },
      {
        id: 'csm-02',
        code: 'CSM-02',
        badge: 'COMPLIANCE & GOVERNANCE',
        title: 'Infrastructure & Compliance Review',
        subtitle: 'Audit-ready infrastructuur voor SOC 2 Type II, ISO 27001, NIS2, GDPR en CIS Benchmarks.',
        description:
          'Vertaal complexe wet- en regelgeving naar harde technische controles in je cloud. We toetsen je infrastructuur tegen CIS Benchmarks, SOC 2, ISO 27001, NIS2 en GDPR en implementeren geautomatiseerde policy-as-code zodat je continu aantoonbaar compliant blijft.',
        deliverables: [
          'Volledige Gap-Analyse tegen SOC 2, ISO 27001, NIS2, GDPR & CIS Benchmarks',
          'Policy-as-Code guardrails (OPA, AWS Config, Azure Policy of GCP Org Policies)',
          'Centrale Audit Logging, onveranderlijke log-retentie & SIEM-koppeling',
          'kant-en-klaar Evidence Pack voor externe auditors en enterprise klanten',
        ],
        recommendedTier: 'Starter',
        tierRationale:
          'Past binnen Starter ($2,500/mo) voor single-cloud reviews of Professional ($5,000/mo) bij versnelde implementatie.',
        metrics: [
          { value: '5+', label: 'Frameworks ondersteund' },
          { value: '-60%', label: 'Doorlooptijd externe audit' },
        ],
        tags: ['optimization'],
      },
      {
        id: 'csm-03',
        code: 'CSM-03',
        badge: 'ARCHITECTURE & FINOPS',
        title: 'Cloud Architecture Optimization',
        subtitle: 'High-Availability herontwerp, FinOps kostenreductie en 100% Terraform/OpenTofu standaardisatie.',
        description:
          'Elimineer technische schuld, fragiele ClickOps-configuraties en onnodige cloudkosten. We herstructureren je omgeving naar een modulaire, multi-zone High-Availability architectuur in Terraform of OpenTofu en snijden direct 25% tot 45% uit je maandelijkse cloud-rekening.',
        deliverables: [
          'Modulaire Terraform / OpenTofu codebase met geautomatiseerde CI/CD pipelines',
          'High-Availability (HA), multi-AZ failover & autoscaling architectuur',
          'FinOps Rightsizing, Spot/Committed Use strategie & anomaliemeldingen',
          'Performance tuning voor Kubernetes, databases, caching en CDN-lagen',
        ],
        recommendedTier: 'Professional',
        tierRationale:
          'Aanbevolen binnen Professional ($5,000/mo): 2 senior engineers die vaak zichzelf direct terugverdienen via FinOps-besparingen.',
        metrics: [
          { value: '-38%', label: 'Gem. maandelijkse cloudkosten' },
          { value: '100%', label: 'Infrastructure-as-Code dekking' },
        ],
        tags: ['optimization'],
      },
      {
        id: 'csm-04',
        code: 'CSM-04',
        badge: 'MIGRATION • AWS → GCP',
        title: 'AWS to GCP Migration',
        subtitle: 'Zero-downtime migratie van EKS/EC2/RDS/S3 naar GKE, AlloyDB/Cloud SQL en Google Cloud.',
        description:
          'Verhuis je productie-workloads veilig en zonder onderbreking van AWS naar Google Cloud Platform. We bouwen een beveiligde GCP Landing Zone, zetten live Change Data Capture (CDC) replicatie op voor je databases en schakelen verkeer gefaseerd om met directe rollback-mogelijkheid.',
        deliverables: [
          'GCP Enterprise Landing Zone (Shared VPC, Cloud IAM, Cloud Armor, KMS) in Terraform',
          'Container- & compute-migratie van Amazon EKS/ECS/EC2 naar GKE Autopilot of Cloud Run',
          'Zero-downtime database-migratie van RDS/Aurora naar AlloyDB of Cloud SQL via live CDC',
          'Gefaseerd Cutover Runbook, canary DNS-routing & rollback-validatie',
        ],
        recommendedTier: 'Professional',
        tierRationale:
          'Aanbevolen binnen Professional ($5,000/mo) voor dedicated migratie-executie, of Enterprise ($10,000/mo) bij grote multi-region clusters.',
        metrics: [
          { value: '99.99%', label: 'Uptime tijdens cutover' },
          { value: '0 bytes', label: 'Dataverlies bij CDC-sync' },
        ],
        tags: ['migration'],
      },
      {
        id: 'csm-05',
        code: 'CSM-05',
        badge: 'MIGRATION • AWS → AZURE',
        title: 'AWS to Azure Migration',
        subtitle: 'Enterprise Landing Zones, AKS, Azure Database en Microsoft Entra ID-integratie.',
        description:
          'Stap over van AWS naar Microsoft Azure met een architectuur gebouwd op het Microsoft Cloud Adoption Framework (CAF). We migreren containers naar AKS, databases naar Azure PostgreSQL/Cosmos DB en koppelen al je toegang naadloos aan Microsoft Entra ID en Defender for Cloud.',
        deliverables: [
          'Azure CAF Landing Zone (Hub-Spoke VNet, Management Groups, Azure Policy) in Terraform/Bicep',
          'Workload-migratie van AWS EKS/EC2/Lambda naar AKS en Azure Container Apps',
          'Identity- & toegangsintegratie met Microsoft Entra ID, Conditional Access & Key Vault',
          'Live data-synchronisatie van RDS/S3 naar Azure Database & Blob Storage met cutover-plan',
        ],
        recommendedTier: 'Professional',
        tierRationale:
          'Aanbevolen binnen Professional ($5,000/mo) met 2 senior cloud engineers die zowel AWS als Azure diepgaand beheersen.',
        metrics: [
          { value: 'CAF', label: 'Conform Microsoft standaard' },
          { value: 'Zero', label: 'Productie-onderbreking' },
        ],
        tags: ['migration'],
      },
      {
        id: 'csm-06',
        code: 'CSM-06',
        badge: 'POST-MIGRATION SIGN-OFF',
        title: 'Post-Migration Security Audit',
        subtitle: 'Verificatie na migratie, drift-detectie, opschonen van oude resources en formele security sign-off.',
        description:
          'Na een cloudmigratie blijven vaak tijdelijke migratie-tunnels, dubbele snapshots of te brede permissies achter. Wij voeren een onafhankelijke eindcontrole uit op je nieuwe omgeving, ruimen achtergebleven bron-resources veilig op en leveren een formeel security sign-off rapport.',
        deliverables: [
          'End-to-end security validatie & penetratie-check op de nieuwe productie-omgeving',
          'Terraform/OpenTofu state drift-detectie & opschoning van tijdelijke migratie-accounts',
          'Veilige decommissioning & kosten-afsluiting van oude AWS/legacy cloud-resources',
          'Formeel Post-Migration Security Sign-Off certificaat voor directie & stakeholders',
        ],
        recommendedTier: 'Starter',
        tierRationale:
          'Ideaal als losse afronding binnen Starter ($2,500/mo) of standaard inbegrepen na je migratie in Professional.',
        metrics: [
          { value: '100%', label: 'Legacy spookkosten opgeruimd' },
          { value: '0', label: 'Onbedoelde open migratie-poorten' },
        ],
        tags: ['security'],
      },
      {
        id: 'csm-07',
        code: 'CSM-07',
        badge: '24/7 MANAGED SECOPS',
        title: 'Continuous Cloud Security Management',
        subtitle: '24/7 CSPM, geautomatiseerde patching, threat detection en on-call incident response.',
        description:
          'Cloud security stopt niet na één audit of migratie. Met Continuous Cloud Security Management bewaakt ons senior team jouw cloud-infrastructuur 24/7. We combineren real-time Cloud Security Posture Management (CSPM), geautomatiseerde OS/container-patching en directe incident response.',
        deliverables: [
          '24/7 Cloud Security Posture Management (CSPM) & real-time drift/threat detectie',
          'Geautomatiseerde zero-downtime OS-, Kubernetes- en container CVE-patching',
          'SIEM/SOAR alert-triage met 24/7 on-call senior cloud security engineers',
          'Maandelijkse Executive Security Posture, Compliance & FinOps rapportage',
        ],
        recommendedTier: 'Enterprise',
        tierRationale:
          'Onderdeel van onze Enterprise tier ($10,000/mo) inclusief 24/7 on-call support, 160 engineering-uren en harde SLA-garantie.',
        metrics: [
          { value: '<15 min', label: 'Kritieke incident response SLA' },
          { value: '24/7/365', label: 'Continue CSPM-bewaking' },
        ],
        tags: ['managed', 'security'],
      },
    ],
    faq: {
      eyebrow: 'VEELGESTELDE VRAGEN',
      title: 'CLOUD SECURITY & MIGRATION FAQ',
      subtitle: 'Duidelijkheid over ons abonnementsmodel, zero-downtime garanties en eigenaarschap.',
      items: [
        {
          q: 'Waarom werken jullie zonder losse prijzen per sub-dienst?',
          a: 'Traditionele consultancybureaus verkopen losse audits of migratieprojecten met uurtje-factuurtje en betaalde meerwerk-rondes. Bij OVERSKILLED plug je direct in op onze vaste maandelijkse tiers: Starter ($2,500/mnd), Professional ($5,000/mnd) of Enterprise ($10,000/mnd). Binnen je tier kun je sub-diensten vrij combineren — bijvoorbeeld eerst een Cloud Security Assessment (CSM-01), daarna een AWS → GCP migratie (CSM-04) en tot slot een Post-Migration Audit (CSM-06) — voor één voorspelbaar maandbedrag dat je altijd kunt opzeggen.',
        },
        {
          q: 'Hoe garanderen jullie zero-downtime tijdens een AWS → GCP of AWS → Azure migratie?',
          a: 'Wij bouwen de volledige doelomgeving eerst parallel op via Infrastructure-as-Code (Terraform/OpenTofu). Vervolgens zetten we een versleutelde privé-verbinding en live Change Data Capture (CDC) database-replicatie op tussen AWS en GCP/Azure. Pas wanneer alle integratietests slagen en de data real-time synchroon loopt, verschuiven we het verkeer geleidelijk (canary weighted DNS/load balancing) met een vooraf geteste 1-klik rollback.',
        },
        {
          q: 'Kunnen we ook alleen starten met een Cloud Security Assessment (CSM-01) of Compliance Review (CSM-02)?',
          a: 'Ja, absoluut. Veel klanten starten één maand op de Starter-tier ($2,500/mnd) voor een volledige Cloud Security Assessment (CSM-01), Infrastructure & Compliance Review (CSM-02) of Post-Migration Security Audit (CSM-06). Omdat je maandelijks kunt opzeggen of pauzeren, zit je nergens langdurig aan vast.',
        },
        {
          q: 'Wie blijft eigenaar van de cloud-accounts, Terraform-code en documentatie?',
          a: 'Jij bent en blijft voor 100% eigenaar van alle cloud-accounts (AWS, GCP, Azure), Git-repositories, Terraform/OpenTofu-modules, CI/CD-pipelines en runbooks. Wij werken transparant in jouw eigen repositories volgens least-privilege toegang. Als je je abonnement stopt, draait alles zelfstandig door zonder vendor lock-in.',
        },
      ],
    },
    quoteModal: {
      badge: 'SCOPE INTAKE • GEEN LOSSE OFFERTE-VERRASSINGEN',
      title: 'Request Quote & Cloud Scope Intake',
      subtitle:
        'Selecteer de gewenste sub-dienst(en) en je huidige cloud-omgeving. We koppelen je aanvraag binnen 24 uur aan een concreet stappenplan binnen Starter, Professional of Enterprise.',
      serviceLabel: 'Welke sub-dienst of scope heb je nodig?',
      fullSuiteOption: 'Full Cloud Security & Migration Suite (Meerdere sub-diensten)',
      environmentLabel: 'Huidige / Gewenste Cloud Omgeving',
      environments: [
        { value: 'AWS → GCP Migration', label: 'AWS → Google Cloud (GCP) Migratie' },
        { value: 'AWS → Azure Migration', label: 'AWS → Microsoft Azure Migratie' },
        { value: 'Cloud Native (Single Cloud)', label: 'Bestaande Cloud Beveiligen / Optimaliseren (AWS, GCP of Azure)' },
        { value: 'Multi-Cloud / Hybrid', label: 'Multi-Cloud of Hybride Infrastructuur' },
      ],
      tierLabel: 'Voorkeur Maandelijkse Tier',
      tiers: [
        { value: 'Starter ($2,500/mo)', label: 'Starter — $2,500/mnd (40u • Audits & Compliance)' },
        { value: 'Professional ($5,000/mo)', label: 'Professional — $5,000/mnd (80u • Migraties & Herarchitectuur)' },
        { value: 'Enterprise ($10,000/mo)', label: 'Enterprise — $10,000/mnd (160u • 24/7 CSPM & Multi-Cloud)' },
        { value: 'Advise me on tier', label: 'Adviseer mij tijdens de intake' },
      ],
      nameLabel: 'Jouw naam *',
      namePlaceholder: 'Bijv. Alex de Vries',
      emailLabel: 'Zakelijk e-mailadres *',
      emailPlaceholder: 'alex@bedrijf.nl',
      companyLabel: 'Bedrijfsnaam',
      companyPlaceholder: 'Bedrijf B.V.',
      notesLabel: 'Korte toelichting op je huidige stack & doelen',
      notesPlaceholder: 'Bijv. 12 microservices op AWS EKS + RDS PostgreSQL, doel is migratie naar GKE of SOC2 readiness in Q2...',
      noLoosePriceNote:
        'Geen losse prijzen per sub-dienst: je ontvangt een helder voorstel gekoppeld aan onze vaste maandelijkse tiers (maandelijks opzegbaar).',
      submitBtn: 'Verstuur Scope Intake',
      cancelBtn: 'Annuleren',
      successTitle: 'Scope Intake Ontvangen!',
      successMessage:
        'Bedankt! Een Principal Cloud Architect bekijkt je opgegeven scope en neemt binnen 24 uur contact op met een concreet stappenplan en tier-advies.',
      successSummaryLabel: 'Geregistreerde aanvraag:',
      closeBtn: 'Sluiten',
    },
    pricing: {
      title: 'KIES JOUW VOORSPRONG',
      noHiddenFees: 'Geen verborgen kosten • Alle sub-diensten inzetbaar',
      featuresLabel: 'Inbegrepen',
      cancelAnytime: 'Maandelijks opzegbaar',
      tiers: [
        {
          key: 'Starter',
          label: 'STARTER',
          title: 'Starter',
          description: 'Perfect voor security assessments (CSM-01), compliance reviews (CSM-02) en gerichte projecten.',
          price: '$2,500',
          period: '/mnd',
          features: [
            '1 dedicated senior engineer',
            '40 uur/maand',
            'Cloud Security & Compliance audits (CSM-01/02/06)',
            'E-mail support & wekelijkse standups',
            'Git & Terraform repository toegang',
            'Basis CI/CD & security hardening',
          ],
          cta: 'Kies Starter',
        },
        {
          key: 'Professional',
          label: 'MEEST GEKOZEN',
          labelBg: 'rgba(223, 255, 0, 0.15)',
          title: 'Professional',
          description: 'Voor groeiende teams, AWS → GCP/Azure migraties (CSM-04/05) en FinOps optimalisatie (CSM-03).',
          price: '$5,000',
          period: '/mnd',
          features: [
            '2 dedicated senior engineers',
            '80 uur/maand',
            'Volledige AWS → GCP & AWS → Azure migraties',
            'Priority Slack support & dagelijkse standups',
            'Volledige DevOps & Terraform/OpenTofu setup',
            'Architectuur- & FinOps-reviews (CSM-03)',
            'Wekelijkse voortgangsrapportages',
            'Code- & security quality audits',
          ],
          cta: 'Kies Professional',
          featured: true,
        },
        {
          key: 'Enterprise',
          label: 'ENTERPRISE',
          title: 'Enterprise',
          description: 'Onbeperkte schaal en 24/7 Continuous Cloud Security Management (CSM-07) voor kritieke organisaties.',
          price: '$10,000',
          period: '/mnd',
          features: [
            '4 dedicated senior engineers',
            '160 uur/maand',
            '24/7 CSPM & on-call security support (CSM-07)',
            'Twee-dagelijkse standups',
            'Volledig multi-cloud infrastructuurbeheer',
            'Kwartaal-strategiesessies',
            'Custom SIEM/SOAR & enterprise integraties',
            'Harde SLA-garantie',
            'Dedicated account manager',
          ],
          cta: 'Kies Enterprise',
          dashed: true,
        },
      ],
    },
    socialProof: {
      stat1Label: 'Projecten & Migraties Opgeleverd',
      stat2Label: 'Klanttevredenheid',
      quote:
        '"OVERSKILLED heeft onze volledige AWS-stack zonder één seconde downtime naar GCP gemigreerd én onze maandelijkse cloudkosten met 40% verlaagd. De beste tech-beslissing die we hebben genomen."',
      author: '— Sarah Chen, CTO bij Nexus Labs',
    },
    finalCta: {
      headlineWords: 'Stop met werven. Start met bouwen.'.split(' '),
      subtext:
        'Sluit je aan bij 50+ bedrijven die hun cloud-, security- en dev-overhead vervingen door OVERSKILLED. Eén vast maandbedrag — altijd opzegbaar.',
      cta: 'Start Jouw Abonnement',
    },
    footer: {
      services: 'Diensten',
      pricing: 'Prijzen',
      results: 'Resultaten',
      faq: 'FAQ',
      privacy: 'Privacy',
      terms: 'Voorwaarden',
      copyright: '© 2025 OVERSKILLED. Alle rechten voorbehouden.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      newBadge: 'NEW',
      pricing: 'Pricing',
      results: 'Results',
      cta: 'Request Quote',
      langLabel: 'Language',
    },
    hero: {
      newPillBadge: 'NEW',
      newPillText: 'Cloud Security & Migration Suite (AWS → GCP / Azure)',
      circularText: 'OVERSKILLED • ON DEMAND • ',
      headlineWords: 'Tech expertise without the overhead. Pay monthly, cancel anytime.'.split(' '),
      highlightWords: ['without', 'the', 'overhead.'],
      subtitle:
        'Cloud security, zero-downtime migrations (AWS → GCP/Azure), DevOps, full-stack engineering, and AI — handled by senior engineers. No hiring, no loose project quotes, just results.',
      primaryCta: 'Start Your Subscription',
      secondaryCta: 'Explore Cloud Security & Migration',
    },
    servicesPreview: {
      eyebrow: 'NEW SERVICE SUITE • CLOUD SECURITY & MIGRATION',
      title: 'SECURE, OPTIMIZE & MIGRATE WITH ZERO DOWNTIME',
      subtitle:
        'From deep-dive Cloud Security Assessments and SOC2/NIS2 compliance to complete AWS → GCP and AWS → Azure migrations. No standalone per-service pricing: everything runs seamlessly inside our predictable monthly tiers.',
      viewAllCta: 'Explore full services page',
      quoteCta: 'Request Quote',
      recommendedTierLabel: 'Recommended tier',
      deliverablesLabel: 'Key deliverables',
      requestQuoteBtn: 'Request Quote',
      detailsBtn: 'Details',
    },
    servicesPage: {
      backToHome: 'Back to overview',
      eyebrow: 'ENTERPRISE SUITE • CSM-01 THROUGH CSM-07',
      title: 'CLOUD SECURITY &',
      titleAccent: 'MIGRATION',
      subtitle:
        'End-to-end cloud security hardening, architecture optimization, and zero-downtime migrations from AWS to Google Cloud (GCP) or Microsoft Azure. Executed by dedicated senior cloud architects under one transparent monthly subscription.',
      primaryCta: 'Request Quote / Scope Intake',
      secondaryCta: 'View Tier Mapping',
      stats: [
        { value: '99.99%', label: 'Uptime SLA during cutover' },
        { value: '-38%', label: 'Avg. cloud cost reduction' },
        { value: 'Zero', label: 'Data loss & production downtime' },
        { value: '24/7', label: 'CSPM & continuous guard' },
      ],
      quickJumpLabel: 'QUICK JUMP TO SUB-SERVICE:',
      noLoosePricesBanner: {
        badge: 'TRANSPARENT TIER MODEL',
        title: 'No standalone quotes or unpredictable hourly billing per sub-service',
        description:
          'Every cloud footprint is different. Instead of charging inflated one-off fees per sub-service, we map your scope directly to our existing Starter ($2,500/mo), Professional ($5,000/mo), or Enterprise ($10,000/mo) tiers. Combine multiple sub-services freely and pause or cancel anytime.',
        cta: 'Start Scope Intake',
      },
      filters: {
        all: 'All sub-services (7)',
        security: 'Security & Audits',
        migration: 'Cloud Migration (AWS → GCP/Azure)',
        optimization: 'Architecture & Compliance',
        managed: '24/7 Continuous Guard',
      },
      cardLabels: {
        deliverables: 'CONCRETE DELIVERABLES',
        recommendedTier: 'RECOMMENDED TIER',
        requestQuote: 'Request Quote / Scope Intake',
        viewTierPricing: 'Fits inside',
      },
      protocol: {
        eyebrow: 'EXECUTION METHODOLOGY',
        title: 'THE 4-STAGE ZERO-DOWNTIME PROTOCOL',
        subtitle:
          'Every engagement follows a rigorous engineering protocol ensuring security, compliance, and uptime are never compromised.',
        steps: [
          {
            num: '01',
            phase: 'ASSESS',
            title: 'Deep Audit & Threat Modeling',
            description:
              'We map your entire cloud footprint, IAM permissions, network topology, cost leaks, and compliance gaps (SOC2, ISO27001, NIS2) using automated scanners and manual architectural review.',
            output: 'Output: Prioritized Risk Matrix & Remediation Backlog',
          },
          {
            num: '02',
            phase: 'ARCHITECT',
            title: 'Target Blueprint & IaC Landing Zone',
            description:
              'We engineer the target architecture in Terraform/OpenTofu featuring Zero-Trust network segmentation, KMS encryption, FinOps guardrails, and automated policy-as-code.',
            output: 'Output: Tested Terraform Modules & Cutover Runbook',
          },
          {
            num: '03',
            phase: 'MIGRATE',
            title: 'Zero-Downtime Replication & Cutover',
            description:
              'Phased workload and data migration (EKS → GKE/AKS, RDS → AlloyDB/Cloud SQL/Azure PostgreSQL) with live CDC replication, canary traffic shifting, and instant rollback guarantees.',
            output: 'Output: Production Cutover with zero data loss or downtime',
          },
          {
            num: '04',
            phase: 'AUDIT & CONTINUOUS GUARD',
            title: 'Post-Migration Sign-Off & 24/7 CSPM',
            description:
              'Post-cutover, we decommission legacy AWS resources, eliminate drift, and guard the environment 24/7 with automated patching, SIEM/SOAR triage, and incident response.',
            output: 'Output: Formal Security Sign-Off Report & 24/7 SLA',
          },
        ],
      },
      tierMapping: {
        eyebrow: 'TIER ALIGNMENT',
        title: 'WHICH TIER MATCHES YOUR CLOUD SCOPE?',
        subtitle:
          'No hidden fees or surprise change orders. Pick the velocity and engineering capacity that matches your stage, and scale up or down anytime.',
        includedServicesLabel: 'Best suited for these sub-services:',
        selectTierCta: 'Request Quote with this Tier',
        tiers: [
          {
            key: 'Starter',
            name: 'Starter',
            price: '$2,500',
            period: '/mo',
            tagline: 'For focused security assessments, compliance reviews, and post-migration sign-offs.',
            capacity: '1 dedicated senior cloud engineer • 40 hours/month',
            serviceCodes: ['CSM-01', 'CSM-02', 'CSM-06'],
            highlights: [
              'Full Cloud Security Assessment (CSM-01) delivered in 2–3 weeks',
              'SOC2 / ISO27001 / NIS2 / GDPR gap analysis & remediation roadmap (CSM-02)',
              'Post-Migration Security Audit & legacy resource cleanup (CSM-06)',
              'Weekly standups & direct Git/IaC pull requests',
            ],
          },
          {
            key: 'Professional',
            name: 'Professional',
            price: '$5,000',
            period: '/mo',
            tagline: 'For active cloud re-architecture and full AWS → GCP or AWS → Azure production migrations.',
            capacity: '2 dedicated senior cloud engineers • 80 hours/month',
            featured: true,
            serviceCodes: ['CSM-03', 'CSM-04', 'CSM-05', 'CSM-01', 'CSM-02', 'CSM-06'],
            highlights: [
              'Complete AWS → GCP (CSM-04) or AWS → Azure (CSM-05) production migration',
              'Cloud Architecture Optimization, HA & FinOps cost reduction (CSM-03)',
              'Includes pre-migration security assessment & post-migration sign-off',
              'Daily standups, Priority Slack & zero-downtime cutover execution',
            ],
          },
          {
            key: 'Enterprise',
            name: 'Enterprise',
            price: '$10,000',
            period: '/mo',
            tagline: 'For multi-cloud transformations at scale and 24/7 Continuous Cloud Security Management.',
            capacity: '4 dedicated senior cloud engineers • 160 hours/month',
            serviceCodes: ['CSM-07', 'CSM-01', 'CSM-02', 'CSM-03', 'CSM-04', 'CSM-05', 'CSM-06'],
            highlights: [
              '24/7 Continuous Cloud Security Management, CSPM & on-call (CSM-07)',
              'Parallel multi-region migrations & full infrastructure management',
              'Automated patching, SIEM/SOAR integration & hard SLA guarantee',
              'Dedicated principal cloud architect & quarterly strategy sessions',
            ],
          },
        ],
      },
    },
    planner: {
      eyebrow: 'INTERACTIVE CLOUD PLANNER',
      title: 'ENGINEER YOUR MIGRATION & SECURITY BLUEPRINT',
      subtitle:
        'Explore our source-to-target reference architectures or calculate which monthly tier best fits your cloud workload.',
      tabBlueprint: '1. Cloud Blueprint (Source → Target)',
      tabScope: '2. Scope & Tier Match',
      blueprintColumns: {
        category: 'Layer / Domain',
        source: 'Current Stack (Source)',
        target: 'Target Architecture',
        guardrail: 'Built-in Security Guardrail',
      },
      blueprints: [
        {
          id: 'aws-gcp',
          label: 'AWS → Google Cloud (GCP)',
          badge: 'CSM-04 • Zero-Downtime',
          summary:
            'Full container, database, and IAM transformation from AWS to Google Cloud while maintaining uptime via live CDC replication and hybrid VPN/Interconnect.',
          rows: [
            {
              category: 'Compute & Containers',
              source: 'Amazon EKS / ECS / EC2',
              target: 'GKE Autopilot / Cloud Run',
              guardrail: 'Binary Authorization, Workload Identity & gVisor sandboxing',
            },
            {
              category: 'Databases & Storage',
              source: 'Amazon RDS / Aurora / S3',
              target: 'AlloyDB / Cloud SQL + Cloud Storage',
              guardrail: 'Database Migration Service (CDC), CMEK encryption & VPC Service Controls',
            },
            {
              category: 'Networking & Edge',
              source: 'AWS VPC / ALB / CloudFront',
              target: 'Shared VPC / Cloud Load Balancing / Cloud Armor',
              guardrail: 'WAF DDoS protection, Private Service Connect & Zero-Trust IAP',
            },
            {
              category: 'Identity & Secrets',
              source: 'AWS IAM / Secrets Manager / KMS',
              target: 'Cloud IAM / Secret Manager / Cloud KMS',
              guardrail: 'Least-privilege OIDC federation, zero long-lived service account keys',
            },
          ],
        },
        {
          id: 'aws-azure',
          label: 'AWS → Microsoft Azure',
          badge: 'CSM-05 • Enterprise Landing Zone',
          summary:
            'Seamless transition from AWS to Microsoft Azure aligned with the Cloud Adoption Framework (CAF), including Entra ID federation and automated Bicep/Terraform Landing Zones.',
          rows: [
            {
              category: 'Compute & Containers',
              source: 'Amazon EKS / EC2 / Lambda',
              target: 'Azure Kubernetes Service (AKS) / Container Apps',
              guardrail: 'Defender for Containers, Azure Policy & Managed Identities',
            },
            {
              category: 'Databases & Storage',
              source: 'Amazon RDS / DynamoDB / S3',
              target: 'Azure Database for PostgreSQL / Cosmos DB / Blob',
              guardrail: 'Private Endpoints, Customer-Managed Keys (Key Vault) & TDE',
            },
            {
              category: 'Networking & Edge',
              source: 'AWS VPC / Transit Gateway / Route53',
              target: 'Azure Virtual WAN / Hub-Spoke VNet / Front Door',
              guardrail: 'Azure Firewall Premium, NSG micro-segmentation & DDoS Protection',
            },
            {
              category: 'Identity & Governance',
              source: 'AWS Organizations / IAM',
              target: 'Microsoft Entra ID / Management Groups',
              guardrail: 'Conditional Access, PIM (Just-in-Time) & Defender for Cloud CSPM',
            },
          ],
        },
        {
          id: 'sec-finops',
          label: 'Security, FinOps & Compliance',
          badge: 'CSM-01 • CSM-02 • CSM-03',
          summary:
            'Harden and optimize your existing AWS, GCP, or Azure stack without switching providers: close security gaps, achieve SOC2/NIS2 compliance, and slash monthly cloud spend.',
          rows: [
            {
              category: 'Security Posture',
              source: 'Manual IAM & fragmented security groups',
              target: 'Zero-Trust IAM + Automated CSPM',
              guardrail: 'CIS Benchmark hardening, 100% MFA/SSO & automated drift alerts',
            },
            {
              category: 'Compliance Frameworks',
              source: 'Ad-hoc spreadsheets & manual audit evidence',
              target: 'SOC2 / ISO27001 / NIS2 / GDPR Policy-as-Code',
              guardrail: 'Continuous compliance monitoring with exportable auditor trails',
            },
            {
              category: 'FinOps & Cost Control',
              source: 'Overprovisioned instances & unattached volumes',
              target: 'Autoscaling, Rightsizing & Commitment Plans',
              guardrail: '25%–45% structural cost reduction with automated budget anomaly alerts',
            },
            {
              category: 'Infrastructure-as-Code',
              source: 'Console ClickOps & configuration drift',
              target: '100% Modular Terraform / OpenTofu Pipelines',
              guardrail: 'Pre-commit security scanning (tfsec/Checkov) & GitOps approvals',
            },
          ],
        },
      ],
      scopeLabels: {
        selectScale: 'Select your target scope & scale:',
        recommendedTier: 'Recommended Tier',
        monthlyInvestment: 'Monthly Investment',
        engineeringCapacity: 'Dedicated Capacity',
        estimatedTimeline: 'Typical Timeline',
        expectedImpact: 'Expected Impact / Savings',
        matchedSubServices: 'Matched Sub-Services inside this Tier:',
        ctaButton: 'Open Scope Intake with this selection',
      },
      scopes: [
        {
          id: 'audit',
          label: 'Security Audit & Compliance Readiness',
          subtitle: 'Ideal for deep security posture audits, SOC2/NIS2 readiness, or post-migration verification.',
          recommendedTier: 'Starter',
          price: '$2,500',
          period: '/mo',
          capacity: '1 Senior Cloud Security Engineer (40h/mo)',
          timeline: '2 – 4 weeks to complete audit report & IaC fixes',
          savings: 'Eliminates critical IAM/network exposures & accelerates compliance sign-off by 60%',
          matchedServices: ['CSM-01', 'CSM-02', 'CSM-06'],
          description:
            'Within the Starter tier, we execute a full Cloud Security Assessment or Compliance Review, delivering ready-to-merge Terraform PRs to close critical findings immediately.',
        },
        {
          id: 'migration',
          label: 'Production Cloud Migration & Re-Architecture',
          subtitle: 'Ideal for zero-downtime AWS → GCP or AWS → Azure migrations and FinOps/Terraform modernization.',
          recommendedTier: 'Professional',
          price: '$5,000',
          period: '/mo',
          capacity: '2 Senior Cloud Architects (80h/mo)',
          timeline: '4 – 8 weeks for end-to-end production cutover',
          savings: 'Avg. 38% lower monthly cloud bill + 99.99% uptime during migration',
          matchedServices: ['CSM-03', 'CSM-04', 'CSM-05', 'CSM-01', 'CSM-06'],
          description:
            'Our most popular tier: two senior engineers build your new GCP or Azure Landing Zone in Terraform, configure live database replication, and execute a zero-downtime cutover.',
        },
        {
          id: 'enterprise',
          label: 'Enterprise Multi-Cloud & 24/7 Managed Security',
          subtitle: 'Ideal for mission-critical environments requiring 24/7 CSPM, continuous patching, and full ownership.',
          recommendedTier: 'Enterprise',
          price: '$10,000',
          period: '/mo',
          capacity: '4 Senior Cloud & Security Engineers (160h/mo + 24/7 on-call)',
          timeline: 'Continuous 24/7 coverage + accelerated multi-region rollout',
          savings: 'Replaces a $450k+/yr internal cloud/SecOps team with 15-min SLA response',
          matchedServices: ['CSM-07', 'CSM-01', 'CSM-02', 'CSM-03', 'CSM-04', 'CSM-05', 'CSM-06'],
          description:
            'Complete peace of mind: unlock all 7 sub-services simultaneously, including 24/7 Continuous Cloud Security Management, incident response, and quarterly architecture reviews.',
        },
      ],
    },
    cloudSubServices: [
      {
        id: 'csm-01',
        code: 'CSM-01',
        badge: 'SECURITY AUDIT',
        title: 'Cloud Security Assessment',
        subtitle: 'Deep-dive inspection of IAM, networking, containers, secrets, and data encryption.',
        description:
          'We inspect your entire AWS, GCP, or Azure footprint for misconfigurations, over-privileged IAM roles, public endpoints, unencrypted storage, and vulnerable container images. Instead of a static PDF report, you receive a prioritized remediation roadmap paired with ready-to-merge Infrastructure-as-Code fixes.',
        deliverables: [
          'IAM & Least-Privilege Matrix (roles, service accounts, OIDC federation)',
          'Network, VPC, Firewall & Public Exposure vulnerability assessment',
          'KMS encryption, Secrets Management & Container Image CVE scan',
          'Prioritized Remediation Backlog + production-ready Terraform/OpenTofu fixes',
        ],
        recommendedTier: 'Starter',
        tierRationale:
          'Easily executed within Starter ($2,500/mo) in 2–3 weeks, or as the kick-off phase inside Professional.',
        metrics: [
          { value: '100%', label: 'IAM & Network visibility' },
          { value: '<14 days', label: 'To complete remediation plan' },
        ],
        tags: ['security'],
      },
      {
        id: 'csm-02',
        code: 'CSM-02',
        badge: 'COMPLIANCE & GOVERNANCE',
        title: 'Infrastructure & Compliance Review',
        subtitle: 'Audit-ready infrastructure aligned with SOC 2 Type II, ISO 27001, NIS2, GDPR, and CIS Benchmarks.',
        description:
          'Translate regulatory requirements into enforceable technical controls. We benchmark your cloud infrastructure against CIS, SOC 2, ISO 27001, NIS2, and GDPR standards, deploying automated policy-as-code so your environment stays demonstrably compliant every day.',
        deliverables: [
          'Comprehensive Gap Analysis against SOC 2, ISO 27001, NIS2, GDPR & CIS Benchmarks',
          'Policy-as-Code guardrails (OPA, AWS Config, Azure Policy, or GCP Org Policies)',
          'Centralized Audit Logging, immutable log retention & SIEM integration',
          'Auditor-ready Evidence Pack for external assessors and enterprise buyers',
        ],
        recommendedTier: 'Starter',
        tierRationale:
          'Fits within Starter ($2,500/mo) for single-cloud reviews or Professional ($5,000/mo) for accelerated implementation.',
        metrics: [
          { value: '5+', label: 'Frameworks supported' },
          { value: '-60%', label: 'External audit prep time' },
        ],
        tags: ['optimization'],
      },
      {
        id: 'csm-03',
        code: 'CSM-03',
        badge: 'ARCHITECTURE & FINOPS',
        title: 'Cloud Architecture Optimization',
        subtitle: 'High-Availability redesign, FinOps cost reduction, and 100% Terraform/OpenTofu standardization.',
        description:
          'Eliminate technical debt, fragile ClickOps configurations, and wasted cloud spend. We refactor your stack into a modular, multi-zone High-Availability architecture codified in Terraform or OpenTofu while cutting 25% to 45% off your monthly cloud bill.',
        deliverables: [
          'Modular Terraform / OpenTofu codebase with automated CI/CD deployment pipelines',
          'High-Availability (HA), multi-AZ failover & autoscaling architecture',
          'FinOps Rightsizing, Spot/Committed Use strategy & budget anomaly alerting',
          'Performance tuning across Kubernetes clusters, databases, caching, and CDN layers',
        ],
        recommendedTier: 'Professional',
        tierRationale:
          'Recommended under Professional ($5,000/mo): 2 senior engineers who frequently pay for themselves via FinOps savings.',
        metrics: [
          { value: '-38%', label: 'Avg. monthly cloud spend' },
          { value: '100%', label: 'Infrastructure-as-Code coverage' },
        ],
        tags: ['optimization'],
      },
      {
        id: 'csm-04',
        code: 'CSM-04',
        badge: 'MIGRATION • AWS → GCP',
        title: 'AWS to GCP Migration',
        subtitle: 'Zero-downtime migration from EKS/EC2/RDS/S3 to GKE, AlloyDB/Cloud SQL, and Google Cloud.',
        description:
          'Move production workloads safely and seamlessly from AWS to Google Cloud Platform. We provision a hardened GCP Landing Zone, establish live Change Data Capture (CDC) database replication, and shift traffic in controlled phases with instant rollback protection.',
        deliverables: [
          'GCP Enterprise Landing Zone (Shared VPC, Cloud IAM, Cloud Armor, KMS) in Terraform',
          'Container & compute migration from Amazon EKS/ECS/EC2 to GKE Autopilot or Cloud Run',
          'Zero-downtime database migration from RDS/Aurora to AlloyDB or Cloud SQL via live CDC',
          'Phased Cutover Runbook, canary DNS traffic shifting & rollback validation',
        ],
        recommendedTier: 'Professional',
        tierRationale:
          'Recommended under Professional ($5,000/mo) for dedicated migration execution, or Enterprise ($10,000/mo) for large multi-region fleets.',
        metrics: [
          { value: '99.99%', label: 'Uptime during cutover' },
          { value: '0 bytes', label: 'Data loss with CDC sync' },
        ],
        tags: ['migration'],
      },
      {
        id: 'csm-05',
        code: 'CSM-05',
        badge: 'MIGRATION • AWS → AZURE',
        title: 'AWS to Azure Migration',
        subtitle: 'Enterprise Landing Zones, AKS, Azure Database, and Microsoft Entra ID integration.',
        description:
          'Transition from AWS to Microsoft Azure on an architecture engineered around the Microsoft Cloud Adoption Framework (CAF). We migrate containers to AKS, databases to Azure PostgreSQL/Cosmos DB, and unify identity governance under Microsoft Entra ID and Defender for Cloud.',
        deliverables: [
          'Azure CAF Landing Zone (Hub-Spoke VNet, Management Groups, Azure Policy) in Terraform/Bicep',
          'Workload migration from AWS EKS/EC2/Lambda to AKS and Azure Container Apps',
          'Identity & access integration with Microsoft Entra ID, Conditional Access & Key Vault',
          'Live data synchronization from RDS/S3 to Azure Database & Blob Storage with cutover plan',
        ],
        recommendedTier: 'Professional',
        tierRationale:
          'Recommended under Professional ($5,000/mo) with 2 senior cloud engineers deeply experienced across both AWS and Azure.',
        metrics: [
          { value: 'CAF', label: 'Microsoft standard aligned' },
          { value: 'Zero', label: 'Production interruption' },
        ],
        tags: ['migration'],
      },
      {
        id: 'csm-06',
        code: 'CSM-06',
        badge: 'POST-MIGRATION SIGN-OFF',
        title: 'Post-Migration Security Audit',
        subtitle: 'Post-cutover verification, drift detection, legacy resource cleanup, and formal security sign-off.',
        description:
          'Cloud migrations often leave behind temporary migration tunnels, orphaned snapshots, or overly permissive IAM roles. We perform an independent post-cutover verification of your new environment, safely decommission legacy source resources, and issue a formal security sign-off.',
        deliverables: [
          'End-to-end security validation & penetration check across the new production environment',
          'Terraform/OpenTofu state drift detection & cleanup of temporary migration credentials',
          'Safe decommissioning & cost termination of legacy AWS/source cloud resources',
          'Formal Post-Migration Security Sign-Off certificate for leadership & stakeholders',
        ],
        recommendedTier: 'Starter',
        tierRationale:
          'Ideal as a standalone engagement under Starter ($2,500/mo) or included right after your migration in Professional.',
        metrics: [
          { value: '100%', label: 'Orphaned zombie costs removed' },
          { value: '0', label: 'Leftover migration backdoors' },
        ],
        tags: ['security'],
      },
      {
        id: 'csm-07',
        code: 'CSM-07',
        badge: '24/7 MANAGED SECOPS',
        title: 'Continuous Cloud Security Management',
        subtitle: '24/7 CSPM, automated patching, threat detection, and on-call incident response.',
        description:
          'Cloud security never stops after a single audit or cutover. With Continuous Cloud Security Management, our senior team guards your cloud infrastructure 24/7—combining real-time Cloud Security Posture Management (CSPM), automated OS/container patching, and immediate incident response.',
        deliverables: [
          '24/7 Cloud Security Posture Management (CSPM) & real-time drift/threat detection',
          'Automated zero-downtime OS, Kubernetes, and container CVE patching',
          'SIEM/SOAR alert triage backed by 24/7 on-call senior cloud security engineers',
          'Monthly Executive Security Posture, Compliance & FinOps reporting',
        ],
        recommendedTier: 'Enterprise',
        tierRationale:
          'Included in our Enterprise tier ($10,000/mo) featuring 24/7 on-call support, 160 engineering hours, and a hard SLA guarantee.',
        metrics: [
          { value: '<15 min', label: 'Critical incident response SLA' },
          { value: '24/7/365', label: 'Continuous CSPM guard' },
        ],
        tags: ['managed', 'security'],
      },
    ],
    faq: {
      eyebrow: 'FREQUENTLY ASKED QUESTIONS',
      title: 'CLOUD SECURITY & MIGRATION FAQ',
      subtitle: 'Complete clarity on our subscription tier model, zero-downtime methodology, and ownership.',
      items: [
        {
          q: 'Why don’t you charge standalone prices per sub-service?',
          a: 'Traditional consultancies sell one-off audits or migration projects with unpredictable hourly billing and expensive change orders. At OVERSKILLED, you plug directly into our flat monthly tiers: Starter ($2,500/mo), Professional ($5,000/mo), or Enterprise ($10,000/mo). Within your tier, you can seamlessly chain sub-services—such as starting with a Cloud Security Assessment (CSM-01), moving into an AWS → GCP Migration (CSM-04), and finishing with a Post-Migration Audit (CSM-06)—for one predictable monthly rate you can cancel anytime.',
        },
        {
          q: 'How do you guarantee zero downtime during an AWS → GCP or AWS → Azure migration?',
          a: 'We provision the entire target Landing Zone in parallel using Infrastructure-as-Code (Terraform/OpenTofu). Next, we establish an encrypted private interconnect and live Change Data Capture (CDC) database replication between AWS and GCP/Azure. Only after all integration tests pass and databases are syncing in real time do we shift traffic gradually (canary weighted DNS/load balancing) with a pre-tested 1-click rollback.',
        },
        {
          q: 'Can we subscribe just for a Cloud Security Assessment (CSM-01) or Compliance Review (CSM-02)?',
          a: 'Yes, absolutely. Many clients subscribe for a single month on our Starter tier ($2,500/mo) to complete a thorough Cloud Security Assessment (CSM-01), Infrastructure & Compliance Review (CSM-02), or Post-Migration Security Audit (CSM-06). Because every tier is month-to-month, you can pause or cancel as soon as your audit is signed off.',
        },
        {
          q: 'Who owns the cloud accounts, Terraform code, and architectural documentation?',
          a: 'You retain 100% ownership of all cloud accounts (AWS, GCP, Azure), Git repositories, Terraform/OpenTofu modules, CI/CD pipelines, and runbooks from day one. We work transparently inside your repositories using least-privilege access. If you ever cancel your subscription, your team keeps everything with zero vendor lock-in.',
        },
      ],
    },
    quoteModal: {
      badge: 'SCOPE INTAKE • NO SURPRISE PROJECT QUOTES',
      title: 'Request Quote & Cloud Scope Intake',
      subtitle:
        'Select your desired sub-service(s) and current cloud environment. Within 24 hours, we will map your scope to a concrete execution plan under Starter, Professional, or Enterprise.',
      serviceLabel: 'Which sub-service or scope do you need?',
      fullSuiteOption: 'Full Cloud Security & Migration Suite (Multiple sub-services)',
      environmentLabel: 'Current / Target Cloud Environment',
      environments: [
        { value: 'AWS → GCP Migration', label: 'AWS → Google Cloud (GCP) Migration' },
        { value: 'AWS → Azure Migration', label: 'AWS → Microsoft Azure Migration' },
        { value: 'Cloud Native (Single Cloud)', label: 'Secure / Optimize Existing Cloud (AWS, GCP, or Azure)' },
        { value: 'Multi-Cloud / Hybrid', label: 'Multi-Cloud or Hybrid Infrastructure' },
      ],
      tierLabel: 'Preferred Monthly Tier',
      tiers: [
        { value: 'Starter ($2,500/mo)', label: 'Starter — $2,500/mo (40h • Audits & Compliance)' },
        { value: 'Professional ($5,000/mo)', label: 'Professional — $5,000/mo (80h • Migrations & Re-architecture)' },
        { value: 'Enterprise ($10,000/mo)', label: 'Enterprise — $10,000/mo (160h • 24/7 CSPM & Multi-Cloud)' },
        { value: 'Advise me on tier', label: 'Advise me during intake' },
      ],
      nameLabel: 'Your Name *',
      namePlaceholder: 'e.g. Alex Rivera',
      emailLabel: 'Work Email *',
      emailPlaceholder: 'alex@company.com',
      companyLabel: 'Company Name',
      companyPlaceholder: 'Acme Corp',
      notesLabel: 'Brief notes on your current stack & objectives',
      notesPlaceholder: 'e.g. 12 microservices on AWS EKS + RDS PostgreSQL, looking to migrate to GKE or achieve SOC2 readiness in Q2...',
      noLoosePriceNote:
        'No standalone per-service fees: you will receive a clear execution plan mapped to our flat monthly tiers (cancel anytime).',
      submitBtn: 'Submit Scope Intake',
      cancelBtn: 'Cancel',
      successTitle: 'Scope Intake Received!',
      successMessage:
        'Thank you! A Principal Cloud Architect is reviewing your scope and will reach out within 24 hours with a concrete roadmap and tier recommendation.',
      successSummaryLabel: 'Registered intake summary:',
      closeBtn: 'Close',
    },
    pricing: {
      title: 'CHOOSE YOUR EDGE',
      noHiddenFees: 'No hidden fees • All sub-services available',
      featuresLabel: 'Features',
      cancelAnytime: 'Cancel anytime',
      tiers: [
        {
          key: 'Starter',
          label: 'STARTER',
          title: 'Starter',
          description: 'Perfect for security assessments (CSM-01), compliance reviews (CSM-02), and focused sprints.',
          price: '$2,500',
          period: '/mo',
          features: [
            '1 dedicated senior engineer',
            '40 hours/month',
            'Cloud Security & Compliance audits (CSM-01/02/06)',
            'Email support & weekly standups',
            'Git & Terraform repository access',
            'Basic CI/CD & security hardening',
          ],
          cta: 'Choose Starter',
        },
        {
          key: 'Professional',
          label: 'MOST POPULAR',
          labelBg: 'rgba(223, 255, 0, 0.15)',
          title: 'Professional',
          description: 'For growing teams, AWS → GCP/Azure migrations (CSM-04/05), and FinOps optimization (CSM-03).',
          price: '$5,000',
          period: '/mo',
          features: [
            '2 dedicated senior engineers',
            '80 hours/month',
            'Full AWS → GCP & AWS → Azure migrations',
            'Priority Slack support & daily standups',
            'Full DevOps & Terraform/OpenTofu setup',
            'Architecture & FinOps reviews (CSM-03)',
            'Weekly progress reports',
            'Code & security quality audits',
          ],
          cta: 'Choose Professional',
          featured: true,
        },
        {
          key: 'Enterprise',
          label: 'ENTERPRISE',
          title: 'Enterprise',
          description: 'Unlimited scale and 24/7 Continuous Cloud Security Management (CSM-07) for mission-critical teams.',
          price: '$10,000',
          period: '/mo',
          features: [
            '4 dedicated senior engineers',
            '160 hours/month',
            '24/7 CSPM & on-call security support (CSM-07)',
            'Twice-daily standups',
            'Full multi-cloud infrastructure management',
            'Quarterly strategy sessions',
            'Custom SIEM/SOAR & enterprise integrations',
            'SLA guarantee',
            'Dedicated account manager',
          ],
          cta: 'Choose Enterprise',
          dashed: true,
        },
      ],
    },
    socialProof: {
      stat1Label: 'Projects & Migrations Delivered',
      stat2Label: 'Client Satisfaction',
      quote:
        '"OVERSKILLED migrated our entire AWS stack to GCP with zero downtime and cut our monthly cloud spend by 40%. The best tech decision we\'ve made."',
      author: '— Sarah Chen, CTO at Nexus Labs',
    },
    finalCta: {
      headlineWords: 'Stop hiring. Start building.'.split(' '),
      subtext:
        'Join 50+ companies that replaced their cloud, security, and dev overhead with OVERSKILLED. One predictable monthly rate — cancel anytime.',
      cta: 'Start Your Subscription',
    },
    footer: {
      services: 'Services',
      pricing: 'Pricing',
      results: 'Results',
      faq: 'FAQ',
      privacy: 'Privacy',
      terms: 'Terms',
      copyright: '© 2025 OVERSKILLED. All rights reserved.',
    },
  },
}

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const STORAGE_KEY = 'overskilled_lang'

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'nl' || saved === 'en') {
        return saved
      }
    } catch {
      // ignore storage errors
    }
    return 'nl'
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = (nextLang: Language) => {
    setLangState(nextLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
