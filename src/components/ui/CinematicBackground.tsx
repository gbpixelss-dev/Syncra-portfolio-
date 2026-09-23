"use client";

import { useEffect, useState } from "react";

export function CinematicBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Mouse spotlight */}
      <div
        className="absolute h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px] transition-all duration-300"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating particles */}
      <div className="particle p1" />
      <div className="particle p2" />
      <div className="particle p3" />
      <div className="particle p4" />
      <div className="particle p5" />
      <div className="particle p6" />
      <div className="particle p7" />
      <div className="particle p8" />
    </div>
  );
}
