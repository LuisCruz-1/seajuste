import Image from "next/image";
import { Cpu, Medal, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function HeroBrandVisual({ kind, locale }: { kind: "turbine" | "trust"; locale: Locale }) {
  const es = locale === "es";
  const sealAlt = es ? "38 años · Confianza mutua" : "38 years · Mutual trust";

  if (kind === "trust") {
    return <div className="hero-trust-scene">
      <p className="eyebrow">{es ? "Experiencia que respalda cada decisión" : "Experience behind every decision"}</p>
      <div className="trust-orbit" aria-hidden="true" />
      <Image className="trust-scene-seal" src="/images/brand/confianza-mutua-38.png" alt={sealAlt} width={330} height={312} sizes="(max-width: 760px) 210px, 260px" />
      <div className="trust-scene-copy"><span>{es ? "Ingeniería forense & causa raíz" : "Forensic engineering & root cause analysis"}</span></div>
      <div className="trust-scene-values"><span>{es ? "Análisis" : "Analysis"}</span><span>{es ? "Evidencia" : "Evidence"}</span><span>{es ? "Respaldo técnico" : "Technical support"}</span></div>
    </div>;
  }

  const pillars = [
    { icon: ShieldCheck, label: es ? "Calidad" : "Quality", detail: es ? "Rigor técnico" : "Technical rigor" },
    { icon: Medal, label: es ? "Experiencia" : "Experience", detail: es ? "38 años en seguros" : "38 years in insurance" },
    { icon: Cpu, label: es ? "Tecnología" : "Technology", detail: es ? "Precisión y evidencia" : "Precision & evidence" },
  ];
  return <div className="hero-turbine-scene">
    <div className="turbine-scene-media">
      <Image className="turbine-scene-art" src="/images/brand/turbina.png" alt={es ? "Turbina metálica frente a un complejo industrial portuario al atardecer" : "Metallic turbine overlooking a waterfront industrial complex at sunset"} fill sizes="(max-width: 760px) 90vw, 46vw" preload />
      <div className="turbine-scene-seal"><Image src="/images/brand/confianza-mutua-38.png" alt={sealAlt} width={330} height={312} sizes="(max-width: 760px) 76px, 96px" preload /></div>
    </div>
    <div className="turbine-pillars">{pillars.map(({ icon: Icon, label, detail }) => <div className="turbine-pillar" key={label}><Icon size={20} strokeWidth={1.5} aria-hidden="true" /><div><strong>{label}</strong><span>{detail}</span></div></div>)}</div>
    <div className="turbine-scene-caption"><span className="eyebrow">{es ? "Precisión técnica. Compromiso humano." : "Technical precision. Human commitment."}</span><strong>{es ? "Solvencia & confianza." : "Expertise & trust."}</strong></div>
  </div>;
}
