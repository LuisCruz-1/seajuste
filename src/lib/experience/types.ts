import type { Localized } from "../i18n";
import type { ExperienceId } from "./routes";

export type ExperienceSpecialty = "energy" | "engineering" | "marine" | "interruption";
export type ExperienceEquipment = "turbines" | "transformers" | "engines" | "boilers" | "transmission" | "barges" | "machinery" | "infrastructure" | "vehicles";
export type ExperienceKind = "claim" | "survey" | "technical";

export type ExperienceImage = {
  src: string;
  alt: Localized;
  caption: Localized;
  contextual?: boolean;
  credit?: string;
};

export type ExperienceDocument = {
  title: Localized;
  description: Localized;
  preview: string;
  width: number;
  height: number;
  href: string;
};

export type ExperienceCase = {
  id: ExperienceId;
  title: Localized;
  client: Localized;
  location: Localized;
  kind: ExperienceKind;
  equipment: ExperienceEquipment;
  specialties: ExperienceSpecialty[];
  summary: Localized;
  context: Localized;
  intervention: Localized;
  scope: Localized[];
  facts: { label: Localized; value: Localized }[];
  images: ExperienceImage[];
  settlement?: number;
  evidence: Localized;
  sections?: { title: Localized; text: Localized; images?: ExperienceImage[] }[];
  documents?: ExperienceDocument[];
  citation?: { quote: Localized; attribution: Localized };
  related: ExperienceId[];
  // Editorial provenance, not exposed in the client-side case browser.
  sourceIds: string[];
};
