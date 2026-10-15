export type LegalSlug = 'terminos' | 'privacidad' | 'cookies';

export interface LegalSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export interface LegalDocument {
  readonly slug: LegalSlug;
  readonly path: string;
  readonly kicker: string;
  readonly title: string;
  readonly marker: string;
  readonly updatedOn: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
}

