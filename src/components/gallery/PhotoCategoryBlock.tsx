'use client';

import Image from 'next/image';
import type { Photo, PhotoCategory } from '@/lib/types';

const FULL_SIZE = '458px';
const HALF_SIZE = '223px';

interface PlacedPhoto { photo: Photo; index: number; }
interface PhotoRow { id: string; items: PlacedPhoto[]; }

function toRows(photos: Photo[], startIndex: number): PhotoRow[] {
  const rows: PhotoRow[] = [];
  for (let offset = 0; offset < photos.length;) {
    const photo = photos[offset];
    if (!photo) break;
    const next = photos[offset + 1];
    const first = { photo, index: startIndex + offset };
    if (photo.span === 'half' && next?.span === 'half') {
      rows.push({ id: photo.id, items: [first, { photo: next, index: startIndex + offset + 1 }] });
      offset += 2;
    } else {
      rows.push({ id: photo.id, items: [first] });
      offset += 1;
    }
  }
  return rows;
}

interface PhotoCategoryBlockProps {
  category: PhotoCategory;
  photos: Photo[];
  startIndex: number;
  totalPhotos: number;
  headingId: string;
  onSelectPhoto: (index: number, trigger: HTMLElement) => void;
  registerSection: (categoryId: string, node: HTMLElement | null) => void;
}

export function PhotoCategoryBlock({ category, photos, startIndex, totalPhotos, headingId, onSelectPhoto, registerSection }: PhotoCategoryBlockProps) {
  const rows = toRows(photos, startIndex);
  return (
    <section className="tour__category" id={`tour-${category.id}`} aria-labelledby={headingId} ref={(node) => registerSection(category.id, node)}>
      <div className="tour__rail">
        <h3 id={headingId} className="tour__category-name">{category.name}</h3>
        {category.features.length > 0 && <ul className="tour__features">{category.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
      </div>
      <div className="tour__photos">
        {rows.map((row) => (
          <div key={row.id} className={`tour__row${row.items.length === 2 ? ' tour__row--pair' : ''}`}>
            {row.items.map(({ photo, index }) => (
              <button key={photo.id} type="button" className="tour__photo" aria-label={`Open photo ${index + 1} of ${totalPhotos}: ${photo.alt}`} onClick={(event) => onSelectPhoto(index, event.currentTarget)}>
                <Image src={photo.src} alt="" width={photo.width} height={photo.height} sizes={photo.span === 'full' ? FULL_SIZE : HALF_SIZE} className="tour__image" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
