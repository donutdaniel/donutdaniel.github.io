import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = (await getCollection("writing"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const site = context.site!;

  const writingEntries = posts
    .map((post) => {
      const url = new URL(`/writing/${post.id}/`, site);
      return `- [${post.data.title}](${url}): ${post.data.description}`;
    })
    .join("\n");

  const body = `# Daniel Ho

> Software engineer, writer, potter.

Personal website of Daniel Ho. I build software, write about what I'm learning, and make pottery when I'm away from the screen.

## About

Daniel Ho is a software engineer who has worked at Anime, Azuki, Koop (technical cofounder), Flexport, Meta, Salesforce, and NASA JPL. He studied at USC where he researched NLP and commonsense reasoning in pre-trained language models (BERT, GPT-2).

## Links

- Website: ${site}
- GitHub: https://github.com/donutdaniel
- X/Twitter: https://x.com/donutdho
- LinkedIn: https://linkedin.com/in/danielho54
- Email: danielho54@gmail.com

## Writing

${writingEntries}

## Publications

- [RICA: Evaluating Robust Inference Capabilities Based on Commonsense Axioms](https://arxiv.org/abs/2005.00782)

## Work

- Anime (anime.com): Social product. News aggregation, streaming, and experiences for anime fans.
- Azuki (azuki.com): Web3 team. Anime NFT brand and community platform.
- Koop (koop.xyz): Technical cofounder. On-chain rails for creators and communities.
- Flexport: Platform and infra team. Dev environments, microservices, shipment domain modeling.
- Meta: Messenger team. Infrastructure, profile and stories processing.
- Salesforce: Core platform. File streaming service for real-time collaboration.
- NASA JPL: Deep learning for CNN noise detection.
- USC: NLP research on commonsense reasoning. TA for Discrete Math and Algorithms.

## Full Content

For complete article text in clean markdown, see: ${new URL("/llms-full.txt", site)}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
