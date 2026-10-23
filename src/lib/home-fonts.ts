import { Archivo, IBM_Plex_Serif } from "next/font/google";

const headline = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-home-display" });
const editorial = IBM_Plex_Serif({ subsets: ["latin"], weight: "500", style: "italic", display: "swap", variable: "--font-home-editorial" });

export const homeFontClassName = `${headline.variable} ${editorial.variable}`;
