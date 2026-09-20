import { Icon } from '@/components/ui/Icon';

export function PromoStrip() {
  return (
    <div className="promo">
      <Icon name="star" size={32} />
      <div className="promo__body stack">
        <span className="highlight__title">Get 10% off your next stay.</span>
        <a href="#main" className="highlight__description">
          Terms apply
        </a>
      </div>
      <button type="button" className="text-action">
        Claim
      </button>
    </div>
  );
}
