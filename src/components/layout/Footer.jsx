import { useLang } from '../../app/LangContext';
import './Footer.css';

const Credit = ({ text, link }) => {
  const [before, after] = text.split('{link}');
  return (
    <p>
      {before}
      <a href={link.href}>{link.label}</a>
      {after}
    </p>
  );
};

export default function Footer() {
  const { c, cfg } = useLang();
  return (
    <div className="wrap footer">
      <Credit {...c.footer.credit} />
      <Credit {...c.footer.flags} />
      <p>
        {cfg.contactEmail ? (
          <>{c.footer.contactLabel}: <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a></>
        ) : (
          <span aria-disabled="true">{c.footer.contactLabel}: {c.comingSoon.toLowerCase()}</span>
        )}
      </p>
    </div>
  );
}
