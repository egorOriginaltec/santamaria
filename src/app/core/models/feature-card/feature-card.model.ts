export type FeatureIcon = 'cap' | 'doc' | 'book' | 'screen';

export interface FeatureCard {
  readonly title: string;
  readonly text: string;
  readonly icon: FeatureIcon;
}
