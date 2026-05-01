import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section id="cta" className="bg-[var(--bg-secondary)] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Background decorative blob (Subtle modern touch) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 border-2 border-[var(--border)] bg-[var(--bg-card)] p-12 sm:p-24 rounded-[2.5rem] shadow-xl"
        >
          <h2 className="text-5xl sm:text-7xl font-black text-[var(--text-primary)] tracking-tight mb-8 leading-[1.1]">
            Stop Reading. <br/> Start Building.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-sm sm:text-base font-semibold text-[var(--text-secondary)] mb-12">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> No credit card required</span>
            <span className="hidden sm:block text-[var(--border)]">|</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Setup in 45 seconds</span>
            <span className="hidden sm:block text-[var(--border)]">|</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Free forever</span>
          </div>
          
          <Link to="/register">
            <button className="group inline-flex items-center gap-3 bg-[var(--accent)] text-white font-bold px-10 py-5 text-xl rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition-all hover:scale-105 active:scale-95">
              Create Your Workspace
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}