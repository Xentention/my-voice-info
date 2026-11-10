import { useLang } from '../../app/LangContext';
import './Faq.css';

export default function Faq() {
  const { c } = useLang();
  const f = c.faq;
  return (
    <section id={f.id}>
      <div className="wrap">
        <h2 className="t">{f.title}</h2>
        <div className="rows">
          {f.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
