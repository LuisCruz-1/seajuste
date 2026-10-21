"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type PdfData = { src: string; pages: { src: string; width: number; height: number }[] };

export function PdfDocument({ document, title, actionLabel, locale }: { document: PdfData; title: string; actionLabel: string; locale: Locale }) {
  const [current, setCurrent] = useState(0);
  const page = document.pages[current];
  const es = locale === "es";
  return <div className="history-document-preview">
    <div className="history-document-toolbar">
      <span className="history-document-type"><FileText size={16} aria-hidden="true" />PDF</span>
      <div className="history-document-page-controls" role="group" aria-label={title}>
        <button type="button" disabled={current === 0} onClick={() => setCurrent((index) => Math.max(0, index - 1))} aria-label={es ? "Página anterior" : "Previous page"}><ChevronLeft size={19} aria-hidden="true" /></button>
        <span className="history-document-page-count" aria-live="polite"><span className="sr-only">{es ? "Página " : "Page "}</span>{current + 1} / {document.pages.length}</span>
        <button type="button" disabled={current === document.pages.length - 1} onClick={() => setCurrent((index) => Math.min(document.pages.length - 1, index + 1))} aria-label={es ? "Página siguiente" : "Next page"}><ChevronRight size={19} aria-hidden="true" /></button>
      </div>
    </div>
    <Image src={page.src} width={page.width} height={page.height} alt={`${title} · ${es ? "Página" : "Page"} ${current + 1} ${es ? "de" : "of"} ${document.pages.length}`} unoptimized />
    <a className="history-document-action" href={document.src} target="_blank" rel="noopener noreferrer" aria-label={`${actionLabel}: ${title}`}>{actionLabel}<ArrowUpRight size={19} aria-hidden="true" /></a>
  </div>;
}
