import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { PageLoader } from '../../components/ui/Loader';
import { useAuthStore } from '../../stores/useAuthStore';
import { useDashboardStore } from '../../stores/useDashboardStore';
import { useTeamStore } from '../../stores/useTeamStore';

function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{value ?? '—'}</p>
          <p className="text-sm text-[var(--text-secondary)]">{label}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { dashboard, isLoading, fetchDashboard } = useDashboardStore();
  const { teams, fetchTeams } = useTeamStore();

  useEffect(() => {
    fetchDashboard();
    fetchTeams();
  }, []);

  if (isLoading) return <PageLoader />;

  const stats = dashboard || {};
  console.log("stats :" , stats)
  const pendingTasks = (stats.byStatus?.TODO ?? 0) + (stats.byStatus?.IN_REVIEW ?? 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome back, <span className="gradient-text">{user?.username || 'User'}</span> 👋
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">Here's what's happening with your tasks today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle} label="Total Done" value={stats?.completedTasks} color="#22c55e" delay={0} />
        <StatCard icon={Clock} label="In Progress" value={stats?.tasksByStatus?.IN_PROGRESS} color="#f59e0b" delay={0.1} />
        <StatCard icon={BarChart3} label="Pending" value={stats?.pendingTasks} color="#0492C2" delay={0.2} />
        <StatCard icon={AlertTriangle} label="Overdue" value={stats?.overdueTasksCount} color="#ef4444" delay={0.3} />
      </div>

      {/* Teams Quick Access */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Your Teams</h2>
          <Link to="/teams" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {teams.length === 0 ? (
          <Card>
            <p className="text-center text-[var(--text-muted)] py-6">
              No teams yet.{' '}
              <Link to="/teams" className="text-[var(--accent)] hover:underline">Create one</Link>
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.slice(0, 6).map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <Link to={`/teams/${team.id}`}>
                  <Card className="group hover:border-[var(--accent)]/40">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: team.avatarColor || '#0492C2' }}
                      >
                        {team.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                          {team.name}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {team.description || 'No description'}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
