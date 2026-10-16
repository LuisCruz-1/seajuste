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
      title: "Nuestros servicios relevantes",
      statement: "Marine & proyect cargo survey\nReclamos & siniestros\nAlta complejidad",
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
      title: "Ramos de seguros autorizados",
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
      title: "Our key services",
      statement: "Marine & project cargo survey\nClaims & losses\nHigh complexity",
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
      title: "Authorised insurance classes",
      authority: "Superintendency of Companies, Securities and Insurance",
      statement: "Forensic engineering & root cause analysis\nClaims & losses",
    },
  ],
};
