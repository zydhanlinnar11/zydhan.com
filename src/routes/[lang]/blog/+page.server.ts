import { readdirSync, readFileSync } from 'node:fs';
import { compile } from 'mdsvex';

interface Frontmatter {
  author: string;
  description: string;
  createdAt: string;
  title: string;
  image: string;
}

export interface Post extends Frontmatter {
  slug: string;
}

export const load = async ({ params }) => {
  const postsPath = './src/routes/[lang]/blog/posts';
  const slugs = readdirSync(postsPath);
  const posts: Post[] = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const content = readFileSync(`${postsPath}/${slug}/+page.svx`);
    const compiled = await compile(content.toString());
    const frontmatter = compiled?.data?.fm as Frontmatter;
    if (!frontmatter) continue;
    posts.push({
      slug,
      ...frontmatter,
    });
  }
  return {
    posts,
  };
};
