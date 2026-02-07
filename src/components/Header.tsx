'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'services' },
    { href: '#about', label: 'about' },
    { href: '#contact', label: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/90 backdrop-blur-md border-b border-neon/[0.08]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-neon text-lg font-mono font-bold tracking-tight">
              {'>'}_
            </span>
            <span className="font-mono font-bold text-lg tracking-tight">
              <span className="text-neon">beaty</span>
              <span className="text-text-muted">.</span>
              <span className="text-text-primary">pro</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[13px] text-text-secondary hover:text-neon transition-colors duration-200 tracking-wide group"
              >
                <span className="text-text-muted group-hover:text-neon/60 mr-1">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-mono text-[13px] px-5 py-2.5 text-void bg-neon hover:bg-neon-bright transition-all duration-200 tracking-wide font-bold"
            >
              get_quote()
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-neon transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neon/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-text-secondary hover:text-neon transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-text-muted mr-2">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="font-mono text-sm px-5 py-2.5 text-void bg-neon text-center font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                get_quote()
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
