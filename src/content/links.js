const anchored = (href) => (href && !/^([a-z][a-z0-9+.-]*:|\/)/i.test(href) ? `${import.meta.env.BASE_URL}${href}` : href ?? null);

export function resolveHref(token, cfg, lang) {
  switch (token) {
    case 'play': return cfg.googlePlayUrl ?? null;
    case 'ios': return (lang === 'ru' ? cfg.iosInterestUrlRU : cfg.iosInterestUrlEN) ?? null;
    case 'survey': return (lang === 'ru' ? cfg.surveyUrlRU : cfg.surveyUrlEN) ?? null;
    default:
      if (token.startsWith('manual:')) return anchored(cfg.manuals?.[token.slice(7)]?.href);
      return token.startsWith('store:') ? cfg.stores?.[token.slice(6)] ?? null : token;
  }
}
