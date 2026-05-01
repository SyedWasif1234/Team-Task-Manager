import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import EmptyState from '../../components/ui/EmptyState';
import { PageLoader } from '../../components/ui/Loader';
import { useTaskStore } from '../../stores/useTaskStore';
import { useProjectStore } from '../../stores/useProjectStore';
import { useTeamStore } from '../../stores/useTeamStore';
import { TASK_STATUSES, TASK_STATUS_LABELS, TASK_PRIORITIES, TASK_PRIORITY_LABELS, TASK_PRIORITY_COLORS } from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/helpers';

function KanbanColumn({ status, tasks, onStatusChange, onTaskClick }) {
  const colorMap = { TODO: '#6b7280', IN_PROGRESS: '#0492C2', IN_REVIEW: '#f59e0b', DONE: '#22c55e' };
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorMap[status] }} />
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{TASK_STATUS_LABELS[status]}</h3>
        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <div className="space-y-2 min-h-[200px] bg-[var(--bg-secondary)] rounded-xl p-2">
        {tasks.map((task) => (
          <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="!p-3 cursor-pointer hover:border-[var(--accent)]/40" onClick={() => onTaskClick(task)}>
              <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">{task.title}</h4>
              <div className="flex items-center justify-between">
                <Badge color={task.priority === 'CRITICAL' ? 'danger' : task.priority === 'HIGH' ? 'warning' : task.priority === 'MEDIUM' ? 'accent' : 'muted'}>
                  {TASK_PRIORITY_LABELS[task.priority]}
                </Badge>
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <span className={`text-xs ${isOverdue(task.dueDate) && task.status !== 'DONE' ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                  {task.assignee && <Avatar name={task.assignee.username} size="sm" />}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectBoardPage() {
  const { projectId } = useParams();
  const { tasks, isLoading, fetchTasks, createTask, changeStatus, assignTask, deleteTask } = useTaskStore();
  const { currentProject, fetchProjectById } = useProjectStore();
  const { members } = useTeamStore();

  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjectById(projectId);
    fetchTasks(projectId);
  }, [projectId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createTask(projectId, { title, description: desc, priority, dueDate: dueDate || undefined });
      setShowCreate(false);
      setTitle(''); setDesc(''); setPriority('MEDIUM'); setDueDate('');
    } catch (err) { setError(err.message); }
    finally { setCreating(false); }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try { await changeStatus(taskId, newStatus); } catch {}
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowDetail(true);
  };

  if (isLoading && tasks.length === 0) return <PageLoader />;

  const grouped = TASK_STATUSES.reduce((acc, s) => { acc[s] = tasks.filter((t) => t.status === s); return acc; }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{currentProject?.name || 'Project Board'}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{currentProject?.description || ''}</p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreate(true)}>Add Task</Button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {TASK_STATUSES.map((status) => (
          <KanbanColumn key={status} status={status} tasks={grouped[status]} onStatusChange={handleStatusChange} onTaskClick={handleTaskClick} />
        ))}
      </div>

      {/* Create Task Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Task">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Title" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="Description" placeholder="Task description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] px-3 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-none">
                {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{TASK_PRIORITY_LABELS[p]}</option>)}
              </select>
            </div>
            <Input label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" loading={creating}>Create</Button>
          </div>
        </form>
      </Modal>

      {/* Task Detail Modal */}
      <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title={selectedTask?.title} size="md">
        {selectedTask && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">{selectedTask.description || 'No description'}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-[var(--text-muted)] text-xs">Status</label>
                <select
                  value={selectedTask.status}
                  onChange={(e) => { handleStatusChange(selectedTask.id, e.target.value); setSelectedTask({ ...selectedTask, status: e.target.value }); }}
                  className="w-full mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  {TASK_STATUSES.map((s) => <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[var(--text-muted)] text-xs">Priority</label>
                <p className="mt-1"><Badge color={selectedTask.priority === 'CRITICAL' ? 'danger' : 'accent'}>{TASK_PRIORITY_LABELS[selectedTask.priority]}</Badge></p>
              </div>
              <div>
                <label className="text-[var(--text-muted)] text-xs">Due Date</label>
                <p className="mt-1 text-[var(--text-primary)]">{formatDate(selectedTask.dueDate)}</p>
              </div>
              <div>
                <label className="text-[var(--text-muted)] text-xs">Assignee</label>
                <p className="mt-1 text-[var(--text-primary)]">{selectedTask.assignee?.username || 'Unassigned'}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-[var(--border)]">
              <Button variant="danger" size="sm" onClick={async () => { await deleteTask(selectedTask.id); setShowDetail(false); }}>Delete Task</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
