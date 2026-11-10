import { createContext, useContext } from "react";
import { MV_CONFIG, MV_CONTENT } from "../content/content";

const LangContext = createContext(null);

export function LangProvider({ lang, cfg = MV_CONFIG, children }) {
  const value = { lang, c: MV_CONTENT[lang], cfg };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used within <LangProvider>");
  return value;
}
