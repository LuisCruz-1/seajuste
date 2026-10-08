import { ImageResponse } from "next/og";

export const alt = "SEAJUSTE · Engineering for complex claims";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "66px 74px", color: "white", background: "#092f49", position: "relative" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#72cee8" }}><span>SEAJUSTE S.A.</span><span>GUAYAQUIL · QUITO</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, letterSpacing: -3 }}><span>{locale === "en" ? "Technical rigor." : "Rigor técnico."}</span><span style={{ color: "#72cee8" }}>{locale === "en" ? "Trust that endures." : "Confianza que permanece."}</span></div><div style={{ display: "flex", borderTop: "1px solid #487185", paddingTop: 28, justifyContent: "space-between", fontSize: 21 }}><span>ENERGY · MARINE · ENGINEERING</span><span>{locale === "en" ? "LOSS ADJUSTERS" : "AJUSTADORES DE SINIESTROS"}</span></div></div>, size);
}
