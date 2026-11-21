import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { experienceCases } from "@/lib/experience/cases";
import { experienceCopy } from "@/lib/experience/copy";
import { experienceHref } from "@/lib/experience/routes";
import type { ExperienceCase, ExperienceImage } from "@/lib/experience/types";
import { homeFontClassName } from "@/lib/home-fonts";
import { formatMoney, href, t, type Locale } from "@/lib/i18n";
import { Breadcrumbs } from "../site";
import { ExperienceBrowser } from "./case-browser";
import { ExperienceCard, toExperienceCard } from "./case-card";
import { ExperienceGallery, type ExperienceGalleryImage } from "./gallery";
import styles from "./experience.module.css";

function galleryImages(images: ExperienceImage[], locale: Locale): ExperienceGalleryImage[] {
  return images.map((photo) => ({ src: photo.src, alt: t(photo.alt, locale), caption: t(photo.caption, locale), contextual: photo.contextual, credit: photo.credit }));
}

function ExperienceEnquiry({ locale }: { locale: Locale }) {
  const c = experienceCopy[locale];
  return <section className={styles.enquiry} aria-labelledby="experience-enquiry-title">
    <div><h2 id="experience-enquiry-title">{c.enquiryTitle}</h2><p>{c.enquiryText}</p></div>
    <Link className={styles.primaryAction} href={`${href(locale, "contact")}#consulta`}>{c.contact}<ArrowUpRight size={19} aria-hidden="true" /></Link>
  </section>;
}

export function ExperiencePage({ locale }: { locale: Locale }) {
  const c = experienceCopy[locale];
  const featured = experienceCases.find((item) => item.id === "pascuales")!;
  const cover = featured.images[0];
  return <div className={`${styles.page} ${homeFontClassName}`}>
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.breadcrumbs}><Breadcrumbs locale={locale} section="experience" /></div>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}><p className={styles.eyebrow}>{c.eyebrow}</p><h1>{c.title}</h1><p className={styles.heroIntro}>{c.intro}</p><a className={styles.primaryAction} href="#intervenciones">{c.browse}<ArrowDown size={19} aria-hidden="true" /></a></div>
          <figure className={styles.heroFigure}>
            <Link href={experienceHref(locale, featured.id)} className={styles.heroImage} aria-label={`${c.view}: ${t(featured.title, locale)}`}><Image src={cover.src} alt={t(cover.alt, locale)} fill sizes="(max-width: 850px) 100vw, 50vw" loading="eager" fetchPriority="high" /><span>{c.heroReference}<ArrowUpRight size={20} aria-hidden="true" /></span></Link>
            <figcaption>{t(featured.title, locale)}<small>{cover.credit}</small></figcaption>
          </figure>
        </div>
      </div>
    </header>
    <section className={styles.archive} id="intervenciones" aria-labelledby="experience-archive-title"><div className="container">
      <div className={styles.archiveHeading}><h2 id="experience-archive-title">{c.archiveTitle}</h2><p>{c.archiveIntro}</p></div>
      <ExperienceBrowser items={experienceCases.map((item) => toExperienceCard(item, locale))} locale={locale} />
    </div></section>
    <div className="container">
      <aside className={styles.editorialNote}><FileText size={23} strokeWidth={1.5} aria-hidden="true" /><div><h2>{c.noteTitle}</h2><p>{c.note}</p></div></aside>
      <ExperienceEnquiry locale={locale} />
    </div>
  </div>;
}

export function ExperienceCasePage({ item, locale }: { item: ExperienceCase; locale: Locale }) {
  const c = experienceCopy[locale];
  const title = t(item.title, locale);
  const cover = item.images[0];
  const related = item.related.flatMap((id) => {
    const candidate = experienceCases.find((entry) => entry.id === id);
    return candidate ? [candidate] : [];
  });
  return <article className={`${styles.page} ${styles.detailPage} ${homeFontClassName}`}>
    <header className={styles.detailHero}><div className="container">
      <div className={styles.breadcrumbs}><Breadcrumbs locale={locale} section="experience" current={title} /></div>
      <Link className={styles.backLink} href={`${experienceHref(locale)}#intervenciones`}><ArrowLeft size={17} aria-hidden="true" />{c.back}</Link>
      <div className={styles.detailHeroLayout}>
        <div className={styles.detailHeading}><p className={styles.eyebrow}>{c.kinds[item.kind]} · {c.equipment[item.equipment]}</p><h1>{title}</h1><p className={styles.detailSummary}>{t(item.summary, locale)}</p><div className={styles.detailTags}>{item.specialties.map((specialty) => <span key={specialty}>{c.specialties[specialty]}</span>)}</div></div>
        {cover ? <figure className={styles.coverFigure}><div className={styles.coverImage}><Image src={cover.src} alt={t(cover.alt, locale)} fill sizes="(max-width: 850px) 100vw, 50vw" loading="eager" fetchPriority="high" /></div><figcaption>{cover.contextual && <span className={styles.captionLabel}>{c.contextual}</span>}{t(cover.caption, locale)}{cover.credit && <small>{cover.credit}</small>}</figcaption></figure>
          : item.citation && <figure className={styles.pressQuote}><FileText size={30} strokeWidth={1.3} aria-hidden="true" /><blockquote>“{t(item.citation.quote, locale)}”</blockquote><figcaption>{t(item.citation.attribution, locale)}</figcaption></figure>}
      </div>
    </div></header>
    <div className="container">
      <div className={styles.detailLayout}>
        <div className={styles.detailBody}>
          <section aria-labelledby="experience-context"><h2 id="experience-context">{c.context}</h2><p>{t(item.context, locale)}</p></section>
          <section aria-labelledby="experience-intervention"><h2 id="experience-intervention">{c.intervention}</h2><p>{t(item.intervention, locale)}</p></section>
          <section className={styles.scope} aria-labelledby="experience-scope"><h2 id="experience-scope">{c.scope}</h2><ul>{item.scope.map((entry, index) => <li key={index}>{t(entry, locale)}</li>)}</ul></section>
          {item.settlement !== undefined && <section className={styles.settlement} aria-labelledby="experience-settlement"><h2 id="experience-settlement">{c.settlement}</h2><p>{formatMoney(item.settlement, locale)}</p><small>{c.settlementNote}</small></section>}
        </div>
        <aside className={styles.facts} aria-labelledby="experience-facts"><h2 id="experience-facts">{c.facts}</h2><dl>
          <div><dt>{c.client}</dt><dd>{t(item.client, locale)}</dd></div>
          <div><dt>{c.location}</dt><dd>{t(item.location, locale)}</dd></div>
          <div><dt>{c.nature}</dt><dd>{c.kinds[item.kind]}</dd></div>
          {item.facts.map((entry, index) => <div key={index}><dt>{t(entry.label, locale)}</dt><dd>{t(entry.value, locale)}</dd></div>)}
        </dl><div className={styles.evidence}><FileText size={19} aria-hidden="true" /><h3>{c.source}</h3><p>{t(item.evidence, locale)}</p></div></aside>
      </div>
      {item.sections && <section className={styles.inspectionRecords} aria-labelledby="experience-records-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>{c.record}</p><h2 id="experience-records-title">{c.records}</h2></div>
        {item.sections.map((record, index) => <section className={styles.inspectionRecord} key={index} aria-labelledby={`experience-record-${index}`}><div className={styles.recordIntro}><h3 id={`experience-record-${index}`}>{t(record.title, locale)}</h3><p>{t(record.text, locale)}</p></div>{record.images && <ExperienceGallery images={galleryImages(record.images, locale)} title={t(record.title, locale)} locale={locale} />}</section>)}
      </section>}
      {item.documents && <section className={styles.documents} aria-labelledby="experience-documents-title"><div className={styles.sectionHeading}><h2 id="experience-documents-title">{c.documentation}</h2></div>
        {item.documents.map((document) => <article className={styles.document} key={document.href}><a className={styles.documentPreview} href={document.href} target="_blank" rel="noopener noreferrer" aria-label={`${c.openDocument}: ${t(document.title, locale)}`}><Image src={document.preview} alt={t(document.title, locale)} width={document.width} height={document.height} sizes="(max-width: 850px) 100vw, 60vw" /></a><div><FileText size={25} strokeWidth={1.5} aria-hidden="true" /><h3>{t(document.title, locale)}</h3><p>{t(document.description, locale)}</p><a href={document.href} className={styles.inlineLink} target="_blank" rel="noopener noreferrer">{c.openDocument}<ArrowUpRight size={17} aria-hidden="true" /></a></div></article>)}
      </section>}
      {item.images.length > 0 && <section className={styles.gallerySection} aria-labelledby="experience-gallery-title"><div className={styles.sectionHeading}><h2 id="experience-gallery-title">{c.gallery}</h2><p>{c.galleryIntro}</p></div><ExperienceGallery images={galleryImages(item.images, locale)} title={title} locale={locale} /></section>}
      {related.length > 0 && <section className={styles.related} aria-labelledby="experience-related-title"><div className={styles.sectionHeading}><h2 id="experience-related-title">{c.related}</h2><Link className={styles.inlineLink} href={experienceHref(locale)}>{c.back}<ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className={styles.caseGrid}>{related.map((entry) => <ExperienceCard key={entry.id} item={toExperienceCard(entry, locale)} labels={c} />)}</div></section>}
      <ExperienceEnquiry locale={locale} />
    </div>
  </article>;
}
