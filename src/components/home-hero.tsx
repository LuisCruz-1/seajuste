"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChartNoAxesCombined, CloudLightning, Cog, Factory, Flame, Pause, Play, ShieldCheck, Ship, Truck } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import type { HeroSlide } from "@/lib/hero-slides";
import { HeroBrandVisual } from "./hero-brand-visuals";

const specialties = [
  { icon: Flame, es: "Incendio", en: "Fire", detail: "Property damage" },
  { icon: CloudLightning, es: "Fenómenos naturales", en: "Natural perils", detail: "Cat risk" },
  { icon: Cog, es: "Rotura de maquinaria", en: "Machinery breakdown", detail: "Industrial" },
  { icon: ChartNoAxesCombined, es: "Lucro cesante", en: "Business interruption", detail: "Business interruption" },
  { icon: Factory, es: "Equipo & maquinaria", en: "Plant & equipment", detail: "Operational assets" },
  { icon: Truck, es: "Transporte", en: "Transport", detail: "Logistics" },
  { icon: Ship, es: "Casco marítimo", en: "Marine hull", detail: "Marine hull" },
  { icon: ShieldCheck, es: "Responsabilidad civil", en: "Civil liability", detail: "Liability" },
];

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

export function HomeHero({ locale, slides, whatsapp }: { locale: Locale; slides: HeroSlide[]; whatsapp: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, serverPaused);
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, serverPaused);
  const running = !paused && !reducedMotion && !hidden && inView;
  const es = locale === "es";

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
        if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest("a")) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(current + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onTouchStart={(event) => {
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
            <div key={slide.topic} id={`hero-slide-${index}`} className={`hero-slide${active ? " is-active" : ""}`} role="group" aria-roledescription={es ? "diapositiva" : "slide"} aria-label={`${index + 1} ${es ? "de" : "of"} ${slides.length}: ${slide.topic}`} aria-hidden={!active} inert={!active}>
              <div className="container home-hero-inner">
                <div className="hero-copy">
                  <p className="eyebrow"><span className="status-line" aria-hidden="true" />{slide.eyebrow}</p>
                  <Heading className="hero-slide-title">{slide.title}<span>{slide.accent}</span></Heading>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-actions">
                    <a className="button button-light" href={whatsapp} target="_blank" rel="noopener noreferrer">{slide.action}<ArrowUpRight size={17} aria-hidden="true" /></a>
                    <Link href={href(locale, "services")} className="hero-secondary">{es ? "Explorar especialidades" : "Explore our expertise"}<ArrowRight size={17} aria-hidden="true" /></Link>
                  </div>
                  <div className="hero-slide-note"><strong>{slide.footTitle}</strong><p>{slide.footDescription}</p></div>
                </div>
                <div className="hero-visual">
                  <div className={`inspection-frame${slide.visual === "specialties" ? " specialty-frame" : ""}`}>
                    {slide.visual === "turbine" || slide.visual === "trust" ? <HeroBrandVisual kind={slide.visual} locale={locale} /> : slide.visual === "photo" ? <>
                      <div className="photo"><Image src={`/images/projects/${slide.image}.webp`} alt={slide.imageAlt ?? ""} fill sizes="(max-width: 760px) 90vw, 46vw" preload={index === 0} /></div>
                      <div className="hero-image-tags">{slide.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <div className="inspection-reticle" aria-hidden="true"><span /><span /></div>
                      <div className="inspection-caption"><span className="caption-cross" aria-hidden="true">+</span><div><strong>{slide.caption}</strong><span>{slide.captionDetail}</span></div></div>
                    </> : <>
                      <div className="specialty-heading"><p className="eyebrow">{slide.captionDetail}</p><h3>{slide.caption}</h3></div>
                      <ul className="hero-specialties">{specialties.map(({ icon: Icon, ...specialty }) => <li key={specialty.en}><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><div><strong>{specialty[locale]}</strong><span>{specialty.detail}</span></div></li>)}</ul>
                    </>}
                    <span className="inspection-corner corner-one" aria-hidden="true" /><span className="inspection-corner corner-two" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="container hero-engineering-statement">
        <span className="engineering-statement-mark" aria-hidden="true">+</span>
        <p>{es ? "Ingeniería técnica especializada" : "Specialist technical engineering"}<span>{es ? "aplicada a seguros." : "for insurance."}</span></p>
        <span className="engineering-statement-fields">{es ? "Energía · Marítimo · Ingeniería" : "Energy · Marine · Engineering"}</span>
      </div>
      <p className="sr-only" aria-live={running ? "off" : "polite"} aria-atomic="true">{`${current + 1} ${es ? "de" : "of"} ${slides.length}: ${slides[current].topic}`}</p>
    </section>
  );
}
