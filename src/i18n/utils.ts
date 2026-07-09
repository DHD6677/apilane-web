import { locales, defaultLocale, t, localeHtmlLang, localeLabels, type Locale, type TranslationKey } from './ui';

export { locales, defaultLocale, t, localeHtmlLang, localeLabels };
export type { Locale, TranslationKey };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/').filter(Boolean);
  if (segment && isLocale(segment)) return segment;
  return defaultLocale;
}

export const localePath = (locale: Locale, path: string = ''): string => {
  const clean = path.replace(/^\/+/, '');
  return `/${locale}${clean ? '/' + clean : ''}`;
};

export function useTranslations(locale: Locale) {
  return (key: TranslationKey) => t(locale, key);
}

export interface HreflangAlt {
  hreflang: string;
  href: string;
}

export function getAlternates(site: URL, pathname: string, path: string = ''): HreflangAlt[] {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = clean ? `${clean}/` : '';
  const alts: HreflangAlt[] = locales.map((loc) => ({
    hreflang: loc === 'zh' ? 'zh-CN' : loc,
    href: new URL(`/${loc}/${base}`, site).toString()
  }));
  alts.push({ hreflang: 'x-default', href: new URL(`/${defaultLocale}/${base}`, site).toString() });
  return alts;
}
