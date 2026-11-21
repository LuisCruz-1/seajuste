import { t, text, type Locale, type Localized } from "./i18n";
import { privacyCopy } from "./privacy";

export type ConsultationAnswers = Record<string, string>;
export type ConsultationOption = { value: string; label: Localized; description?: Localized };
export type ConsultationField = {
  name: string;
  label: Localized;
  kind: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: ConsultationOption[];
  autoComplete?: string;
  maxLength?: number;
  fullWidth?: boolean;
};
export type ConsultationSection = { id: string; title: Localized; description?: Localized; fields: ConsultationField[] };

const option = (value: string, es: string, en: string, description?: Localized): ConsultationOption => ({ value, label: text(es, en), description });
const field = (name: string, es: string, en: string, props: Partial<ConsultationField> = {}): ConsultationField => ({ name, label: text(es, en), kind: "text", ...props });

export const consultationIntro = {
  es: {
    title: "Consulta profesional", required: "Los campos marcados con * son obligatorios.", select: "Seleccione una opción",
    invalid: "Complete este campo sin usar solo espacios.", invalidPhone: "Indique un teléfono válido con al menos 7 dígitos.",
    subject: "Solicitud de consulta profesional · SEAJUSTE",
  },
  en: {
    title: "Professional consultation", required: "Fields marked * are required.", select: "Select an option",
    invalid: "Complete this field with more than spaces.", invalidPhone: "Enter a valid phone number with at least 7 digits.",
    subject: "Professional consultation request · SEAJUSTE",
  },
};

// The form and the WhatsApp message share the same grouped fields and labels.
export function getConsultationSections(): ConsultationSection[] {
  return [
    { id: "identity", title: text("Seleccione quién solicita la consulta", "Select who is requesting the consultation"), fields: [
      field("requester", "Seleccione quién solicita la consulta", "Select who is requesting the consultation", { kind: "select", required: true, fullWidth: true, options: [
        option("insurer", "Aseguradora", "Insurer"), option("reinsurer", "Reaseguradora", "Reinsurer"), option("insured", "Empresa / asegurado", "Company / insured"), option("adjuster", "Ajustadora", "Loss adjuster"), option("broker", "Corredor de seguros", "Insurance broker"), option("legal", "Abogado / asesor", "Lawyer / adviser"), option("other", "Otro", "Other"),
      ] }),
    ] },
    { id: "contact", title: text("Datos de quien solicita", "Requester details"), fields: [
      field("name", "Nombre y apellido", "Full name", { required: true, autoComplete: "section-requester name" }),
      field("phone", "Teléfono / WhatsApp", "Phone / WhatsApp", { kind: "tel", required: true, autoComplete: "section-requester tel", maxLength: 30 }),
      field("email", "Correo electrónico", "Email", { kind: "email", required: true, autoComplete: "section-requester email" }),
    ] },
    { id: "description", title: text("Descripción de la consulta", "Enquiry description"), fields: [
      field("message", "Descripción de la consulta", "Enquiry description", { kind: "textarea", required: true, fullWidth: true, maxLength: 4000 }),
    ] },
  ];
}

export function buildConsultationMessage(answers: ConsultationAnswers, locale: Locale) {
  const sections = getConsultationSections().map((section) => {
    const lines = section.fields.flatMap((item) => {
      const answer = answers[item.name]?.trim();
      if (!answer) return [];
      const selected = item.options?.find((option) => option.value === answer);
      if (item.options && !selected) return [];
      return [`${t(item.label, locale)}: ${selected ? t(selected.label, locale) : answer}`];
    });
    return lines.length ? (section.fields.length === 1 ? lines.join("\n") : `${t(section.title, locale)}\n${lines.join("\n")}`) : "";
  });
  return [consultationIntro[locale].subject, ...sections.filter(Boolean), privacyCopy[locale].consent].join("\n\n");
}
