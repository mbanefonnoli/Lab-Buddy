import type { Metadata } from "next";
import EncyclopediaContent from "./EncyclopediaContent";

export const metadata: Metadata = {
  title: "Lab Encyclopedia — Lab Buddy",
  description:
    "A comprehensive guide to 54+ common lab test biomarkers. Learn what each test measures, what normal ranges are, and what high or low results mean.",
  openGraph: {
    title: "Lab Encyclopedia — Lab Buddy",
    description:
      "Plain-English explanations of 54+ blood test biomarkers. Understand your lab results with clear, science-backed guides.",
  },
};

export default function EncyclopediaPage() {
  return <EncyclopediaContent />;
}
