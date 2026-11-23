import { useLang } from '../../app/LangContext';
import Icon from './Icon';
import './LinkRow.css';

export default function LinkRow({ icon, title, meta, href }) {
  const { c } = useLang();
  const body = (
    <>
      <span className="ico"><Icon name={icon} /></span>
      <span className="rt">
        <strong>{title}</strong>
        <small>{href ? meta : c.comingSoon}</small>
      </span>
    </>
  );
  return href ? (
    <a className="row" href={href}>{body}</a>
  ) : (
    <div className="row" aria-disabled="true">{body}</div>
  );
}
