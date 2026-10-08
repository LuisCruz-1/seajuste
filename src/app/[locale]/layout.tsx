import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/site";
import { copy } from "@/lib/copy";
import { fontClassName } from "@/lib/fonts";
import { isLocale, locales } from "@/lib/i18n";
import { organizationSchema, siteUrl } from "@/lib/seo";
import "../globals.css";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
export const viewport: Viewport = { themeColor: "#092f49", colorScheme: "light" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { metadataBase: new URL(siteUrl), title: { default: `SEAJUSTE · ${copy[locale].brandDescriptor}`, template: "%s | SEAJUSTE" }, description: copy[locale].metaDescription, applicationName: "SEAJUSTE", creator: "SEAJUSTE S.A.", robots: { index: true, follow: true } };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = copy[locale];
  const headerLabels = { nav: c.nav, home: c.home, menu: c.menu, closeMenu: c.closeMenu, language: c.language, brandDescriptor: c.brandDescriptor, topLine: c.topLine, location: c.location, contactAction: c.contactAction };
  return <html lang={locale} className={fontClassName}><body><a href="#main-content" className="skip-link">{c.skip}</a><Header locale={locale} labels={headerLabels} /><main id="main-content">{children}</main><Footer locale={locale} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()).replace(/</g, "\\u003c") }} /></body></html>;
}
