import type { Locale } from "../i18n";

// Existing experience URLs are retained. This registry is independent of Services.
export const experienceSlugs = {
  tg5: { es: "electroguayas-tg5", en: "electroguayas-tg5" },
  tv1: { es: "trinitaria-tv1", en: "trinitaria-tv1" },
  tg4: { es: "gonzalo-zevallos-tg4", en: "gonzalo-zevallos-tg4" },
  artefacta: { es: "artefacta", en: "artefacta" },
  transformer: { es: "autotransformador-pauwels", en: "pauwels-autotransformer" },
  cargo: { es: "transporte-y-montaje-tg5", en: "tg5-transport-and-assembly" },
  barge: { es: "barcazas-de-generacion", en: "power-barge-survey" },
  excavator: { es: "equipo-caminero", en: "earthmoving-equipment" },
  buildings: { es: "edificios-guayaquil-manta", en: "guayaquil-manta-buildings" },
  roads: { es: "vias-puerto-esmeraldas", en: "esmeraldas-port-roads" },
  urban: { es: "vehiculos-zona-urbana", en: "urban-vehicle-accidents" },
  highway: { es: "transporte-pesado", en: "heavy-vehicle-accidents" },
  pascuales: { es: "autotransformador-mitsubishi-pascuales", en: "pascuales-mitsubishi-autotransformer" },
  boiler: { es: "caldera-termoesmeraldas", en: "termoesmeraldas-boiler" },
  pump: { es: "bomba-alimentacion-trinitaria", en: "trinitaria-boiler-feed-pump" },
  jaramijo: { es: "motores-generacion-jaramijo", en: "jaramijo-generation-engines" },
  diesel: { es: "motores-diesel-y-generadores", en: "diesel-engines-and-generating-sets" },
  propulsion: { es: "maquinaria-propulsion-marina", en: "marine-propulsion-machinery" },
  port2009: { es: "turbogeneradores-puerto-guayaquil-2009", en: "guayaquil-port-turbogenerators-2009" },
  milagro: { es: "autotransformador-pauwels-milagro-2006", en: "milagro-pauwels-autotransformer-2006" },
  milagro2010: { es: "inspeccion-autotransformador-milagro-2010", en: "milagro-autotransformer-inspection-2010" },
  machala: { es: "transformador-mitsubishi-machala", en: "machala-mitsubishi-transformer" },
  trinitariaPhaseC: { es: "transformador-cenemesa-fase-c-trinitaria", en: "trinitaria-cenemesa-phase-c-transformer" },
  trinitariaTransport: { es: "transformador-fase-b-transporte-trinitaria-pascuales", en: "phase-b-transformer-trinitaria-pascuales-transport" },
  pascualesPhaseB: { es: "transformador-westinghouse-fase-b-pascuales", en: "pascuales-westinghouse-phase-b-transformer" },
  pascualesPhasesAC: { es: "transformadores-westinghouse-fases-ac-pascuales", en: "pascuales-westinghouse-phase-ac-transformers" },
  auxiliaryTransformer: { es: "transformador-auxiliar-enrique-garcia", en: "enrique-garcia-auxiliary-transformer" },
  trinitaria1998: { es: "unidad-generacion-trinitaria-1998", en: "trinitaria-generating-unit-1998" },
  santaRosaTg3: { es: "rotor-tg3-santa-rosa", en: "santa-rosa-tg3-rotor" },
  agoyan: { es: "generador-hidroagoyan", en: "hidroagoyan-generator" },
  abbTransport: { es: "transporte-autotransformador-abb-pascuales-machala", en: "abb-autotransformer-pascuales-machala-transport" },
  feedwaterSystem: { es: "sistema-b-alimentacion-caldera-trinitaria", en: "trinitaria-boiler-feedwater-system-b" },
  guangopolo: { es: "motor-5-guangopolo", en: "guangopolo-engine-5" },
  jaramijo10: { es: "motor-10-jaramijo-2013", en: "jaramijo-engine-10-2013" },
  propicia: { es: "motor-2-la-propicia", en: "la-propicia-engine-2" },
  manta2: { es: "motor-mdu-6-manta-ii", en: "manta-ii-mdu-6-engine" },
  pauteLine: { es: "linea-transmision-paute-pascuales", en: "paute-pascuales-transmission-line" },
  trinitariaFeeder: { es: "alimentador-electrico-trinitaria", en: "trinitaria-electrical-feeder" },
  trinitariaDisconnector: { es: "seccionador-trinitaria", en: "trinitaria-disconnector" },
  santaRosaSwitchgear: { es: "disyuntor-pararrayos-santa-rosa", en: "santa-rosa-circuit-breaker-surge-arrester" },
} as const;

export type ExperienceId = keyof typeof experienceSlugs;

export function experienceHref(locale: Locale, id?: ExperienceId) {
  const base = `/${locale}/${locale === "es" ? "experiencia" : "experience"}`;
  return id ? `${base}/${experienceSlugs[id][locale]}` : base;
}

export function getExperienceId(locale: Locale, slug: string): ExperienceId | undefined {
  return (Object.keys(experienceSlugs) as ExperienceId[]).find((id) => experienceSlugs[id][locale] === slug);
}
