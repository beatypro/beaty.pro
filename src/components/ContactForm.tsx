'use client';

import { useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Building,
  FileText,
  DollarSign,
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    description: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Send failed');

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        description: '',
      });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClasses =
    'w-full bg-elevated/50 border border-white/8 px-4 py-3.5 text-text-primary placeholder:text-text-muted font-mono text-sm transition-all';

  const labelClasses =
    'flex items-center gap-2 font-mono text-[12px] text-text-secondary mb-2 uppercase tracking-wider';

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/15 to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 80%, rgba(57, 255, 20, 0.02), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-neon/30" />
            <span className="font-mono text-[11px] text-neon uppercase tracking-[0.2em]">
              ./contact
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
            Let&apos;s Build Something{' '}
            <span className="text-neon text-glow-green neon-underline">Great</span>
          </h2>
          <p className="text-base text-text-secondary max-w-xl font-light leading-relaxed">
            Have a project in mind? Fill out the form and I&apos;ll respond
            within 24 hours with a detailed plan.
          </p>
        </div>

        {/* Form terminal */}
        <div className="terminal-card overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-elevated/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-hot-pink/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-neon/70" />
            </div>
            <span className="ml-3 font-mono text-[11px] text-text-muted">
              new_project.request
            </span>
          </div>

          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    <span className="text-neon">*</span> name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    <Mail className="w-3.5 h-3.5 text-neon/60" />
                    <span className="text-neon">*</span> email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className={labelClasses}>
                  <Building className="w-3.5 h-3.5 text-text-muted" />
                  company <span className="text-text-muted">(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  className={inputClasses}
                />
              </div>

              {/* Project Type and Budget row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className={labelClasses}>
                    <FileText className="w-3.5 h-3.5 text-electric-blue/60" />
                    <span className="text-neon">*</span> project_type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23444444' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    <option value="">select...</option>
                    <option value="web-app">Web Application</option>
                    <option value="pwa">Progressive Web App (PWA)</option>
                    <option value="dashboard">Dashboard / Analytics</option>
                    <option value="data-viz">Data Visualization</option>
                    <option value="database">Database Design</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className={labelClasses}>
                    <DollarSign className="w-3.5 h-3.5 text-neon/60" />
                    <span className="text-neon">*</span> budget_range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23444444' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    <option value="">select...</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                    <option value="hourly">Hourly / Retainer</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" className={labelClasses}>
                  <span className="text-neon">*</span> description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`
                    w-full md:w-auto px-8 py-4 font-mono font-bold text-sm
                    flex items-center justify-center gap-3
                    transition-all duration-200 cursor-pointer tracking-wide
                    ${
                      status === 'success'
                        ? 'bg-neon text-void'
                        : status === 'error'
                          ? 'bg-hot-pink text-white'
                          : 'bg-neon text-void hover:bg-neon-bright hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]'
                    }
                    ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                      sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      message sent
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      error occurred
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      submit_request()
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Direct email */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-text-muted text-sm font-mono">
                <span className="text-text-muted/60">{'// '}</span>
                or email directly:{' '}
                <a
                  href="mailto:chris@beaty.pro"
                  className="text-neon hover:text-neon-bright transition-colors"
                >
                  chris@beaty.pro
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
