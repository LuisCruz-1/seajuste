"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";

type FormLabels = Pick<Copy, "formTitle" | "formIntro" | "name" | "company" | "optional" | "email" | "service" | "selectService" | "message" | "messageHint" | "namePlaceholder" | "companyPlaceholder" | "emailPlaceholder" | "messagePlaceholder" | "whatsappSend" | "mailSend" | "formNotice" | "formReady" | "formFallback">;

export function ContactForm({ locale, options, labels }: { locale: Locale; options: { id: string; title: string }[]; labels: FormLabels }) {
  const id = useId();
  const [ready, setReady] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const channel = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("data-channel") ?? "whatsapp";
    const name = String(data.get("name") ?? "").trim();
    const enquiry = [
      locale === "es" ? "Consulta desde el sitio web de SEAJUSTE" : "Enquiry from the SEAJUSTE website",
      `${labels.name}: ${name}`,
      data.get("company") ? `${labels.company}: ${String(data.get("company")).trim()}` : "",
      `${labels.email}: ${String(data.get("email")).trim()}`,
      `${labels.service}: ${options.find((option) => option.id === data.get("service"))?.title ?? ""}`,
      "", String(data.get("message")).trim(),
    ].filter((line) => line !== "").join("\n");
    if (channel === "email") {
      const subject = `${locale === "es" ? "Consulta técnica" : "Technical enquiry"} · ${name}`;
      window.location.href = `mailto:seajuste@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiry)}`;
    } else {
      window.open(`https://wa.me/593999666167?text=${encodeURIComponent(enquiry)}`, "_blank", "noopener,noreferrer");
    }
    setReady(true);
  }

  return (
    <form className="contact-form" onSubmit={submit} id="enquiry">
      <span className="eyebrow">SEAJUSTE · {locale.toUpperCase()}</span><h2>{labels.formTitle}</h2><p className="form-intro">{labels.formIntro}</p>
      <div className="form-fields">
        <div className="field"><label htmlFor={`${id}-name`}>{labels.name} <span aria-hidden="true">*</span></label><input id={`${id}-name`} name="name" autoComplete="name" placeholder={labels.namePlaceholder} required minLength={2} maxLength={160} /></div>
        <div className="field"><label htmlFor={`${id}-company`}>{labels.company} <span className="optional">({labels.optional})</span></label><input id={`${id}-company`} name="company" autoComplete="organization" placeholder={labels.companyPlaceholder} maxLength={160} /></div>
        <div className="field field-full"><label htmlFor={`${id}-email`}>{labels.email} <span aria-hidden="true">*</span></label><input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} required maxLength={254} /></div>
        <div className="field field-full"><label htmlFor={`${id}-service`}>{labels.service} <span aria-hidden="true">*</span></label><select id={`${id}-service`} name="service" defaultValue="" required><option value="" disabled>{labels.selectService}</option>{options.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}</select></div>
        <div className="field field-full"><label htmlFor={`${id}-message`}>{labels.message} <span aria-hidden="true">*</span></label><textarea id={`${id}-message`} name="message" placeholder={labels.messagePlaceholder} required minLength={10} maxLength={4000} rows={5} aria-describedby={`${id}-hint`} /><small id={`${id}-hint`}>{labels.messageHint}</small></div>
      </div>
      <div className="form-actions"><button type="submit" data-channel="whatsapp" className="button button-primary"><MessageCircle size={18} aria-hidden="true" />{labels.whatsappSend}<ArrowUpRight size={18} aria-hidden="true" /></button><button type="submit" data-channel="email" className="form-email"><Mail size={16} aria-hidden="true" />{labels.mailSend}</button></div>
      <p className="form-notice"><ShieldCheck size={17} aria-hidden="true" /><span>{labels.formNotice}</span></p>
      {ready && <div role="status" className="form-status"><strong>{labels.formReady}</strong><p>{labels.formFallback}</p></div>}
    </form>
  );
}
