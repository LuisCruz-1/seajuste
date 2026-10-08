import { Barlow_Condensed, IBM_Plex_Mono, Manrope } from "next/font/google";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const utility = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-utility" });

export const fontClassName = `${display.variable} ${body.variable} ${utility.variable}`;
