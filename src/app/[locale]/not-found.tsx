"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";
import { href, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params.locale) ? params.locale : "es";
  const c = copy[locale];
  return <section className="section not-found-page"><div className="container"><span className="eyebrow">SEAJUSTE · 404</span><h1>{c.notFoundTitle}</h1><p>{c.notFoundText}</p><Link href={href(locale)} className="button button-primary">{c.homeAction}<ArrowUpRight size={18} /></Link></div></section>;
}
