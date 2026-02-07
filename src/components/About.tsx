'use client';

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center bg-void/50">
      <div className="w-8 h-8 border-2 border-neon/20 border-t-neon rounded-full animate-spin" />
    </div>
  ),
});

const codeBlock = `const developer = {
  name: "Christopher Beaty",
  role: "Full-Stack Engineer",
  stack: [
    "Next.js", "React",
    "TypeScript", "Supabase",
    "PostgreSQL", "Tailwind",
  ],
  focus: [
    "Enterprise tracking",
    "Offline-first PWAs",
    "Real-time dashboards",
    "Data visualization",
  ],
  approach: "Ship fast. Ship right.",
};`;

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Subtle radial accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(57, 255, 20, 0.02), transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Globe — holographic display */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Globe frame */}
              <div className="relative p-4 border border-neon/10">
                {/* Corner labels */}
                <div className="absolute -top-3 left-4 px-2 bg-void font-mono text-[10px] text-neon/50 uppercase tracking-widest">
                  global.render()
                </div>
                <Globe width={440} height={440} />
                {/* Bottom status bar */}
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-text-muted">
                  <span>lat: auto | lng: auto</span>
                  <span className="text-neon/40">drag to rotate</span>
                </div>
              </div>
              {/* Decorative corner brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-neon/25" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-neon/25" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-neon/25" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-neon/25" />
            </div>
          </div>

          {/* Content — code terminal style */}
          <div className="order-1 lg:order-2">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-neon/30" />
              <span className="font-mono text-[11px] text-neon uppercase tracking-[0.2em]">
                ./about
              </span>
            </div>

            <h2 className="text-2xl md:text-5xl font-bold text-text-primary mb-8">
              Turning Complex Problems Into{' '}
              <span className="text-neon text-glow-green neon-underline">
                Shipped Code
              </span>
            </h2>

            {/* Code block — the "about me" as a code object */}
            <div className="terminal-card mb-8 overflow-hidden">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-elevated/30">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-hot-pink/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neon/70" />
                </div>
                <span className="ml-3 font-mono text-[11px] text-text-muted">
                  developer.config.ts
                </span>
              </div>
              {/* Code content */}
              <pre className="px-3 md:px-5 py-5 font-mono text-[11px] md:text-[12px] leading-[1.7] overflow-x-auto">
                {codeBlock.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="inline-block w-8 text-right mr-4 text-text-muted/40 select-none text-[11px]">
                      {i + 1}
                    </span>
                    <span>
                      {colorCodeLine(line)}
                    </span>
                  </div>
                ))}
              </pre>
            </div>

            <p className="text-text-secondary leading-relaxed font-light">
              I specialize in enterprise-grade web applications that handle
              real-world complexity. From offline-first mobile PWAs to real-time
              dashboards tracking thousands of data points &mdash; I deliver
              solutions that work in the field, not just in the demo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function colorCodeLine(line: string): React.ReactNode {
  // Simple syntax highlighting
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const patterns: [RegExp, string][] = [
    [/^(const|let|var)\b/, 'text-hot-pink'],
    [/"([^"]*)"/, 'text-neon/80'],
    [/\/\/.*$/, 'text-text-muted'],
    [/\b(name|role|stack|focus|approach)\b(?=:)/, 'text-electric-blue'],
  ];

  // Simple approach: color keywords and strings
  remaining = remaining
    .replace(/\b(const)\b/g, '\x01PINK\x02$1\x03')
    .replace(/"([^"]*)"/g, '\x01GREEN\x02"$1"\x03')
    .replace(/\b(name|role|stack|focus|approach)\b(?=:)/g, '\x01BLUE\x02$1\x03');

  const segments = remaining.split(/(\x01(?:PINK|GREEN|BLUE)\x02[^\x03]*\x03)/);

  for (const seg of segments) {
    const pinkMatch = seg.match(/\x01PINK\x02(.*)\x03/);
    const greenMatch = seg.match(/\x01GREEN\x02(.*)\x03/);
    const blueMatch = seg.match(/\x01BLUE\x02(.*)\x03/);

    if (pinkMatch) {
      parts.push(<span key={key++} className="text-hot-pink">{pinkMatch[1]}</span>);
    } else if (greenMatch) {
      parts.push(<span key={key++} className="text-neon/80">{greenMatch[1]}</span>);
    } else if (blueMatch) {
      parts.push(<span key={key++} className="text-electric-blue">{blueMatch[1]}</span>);
    } else {
      parts.push(<span key={key++} className="text-text-secondary">{seg}</span>);
    }
  }

  void patterns; // used conceptually above
  return <>{parts}</>;
}
