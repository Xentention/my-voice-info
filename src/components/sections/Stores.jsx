import { useLang } from '../../app/LangContext';
import { resolveHref } from '../../content/links';
import LinkRow from '../ui/LinkRow';

export default function Stores() {
  const { c, cfg, lang } = useLang();
  const s = c.stores;
  const rows = s.items.map((item) => ({ item, href: resolveHref(`store:${item.key}`, cfg, lang) }));
  return (
    <div className="stores" id={s.id}>
      <h3>{s.title}</h3>
      <div className="rows">
        {rows.map(({ item, href }) => (
          <LinkRow key={item.key} icon={item.icon} title={item.title} meta={item.meta} href={href} />
        ))}
      </div>
    </div>
  );
}
