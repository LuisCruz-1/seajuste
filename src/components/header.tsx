"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react";
import { href, sectionKeys, translatePath, type Locale, type Section } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";
import handsMark from "../../public/images/brand/manos.png";

type Labels = Pick<Copy, "nav" | "home" | "menu" | "closeMenu" | "language" | "brandDescriptor" | "topLine" | "location" | "contactAction">;

export function Header({ locale, labels }: { locale: Locale; labels: Labels }) {
  const pathname = usePathname();
  const homeActive = pathname === href(locale);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        toggleRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) setOpenPath(null);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  function active(section: Section) {
    return pathname === href(locale, section) || pathname.startsWith(`${href(locale, section)}/`);
  }

  return (
    <header className="site-header">
      <div className="topline"><div className="container topline-inner"><span>{labels.topLine}</span><span>{labels.location}</span></div></div>
      <div className="container header-inner">
        <Link href={href(locale)} className="header-brand-lockup" aria-label={`SEAJUSTE · ${labels.home}`} onClick={() => setOpenPath(null)}>
          <Image src={handsMark} alt="" className="header-isologo" sizes="(max-width: 640px) 48px, 72px" loading="eager" />
          <span className="brand">
            <Image src="/images/brand/seajuste-logo.png" alt="SEAJUSTE S.A." width={900} height={155} className="brand-image" loading="eager" />
            <span>{labels.brandDescriptor}</span>
          </span>
        </Link>
        <nav aria-label={labels.menu} className={`primary-nav ${open ? "is-open" : ""}`} id="primary-navigation" ref={panelRef}>
          <Link href={href(locale)} className={homeActive ? "nav-link is-active" : "nav-link"} aria-current={homeActive ? "page" : undefined} onClick={() => setOpenPath(null)}>{labels.home}</Link>
          {sectionKeys.filter((section) => section !== "contact").map((section) => (
            <Link key={section} href={href(locale, section)} className={active(section) ? "nav-link is-active" : "nav-link"} aria-current={active(section) ? "page" : undefined} onClick={() => setOpenPath(null)}>{labels.nav[section]}</Link>
          ))}
          <Link href={href(locale, "contact")} className="mobile-contact" onClick={() => setOpenPath(null)}>{labels.contactAction}<ArrowUpRight size={18} /></Link>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={labels.language}>
            <Globe2 size={15} aria-hidden="true" />
            {(["es", "en"] as const).map((language) => (
              <Link key={language} href={translatePath(pathname, language)} lang={language} hrefLang={language} aria-label={language === "es" ? "Ver esta página en español" : "View this page in English"} aria-current={locale === language ? "true" : undefined} className={locale === language ? "is-active" : ""} onClick={() => setOpenPath(null)}>{language.toUpperCase()}</Link>
            ))}
          </div>
          <Link href={href(locale, "contact")} className="header-contact">{labels.nav.contact}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button className="menu-toggle" ref={toggleRef} onClick={() => setOpenPath(open ? null : pathname)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? labels.closeMenu : labels.menu}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
    </header>
  );
}
