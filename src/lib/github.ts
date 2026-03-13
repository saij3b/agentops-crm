import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

function parseRepo(repo: string) {
  // Handles "owner/repo" or "https://github.com/owner/repo"
  const clean = repo.replace("https://github.com/", "").replace(".git", "");
  const [owner, name] = clean.split("/");
  return { owner, name };
}

export async function getLivePullRequests(repoString: string) {
  try {
    const { owner, name } = parseRepo(repoString);
    const { data: pulls } = await octokit.rest.pulls.list({
      owner,
      repo: name,
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: 10,
    });

    return pulls.map((pr) => ({
      id: pr.id.toString(),
      number: pr.number,
      title: pr.title,
      state: pr.state,
      user: pr.user?.login,
      updatedAt: pr.updated_at,
      url: pr.html_url,
      isDraft: pr.draft,
    }));
  } catch (error) {
    console.error("Error fetching pull requests:", error);
    return [];
  }
}

export async function getLiveIssues(repoString: string) {
  try {
    const { owner, name } = parseRepo(repoString);
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo: name,
      state: "open",
      sort: "updated",
      direction: "desc",
      per_page: 10,
    });

    return issues.filter(i => !i.pull_request).map((issue) => ({
      id: issue.id.toString(),
      number: issue.number,
      title: issue.title,
      state: issue.state,
      user: issue.user?.login,
      updatedAt: issue.updated_at,
      labels: issue.labels.map(L => typeof L === 'string' ? L : L.name),
    }));
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
}
