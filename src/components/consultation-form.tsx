"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { buildConsultationMessage, consultationIntro, getConsultationSections, type ConsultationAnswers, type ServiceOption } from "@/lib/consultation";
import { ConsultationField } from "./consultation-field";

export function ConsultationForm({ locale, options, whatsapp, email, submitLabel, onPrepared, onDraftChange }: { locale: Locale; options: ServiceOption[]; whatsapp: string; email: string; submitLabel: string; onPrepared: (url: string) => void; onDraftChange: () => void }) {
  const id = useId();
  const [answers, setAnswers] = useState<ConsultationAnswers>({ countryCode: "+593" });
  const formRef = useRef<HTMLFormElement>(null);
  const c = consultationIntro[locale];
  const sections = getConsultationSections(answers, options);

  function change(name: string, value: string | string[]) {
    setAnswers((current) => ({ ...current, [name]: value }));
    onDraftChange();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const section of sections) for (const field of section.fields) {
      if (!field.required || !["text", "textarea"].includes(field.kind)) continue;
      const input = form.elements.namedItem(field.name) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(input.value.trim().length < (field.kind === "textarea" ? 10 : 2) ? c.invalid : "");
    }
    if (!form.reportValidity()) return;
    const url = new URL(whatsapp);
    url.searchParams.set("text", buildConsultationMessage(answers, options, locale));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
    onPrepared(url.toString());
  }

  return <form className="consultation-form" ref={formRef} onSubmit={submit} onInput={onDraftChange} aria-label={locale === "es" ? "Consulta profesional" : "Professional consultation"}>
    <p className="consultation-required">{c.required}</p>
    {sections.map((section) => {
      const heading = <><span className="consultation-section-number">{section.number}</span><span>{t(section.title, locale)}</span></>;
      const fields = <><div className="form-fields">{section.fields.map((field) => <ConsultationField key={field.name} field={field} prefix={id} locale={locale} answers={answers} onChange={change} />)}</div>{section.note && <p className="consultation-hint">{t(section.note, locale)}</p>}</>;
      return section.optional ? <details className={`consultation-section consultation-disclosure consultation-${section.id}`} key={section.id}>
        <summary>{heading}<span className="consultation-optional">{c.optional}</span></summary><div className="consultation-section-body">{fields}</div>
      </details> : <section className={`consultation-section consultation-${section.id}`} key={section.id} aria-labelledby={`${id}-${section.id}-title`}>
        <h3 id={`${id}-${section.id}-title`}>{heading}</h3>{fields}
      </section>;
    })}
    <p className="consultation-hint">{c.confidential}</p>
    <details className="consultation-privacy"><summary>{c.privacy}</summary><p>{c.privacyText}</p><p>{c.privacyContact} <a href={`mailto:${email}`}>{email}</a>.</p><p>{c.privacyWhatsapp} <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp</a></p></details>
    <label className="consultation-consent"><input type="checkbox" name="consent" required onChange={onDraftChange} /><span>{c.consent} <span aria-hidden="true">*</span></span></label>
    <div className="form-actions"><button type="submit" className="button button-primary"><MessageCircle size={18} aria-hidden="true" />{submitLabel}<ArrowUpRight size={18} aria-hidden="true" /></button></div>
  </form>;
}
