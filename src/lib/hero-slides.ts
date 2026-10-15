import { text, type DetailId, type Locale, type Localized } from "./i18n";

export type HeroSlide = {
  visual: "trust" | "turbine" | "coverage";
  topic: string;
  title: string;
  accent?: string;
  statement?: string;
  authority?: string;
  services?: { label: string; detail: DetailId }[];
};

export type HeroSettlementSummary = { amount: number; caseCount: number };

export type HeroProjectPhoto = { image: string; alt: Localized };

export const heroProjectPhotos: HeroProjectPhoto[] = [
  { image: "barge-systems", alt: text("Inspección de sistemas y tuberías industriales", "Inspection of industrial systems and pipework") },
  { image: "trinitaria-turbine", alt: text("Evaluación de una turbina de generación eléctrica", "Assessment of a power generation turbine") },
  { image: "cargo-assembly-1", alt: text("Montaje de un equipo Siemens Westinghouse", "Assembly of Siemens Westinghouse equipment") },
  { image: "excavator-field-3", alt: text("Peritaje de maquinaria pesada en campo", "On-site survey of heavy machinery") },
  { image: "power-barge-detail", alt: text("Inspección de una barcaza de generación", "Survey of a power generation barge") },
  { image: "barge-engine-3", alt: text("Evaluación de motores y maquinaria naval", "Assessment of marine engines and machinery") },
];

export const heroCoveragePhotos: HeroProjectPhoto[] = [
  { image: "electrical-testing", alt: text("Pruebas técnicas de un transformador de potencia", "Technical testing of a power transformer") },
  { image: "cargo-unloading-2", alt: text("Supervisión de descarga de carga industrial en puerto", "Supervision of industrial cargo unloading at port") },
];

// Keep the authorised classes together in the same pairs as the reference layout.
export const heroCoverageOrder = [0, 1, 2, 3, 13, 11, 5, 9, 4, 6, 8, 7, 15, 10, 14, 12];

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
      title: "Servicios relevantes",
      statement: "Survey\nReclamos & siniestros\nAlta complejidad",
      services: [
        { label: "Engineering for complex claims", detail: "engineering" },
        { label: "Energy & power loss adjusting", detail: "energy" },
        { label: "Marine: hull & machinery · cargo", detail: "marine" },
        { label: "Business interruption | Lucro cesante", detail: "interruption" },
      ],
    },
    {
      visual: "coverage",
      topic: "PÓLIZA",
      title: "Pólizas de seguros con\ncertificación de autorización",
      authority: "Superintendencia de Compañías, Valores y Seguros",
      statement: "Ingeniería forense & causa raíz\nReclamos & siniestros",
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
      title: "Key services",
      statement: "Survey\nClaims & losses\nHigh complexity",
      services: [
        { label: "Engineering for complex claims", detail: "engineering" },
        { label: "Energy & power loss adjusting", detail: "energy" },
        { label: "Marine: hull & machinery · cargo", detail: "marine" },
        { label: "Business interruption", detail: "interruption" },
      ],
    },
    {
      visual: "coverage",
      topic: "POLICY",
      title: "Insurance classes with\ncertified authorisation",
      authority: "Superintendency of Companies, Securities and Insurance",
      statement: "Forensic engineering & root cause analysis\nClaims & losses",
    },
  ],
};
