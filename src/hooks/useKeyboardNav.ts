'use client';

import { useEffect, type RefObject } from 'react';

interface UseKeyboardNavOptions {
  enabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function useKeyboardNav(
  ref: RefObject<HTMLElement | null>,
  { enabled, onPrevious, onNext, hasPrevious, hasNext }: UseKeyboardNavOptions,
): void {
  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      event.preventDefault();
      if (event.key === 'ArrowLeft' && hasPrevious) onPrevious();
      if (event.key === 'ArrowRight' && hasNext) onNext();
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [ref, enabled, onPrevious, onNext, hasPrevious, hasNext]);
}
