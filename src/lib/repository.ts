export const defaultRepository = {
  url: 'https://github.com/cmglezpdev/rewind',
  branch: 'main',
};

/** GitHub owns authentication, editing, branching, and proposing the change. */
export function githubEditUrl({ repositoryUrl, branch = 'main', sourcePath }: { repositoryUrl: string; branch?: string; sourcePath: string }): string | undefined {
  if (!repositoryUrl.trim()) return undefined;
  const url = new URL(repositoryUrl);
  const repository = url.pathname.replace(/\.git\/?$/, '').replace(/\/$/, '');
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || !/^\/[^/]+\/[^/]+$/.test(repository) || url.username || url.password || url.search || url.hash) {
    throw new Error('GITHUB_REPOSITORY_URL must be an HTTPS GitHub repository URL, such as https://github.com/owner/repo.');
  }
  if (!branch.trim()) throw new Error('GITHUB_EDIT_BRANCH must be a branch name.');
  if (sourcePath.startsWith('/') || sourcePath.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error('An edit link needs a repository-relative source file path.');
  }
  return `${url.origin}${repository}/edit/${encodeURIComponent(branch)}/${sourcePath.split('/').map(encodeURIComponent).join('/')}`;
}
