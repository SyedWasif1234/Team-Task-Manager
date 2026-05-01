import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../stores/useAuthStore';

export default function Navbar({ onMenuToggle, isPublic = false }) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 h-16 bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border)] px-4 lg:px-6">
      <div className="flex items-center justify-between h-full max-w-[1600px] mx-auto">
        {/* Left */}
        <div className="flex items-center gap-3">
          {!isPublic && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
          <Link to= '/' className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">TT</span>
            </div>
            <span className="text-lg font-bold text-[var(--text-primary)] hidden sm:inline">
              Team<span className="text-[var(--accent)]">Task</span>
            </span>
          </Link>
        </div>

        {/* Center — Public nav links */}
        {isPublic && (
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">How It Works</a>
            <a href="#cta" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Get Started</a>
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!isAuthenticated ? (
            <>
              {/* Mobile Menu Button for Public */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
              >
                <Menu size={20} />
              </button>

              {/* Desktop Public Nav */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl transition-colors"
                >
                  Sign Up
                </Link>
              </div>

              {/* Mobile Public Dropdown */}
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-4 top-16 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden md:hidden"
                >
                  <Link
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-[var(--accent)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              )}
            </>
          ) :  (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Avatar name={user?.username} src={user?.profilePicture} size="sm" />
                <ChevronDown size={16} className={`text-[var(--text-muted)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden"
                >
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-blue-500 transition-colors"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[var(--danger)]  transition-colors hover:bg-red-600 hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) }
        </div>
      </div>
    </nav>
  );
}
