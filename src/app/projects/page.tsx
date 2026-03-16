import { DashboardLayout } from "@/components/DashboardLayout";
import { getProjects } from "@/lib/services";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase rounded-md tracking-widest">
            DB Backed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group">
              <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm group-hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <StatusBadge status={project.status} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Repo</span>
                    <span className="text-slate-600 dark:text-zinc-400 font-mono">{project.repo}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Milestone</span>
                    <span className="text-slate-600 dark:text-zinc-400">{project.milestone}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
