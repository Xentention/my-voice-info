import { ICONS } from './icons';

export default function Icon({ name }) {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d={ICONS[name]} />
    </svg>
  );
}
