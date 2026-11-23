import { useLang } from '../../app/LangContext';
import '../../styles/cards.css';
import './ComingSoon.css';

export default function ComingSoon() {
  const { c } = useLang();
  const s = c.soon;
  return (
    <section id={s.id}>
      <div className="wrap">
        <h2 className="t">{s.title}</h2>
        <div className="grid">
          {s.items.map((item) => (
            <div className="card soon" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
