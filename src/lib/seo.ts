import type { Metadata } from "next";
import { company } from "./content";
import { copy } from "./copy";
import { href, type DetailId, type Locale, type Section } from "./i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export function pageMetadata(locale: Locale, title: string, description: string, section?: Section, detail?: DetailId): Metadata {
  const path = href(locale, section, detail);
  return {
    title: section ? title : { absolute: `${company.name} · ${copy[locale].brandDescriptor}` },
    description,
    alternates: { canonical: path, languages: { es: href("es", section, detail), en: href("en", section, detail), "x-default": href("es", section, detail) } },
    openGraph: { title: `${title} | SEAJUSTE`, description, url: path, siteName: company.name, locale: locale === "es" ? "es_EC" : "en_US", alternateLocale: locale === "es" ? "en_US" : "es_EC", type: "website", images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: "SEAJUSTE · Energy, Marine & Complex Claims" }] },
    twitter: { card: "summary_large_image", title: `${title} | SEAJUSTE`, description, images: [`/${locale}/opengraph-image`] },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`,
    name: company.name, legalName: company.legalName, url: siteUrl, logo: `${siteUrl}/images/brand/seajuste-logo.png`,
    image: `${siteUrl}/images/projects/tg5-generator.webp`, telephone: "+593999666167", email: company.email,
    taxID: company.taxId, foundingDate: "1992", areaServed: { "@type": "Country", name: "Ecuador" },
    address: [
      { "@type": "PostalAddress", streetAddress: "Parque Empresarial Colón, Edificio Pacific Plaza, piso 3, oficina 306. Av. Chávez Franco y Av. J. Tanca Marengo", addressLocality: "Guayaquil", addressCountry: "EC" },
      { "@type": "PostalAddress", streetAddress: "Edificio Amazonas Park, piso 16. Av. Amazonas N35-135 y Japón", addressLocality: "Quito", addressCountry: "EC" },
    ],
    knowsAbout: ["Loss adjusting", "Energy and power loss adjusting", "Ship’s hull and machinery", "Marine cargo surveys", "Engineering for complex claims", "Business interruption"],
  };
}
