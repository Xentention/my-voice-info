import { createContext, useContext, useEffect, useState } from 'react';
import { read, write } from './storage';

const KEY = 'mv-theme';
export const THEMES = ['light', 'dark', 'warm'];

const ThemeContext = createContext({ mode: 'system', shown: null, setMode: () => {} });

const saved = () => {
  const value = read(KEY);
  return THEMES.includes(value) ? value : 'system';
};

const paintBar = () => {
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--app-accent').trim();
  if (!accent) return;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.setAttribute('content', accent);
};

const apply = (mode) => {
  document.documentElement.dataset.theme = mode;
  paintBar();
};

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState('system');
  const [system, setSystem] = useState(null);

  useEffect(() => {
    const stored = saved();
    setModeState(stored);
    if (stored !== 'system') apply(stored);
    const query = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!query) return undefined;
    const read = () => setSystem(query.matches ? 'dark' : 'light');
    read();
    query.addEventListener?.('change', read);
    return () => query.removeEventListener?.('change', read);
  }, []);

  const setMode = (next) => {
    setModeState(next);
    apply(next);
    write(KEY, next);
  };

  const value = { mode, shown: mode === 'system' ? system : mode, setMode };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
