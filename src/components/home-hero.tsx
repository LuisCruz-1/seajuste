"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Pause, Play } from "lucide-react";
import { formatMoney, href, type Locale } from "@/lib/i18n";
import { heroCoverageOrder, type HeroInterventionCase, type HeroSettlementSummary, type HeroSlide } from "@/lib/hero-slides";
import { HeroBrandVisual } from "./hero-brand-visuals";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getHidden = () => document.hidden;
const serverPaused = () => true;

export function HomeHero({ locale, slides, insuranceClasses, settlementSummary, interventionCases }: { locale: Locale; slides: HeroSlide[]; insuranceClasses: string[]; settlementSummary: HeroSettlementSummary; interventionCases: HeroInterventionCase[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, serverPaused);
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, serverPaused);
  const running = !paused && !reducedMotion && !hidden && inView;
  const es = locale === "es";
  const settlementFigure = new Intl.NumberFormat(es ? "es-EC" : "en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(settlementSummary.amount / 1_000_000);
  const caseCountLabel = settlementSummary.caseCount === 4 ? (es ? "cuatro" : "four") : String(settlementSummary.caseCount);
  const settlementCaption = es ? `Indemnizaciones logradas en ${caseCountLabel} casos destacados` : `Settlements secured across ${caseCountLabel} featured cases`;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setCurrent((index) => (index + 1) % slides.length), 8000);
    return () => window.clearTimeout(timer);
  }, [current, running, slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    setPaused(true);
    setCurrent((index + slides.length) % slides.length);
  }

  return (
    <section
      ref={section}
      className="home-hero home-slider"
      aria-roledescription={es ? "carrusel" : "carousel"}
      aria-label={es ? "Servicios destacados de SEAJUSTE" : "SEAJUSTE featured services"}
      onFocusCapture={(event) => { if (!(event.target as HTMLElement).closest("[data-rotation]")) setPaused(true); }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest("a, .hero-intervention-table-scroll")) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(current + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onTouchStart={(event) => {
        if ((event.target as HTMLElement).closest(".hero-intervention-table-scroll")) { touchStart.current = null; return; }
        const touch = event.touches[0];
        touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
      }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="container hero-slider-controls">
        <div className="hero-slide-picker" role="group" aria-label={es ? "Elegir diapositiva" : "Choose a slide"}>
          {slides.map((slide, index) => <button key={slide.topic} type="button" className="hero-slide-tab" aria-label={`${es ? "Ver" : "View"} ${slide.topic}`} aria-current={index === current ? "true" : undefined} aria-controls={`hero-slide-${index}`} onClick={() => goTo(index)}><span className="hero-tab-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="hero-tab-label">{slide.topic}</span>{index === current && <span key={`${current}-${running}`} className={`hero-tab-progress${running ? " is-running" : ""}`} aria-hidden="true" />}</button>)}
        </div>
        <div className="hero-playback">
          <span className="hero-slide-count" aria-hidden="true">{String(current + 1).padStart(2, "0")} <span>/ {String(slides.length).padStart(2, "0")}</span></span>
          <button type="button" onClick={() => goTo(current - 1)} aria-label={es ? "Diapositiva anterior" : "Previous slide"}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={() => goTo(current + 1)} aria-label={es ? "Diapositiva siguiente" : "Next slide"}><ArrowRight size={18} aria-hidden="true" /></button>
          {!reducedMotion && <button type="button" data-rotation onClick={() => setPaused(!paused)} aria-label={paused ? (es ? "Reanudar carrusel" : "Resume slideshow") : (es ? "Pausar carrusel" : "Pause slideshow")}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>}
        </div>
      </div>
      <div className="hero-slides">
        {slides.map((slide, index) => {
          const active = current === index;
          const Heading = index === 0 ? "h1" : "h2";
          return (
            <div key={slide.topic} id={`hero-slide-${index}`} className={`hero-slide hero-slide-${slide.visual}${slide.consultation ? " hero-slide-consultation" : ""}${active ? " is-active" : ""}`} role="group" aria-roledescription={es ? "diapositiva" : "slide"} aria-label={`${index + 1} ${es ? "de" : "of"} ${slides.length}: ${slide.topic}`} aria-hidden={!active} inert={!active}>
              <div className="container home-hero-inner">
                <div className="hero-visual">
                  {slide.consultation && (slide.closing || slide.closingAccent) && <p className="hero-intervention-closing">{slide.closing}{slide.closingAccent && <em>{slide.closingAccent}</em>}</p>}
                  <div className={`inspection-frame hero-frame-${slide.visual}`}>
                    <HeroBrandVisual kind={slide.visual} locale={locale} />
                    <span className="inspection-corner corner-one" aria-hidden="true" /><span className="inspection-corner corner-two" aria-hidden="true" />
                  </div>
                </div>
                <div className={`hero-copy hero-copy-${slide.visual}`}>
                  {slide.visual === "coverage" ? <div className="hero-coverage-panel">
                      <Heading className="hero-slide-title hero-coverage-title">{slide.title}</Heading>
                      <ul className="hero-coverage-classes" aria-label={es ? "Ramos y coberturas de seguros" : "Insurance classes and covers"}>{heroCoverageOrder.map((classIndex) => <li key={classIndex}>{insuranceClasses[classIndex]}</li>)}</ul>
                  </div> : slide.visual === "intervention" ? <>
                    <Heading className="hero-slide-title hero-intervention-title">{slide.title}</Heading>
                    <p className="hero-intervention-threshold">{slide.threshold}</p>
                    <p className="hero-intervention-description">{slide.description}</p>
                    <ul className="hero-intervention-highlights">{slide.highlights?.map((item) => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                    <div className="hero-intervention-table-scroll" role="region" tabIndex={0} aria-label={es ? "Detalle de indemnizaciones en dólares estadounidenses" : "Documented settlement details in US dollars"}>
                      <table className="hero-intervention-table">
                        <caption className="sr-only">{es ? "Cuatro casos destacados de Electroguayas y Artefacta. Importes en USD." : "Four featured Electroguayas and Artefacta cases. Amounts in USD."}</caption>
                        <thead><tr><th scope="col">{es ? "Equipo siniestrado" : "Affected equipment"}</th><th scope="col" className="intervention-secondary-column">{es ? "Unidad" : "Unit"}</th><th scope="col" className="intervention-secondary-column">{es ? "Central térmica / ubicación" : "Power plant / location"}</th><th scope="col">{es ? "Valor indemnizado (USD)" : "Settlement (USD)"}</th></tr></thead>
                        {[...new Set(interventionCases.map((item) => item.client))].map((client) => <tbody key={client}>
                          <tr className="intervention-client-row"><th colSpan={4} scope="rowgroup">{client}</th></tr>
                          {interventionCases.filter((item) => item.client === client).map((item) => <tr className="intervention-case-row" key={item.id}><th scope="row"><Link href={href(locale, "experience", item.id)}>{item.equipment}</Link><span className="intervention-case-context">{item.unit} · {item.location}</span></th><td className="intervention-secondary-column">{item.unit}</td><td className="intervention-secondary-column">{item.location}</td><td className="intervention-case-amount">{formatMoney(item.value, locale).replace("USD ", "")}</td></tr>)}
                        </tbody>)}
                      </table>
                    </div>
                    {!slide.consultation && <p className="hero-intervention-closing">{slide.closing}{slide.closingAccent && <em>{slide.closingAccent}</em>}</p>}
                  </> : <>
                    <Heading className="hero-slide-title">{slide.title}</Heading>
                    {slide.accent && <p className="hero-primary-statement">{slide.accent}</p>}
                    {slide.services && <ul className="hero-service-list">{slide.services.map(({ label, detail }) => <li key={detail}><Link href={href(locale, "services", detail)}><span>{label}</span><ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}</ul>}
                  </>}
                  <div className={`hero-conversion has-summary${index === 0 ? " hero-conversion-no-actions" : ""}`}>
                    {index > 0 && <div className="hero-actions">
                      <Link className="button hero-consult-action" href={`${href(locale, "contact")}#consulta`}>{es ? "Solicitar consulta profesional" : "Request a professional consultation"}<ArrowUpRight size={17} aria-hidden="true" /></Link>
                    </div>}
                    {slide.visual === "trust" || slide.visual === "intervention" ? <Link href={href(locale, "experience")} className="hero-settlement" aria-label={es ? `Ver ${caseCountLabel} casos destacados: USD ${settlementFigure} millones en indemnizaciones` : `View ${caseCountLabel} featured cases: USD ${settlementFigure} million in settlements`}>
                      <p className="hero-settlement-amount" aria-hidden="true"><span>USD</span><strong>{settlementFigure}</strong><span>M</span></p>
                      <p className="hero-settlement-caption">{settlementCaption}</p>
                    </Link> : slide.statement && <div className="hero-message-panel"><p>{slide.statement}</p></div>}
                  </div>
                </div>
                {slide.consultation && <section className="hero-consultation-note" aria-labelledby={`hero-consultation-title-${index}`}>
                  <h3 id={`hero-consultation-title-${index}`}>{slide.consultation.title}</h3>
                  {slide.consultation.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>}
              </div>
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live={running ? "off" : "polite"} aria-atomic="true">{`${current + 1} ${es ? "de" : "of"} ${slides.length}: ${slides[current].topic}`}</p>
    </section>
  );
}
