import { useLang } from '../../app/LangContext';
import { resolveHref } from '../../content/links';
import Slots from '../ui/Slots';
import Stores from '../sections/Stores';
import './GetApp.css';

export default function GetApp() {
  const { c, cfg, lang } = useLang();
  const survey = resolveHref('survey', cfg, lang);
  return (
    <div className="band-accent get" id={c.get.id}>
      <div className="wrap">
        <h2>{c.get.title}</h2>
        <Slots />
        <Stores />
        <p className="sm">
          {survey ? (
            <a href={survey}>{c.get.survey}</a>
          ) : (
            <span className="off" aria-disabled="true">{c.get.survey}: {c.comingSoon.toLowerCase()}</span>
          )}
        </p>
      </div>
    </div>
  );
}
