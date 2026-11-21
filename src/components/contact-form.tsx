"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";
import { ConsultationForm } from "./consultation-form";

type FormLabels = Pick<Copy,
  "consultationTab" | "whatsappSend" | "openWhatsapp" | "formReady" | "formFallback"
>;

export function ContactForm({ locale, labels, whatsapp }: { locale: Locale; labels: FormLabels; whatsapp: string }) {
  const [prepared, setPrepared] = useState<string | null>(null);

  return (
    <section className="contact-form" id="enquiry" aria-label={labels.consultationTab}>
      <span id="consulta" className="contact-mode-anchor" aria-hidden="true" />
      <ConsultationForm locale={locale} whatsapp={whatsapp} submitLabel={labels.whatsappSend} onPrepared={setPrepared} onDraftChange={() => setPrepared(null)} />
      {prepared && <div role="status" className="form-status"><strong>{labels.formReady}</strong><p>{labels.formFallback}</p><a href={prepared} target="_blank" rel="noopener noreferrer" className="text-link">{labels.openWhatsapp}<ArrowUpRight size={17} aria-hidden="true" /></a></div>}
    </section>
  );
}
