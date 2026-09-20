'use client';

import { Icon } from '@/components/ui/Icon';

interface LightboxControlsProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function LightboxControls({ hasPrevious, hasNext, onPrevious, onNext }: LightboxControlsProps) {
  return (
    <>
      <button type="button" className="icon-button lightbox__nav lightbox__nav--previous" aria-label="Previous photo" disabled={!hasPrevious} onClick={onPrevious}>
        <Icon name="chevron-left" size={16} />
      </button>
      <button type="button" className="icon-button lightbox__nav lightbox__nav--next" aria-label="Next photo" disabled={!hasNext} onClick={onNext}>
        <Icon name="chevron-right" size={16} />
      </button>
    </>
  );
}
