'use client';

import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 bg-void border-t border-neon/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-neon font-mono font-bold">{'>'}_</span>
              <span className="font-mono font-bold text-lg tracking-tight">
                <span className="text-neon">beaty</span>
                <span className="text-text-muted">.</span>
                <span className="text-text-primary">pro</span>
              </span>
            </a>
            <p className="text-text-muted text-sm font-mono text-center md:text-left">
              custom software solutions
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/6 flex items-center justify-center text-text-muted hover:text-neon hover:border-neon/25 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:chris@beaty.pro"
              className="w-10 h-10 border border-white/6 flex items-center justify-center text-text-muted hover:text-neon hover:border-neon/25 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm font-mono">
            &copy; 2026 Beyond Bounds Solutions LLC | beaty.pro
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-muted text-sm font-mono hover:text-neon transition-colors duration-200"
            >
              privacy
            </a>
            <a
              href="#"
              className="text-text-muted text-sm font-mono hover:text-neon transition-colors duration-200"
            >
              terms
            </a>
          </div>
        </div>

        {/* Tech signature */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[11px] text-text-muted/30">
            {'{ '}built_with:{' '}
            <span className="text-neon/30">&quot;Next.js&quot;</span>,{' '}
            styled_with:{' '}
            <span className="text-electric-blue/30">&quot;Tailwind&quot;</span>
            {' }'}
          </p>
        </div>
      </div>
    </footer>
  );
}
