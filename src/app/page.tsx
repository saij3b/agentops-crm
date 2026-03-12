import { activityTimeline, agents, issues } from '@/lib/data';
import { ActivityTimeline } from '@/components/ActivityTimeline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">AgentOps CRM Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content - Issues */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Active Issues</h2>
              <div className="divide-y">
                {issues.map((issue) => (
                  <div key={issue.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{issue.title}</p>
                      <p className="text-sm text-gray-500">{issue.id} • {issue.priority}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      issue.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      issue.status === 'blocked' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Activity Timeline</h2>
              <ActivityTimeline events={activityTimeline} />
            </section>
          </div>

          {/* Sidebar - Agents */}
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Agents</h2>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${
                      agent.status === 'busy' ? 'bg-yellow-400' :
                      agent.status === 'idle' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.role} • {agent.activeIssues} active</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
