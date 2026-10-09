import type { SocialLink } from '../../models/social-link/social-link.model';

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
] as const;
