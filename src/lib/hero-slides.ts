import { text, type DetailId, type Locale, type Localized } from "./i18n";

export type HeroSlide = {
  visual: "trust" | "turbine" | "coverage" | "intervention";
  topic: string;
  title: string;
  motto?: string;
  accent?: string;
  statement?: string;
  contactPrompt?: { title: string; paragraphs: string[] };
  showContact?: boolean;
  threshold?: string;
  description?: string;
  highlights?: string[];
  closing?: string;
  resultsLabel?: string;
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
  text("Robo", "Theft"),
  text("Vehículos", "Motor vehicles"),
];

// Keep the authorised classes together in the same pairs as the reference layout.
export const heroCoverageOrder = [0, 1, 2, 3, 13, 11, 5, 9, 4, 6, 8, 7, 15, 10, 14, 12, 16, 17];

export const heroCoverageLabels: Partial<Record<number, Localized>> = {
  13: text("Marítimo: casco & maquinaria", "Marine: hull & machinery"),
  11: text("Transporte marítimo y terrestre", "Sea and land transport"),
  12: text("Casco aéreo", "Aircraft hull"),
};

export const heroInterventionPhotos = [
  { slot: "tg5", image: "intervention-tg5", caption: text("Unidad TG5", "TG5 unit"), alt: text("Intervención técnica en el generador de la unidad TG5", "Technical intervention on the TG5 generator") },
  { slot: "tv1", image: "intervention-tv1", caption: text("Unidad TV1", "TV1 unit"), alt: text("Turbina de la unidad TV1 en planta", "TV1 turbine at the power plant") },
  { slot: "tg4", image: "intervention-tg4", caption: text("Unidad TG4", "TG4 unit"), alt: text("Detalle del rotor y álabes de la unidad TG4", "TG4 rotor and turbine blade detail") },
  { slot: "damage", image: "artefacta-damage", caption: text("Artefacta · Daños", "Artefacta · Damage"), alt: text("Daños documentados en un local de Artefacta", "Documented damage at an Artefacta retail property") },
];

export const heroInterventionRows: { id: DetailId; equipment: Localized; unit: Localized; location: Localized }[] = [
  { id: "tg5", equipment: text("Turbina a gas", "Gas turbine"), unit: text("TG-5", "TG-5"), location: text("Dr. Enrique García", "Dr. Enrique García") },
  { id: "tv1", equipment: text("Turbina a vapor", "Steam turbine"), unit: text("TV-1", "TV-1"), location: text("Trinitaria", "Trinitaria") },
  { id: "tg4", equipment: text("Turbina a gas", "Gas turbine"), unit: text("TG-4", "TG-4"), location: text("Gonzalo Zevallos", "Gonzalo Zevallos") },
  { id: "artefacta", equipment: text("Locales comerciales", "Retail premises"), unit: text("Varios", "Various"), location: text("Manabí y Esmeraldas", "Manabí & Esmeraldas") },
];

export const consultationDetails: Record<Locale, NonNullable<HeroSlide["consultation"]>> = {
  es: {
    title: "¿En qué podemos ayudarte?",
    paragraphs: [
      "Cuéntenos el motivo de su consulta o necesidad.",
      "Estamos disponibles para conocer su requerimiento y evaluar la mejor manera de atenderlo.",
    ],
  },
  en: {
    title: "How can we help you?",
    paragraphs: [
      "Tell us about your enquiry or what you need.",
      "We are available to understand your requirements and assess the best way to assist you.",
    ],
  },
};

const interventionSlides: Record<Locale, HeroSlide> = {
  es: {
    visual: "intervention",
    topic: "SINIESTROS COMPLEJOS",
    title: "Intervención en siniestros complejos",
    threshold: "Reclamos superiores a USD 1 millón",
    description: "Cobertura de los reclamos y cuantificación de la pérdida.",
    highlights: ["Rotura de maquinaria y lucro cesante por rotura de maquinaria (Electroguayas).", "Incendio y lucro cesante a consecuencia de incendio (Artefacta)."],
    closing: "La confianza se demuestra con experiencia.",
    resultsLabel: "RESULTADOS QUE NOS RESPALDAN",
  },
  en: {
    visual: "intervention",
    topic: "COMPLEX LOSSES",
    title: "Intervention in complex losses",
    threshold: "Claims exceeding USD 1 million",
    description: "Claims coverage and loss quantification.",
    highlights: ["Machinery breakdown and resulting business interruption (Electroguayas).", "Fire and resulting business interruption (Artefacta)."],
    closing: "Trust is demonstrated through experience.",
    resultsLabel: "RESULTS THAT SPEAK FOR US",
  },
};

export const heroSlides: Record<Locale, HeroSlide[]> = {
  es: [
    {
      visual: "trust",
      topic: "EMPRESA",
      title: "Ingeniería especializada\naplicada a seguros",
      motto: "Sirviendo al mercado asegurador",
      accent: "Peritaje técnico-legal de reclamos & siniestros",
    },
    {
      visual: "turbine",
      topic: "SERVICIOS RELEVANTES",
      title: "Servicios relevantes",
      statement: "SURVEY\nRECLAMOS & SINIESTROS\nALTA COMPLEJIDAD",
      services: [
        { label: "Engineering for complex claims", detail: "engineering" },
        { label: "Energy & power loss adjusting", detail: "energy" },
        { label: "Marine: hull & machinery · cargo", detail: "marine" },
        { label: "Business interruption | Lucro cesante", detail: "interruption" },
      ],
      showContact: true,
    },
    interventionSlides.es,
    {
      visual: "coverage",
      topic: "PÓLIZAS",
      title: "Ramos de seguros autorizados",
      contactPrompt: {
        title: "¿En qué podemos ayudarte?",
        paragraphs: [
          "Cuéntenos el motivo de su consulta o necesidad.",
          "Estamos disponibles para conocer su requerimiento y evaluar la mejor manera de atenderlo.",
        ],
      },
    },
  ],
  en: [
    {
      visual: "trust",
      topic: "COMPANY",
      title: "Specialist engineering\nfor insurance",
      motto: "Serving the insurance market",
      accent: "Technical & legal expertise for claims & losses",
    },
    {
      visual: "turbine",
      topic: "KEY SERVICES",
      title: "Key services",
      statement: "SURVEY\nCLAIMS & LOSSES\nHIGH COMPLEXITY",
      services: [
        { label: "Engineering for complex claims", detail: "engineering" },
        { label: "Energy & power loss adjusting", detail: "energy" },
        { label: "Marine: hull & machinery · cargo", detail: "marine" },
        { label: "Business interruption", detail: "interruption" },
      ],
      showContact: true,
    },
    interventionSlides.en,
    {
      visual: "coverage",
      topic: "POLICIES",
      title: "Authorised insurance classes",
      contactPrompt: {
        title: "How can we help you?",
        paragraphs: [
          "Tell us about your enquiry or what you need.",
          "We are available to understand your requirements and assess the best way to assist you.",
        ],
      },
    },
  ],
};
