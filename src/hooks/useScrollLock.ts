'use client';

import { useEffect } from 'react';

let holders = 0;
let restoreTo = 0;

export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    if (holders === 0) {
      restoreTo = window.scrollY;
      document.body.dataset.scrollLocked = 'true';
    }
    holders += 1;

    return () => {
      holders -= 1;
      if (holders === 0) {
        delete document.body.dataset.scrollLocked;
        window.scrollTo(0, restoreTo);
      }
    };
  }, [locked]);
}
