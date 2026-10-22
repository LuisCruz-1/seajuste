"use client";

import { t, type Locale } from "@/lib/i18n";
import { consultationIntro, type ConsultationField as Field, type ConsultationAnswers } from "@/lib/consultation";

export function ConsultationField({ field, prefix, locale, answers, onChange }: { field: Field; prefix: string; locale: Locale; answers: ConsultationAnswers; onChange: (name: string, value: string | string[]) => void }) {
  const id = `${prefix}-${field.name}`;
  const value = answers[field.name] ?? "";
  const label = t(field.label, locale);
  const hint = field.hint ? `${id}-hint` : undefined;
  if (field.kind === "radio" || field.kind === "checkbox") {
    const multi = field.kind === "checkbox";
    return <fieldset className={`consultation-choices field-full${field.name === "situation" ? " situation-choices" : ""}`} aria-describedby={hint}>
      <legend>{label}{field.required && <span aria-hidden="true"> *</span>}</legend>
      <div className="consultation-choice-grid">{field.options?.map((option) => <label className="consultation-choice" key={option.value}>
        <input type={multi ? "checkbox" : "radio"} name={field.name} value={option.value} required={field.required} checked={multi ? Array.isArray(value) && value.includes(option.value) : value === option.value} onChange={(event) => {
          if (!multi) { onChange(field.name, option.value); return; }
          const current = Array.isArray(value) ? value : [];
          onChange(field.name, !event.target.checked ? current.filter((item) => item !== option.value) : option.value === field.exclusiveOption ? [option.value] : [...current.filter((item) => item !== field.exclusiveOption), option.value]);
        }} />
        <span>{t(option.label, locale)}{option.description && <small>{t(option.description, locale)}</small>}</span>
      </label>)}</div>
      {field.hint && <p className="consultation-hint" id={hint}>{t(field.hint, locale)}</p>}
    </fieldset>;
  }
  const shared = { id, name: field.name, required: field.required, value: typeof value === "string" ? value : "", "aria-describedby": hint, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { event.currentTarget.setCustomValidity(""); onChange(field.name, event.target.value); } };
  return <div className={`field${field.full ? " field-full" : ""}`}>
    <label htmlFor={id}>{label}{field.required && <span aria-hidden="true"> *</span>}</label>
    {field.kind === "select" ? <select {...shared}><option value="">{consultationIntro[locale].select}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{t(option.label, locale)}</option>)}</select>
      : field.kind === "textarea" ? <textarea {...shared} rows={6} minLength={10} maxLength={field.maxLength} />
      : <input {...shared} type={field.kind} autoComplete={field.autoComplete} minLength={field.required && field.kind === "text" ? 2 : undefined} maxLength={field.maxLength ?? 160} pattern={field.pattern} inputMode={field.kind === "tel" ? "tel" : undefined} />}
    {field.hint && <small id={hint}>{t(field.hint, locale)}</small>}
  </div>;
}
