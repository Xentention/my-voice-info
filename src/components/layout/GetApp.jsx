import { useLang } from '../../app/LangContext';
import Slots from '../ui/Slots';
import Stores from '../sections/Stores';
import './GetApp.css';

export default function GetApp() {
  const { c } = useLang();
  return (
    <div className="band-accent get" id={c.get.id}>
      <div className="wrap">
        <h2>{c.get.title}</h2>
        <Slots />
        <Stores />
      </div>
    </div>
  );
}
