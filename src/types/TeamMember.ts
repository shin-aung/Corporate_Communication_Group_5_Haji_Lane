export type LinkType = 'achievement' | 'project' | 'portfolio' | 'social' | 'other';

export interface SocialLink {
  label: string;
  url: string;
  type: LinkType;
}

export interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  /** Professional/card photo. If undefined, a styled initials placeholder is shown. */
  image?: string;
  /** Full-page About Me poster image shown at the bottom of the profile modal. */
  aboutImage?: string;
  from: string;
  flag: string;
  color: string;
  accentColor: string;
  education: string[];
  role: string;
  about?: string;
  strengths: string[];
  interests: string[];
  values?: string[];
  goals?: string[];
  tools?: string[];
  links: SocialLink[];
  qrCodeSrc?: string;
  isPending?: boolean;
}
