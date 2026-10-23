import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Anchor, Building2, ChartNoAxesCombined, ChevronRight, Cog, FileSearch, MapPin, SearchCheck, ShieldCheck, Truck, UsersRound, Wrench, Zap } from "lucide-react";
import { company, clients, methodology, type CaseStudy, type Service } from "@/lib/content";
import { copy } from "@/lib/copy";
import { formatMoney, href, sectionKeys, t, type Locale, type Section } from "@/lib/i18n";
import type { CaseCardData } from "./cards";

const icons = { search: FileSearch, energy: Zap, marine: Anchor, engineering: Cog, chart: ChartNoAxesCombined, equipment: Wrench, civil: Building2, vehicles: Truck, risk: ShieldCheck };

export function ServiceIcon({ name, size = 25 }: { name: Service["icon"]; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}

export function Photo({ name, alt, className = "", eager = false, sizes = "(max-width: 800px) 100vw, 50vw" }: { name: string; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  return <div className={`photo ${className}`}><Image src={`/images/projects/${name}.webp`} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} /></div>;
}

export function ButtonLink({ to, children, variant = "primary", download = false }: { to: string; children: React.ReactNode; variant?: "primary" | "outline" | "light"; download?: boolean }) {
  const className = `button button-${variant}`;
  return download ? <a href={to} className={className} download>{children}<ArrowDown size={18} aria-hidden="true" /></a> : <Link href={to} className={className}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function SectionHeading({ eyebrow, title, description, action, className = "" }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode; className?: string }) {
  return <div className={`section-heading ${className}`}><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description && <p className="section-intro">{description}</p>}</div>{action && <div className="section-heading-action">{action}</div>}</div>;
}

export function Breadcrumbs({ locale, section, current }: { locale: Locale; section?: Section; current?: string }) {
  const c = copy[locale];
  return <nav className="breadcrumbs" aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}><Link href={href(locale)}>{c.home}</Link>{section && <><ChevronRight size={12} aria-hidden="true" />{current ? <Link href={href(locale, section)}>{c.nav[section]}</Link> : <span aria-current="page">{c.nav[section]}</span>}</>}{current && <><ChevronRight size={12} aria-hidden="true" /><span aria-current="page">{current}</span></>}</nav>;
}

export function PageHero({ locale, section, eyebrow, title, description }: { locale: Locale; section: Section; eyebrow?: string; title: string; description: string | string[] }) {
  return <section className="page-hero"><div className="container"><Breadcrumbs locale={locale} section={section} /><div className="page-hero-content"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1></div>{Array.isArray(description) ? <div className="page-hero-description">{description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : <p>{description}</p>}</div></div><div className="hero-reference-circle" aria-hidden="true" /></section>;
}

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  const c = copy[locale];
  return <article className="service-card"><div className="service-card-top"><span className="service-icon"><ServiceIcon name={service.icon} /></span><span className="data-label">{t(service.discipline, locale)}</span></div><h3>{t(service.title, locale)}</h3><p>{t(service.summary, locale)}</p><Link href={href(locale, "services", service.id)} className="text-link">{c.viewService}<ArrowUpRight size={18} aria-hidden="true" /></Link></article>;
}

export function toCaseCard(item: CaseStudy, locale: Locale): CaseCardData {
  return { id: item.id, href: href(locale, "experience", item.id), title: t(item.title, locale), client: item.client, location: t(item.location, locale), description: t(item.summary, locale), image: `/images/projects/${item.images[0]}.webp`, category: item.category, categoryName: copy[locale].categories[item.category], value: item.value ? formatMoney(item.value, locale) : undefined };
}

export function Methodology({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const c = copy[locale];
  return <section className={`methodology-section ${compact ? "is-compact" : "section"}`} id="methodology"><div className={compact ? "" : "container"}>{!compact && <SectionHeading eyebrow={c.methodologyEyebrow} title={c.methodologyTitle} description={c.methodologyIntro} />}<ol className="methodology-list">{methodology.map((step, index) => <li key={index}><span className="step-number">0{index + 1}</span><div><h3>{t(step.title, locale)}</h3><p>{t(step.description, locale)}</p></div>{index < methodology.length - 1 && <ArrowRight className="step-arrow" size={19} aria-hidden="true" />}</li>)}</ol></div></section>;
}

export function ClientLogos({ locale, all = false }: { locale: Locale; all?: boolean }) {
  return <ul className={`client-logos ${all ? "all-clients" : ""}`} aria-label={copy[locale].clientsTitle}>{(all ? clients : [clients[0], clients[1], clients[6], clients[10], clients[12], clients[7]]).map(([id, name]) => <li className="client-logo" key={id}><Image src={`/images/clients/${id}.webp`} alt={name} width={260} height={145} sizes="(max-width: 600px) 40vw, 16vw" /><span>{name}</span></li>)}</ul>;
}

export function ContactBand({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section className="contact-band"><div className="container contact-band-inner"><div><p className="eyebrow">{c.ctaEyebrow}</p><h2>{c.ctaTitle}</h2><p>{c.ctaIntro}</p></div><div className="contact-band-actions"><ButtonLink to={`${href(locale, "contact")}#consulta`} variant="light">{c.consultationAction}</ButtonLink><a href={company.phoneHref} className="contact-band-phone">{company.phone}<ArrowUpRight size={18} aria-hidden="true" /></a></div><span className="contact-band-mark" aria-hidden="true">S</span></div></section>;
}

export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Link className="brand brand-light" href={href(locale)} aria-label={`SEAJUSTE · ${c.home}`}><Image src="/images/brand/seajuste-logo.png" alt="SEAJUSTE S.A." width={900} height={155} className="brand-image" /><span>{c.brandDescriptor}</span></Link><p>{c.footerIntro}</p><a href={company.brochure} className="footer-brochure" download>{c.download}<ArrowDown size={17} aria-hidden="true" /></a></div><div className="footer-links"><h2>{c.footerNavigation}</h2>{sectionKeys.map((section) => <Link href={href(locale, section)} key={section}>{c.nav[section]}</Link>)}</div><div className="footer-links"><h2>{c.footerContact}</h2><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">{c.linkedinLabel}<ArrowUpRight size={14} aria-hidden="true" /></a></div><div className="footer-offices"><h2>{c.footerOffices}</h2>{company.offices.map((office) => <a href={office.map} key={office.city} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" /><span><strong>{office.city}</strong>{t(office.building, locale)}<br />{t(office.office, locale)}</span></a>)}</div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} SEAJUSTE S.A. {c.footerRights}</p><p>{c.footerLegal}</p><p>{c.footerCredit}</p></div></div></footer>;
}

export function TrustItems({ locale }: { locale: Locale }) {
  const labels = copy[locale].values;
  return <div className="trust-items">{[ShieldCheck, FileSearch, SearchCheck, UsersRound].map((Icon, index) => <div key={index}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><span>{labels[index]}</span></div>)}</div>;
}
