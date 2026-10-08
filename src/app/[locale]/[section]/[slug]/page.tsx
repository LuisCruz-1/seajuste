import { notFound } from "next/navigation";
import { CasePage, ServicePage } from "@/components/pages";
import { cases, services } from "@/lib/content";
import { detailSlugs, getDetail, getSection, isLocale, sections, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; section: string; slug: string }> };

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  if (!isLocale(locale)) return [];
  return [
    ...services.map((item) => ({ section: sections.services[locale], slug: detailSlugs[item.id][locale] })),
    ...cases.map((item) => ({ section: sections.experience[locale], slug: detailSlugs[item.id][locale] })),
  ];
}

export async function generateMetadata({ params }: Props) {
  const { locale, section: sectionSlug, slug } = await params;
  if (!isLocale(locale)) notFound();
  const section = getSection(locale, sectionSlug);
  if (!section) notFound();
  const id = getDetail(locale, section, slug);
  const item = section === "services" ? services.find((service) => service.id === id) : cases.find((candidate) => candidate.id === id);
  if (!item) notFound();
  return pageMetadata(locale, t(item.title, locale), t(item.summary, locale), section, item.id);
}

export default async function Page({ params }: Props) {
  const { locale, section: sectionSlug, slug } = await params;
  if (!isLocale(locale)) notFound();
  const section = getSection(locale, sectionSlug);
  if (!section) notFound();
  const id = getDetail(locale, section, slug);
  if (section === "services") {
    const service = services.find((candidate) => candidate.id === id);
    if (service) return <ServicePage service={service} locale={locale} />;
  }
  if (section === "experience") {
    const item = cases.find((candidate) => candidate.id === id);
    if (item) return <CasePage item={item} locale={locale} />;
  }
  notFound();
}
