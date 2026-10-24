"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { aboutAnchors, href, sectionKeys, translatePath, type Locale, type Section } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";
import handsMark from "../../public/images/brand/manos.png";

type Labels = Pick<Copy, "nav" | "aboutNav" | "aboutSubmenu" | "home" | "menu" | "closeMenu" | "language" | "brandDescriptor" | "contactAction">;

export function Header({ locale, labels, socialLinks }: { locale: Locale; labels: Labels; socialLinks: { whatsapp: string; linkedin: string } }) {
  const pathname = usePathname();
  const homeActive = pathname === href(locale);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [aboutPanel, setAboutPanel] = useState<{ path: string; source: "hover" | "toggle" } | null>(null);
  const aboutOpen = aboutPanel?.path === pathname;
  const headerRef = useRef<HTMLElement>(null);
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
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const updateHeight = () => root.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--header-height");
    };
  }, []);

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
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Link href={href(locale)} className="header-brand-lockup" aria-label={`SEAJUSTE · ${labels.home}`} onClick={closeNavigation}>
          <Image src={handsMark} alt="" className="header-isologo" sizes="(max-width: 640px) 42px, 60px" loading="eager" />
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
          <div className="header-socials">
            <a className="header-social header-social-whatsapp" href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={locale === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"} title="WhatsApp" onClick={closeNavigation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 32 448 448" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                <metadata>Font Awesome Free 6.7.2 by @fontawesome. https://fontawesome.com/license/free — CC BY 4.0. Copyright 2024 Fonticons, Inc. Viewport adjusted.</metadata>
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </a>
            <a className="header-social header-social-linkedin" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={locale === "es" ? "Carlos Quevedo en LinkedIn" : "Carlos Quevedo on LinkedIn"} title="LinkedIn" onClick={closeNavigation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                <metadata>Font Awesome Free 6.7.2 by @fontawesome. https://fontawesome.com/license/free — CC BY 4.0. Copyright 2024 Fonticons, Inc. Viewport adjusted.</metadata>
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </a>
          </div>
          <Link href={href(locale, "contact")} className="header-contact" onClick={closeNavigation}>{labels.nav.contact}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button className="menu-toggle" ref={toggleRef} onClick={() => { setOpenPath(open ? null : pathname); setAboutPanel(null); }} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? labels.closeMenu : labels.menu}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
    </header>
  );
}
