import { Users, FolderKanban, CheckSquare, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    id: "01",
    icon: Users,
    title: 'Access Control',
    description: 'Owner. Admin. Member. Complete hierarchy over who sees and dictates the workflow.',
  },
  {
    id: "02",
    icon: FolderKanban,
    title: 'Project Silos',
    description: 'Projects remain quarantined. Client work does not bleed into internal operations.',
  },
  {
    id: "03",
    icon: BarChart3,
    title: 'Raw Telemetry',
    description: 'No vanity metrics. Just a cold, hard look at team velocity and overdue items.',
  },
  {
    id: "04",
    icon: CheckSquare,
    title: 'Tactical Board',
    description: 'A kanban board stripped of bloat. Drag. Drop. Mark complete. Move on.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[var(--bg-secondary)] border-b-2 border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">
            System Capabilities
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl font-medium">
            Everything you need to orchestrate your team, delivered without the enterprise bloatware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col justify-between p-8 border-2 border-[var(--border)] bg-[var(--bg-card)] rounded-2xl transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0_var(--accent-light)] hover:border-[var(--accent)]"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="p-3 border-2 border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                    <feature.icon size={24} className="text-[var(--text-primary)] group-hover:text-white" />
                  </div>
                  <span className="font-mono text-lg font-bold text-[var(--text-secondary)]">
                    {feature.id}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 text-[var(--text-primary)]">
                  {feature.title}
                </h3>
              </div>
              <p className="text-base font-medium leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}