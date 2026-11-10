import { useLang } from '../../app/LangContext';
import Shot from '../ui/Shot';
import './Look.css';

const STYLES = ['minimal', 'classic'];
const SCHEMES = [
  { scheme: 'light', className: 'l-img' },
  { scheme: 'warm', className: 'w-img' },
  { scheme: 'dark', className: 'd-img' },
];

export default function Look() {
  const { c } = useLang();
  const l = c.look;
  return (
    <section id={l.id} className="pale">
      <div className="wrap">
        <h2 className="t">{l.title}</h2>

        <h3 className="sh">{l.styles.title}</h3>
        <p className="sub">{l.styles.sub}</p>
        <div className="styles">
          {STYLES.map((key) => (
            <figure key={key}>
              <div className="frame">
                <Shot device="style" name={key} alt={l.styles[key].alt} />
              </div>
              <figcaption>
                <strong>{l.styles[key].name}</strong>
                <span>{l.styles[key].text}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="sh">{l.themes.title}</h3>
        <div className="themes">
          <div className="back">
            <div className="band l" />
            <div className="band w" />
            <div className="band d" />
          </div>
          <div className="win">
            {SCHEMES.map(({ scheme, className }, i) => (
              <Shot
                key={scheme}
                device="theme"
                name="board"
                scheme={scheme}
                className={className}
                alt={i === SCHEMES.length - 1 ? l.themes.alt : ''}
              />
            ))}
          </div>
        </div>
        <div className="cap-row">
          {l.themes.names.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <p className="sub">{l.themes.note}</p>
      </div>
    </section>
  );
}
