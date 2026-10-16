import Image from "next/image";
import { Cpu, Medal, ShieldCheck, BadgeCheck } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { heroCoveragePhotos, heroProjectPhotos } from "@/lib/hero-slides";

export function HeroBrandVisual({ kind, locale }: { kind: "trust" | "turbine" | "coverage"; locale: Locale }) {
  const es = locale === "es";
  const sealAlt = es ? "38 años · Confianza mutua" : "38 years · Mutual trust";

  if (kind === "trust") {
    const statistics = [
      { value: "38+", label: es ? "Años de experiencia\nen seguros" : "Years of experience\nin insurance" },
      { value: "16", label: es ? "Ramos de seguros\nautorizados" : "Authorised\ninsurance classes" },
      { value: "17", label: es ? "Especialistas en\nnuestro equipo" : "Specialists\nin our team" },
    ];
    return <div className="hero-trust-scene">
      <div className="trust-scene-mark"><Image className="trust-scene-seal" src="/images/brand/manos-texto.png" alt={es ? "Confianza mutua" : "Mutual trust"} fill sizes="(max-width: 760px) 80vw, 38vw" preload /></div>
      <dl className="trust-scene-statistics">{statistics.map(({ value, label }) => <div key={value}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="trust-scene-country">Ecuador</p>
    </div>;
  }

  if (kind === "coverage") {
    return <div className="hero-coverage-gallery">
      <div className="hero-project-mosaic">{heroProjectPhotos.map(({ image, alt }) => <div className="hero-project-photo" key={image}><Image src={`/images/projects/${image}.webp`} alt={t(alt, locale)} fill sizes="(max-width: 760px) calc(50vw - 64px), (max-width: 1100px) 20vw, 22vw" /></div>)}</div>
      <div className="hero-coverage-proof">{heroCoveragePhotos.map(({ image, alt }) => <div key={image}><Image src={`/images/projects/${image}.webp`} alt={t(alt, locale)} fill sizes="(max-width: 760px) 64px, (max-width: 1100px) 84px, 110px" /></div>)}</div>
    </div>;
  }

  const pillars = [
    { icon: Cpu, label: es ? "Tecnología" : "Technology" },
    { icon: Medal, label: es ? "Experiencia" : "Experience" },
    { icon: ShieldCheck, label: es ? "Calidad" : "Quality" },
    { icon: BadgeCheck, label: es ? "Solvencia técnica" : "Technical expertise" },
  ];
  return <div className="hero-turbine-scene">
    <div className="turbine-scene-media">
      <Image className="turbine-scene-art" src="/images/brand/turbina.png" alt={es ? "Turbina metálica frente a un complejo industrial portuario al atardecer" : "Metallic turbine overlooking a waterfront industrial complex at sunset"} fill sizes="(max-width: 760px) 90vw, 46vw" />
      <div className="turbine-scene-seal"><Image src="/images/brand/confianza-mutua-38.png" alt={sealAlt} width={330} height={312} sizes="(max-width: 760px) 76px, 96px" preload /></div>
    </div>
    <div className="turbine-pillars">{pillars.map(({ icon: Icon, label }) => <div className="turbine-pillar" key={label}><Icon size={19} strokeWidth={1.5} aria-hidden="true" /><strong>{label}</strong></div>)}</div>
  </div>;
}
