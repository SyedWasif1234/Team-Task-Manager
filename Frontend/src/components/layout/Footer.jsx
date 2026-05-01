import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-xs">TT</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Team<span className="text-[var(--accent)]">Task</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--accent)] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[var(--accent)] transition-colors">How It Works</a>
            <Link to="/login" className="hover:text-[var(--accent)] transition-colors">Login</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Made with <Heart size={12} className="text-[var(--danger)] fill-[var(--danger)]" /> &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
