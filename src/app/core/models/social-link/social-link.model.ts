export type SocialIcon = 'instagram' | 'tiktok' | 'youtube';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}
