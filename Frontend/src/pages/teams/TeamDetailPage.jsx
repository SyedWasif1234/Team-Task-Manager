import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, FolderKanban, UserPlus, Trash2, ArrowRight, Shield, Crown, UserCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import EmptyState from '../../components/ui/EmptyState';
import { PageLoader } from '../../components/ui/Loader';
import { useTeamStore } from '../../stores/useTeamStore';
import { useProjectStore } from '../../stores/useProjectStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { TEAM_ROLE_LABELS, TEAM_ROLES } from '../../utils/constants';

const roleIcons = { OWNER: Crown, ADMIN: Shield, MEMBER: UserCircle };
const roleBadgeColors = { OWNER: 'warning', ADMIN: 'accent', MEMBER: 'muted' };

export default function TeamDetailPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentTeam, members, isLoading, fetchTeamById, fetchMembers, inviteMember, removeMember, changeMemberRole, deleteTeam } = useTeamStore();
  const { projects, fetchProjects, createProject } = useProjectStore();

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamById(teamId);
    fetchMembers(teamId);
    fetchProjects(teamId);
  }, [teamId]);

  const handleInvite = async (e) => {
    e.preventDefault();
    setError('');
    setInviting(true);
    try {
      await inviteMember(teamId, inviteEmail);
      setShowInvite(false);
      setInviteEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setInviting(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError('');
    setCreatingProject(true);
    try {
      await createProject(teamId, { name: projectName, description: projectDesc });
      setShowCreateProject(false);
      setProjectName('');
      setProjectDesc('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCreatingProject(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedMember || !selectedRole) return;
    try {
      await changeMemberRole(teamId, selectedMember.userId, selectedRole);
      setShowRoleModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveMember = async (userId) => {
    if (!confirm('Remove this member from the team?')) return;
    try {
      await removeMember(teamId, userId);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTeam = async () => {
    if (!confirm('Delete this team? This cannot be undone.')) return;
    try {
      await deleteTeam(teamId);
      navigate('/teams');
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading && !currentTeam) return <PageLoader />;

  return (
    <div className="space-y-8">
      {/* Team Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: currentTeam?.avatarColor || '#0492C2' }}
          >
            {currentTeam?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{currentTeam?.name}</h1>
            <p className="text-sm text-[var(--text-secondary)]">{currentTeam?.description || 'No description'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" icon={UserPlus} onClick={() => setShowInvite(true)}>Invite</Button>
          <Button variant="danger" icon={Trash2} size="sm" onClick={handleDeleteTeam}>Delete</Button>
        </div>
      </motion.div>

      {error && (
        <div className="bg-[var(--danger)]/10 text-[var(--danger)] text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Members Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <Users size={20} /> Members ({members.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {members.map((member) => {
            const RoleIcon = roleIcons[member.role] || UserCircle;
            return (
              <Card key={member.id} hover={false} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={member.user?.username} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-[var(--text-primary)]">
                      {member.user?.username}
                      {member.userId === user?.id && (
                        <span className="text-xs text-[var(--text-muted)] ml-1">(you)</span>
                      )}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{member.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={roleBadgeColors[member.role]} dot>
                    <RoleIcon size={12} />
                    {TEAM_ROLE_LABELS[member.role]}
                  </Badge>
                  {member.userId !== user?.id && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setSelectedMember(member); setSelectedRole(member.role); setShowRoleModal(true); }}
                        className="text-xs text-[var(--accent)] hover:underline"
                      >
                        Role
                      </button>
                      <button
                        onClick={() => handleRemoveMember(member.userId)}
                        className="text-xs text-[var(--danger)] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <FolderKanban size={20} /> Projects ({projects.length})
          </h2>
          <Button size="sm" icon={FolderKanban} onClick={() => setShowCreateProject(true)}>New Project</Button>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            description="Create a project to start organizing tasks"
            actionLabel="Create Project"
            onAction={() => setShowCreateProject(true)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/projects/${project.id}`}>
                  <Card className="group hover:border-[var(--accent)]/40">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {project.name}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1 truncate">{project.description || 'No description'}</p>
                      </div>
                      <Badge color={project.status === 'ACTIVE' ? 'success' : project.status === 'ON_HOLD' ? 'warning' : 'muted'}>
                        {project.status}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Member Modal */}
      <Modal isOpen={showInvite} onClose={() => setShowInvite(false)} title="Invite Member">
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="teammate@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowInvite(false)}>Cancel</Button>
            <Button type="submit" loading={inviting} icon={UserPlus}>Invite</Button>
          </div>
        </form>
      </Modal>

      {/* Create Project Modal */}
      <Modal isOpen={showCreateProject} onClose={() => setShowCreateProject(false)} title="Create Project">
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input
            label="Project Name"
            placeholder="e.g. Website Redesign"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <Input
            label="Description (optional)"
            placeholder="What is this project about?"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowCreateProject(false)}>Cancel</Button>
            <Button type="submit" loading={creatingProject}>Create</Button>
          </div>
        </form>
      </Modal>

      {/* Change Role Modal */}
      <Modal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} title="Change Member Role">
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Change role for <strong>{selectedMember?.user?.username}</strong>
          </p>
          <div className="space-y-2">
            {TEAM_ROLES.map((role) => (
              <label
                key={role}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedRole === role
                    ? 'border-[var(--accent)] bg-[var(--accent-light)]'
                    : 'border-[var(--border)] hover:border-[var(--border-hover)]'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                  className="accent-[var(--accent)]"
                />
                <span className="text-sm font-medium text-[var(--text-primary)]">{TEAM_ROLE_LABELS[role]}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowRoleModal(false)}>Cancel</Button>
            <Button onClick={handleRoleChange}>Update Role</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
