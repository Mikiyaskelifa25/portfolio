"use client";

import { Printer } from "lucide-react";

/**
 * Opens the browser print dialog. On the resume page this doubles as
 * "Save as PDF", which is why the label mentions both.
 */
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print / Save as PDF
    </button>
  );
}
