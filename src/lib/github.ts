import { Octokit } from "octokit";

if (typeof window !== "undefined") {
  throw new Error("GitHub API client must only be used on the server.");
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

function parseRepo(repo: string) {
  const clean = repo.replace("https://github.com/", "").replace(".git", "");
  const parts = clean.split("/");
  if (parts.length < 2) {
    return null;
  }

  return { owner: parts[parts.length - 2], name: parts[parts.length - 1] };
}

export async function getLivePullRequests(repoString: string) {
  const repoInfo = parseRepo(repoString);
  if (!repoInfo) {
    return [];
  }

  try {
    const { data: pulls } = await octokit.rest.pulls.list({
      owner: repoInfo.owner,
      repo: repoInfo.name,
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
      source: "live" as const,
    }));
  } catch (error) {
    console.error(`[github-api] Error fetching PRs for ${repoString}:`, error);
    return [];
  }
}

export async function getLiveIssues(repoString: string) {
  const repoInfo = parseRepo(repoString);
  if (!repoInfo) {
    return [];
  }

  try {
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner: repoInfo.owner,
      repo: repoInfo.name,
      state: "open",
      sort: "updated",
      direction: "desc",
      per_page: 10,
    });

    return issues.filter((issue) => !issue.pull_request).map((issue) => ({
      id: issue.id.toString(),
      number: issue.number,
      title: issue.title,
      state: issue.state,
      user: issue.user?.login,
      updatedAt: issue.updated_at,
      labels: issue.labels.map((label) => (typeof label === "string" ? label : label.name)),
      source: "live" as const,
    }));
  } catch (error) {
    console.error(`[github-api] Error fetching issues for ${repoString}:`, error);
    return [];
  }
}
