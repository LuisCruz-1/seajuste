"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { buildConsultationMessage, consultationIntro, getConsultationSections, type ConsultationAnswers } from "@/lib/consultation";
import { ConsultationField } from "./consultation-field";
import { PrivacyConsent } from "./privacy-consent";

export function ConsultationForm({ locale, whatsapp, submitLabel, onPrepared, onDraftChange }: { locale: Locale; whatsapp: string; submitLabel: string; onPrepared: (url: string) => void; onDraftChange: () => void }) {
  const id = useId();
  const [answers, setAnswers] = useState<ConsultationAnswers>({});
  const c = consultationIntro[locale];
  const sections = getConsultationSections();

  function change(name: string, value: string) {
    setAnswers((current) => ({ ...current, [name]: value }));
    onDraftChange();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const section of sections) for (const field of section.fields) {
      if (field.kind === "tel") {
        const input = form.elements.namedItem(field.name) as HTMLInputElement;
        const value = input.value.trim();
        input.setCustomValidity(value.replace(/\D/g, "").length < 7 || !/^[+\d()\s.-]+$/.test(value) ? c.invalidPhone : "");
        continue;
      }
      if (!field.required || !["text", "textarea"].includes(field.kind)) continue;
      const input = form.elements.namedItem(field.name) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(input.value.trim().length < (field.kind === "textarea" ? 10 : 2) ? c.invalid : "");
    }
    if (!form.reportValidity()) return;
    const url = new URL(whatsapp);
    url.searchParams.set("text", buildConsultationMessage(answers, locale));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
    onPrepared(url.toString());
  }

  return <form className="consultation-form" onSubmit={submit} onInput={onDraftChange} aria-label={c.title}>
    <p className="consultation-required">{c.required}</p>
    {sections.map((section) => {
      const single = section.fields.length === 1;
      return <section className={`consultation-section consultation-${section.id}`} key={section.id} aria-labelledby={single ? `${id}-${section.fields[0].name}-label` : `${id}-${section.id}-title`}>
        {!single && <h3 id={`${id}-${section.id}-title`}>{t(section.title, locale)}</h3>}
        <div className="form-fields">{section.fields.map((field) => <ConsultationField key={field.name} field={field} prefix={id} locale={locale} answers={answers} onChange={change} />)}</div>
      </section>;
    })}
    <PrivacyConsent locale={locale} onChange={onDraftChange} />
    <div className="form-actions"><button type="submit" className="button button-primary"><MessageCircle size={18} aria-hidden="true" />{submitLabel}<ArrowUpRight size={18} aria-hidden="true" /></button></div>
  </form>;
}
