import type { LocationInfo } from '@/lib/types';

export function LocationSection({ location }: { location: LocationInfo }) {
  return (
    <>
      <div className="location__map" role="img" aria-label={`Map of ${location.label}`}>
        Map — {location.label}
      </div>
      <div className="stack">
        <span className="highlight__title">{location.label}</span>
        <p className="highlight__description">
          Exact location will be provided after booking.
        </p>
        {location.description ? <p className="review__body">{location.description}</p> : null}
      </div>
    </>
  );
}
