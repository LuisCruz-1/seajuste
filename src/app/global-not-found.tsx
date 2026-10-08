import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fontClassName } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = { title: "Página no encontrada | SEAJUSTE", robots: { index: false, follow: true } };

export default function GlobalNotFound() {
  return <html lang="es" className={fontClassName}><body>
    <header className="global-error-header container"><Link href="/es" className="brand" aria-label="SEAJUSTE · Inicio"><Image src="/images/brand/seajuste-logo.png" alt="SEAJUSTE S.A." width={900} height={155} className="brand-image" /><span>Ajustadores de siniestros</span></Link></header>
    <main className="section not-found-page"><div className="container"><p className="eyebrow">SEAJUSTE · 404</p><h1>No encontramos esta página.</h1><p>Puede volver al inicio para explorar nuestras especialidades.</p><p lang="en">We couldn’t find this page. Return to our homepage to explore our expertise.</p><div className="global-error-actions"><Link href="/es" className="button button-primary">Inicio en español<ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/en" className="button button-outline" lang="en">English homepage<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></main>
  </body></html>;
}
