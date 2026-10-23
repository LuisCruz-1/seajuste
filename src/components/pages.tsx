import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, FileText, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { authorizations, cases, clients, company, companyHistory, companyHistoryDocuments, corporatePurpose, economicActivities, services, supplierProducts, team, type CaseStudy, type Service } from "@/lib/content";
import { copy } from "@/lib/copy";
import { heroCoverageAdditionalClasses, heroCoverageLabels, heroInterventionRows, heroSlides } from "@/lib/hero-slides";
import { aboutAnchors, formatMoney, href, t, type Locale } from "@/lib/i18n";
import { CaseCard } from "./cards";
import { CaseGrid } from "./case-grid";
import { ContactForm } from "./contact-form";
import { Gallery } from "./gallery";
import { HomeHero } from "./home-hero";
import { PdfDocument } from "./pdf-document";
import { Registers } from "./registers";
import { Breadcrumbs, ButtonLink, ClientLogos, ContactBand, Methodology, PageHero, Photo, SectionHeading, ServiceCard, ServiceIcon, toCaseCard } from "./site";

export function HomePage({ locale }: { locale: Locale }) {
  const settledCases = cases.filter((item) => item.value);
  const settlementSummary = { amount: settledCases.reduce((total, item) => total + (item.value ?? 0), 0), caseCount: settledCases.length };
  const interventionCases = heroInterventionRows.map((row) => {
    const item = cases.find((candidate) => candidate.id === row.id);
    if (item?.value === undefined) throw new Error(`Missing documented settlement for ${row.id}`);
    return { id: row.id, client: item.client, equipment: t(row.equipment, locale), unit: t(row.unit, locale), location: t(row.location, locale), value: item.value };
  });
  const insuranceClasses = [...authorizations.map((item, index) => t(heroCoverageLabels[index] ?? item, locale)), ...heroCoverageAdditionalClasses.map((item) => t(item, locale))];
  return <HomeHero locale={locale} slides={heroSlides[locale]} insuranceClasses={insuranceClasses} settlementSummary={settlementSummary} interventionCases={interventionCases} />;
}

function AboutContactActions({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const contact = href(locale, "contact");
  return <div className="about-contact-actions">
    <Link className="button hero-consult-action" href={`${contact}#consulta`}>{c.consultationAction}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    <Link className="button hero-meeting-action" href={`${contact}#reunion`}>{c.meetingTab}<CalendarDays size={18} aria-hidden="true" /></Link>
  </div>;
}

export function AboutPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><section className="section company-profile"><div className="container">
    <header className="company-profile-heading"><h1>{c.aboutTitle}</h1><p>{c.aboutStatement}</p></header>
    <div className="company-profile-layout">
      <div className="company-profile-visual"><Image src="/images/brand/about-company-turbine.webp" alt={c.aboutImageAlt} width={435} height={518} sizes="(max-width: 950px) 90vw, 43vw" loading="eager" /></div>
      <div className="company-profile-copy">
        <h2 className="company-identity-title" id={aboutAnchors.identity} tabIndex={-1}>{c.identity}</h2>
        <section className="company-philosophy" aria-labelledby="company-philosophy-title"><h3 id="company-philosophy-title">{c.philosophy}</h3><p className="company-philosophy-lead">{c.philosophyLead}</p><p>{c.philosophyText}</p></section>
        <div className="company-purpose-grid">
          <section className="company-mission" aria-labelledby="company-mission-title"><h3 id="company-mission-title">{c.mission}</h3><p>{c.missionText}</p></section>
          <section className="company-vision" aria-labelledby="company-vision-title"><h3 id="company-vision-title">{c.vision}</h3><p>{c.visionText}</p></section>
        </div>
        <AboutContactActions locale={locale} />
      </div>
    </div>
  </div></section>
  <section className="section company-origins" id="company-history"><div className="container history-origins-layout" id={aboutAnchors.history} tabIndex={-1}>
    <figure className="history-origins-visual">
      <PdfDocument document={companyHistory.pdf} title={c.historyStoryTitle} actionLabel={c.historyOpen} locale={locale} />
      <figcaption>{c.historyCredentials}</figcaption>
    </figure>
    <div className="history-origins-copy">
      <SectionHeading eyebrow={c.historySince} title={c.historyStoryTitle} />
      {companyHistory.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph, locale)}</p>)}
    </div>
  </div></section>
  {companyHistoryDocuments.map((document) => <section className={`section company-history${document.section === "claims" ? "" : " section-tint"}`} id={document.section === "review" ? "history-documents" : `${document.section}-documents`} key={document.id}><div className="container" id={document.section === "claims" ? aboutAnchors.london : undefined} tabIndex={document.section === "claims" ? -1 : undefined}>
    <SectionHeading eyebrow={document.section === "review" ? c.historyEyebrow : undefined} title={c.historySections[document.section]} description={document.section === "review" ? c.historyIntro : undefined} />
    <article className="history-document-card" id={document.id} aria-labelledby={`${document.id}-title`}>
      <div className="history-document-copy">
        <time dateTime={document.date}>{t(document.dateLabel, locale)}</time>
        <h3 id={`${document.id}-title`}>{t(document.title, locale)}</h3>
        <p className="history-document-reference">{t(document.reference, locale)}</p>
        {document.details.map((detail, index) => <div className="history-document-detail" key={index}>
          {detail.heading && <h4>{t(detail.heading, locale)}</h4>}
          <p>{Array.isArray(detail.text) ? detail.text.map((part, partIndex) => part.emphasis ? <strong key={partIndex}>{t(part.text, locale)}</strong> : t(part.text, locale)) : t(detail.text, locale)}</p>
        </div>)}
        {document.excerpts && <div className="history-document-excerpts"><p className="data-label">{c.historyExcerpts}</p><blockquote><p>“{document.excerpts.map((excerpt) => t(excerpt, locale)).join(" ")}”</p></blockquote></div>}
        {document.settlement !== undefined && <dl className="history-document-settlement"><dt>{c.historySettlement}</dt><dd>{formatMoney(document.settlement, locale)}</dd></dl>}
      </div>
      <PdfDocument document={document.pdf} title={t(document.title, locale)} actionLabel={c.historyOpen} locale={locale} />
    </article>
    {document.section === "reinsurance" && <div className="about-contact-closing">
      <div><h3>{c.contactAction}</h3><p>{c.contactIntro}</p></div>
      <AboutContactActions locale={locale} />
    </div>}
  </div></section>)}</>;
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
  return <>
    <PageHero locale={locale} section="contact" eyebrow={c.contactEyebrow} title={c.contactTitle} description={c.contactIntro} />
    <section className="section contact-section"><div className="container contact-layout">
      <ContactForm locale={locale} options={services.map((service) => ({ id: service.id, title: t(service.title, locale) }))} labels={c} whatsapp={company.whatsapp} />
      <aside className="contact-information" aria-label={c.directContact}>
        <p className="eyebrow">{c.directContact}</p>
        <a className="direct-contact" href={company.phoneHref}><span className="contact-icon"><Phone size={23} strokeWidth={1.5} aria-hidden="true" /></span><span><small>{c.phone}</small><strong>{company.phone}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></a>
        <a className="direct-contact" href={`mailto:${company.email}`}><span className="contact-icon"><Mail size={23} strokeWidth={1.5} aria-hidden="true" /></span><span><small>{c.email}</small><strong>{company.email}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></a>
        <a className="text-link whatsapp-direct" href={company.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" />{c.whatsapp}<ArrowUpRight size={17} aria-hidden="true" /></a>
        <h2 className="office-heading">{c.contactOffice}</h2>
        <div className="office-list">{company.offices.map((office) => <article className="office-card" key={office.city}><div><MapPin size={20} strokeWidth={1.5} aria-hidden="true" /><h3>{office.city}<span>{c.officeCountry}</span></h3></div><address><strong>{t(office.building, locale)}</strong><br />{t(office.office, locale)}<br />{office.street}</address><a href={office.map} target="_blank" rel="noopener noreferrer" className="text-link">{c.mapAction}<ArrowUpRight size={16} aria-hidden="true" /></a></article>)}</div>
      </aside>
    </div></section>
    <section className="contact-assurance"><div className="container"><ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" /><p>{c.values.join(" · ")}</p><Link href={href(locale, "credentials")}>{c.nav.credentials}<ArrowRight size={16} aria-hidden="true" /></Link></div></section>
  </>;
}
