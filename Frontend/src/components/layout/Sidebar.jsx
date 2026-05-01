import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  UserCircle,
  Shield,
  ChevronLeft,
} from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';

const navItems = [
  { to: '/dashboard/my-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/teams', label: 'Teams', icon: Users },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

const adminItems = [
  { to: '/admin', label: 'Admin Panel', icon: Shield },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40 w-64 bg-[var(--bg-card)] border-r border-[var(--border)]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full py-4">
          {/* Close button for mobile */}
          <div className="lg:hidden flex justify-end px-4 mb-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 space-y-1">
            {allItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }
                `}
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-muted)]">Team Task Manager v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
