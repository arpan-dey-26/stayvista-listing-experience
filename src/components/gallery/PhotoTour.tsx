'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Photo, PhotoCategory } from '@/lib/types';
import { Icon } from '@/components/ui/Icon';
import { useScrollLock } from '@/hooks/useScrollLock';
import { PhotoCategoryBlock } from './PhotoCategoryBlock';
import { PhotoTourNav } from './PhotoTourNav';

interface PhotoTourProps {
  open: boolean;
  active: boolean;
  onClose: () => void;
  onSelectPhoto: (photoIndex: number, trigger?: HTMLElement | null) => void;
  photos: Photo[];
  categories: PhotoCategory[];
  listingTitle: string;
  returnFocusTo?: HTMLElement | null;
}

export function PhotoTour({ open, active, onClose, onSelectPhoto, photos, categories, listingTitle, returnFocusTo }: PhotoTourProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  const registerSection = useCallback((id: string, node: HTMLElement | null) => {
    sectionRefs.current[id] = node;
  }, []);

  const grouped = useMemo(() => categories.map((category) => ({
    category,
    photos: category.photoIds.map((id) => photos.find((photo) => photo.id === id)).filter((photo): photo is Photo => Boolean(photo)),
  })), [categories, photos]);

  const offsets = useMemo(() => {
    let offset = 0;
    return grouped.map((group) => {
      const value = offset;
      offset += group.photos.length;
      return { id: group.category.id, startIndex: value };
    });
  }, [grouped]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !active) return;
    const nodes = Object.entries(sectionRefs.current);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id.startsWith('tour-')) setActiveCategory(visible.target.id.replace('tour-', ''));
    }, { root: panelRef.current, threshold: [0.2, 0.5, 0.8] });
    nodes.forEach(([, node]) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [open, active]);

  const scrollToCategory = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveCategory(id);
  };

  if (!open) return null;

  return (
    <div className={`tour${active ? '' : ' tour--underlay'}`} role="presentation">
      <div className="tour__backdrop" />
      <div ref={panelRef} className="tour__panel" role="dialog" aria-modal={active ? 'true' : 'false'} aria-label={`Photo tour for ${listingTitle}`} tabIndex={-1}>
        <header className="tour__header">
          <strong>{listingTitle}</strong>
          <PhotoTourNav categories={categories} activeCategory={activeCategory} onSelect={scrollToCategory} />
          <button type="button" className="icon-button" aria-label="Close photo tour" onClick={onClose}><Icon name="close" size={20} /></button>
        </header>
        <div className="tour__content">
          {grouped.map(({ category, photos: categoryPhotos }, index) => {
            const offset = offsets[index];
            if (!offset) return null;
            return <PhotoCategoryBlock key={category.id} category={category} photos={categoryPhotos} startIndex={offset.startIndex} totalPhotos={photos.length} headingId={`tour-${category.id}-heading`} onSelectPhoto={onSelectPhoto} registerSection={registerSection} />;
          })}
        </div>
      </div>
    </div>
  );
}
