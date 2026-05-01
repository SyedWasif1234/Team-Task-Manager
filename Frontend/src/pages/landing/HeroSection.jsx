import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-[var(--bg-primary)] border-b-2 border-[var(--border)] overflow-hidden">
     <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 2px, transparent 2px), linear-gradient(90deg, var(--text-primary) 2px, transparent 2px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        
        {/* Modern Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border-2 border-[var(--border)] rounded-full px-4 py-1.5 mb-10 bg-[var(--bg-card)] shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
            TeamTask Protocol v2.0
          </span>
        </motion.div>

        {/* Refined Oversized Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight text-[var(--text-primary)] mb-8"
        >
          Structure <br className="hidden md:block"/>
          <span className="text-[var(--text-secondary)]">The Chaos.</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 md:mt-20 border-t-2 border-[var(--border)] pt-8">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--text-secondary)]"
          >
            Stop pretending spreadsheets are a workflow. Demand structure. Execute tasks. Ship software faster.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start md:items-end justify-center"
          >
            <Link to="/register">
              {/* Tactile Brutalist Button */}
              <button className="group flex items-center gap-3 border-2 border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold px-8 py-4 text-lg rounded-xl transition-all shadow-[6px_6px_0_var(--accent)] hover:shadow-[2px_2px_0_var(--accent)] hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]">
                Initialize Workspace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
