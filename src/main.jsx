import { createRoot } from 'react-dom/client';
import '@mdi/font/css/materialdesignicons.min.css';
import './styles/high-contrast.css';
import Landing from './Landing';

// Each HTML entry sets <html lang="en"> or <html lang="ru">; that attribute is
// the single source of truth for which language this page renders.
const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';

createRoot(document.getElementById('root')).render(<Landing lang={lang} />);
