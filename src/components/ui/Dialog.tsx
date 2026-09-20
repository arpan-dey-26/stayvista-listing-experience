'use client';

import { useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { useScrollLock } from '@/hooks/useScrollLock';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  returnFocusTo?: HTMLElement | null;
}

export function Dialog({ open, onClose, title, children, returnFocusTo }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      (returnFocusTo ?? previous)?.focus?.();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;

  return (
    <div className="dialog" role="presentation">
      <div className="dialog__backdrop" onClick={onClose} />
      <div ref={panelRef} className="dialog__panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1}>
        <header className="dialog__header">
          <h2 id="dialog-title">{title}</h2>
          <button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </header>
        <div className="dialog__body">{children}</div>
      </div>
    </div>
  );
}
