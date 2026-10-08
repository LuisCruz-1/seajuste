"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Plus, X } from "lucide-react";

export function Gallery({ images, title, labels }: {
  images: string[];
  title: string;
  labels: { open: string; close: string; previous: string; next: string; photo: string; of: string; more: string; less: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const shown = expanded ? images : images.slice(0, 6);

  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    if (!dialog?.open) dialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = oldOverflow; };
  }, [active]);

  const step = (delta: number) => setActive((index) => index === null ? null : (index + delta + images.length) % images.length);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <div className="photo-grid">
        {shown.map((image, index) => <button className="gallery-photo" key={image} onClick={() => setActive(index)} aria-label={`${labels.open}: ${title}, ${index + 1}`}>
          <Image src={image} alt={`${title} · ${labels.photo} ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
          <span className="gallery-expand"><Maximize2 size={17} aria-hidden="true" /></span>
        </button>)}
      </div>
      {images.length > 6 && <button className="button button-outline gallery-more" onClick={() => setExpanded(!expanded)}>{expanded ? labels.less : `${labels.more} (${images.length})`}<Plus size={17} aria-hidden="true" /></button>}
      <dialog className="photo-dialog" ref={dialogRef} aria-labelledby={captionId} onClose={() => setActive(null)} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } if (event.key === "ArrowRight") { event.preventDefault(); step(1); } }}>
        <div className="dialog-toolbar"><p id={captionId}>{title}<span>{labels.photo} {(active ?? 0) + 1} {labels.of} {images.length}</span></p><button onClick={close} aria-label={labels.close} autoFocus><X size={25} /></button></div>
        <div className="dialog-photo">{active !== null && <Image key={images[active]} src={images[active]} alt={`${title} · ${labels.photo} ${active + 1}`} fill sizes="95vw" loading="eager" />}</div>
        <div className="dialog-navigation"><button onClick={() => step(-1)} aria-label={labels.previous}><ArrowLeft size={22} /></button><span>{(active ?? 0) + 1} / {images.length}</span><button onClick={() => step(1)} aria-label={labels.next}><ArrowRight size={22} /></button></div>
      </dialog>
    </>
  );
}
