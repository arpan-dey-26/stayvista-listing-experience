'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import type { Photo, PhotoCategory } from '@/lib/types';
import { Icon } from '@/components/ui/Icon';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { useScrollLock } from '@/hooks/useScrollLock';
import { LightboxControls } from './LightboxControls';

interface LightboxProps {
  open: boolean;
  photoIndex: number;
  photos: Photo[];
  categories: PhotoCategory[];
  onClose: () => void;
  onStep: (delta: number) => void;
  returnFocusTo?: HTMLElement | null;
}

export function Lightbox({ open, photoIndex, photos, categories, onClose, onStep, returnFocusTo }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  const photo = photos[photoIndex];
  const category = useMemo(() => categories.find((item) => item.id === photo?.categoryId), [categories, photo?.categoryId]);

  useKeyboardNav(panelRef, {
    enabled: open,
    onPrevious: () => onStep(-1),
    onNext: () => onStep(1),
    hasPrevious: photoIndex > 0,
    hasNext: photoIndex < photos.length - 1,
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => (returnFocusTo ?? previous)?.focus?.();
  }, [open, returnFocusTo]);

  if (!open || !photo) return null;

  return (
    <div className="lightbox" role="presentation">
      <div className="lightbox__backdrop" />
      <div ref={panelRef} className="lightbox__panel" role="dialog" aria-modal="true" aria-label={photo.alt} tabIndex={-1}>
        <button type="button" className="icon-button lightbox__close" aria-label="Close photo viewer" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
        <LightboxControls hasPrevious={photoIndex > 0} hasNext={photoIndex < photos.length - 1} onPrevious={() => onStep(-1)} onNext={() => onStep(1)} />
        <figure className="lightbox__figure">
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="min(90vw, 1100px)" className="lightbox__image" priority />
          <figcaption className="lightbox__caption">
            <span>{category?.name}</span>
            <span>{photoIndex + 1} / {photos.length}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
