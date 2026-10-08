import type { Locale } from "./i18n";

export type HeroSlide = {
  visual: "turbine" | "specialties" | "trust" | "photo";
  topic: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  action: string;
  tags: string[];
  caption: string;
  captionDetail: string;
  footTitle: string;
  footDescription: string;
  image?: string;
  imageAlt?: string;
};

export const heroSlides: Record<Locale, HeroSlide[]> = {
  es: [
    {
      visual: "turbine",
      topic: "Diagnóstico integral",
      eyebrow: "Peritaje técnico & ajuste de siniestros",
      title: "Diagnóstico integral",
      accent: "de vulnerabilidades.",
      description: "Prevención y mitigación de riesgos críticos con criterio técnico, experiencia y solvencia en seguros.",
      action: "Solicitar consulta",
      tags: ["Calidad", "Experiencia", "Tecnología"],
      caption: "Ingeniería técnica especializada aplicada a seguros.",
      captionDetail: "Solvencia & confianza",
      footTitle: "Defensa técnica legal de reclamos & siniestros.",
      footDescription: "Ingeniería forense, causa raíz y evaluación de daños para reclamos complejos.",
    },
    {
      visual: "specialties",
      topic: "Especializaciones",
      eyebrow: "Especializaciones sectoriales",
      title: "Especializaciones sectoriales.",
      accent: "Capacidad operativa.",
      description: "Experiencia técnica para cada tipo de riesgo. Conozca los principales ramos atendidos por SEAJUSTE.",
      action: "Consultar especialidad",
      tags: [],
      caption: "Ramos clave atendidos",
      captionDetail: "38 años de experiencia & dominio técnico",
      footTitle: "Criterio especializado para cada tipo de riesgo.",
      footDescription: "Incendio, industria, transporte, marítimo y responsabilidad civil, entre otros ramos.",
    },
    {
      visual: "trust",
      topic: "Reclamos complejos",
      eyebrow: "Engineering for complex claims",
      title: "Defensa técnica legal",
      accent: "de reclamos & siniestros.",
      description: "Ingeniería forense y causa raíz para activos críticos, fallas complejas y pérdidas de operación.",
      action: "Evaluar un caso",
      tags: ["Causa raíz", "Cuantificación", "Evidencia"],
      caption: "Engineering for complex claims.",
      captionDetail: "Energy & power loss adjusting",
      footTitle: "Análisis técnico para activos críticos.",
      footDescription: "Turbinas, generadores y transformadores donde una falla impacta la operación.",
    },
    {
      visual: "photo",
      topic: "Marine Cargo",
      eyebrow: "Ship’s hull · Machinery · Marine cargo",
      title: "Marine Cargo.",
      accent: "De origen a destino.",
      description: "Trazabilidad técnica de la carga: inspección, seguimiento y control en cada etapa del movimiento y puesta en servicio.",
      action: "Coordinar inspección",
      tags: ["Inspección", "Transporte", "Montaje"],
      caption: "Ship’s hull, machinery & marine cargo.",
      captionDetail: "Origen · tránsito · destino final",
      footTitle: "Seguimiento técnico hasta el destino final.",
      footDescription: "Descarga, izaje, transporte terrestre, montaje, pruebas y puesta en servicio.",
      image: "marine-transformer-1",
      imageAlt: "Inspección y transporte de un autotransformador en la bodega de un buque",
    },
  ],
  en: [
    {
      visual: "turbine",
      topic: "Risk assessment",
      eyebrow: "Technical expertise & loss adjusting",
      title: "A complete view",
      accent: "of your vulnerabilities.",
      description: "Prevention and mitigation of critical risks through technical judgement, experience and insurance expertise.",
      action: "Request a consultation",
      tags: ["Quality", "Experience", "Technology"],
      caption: "Specialist technical engineering for insurance.",
      captionDetail: "Expertise & trust",
      footTitle: "Technical and legal support for complex claims.",
      footDescription: "Forensic engineering, root cause analysis and damage assessment for complex losses.",
    },
    {
      visual: "specialties",
      topic: "Sector expertise",
      eyebrow: "Specialist sectors",
      title: "Sector expertise.",
      accent: "Operational capability.",
      description: "Technical experience for each type of risk. Explore the principal insurance classes handled by SEAJUSTE.",
      action: "Discuss a specialty",
      tags: [],
      caption: "Key insurance classes",
      captionDetail: "38 years of experience & technical expertise",
      footTitle: "Specialist judgement for each type of risk.",
      footDescription: "Fire, industry, transport, marine and liability, among other insurance classes.",
    },
    {
      visual: "trust",
      topic: "Complex claims",
      eyebrow: "Engineering for complex claims",
      title: "Technical & legal support.",
      accent: "Complex claims.",
      description: "Forensic engineering and root cause analysis for critical assets, complex failures and operational losses.",
      action: "Discuss a case",
      tags: ["Cause analysis", "Loss quantification", "Evidence"],
      caption: "Engineering for complex claims.",
      captionDetail: "Energy & power loss adjusting",
      footTitle: "Technical analysis for critical assets.",
      footDescription: "Turbines, generators and transformers where a failure affects operations.",
    },
    {
      visual: "photo",
      topic: "Marine Cargo",
      eyebrow: "Ship’s hull · Machinery · Marine cargo",
      title: "Marine Cargo.",
      accent: "From origin to destination.",
      description: "Technical cargo traceability: inspection, monitoring and control at every stage of transport and commissioning.",
      action: "Arrange a survey",
      tags: ["Inspection", "Transport", "Assembly"],
      caption: "Ship’s hull, machinery & marine cargo.",
      captionDetail: "Origin · transit · final destination",
      footTitle: "Technical monitoring through to final delivery.",
      footDescription: "Unloading, lifting, land transport, assembly, testing and commissioning.",
      image: "marine-transformer-1",
      imageAlt: "Survey and transport of an autotransformer in a ship’s hold",
    },
  ],
};
