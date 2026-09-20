'use client';

import type { PhotoCategory } from '@/lib/types';

interface PhotoTourNavProps {
  categories: PhotoCategory[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function PhotoTourNav({ categories, activeCategory, onSelect }: PhotoTourNavProps) {
  return (
    <nav className="tour__nav" aria-label="Photo categories">
      {categories.map((category) => (
        <button key={category.id} type="button" className={category.id === activeCategory ? 'is-active' : ''} aria-current={category.id === activeCategory ? 'true' : undefined} onClick={() => onSelect(category.id)}>
          {category.name}
        </button>
      ))}
    </nav>
  );
}
