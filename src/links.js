/* Content uses symbolic href tokens ('github' | 'survey' | 'demo' | 'windows')
   so the copy in content.js stays free of URLs. Resolve them against MV_CONFIG
   here; any other value (a real URL or in-page anchor) passes straight through. */
export function resolveHref(href, cfg) {
  switch (href) {
    case 'github':  return cfg.githubUrl;
    case 'survey-en':  return cfg.surveyUrlEN;
    case 'survey-ru':  return cfg.surveyUrlRU;
    case 'demo':    return cfg.demoUrl;
    case 'windows': return cfg.windowsAppUrl;
    default:        return href;
  }
}
