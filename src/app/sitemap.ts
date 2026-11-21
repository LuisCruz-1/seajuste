import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { experienceCases } from "@/lib/experience/cases";
import { experienceHref } from "@/lib/experience/routes";
import { href, locales, privacyHref, sectionKeys, type DetailId, type Section } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { section?: Section; detail?: DetailId }[] = [
    {}, ...sectionKeys.map((section) => ({ section })),
    ...services.map((service) => ({ section: "services" as const, detail: service.id })),
  ];
  return [
    ...pages.flatMap(({ section, detail }) => locales.map((locale) => ({ url: `${siteUrl}${href(locale, section, detail)}`, alternates: { languages: { es: `${siteUrl}${href("es", section, detail)}`, en: `${siteUrl}${href("en", section, detail)}` } }, priority: !section ? 1 : detail ? 0.65 : 0.8 }))),
    ...experienceCases.flatMap((item) => locales.map((locale) => ({ url: `${siteUrl}${experienceHref(locale, item.id)}`, alternates: { languages: { es: `${siteUrl}${experienceHref("es", item.id)}`, en: `${siteUrl}${experienceHref("en", item.id)}` } }, priority: 0.65 }))),
    ...locales.map((locale) => ({ url: `${siteUrl}${privacyHref(locale)}`, alternates: { languages: { es: `${siteUrl}${privacyHref("es")}`, en: `${siteUrl}${privacyHref("en")}` } }, priority: 0.3 })),
  ];
}
