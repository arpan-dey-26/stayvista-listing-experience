import type { SleepingArrangement } from '@/lib/types';

/** MEASURED: cards 318 wide, image 212 tall, 16px gap. */
export function SleepingArrangements({ items }: { items: SleepingArrangement[] }) {
  return (
    <ul className="sleeping">
      {items.map((item) => (
        <li key={item.id} className="sleeping__card">
          <div className="sleeping__image" aria-hidden="true" />
          <span className="highlight__title">{item.room}</span>
          <span className="highlight__description">{item.detail}</span>
        </li>
      ))}
    </ul>
  );
}