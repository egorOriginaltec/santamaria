import type { PricingPlan } from '../../models/pricing/pricing.model';

export const PRICING_TITLE = 'Elige cómo quieres pagar';

export const PRICING_INTRO =
  '16 semanas · 320 horas · 20 plazas · Turno mañana 09–13 o tarde 16–20 (10 plazas cada uno).';

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Pago mensual',
    description: 'Ideal si prefieres fraccionar la inversión en cuotas cómodas.',
    priceLabel: '375 €',
    priceNote: '/ mes',
    features: [
      '4 cuotas de 375 €',
      'Total 1.500 €',
      '16 semanas · 320 horas',
      'Turno mañana o tarde',
      'Inicio 1 de diciembre',
    ],
    ctaLabel: 'Inscribirme',
    ctaStyle: 'outline',
  },
  {
    id: 'upfront',
    name: 'Pago único',
    description: 'Paga de una vez y ahorra frente al plan mensual.',
    priceLabel: '1.350 €',
    priceNote: 'una vez',
    features: [
      'Ahorras 150 €',
      'Un solo pago',
      '16 semanas · 320 horas',
      'Turno mañana o tarde',
      'Inicio 1 de diciembre',
    ],
    ctaLabel: 'Inscribirme',
    badge: 'Más popular',
    featured: true,
    ctaStyle: 'inverse',
  },
] as const;

export const PRICING_CTA_PATH = '/acceso';
