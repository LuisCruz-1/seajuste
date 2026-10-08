"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { CaseCard, type CaseCardData } from "./cards";

export function CaseGrid({ items, labels }: {
  items: CaseCardData[];
  labels: { all: string; search: string; categories: Record<string, string>; action: string; settlement: string; empty: string; clear: string; results: string; resultSingular: string };
}) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const normalized = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const filtered = items.filter((item) => (category === "all" || item.category === category) && normalized(`${item.title} ${item.client} ${item.location} ${item.categoryName}`).includes(normalized(query)));

  return (
    <div className="case-browser">
      <div className="case-filters">
        <div className="filter-tabs" aria-label={labels.search}>
          <button aria-pressed={category === "all"} onClick={() => setCategory("all")}>{labels.all}</button>
          {Object.entries(labels.categories).map(([key, label]) => <button key={key} aria-pressed={category === key} onClick={() => setCategory(key)}>{label}</button>)}
        </div>
        <label className="search-field"><Search size={18} aria-hidden="true" /><span className="sr-only">{labels.search}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} />{query && <button type="button" onClick={() => setQuery("")} aria-label={labels.clear}><X size={16} /></button>}</label>
      </div>
      <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? labels.resultSingular : labels.results}</p>
      {filtered.length ? <div className="case-grid">{filtered.map((item) => <CaseCard key={item.id} item={item} action={labels.action} settlement={labels.settlement} />)}</div> : <div className="empty-state"><p>{labels.empty}</p><button className="text-link" onClick={() => { setQuery(""); setCategory("all"); }}>{labels.clear}</button></div>}
    </div>
  );
}
