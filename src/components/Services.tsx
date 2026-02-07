'use client';

import {
  Code2,
  Database,
  Smartphone,
  BarChart3,
  Layers,
  Cloud,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Dev',
    description:
      'Modern web applications with Next.js, React, and TypeScript. Server-side rendering, API routes, and seamless UX.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    color: 'neon' as const,
  },
  {
    icon: Database,
    title: 'Real-time Systems',
    description:
      'PostgreSQL backends with Supabase. Real-time subscriptions, row-level security, and enterprise-scale queries.',
    tags: ['Supabase', 'PostgreSQL', 'Real-time', 'RLS'],
    color: 'electric-blue' as const,
  },
  {
    icon: Smartphone,
    title: 'Offline-First PWAs',
    description:
      'Progressive web apps that work anywhere. Service workers, IndexedDB sync, and mobile-optimized field interfaces.',
    tags: ['PWA', 'IndexedDB', 'Service Workers', 'Offline'],
    color: 'hot-pink' as const,
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description:
      'Interactive dashboards and SVG-based visualizations. Transform complex datasets into actionable insights.',
    tags: ['D3.js', 'SVG', 'Dashboards', 'Analytics'],
    color: 'amber' as const,
  },
  {
    icon: Layers,
    title: 'Enterprise Tracking',
    description:
      'Large-scale deployment tracking and management. Thousands of items with conflict resolution and multi-user sync.',
    tags: ['Tracking', 'Multi-user', 'Sync', 'Enterprise'],
    color: 'electric-blue' as const,
  },
  {
    icon: Cloud,
    title: 'DevOps & Infra',
    description:
      'Vercel deployment, monorepo management, CI/CD pipelines, and cloud infrastructure configured right.',
    tags: ['Vercel', 'Git', 'CI/CD', 'Monorepo'],
    color: 'neon' as const,
  },
];

const colorMap = {
  neon: {
    text: 'text-neon',
    bg: 'bg-neon/8',
    tag: 'text-neon/60 border-neon/15',
    border: 'hover:border-neon/25',
    glow: 'group-hover:shadow-[0_0_40px_rgba(57,255,20,0.05)]',
  },
  'electric-blue': {
    text: 'text-electric-blue',
    bg: 'bg-electric-blue/8',
    tag: 'text-electric-blue/60 border-electric-blue/15',
    border: 'hover:border-electric-blue/25',
    glow: 'group-hover:shadow-[0_0_40px_rgba(0,212,255,0.05)]',
  },
  'hot-pink': {
    text: 'text-hot-pink',
    bg: 'bg-hot-pink/8',
    tag: 'text-hot-pink/60 border-hot-pink/15',
    border: 'hover:border-hot-pink/25',
    glow: 'group-hover:shadow-[0_0_40px_rgba(255,45,111,0.05)]',
  },
  amber: {
    text: 'text-amber',
    bg: 'bg-amber/8',
    tag: 'text-amber/60 border-amber/15',
    border: 'hover:border-amber/25',
    glow: 'group-hover:shadow-[0_0_40px_rgba(255,170,0,0.05)]',
  },
};

export default function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-neon/30" />
            <span className="font-mono text-[11px] text-neon uppercase tracking-[0.2em]">
              ./services
            </span>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-text-primary mb-4">
            What I{' '}
            <span className="text-neon text-glow-green neon-underline">Build</span>
          </h2>
          <p className="text-base text-text-secondary max-w-xl font-light leading-relaxed">
            End-to-end development for modern businesses.
            From concept to deployment, solutions that scale.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const c = colorMap[service.color];
            return (
              <div
                key={service.title}
                className={`group terminal-card corner-brackets p-7 ${c.border} ${c.glow} fade-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Icon + index */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 ${c.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <service.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <span className="font-mono text-[11px] text-text-muted">
                    [{String(i).padStart(2, '0')}]
                  </span>
                </div>

                <h3 className="font-mono text-lg font-bold text-text-primary mb-3 group-hover:text-white transition-colors duration-200">
                  {service.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 border text-[11px] font-mono ${c.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 text-xs font-mono ${c.text} opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1`}
                >
                  inquire <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
