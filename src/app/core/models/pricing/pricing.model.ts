export interface PricingPlan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly priceLabel: string;
  readonly priceNote: string;
  readonly features: readonly string[];
  readonly ctaLabel: string;
  readonly badge?: string;
  readonly featured?: boolean;
  readonly ctaStyle: 'outline' | 'inverse';
}
