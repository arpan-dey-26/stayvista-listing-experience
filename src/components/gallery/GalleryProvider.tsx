'use client';

import { createContext, useContext } from 'react';
import { useGalleryView, type GalleryController } from '@/hooks/useGalleryView';
import { Lightbox } from './Lightbox';
import { PhotoTour } from './PhotoTour';
import type { Photo, PhotoCategory } from '@/lib/types';

const GalleryContext = createContext<GalleryController | null>(null);

interface GalleryProviderProps {
  photos: Photo[];
  categories: PhotoCategory[];
  listingTitle: string;
  children: React.ReactNode;
}

export function GalleryProvider({ photos, categories, listingTitle, children }: GalleryProviderProps) {
  const controller = useGalleryView(photos.length);
  const { view, close, openLightbox, stepPhoto, tourTrigger, lightboxTrigger } = controller;
  const tourVisible = view.kind !== 'closed';
  const lightboxOpen = view.kind === 'lightbox';

  return (
    <GalleryContext.Provider value={controller}>
      {children}
      <PhotoTour open={tourVisible} active={!lightboxOpen} onClose={close} onSelectPhoto={openLightbox} photos={photos} categories={categories} listingTitle={listingTitle} returnFocusTo={tourTrigger.current} />
      <Lightbox open={lightboxOpen} photoIndex={lightboxOpen ? view.photoIndex : 0} photos={photos} categories={categories} onClose={close} onStep={stepPhoto} returnFocusTo={lightboxTrigger.current} />
    </GalleryContext.Provider>
  );
}

export function useGallery(): GalleryController {
  const controller = useContext(GalleryContext);
  if (!controller) throw new Error('useGallery must be used inside <GalleryProvider>');
  return controller;
}
