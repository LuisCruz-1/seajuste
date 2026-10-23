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
    { id: "company", title: text("Datos de la empresa solicitante", "Requesting company details"), fields: [
      field("company", "Nombre de la empresa solicitante", "Requesting company name", { required: true, fullWidth: true, autoComplete: "section-requesting-company organization" }),
      field("city", "Ciudad", "City", { autoComplete: "section-requesting-company address-level2" }),
      field("address", "Dirección de la empresa solicitante", "Requesting company address", { autoComplete: "section-requesting-company street-address" }),
    ] },
    { id: "contact", title: text("Datos de quien solicita", "Requester details"), fields: [
      field("name", "Nombre y apellido", "Full name", { required: true, autoComplete: "section-requester name" }),
      field("position", "Cargo o función", "Position or role", { autoComplete: "section-requester organization-title" }),
      field("phone", "Teléfono / WhatsApp", "Phone / WhatsApp", { kind: "tel", required: true, autoComplete: "section-requester tel", maxLength: 30 }),
      field("email", "Correo electrónico", "Email", { kind: "email", required: true, autoComplete: "section-requester email" }),
    ] },
    { id: "affected-company", title: text("Datos de la empresa afectada", "Affected company details"), description: text("Si su consulta se relaciona con un reclamo o siniestro, indique la empresa afectada, su contacto y el lugar donde ocurrió el hecho.", "If your enquiry relates to a claim or loss, provide the affected company, its contact details and the location of the incident."), fields: [
      field("affectedCompany", "Nombre de la empresa afectada", "Affected company name", { autoComplete: "section-affected-company organization" }),
      field("affectedContact", "Persona de contacto en la empresa afectada", "Contact person at the affected company", { autoComplete: "section-affected-company name" }),
      field("affectedPhone", "Teléfono de la empresa afectada", "Affected company phone", { kind: "tel", autoComplete: "section-affected-company tel", maxLength: 30 }),
      field("affectedEmail", "Correo electrónico de la empresa afectada", "Affected company email", { kind: "email", autoComplete: "section-affected-company email" }),
      field("eventLocation", "Ubicación del reclamo / siniestro en la empresa afectada", "Claim / loss location at the affected company", { fullWidth: true }),
    ] },
    { id: "situation", title: text("Seleccione el motivo de consulta", "Select the reason for your enquiry"), fields: [
      field("situation", "Seleccione el motivo de consulta", "Select the reason for your enquiry", { kind: "select", required: true, fullWidth: true, options: [
        option("recent", "Siniestro reciente", "Recent loss", text("Inspección temprana.", "Early inspection.")),
        option("ongoing", "Reclamo en curso", "Ongoing claim", text("Evaluación con antecedentes y documentación disponible.", "Assessment using available background and documentation.")),
        option("technical", "Asistencia técnica-legal", "Technical and legal assistance", text("Asunto o especialidad solicitada.", "Subject or specialist assistance requested.")),
      ] }),
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
