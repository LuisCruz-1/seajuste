export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized = { es: string; en: string };
export const text = (es: string, en: string): Localized => ({ es, en });
export const t = (value: Localized, locale: Locale) => value[locale];
export const isLocale = (value: string): value is Locale => locales.some((locale) => locale === value);

export const sections = {
  about: { es: "nosotros", en: "about" },
  services: { es: "servicios", en: "services" },
  experience: { es: "experiencia", en: "experience" },
  team: { es: "equipo", en: "team" },
  credentials: { es: "acreditaciones", en: "credentials" },
  contact: { es: "contacto", en: "contact" },
} as const;
export type Section = keyof typeof sections;
export const sectionKeys = Object.keys(sections) as Section[];

export const detailSlugs = {
  adjusting: { section: "services", es: "peritaje-y-ajuste", en: "loss-adjusting" },
  energy: { section: "services", es: "energia-y-generacion", en: "energy-and-power" },
  marine: { section: "services", es: "maritimo-y-carga", en: "hull-machinery-and-cargo" },
  engineering: { section: "services", es: "ingenieria-de-siniestros", en: "complex-claims-engineering" },
  interruption: { section: "services", es: "lucro-cesante", en: "business-interruption" },
  equipment: { section: "services", es: "equipo-y-maquinaria", en: "plant-and-equipment" },
  civil: { section: "services", es: "edificios-e-infraestructura", en: "buildings-and-infrastructure" },
  vehicles: { section: "services", es: "peritaje-de-vehiculos", en: "vehicle-surveys" },
  risk: { section: "services", es: "riesgos-y-asistencia-tecnica", en: "risk-and-technical-assistance" },
  tg5: { section: "experience", es: "electroguayas-tg5", en: "electroguayas-tg5" },
  tv1: { section: "experience", es: "trinitaria-tv1", en: "trinitaria-tv1" },
  tg4: { section: "experience", es: "gonzalo-zevallos-tg4", en: "gonzalo-zevallos-tg4" },
  artefacta: { section: "experience", es: "artefacta", en: "artefacta" },
  transformer: { section: "experience", es: "autotransformador-pauwels", en: "pauwels-autotransformer" },
  cargo: { section: "experience", es: "transporte-y-montaje-tg5", en: "tg5-transport-and-assembly" },
  barge: { section: "experience", es: "barcazas-de-generacion", en: "power-barge-survey" },
  excavator: { section: "experience", es: "equipo-caminero", en: "earthmoving-equipment" },
  buildings: { section: "experience", es: "edificios-guayaquil-manta", en: "guayaquil-manta-buildings" },
  roads: { section: "experience", es: "vias-puerto-esmeraldas", en: "esmeraldas-port-roads" },
  urban: { section: "experience", es: "vehiculos-zona-urbana", en: "urban-vehicle-accidents" },
  highway: { section: "experience", es: "transporte-pesado", en: "heavy-vehicle-accidents" },
} as const;
export type DetailId = keyof typeof detailSlugs;

export function href(locale: Locale, section?: Section, detail?: DetailId): string {
  if (!section) return `/${locale}`;
  const base = `/${locale}/${sections[section][locale]}`;
  return detail ? `${base}/${detailSlugs[detail][locale]}` : base;
}

export function getSection(locale: Locale, slug: string): Section | undefined {
  return sectionKeys.find((key) => sections[key][locale] === slug);
}

export function getDetail(locale: Locale, section: Section, slug: string): DetailId | undefined {
  return (Object.keys(detailSlugs) as DetailId[]).find((id) =>
    detailSlugs[id].section === section && detailSlugs[id][locale] === slug,
  );
}

export function translatePath(pathname: string, target: Locale): string {
  const [, language, sectionSlug, detailSlug] = pathname.split("/");
  if (!isLocale(language)) return href(target);
  const section = sectionSlug ? getSection(language, sectionSlug) : undefined;
  const detail = section && detailSlug ? getDetail(language, section, detailSlug) : undefined;
  return href(target, section, detail);
}

export function formatMoney(value: number, locale: Locale) {
  return `USD ${new Intl.NumberFormat(locale === "es" ? "es-EC" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
}
