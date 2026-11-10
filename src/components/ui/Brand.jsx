import { useLang } from '../../app/LangContext';
import './Brand.css';

export default function Brand() {
  const { c } = useLang();
  return (
    <>
      <span className="name">{c.brand}</span> <i className="beta">{c.beta}</i>
    </>
  );
}
