import { renderToString } from 'react-dom/server';
import Landing from './app/Landing';
import { MV_CONTENT } from './content/content';

export const languages = Object.keys(MV_CONTENT);
export const render = (lang) => renderToString(<Landing lang={lang} />);
export const meta = (lang) => MV_CONTENT[lang].meta;
