import type { Listing } from '@/lib/types';
import { BookingCard } from './BookingCard';
import { PromoStrip } from './PromoStrip';

export function BookingRail({ listing }: { listing: Listing }) {
  return (
    <aside className="booking-rail" aria-label="Reserve this stay">
      <PromoStrip />
      <BookingCard listing={listing} />
    </aside>
  );
}