"use client";

import Image from "next/image";
import { useState } from "react";

type MediaItem = {
  type: "IMAGE" | "VIDEO" | "EMBED";
  url: string;
  alt?: string | null;
  caption?: string | null;
  thumbnailUrl?: string | null;
};

export function ProjectMedia({
  media,
  title,
}: {
  media: MediaItem | MediaItem[];
  title?: string;
}) {
  const items = Array.isArray(media) ? media : [media];
  const [active, setActive] = useState(0);

  const current = items[active];
  if (!current) return null;

  return (
    <div className="space-y-5">
      <div className="glass-card relative overflow-hidden rounded-[32px] border border-cyan-400/10 bg-[#08111f] shadow-[0_0_60px_rgba(46,197,255,.08)]">
        {current.type === "IMAGE" && (
          <div className="group relative aspect-[16/10] overflow-hidden">
            <Image
              src={current.url}
              alt={current.alt ?? title ?? "Project preview"}
              fill
              priority={active === 0}
              className="object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
          </div>
        )}

        {current.type === "VIDEO" && (
          <div className="group relative aspect-[16/10] overflow-hidden">
            <video
              controls
              playsInline
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            >
              <source src={current.url} />
            </video>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/60 to-transparent" />
          </div>
        )}

        {current.type === "EMBED" && (
          <div className="aspect-[16/10] overflow-hidden">
            <iframe
              src={current.url}
              title={title ?? "Project media"}
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        )}

        {current.caption && (
          <div className="border-t border-white/10 px-5 py-4">
            <p className="text-sm text-slate-300">{current.caption}</p>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {items.map((item, index) => (
            <button
              key={item.url + index}
              onClick={() => setActive(index)}
              className={`group relative aspect-square overflow-hidden rounded-2xl border transition ${
                active === index
                  ? "border-cyan-400 shadow-[0_0_20px_rgba(46,197,255,.35)]"
                  : "border-white/10 hover:border-cyan-400/40"
              }`}
            >
              {item.type === "IMAGE" ? (
                <Image
                  src={item.thumbnailUrl || item.url}
                  alt={item.alt ?? title ?? "Thumbnail"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0b1528] text-cyan-300">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="m8 5 11 7-11 7V5Z" />
                  </svg>
                </div>
              )}

              <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
