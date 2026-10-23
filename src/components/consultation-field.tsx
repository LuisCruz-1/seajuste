"use client";

import { t, type Locale } from "@/lib/i18n";
import type { ConsultationField as Field, ConsultationAnswers } from "@/lib/consultation";

export function ConsultationField({ field, prefix, locale, answers, onChange }: { field: Field; prefix: string; locale: Locale; answers: ConsultationAnswers; onChange: (name: string, value: string) => void }) {
  const id = `${prefix}-${field.name}`;
  const value = answers[field.name] ?? "";
  const label = t(field.label, locale);
  if (field.kind === "radio") {
    return <fieldset className="consultation-choices field-full">
      <legend id={`${id}-label`}>{label}{field.required && <span aria-hidden="true"> *</span>}</legend>
      <div className="consultation-choice-grid">{field.options?.map((option) => <label className="consultation-choice" key={option.value}>
        <input type="radio" name={field.name} value={option.value} required={field.required} checked={value === option.value} onChange={() => onChange(field.name, option.value)} />
        <span>{t(option.label, locale)}{option.description && <small>{t(option.description, locale)}</small>}</span>
      </label>)}</div>
    </fieldset>;
  }
  const shared = { id, name: field.name, required: field.required, value, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { event.currentTarget.setCustomValidity(""); onChange(field.name, event.target.value); } };
  return <div className="field">
    <label id={`${id}-label`} htmlFor={id}>{label}{field.required && <span aria-hidden="true"> *</span>}</label>
    {field.kind === "textarea" ? <textarea {...shared} rows={6} minLength={10} maxLength={field.maxLength} />
      : <input {...shared} type={field.kind} autoComplete={field.autoComplete} minLength={field.required && field.kind === "text" ? 2 : undefined} maxLength={field.maxLength ?? 160} inputMode={field.kind === "tel" ? "tel" : undefined} />}
  </div>;
}
