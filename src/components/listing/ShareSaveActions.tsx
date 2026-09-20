'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface ShareSaveActionsProps {
  title: string;
  variant?: 'text' | 'icon';
}

export function ShareSaveActions({ title, variant = 'text' }: ShareSaveActionsProps) {
  const [saved, setSaved] = useState(false);
  const compact = variant === 'icon';
  const className = compact ? 'icon-button' : 'text-action';

  return (
    <>
      <button type="button" className={className} aria-label={`Share ${title}`}>
        <Icon name="share" size={16} />{compact ? null : 'Share'}
      </button>
      <button type="button" className={className} aria-pressed={saved} aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`} onClick={() => setSaved((current) => !current)}>
        <Icon name="heart" size={16} filled={saved} />{compact ? null : 'Save'}
      </button>
    </>
  );
}
