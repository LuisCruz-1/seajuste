"use client";

import { useId } from "react";
import Link from "next/link";
import { privacyHref, type Locale } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy";

export function PrivacyConsent({ locale, onChange }: { locale: Locale; onChange: () => void }) {
  const id = useId();
  const c = privacyCopy[locale];
  return <div className="consultation-consent">
    <input id={id} type="checkbox" name="consent" required onChange={onChange} />
    <label htmlFor={id}>{c.agreement} <Link href={privacyHref(locale)} target="_blank" rel="noopener noreferrer">{c.link}</Link>. <span aria-hidden="true">*</span></label>
  </div>;
}
