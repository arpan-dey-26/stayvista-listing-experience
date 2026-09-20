'use client';

import { PageShell } from './PageShell';
import { Rating } from '@/components/ui/Rating';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { formatCurrency } from '@/lib/format';

const REVEAL_THRESHOLD = 640;
interface SectionNavProps { totalMinor: number; currency: string; nights: number; rating: number; reviewCount: number; }
const LINKS = [{ href: '#photos', label: 'Photos' }, { href: '#amenities', label: 'Amenities' }, { href: '#reviews', label: 'Reviews' }, { href: '#location', label: 'Location' }] as const;

export function SectionNav({ totalMinor, currency, nights, rating, reviewCount }: SectionNavProps) {
  const revealed = useScrollThreshold(REVEAL_THRESHOLD);
  return <div className="section-nav" data-revealed={revealed} aria-hidden={!revealed} inert={!revealed}>
    <PageShell as="nav" label="Listing sections" className="section-nav__inner">
      <ul className="section-nav__links">{LINKS.map((link) => <li key={link.href}><a href={link.href} className="section-nav__link">{link.label}</a></li>)}</ul>
      <div className="section-nav__summary"><div className="stack"><span>{formatCurrency(totalMinor, currency)} for {nights} nights</span><Rating value={rating} reviewCount={reviewCount} /></div><button type="button" className="booking-card__cta booking-card__cta--inline">Reserve</button></div>
    </PageShell>
  </div>;
}