import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'IA Primeiros Passos',
    description: 'Inteligência artificial explicada de um jeito que qualquer pessoa entende.',
    site: context.site!,
    items: articles.map(article => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/blog/${article.slug}/`,
      categories: article.data.tags,
      author: article.data.author,
    })),
    customData: `<language>pt-BR</language>`,
  });
}
