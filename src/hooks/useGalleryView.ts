'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

const clamp = (index: number, total: number) =>
  Math.min(Math.max(index, 0), Math.max(total - 1, 0));

export type GalleryView =
  | { kind: 'closed' }
  | { kind: 'tour' }
  | { kind: 'lightbox'; photoIndex: number };

export interface GalleryController {
  view: GalleryView;
  openTour: (trigger?: HTMLElement | null) => void;
  openLightbox: (photoIndex: number, trigger?: HTMLElement | null) => void;
  stepPhoto: (delta: number) => void;
  close: () => void;
  tourTrigger: React.RefObject<HTMLElement | null>;
  lightboxTrigger: React.RefObject<HTMLElement | null>;
}

export function useGalleryView(totalPhotos: number): GalleryController {
  const [view, setView] = useState<GalleryView>({ kind: 'closed' });
  const tourTrigger = useRef<HTMLElement | null>(null);
  const lightboxTrigger = useRef<HTMLElement | null>(null);

  const openTour = useCallback((trigger?: HTMLElement | null) => {
    if (trigger) tourTrigger.current = trigger;
    setView({ kind: 'tour' });
  }, []);

  const openLightbox = useCallback((photoIndex: number, trigger?: HTMLElement | null) => {
    if (trigger) {
      lightboxTrigger.current = trigger;
      if (!trigger.closest('.tour')) tourTrigger.current = trigger;
    }
    setView({ kind: 'lightbox', photoIndex: clamp(photoIndex, totalPhotos) });
  }, [totalPhotos]);

  const stepPhoto = useCallback(
    (delta: number) => {
      setView((current) =>
        current.kind === 'lightbox'
          ? { kind: 'lightbox', photoIndex: clamp(current.photoIndex + delta, totalPhotos) }
          : current,
      );
    },
    [totalPhotos],
  );

  const close = useCallback(() => {
    setView((current) =>
      current.kind === 'lightbox' ? { kind: 'tour' } : { kind: 'closed' },
    );
  }, []);

  return useMemo(
    () => ({ view, openTour, openLightbox, stepPhoto, close, tourTrigger, lightboxTrigger }),
    [view, openTour, openLightbox, stepPhoto, close],
  );
}
