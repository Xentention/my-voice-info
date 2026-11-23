import { useLang } from '../../app/LangContext';
import { useTheme } from '../../app/ThemeContext';
import sizes from '../../content/shotSizes.json';

const PREFIX = { tablet: 't', phone: 'p', style: 'style', theme: 't' };
const DISPLAYED_PHONE = '(min-width: 861px) 150px, 30vw';

const sourceMedia = (mode, own) => {
  if (mode === own) return 'all';
  return mode === 'system' && own === 'dark' ? '(prefers-color-scheme: dark)' : 'not all';
};

export default function Shot({ name, device, alt, eager = false, small = false, crisp = false, sizes: shown, scheme, className }) {
  const { lang } = useLang();
  const { mode } = useTheme();
  const key = `${PREFIX[device]}-${name}`;
  const size = sizes[lang]?.[key];
  if (!size) throw new Error(`No size for ${lang}/${key} in src/content/shotSizes.json`);
  const [width, height] = size;
  const file = (s) => `${import.meta.env.BASE_URL}shots/${lang}/${key}-${s}.webp`;
  const loading = eager ? 'eager' : 'lazy';
  const priority = eager ? 'high' : undefined;
  if (scheme) {
    return <img className={className} src={file(scheme)} width={width} height={height} loading={loading} fetchpriority={priority} alt={alt} />;
  }
  const narrow = small ? sizes.small?.[device] : null;
  if (small && !narrow) throw new Error(`No small width for ${device} in src/content/shotSizes.json (key: small)`);
  const double = crisp ? sizes.wide?.[device] : null;
  if (crisp && !double) throw new Error(`No wide width for ${device} in src/content/shotSizes.json (key: wide)`);
  const responsive = narrow || double;
  const set = (s) => {
    const files = [...(narrow ? [`${file(`${s}-${narrow}`)} ${narrow}w`] : []), `${file(s)} ${width}w`, ...(double ? [`${file(`${s}-${double}`)} ${double}w`] : [])];
    return responsive ? files.join(', ') : file(s);
  };
  const displayed = responsive ? shown ?? DISPLAYED_PHONE : undefined;
  return (
    <picture>
      <source media={sourceMedia(mode, 'dark')} srcSet={set('dark')} sizes={displayed} />
      {device !== 'style' && <source media={sourceMedia(mode, 'warm')} srcSet={set('warm')} sizes={displayed} />}
      <img src={file('light')} srcSet={responsive ? set('light') : undefined} sizes={displayed} width={width} height={height} loading={loading} fetchpriority={priority} alt={alt} />
    </picture>
  );
}
