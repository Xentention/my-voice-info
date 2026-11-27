import { renderToString } from 'react-dom/server';
import Landing from './app/Landing';
import Privacy from './app/Privacy';
import { landingPath, privacyPath } from './app/paths';
import { MV_CONTENT } from './content/content';
import { PRIVACY_CONTENT } from './content/privacy';

export const pages = Object.keys(MV_CONTENT).flatMap((lang) => [
  { lang, path: landingPath(lang), Component: Landing, ...MV_CONTENT[lang].meta },
  {
    lang,
    path: privacyPath(lang),
    Component: Privacy,
    title: `${PRIVACY_CONTENT[lang].title} | ${MV_CONTENT[lang].brand}`,
    description: PRIVACY_CONTENT[lang].description,
  },
]);

export const render = ({ lang, Component }) => renderToString(<Component lang={lang} />);
