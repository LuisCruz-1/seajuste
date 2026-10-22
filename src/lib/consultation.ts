import { t, text, type Locale, type Localized } from "./i18n";

export type ConsultationAnswers = Record<string, string | string[]>;
export type ConsultationOption = { value: string; label: Localized; description?: Localized };
export type ConsultationField = {
  name: string;
  label: Localized;
  kind: "text" | "email" | "tel" | "date" | "time" | "textarea" | "radio" | "checkbox" | "select";
  required?: boolean;
  full?: boolean;
  options?: ConsultationOption[];
  hint?: Localized;
  autoComplete?: string;
  pattern?: string;
  maxLength?: number;
  exclusiveOption?: string;
  when?: { field: string; value: string };
};
export type ConsultationSection = { id: string; number: string; title: Localized; fields: ConsultationField[]; optional?: boolean; note?: Localized };
export type ServiceOption = { id: string; title: string };

const option = (value: string, es: string, en: string, description?: Localized): ConsultationOption => ({ value, label: text(es, en), description });
const field = (name: string, es: string, en: string, props: Partial<ConsultationField> = {}): ConsultationField => ({ name, label: text(es, en), kind: "text", ...props });
const choice = (name: string, es: string, en: string, options: ConsultationOption[], props: Partial<ConsultationField> = {}) => field(name, es, en, { kind: "select", options, full: true, ...props });
const yesNo = [option("yes", "Sí", "Yes"), option("no", "No", "No"), option("confirm", "Por confirmar", "To be confirmed")];
const docs = [option("policy", "Póliza", "Policy"), option("notice", "Aviso del siniestro", "Loss notification"), option("photos", "Fotografías", "Photographs"), option("reports", "Informes", "Reports"), option("correspondence", "Correspondencia", "Correspondence"), option("other", "Otros", "Other")];

export const consultationIntro = {
  es: {
    title: "Conversemos sobre el alcance de su consulta",
    description: "Compártanos sus inquietudes y una descripción de las características del reclamo o siniestro. Con la información inicial y los antecedentes disponibles, podríamos identificar el alcance de su requerimiento y la documentación técnica necesaria para un análisis preliminar.",
    next: "Cuando la naturaleza o complejidad del caso lo justifique, coordinaremos una reunión profesional para examinar sus particularidades y definir los siguientes pasos.",
    required: "Los campos con * son obligatorios. Puede completar la información adicional que tenga disponible.",
    optional: "Información adicional", select: "Seleccione una opción", privacy: "Política de privacidad de esta consulta",
    consent: "He leído la política de privacidad y autorizo el tratamiento de mis datos para atender esta consulta.",
    privacyText: "SEAJUSTE S.A. Ajustadores de Siniestros utilizará los datos que usted decida enviar para atender su consulta y coordinar el contacto profesional. Los datos se preparan en un mensaje de WhatsApp: se entregan cuando usted confirma el envío allí. Este sitio no guarda el formulario en una base de datos ni adjunta archivos. El borrador se conserva únicamente mientras esta página permanece abierta.",
    privacyContact: "Para solicitar acceso, rectificación o eliminación de la información enviada, contacte a SEAJUSTE en",
    privacyWhatsapp: "El uso de WhatsApp está sujeto a su propia política de privacidad.",
    confidential: "No remita información reservada en el primer contacto. SEAJUSTE podrá solicitar antecedentes adicionales y, cuando proceda, coordinar una reunión técnica.",
    invalid: "Complete este campo sin usar solo espacios.", subject: "Solicitud de consulta profesional · SEAJUSTE",
  },
  en: {
    title: "Let’s discuss the scope of your enquiry",
    description: "Share your questions and a description of the claim or loss. With the initial information and available background, we could identify the scope of your request and the technical documentation needed for a preliminary assessment.",
    next: "When the nature or complexity of the case calls for it, we will arrange a professional meeting to examine its particulars and define the next steps.",
    required: "Fields marked * are required. Complete any additional information you have available.",
    optional: "Additional information", select: "Select an option", privacy: "Privacy policy for this enquiry",
    consent: "I have read the privacy policy and authorise the processing of my data to respond to this enquiry.",
    privacyText: "SEAJUSTE S.A. Ajustadores de Siniestros will use the information you choose to send to respond to your enquiry and coordinate professional contact. The details are prepared in a WhatsApp message and shared when you confirm sending it there. This website does not store the form in a database or attach files. Your draft is kept only while this page remains open.",
    privacyContact: "To request access to, correction or deletion of the information you sent, contact SEAJUSTE at",
    privacyWhatsapp: "WhatsApp use is subject to its own privacy policy.",
    confidential: "Do not send confidential information in your initial enquiry. SEAJUSTE may request additional background and, where appropriate, arrange a technical meeting.",
    invalid: "Complete this field with more than spaces.", subject: "Professional consultation request · SEAJUSTE",
  },
};

export function getConsultationSections(answers: ConsultationAnswers, services: ServiceOption[]): ConsultationSection[] {
  const sections: ConsultationSection[] = [
    { id: "identity", number: "1", title: text("Identificación de quien solicita la consulta", "Enquirer identification"), fields: [
      choice("requester", "¿Quién solicita la consulta?", "Who is requesting the consultation?", [
        option("insurer", "Aseguradora", "Insurer"), option("insured", "Empresa / persona asegurada", "Insured company / individual"), option("adjuster", "Ajustadora / perito", "Loss adjuster / surveyor"), option("broker", "Corredor de seguros", "Insurance broker"), option("reinsurer", "Reasegurador", "Reinsurer"), option("legal", "Abogado / asesor", "Lawyer / adviser"), option("other", "Otro", "Other"),
      ], { kind: "radio", required: true }),
      field("requesterOther", "Indique en qué condición actúa", "Specify your capacity", { required: true, full: true, when: { field: "requester", value: "other" } }),
      field("name", "Nombre y apellido", "Full name", { required: true, autoComplete: "name" }),
      field("company", "Empresa / entidad", "Company / organisation", { required: true, autoComplete: "organization" }),
      field("position", "Cargo o función", "Position or role", { autoComplete: "organization-title" }),
      choice("acting", "Actúa", "Acting", [option("self", "En nombre propio", "On my own behalf"), option("entity", "Por cuenta de otra entidad", "On behalf of another organisation")], { full: false }),
      field("representedEntity", "Entidad representada", "Represented organisation", { required: true, full: true, when: { field: "acting", value: "entity" } }),
      field("countryCode", "Código de país", "Country calling code", { kind: "tel", required: true, autoComplete: "tel-country-code", pattern: "\\+[1-9][0-9]{0,3}", maxLength: 5, hint: text("Por ejemplo: +593", "For example: +593") }),
      field("phone", "Teléfono / WhatsApp", "Phone / WhatsApp", { kind: "tel", required: true, autoComplete: "tel-national", pattern: "[0-9 ()+\\-]{7,30}", maxLength: 30 }),
      field("email", "Correo electrónico", "Email", { kind: "email", required: true, autoComplete: "email", full: true }),
      field("cityCountry", "Ciudad y país", "City and country", { autoComplete: "address-level2" }),
      field("address", "Dirección", "Address", { autoComplete: "street-address" }),
      choice("preferredContact", "Medio preferido para contacto", "Preferred contact method", [option("call", "Llamada", "Phone call"), option("whatsapp", "WhatsApp", "WhatsApp"), option("email", "Correo", "Email")]),
    ] },
    { id: "situation", number: "2", title: text("Situación del siniestro o reclamo", "Loss or claim status"), fields: [
      choice("situation", "Seleccione el motivo de consulta", "Select the reason for your enquiry", [
        option("recent", "Siniestro reciente", "Recent loss", text("Puede existir posibilidad de inspección temprana y conservación de evidencias.", "Early inspection and preservation of evidence may be possible.")),
        option("ongoing", "Reclamo en curso", "Ongoing claim", text("Ya existen actuaciones; las evidencias pueden estar modificadas o no disponibles.", "Work has already taken place; evidence may have changed or be unavailable.")),
        option("technical", "Asistencia técnica-legal", "Technical and legal assistance", text("Indique el asunto o la especialidad solicitada.", "Describe the subject or specialist assistance required.")),
        option("preventive", "Consulta preventiva / colaboración profesional / otro", "Preventive enquiry / professional collaboration / other"),
      ], { kind: "radio", required: true }),
      field("technicalSubject", "Asunto o especialidad solicitada", "Subject or specialist assistance requested", { full: true, when: { field: "situation", value: "technical" } }),
      field("preventiveSubject", "Detalle del motivo de consulta", "Enquiry reason details", { full: true, when: { field: "situation", value: "preventive" } }),
    ] },
    { id: "event", number: "3", title: text("Datos básicos del evento", "Basic event details"), optional: true, note: text("El aviso a la aseguradora es informativo y no supone contratación ni designación de SEAJUSTE.", "Notification to the insurer is informational and does not constitute an engagement or appointment of SEAJUSTE."), fields: [
      field("eventDate", "Fecha del evento", "Event date", { kind: "date" }), field("eventTime", "Hora del evento", "Event time", { kind: "time" }),
      field("eventLocation", "Ubicación del reclamo / siniestro", "Claim / loss location", { full: true, hint: text("Ciudad, provincia y país.", "City, province and country.") }),
      field("asset", "Bien / instalación / actividad", "Asset / facility / activity", { full: true }),
      choice("service", "Especialidad de interés", "Area of interest", [...services.map((item) => option(item.id, item.title, item.title)), option("other", "Otra", "Other")]),
      field("serviceOther", "Otra especialidad", "Other specialist area", { full: true, when: { field: "service", value: "other" } }),
      choice("notifiedBy", "¿Quién comunicó el aviso del siniestro a la aseguradora?", "Who notified the insurer of the loss?", [option("insured", "Asegurado", "Insured"), option("broker", "Corredor de seguros", "Insurance broker"), option("beneficiary", "Beneficiario", "Beneficiary"), option("representative", "Representante autorizado", "Authorised representative"), option("other", "Otro", "Other"), option("unknown", "No se conoce / por confirmar", "Unknown / to be confirmed")]),
      field("notifiedOther", "Otra persona que comunicó el aviso", "Other person who notified the loss", { full: true, when: { field: "notifiedBy", value: "other" } }),
      field("noticeDate", "Fecha del aviso (si consta)", "Notification date (if known)", { kind: "date" }),
      choice("appointment", "¿Existe designación formal?", "Is there a formal appointment?", yesNo, { full: false }),
      field("appointingEntity", "Entidad designante (si consta)", "Appointing organisation (if known)", { full: true, when: { field: "appointment", value: "yes" } }),
    ] },
  ];
  if (answers.situation === "recent") sections.push({ id: "recent", number: "4A", title: text("Si se trata de un siniestro reciente", "For a recent loss"), optional: true, note: text("La eventual inspección dependerá de seguridad, autorización de acceso, disponibilidad y aceptación del encargo. No se garantiza atención inmediata.", "Any inspection depends on safety, access authorisation, availability and acceptance of the assignment. Immediate attendance is not guaranteed."), fields: [
    choice("inspection", "¿Puede inspeccionarse el lugar?", "Can the site be inspected?", yesNo),
    choice("access", "Acceso y seguridad", "Access and safety", [option("available", "Disponible", "Available"), option("permission", "Requiere autorización", "Authorisation required"), option("restricted", "Restringido por seguridad / autoridad", "Restricted by safety requirements / authorities")]),
    choice("evidence", "Estado de evidencias", "Evidence condition", [option("preserved", "Conservadas", "Preserved"), option("altered", "Parcialmente alteradas", "Partially altered"), option("unknown", "Por determinar", "To be determined")]),
    choice("measures", "Medidas ya realizadas", "Measures already taken", [option("emergency", "Emergencia", "Emergency measures"), option("repairs", "Reparaciones", "Repairs"), option("removal", "Retiro de piezas", "Parts removed"), option("none", "Ninguna", "None"), option("other", "Otras", "Other")], { kind: "checkbox", exclusiveOption: "none" }),
    field("measuresOther", "Otras medidas realizadas", "Other measures taken", { full: true, when: { field: "measures", value: "other" } }),
    field("accessContact", "Contacto para coordinar acceso", "Site access contact"), field("accessPhone", "Teléfono para coordinar acceso", "Site access phone", { kind: "tel" }),
    field("urgency", "Urgencia o plazo relevante", "Urgency or relevant deadline", { full: true }),
  ] });
  if (answers.situation === "ongoing") sections.push({ id: "ongoing", number: "4B", title: text("Si se trata de un reclamo en curso", "For an ongoing claim"), optional: true, fields: [
    choice("claimStatus", "Estado actual del reclamo", "Current claim status", [option("preparation", "Preparación", "Preparation"), option("adjusting", "Ajuste / investigación", "Adjusting / investigation"), option("discussion", "Discusión técnica", "Technical discussion"), option("rejected", "Observado / rechazado", "Queried / rejected")]),
    choice("physicalEvidence", "Evidencia física", "Physical evidence", [option("available", "Disponible", "Available"), option("partial", "Parcial", "Partial"), option("unavailable", "No disponible", "Unavailable")]),
    choice("repairs", "Reparaciones / reemplazos", "Repairs / replacements", [option("yes", "Sí", "Yes"), option("no", "No", "No"), option("partial", "Parcialmente", "Partially")]),
    choice("priorWork", "Actuaciones previas", "Previous work", [option("inspection", "Inspección", "Inspection"), option("adjuster", "Ajustador", "Loss adjuster"), option("manufacturer", "Fabricante", "Manufacturer"), option("laboratory", "Laboratorio", "Laboratory"), option("other", "Otra", "Other")], { kind: "checkbox" }),
    field("priorWorkOther", "Otra actuación previa", "Other previous work", { full: true, when: { field: "priorWork", value: "other" } }),
    choice("existingDocuments", "Documentación existente", "Existing documentation", [option("photos", "Fotografías", "Photographs"), option("reports", "Informes", "Reports"), option("quotes", "Cotizaciones", "Quotations"), option("correspondence", "Correspondencia", "Correspondence"), option("records", "Registros operativos", "Operating records")], { kind: "checkbox" }),
    field("claimDeadline", "Fecha / plazo relevante", "Relevant date / deadline", { full: true }),
  ] });
  sections.push(
    { id: "description", number: "5", title: text("Descripción de la consulta", "Enquiry description"), fields: [field("message", "Contexto de su consulta", "Enquiry details", { kind: "textarea", full: true, required: true, maxLength: 4000, hint: text("Describa el evento, los daños conocidos, el apoyo requerido y sus principales inquietudes técnicas.", "Describe the event, known damage, assistance required and your main technical questions.") })] },
    { id: "next", number: "6", title: text("Información disponible y siguientes pasos", "Available information and next steps"), fields: [
      choice("documents", "Documentos que podrían facilitarse posteriormente", "Documents that could be provided later", docs, { kind: "checkbox" }),
      field("documentsOther", "Otros documentos disponibles", "Other available documents", { full: true, when: { field: "documents", value: "other" } }),
      field("preferredHours", "Horario preferido para contacto", "Preferred contact hours", { full: true }),
    ] },
  );
  return sections.map((section) => ({ ...section, fields: section.fields.filter((item) => !item.when || (Array.isArray(answers[item.when.field]) ? answers[item.when.field].includes(item.when.value) : answers[item.when.field] === item.when.value)) }));
}

export function buildConsultationMessage(answers: ConsultationAnswers, services: ServiceOption[], locale: Locale) {
  const sections = getConsultationSections(answers, services).map((section) => {
    const lines = section.fields.flatMap((item) => {
      const answer = answers[item.name];
      const values = Array.isArray(answer) ? answer : answer?.trim() ? [answer.trim()] : [];
      if (!values.length) return [];
      const value = values.map((value) => item.options ? t(item.options.find((option) => option.value === value)!.label, locale) : value).join(", ");
      return [`${t(item.label, locale)}: ${value}`];
    });
    return lines.length ? `${section.number}. ${t(section.title, locale)}\n${lines.join("\n")}` : "";
  });
  return [consultationIntro[locale].subject, ...sections.filter(Boolean), consultationIntro[locale].consent].join("\n\n");
}
