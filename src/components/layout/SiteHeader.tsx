import { PageShell } from './PageShell';
import { Icon } from '@/components/ui/Icon';

export function SiteHeader() {
  return <header className="site-header"><PageShell variant="header" className="site-header__inner">
    <a href="#main" className="site-header__brand" aria-label="StayVista home"><Icon name="heart" size={32} filled /><span className="visually-hidden">StayVista</span></a>
    <nav className="site-header__search" aria-label="Search"><button type="button" className="text-action">Anywhere</button><button type="button" className="text-action">Anytime</button><button type="button" className="text-action">Add guests</button><button type="button" className="icon-button" aria-label="Search"><Icon name="search" size={16} /></button></nav>
    <nav className="site-header__actions" aria-label="Account"><a href="#main" className="text-action">Become a host</a><button type="button" className="icon-button" aria-label="Choose a language and currency"><Icon name="globe" size={16} /></button><button type="button" className="icon-button" aria-label="Main navigation menu"><Icon name="menu" size={16} /></button></nav>
  </PageShell></header>;
}