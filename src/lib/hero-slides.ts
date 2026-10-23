import { text, type DetailId, type Locale, type Localized } from "./i18n";

export type HeroSlide = {
  visual: "trust" | "turbine" | "coverage" | "intervention";
  topic: string;
  title: string;
  accent?: string;
  statement?: string;
  authority?: string;
  threshold?: string;
  description?: string;
  highlights?: string[];
  closing?: string;
  closingAccent?: string;
  services?: { label: string; detail: DetailId }[];
  consultation?: { title: string; paragraphs: string[] };
};

export type HeroSettlementSummary = { amount: number; caseCount: number };
export type HeroInterventionCase = { id: DetailId; client: string; equipment: string; unit: string; location: string; value: number };

export type HeroProjectPhoto = { image: string; alt: Localized };

export const heroProjectPhotos: HeroProjectPhoto[] = [
  { image: "ramos-boiler-inspection", alt: text("Inspección técnica del interior de una caldera industrial", "Technical inspection inside an industrial boiler") },
  { image: "ramos-power-turbine", alt: text("Turbina de generación eléctrica en una planta industrial", "Power generation turbine in an industrial plant") },
  { image: "ramos-siemens-assembly", alt: text("Montaje de un equipo Siemens Westinghouse", "Assembly of Siemens Westinghouse equipment") },
  { image: "ramos-earthmoving-equipment", alt: text("Peritaje de maquinaria pesada en campo", "On-site survey of heavy machinery") },
  { image: "ramos-power-barge", alt: text("Inspección de una barcaza de generación", "Survey of a power generation barge") },
  { image: "ramos-marine-engines", alt: text("Evaluación de motores y maquinaria naval", "Assessment of marine engines and machinery") },
];

export const heroCoveragePhotos: HeroProjectPhoto[] = [
  { image: "ramos-transformer-damage", alt: text("Evaluación de daños en un transformador de potencia", "Damage assessment of a power transformer") },
  { image: "ramos-cargo-unloading", alt: text("Supervisión de descarga de carga industrial en puerto", "Supervision of industrial cargo unloading at port") },
];

export const heroCoverageAdditionalClasses: Localized[] = [
  text("Riesgos diversos", "Miscellaneous risks"),
  text("Vehículos", "Motor vehicles"),
];

// Keep the authorised classes together in the same pairs as the reference layout.
export const heroCoverageOrder = [0, 1, 2, 3, 13, 11, 5, 9, 4, 6, 8, 7, 15, 10, 14, 12, 16, 17];

export const heroCoverageLabels: Partial<Record<number, Localized>> = {
  13: text("MARÍTIMO: CASCO & MAQUINARIA", "MARINE: HULL & MACHINERY"),
  11: text("TRANSPORTE MARÍTIMO Y TERRESTRE", "SEA AND LAND TRANSPORT"),
  12: text("CASCO AÉREO", "AIRCRAFT HULL"),
};

export const heroInterventionPhotos = [
  { slot: "tg5", image: "intervention-tg5", caption: text("Unidad TG5", "TG5 unit"), alt: text("Intervención técnica en el generador de la unidad TG5", "Technical intervention on the TG5 generator") },
  { slot: "tv1", image: "intervention-tv1", caption: text("Unidad TV1", "TV1 unit"), alt: text("Turbina de la unidad TV1 en planta", "TV1 turbine at the power plant") },
  { slot: "tg4", image: "intervention-tg4", caption: text("Unidad TG4", "TG4 unit"), alt: text("Detalle del rotor y álabes de la unidad TG4", "TG4 rotor and turbine blade detail") },
  { slot: "damage", image: "intervention-artefacta-damage", caption: text("Artefacta · Daños", "Artefacta · Damage"), alt: text("Daños documentados en un local de Artefacta", "Documented damage at an Artefacta retail property") },
  { slot: "store", image: "intervention-artefacta-store", caption: text("Artefacta · Local comercial", "Artefacta · Retail property"), alt: text("Local comercial de Artefacta incluido en los casos destacados", "Artefacta retail property featured in the documented claims") },
];

export const heroInterventionRows: { id: DetailId; equipment: Localized; unit: Localized; location: Localized }[] = [
  { id: "tg5", equipment: text("Turbina a gas", "Gas turbine"), unit: text("TG-5", "TG-5"), location: text("Dr. Enrique García", "Dr. Enrique García") },
  { id: "tv1", equipment: text("Turbina a vapor", "Steam turbine"), unit: text("TV-1", "TV-1"), location: text("Trinitaria", "Trinitaria") },
  { id: "tg4", equipment: text("Turbina a gas", "Gas turbine"), unit: text("TG-4", "TG-4"), location: text("Gonzalo Zevallos", "Gonzalo Zevallos") },
  { id: "artefacta", equipment: text("Locales comerciales", "Retail premises"), unit: text("Varios", "Various"), location: text("Manabí y Esmeraldas", "Manabí & Esmeraldas") },
];

const consultationDetails: Record<Locale, HeroSlide["consultation"]> = {
  es: {
    title: "Conversemos sobre el alcance de su consulta",
    paragraphs: [
      "Compártanos sus inquietudes y una descripción de las características del reclamo o siniestro. Con la información inicial y los antecedentes disponibles, podríamos identificar el alcance de su requerimiento y la documentación técnica necesaria para un análisis preliminar.",
      "Cuando la naturaleza o complejidad del caso lo justifique, coordinaremos una reunión profesional para examinar sus particularidades y definir los siguientes pasos.",
    ],
  },
  en: {
    title: "Let’s discuss the scope of your enquiry",
    paragraphs: [
      "Share your questions and a description of the claim or loss. With the initial information and available background, we could identify the scope of your request and the technical documentation needed for a preliminary assessment.",
      "When the nature or complexity of the case calls for it, we will arrange a professional meeting to examine its particulars and define the next steps.",
    ],
  },
};

const interventionSlides: Record<Locale, HeroSlide> = {
  es: {
    visual: "intervention",
    topic: "INTERVENCIÓN",
    title: "Intervención técnica en siniestros complejos",
    threshold: "Reclamos superiores a USD 1 millón",
    description: "Experiencia en evaluación de daños, investigación de causas y cuantificación de pérdidas.",
    highlights: ["Rotura de maquinaria y lucro cesante por rotura de maquinaria (Electroguayas).", "Incendio y lucro cesante a consecuencia de incendio (Artefacta)."],
    closing: "La confianza se demuestra con experiencia.",
    closingAccent: "RESULTADOS QUE NOS RESPALDAN",
  },
  en: {
    visual: "intervention",
    topic: "INTERVENTION",
    title: "Technical intervention in complex losses",
    threshold: "Claims exceeding USD 1 million",
    description: "Experience in damage assessment, cause investigation and loss quantification.",
    highlights: ["Machinery breakdown and resulting business interruption (Electroguayas).", "Fire and resulting business interruption (Artefacta)."],
    closing: "Trust is demonstrated through experience.",
    closingAccent: "RESULTS THAT SPEAK FOR US",
  },
};

export const heroSlides: Record<Locale, HeroSlide[]> = {
  es: [
    {
      visual: "trust",
      topic: "EMPRESA",
      title: "Ingeniería especializada\naplicada a seguros",
      accent: "Peritaje técnico-legal\nde reclamos & siniestros",
    },
    {
      visual: "turbine",
      topic: "ESPECIALIDADES",
      title: "Nuestros servicios relevantes",
      statement: "Marine & proyect cargo survey\nReclamos & siniestros\nAlta complejidad",
      services: [
        { label: "Engineering for complex claims", detail: "engineering" },
        { label: "Energy & power loss adjusting", detail: "energy" },
        { label: "Marine: hull & machinery · cargo", detail: "marine" },
        { label: "Business interruption | Lucro cesante", detail: "interruption" },
      ],
      consultation: consultationDetails.es,
    },
    {
      visual: "coverage",
      topic: "PÓLIZA",
      title: "Ramos de seguros autorizados",
      authority: "Superintendencia de Compañías, Valores y Seguros",
      statement: "Ingeniería forense & causa raíz\nReclamos & siniestros",
      consultation: consultationDetails.es,
    },
    {
      ...interventionSlides.es,
      topic: "CONSULTA",
      consultation: consultationDetails.es,
    },
  ],
  en: [
    {
      visual: "trust",
      topic: "COMPANY",
      title: "Specialist engineering\nfor insurance",
      accent: "Technical & legal expertise\nfor claims & losses",
    },
    {
      visual: "turbine",
      topic: "SPECIALTIES",
      title: "Our key services",
      statement: "Marine & project cargo survey\nClaims & losses\nHigh complexity",
      services: [
        { label: "Engineering for complex claims", detail: "engineering" },
        { label: "Energy & power loss adjusting", detail: "energy" },
        { label: "Marine: hull & machinery · cargo", detail: "marine" },
        { label: "Business interruption", detail: "interruption" },
      ],
      consultation: consultationDetails.en,
    },
    {
      visual: "coverage",
      topic: "POLICY",
      title: "Authorised insurance classes",
      authority: "Superintendency of Companies, Securities and Insurance",
      statement: "Forensic engineering & root cause analysis\nClaims & losses",
      consultation: consultationDetails.en,
    },
    {
      ...interventionSlides.en,
      topic: "CONSULTATION",
      consultation: consultationDetails.en,
    },
  ],
};
