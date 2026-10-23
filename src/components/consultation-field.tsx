"use client";

import { t, type Locale } from "@/lib/i18n";
import { consultationIntro, type ConsultationField as Field, type ConsultationAnswers } from "@/lib/consultation";

export function ConsultationField({ field, prefix, locale, answers, onChange }: { field: Field; prefix: string; locale: Locale; answers: ConsultationAnswers; onChange: (name: string, value: string) => void }) {
  const id = `${prefix}-${field.name}`;
  const value = answers[field.name] ?? "";
  const label = t(field.label, locale);
  const shared = { id, name: field.name, required: field.required, value, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { event.currentTarget.setCustomValidity(""); onChange(field.name, event.target.value); } };
  return <div className="field">
    <label id={`${id}-label`} htmlFor={id}>{label}{field.required && <span aria-hidden="true"> *</span>}</label>
    {field.kind === "select" ? <select {...shared}><option value="" disabled>{consultationIntro[locale].select}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{t(option.label, locale)}{option.description ? ` — ${t(option.description, locale)}` : ""}</option>)}</select>
      : field.kind === "textarea" ? <textarea {...shared} rows={6} minLength={10} maxLength={field.maxLength} />
      : <input {...shared} type={field.kind} autoComplete={field.autoComplete} minLength={field.required && field.kind === "text" ? 2 : undefined} maxLength={field.maxLength ?? 160} inputMode={field.kind === "tel" ? "tel" : undefined} />}
  </div>;
}
