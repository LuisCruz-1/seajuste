"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { aboutAnchors, href, sectionKeys, translatePath, type Locale, type Section } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";
import handsMark from "../../public/images/brand/manos.png";

type Labels = Pick<Copy, "nav" | "aboutNav" | "aboutSubmenu" | "home" | "menu" | "closeMenu" | "language" | "brandDescriptor" | "topLine" | "location" | "contactAction">;

export function Header({ locale, labels }: { locale: Locale; labels: Labels }) {
  const pathname = usePathname();
  const homeActive = pathname === href(locale);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [aboutPanel, setAboutPanel] = useState<{ path: string; source: "hover" | "toggle" } | null>(null);
  const aboutOpen = aboutPanel?.path === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutToggleRef = useRef<HTMLButtonElement>(null);
  const aboutLinks = [
    { anchor: aboutAnchors.company, label: labels.aboutNav.company },
    { anchor: aboutAnchors.history, label: labels.aboutNav.history },
    { anchor: aboutAnchors.marine, label: labels.aboutNav.marine },
    { anchor: aboutAnchors.london, label: labels.aboutNav.london },
    { anchor: aboutAnchors.reinsurers, label: labels.aboutNav.reinsurers },
  ];

  useEffect(() => {
    if (!open && !aboutOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (aboutOpen) {
          setAboutPanel(null);
          aboutToggleRef.current?.focus();
        } else {
          setOpenPath(null);
          toggleRef.current?.focus();
        }
      }
    };
    const outside = (event: PointerEvent) => {
      if (!aboutRef.current?.contains(event.target as Node)) setAboutPanel(null);
      if (!panelRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) setOpenPath(null);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, aboutOpen]);

  function closeNavigation() {
    setOpenPath(null);
    setAboutPanel(null);
  }

  function moveAboutFocus(direction: number) {
    setAboutPanel({ path: pathname, source: "toggle" });
    requestAnimationFrame(() => {
      const links = Array.from(aboutRef.current?.querySelectorAll<HTMLAnchorElement>(".nav-submenu a") ?? []);
      if (!links.length) return;
      const index = links.indexOf(document.activeElement as HTMLAnchorElement);
      const next = index < 0 ? (direction > 0 ? 0 : links.length - 1) : (index + direction + links.length) % links.length;
      links[next].focus();
    });
  }

  function active(section: Section) {
    return pathname === href(locale, section) || pathname.startsWith(`${href(locale, section)}/`);
  }

  return (
    <header className="site-header">
      <div className="topline"><div className="container topline-inner"><span>{labels.topLine}</span><span>{labels.location}</span></div></div>
      <div className="container header-inner">
        <Link href={href(locale)} className="header-brand-lockup" aria-label={`SEAJUSTE · ${labels.home}`} onClick={closeNavigation}>
          <Image src={handsMark} alt="" className="header-isologo" sizes="(max-width: 640px) 48px, 72px" loading="eager" />
          <span className="brand">
            <Image src="/images/brand/seajuste-logo.png" alt="SEAJUSTE S.A." width={900} height={155} className="brand-image" loading="eager" />
            <span>{labels.brandDescriptor}</span>
          </span>
        </Link>
        <nav aria-label={labels.menu} className={`primary-nav ${open ? "is-open" : ""}`} id="primary-navigation" ref={panelRef}>
          <Link href={href(locale)} className={homeActive ? "nav-link is-active" : "nav-link"} aria-current={homeActive ? "page" : undefined} onClick={closeNavigation}>{labels.home}</Link>
          {sectionKeys.filter((section) => section !== "contact").map((section) => section === "about" ? (
            <div key={section} className={`nav-dropdown${aboutOpen ? " is-open" : ""}`} ref={aboutRef}
              onPointerEnter={(event) => { if (event.pointerType === "mouse" && window.matchMedia("(min-width: 1281px)").matches) setAboutPanel((current) => current?.path === pathname ? current : { path: pathname, source: "hover" }); }}
              onPointerLeave={() => { if (window.matchMedia("(min-width: 1281px)").matches && !aboutRef.current?.contains(document.activeElement)) setAboutPanel(null); }}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setAboutPanel(null); }}
              onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); moveAboutFocus(event.key === "ArrowDown" ? 1 : -1); } }}>
              <div className="nav-dropdown-row">
                <Link href={href(locale, "about")} className={active("about") ? "nav-link is-active" : "nav-link"} aria-current={active("about") ? "page" : undefined} onClick={closeNavigation}>{labels.nav.about}</Link>
                <button type="button" className="nav-submenu-toggle" ref={aboutToggleRef} aria-label={labels.aboutSubmenu} aria-expanded={aboutOpen} aria-controls="about-navigation" onClick={() => setAboutPanel(aboutOpen && aboutPanel?.source === "toggle" ? null : { path: pathname, source: "toggle" })}><ChevronDown size={16} aria-hidden="true" /></button>
              </div>
              <ul className="nav-submenu" id="about-navigation" hidden={!aboutOpen} aria-label={labels.aboutSubmenu}>
                {aboutLinks.map((item) => <li key={item.anchor}><Link href={`${href(locale, "about")}#${item.anchor}`} onClick={closeNavigation}>{item.label}</Link></li>)}
              </ul>
            </div>
          ) : (
            <Link key={section} href={href(locale, section)} className={active(section) ? "nav-link is-active" : "nav-link"} aria-current={active(section) ? "page" : undefined} onClick={closeNavigation}>{labels.nav[section]}</Link>
          ))}
          <Link href={href(locale, "contact")} className="mobile-contact" onClick={closeNavigation}>{labels.contactAction}<ArrowUpRight size={18} /></Link>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={labels.language}>
            <Globe2 size={15} aria-hidden="true" />
            {(["es", "en"] as const).map((language) => (
              <Link key={language} href={translatePath(pathname, language)} lang={language} hrefLang={language} aria-label={language === "es" ? "Ver esta página en español" : "View this page in English"} aria-current={locale === language ? "true" : undefined} className={locale === language ? "is-active" : ""} onClick={closeNavigation}>{language.toUpperCase()}</Link>
            ))}
          </div>
          <Link href={href(locale, "contact")} className="header-contact" onClick={closeNavigation}>{labels.nav.contact}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button className="menu-toggle" ref={toggleRef} onClick={() => { setOpenPath(open ? null : pathname); setAboutPanel(null); }} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? labels.closeMenu : labels.menu}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
    </header>
  );
}
