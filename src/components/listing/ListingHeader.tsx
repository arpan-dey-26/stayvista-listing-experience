import { ShareSaveActions } from './ShareSaveActions';

export function ListingHeader({ title }: { title: string }) {
  return (
    <div className="listing-header">
      <h1 className="listing-header__title">{title}</h1>
      <div className="listing-header__actions">
        <ShareSaveActions title={title} />
      </div>
    </div>
  );
}
