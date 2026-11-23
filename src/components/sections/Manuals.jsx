import { useLang } from '../../app/LangContext';
import { resolveHref } from '../../content/links';
import LinkRow from '../ui/LinkRow';

export default function Manuals() {
  const { c, cfg, lang } = useLang();
  const m = c.manuals;
  const rows = m.items.map((item) => {
    const href = resolveHref(`manual:${item.key}`, cfg, lang);
    const size = cfg.manuals?.[item.key]?.size;
    return { item, href, meta: href && size ? `${item.meta}, ${size}` : item.meta };
  });
  return (
    <section id={m.id} className="pale">
      <div className="wrap">
        <h2 className="t">{m.title}</h2>
        <div className="rows">
          {rows.map(({ item, href, meta }) => (
            <LinkRow key={item.key} icon="description" title={item.title} meta={meta} href={href} />
          ))}
        </div>
      </div>
    </section>
  );
}
