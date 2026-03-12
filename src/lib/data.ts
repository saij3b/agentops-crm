export const navItems = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { name: 'Clients', href: '/clients', icon: 'Users' },
  { name: 'Projects', href: '/projects', icon: 'FolderKanban' },
  { name: 'Runs', href: '/runs', icon: 'Play' },
  { name: 'Approvals', href: '/approvals', icon: 'CheckCircle' },
  { name: 'Timeline', href: '/timeline', icon: 'Calendar' },
];

export const stats = [
  { label: 'Active Clients', value: 12, change: '+2', changeType: 'increase' },
  { label: 'Active Projects', value: 24, change: '+4', changeType: 'increase' },
  { label: 'Running Agent Jobs', value: 8, change: 'Stable', changeType: 'neutral' },
  { label: 'Paused Jobs', value: 3, change: '-1', changeType: 'decrease' },
  { label: 'Approvals Waiting', value: 5, change: '+2', changeType: 'increase' },
  { label: 'Blocked Items', value: 2, change: '0', changeType: 'neutral' },
  { label: 'Open PRs', value: 15, change: '+5', changeType: 'increase' },
  { label: 'Failures Today', value: 1, change: '-2', changeType: 'decrease' },
];
