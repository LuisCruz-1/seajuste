import { t, text, type Locale, type Localized } from "./i18n";
import { privacyCopy } from "./privacy";

export type ConsultationAnswers = Record<string, string>;
export type ConsultationOption = { value: string; label: Localized; description?: Localized };
export type ConsultationField = {
  name: string;
  label: Localized;
  kind: "text" | "email" | "tel" | "textarea" | "radio";
  required?: boolean;
  options?: ConsultationOption[];
  autoComplete?: string;
  maxLength?: number;
};
export type ConsultationSection = { id: string; title: Localized; fields: ConsultationField[] };

const option = (value: string, es: string, en: string, description?: Localized): ConsultationOption => ({ value, label: text(es, en), description });
const field = (name: string, es: string, en: string, props: Partial<ConsultationField> = {}): ConsultationField => ({ name, label: text(es, en), kind: "text", ...props });

export const consultationIntro = {
  es: {
    title: "Consulta profesional", required: "Los campos marcados con * son obligatorios.",
    invalid: "Complete este campo sin usar solo espacios.", invalidPhone: "Indique un teléfono válido con al menos 7 dígitos.",
    subject: "Solicitud de consulta profesional · SEAJUSTE",
  },
  en: {
    title: "Professional consultation", required: "Fields marked * are required.",
    invalid: "Complete this field with more than spaces.", invalidPhone: "Enter a valid phone number with at least 7 digits.",
    subject: "Professional consultation request · SEAJUSTE",
  },
};

// Fields and order follow Formularios/formulario contacto.jpeg.
export function getConsultationSections(): ConsultationSection[] {
  return [
    { id: "identity", title: text("Seleccione quién solicita la consulta", "Select who is requesting the consultation"), fields: [
      field("requester", "Seleccione quién solicita la consulta", "Select who is requesting the consultation", { kind: "radio", required: true, options: [
        option("insurer", "Aseguradora", "Insurer"), option("reinsurer", "Reaseguradora", "Reinsurer"), option("insured", "Empresa / asegurado", "Company / insured"), option("adjuster", "Ajustadora", "Loss adjuster"), option("broker", "Corredor de seguros", "Insurance broker"), option("legal", "Abogado / asesor", "Lawyer / adviser"), option("other", "Otro", "Other"),
      ] }),
    ] },
    { id: "contact", title: text("Datos del contacto", "Contact details"), fields: [
      field("company", "Empresa", "Company", { required: true, autoComplete: "organization" }),
      field("name", "Nombre y apellido", "Full name", { required: true, autoComplete: "name" }),
      field("position", "Cargo o función", "Position or role", { autoComplete: "organization-title" }),
      field("phone", "Teléfono / WhatsApp", "Phone / WhatsApp", { kind: "tel", required: true, autoComplete: "tel", maxLength: 30 }),
      field("email", "Correo electrónico", "Email", { kind: "email", required: true, autoComplete: "email" }),
      field("cityCountry", "Ciudad / país", "City / country", { autoComplete: "address-level2" }),
      field("address", "Dirección", "Address", { autoComplete: "street-address" }),
      field("eventLocation", "Ubicación del reclamo / siniestro", "Claim / loss location"),
    ] },
    { id: "situation", title: text("Seleccione el motivo de consulta", "Select the reason for your enquiry"), fields: [
      field("situation", "Seleccione el motivo de consulta", "Select the reason for your enquiry", { kind: "radio", required: true, options: [
        option("recent", "Siniestro reciente", "Recent loss", text("Inspección temprana y preservación de evidencias.", "Early inspection and preservation of evidence.")),
        option("ongoing", "Reclamo en curso", "Ongoing claim", text("Evaluación con antecedentes y documentación disponible.", "Assessment using available background and documentation.")),
        option("technical", "Asistencia técnica-legal", "Technical and legal assistance", text("Asunto o especialidad solicitada.", "Subject or specialist assistance requested.")),
      ] }),
    ] },
    { id: "description", title: text("Descripción de la consulta", "Enquiry description"), fields: [
      field("message", "Descripción de la consulta", "Enquiry description", { kind: "textarea", required: true, maxLength: 4000 }),
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
