import { useLang } from '../../app/LangContext';
import { resolveHref } from '../../content/links';
import Icon from './Icon';
import './Slots.css';

export default function Slots() {
  const { c, cfg, lang } = useLang();
  const play = resolveHref('play', cfg, lang);
  const ios = resolveHref('ios', cfg, lang);
  const store = c.hero.store;
  const badge = (
    <>
      <Icon name="play" />
      <span>
        <small>{play ? store.small : c.comingSoon}</small>
        <strong>{store.name}</strong>
      </span>
    </>
  );
  return (
    <div className="slots">
      {play ? (
        <a className="store" href={play}>{badge}</a>
      ) : (
        <span className="store" role="group" aria-disabled="true" aria-label={store.unavailable}>{badge}</span>
      )}
      {ios ? (
        <a className="ios" href={ios}>{c.hero.ios}</a>
      ) : (
        <span className="ios" aria-disabled="true">
          <span>
            {c.hero.ios}
            <small>{c.comingSoon}</small>
          </span>
        </span>
      )}
    </div>
  );
}
