import { isDatabaseConfigured } from "@/lib/prisma";

export function getDatabaseStatus() {
  if (isDatabaseConfigured) {
    return {
      label: "DB Backed",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    };
  }

  return {
    label: "Fallback Data",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  };
}

export function toGitHubRepoUrl(repo: string) {
  if (repo.startsWith("http://") || repo.startsWith("https://")) {
    return repo;
  }

  return `https://github.com/${repo}`;
}
