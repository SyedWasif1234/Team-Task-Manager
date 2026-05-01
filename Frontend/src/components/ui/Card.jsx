import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 8px 30px var(--shadow-lg)' } : {}}
      onClick={onClick}
      className={`
        bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5
        transition-colors duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
