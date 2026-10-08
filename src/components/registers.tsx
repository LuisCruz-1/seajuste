"use client";

import { useId, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export function Registers({ groups, labels }: {
  groups: { title: string; rows: { code: string; description: string }[] }[];
  labels: { search: string; code: string; description: string; empty: string; clear: string; results: string; resultSingular: string };
}) {
  const [query, setQuery] = useState("");
  const id = useId();
  const normal = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const filtered = groups.map((group) => ({ ...group, rows: group.rows.filter((row) => normal(`${row.code} ${row.description}`).includes(normal(query))) }));
  const count = filtered.reduce((total, group) => total + group.rows.length, 0);
  return (
    <div className="register-browser">
      <label className="search-field"><Search size={18} aria-hidden="true" /><span className="sr-only">{labels.search}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} />{query && <button aria-label={labels.clear} onClick={() => setQuery("")}><X size={16} /></button>}</label>
      <p aria-live="polite" className="results-count">{count} {count === 1 ? labels.resultSingular : labels.results}</p>
      {filtered.map((group, index) => <details className="register-group" key={`${id}-${index}`} open={query ? true : undefined}><summary><span>{group.title}</span><span className="register-count">{group.rows.length}</span><ChevronDown size={20} aria-hidden="true" /></summary>
        {group.rows.length ? <div className="table-scroll"><table><caption className="sr-only">{group.title}</caption><thead><tr><th scope="col">{labels.code}</th><th scope="col">{labels.description}</th></tr></thead><tbody>{group.rows.map((row) => <tr key={row.code}><th scope="row">{row.code}</th><td>{row.description}</td></tr>)}</tbody></table></div> : <p className="register-empty">{labels.empty}</p>}
      </details>)}
    </div>
  );
}
