import { createContext, useContext, useState } from "react";
import { useLang } from "./LangContext";

const A11yContext = createContext(null);

export function A11yProvider({ children }) {
  const { c } = useLang();

  const [highContrast, setHighContrast] = useState(
    typeof document !== "undefined" &&
      document.documentElement.dataset.hc === "on"
  );

  const [message, setMessage] = useState("");

  // Re-announce even when the same category message repeats: clear first,
  // then set the text on the next tick so aria-live fires again.
  function announce(text) {
    setMessage("");
    setTimeout(() => setMessage(text), 50);
  }

  function toggleHighContrast() {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.dataset.hc = next ? "on" : "off";
    try {
      localStorage.setItem("mv-a11y", JSON.stringify({ highContrast: next }));
    } catch (e) {
      /* ignore write failures (private mode, quota, etc.) */
    }
    announce(next ? c.a11y.contrastOn : c.a11y.contrastOff);
  }

  const value = { highContrast, toggleHighContrast };

  return (
    <A11yContext.Provider value={value}>
      {children}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const value = useContext(A11yContext);
  if (!value) throw new Error("useA11y must be used within <A11yProvider>");
  return value;
}
