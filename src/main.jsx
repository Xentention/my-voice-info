import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import Landing from './app/Landing';

const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
const root = document.getElementById('root');

document.documentElement.classList.add('js');

createRoot(root).render(<Landing lang={lang} />);
