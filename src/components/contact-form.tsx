"use client";

import { useId, useState } from "react";
import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";
import { ConsultationForm } from "./consultation-form";

type FormLabels = Pick<Copy,
  "consultationTab" | "whatsappSend" | "openWhatsapp" | "formNotice" | "formReady" | "formFallback"
>;

export function ContactForm({ locale, labels, whatsapp }: { locale: Locale; labels: FormLabels; whatsapp: string }) {
  const id = useId();
  const [prepared, setPrepared] = useState<string | null>(null);

  return (
    <section className="contact-form" id="enquiry" aria-labelledby={`${id}-title`}>
      <span id="consulta" className="contact-mode-anchor" aria-hidden="true" />
      <div className="contact-form-heading"><FileText size={22} aria-hidden="true" /><h2 id={`${id}-title`}>{labels.consultationTab}</h2></div>
      <ConsultationForm locale={locale} whatsapp={whatsapp} submitLabel={labels.whatsappSend} onPrepared={setPrepared} onDraftChange={() => setPrepared(null)} />
      <p className="form-notice"><ShieldCheck size={17} aria-hidden="true" /><span>{labels.formNotice}</span></p>
      {prepared && <div role="status" className="form-status"><strong>{labels.formReady}</strong><p>{labels.formFallback}</p><a href={prepared} target="_blank" rel="noopener noreferrer" className="text-link">{labels.openWhatsapp}<ArrowUpRight size={17} aria-hidden="true" /></a></div>}
    </section>
  );
}
