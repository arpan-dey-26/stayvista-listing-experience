'use client';

import { useRef, useState } from 'react';
import type { AmenityGroup } from '@/lib/types';
import { Dialog } from '@/components/ui/Dialog';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

interface AmenitiesProps {
  groups: AmenityGroup[];
  totalCount: number;
}

export function Amenities({ groups, totalCount }: AmenitiesProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const featured = groups[0]?.items ?? [];
  const populated = groups.filter((group) => group.items.length > 0);

  return (
    <>
      <ul className="amenities__grid">
        {featured.map((amenity) => (
          <li key={amenity.id} className={cn('amenity', amenity.unavailable && 'amenity--unavailable')}>
            <Icon name={amenity.icon} />
            <span>{amenity.label}</span>
          </li>
        ))}
      </ul>
      <p>
        <button ref={triggerRef} type="button" className="pill-button" onClick={() => setOpen(true)}>
          Show all {totalCount} amenities
        </button>
      </p>
      <Dialog open={open} onClose={() => setOpen(false)} title="What this place offers" returnFocusTo={triggerRef.current}>
        {populated.map((group) => (
          <section key={group.id} className="dialog__group">
            <h3 className="dialog__group-title">{group.title}</h3>
            <ul className="dialog__list">
              {group.items.map((amenity) => (
                <li key={amenity.id} className={cn(amenity.unavailable && 'amenity--unavailable')}>
                  <Icon name={amenity.icon} />
                  <span>{amenity.label}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Dialog>
    </>
  );
}
