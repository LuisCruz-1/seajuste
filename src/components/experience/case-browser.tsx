"use client";

import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import { experienceCopy } from "@/lib/experience/copy";
import type { Locale } from "@/lib/i18n";
import type { ExperienceEquipment, ExperienceKind, ExperienceSpecialty } from "@/lib/experience/types";
import { ExperienceCard, type ExperienceCardData } from "./case-card";
import styles from "./experience.module.css";

const pageSize = 9;

export function ExperienceBrowser({ items, locale }: { items: ExperienceCardData[]; locale: Locale }) {
  const id = useId();
  const c = experienceCopy[locale];
  const [specialty, setSpecialty] = useState<ExperienceSpecialty | "all">("all");
  const [equipment, setEquipment] = useState<ExperienceEquipment | "all">("all");
  const [kind, setKind] = useState<ExperienceKind | "all">("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(pageSize);
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase(locale);
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const filtered = items.filter((item) => {
    const searchable = normalize([item.title, item.client, item.location, item.summary, item.equipmentLabel, item.kindLabel, ...item.specialtyLabels].join(" "));
    return (specialty === "all" || item.specialties.includes(specialty))
      && (equipment === "all" || item.equipment === equipment)
      && (kind === "all" || item.kind === kind)
      && words.every((word) => searchable.includes(word));
  });
  const hasFilters = specialty !== "all" || equipment !== "all" || kind !== "all" || query.length > 0;

  function clear() {
    setSpecialty("all");
    setEquipment("all");
    setKind("all");
    setQuery("");
    setShown(pageSize);
  }

  return <div className={styles.browser}>
    <div className={styles.specialties} role="group" aria-label={c.specialty}>
      <button type="button" aria-pressed={specialty === "all"} aria-controls={`${id}-results`} onClick={() => { setSpecialty("all"); setShown(pageSize); }}>{c.all}<span>{items.length}</span></button>
      {(Object.keys(c.specialties) as ExperienceSpecialty[]).map((key) => <button type="button" key={key} aria-pressed={specialty === key} aria-controls={`${id}-results`} onClick={() => { setSpecialty(key); setShown(pageSize); }}>{c.specialties[key]}<span>{items.filter((item) => item.specialties.includes(key)).length}</span></button>)}
    </div>
    <div className={styles.filters}>
      <div className={styles.searchControl}>
        <label htmlFor={`${id}-query`}>{c.search}</label>
        <div><Search size={19} aria-hidden="true" /><input id={`${id}-query`} type="search" value={query} placeholder={c.searchPlaceholder} onChange={(event) => { setQuery(event.target.value); setShown(pageSize); }} aria-controls={`${id}-results`} /></div>
      </div>
      <div className={styles.selectControl}>
        <label htmlFor={`${id}-equipment`}>{c.equipmentLabel}</label>
        <select id={`${id}-equipment`} value={equipment} onChange={(event) => { setEquipment(event.target.value as ExperienceEquipment | "all"); setShown(pageSize); }} aria-controls={`${id}-results`}>
          <option value="all">{c.allEquipment}</option>
          {(Object.keys(c.equipment) as ExperienceEquipment[]).map((key) => <option key={key} value={key}>{c.equipment[key]}</option>)}
        </select>
      </div>
      <div className={styles.selectControl}>
        <label htmlFor={`${id}-kind`}>{c.kindLabel}</label>
        <select id={`${id}-kind`} value={kind} onChange={(event) => { setKind(event.target.value as ExperienceKind | "all"); setShown(pageSize); }} aria-controls={`${id}-results`}>
          <option value="all">{c.allKinds}</option>
          {(Object.keys(c.kinds) as ExperienceKind[]).map((key) => <option key={key} value={key}>{c.kinds[key]}</option>)}
        </select>
      </div>
    </div>
    <div className={styles.browserStatus}>
      <p role="status" aria-live="polite" aria-atomic="true">{filtered.length} {filtered.length === 1 ? c.result : c.results}</p>
      {hasFilters && <button type="button" onClick={clear}><X size={16} aria-hidden="true" />{c.clear}</button>}
    </div>
    <div id={`${id}-results`}>
      {filtered.length > 0
        ? <div className={styles.caseGrid}>{filtered.slice(0, shown).map((item) => <ExperienceCard key={item.id} item={item} labels={c} />)}</div>
        : <div className={styles.empty}><Search size={30} strokeWidth={1.4} aria-hidden="true" /><p>{c.empty}</p><button type="button" className={styles.secondaryAction} onClick={clear}>{c.clear}</button></div>}
    </div>
    {shown < filtered.length && <div className={styles.more}><button type="button" className={styles.secondaryAction} onClick={() => setShown((value) => value + pageSize)} aria-controls={`${id}-results`}>{c.more}<span>{Math.min(shown, filtered.length)} / {filtered.length}</span></button></div>}
  </div>;
}
