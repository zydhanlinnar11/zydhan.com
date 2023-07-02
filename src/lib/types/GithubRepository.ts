type GithubRepository = {
  id: number;
  name: string;
  description?: string;
  topics: string[];
  html_url: string;
};

export default GithubRepository;
