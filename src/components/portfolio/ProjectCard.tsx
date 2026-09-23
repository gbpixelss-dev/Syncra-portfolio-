"use client";

import Link from "next/link";
import type { ProjectSummary } from "@/content/projects";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full"
    >
      <article className="glass-card relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/35 hover:shadow-[0_0_45px_rgba(46,197,255,.18)]">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-3xl" />
        </div>

        {/* Premium placeholder panel */}
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-[#08111f] via-[#0b1528] to-[#050816]">
          <div className="absolute inset-0 opacity-10 hero-grid" />

          <div className="text-center transition duration-700 group-hover:scale-105">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />
              </svg>
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Case Study
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="text-2xl font-semibold text-white transition group-hover:text-cyan-300">
              {project.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              {project.summary}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-cyan-300 transition group-hover:translate-x-2">
            <span className="text-sm font-medium">View Case Study</span>

            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
