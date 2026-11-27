import { LangProvider } from './LangContext';
import { ThemeProvider } from './ThemeContext';
import { landingPath, privacyPath } from './paths';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { PRIVACY_CONTENT } from '../content/privacy';
import './Privacy.css';

export default function Privacy({ lang }) {
  const policy = PRIVACY_CONTENT[lang];
  const base = import.meta.env.BASE_URL;
  const other = lang === 'en' ? 'ru' : 'en';

  return (
    <LangProvider lang={lang}>
      <ThemeProvider>
        <Header landingHref={`${base}${landingPath(lang)}`} languageHref={`${base}${privacyPath(other)}`} skipHref="#main" />
        <main id="main" className="wrap privacy" tabIndex={-1}>
          <h1>{policy.title}</h1>
          <p>{policy.app}</p>
          <p>{policy.speech}</p>
        </main>
        <footer><Footer /></footer>
      </ThemeProvider>
    </LangProvider>
  );
}
