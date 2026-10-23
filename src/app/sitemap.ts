import type { MetadataRoute } from "next";
import { cases, services } from "@/lib/content";
import { href, locales, privacyHref, sectionKeys, type DetailId, type Section } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { section?: Section; detail?: DetailId }[] = [
    {}, ...sectionKeys.map((section) => ({ section })),
    ...services.map((service) => ({ section: "services" as const, detail: service.id })),
    ...cases.map((item) => ({ section: "experience" as const, detail: item.id })),
  ];
  return [
    ...pages.flatMap(({ section, detail }) => locales.map((locale) => ({ url: `${siteUrl}${href(locale, section, detail)}`, alternates: { languages: { es: `${siteUrl}${href("es", section, detail)}`, en: `${siteUrl}${href("en", section, detail)}` } }, priority: !section ? 1 : detail ? 0.65 : 0.8 }))),
    ...locales.map((locale) => ({ url: `${siteUrl}${privacyHref(locale)}`, alternates: { languages: { es: `${siteUrl}${privacyHref("es")}`, en: `${siteUrl}${privacyHref("en")}` } }, priority: 0.3 })),
  ];
}
