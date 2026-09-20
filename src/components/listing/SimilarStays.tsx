'use client';

import { useRef, useState } from 'react';
import type { SimilarStay } from '@/lib/types';
import { Icon } from '@/components/ui/Icon';
import { Rating } from '@/components/ui/Rating';
import { formatCurrency } from '@/lib/format';

export function SimilarStays({ stays, currency }: { stays: SimilarStay[]; currency: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const perPage = 4;
  const pageCount = Math.ceil(stays.length / perPage);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(next, pageCount - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    setPage(clamped);
  };

  return (
    <section id="similar" aria-labelledby="similar-heading" className="section section--ruled section--wide">
      <div className="section__header">
        <h2 id="similar-heading" className="section__heading">More stays nearby</h2>
        <div className="similar__controls">
          <span aria-live="polite"><span className="visually-hidden">Page </span>{page + 1} / {pageCount}</span>
          <button type="button" className="icon-button" aria-label="Previous stays" disabled={page === 0} onClick={() => goTo(page - 1)}><Icon name="chevron-left" size={16} /></button>
          <button type="button" className="icon-button" aria-label="Next stays" disabled={page >= pageCount - 1} onClick={() => goTo(page + 1)}><Icon name="chevron-right" size={16} /></button>
        </div>
      </div>
      <ul className="similar__track" ref={trackRef}>
        {stays.map((stay) => (
          <li key={stay.id} className="stack">
            <div className="similar__card-media" aria-hidden="true" />
            <span className="highlight__title">{stay.title}</span>
            <span className="highlight__description">{formatCurrency(stay.priceMinor, currency)}</span>
            <Rating value={stay.rating} />
          </li>
        ))}
      </ul>
    </section>
  );
}
