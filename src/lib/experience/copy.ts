import type { Locale } from "../i18n";
import type { ExperienceEquipment, ExperienceKind, ExperienceSpecialty } from "./types";

type ExperienceCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  browse: string;
  heroReference: string;
  archiveTitle: string;
  archiveIntro: string;
  all: string;
  specialty: string;
  equipmentLabel: string;
  kindLabel: string;
  allEquipment: string;
  allKinds: string;
  search: string;
  searchPlaceholder: string;
  clear: string;
  result: string;
  results: string;
  empty: string;
  more: string;
  view: string;
  back: string;
  context: string;
  intervention: string;
  scope: string;
  facts: string;
  client: string;
  location: string;
  nature: string;
  source: string;
  settlement: string;
  settlementNote: string;
  gallery: string;
  galleryIntro: string;
  contextual: string;
  record: string;
  records: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  showAll: string;
  showLess: string;
  documentation: string;
  openDocument: string;
  related: string;
  enquiryTitle: string;
  enquiryText: string;
  contact: string;
  noteTitle: string;
  note: string;
  specialties: Record<ExperienceSpecialty, string>;
  equipment: Record<ExperienceEquipment, string>;
  kinds: Record<ExperienceKind, string>;
};

export const experienceCopy: Record<Locale, ExperienceCopy> = {
  es: {
    eyebrow: "Experiencia · SEAJUSTE",
    title: "Siniestros complejos.\nExperiencia en campo.",
    intro: "Casos de generación eléctrica, maquinaria, carga e infraestructura. Explore el contexto de cada intervención, su alcance técnico y el registro que la respalda.",
    browse: "Explorar intervenciones",
    heroReference: "Del equipo al detalle",
    archiveTitle: "Intervenciones y registros técnicos",
    archiveIntro: "Siniestros, surveys y evaluaciones técnicas, identificados por separado. Una misma intervención puede pertenecer a más de una especialidad.",
    all: "Todas",
    specialty: "Filtrar por especialidad",
    equipmentLabel: "Equipo o instalación",
    kindLabel: "Tipo de intervención",
    allEquipment: "Todos los equipos",
    allKinds: "Todos los tipos",
    search: "Buscar intervenciones",
    searchPlaceholder: "Equipo, empresa o instalación",
    clear: "Limpiar filtros",
    result: "intervención",
    results: "intervenciones",
    empty: "No encontramos coincidencias. Pruebe con otro equipo o quite los filtros.",
    more: "Ver más intervenciones",
    view: "Ver intervención",
    back: "Todas las intervenciones",
    context: "El contexto",
    intervention: "La intervención",
    scope: "Alcance técnico",
    facts: "Ficha de intervención",
    client: "Empresa / ámbito",
    location: "Ubicación / aplicación",
    nature: "Naturaleza del trabajo",
    source: "Referencia documental",
    settlement: "Indemnización publicada",
    settlementNote: "Importe referido en el brochure corporativo para este caso o conjunto de reclamos. Es un resultado histórico, no una garantía para futuras asignaciones.",
    gallery: "Registro fotográfico",
    galleryIntro: "Imágenes del archivo aportado. Las fotografías de referencia se identifican expresamente y no se presentan como prueba de un siniestro específico.",
    contextual: "Referencia del equipo",
    record: "Registro técnico",
    records: "Registros de inspección",
    open: "Ampliar fotografía",
    close: "Cerrar fotografía",
    previous: "Fotografía anterior",
    next: "Fotografía siguiente",
    showAll: "Ver todas las fotografías",
    showLess: "Mostrar menos",
    documentation: "Soporte documental",
    openDocument: "Abrir extracto en PDF",
    related: "Intervenciones relacionadas",
    enquiryTitle: "¿En qué podemos ayudarte?",
    enquiryText: "Cuéntenos el motivo de su consulta o necesidad. Estamos disponibles para conocer su requerimiento y evaluar la mejor manera de atenderlo.",
    contact: "Contáctenos",
    noteTitle: "Cómo leer este archivo",
    note: "Cada ficha distingue el ajuste de reclamos, el survey y la evaluación técnica. Las fotografías de referencia y de mantenimiento posterior se identifican en sus pies. Los importes corresponden a resultados históricos publicados y no garantizan resultados futuros.",
    specialties: {
      energy: "Energía y generación",
      engineering: "Ingeniería de siniestros",
      marine: "Marine y carga",
      interruption: "Lucro cesante",
    },
    equipment: {
      turbines: "Turbinas y generadores",
      transformers: "Transformadores",
      engines: "Motores y grupos electrógenos",
      boilers: "Calderas y bombas",
      barges: "Barcazas",
      machinery: "Equipo caminero",
      infrastructure: "Edificios y vías",
      vehicles: "Vehículos",
    },
    kinds: { claim: "Siniestro / reclamo", survey: "Survey / inspección", technical: "Evaluación técnica" },
  },
  en: {
    eyebrow: "Experience · SEAJUSTE",
    title: "Complex losses.\nExperience in the field.",
    intro: "Power generation, machinery, cargo and infrastructure assignments. Explore the context of each intervention, its technical scope and the supporting record.",
    browse: "Explore assignments",
    heroReference: "From equipment to detail",
    archiveTitle: "Assignments and technical records",
    archiveIntro: "Claims, surveys and technical assessments, clearly distinguished. A single assignment may relate to more than one specialty.",
    all: "All",
    specialty: "Filter by specialty",
    equipmentLabel: "Equipment or installation",
    kindLabel: "Assignment type",
    allEquipment: "All equipment",
    allKinds: "All types",
    search: "Search assignments",
    searchPlaceholder: "Equipment, company or installation",
    clear: "Clear filters",
    result: "assignment",
    results: "assignments",
    empty: "No matching assignments. Try another piece of equipment or clear the filters.",
    more: "View more assignments",
    view: "View assignment",
    back: "All assignments",
    context: "Context",
    intervention: "The assignment",
    scope: "Technical scope",
    facts: "Assignment profile",
    client: "Company / sector",
    location: "Location / application",
    nature: "Nature of the work",
    source: "Documentary reference",
    settlement: "Published indemnity",
    settlementNote: "Amount reported in the corporate brochure for this case or group of claims. It is a historical result, not a guarantee for future assignments.",
    gallery: "Photographic record",
    galleryIntro: "Images from the supplied archive. Reference photographs are expressly identified and are not presented as evidence of a particular loss.",
    contextual: "Equipment reference",
    record: "Technical record",
    records: "Inspection records",
    open: "Enlarge photograph",
    close: "Close photograph",
    previous: "Previous photograph",
    next: "Next photograph",
    showAll: "View all photographs",
    showLess: "Show fewer",
    documentation: "Supporting documentation",
    openDocument: "Open PDF excerpt",
    related: "Related assignments",
    enquiryTitle: "How can we help you?",
    enquiryText: "Tell us about your enquiry or what you need. We are available to understand your requirements and assess the best way to assist you.",
    contact: "Contact us",
    noteTitle: "About this archive",
    note: "Each profile distinguishes claims adjusting, surveys and technical assessment. Reference and later maintenance photographs are identified in their captions. Amounts relate to published historical results and do not guarantee future outcomes.",
    specialties: {
      energy: "Energy and power",
      engineering: "Claims engineering",
      marine: "Marine and cargo",
      interruption: "Business interruption",
    },
    equipment: {
      turbines: "Turbines and generators",
      transformers: "Transformers",
      engines: "Engines and generating sets",
      boilers: "Boilers and pumps",
      barges: "Barges",
      machinery: "Earthmoving equipment",
      infrastructure: "Buildings and roads",
      vehicles: "Vehicles",
    },
    kinds: { claim: "Loss / claim", survey: "Survey / inspection", technical: "Technical assessment" },
  },
};
