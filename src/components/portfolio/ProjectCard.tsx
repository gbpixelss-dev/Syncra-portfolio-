"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/content/projects";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full"
    >
      <article className="glass-card h-full overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(46,197,255,.18)]">

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#0b1528]">
              <span className="text-cyan-300 text-sm tracking-[0.25em] uppercase">
                SYNCra
              </span>
            </div>
          )}

          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />

          {/* Category badge */}
          {project.category && (
            <div className="absolute left-5 top-5">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-xl">
                {project.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-40%)] flex-col justify-between p-6">
          <div>
            <h3 className="text-2xl font-semibold text-white transition group-hover:text-cyan-300">
              {project.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              {project.summary}
            </p>

            {/* Tech chips */}
            {project.stack?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-xl"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* CTA */}
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
