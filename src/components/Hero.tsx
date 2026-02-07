'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';

const ShaderBackground = dynamic(() => import('./ShaderCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-void" />,
});

const PHRASES = [
  'enterprise web applications',
  'real-time tracking systems',
  'offline-first PWAs',
  'interactive data dashboards',
  'deployment pipelines',
];

function useTypewriter(phrases: string[], typingSpeed = 60, deleteSpeed = 35, pauseTime = 2200) {
  const [text, setText] = useState('');
  const stateRef = useRef({ phraseIndex: 0, isDeleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { phraseIndex, isDeleting } = stateRef.current;
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        const next = currentPhrase.substring(0, text.length + 1);
        setText(next);
        if (next.length === currentPhrase.length) {
          timeout = setTimeout(() => {
            stateRef.current.isDeleting = true;
            tick();
          }, pauseTime);
          return;
        }
        timeout = setTimeout(tick, typingSpeed + Math.random() * 40);
      } else {
        const next = currentPhrase.substring(0, text.length - 1);
        setText(next);
        if (next.length === 0) {
          stateRef.current.isDeleting = false;
          stateRef.current.phraseIndex = (phraseIndex + 1) % phrases.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };

    timeout = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, phrases, typingSpeed, deleteSpeed, pauseTime]);

  return text;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typedText = useTypewriter(PHRASES);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Shader background */}
      <div className="absolute inset-0 z-0 bg-void">
        <ShaderBackground />
      </div>

      {/* Dark overlays for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/60 via-void/20 to-void" />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, transparent 30%, rgba(5,5,5,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start text-left px-6 max-w-5xl mx-auto w-full">
        {/* Terminal prompt line */}
        <div className="mb-8 fade-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface/80 border border-neon/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
            </span>
            <span className="font-mono text-[11px] text-neon uppercase tracking-[0.2em]">
              system online &mdash; accepting new projects
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-4 leading-[1.1] fade-up fade-up-delay-1">
          I build{' '}
          <span className="text-neon text-glow-green">
            {typedText}
            <span
              className="inline-block w-[3px] h-[0.85em] bg-neon ml-0.5 align-middle"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          </span>
        </h1>

        {/* Subtitle as code comment */}
        <div className="mb-10 fade-up fade-up-delay-2">
          <p className="font-mono text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
            <span className="text-text-muted">{'// '}</span>
            Full-stack developer specializing in Next.js, Supabase, and
            real-time enterprise systems. From concept to deployment.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-16 fade-up fade-up-delay-3">
          <a
            href="#contact"
            className="group px-8 py-4 font-mono font-bold text-sm text-void bg-neon hover:bg-neon-bright transition-all duration-200 tracking-wide relative overflow-hidden"
          >
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-neon-bright translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a
            href="#services"
            className="px-8 py-4 font-mono font-bold text-sm text-text-secondary border border-text-muted hover:border-neon hover:text-neon transition-all duration-200 tracking-wide"
          >
            ls ./services
          </a>
        </div>

        {/* Stat bar — terminal style */}
        <div className="flex flex-wrap gap-8 fade-up fade-up-delay-4">
          {[
            { val: '20K+', label: 'devices tracked' },
            { val: '24K+', label: 'data points managed' },
            { val: '22', label: 'interactive diagrams' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-neon text-glow-green">
                {stat.val}
              </span>
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-neon transition-colors duration-200"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
