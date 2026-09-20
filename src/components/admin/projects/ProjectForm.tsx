"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ProjectMediaRows } from "./ProjectMediaRows";
import type { ActionResult } from "@/lib/admin-action-result";

type ServiceOption = { id: string; name: string };
type TechnologyOption = { id: string; name: string };

type ProjectFormValues = {
  title: string;
  slug: string;
  client: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  process: string;
  results: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  serviceIds: string[];
  technologyIds: string[];
  media: {
    type: "IMAGE" | "VIDEO" | "EMBED";
    url: string;
    thumbnailUrl: string;
    alt: string;
    caption: string;
    isHero: boolean;
  }[];
};

const EMPTY: ProjectFormValues = {
  title: "",
  slug: "",
  client: "",
  summary: "",
  overview: "",
  challenge: "",
  solution: "",
  process: "",
  results: "",
  liveUrl: "",
  featured: false,
  published: false,
  serviceIds: [],
  technologyIds: [],
  media: [],
};

export function ProjectForm({
  action,
  allServices,
  allTechnologies,
  initialValues = EMPTY,
  slugLocked = false,
}: {
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  allServices: ServiceOption[];
  allTechnologies: TechnologyOption[];
  initialValues?: ProjectFormValues;
  slugLocked?: boolean;
}) {
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {
    success: false,
  });

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {state.error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="annotation uppercase">Basics</legend>

        <TextField
          label="Title"
          name="title"
          defaultValue={initialValues.title}
          errors={state.fieldErrors?.title}
          required
        />

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-ink">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={initialValues.slug}
            disabled={slugLocked}
            required
            className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink disabled:bg-steam disabled:text-muted focus-visible:border-deep-sea"
          />
          {slugLocked && (
            <p className="mt-1 text-sm text-muted">
              Locked because this project is published — unpublish first to
              change its slug.
            </p>
          )}
          {state.fieldErrors?.slug && (
            <p className="mt-1 text-sm text-red-700">{state.fieldErrors.slug[0]}</p>
          )}
        </div>

        <TextField
          label="Client (optional)"
          name="client"
          defaultValue={initialValues.client}
          errors={state.fieldErrors?.client}
        />

        <TextField
          label="Summary"
          name="summary"
          defaultValue={initialValues.summary}
          errors={state.fieldErrors?.summary}
          required
          helpText="Short description shown on cards and used for search."
        />

        <TextField
          label="Live URL (optional)"
          name="liveUrl"
          defaultValue={initialValues.liveUrl}
          errors={state.fieldErrors?.liveUrl}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="annotation uppercase">
          Case study (all optional — empty fields are simply omitted on the
          public page)
        </legend>
        <TextArea label="Overview" name="overview" defaultValue={initialValues.overview} />
        <TextArea label="Challenge" name="challenge" defaultValue={initialValues.challenge} />
        <TextArea label="Solution" name="solution" defaultValue={initialValues.solution} />
        <TextArea label="Process" name="process" defaultValue={initialValues.process} />
        <TextArea label="Results" name="results" defaultValue={initialValues.results} />
      </fieldset>

      <fieldset>
        <legend className="annotation uppercase">Services</legend>
        {state.fieldErrors?.serviceIds && (
          <p className="mt-1 text-sm text-red-700">
            {state.fieldErrors.serviceIds[0]}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-4">
          {allServices.map((service) => (
            <label key={service.id} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                name="serviceIds"
                value={service.id}
                defaultChecked={initialValues.serviceIds.includes(service.id)}
              />
              {service.name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="annotation uppercase">Technologies</legend>
        {allTechnologies.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            No technologies exist yet — add some under Technologies first.
          </p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-4">
            {allTechnologies.map((tech) => (
              <label key={tech.id} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="technologyIds"
                  value={tech.id}
                  defaultChecked={initialValues.technologyIds.includes(tech.id)}
                />
                {tech.name}
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="annotation uppercase">Media</legend>
        <p className="mt-1 text-sm text-muted">
          URL-based for now — file upload is a later phase. Paste a hosted
          image/video URL or a YouTube/Vimeo embed URL.
        </p>
        <div className="mt-3">
          <ProjectMediaRows initialRows={initialValues.media} />
        </div>
      </fieldset>

      <fieldset className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialValues.featured}
          />
          Featured (shown on homepage)
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initialValues.published}
          />
          Published (visible on the public site)
        </label>
      </fieldset>

      <SubmitButton>Save project</SubmitButton>
    </form>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  errors,
  required,
  helpText,
}: {
  label: string;
  name: string;
  defaultValue: string;
  errors?: string[];
  required?: boolean;
  helpText?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
      />
      {helpText && <p className="mt-1 text-sm text-muted">{helpText}</p>}
      {errors && <p className="mt-1 text-sm text-red-700">{errors[0]}</p>}
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="mt-1 w-full rounded border border-rule bg-surface px-3 py-2 text-ink focus-visible:border-deep-sea"
      />
    </div>
  );
}
