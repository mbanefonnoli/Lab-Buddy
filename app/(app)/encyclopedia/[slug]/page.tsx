import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BIOMARKERS, getBiomarker } from "@/lib/biomarkers";
import BiomarkerContent from "./BiomarkerContent";

/* ── Static generation ───────────────────────────── */

export function generateStaticParams() {
  return BIOMARKERS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBiomarker(slug);
  if (!b) return { title: "Not Found" };
  return {
    title: `${b.name} — Lab Encyclopedia | Lab Buddy`,
    description: b.seoDescription,
    openGraph: {
      title: `${b.name} Lab Test — What It Means`,
      description: b.seoDescription,
    },
  };
}

/* ── Page ────────────────────────────────────────── */

export default async function BiomarkerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBiomarker(slug);
  if (!b) notFound();

  const relatedBiomarkers = b.relatedTests
    .map((s) => getBiomarker(s))
    .filter(Boolean)
    .slice(0, 4) as (typeof BIOMARKERS)[number][];

  return <BiomarkerContent b={b} relatedBiomarkers={relatedBiomarkers} />;
}
