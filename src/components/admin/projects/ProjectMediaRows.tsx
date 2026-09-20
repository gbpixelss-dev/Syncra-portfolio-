"use client";

import { useState } from "react";

type MediaRow = {
  key: number;
  type: "IMAGE" | "VIDEO" | "EMBED";
  url: string;
  thumbnailUrl: string;
  alt: string;
  caption: string;
  isHero: boolean;
};

let nextKey = 0;

export function ProjectMediaRows({
  initialRows = [],
}: {
  initialRows?: Omit<MediaRow, "key">[];
}) {
  const [rows, setRows] = useState<MediaRow[]>(
    initialRows.map((row) => ({ ...row, key: nextKey++ }))
  );

  function addRow() {
    setRows((current) => [
      ...current,
      {
        key: nextKey++,
        type: "IMAGE",
        url: "",
        thumbnailUrl: "",
        alt: "",
        caption: "",
        isHero: current.length === 0,
      },
    ]);
  }

  function removeRow(key: number) {
    setRows((current) => current.filter((row) => row.key !== key));
  }

  function updateRow(key: number, patch: Partial<MediaRow>) {
    setRows((current) =>
      current.map((row) => (row.key === key ? { ...row, ...patch } : row))
    );
  }

  function setHero(key: number) {
    setRows((current) =>
      current.map((row) => ({ ...row, isHero: row.key === key }))
    );
  }

  return (
    <div>
      <input type="hidden" name="mediaCount" value={rows.length} />

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={row.key} className="rounded border border-rule p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-muted">
                  Type
                </label>
                <select
                  name={`media[${index}].type`}
                  value={row.type}
                  onChange={(e) =>
                    updateRow(row.key, {
                      type: e.target.value as MediaRow["type"],
                    })
                  }
                  className="mt-1 w-full rounded border border-rule bg-surface px-2 py-1.5 text-sm text-ink"
                >
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Video (self-hosted URL)</option>
                  <option value="EMBED">Embed (YouTube/Vimeo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted">
                  URL
                </label>
                <input
                  name={`media[${index}].url`}
                  value={row.url}
                  onChange={(e) => updateRow(row.key, { url: e.target.value })}
                  className="mt-1 w-full rounded border border-rule bg-surface px-2 py-1.5 text-sm text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted">
                  Thumbnail URL (optional, for video/embed)
                </label>
                <input
                  name={`media[${index}].thumbnailUrl`}
                  value={row.thumbnailUrl}
                  onChange={(e) =>
                    updateRow(row.key, { thumbnailUrl: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-rule bg-surface px-2 py-1.5 text-sm text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted">
                  Alt text
                </label>
                <input
                  name={`media[${index}].alt`}
                  value={row.alt}
                  onChange={(e) => updateRow(row.key, { alt: e.target.value })}
                  className="mt-1 w-full rounded border border-rule bg-surface px-2 py-1.5 text-sm text-ink"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-muted">
                  Caption (optional)
                </label>
                <input
                  name={`media[${index}].caption`}
                  value={row.caption}
                  onChange={(e) =>
                    updateRow(row.key, { caption: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-rule bg-surface px-2 py-1.5 text-sm text-ink"
                />
              </div>
            </div>

            <input
              type="hidden"
              name={`media[${index}].order`}
              value={index}
            />
            <input
              type="hidden"
              name={`media[${index}].isHero`}
              value={row.isHero ? "on" : ""}
            />

            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="radio"
                  name="heroSelector"
                  checked={row.isHero}
                  onChange={() => setHero(row.key)}
                />
                Hero media
              </label>
              <button
                type="button"
                onClick={() => removeRow(row.key)}
                className="text-sm text-red-700 hover:text-red-900"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-4 rounded border border-rule px-3 py-1.5 text-sm text-ink hover:border-deep-sea hover:text-deep-sea"
      >
        Add media
      </button>
    </div>
  );
}
