import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield className="text-[var(--accent)]" /> Admin Panel
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Global application management</p>
        </div>
      </div>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center">
        <p className="text-[var(--text-muted)]">Admin features (user management, global settings) will be implemented here.</p>
      </div>
    </div>
  );
}
