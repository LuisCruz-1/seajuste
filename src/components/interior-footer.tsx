"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { href, type Locale } from "@/lib/i18n";

export function InteriorFooter({ locale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname();
  return pathname === href(locale) ? null : children;
}
