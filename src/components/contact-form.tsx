"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, FileText, MessageCircle, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Copy } from "@/lib/copy";

type FormLabels = Pick<Copy,
  "formTitle" | "formIntro" | "name" | "company" | "optional" | "email" | "service" | "selectService" | "message" | "messageHint" | "namePlaceholder" | "companyPlaceholder" | "emailPlaceholder" | "messagePlaceholder" |
  "formTabs" | "consultationTab" | "meetingTab" | "contactPhone" | "contactPhonePlaceholder" | "consultationSubject" | "meetingTitle" | "meetingIntro" | "meetingSubject" | "meetingDate" | "meetingTime" | "meetingTimezone" | "meetingFormat" | "selectMeetingFormat" | "meetingVirtual" | "meetingGuayaquil" | "meetingQuito" | "meetingMessage" | "meetingMessagePlaceholder" | "meetingMessageHint" | "meetingReady" |
  "whatsappSend" | "openWhatsapp" | "formNotice" | "formReady" | "formFallback"
>;

const modes = ["consultation", "meeting"] as const;
type FormMode = typeof modes[number];
const getMode = (): FormMode => window.location.hash === "#reunion" ? "meeting" : "consultation";
const serverMode = (): FormMode => "consultation";

function subscribeMode(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function currentDateInEcuador() {
  const parts = new Intl.DateTimeFormat("en", { timeZone: "America/Guayaquil", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function ContactForm({ locale, options, labels }: { locale: Locale; options: { id: string; title: string }[]; labels: FormLabels }) {
  const id = useId();
  const mode = useSyncExternalStore(subscribeMode, getMode, serverMode);
  const [prepared, setPrepared] = useState<{ mode: FormMode; url: string } | null>(null);
  const tabRefs = useRef<Partial<Record<FormMode, HTMLButtonElement | null>>>({});
  const meetingFormats = [
    { id: "virtual", label: labels.meetingVirtual },
    { id: "guayaquil", label: labels.meetingGuayaquil },
    { id: "quito", label: labels.meetingQuito },
  ];

  function selectMode(next: FormMode) {
    setPrepared(null);
    window.location.assign(next === "meeting" ? "#reunion" : "#consulta");
  }

  function submit(event: FormEvent<HTMLFormElement>, formMode: FormMode) {
    event.preventDefault();
    const form = event.currentTarget;
    const meeting = formMode === "meeting";
    if (meeting) {
      const date = form.elements.namedItem("date") as HTMLInputElement;
      date.min = currentDateInEcuador();
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const service = options.find((option) => option.id === value("service"))?.title;
    const details = [
      meeting ? labels.meetingSubject : labels.consultationSubject,
      `${labels.name}: ${value("name")}`,
      value("company") ? `${labels.company}: ${value("company")}` : "",
      `${labels.email}: ${value("email")}`,
      value("phone") ? `${labels.contactPhone}: ${value("phone")}` : "",
      service ? `${labels.service}: ${service}` : "",
    ];
    if (meeting) {
      const date = new Intl.DateTimeFormat(locale === "es" ? "es-EC" : "en-GB", { dateStyle: "long", timeZone: "America/Guayaquil" }).format(new Date(`${value("date")}T12:00:00-05:00`));
      details.push(`${labels.meetingDate}: ${date}`, `${labels.meetingTime}: ${value("time")} · ${labels.meetingTimezone}`, `${labels.meetingFormat}: ${meetingFormats.find((format) => format.id === value("format"))?.label ?? ""}`);
    }
    const enquiry = `${details.filter(Boolean).join("\n")}\n\n${meeting ? labels.meetingMessage : labels.message}:\n${value("message")}`;
    const url = new URL("https://wa.me/593999666167");
    url.searchParams.set("text", enquiry);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
    setPrepared({ mode: formMode, url: url.toString() });
  }

  return (
    <section className="contact-form" id="enquiry" aria-labelledby={`${id}-title`}>
      <span id="consulta" className="contact-mode-anchor" aria-hidden="true" />
      <span id="reunion" className="contact-mode-anchor" aria-hidden="true" />
      <div className="contact-form-tabs" role="tablist" aria-label={labels.formTabs} onKeyDown={(event) => {
        const index = modes.indexOf(mode);
        const next = event.key === "ArrowRight" ? (index + 1) % modes.length : event.key === "ArrowLeft" ? (index + modes.length - 1) % modes.length : event.key === "Home" ? 0 : event.key === "End" ? modes.length - 1 : -1;
        if (next < 0) return;
        event.preventDefault();
        selectMode(modes[next]);
        tabRefs.current[modes[next]]?.focus();
      }}>
        {modes.map((formMode) => <button key={formMode} ref={(element) => { tabRefs.current[formMode] = element; }} type="button" role="tab" id={`${id}-${formMode}-tab`} aria-controls={`${id}-${formMode}-panel`} aria-selected={mode === formMode} tabIndex={mode === formMode ? 0 : -1} onClick={() => selectMode(formMode)}>{formMode === "meeting" ? <CalendarDays size={20} aria-hidden="true" /> : <FileText size={20} aria-hidden="true" />}<span>{formMode === "meeting" ? labels.meetingTab : labels.consultationTab}</span></button>)}
      </div>
      <span className="eyebrow">SEAJUSTE · {locale.toUpperCase()}</span><h2 id={`${id}-title`}>{mode === "meeting" ? labels.meetingTitle : labels.formTitle}</h2><p className="form-intro">{mode === "meeting" ? labels.meetingIntro : labels.formIntro}</p>
      {modes.map((formMode) => {
        const meeting = formMode === "meeting";
        const prefix = `${id}-${formMode}`;
        return <div key={formMode} id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab`} hidden={mode !== formMode}>
          <form onSubmit={(event) => submit(event, formMode)} onInput={() => setPrepared(null)} aria-labelledby={`${prefix}-tab`}>
            <div className="form-fields">
              <div className="field"><label htmlFor={`${prefix}-name`}>{labels.name} <span aria-hidden="true">*</span></label><input id={`${prefix}-name`} name="name" autoComplete="name" placeholder={labels.namePlaceholder} required minLength={2} maxLength={160} /></div>
              <div className="field"><label htmlFor={`${prefix}-company`}>{labels.company} <span className="optional">({labels.optional})</span></label><input id={`${prefix}-company`} name="company" autoComplete="organization" placeholder={labels.companyPlaceholder} maxLength={160} /></div>
              <div className="field field-full"><label htmlFor={`${prefix}-email`}>{labels.email} <span aria-hidden="true">*</span></label><input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} required maxLength={254} /></div>
              <div className="field field-full"><label htmlFor={`${prefix}-phone`}>{labels.contactPhone} {meeting ? <span aria-hidden="true">*</span> : <span className="optional">({labels.optional})</span>}</label><input id={`${prefix}-phone`} name="phone" type="tel" autoComplete="tel" placeholder={labels.contactPhonePlaceholder} required={meeting} minLength={7} maxLength={30} /></div>
              <div className="field field-full"><label htmlFor={`${prefix}-service`}>{labels.service} {meeting ? <span className="optional">({labels.optional})</span> : <span aria-hidden="true">*</span>}</label><select id={`${prefix}-service`} name="service" defaultValue="" required={!meeting}><option value="" disabled>{labels.selectService}</option>{options.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}</select></div>
              {meeting && <>
                <div className="field"><label htmlFor={`${prefix}-date`}>{labels.meetingDate} <span aria-hidden="true">*</span></label><input id={`${prefix}-date`} name="date" type="date" required onFocus={(event) => { event.currentTarget.min = currentDateInEcuador(); }} /></div>
                <div className="field"><label htmlFor={`${prefix}-time`}>{labels.meetingTime} <span aria-hidden="true">*</span></label><input id={`${prefix}-time`} name="time" type="time" required aria-describedby={`${prefix}-timezone`} /><small id={`${prefix}-timezone`}>{labels.meetingTimezone}</small></div>
                <div className="field field-full"><label htmlFor={`${prefix}-format`}>{labels.meetingFormat} <span aria-hidden="true">*</span></label><select id={`${prefix}-format`} name="format" defaultValue="" required><option value="" disabled>{labels.selectMeetingFormat}</option>{meetingFormats.map((format) => <option key={format.id} value={format.id}>{format.label}</option>)}</select></div>
              </>}
              <div className="field field-full"><label htmlFor={`${prefix}-message`}>{meeting ? labels.meetingMessage : labels.message} <span aria-hidden="true">*</span></label><textarea id={`${prefix}-message`} name="message" placeholder={meeting ? labels.meetingMessagePlaceholder : labels.messagePlaceholder} required minLength={10} maxLength={4000} rows={5} aria-describedby={`${prefix}-hint`} /><small id={`${prefix}-hint`}>{meeting ? labels.meetingMessageHint : labels.messageHint}</small></div>
            </div>
            <div className="form-actions"><button type="submit" className="button button-primary"><MessageCircle size={18} aria-hidden="true" />{labels.whatsappSend}<ArrowUpRight size={18} aria-hidden="true" /></button></div>
          </form>
        </div>;
      })}
      <p className="form-notice"><ShieldCheck size={17} aria-hidden="true" /><span>{labels.formNotice}</span></p>
      {prepared?.mode === mode && <div role="status" className="form-status"><strong>{mode === "meeting" ? labels.meetingReady : labels.formReady}</strong><p>{labels.formFallback}</p><a href={prepared.url} target="_blank" rel="noopener noreferrer" className="text-link">{labels.openWhatsapp}<ArrowUpRight size={17} aria-hidden="true" /></a></div>}
    </section>
  );
}
