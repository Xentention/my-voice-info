import { useLang } from '../../app/LangContext';
import Brand from '../ui/Brand';
import Logo from '../ui/Logo';
import ThemeToggle from './ThemeToggle';
import './Header.css';

export default function Header({ children }) {
  const { c, lang } = useLang();
  const other = lang === 'en' ? 'ru' : 'en';
  const flag = lang === 'en' ? 'ru' : 'us';
  return (
    <>
      <a className="skip" href="#features">{c.skip}</a>
      <header className="band-accent">
        <div className="wrap">
          <div className="bar">
            <a className="brand" href="#top">
              <Logo />
              <span><Brand /></span>
            </a>
            <nav className="nav" aria-label={c.brand}>
              {c.nav.links.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </nav>
            <div className="tools">
              <a className="lang" href={c.otherLang.href} lang={other} hrefLang={other} aria-label={c.otherLang.label} title={c.otherLang.label}>
                <img src={`${import.meta.env.BASE_URL}assets/flags/${flag}.svg`} width="32" height="32" alt="" />
              </a>
              <ThemeToggle />
            </div>
          </div>
          {children}
        </div>
      </header>
    </>
  );
}
