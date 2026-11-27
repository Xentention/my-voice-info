import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import Landing from './app/Landing';
import Privacy from './app/Privacy';

const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
const root = document.getElementById('root');
const Page = document.body.dataset.page === 'privacy' ? Privacy : Landing;

document.documentElement.classList.add('js');

createRoot(root).render(<Page lang={lang} />);
