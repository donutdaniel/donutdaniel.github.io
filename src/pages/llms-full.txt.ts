import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET(context: APIContext) {
  const posts = (await getCollection("writing"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const articles: string[] = [];

  for (const post of posts) {
    const filePath = path.resolve(`./src/content/writing/${post.id}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");

    // Strip frontmatter
    const content = raw.replace(/^---[\s\S]*?---\s*/, "");

    // Strip MDX imports and JSX components
    const cleaned = content
      .replace(/^import\s+.*$/gm, "")
      .replace(/<[A-Z]\w*\s*\/>/g, "")
      .replace(/<figure>[\s\S]*?<\/figure>/g, "")
      .trim();

    const date = post.data.pubDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const url = new URL(`/writing/${post.id}/`, context.site!);

    let header = `# ${post.data.title}\n\nPublished: ${date}`;
    if (post.data.tags.length) header += `\nTags: ${post.data.tags.join(", ")}`;
    if (post.data.repo) header += `\nRepo: ${post.data.repo}`;
    if (post.data.website) header += `\nWebsite: ${post.data.website}`;
    header += `\nURL: ${url}`;

    articles.push(`${header}\n\n${cleaned}`);
  }

  const body = `# Daniel Ho — Full Site Content

> Software engineer, writer, potter.

This file contains the complete text content of ${context.site} in clean markdown for LLM consumption.

---

${articles.join("\n\n---\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
