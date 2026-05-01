import { motion } from 'framer-motion';

const steps = [
  {
    step: "PHASE ONE",
    title: 'Initialize Squad',
    desc: 'Deploy your workspace. Transmit email invites. Establish role-based authorization parameters.',
  },
  {
    step: "PHASE TWO",
    title: 'Define Scope',
    desc: 'Fracture massive objectives into actionable projects. Assign a dedicated index to every initiative.',
  },
  {
    step: "PHASE THREE",
    title: 'Execute & Track',
    desc: 'Generate task nodes. Assign priorities. Shift nodes across the tactical kanban interface.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[var(--bg-primary)] border-b-2 border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left Column: Sticky Title */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <span className="font-mono text-[var(--accent)] font-bold tracking-widest uppercase mb-4 block">
              Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] leading-tight mb-6">
              Standard <br className="hidden lg:block"/>
              Operating <br className="hidden lg:block"/>
              Procedure.
            </h2>
          </div>

          {/* Right Column: Index Cards Timeline */}
          <div className="lg:w-2/3 flex flex-col gap-10 relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-[var(--border)] hidden md:block" />

            {steps.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative flex gap-8 md:gap-12"
              >
                {/* Timeline Node */}
                <div className="hidden md:flex flex-col items-center pt-6 z-10">
                  <div className="w-14 h-14 rounded-full border-2 border-[var(--border)] bg-[var(--bg-primary)] flex items-center justify-center font-mono font-bold text-lg text-[var(--text-primary)]">
                    0{index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 border-2 border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-10 rounded-2xl shadow-[4px_4px_0_var(--border)] hover:shadow-[6px_6px_0_var(--accent)] hover:border-[var(--accent)] transition-all">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] mb-6">
                    <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)]" />
                    <span className="font-mono text-xs font-bold text-[var(--text-secondary)] uppercase">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg font-medium text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}