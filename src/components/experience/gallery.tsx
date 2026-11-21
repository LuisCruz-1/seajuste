"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { experienceCopy } from "@/lib/experience/copy";
import type { Locale } from "@/lib/i18n";
import styles from "./experience.module.css";

export type ExperienceGalleryImage = { src: string; alt: string; caption: string; contextual?: boolean; credit?: string };

export function ExperienceGallery({ images, title, locale }: { images: ExperienceGalleryImage[]; title: string; locale: Locale }) {
  const c = experienceCopy[locale];
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const current = active === null ? undefined : images[active];
  const visible = expanded ? images : images.slice(0, 6);

  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [active]);

  function step(delta: number) {
    setActive((index) => index === null ? null : (index + delta + images.length) % images.length);
  }

  return <>
    <div className={`${styles.galleryGrid} ${images.length === 1 ? styles.singleImage : ""}`}>
      {visible.map((photo, index) => <figure className={styles.galleryFigure} key={photo.src}>
        <button className={styles.galleryImage} type="button" onClick={() => setActive(index)} aria-label={`${c.open}: ${photo.alt}`}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 950px) 50vw, 33vw" />
          <span className={styles.expand}><Maximize2 size={18} aria-hidden="true" /></span>
        </button>
        <figcaption>{photo.contextual && <span className={styles.captionLabel}>{c.contextual}</span>}{photo.caption}{photo.credit && <small>{photo.credit}</small>}</figcaption>
      </figure>)}
    </div>
    {images.length > 6 && <button type="button" className={styles.secondaryAction} onClick={() => setExpanded((value) => !value)}>{expanded ? c.showLess : `${c.showAll} (${images.length})`}</button>}
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`} onClose={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} onKeyDown={(event) => {
      if (images.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        step(event.key === "ArrowLeft" ? -1 : 1);
      }
    }}>
      <div className={styles.dialogTop}><p id={`${id}-title`}>{title}<span>{active === null ? "" : `${active + 1} / ${images.length}`}</span></p><button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label={c.close}><X size={24} aria-hidden="true" /></button></div>
      <div className={styles.dialogImage}>{current && <Image src={current.src} alt={current.alt} fill sizes="95vw" loading="eager" />}</div>
      <div className={styles.dialogBottom}>
        <p id={`${id}-caption`}>{current?.contextual && <span className={styles.captionLabel}>{c.contextual}</span>}{current?.caption}{current?.credit && <small>{current.credit}</small>}</p>
        {images.length > 1 && <div className={styles.dialogNavigation}><button type="button" onClick={() => step(-1)} aria-label={c.previous}><ArrowLeft size={21} aria-hidden="true" /></button><button type="button" onClick={() => step(1)} aria-label={c.next}><ArrowRight size={21} aria-hidden="true" /></button></div>}
      </div>
    </dialog>
  </>;
}
