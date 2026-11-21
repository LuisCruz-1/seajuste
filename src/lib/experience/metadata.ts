import type { Metadata } from "next";
import { t, type Locale } from "../i18n";
import { pageMetadata } from "../seo";
import { experienceCopy } from "./copy";
import { experienceHref } from "./routes";
import type { ExperienceCase } from "./types";

export function experienceMetadata(locale: Locale, item?: ExperienceCase): Metadata {
  const title = item ? t(item.title, locale) : locale === "es" ? "Experiencia documentada" : "Documented experience";
  const description = item ? t(item.summary, locale) : experienceCopy[locale].intro;
  const base = pageMetadata(locale, title, description, "experience");
  return {
    ...base,
    alternates: {
      canonical: experienceHref(locale, item?.id),
      languages: {
        es: experienceHref("es", item?.id),
        en: experienceHref("en", item?.id),
        "x-default": experienceHref("es", item?.id),
      },
    },
    openGraph: { ...base.openGraph, url: experienceHref(locale, item?.id) },
  };
}
