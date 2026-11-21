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
} as const;

export type ExperienceId = keyof typeof experienceSlugs;

export function experienceHref(locale: Locale, id?: ExperienceId) {
  const base = `/${locale}/${locale === "es" ? "experiencia" : "experience"}`;
  return id ? `${base}/${experienceSlugs[id][locale]}` : base;
}

export function getExperienceId(locale: Locale, slug: string): ExperienceId | undefined {
  return (Object.keys(experienceSlugs) as ExperienceId[]).find((id) => experienceSlugs[id][locale] === slug);
}
