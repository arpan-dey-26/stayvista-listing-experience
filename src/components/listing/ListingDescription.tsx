'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

export function ListingDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p className="description__body" id="listing-description">{description}</p>
      <button
        type="button"
        className="description__more"
        aria-expanded={expanded}
        aria-controls="listing-description"
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? 'Show less' : 'Show more'}
        <Icon name={expanded ? 'chevron-left' : 'chevron-right'} size={14} />
      </button>
    </>
  );
}
