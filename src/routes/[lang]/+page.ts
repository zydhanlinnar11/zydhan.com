import type GithubRepository from '$lib/types/GithubRepository';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ fetch }) => {
  async function getFromGithub() {
    const response = await fetch(
      `https://api.github.com/users/zydhanlinnar11/repos?sort=updated&per_page=5`,
    );
    if (!response.ok) throw await response.json();
    const data: GithubRepository[] = await response.json();
    return data;
  }

  return {
    repositories: getFromGithub(),
  };
};
