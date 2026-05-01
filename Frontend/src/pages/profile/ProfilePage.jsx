import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, User, Shield, Users } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useTeamStore } from '../../stores/useTeamStore';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/helpers';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { teams, fetchTeams } = useTeamStore();

  useEffect(() => {
    fetchTeams();
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="relative overflow-hidden p-0">
          <div className="h-32 gradient-bg" />
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-4">
              <div className="p-1 bg-[var(--bg-card)] rounded-full">
                <Avatar name={user.username} src={user.profilePicture} size="xl" />
              </div>
              {user.role === 'ADMIN' && (
                <Badge color="accent" className="mb-2">
                  <Shield size={14} /> Global Admin
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{user.username}</h1>
            <p className="text-[var(--text-secondary)] flex items-center gap-2 mt-1">
              <Mail size={16} /> {user.email}
            </p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-1 space-y-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Account Details</h2>
          <Card className="space-y-4">
            <div>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <User size={14} /> Username
              </p>
              <p className="font-medium text-[var(--text-primary)]">{user.username}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Mail size={14} /> Email Address
              </p>
              <p className="font-medium text-[var(--text-primary)]">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Calendar size={14} /> Joined On
              </p>
              <p className="font-medium text-[var(--text-primary)]">{formatDate(user.createdAt)}</p>
            </div>
          </Card>
        </motion.div>

        {/* Teams List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <Users size={20} /> My Teams ({teams.length})
          </h2>
          {teams.length === 0 ? (
            <Card>
              <p className="text-[var(--text-muted)] py-4 text-center">You haven't joined any teams yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teams.map((team, i) => (
                <motion.div key={team.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <Card hover={false} className="flex items-center gap-3 p-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: team.avatarColor || '#0492C2' }}
                    >
                      {team.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{team.name}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
