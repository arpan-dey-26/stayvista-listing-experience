'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  ['overview', 'Overview'],
  ['photos', 'Photos'],
  ['amenities', 'Amenities'],
  ['reviews', 'Reviews'],
  ['location', 'Location'],
];

export function SectionNav() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-20% 0px -70% 0px' },
    );
    SECTIONS.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-nav" aria-label="Listing sections">
      {SECTIONS.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>{label}</a>
      ))}
    </nav>
  );
}
