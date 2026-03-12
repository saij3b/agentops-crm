import AgentRunsTable from "@/components/AgentRunsTable";
import ApprovalCenter from "@/components/ApprovalCenter";
import { mockAgentRuns, mockApprovalItems } from "@/data/mockData";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">AgentOps CRM</h1>
          </div>
          <nav className="hidden sm:flex gap-6">
            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400">Dashboard</a>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Agents</a>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Settings</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <section className="p-6 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <AgentRunsTable runs={mockAgentRuns} />
            </section>
          </div>

          <div className="flex flex-col gap-8">
            <section className="p-6 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <ApprovalCenter initialItems={mockApprovalItems} />
            </section>

            <section className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-2">System Status</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">All systems operational</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
