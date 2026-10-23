import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/content";
import { href, privacyHref, type Locale } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy";

export function privacyMetadata(locale: Locale): Metadata {
  const c = privacyCopy[locale];
  return {
    title: c.title, description: c.description,
    alternates: { canonical: privacyHref(locale), languages: { es: privacyHref("es"), en: privacyHref("en"), "x-default": privacyHref("es") } },
    openGraph: { title: `${c.title} | ${company.name}`, description: c.description, url: privacyHref(locale), siteName: company.name, type: "website" },
  };
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const c = privacyCopy[locale];
  return <section className="section privacy-page"><div className="container">
    <header><p className="eyebrow">SEAJUSTE</p><h1>{c.title}</h1><p>{c.description}</p></header>
    <section aria-labelledby="privacy-controller"><h2 id="privacy-controller">{c.responsible}</h2><p>{company.legalName} · RUC {company.taxId}.<br />{c.location}</p><p>{c.contact} <a href={`mailto:${company.email}`}>{company.email}</a></p></section>
    {c.sections.map((section, index) => <section key={index} aria-labelledby={`privacy-section-${index}`}><h2 id={`privacy-section-${index}`}>{section.title}</h2><p>{section.text}</p></section>)}
    <a className="text-link" href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">{c.whatsappPolicy}<ArrowUpRight size={17} aria-hidden="true" /></a>
    <div className="privacy-return"><Link className="text-link" href={href(locale, "contact")}><ArrowLeft size={17} aria-hidden="true" />{c.back}</Link></div>
  </div></section>;
}
