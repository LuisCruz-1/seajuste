import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { formatMoney, t, type Locale } from "@/lib/i18n";
import { experienceCopy } from "@/lib/experience/copy";
import { experienceHref, type ExperienceId } from "@/lib/experience/routes";
import type { ExperienceCase, ExperienceEquipment, ExperienceKind, ExperienceSpecialty } from "@/lib/experience/types";
import styles from "./experience.module.css";

export type ExperienceCardData = {
  id: ExperienceId;
  href: string;
  title: string;
  client: string;
  location: string;
  summary: string;
  kind: ExperienceKind;
  kindLabel: string;
  equipment: ExperienceEquipment;
  equipmentLabel: string;
  specialties: ExperienceSpecialty[];
  specialtyLabels: string[];
  image?: { src: string; alt: string; contextual?: boolean };
  settlement?: string;
  reference: string;
};

export function toExperienceCard(item: ExperienceCase, locale: Locale): ExperienceCardData {
  const c = experienceCopy[locale];
  const cover = item.images[0];
  return {
    id: item.id, href: experienceHref(locale, item.id), title: t(item.title, locale),
    client: t(item.client, locale), location: t(item.location, locale), summary: t(item.summary, locale),
    kind: item.kind, kindLabel: c.kinds[item.kind], equipment: item.equipment,
    equipmentLabel: c.equipment[item.equipment], specialties: item.specialties,
    specialtyLabels: item.specialties.map((specialty) => c.specialties[specialty]),
    image: cover ? { src: cover.src, alt: t(cover.alt, locale), contextual: cover.contextual } : undefined,
    settlement: item.settlement === undefined ? undefined : formatMoney(item.settlement, locale),
    reference: t(item.evidence, locale),
  };
}

export function ExperienceCard({ item, labels }: {
  item: ExperienceCardData;
  labels: { view: string; settlement: string; contextual: string; record: string };
}) {
  const titleId = `experience-card-${item.id}`;
  return <article className={styles.card}>
    <Link href={item.href} className={styles.cardLink} aria-labelledby={titleId}>
      <div className={styles.cardVisual}>
        {item.image
          ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1050px) 50vw, 33vw" />
          : <div className={styles.recordCover}><FileText size={30} strokeWidth={1.3} aria-hidden="true" /><span>{labels.record}</span><strong>{item.client}</strong><p>{item.reference}</p></div>}
        {item.image?.contextual && <span className={styles.referenceBadge}>{labels.contextual}</span>}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}><span>{item.kindLabel}</span><span>{item.equipmentLabel}</span></div>
        <h3 id={titleId}>{item.title}</h3>
        <p className={styles.cardLocation}>{item.location}</p>
        <p className={styles.cardSummary}>{item.summary}</p>
        {item.settlement && <div className={styles.cardSettlement}><span>{labels.settlement}</span><strong>{item.settlement}</strong></div>}
        <span className={styles.cardAction}>{labels.view}<ArrowUpRight size={18} aria-hidden="true" /></span>
      </div>
    </Link>
  </article>;
}
