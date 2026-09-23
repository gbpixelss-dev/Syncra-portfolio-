
"use client";

import { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="reveal"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
