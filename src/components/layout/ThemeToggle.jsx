import { useEffect, useId, useRef, useState } from 'react';
import { useLang } from '../../app/LangContext';
import { THEMES, useTheme } from '../../app/ThemeContext';
import Icon from '../ui/Icon';
import '../ui/Seg.css';
import './ThemeToggle.css';

const ICON = { light: 'light_mode', dark: 'dark_mode', warm: 'local_cafe' };

export default function ThemeToggle() {
  const { c } = useLang();
  const { shown, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const drop = useRef(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const outside = (event) => {
      if (!drop.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const choose = (theme) => {
    setMode(theme);
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div className="theme">
      <div className="seg" role="group" aria-label={c.theme.label}>
        {THEMES.map((theme) => (
          <button key={theme} type="button" aria-label={c.theme[theme]} title={c.theme[theme]} aria-pressed={shown === theme} onClick={() => setMode(theme)}>
            <Icon name={ICON[theme]} />
          </button>
        ))}
      </div>
      <div className="drop" ref={drop}>
        <button
          ref={trigger}
          className="drop-btn"
          type="button"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={shown ? `${c.theme.label}: ${c.theme[shown]}` : c.theme.label}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={ICON[shown ?? 'light']} />
          <Icon name="arrow_drop_down" />
        </button>
        {open && (
          <div className="drop-list" id={listId} role="group" aria-label={c.theme.pick}>
            {THEMES.map((theme) => (
              <button key={theme} type="button" aria-pressed={shown === theme} onClick={() => choose(theme)}>
                <Icon name={ICON[theme]} />
                {c.theme[theme]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
