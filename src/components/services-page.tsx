import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";
import { homeFontClassName } from "@/lib/home-fonts";
import { href, t, type Locale } from "@/lib/i18n";
import { serviceDocumentCoverage, serviceDocumentSpecialties, servicesDocument, type ServiceDocumentPhoto } from "@/lib/services-document";
import { Breadcrumbs } from "./site";

function ServiceDocumentPhotos({ photos, locale, eager = false }: { photos: ServiceDocumentPhoto[]; locale: Locale; eager?: boolean }) {
  const columns = photos.length === 4 ? 4 : 3;
  return <div className={`services-document-photos services-document-photos-${columns}`}>
    {photos.map((photo) => <figure key={photo.image}>
      <div className="services-document-photo">
        <Image src={`/images/services/${photo.image}.webp`} alt={t(photo.alt, locale)} fill sizes={columns === 4 ? "(max-width: 640px) 90vw, (max-width: 950px) 44vw, 23vw" : "(max-width: 640px) 90vw, (max-width: 1340px) 30vw, 404px"} loading={eager ? "eager" : "lazy"} />
      </div>
      <figcaption>{t(photo.caption, locale)}</figcaption>
    </figure>)}
  </div>;
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const { introduction, traceability, consultation } = servicesDocument;
  return <div className={`services-document-page ${homeFontClassName}`}>
    <header className="services-document-header"><div className="container">
      <Breadcrumbs locale={locale} section="services" />
      <h1>{c.servicesEyebrow}</h1>
    </div></header>

    <section className="services-document-section services-document-introduction" aria-labelledby="services-introduction-title"><div className="container">
      <h2 id="services-introduction-title">{t(introduction.title, locale)}</h2>
      <p className="services-document-statement">{t(introduction.statement, locale)}</p>
      <div className="services-document-prose">{introduction.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph, locale)}</p>)}</div>
      <ServiceDocumentPhotos photos={introduction.photos} locale={locale} eager />
    </div></section>

    <section className="services-document-section" aria-labelledby="services-traceability-title"><div className="container">
      <h2 id="services-traceability-title">{t(traceability.title, locale)}</h2>
      <ol className="services-document-process">{traceability.steps.map((step, index) => <li key={index}>
        <span className="services-document-step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <p><strong>{t(step.title, locale)}</strong> — {t(step.description, locale)}</p>
      </li>)}</ol>
      <p className="services-document-scope"><strong>{t(traceability.scopeLabel, locale)}:</strong> {t(traceability.scope, locale)}</p>
      <ServiceDocumentPhotos photos={traceability.photos} locale={locale} />
    </div></section>

    <section className="services-document-section services-document-specialties" aria-labelledby="services-relevant-title"><div className="container">
      <h2 id="services-relevant-title">{t(servicesDocument.relevantTitle, locale)}</h2>
      <p className="services-document-relevant-intro">{t(servicesDocument.relevantIntroduction, locale)}</p>
      {serviceDocumentSpecialties.map((specialty, index) => <article className="services-document-specialty" id={specialty.id} aria-labelledby={`service-${specialty.id}-title`} key={specialty.id}>
        <h3 id={`service-${specialty.id}-title`}><span className="services-document-specialty-number">{String(index + 1).padStart(2, "0")}</span>{t(specialty.title, locale)}</h3>
        <p className="services-document-subtitle">{t(specialty.subtitle, locale)}</p>
        {specialty.note && <p className="services-document-note">{t(specialty.note, locale)}</p>}
        <p className="services-document-description">{t(specialty.description, locale)}</p>
        <ServiceDocumentPhotos photos={specialty.photos} locale={locale} />
      </article>)}
    </div></section>

    <section className="services-document-section services-document-coverage" aria-labelledby="services-coverage-title"><div className="container">
      <h2 id="services-coverage-title">{t(servicesDocument.coverageTitle, locale)}</h2>
      <ul className="services-document-classes">{serviceDocumentCoverage.flatMap((row, rowIndex) => row.map((item, columnIndex) => <li key={`${rowIndex}-${columnIndex}`}>{t(item, locale)}</li>))}</ul>
    </div></section>

    <section className="services-document-section services-document-consultation" aria-labelledby="services-consultation-title"><div className="container">
      <div className="services-document-trust">
        <div className="services-document-trust-mark"><Image src="/images/brand/manos.png" alt="" width={100} height={100} /><span>{t(consultation.trust, locale)}</span></div>
        <p>{t(consultation.motto, locale)}</p>
      </div>
      <h2 id="services-consultation-title">{t(consultation.title, locale)}</h2>
      <div className="services-document-prose">{consultation.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph, locale)}</p>)}</div>
      <Link href={`${href(locale, "contact")}#consulta`} className="button services-document-action">{c.consultationAction}<ArrowUpRight size={19} aria-hidden="true" /></Link>
    </div></section>
  </div>;
}
