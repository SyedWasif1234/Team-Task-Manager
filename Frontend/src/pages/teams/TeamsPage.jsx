import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Users, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { PageLoader } from '../../components/ui/Loader';
import { useTeamStore } from '../../stores/useTeamStore';

export default function TeamsPage() {
  const { teams, isLoading, fetchTeams, createTeam } = useTeamStore();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await createTeam({ name, description });
      setShowCreate(false);
      setName('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (isLoading && teams.length === 0) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Teams</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your teams and collaborate</p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreate(true)}>Create Team</Button>
      </div>

      {/* Teams Grid */}
      {teams.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No teams yet"
          description="Create your first team to start collaborating"
          actionLabel="Create Team"
          onAction={() => setShowCreate(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/teams/${team.id}`}>
                <Card className="group hover:border-[var(--accent)]/40 h-full">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: team.avatarColor || '#0492C2' }}
                    >
                      {team.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {team.name}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5 line-clamp-2">
                        {team.description || 'No description'}
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors mt-1 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Team Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Team">
        {error && (
          <div className="bg-[var(--danger)]/10 text-[var(--danger)] text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Team Name"
            placeholder="e.g. Engineering"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Description (optional)"
            placeholder="What does this team work on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" loading={creating}>Create Team</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
