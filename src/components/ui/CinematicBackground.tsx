"use client";

export function CinematicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      {/* Main Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/8 blur-[180px]" />

      {/* Secondary Glow */}
      <div className="absolute right-[-120px] top-1/3 h-[420px] w-[420px] rounded-full bg-blue-500/8 blur-[160px]" />

      {/* Soft Grid */}
      <div className="absolute inset-0 opacity-[0.08] hero-grid" />

      {/* Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.35)_100%)]" />
    </div>
  );
}
