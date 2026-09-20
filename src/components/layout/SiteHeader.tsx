'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { PageShell } from './PageShell';

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="site-header">
      <PageShell variant="header" className="site-header__inner">
        <a href="#main" className="site-header__logo" aria-label="StayVista home">StayVista</a>
        <nav className="site-header__nav" aria-label="Primary">
          <a href="#photos">Photos</a>
          <a href="#amenities">Amenities</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <div className="site-header__actions">
          <button type="button" className="icon-button" aria-label="Search" onClick={() => setSearchOpen((value) => !value)}>
            <Icon name="search" size={18} />
          </button>
          <button type="button" className="icon-button" aria-label="Menu"><Icon name="menu" size={18} /></button>
        </div>
      </PageShell>
      {searchOpen ? <div className="site-header__search"><input aria-label="Search" placeholder="Search stays" autoFocus /></div> : null}
    </header>
  );
}
