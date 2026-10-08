import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type CaseCardData = {
  id: string;
  href: string;
  title: string;
  client: string;
  location: string;
  description: string;
  image: string;
  category: string;
  categoryName: string;
  value?: string;
};

export function CaseCard({ item, action, settlement }: { item: CaseCardData; action: string; settlement: string }) {
  return (
    <article className="case-card">
      <Link href={item.href} className="case-card-photo" tabIndex={-1} aria-hidden="true">
        <Image src={item.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
        <span className="photo-category">{item.categoryName}</span>
      </Link>
      <div className="case-card-body">
        <p className="data-label">{item.client}</p>
        <h3><Link href={item.href}>{item.title}</Link></h3>
        <p className="case-location">{item.location}</p>
        <p className="case-description">{item.description}</p>
        {item.value && <div className="case-value"><span>{settlement}</span><strong>{item.value}</strong></div>}
        <Link className="text-link" href={item.href}>{action}<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
