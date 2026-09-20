import type { Listing } from '@/lib/types';
import { Rating } from '@/components/ui/Rating';
import { ReviewCard } from './ReviewCard';

const BREAKDOWN_LABELS: Array<[keyof Listing['ratingBreakdown'], string]> = [
  ['cleanliness', 'Cleanliness'], ['accuracy', 'Accuracy'], ['checkIn', 'Check-in'],
  ['communication', 'Communication'], ['location', 'Location'], ['value', 'Value'],
];

export function Reviews({ listing }: { listing: Listing }) {
  return (
    <>
      <div className="reviews__summary"><Rating value={listing.rating} reviewCount={listing.reviewCount} /></div>
      <ul className="reviews__breakdown">
        {BREAKDOWN_LABELS.map(([key, label]) => (
          <li key={key} className="reviews__breakdown-row"><span>{label}</span><span>{listing.ratingBreakdown[key].toFixed(1)}</span></li>
        ))}
      </ul>
      <ul className="reviews__tags" aria-label="What guests mentioned">
        {listing.reviewTags.map((tag) => (
          <li key={tag.id}>
            <button type="button" className="review-tag"><span>{tag.label}</span><span aria-hidden="true">{tag.count}</span><span className="visually-hidden">mentioned in {tag.count} reviews</span></button>
          </li>
        ))}
      </ul>
      <ul className="reviews__grid">
        {listing.reviews.map((review) => <li key={review.id}><ReviewCard review={review} /></li>)}
      </ul>
      <p><button type="button" className="pill-button">Show all {listing.reviewCount} reviews</button></p>
    </>
  );
}
