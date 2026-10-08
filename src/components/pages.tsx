import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Check, FileText, Mail, MapPin, MessageCircle, Phone, Quote, ShieldCheck } from "lucide-react";
import { authorizations, cases, clients, company, corporatePurpose, economicActivities, services, supplierProducts, team, timeline, type CaseStudy, type Service } from "@/lib/content";
import { copy } from "@/lib/copy";
import { heroSlides } from "@/lib/hero-slides";
import { formatMoney, href, t, type Locale } from "@/lib/i18n";
import { CaseCard } from "./cards";
import { CaseGrid } from "./case-grid";
import { ContactForm } from "./contact-form";
import { Gallery } from "./gallery";
import { HomeHero } from "./home-hero";
import { Registers } from "./registers";
import { Breadcrumbs, ButtonLink, ClientLogos, ContactBand, Methodology, PageHero, Photo, SectionHeading, ServiceCard, ServiceIcon, toCaseCard, TrustItems } from "./site";

export function HomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const featured = services.filter((service) => service.featured && service.id !== "adjusting");
  return <>
    <HomeHero locale={locale} slides={heroSlides[locale]} whatsapp={company.whatsapp} />
    <div className="hero-bottom home-hero-facts"><div className="container hero-bottom-inner"><div><span>{c.since}</span><strong>{c.sinceValue}</strong></div><div><span>{c.authorized}</span><strong>16 <BadgeCheck size={19} strokeWidth={1.6} aria-hidden="true" /></strong></div><div><span>{c.offices}</span><strong>{c.officeValue}</strong></div><Link href="#expertise" className="hero-scroll" aria-label={c.explore}><ArrowDown size={20} /></Link></div></div>

    <section className="home-clients"><div className="container"><div className="clients-heading"><p>{c.clientsEyebrow}</p><Link href={href(locale, "experience")}>{c.clientsTitle}<ArrowUpRight size={15} aria-hidden="true" /></Link></div><ClientLogos locale={locale} /></div></section>

    <section className="section expertise-section" id="expertise"><div className="container"><SectionHeading eyebrow={c.specialtyEyebrow} title={c.specialtyTitle} description={c.specialtyIntro} action={<Link href={href(locale, "services")} className="text-link">{c.allServices}<ArrowUpRight size={18} aria-hidden="true" /></Link>} /><div className="service-grid">{featured.map((service) => <ServiceCard service={service} locale={locale} key={service.id} />)}</div></div></section>

    <section className="core-section"><div className="container core-inner"><div className="core-photo"><Photo name="transformer-inspection" alt={locale === "es" ? "Inspección técnica de un transformador de potencia" : "Technical inspection of a power transformer"} /><div className="photo-annotation"><FileText size={22} strokeWidth={1.5} aria-hidden="true" /><span>{locale === "es" ? "Evidencia, análisis y trazabilidad." : "Evidence, analysis and traceability."}</span></div></div><div className="core-copy"><p className="eyebrow">{c.coreLabel}</p><h2>{c.coreTitle}</h2><p>{c.coreIntro}</p><ul className="check-list">{services[0].scope.slice(0, 4).map((scope, index) => <li key={index}><Check size={17} aria-hidden="true" />{t(scope, locale)}</li>)}</ul><ButtonLink to={href(locale, "services", "adjusting")}>{c.viewService}</ButtonLink></div></div></section>

    <section className="section home-cases"><div className="container"><SectionHeading eyebrow={c.caseEyebrow} title={c.caseTitle} description={c.caseIntro} action={<Link href={href(locale, "experience")} className="text-link">{c.allCases}<ArrowUpRight size={18} aria-hidden="true" /></Link>} /><div className="case-grid">{[cases[0], cases[4], cases[3]].map((item) => <CaseCard key={item.id} item={toCaseCard(item, locale)} action={c.viewCase} settlement={c.settlement} />)}</div><p className="source-note">{c.settlementNote}</p></div></section>

    <Methodology locale={locale} />

    <section className="section home-team"><div className="container home-team-inner"><div><p className="eyebrow">{c.teamEyebrow}</p><h2>{c.teamTitle}</h2><p>{c.teamIntro}</p><Link href={href(locale, "team")} className="text-link">{c.meetTeam}<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="team-preview">{[team[0], team[1], team[2]].map((person) => <div key={person.id} className="team-preview-person"><div className="portrait"><Image src={`/images/team/${person.id}.webp`} alt={person.name} fill sizes="(max-width: 700px) 30vw, 17vw" /></div><h3>{person.name}</h3><p>{t(person.specialty, locale)}</p></div>)}</div></div></section>
    <ContactBand locale={locale} />
  </>;
}

export function AboutPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><PageHero locale={locale} section="about" eyebrow={c.aboutEyebrow} title={c.aboutTitle} description={c.aboutIntro} /><section className="section"><div className="container about-intro"><div className="about-photos"><Photo name="tg5-turbine" alt={locale === "es" ? "Maquinaria de generación inspeccionada por SEAJUSTE" : "Power generation machinery surveyed by SEAJUSTE"} /><Photo name="cargo-unloading-2" alt={locale === "es" ? "Inspección de carga y descarga en puerto" : "Port cargo and unloading inspection"} /><span className="about-archive-label">{c.historicImage}</span></div><div className="about-philosophy"><p className="eyebrow">{c.philosophy}</p><h2>{locale === "es" ? "La confianza se gana.\nEl conocimiento la sostiene." : "Trust is earned.\nKnowledge sustains it."}</h2><p>{c.philosophyText}</p><TrustItems locale={locale} /></div></div></section><section className="purpose-section"><div className="container purpose-grid"><div><span className="purpose-icon"><ShieldCheck size={25} strokeWidth={1.5} /></span><h2>{c.mission}</h2><p>{c.missionText}</p></div><div><span className="purpose-icon"><ArrowUpRight size={27} strokeWidth={1.5} /></span><h2>{c.vision}</h2><p>{c.visionText}</p></div></div></section><section className="section"><div className="container history-layout"><div className="history-heading"><SectionHeading eyebrow={c.historyEyebrow} title={c.historyTitle} description={c.historyIntro} /><div className="history-person"><div className="portrait"><Image src="/images/team/carlos-quevedo.webp" alt="Carlos Quevedo" fill sizes="70px" /></div><div><strong>Carlos Quevedo</strong><span>{t(team[0].role, locale)}</span></div></div></div><ol className="timeline">{timeline.map((event) => <li key={event.year}><span className="timeline-year">{event.year}</span><div><h3>{t(event.title, locale)}</h3><p>{t(event.detail, locale)}</p></div></li>)}</ol></div></section><section className="international-section"><div className="container international-inner"><Quote size={38} strokeWidth={1.2} aria-hidden="true" /><div><p className="eyebrow">ECUADOR ↔ LONDON</p><h2>{c.international}</h2><p>{c.internationalText}</p></div><Link href={href(locale, "experience")} className="text-link">{c.allCases}<ArrowUpRight size={18} /></Link></div></section><ContactBand locale={locale} /></>;
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><PageHero locale={locale} section="services" eyebrow={c.servicesEyebrow} title={c.servicesTitle} description={c.servicesIntro} /><section className="section"><div className="container"><div className="service-feature"><Photo name="electrical-testing" alt={locale === "es" ? "Pruebas de campo de equipos eléctricos" : "Field testing of electrical equipment"} /><div><span className="eyebrow">{c.coreLabel}</span><h2>{t(services[0].title, locale)}</h2><p>{t(services[0].summary, locale)}</p><ul className="check-list">{services[0].scope.slice(0, 3).map((scope, index) => <li key={index}><Check size={17} aria-hidden="true" />{t(scope, locale)}</li>)}</ul><ButtonLink to={href(locale, "services", "adjusting")}>{c.viewService}</ButtonLink></div></div><div className="service-grid primary-services">{services.filter((service) => service.featured && service.id !== "adjusting").map((service) => <ServiceCard service={service} locale={locale} key={service.id} />)}</div></div></section><section className="section section-tint"><div className="container"><SectionHeading title={c.complementaryTitle} description={c.complementaryIntro} /><div className="service-grid">{services.filter((service) => !service.featured).map((service) => <ServiceCard key={service.id} service={service} locale={locale} />)}</div></div></section><section className="section coverage-section"><div className="container"><SectionHeading title={c.coverageTitle} description={c.coverageIntro} action={<Link className="text-link" href={href(locale, "credentials")}>{c.nav.credentials}<ArrowUpRight size={18} /></Link>} /><div className="coverage-tags">{authorizations.map((authorization, index) => <span key={index}>{t(authorization, locale)}</span>)}<span>{locale === "es" ? "Fenómenos de la naturaleza" : "Natural perils"}</span></div></div></section><Methodology locale={locale} /><ContactBand locale={locale} /></>;
}

export function ServicePage({ locale, service }: { locale: Locale; service: Service }) {
  const c = copy[locale];
  const categoryMap: Record<string, string[]> = { energy: ["energy"], marine: ["marine"], civil: ["civil"], vehicles: ["vehicles"], equipment: ["equipment"] };
  const related = cases.filter((item) => (categoryMap[service.id] ?? ["energy", "marine", "civil"]).includes(item.category)).slice(0, 3);
  return <><section className="detail-hero"><div className="container"><Breadcrumbs locale={locale} section="services" current={t(service.shortTitle, locale)} /><div className="detail-hero-inner"><div><span className="service-icon"><ServiceIcon name={service.icon} size={29} /></span><p className="eyebrow">{t(service.discipline, locale)}</p><h1>{t(service.title, locale)}</h1><p>{t(service.summary, locale)}</p><ButtonLink to={href(locale, "contact")}>{c.contactAction}</ButtonLink></div><Photo name={service.image} alt={t(service.title, locale)} eager /></div></div></section><section className="section"><div className="container detail-content"><div className="prose"><p className="eyebrow">{c.approachTitle}</p><h2>{t(service.title, locale)}</h2>{service.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph, locale)}</p>)}</div><aside className="scope-panel"><p className="eyebrow">SEAJUSTE</p><h2>{c.scopeTitle}</h2><ul className="check-list">{service.scope.map((scope, index) => <li key={index}><Check size={17} aria-hidden="true" />{t(scope, locale)}</li>)}</ul><a href={company.brochure} className="text-link" download>{c.download}<ArrowDown size={17} /></a></aside></div></section><section className="section section-tint"><div className="container"><SectionHeading eyebrow={c.methodologyEyebrow} title={c.whyTitle} description={c.whyText} /><Methodology locale={locale} compact /></div></section><section className="section"><div className="container"><SectionHeading title={c.relatedCases} action={<Link className="text-link" href={href(locale, "experience")}>{c.allCases}<ArrowUpRight size={18} /></Link>} /><div className="case-grid">{related.map((item) => <CaseCard key={item.id} item={toCaseCard(item, locale)} action={c.viewCase} settlement={c.settlement} />)}</div></div></section><ContactBand locale={locale} /></>;
}

export function ExperiencePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const filters = { all: c.all, search: c.searchCases, categories: c.categories, action: c.viewCase, settlement: c.settlement, empty: c.empty, clear: c.clear, results: c.results, resultSingular: c.resultSingular };
  return <>
    <PageHero locale={locale} section="experience" eyebrow={c.experienceEyebrow} title={c.experienceTitle} description={c.experienceIntro} />
    <section className="section settlements-section"><div className="container">
      <p className="eyebrow">{c.settlement}</p>
      <div className="settlement-strip">{cases.filter((item) => item.value).map((item) => <Link key={item.id} href={href(locale, "experience", item.id)}><strong>{formatMoney(item.value!, locale)}</strong><span>{item.client} · {t(item.title, locale)}</span><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>
      <p className="source-note">{c.settlementNote}</p>
    </div></section>
    <section className="section experience-archive"><div className="container"><CaseGrid items={cases.map((item) => toCaseCard(item, locale))} labels={filters} /></div></section>
    <section className="section section-tint"><div className="container">
      <SectionHeading eyebrow={c.clientsEyebrow} title={c.clientsTitle} description={c.clientsIntro} /><ClientLogos locale={locale} all />
      <p className="source-note">{locale === "es" ? `Referencias del brochure corporativo · ${clients.length} empresas e instituciones.` : `Corporate brochure references · ${clients.length} companies and institutions.`}</p>
    </div></section>
    <ContactBand locale={locale} />
  </>;
}

export function CasePage({ locale, item }: { locale: Locale; item: CaseStudy }) {
  const c = copy[locale];
  const related = cases.filter((candidate) => candidate.category === item.category && candidate.id !== item.id).slice(0, 3);
  return <><section className="case-detail-hero"><div className="container"><Breadcrumbs locale={locale} section="experience" current={t(item.title, locale)} /><div className="case-detail-heading"><div><p className="eyebrow">{c.categories[item.category]} · {item.client}</p><h1>{t(item.title, locale)}</h1><p><MapPin size={16} aria-hidden="true" />{t(item.location, locale)}</p></div><Link href={href(locale, "experience")} className="text-link"><ArrowLeft size={17} aria-hidden="true" />{c.allCases}</Link></div><Photo name={item.images[0]} alt={t(item.title, locale)} className="case-cover" eager sizes="(max-width: 1200px) 100vw, 1200px" /></div></section><section className="section"><div className="container detail-content"><div className="prose"><p className="eyebrow">{c.documented}</p><h2>{c.caseDetailTitle}</h2><p className="lead-paragraph">{t(item.summary, locale)}</p>{item.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph, locale)}</p>)}</div><aside className="scope-panel case-facts"><p className="eyebrow">{c.caseDetails}</p><h2>{item.client}</h2><p>{t(item.location, locale)}</p>{item.value && <div className="case-value detail-value"><span>{c.settlement}</span><strong>{formatMoney(item.value, locale)}</strong><small>{c.settlementNote}</small></div>}{item.facts && <dl>{item.facts.map((fact, index) => <div key={index}><dt>{t(fact.label, locale)}</dt><dd>{t(fact.value, locale)}</dd></div>)}</dl>}<ButtonLink to={href(locale, "contact")}>{c.contactAction}</ButtonLink></aside></div></section><section className="section section-tint"><div className="container"><SectionHeading eyebrow={c.historicImage} title={c.gallery} /><Gallery title={t(item.title, locale)} images={item.images.map((image) => `/images/projects/${image}.webp`)} labels={{ open: c.openPhoto, close: c.closePhoto, previous: c.previousPhoto, next: c.nextPhoto, photo: c.photo, of: c.of, more: c.showMore, less: c.showLess }} /></div></section>{item.documents && <section className="section"><div className="container"><SectionHeading title={c.caseDocuments} /><div className="document-grid">{item.documents.map((document) => <a key={document.href} href={document.href} className="document-card" target="_blank" rel="noopener noreferrer"><FileText size={28} strokeWidth={1.5} aria-hidden="true" /><div><h3>{t(document.title, locale)}</h3><span>{c.original}</span></div><ArrowUpRight size={21} aria-hidden="true" /></a>)}</div></div></section>}{related.length > 0 && <section className="section"><div className="container"><SectionHeading title={c.relatedCases} /><div className="case-grid">{related.map((candidate) => <CaseCard item={toCaseCard(candidate, locale)} key={candidate.id} action={c.viewCase} settlement={c.settlement} />)}</div></div></section>}<ContactBand locale={locale} /></>;
}

export function TeamPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const leader = team[0];
  return <><PageHero locale={locale} section="team" eyebrow={c.teamEyebrow} title={c.teamPageTitle} description={c.teamPageIntro} /><section className="section"><div className="container leader-card"><div className="leader-portrait"><Image src={`/images/team/${leader.id}.webp`} alt={leader.name} fill sizes="(max-width: 650px) 80vw, 320px" /></div><div><p className="eyebrow">{c.teamLeader}</p><h2>{leader.name}</h2><p className="leader-role">{t(leader.role, locale)}</p><p>{c.teamLeaderText}</p><Link href={href(locale, "about")} className="text-link">{c.historyEyebrow}<ArrowUpRight size={18} aria-hidden="true" /></Link></div><span className="leader-mark" aria-hidden="true">S</span></div></section><section className="section section-tint"><div className="container"><SectionHeading title={c.specialists} description={c.teamIntro} /><div className="team-grid">{team.slice(1).map((person) => <article className="team-card" key={person.id}><div className="portrait"><Image src={`/images/team/${person.id}.webp`} alt={person.name} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 23vw" /></div><div className="team-card-text"><span className="data-label">{t(person.specialty, locale)}</span><h3>{person.name}</h3><p>{t(person.role, locale)}</p>{person.background && <small>{typeof person.background === "string" ? person.background : t(person.background, locale)}</small>}</div></article>)}</div><p className="source-note">{c.teamNote}</p></div></section><ContactBand locale={locale} /></>;
}

export function CredentialsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const registerGroups = [
    { title: c.activityTitle, rows: economicActivities.map((item) => ({ code: item.code, description: t(item.description, locale) })) },
    { title: c.supplierTitle, rows: supplierProducts.map(([code, description]) => ({ code, description: t(description, locale) })) },
  ];
  const registerLabels = { search: c.searchRegisters, code: c.code, description: c.description, empty: c.empty, clear: c.clear, results: c.registerResults, resultSingular: c.registerResultSingular };
  return <>
    <PageHero locale={locale} section="credentials" eyebrow={c.credentialsEyebrow} title={c.credentialsTitle} description={c.credentialsIntro} />
    <section className="section credentials-identity"><div className="container"><dl className="identity-grid"><div><dt>{c.legalName}</dt><dd>{company.legalName}</dd></div><div><dt>{c.taxId}</dt><dd className="identity-tax">{company.taxId}</dd></div><div><dt>{c.deed}</dt><dd>{c.deedValue}<p>{c.notary}</p></dd></div></dl></div></section>
    <section className="section authorization-section"><div className="container">
      <SectionHeading eyebrow={c.certificateAuthority} title={c.certificateTitle} description={c.certificateDate} action={<a className="text-link" href="/documents/brochure-page-38.webp" target="_blank" rel="noopener noreferrer">{c.original}<ArrowUpRight size={18} /></a>} />
      <ol className="authorization-grid">{authorizations.map((authorization, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{t(authorization, locale)}</p><BadgeCheck size={20} strokeWidth={1.4} aria-hidden="true" /></li>)}</ol>
    </div></section>
    <section className="section"><div className="container corporate-layout">
      <div><SectionHeading title={c.purposeTitle} description={c.purposeIntro} /><p>{c.purposeAudience}</p><a href="/documents/brochure-page-39.webp" target="_blank" rel="noopener noreferrer" className="text-link">{c.original}<ArrowUpRight size={18} /></a></div>
      <ul className="corporate-list">{corporatePurpose.map((purpose, index) => <li key={index}><Check size={16} aria-hidden="true" /><span>{t(purpose, locale)}</span></li>)}</ul>
    </div></section>
    <section className="section section-tint"><div className="container">
      <SectionHeading eyebrow={c.credentialsEyebrow} title={locale === "es" ? "Registros y actividades" : "Registers & activities"} description={c.registerIntro} />
      <Registers groups={registerGroups} labels={registerLabels} />
      <p className="source-note">{c.registerReference}</p>
      <div className="register-download"><ButtonLink to={company.brochure} variant="outline" download>{c.downloadFull}</ButtonLink></div>
    </div></section>
    <ContactBand locale={locale} />
  </>;
}

export function ContactPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><PageHero locale={locale} section="contact" eyebrow={c.contactEyebrow} title={c.contactTitle} description={c.contactIntro} /><section className="section contact-section"><div className="container contact-layout"><div className="contact-information"><p className="eyebrow">{c.directContact}</p><a className="direct-contact" href={company.phoneHref}><span className="contact-icon"><Phone size={23} strokeWidth={1.5} aria-hidden="true" /></span><span><small>{c.phone}</small><strong>{company.phone}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></a><a className="direct-contact" href={`mailto:${company.email}`}><span className="contact-icon"><Mail size={23} strokeWidth={1.5} aria-hidden="true" /></span><span><small>{c.email}</small><strong>{company.email}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></a><a className="text-link whatsapp-direct" href={company.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" />{c.whatsapp}<ArrowUpRight size={17} aria-hidden="true" /></a><h2 className="office-heading">{c.contactOffice}</h2><div className="office-list">{company.offices.map((office) => <article className="office-card" key={office.city}><div><MapPin size={20} strokeWidth={1.5} aria-hidden="true" /><h3>{office.city}<span>{c.officeCountry}</span></h3></div><address><strong>{t(office.building, locale)}</strong><br />{t(office.office, locale)}<br />{office.street}</address><a href={office.map} target="_blank" rel="noopener noreferrer" className="text-link">{c.mapAction}<ArrowUpRight size={16} aria-hidden="true" /></a></article>)}</div></div><ContactForm locale={locale} options={services.map((service) => ({ id: service.id, title: t(service.title, locale) }))} labels={c} /></div></section><section className="contact-assurance"><div className="container"><ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" /><p>{c.values.join(" · ")}</p><Link href={href(locale, "credentials")}>{c.nav.credentials}<ArrowRight size={16} aria-hidden="true" /></Link></div></section></>;
}
