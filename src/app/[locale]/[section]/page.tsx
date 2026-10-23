import { notFound } from "next/navigation";
import { AboutPage, ContactPage, CredentialsPage, ExperiencePage, ServicesPage, TeamPage } from "@/components/pages";
import { PrivacyPage, privacyMetadata } from "@/components/privacy-page";
import { copy } from "@/lib/copy";
import { getSection, isLocale, privacySlugs, sectionKeys, sections, type Section } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; section: string }> };
const views = { about: AboutPage, services: ServicesPage, experience: ExperiencePage, team: TeamPage, credentials: CredentialsPage, contact: ContactPage };
const introKeys = { about: "aboutIntro", services: "servicesIntro", experience: "experienceIntro", team: "teamPageIntro", credentials: "credentialsIntro", contact: "contactIntro" } as const;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  if (!isLocale(locale)) return [];
  return [...sectionKeys.map((section) => ({ section: sections[section][locale] })), { section: privacySlugs[locale] }];
}

export async function generateMetadata({ params }: Props) {
  const { locale, section: slug } = await params;
  if (!isLocale(locale)) notFound();
  if (slug === privacySlugs[locale]) return privacyMetadata(locale);
  const section = getSection(locale, slug);
  if (!section) notFound();
  const c = copy[locale];
  return pageMetadata(locale, c.nav[section], c[introKeys[section]], section);
}

export default async function Page({ params }: Props) {
  const { locale, section: slug } = await params;
  if (!isLocale(locale)) notFound();
  if (slug === privacySlugs[locale]) return <PrivacyPage locale={locale} />;
  const section: Section | undefined = getSection(locale, slug);
  if (!section) notFound();
  const View = views[section];
  return <View locale={locale} />;
}
