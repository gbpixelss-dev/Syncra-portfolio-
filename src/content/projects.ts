
/** {slug, name} pairs for technologies actually used by at least one
 *  published project — drives the Portfolio technology filter, which
 *  stays hidden when this is empty. */
export const getTechnologiesInUse = cache(
  async (): Promise<readonly { slug: string; name: string }[]> => {
    const all = await getPublishedProjects();
    const seen = new Map<string, string>();
    for (const project of all) {
      project.technologySlugs.forEach((slug, i) => {
        const name = project.technologyNames[i];
        if (name) seen.set(slug, name);
      });
    }
    return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
  }
);
