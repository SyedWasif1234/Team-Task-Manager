const colorMap = {
  accent: 'bg-[var(--accent-light)] text-[var(--accent)]',
  success: 'bg-emerald-500/15 text-[var(--success)]',
  warning: 'bg-amber-500/15 text-[var(--warning)]',
  danger: 'bg-red-500/15 text-[var(--danger)]',
  info: 'bg-blue-500/15 text-[var(--info)]',
  muted: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
};

export default function Badge({ children, color = 'accent', className = '', dot = false }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
        ${colorMap[color] || colorMap.accent} ${className}
      `}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
