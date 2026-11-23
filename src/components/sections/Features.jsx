import { useLang } from '../../app/LangContext';
import Icon from '../ui/Icon';
import Tick from '../ui/Tick';
import '../../styles/cards.css';

export default function Features() {
  const { c } = useLang();
  const f = c.features;
  return (
    <section id={f.id} className="pale">
      <div className="wrap">
        <h2 className="t">{f.title}</h2>
        <div className="grid">
          {f.cards.map((card) => (
            <article className="card" key={card.title}>
              <header>
                <span className="ico"><Icon name={card.icon} /></span>
                <h3>{card.title}</h3>
              </header>
              <ul className="ticks">
                {card.ticks.map((t) => (
                  <li key={t}><Tick />{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
