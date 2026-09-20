import { Icon } from './Icon';
import { formatRating } from '@/lib/format';

interface RatingProps {
  value: number;
  reviewCount?: number;
  showIcon?: boolean;
}

export function Rating({ value, reviewCount, showIcon = true }: RatingProps) {
  const label = reviewCount
    ? `Rated ${formatRating(value)} out of 5 from ${reviewCount} reviews`
    : `Rated ${formatRating(value)} out of 5`;

  return (
    <span className="rating">
      <span className="visually-hidden">{label}</span>
      <span aria-hidden="true" className="rating__visual">
        {showIcon ? <Icon name="star" size={14} filled /> : null}
        {formatRating(value)}
        {reviewCount ? ` · ${reviewCount} reviews` : null}
      </span>
    </span>
  );
}
