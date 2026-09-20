import { cn } from '@/lib/cn';

interface SectionProps { id?: string; heading?: string; headingHidden?: boolean; ruled?: boolean; wide?: boolean; className?: string; children: React.ReactNode; }

export function Section({ id, heading, headingHidden = false, ruled = false, wide = false, className, children }: SectionProps) {
  const headingId = heading && id ? id + '-heading' : undefined;
  return <section id={id} aria-labelledby={headingId} className={cn('section', ruled && 'section--ruled', wide && 'section--wide', className)}>
    {heading ? <h2 id={headingId} className={cn('section__heading', headingHidden && 'visually-hidden')}>{heading}</h2> : null}{children}
  </section>;
}