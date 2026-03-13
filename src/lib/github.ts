import { Octokit } from 'octokit';
import { ActivityEvent, Project } from './types';

const octokit = typeof window === 'undefined' && process.env.GITHUB_TOKEN
  ? new Octokit({ auth: process.env.GITHUB_TOKEN })
  : null;

export async function getRepoStatus(owner: string, repo: string) {
  if (!octokit) return null;

  try {
    const [issues, pulls] = await Promise.all([
      octokit.rest.search.issuesAndPullRequests({
        q: `repo:${owner}/${repo} is:issue is:open`,
        per_page: 1
      }),
      octokit.rest.search.issuesAndPullRequests({
        q: `repo:${owner}/${repo} is:pr is:open`,
        per_page: 1
      }),
    ]);

    return {
      openIssues: issues.data.total_count,
      openPRs: pulls.data.total_count,
    };
  } catch (error) {
    console.error(`Error fetching status for ${owner}/${repo}:`, error);
    return null;
  }
}

export async function getLiveActivity(projects: Project[]): Promise<ActivityEvent[]> {
  if (!octokit) {
    return [];
  }

  const allEvents: ActivityEvent[] = [];

  for (const project of projects) {
    try {
      let repoPath = project.repo;
      if (repoPath.includes('github.com/')) {
        repoPath = repoPath.split('github.com/')[1];
      }

      const [owner, repo] = repoPath.split('/');
      if (!owner || !repo) continue;

      const [issuesRes, pullsRes] = await Promise.all([
        octokit.rest.issues.listForRepo({
          owner,
          repo,
          state: 'all',
          per_page: 10,
          sort: 'created',
          direction: 'desc'
        }),
        octokit.rest.pulls.list({
          owner,
          repo,
          state: 'all',
          per_page: 10,
          sort: 'created',
          direction: 'desc'
        }),
      ]);

      const issueEvents: ActivityEvent[] = issuesRes.data
        .filter((issue: any) => !issue.pull_request)
        .map((issue: any) => ({
          id: `gh-issue-${issue.id}`,
          type: issue.state === 'closed' ? 'issue_completed' : 'issue_created',
          timestamp: issue.created_at,
          actor: {
            name: issue.user?.login || 'unknown',
            avatar: issue.user?.avatar_url,
          },
          target: {
            id: `ISSUE-${issue.number}`,
            title: issue.title,
            type: 'issue',
          },
        }));

      const pullEvents: ActivityEvent[] = pullsRes.data.map((pr: any) => ({
        id: `gh-pr-${pr.id}`,
        type: 'pr_opened',
        timestamp: pr.created_at,
        actor: {
          name: pr.user?.login || 'unknown',
          avatar: pr.user?.avatar_url,
        },
        target: {
          id: `PR-${pr.number}`,
          title: pr.title,
          type: 'pull_request',
        },
        metadata: {
          prNumber: pr.number,
          branchName: pr.head.ref,
        },
      }));

      allEvents.push(...issueEvents, ...pullEvents);
    } catch (error) {
      console.error(`Error fetching data for ${project.repo}:`, error);
    }
  }

  return allEvents.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
