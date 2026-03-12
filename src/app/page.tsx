import { stats } from "@/lib/data";
import { StatsCard } from "@/components/StatsCard";

export const metadata = {
  title: "AgentOps CRM",
  description: "Management dashboard for AI agents and clients",
};

export default function Home() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard Overview</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stats-container">
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType as "increase" | "decrease" | "neutral"}
          />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl h-64 flex items-center justify-center text-zinc-400 italic">
          Activity Chart Placeholder
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl h-64 flex items-center justify-center text-zinc-400 italic">
          Recent Runs Placeholder
        </div>
      </div>
    </div>
  );
}
