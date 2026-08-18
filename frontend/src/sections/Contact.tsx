import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSendMessage } from '../hooks/usePortfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const { t } = useTranslation()
  const sendMessage = useSendMessage()
  const [form, setForm] = useState({ name: '', email: '', content: '' })
  const { ref: sectionRef, visible } = useScrollReveal(0.1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage.mutate(form, {
      onSuccess: () => setForm({ name: '', email: '', content: '' }),
    })
  }

  return (
    <section id="contact" className="relative py-28 bg-stone-100 dark:bg-zinc-950 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle particle-1 dark:bg-cyan-400/[0.1]" />
        <div className="particle particle-2 dark:bg-blue-500/[0.08]" />
        <div className="particle particle-3 dark:bg-purple-500/[0.06]" />
        <div className="particle particle-4 dark:bg-cyan-400/[0.07]" />
        <div className="particle particle-5 dark:bg-blue-500/[0.08]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        ref={sectionRef}
        className={`relative max-w-5xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-amber-700/20 dark:border-cyan-400/20 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-cyan-400 animate-glow-pulse" />
            <span className="text-xs font-medium text-amber-800 dark:text-cyan-300 tracking-wide uppercase">{t('hero.role')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">{t('contact.title')}</h2>
          <p className="mt-3 text-stone-500 dark:text-zinc-400">{t('contact.subtitle')}</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr,1.4fr] gap-10 items-start">
          {/* Contact info cards */}
          <div className="space-y-4 stagger-children">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                ),
                label: 'Email',
                value: 'dennis@example.com',
                href: 'mailto:dennis@example.com',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ),
                label: 'GitHub',
                value: 'DennisDavidAnchundia',
                href: 'https://github.com/DennisDavidAnchundia',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                label: 'LinkedIn',
                value: 'dennis-anchundia',
                href: 'https://linkedin.com/in/dennis-anchundia',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 p-4 rounded-xl border border-stone-200 dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] hover:border-stone-300 dark:hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-amber-50 dark:bg-cyan-400/10 text-amber-700 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-medium text-stone-700 dark:text-zinc-200 truncate group-hover:text-amber-700 dark:group-hover:text-cyan-400 transition-colors">
                    {item.value}
                  </p>
                </div>
                <svg className="w-4 h-4 text-stone-300 dark:text-zinc-600 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            ))}

            {/* Decorative quote */}
            <div className="hidden lg:block mt-8 p-5 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/[0.04]">
              <svg className="w-8 h-8 text-amber-200 dark:text-cyan-900/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z"/>
              </svg>
              <p className="text-sm text-stone-500 dark:text-zinc-400 italic leading-relaxed">
                "El buen código se mantiene solo — y el mal código se mantiene en equipo."
              </p>
            </div>
          </div>

          {/* Form card with animated border */}
          <div className="form-card-wrapper">
            <div className="form-card relative p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-stone-200 dark:border-white/[0.06]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-stone-500 dark:text-zinc-400 mb-2 tracking-wide uppercase">
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.name_placeholder')}
                    className="w-full px-4 py-3 text-sm text-stone-900 dark:text-white bg-stone-50 dark:bg-white/[0.04] border border-stone-200 dark:border-white/[0.08] rounded-xl placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/50 dark:focus:border-cyan-400/50 focus:bg-white dark:focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(180,83,9,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-stone-500 dark:text-zinc-400 mb-2 tracking-wide uppercase">
                    {t('contact.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t('contact.email_placeholder')}
                    className="w-full px-4 py-3 text-sm text-stone-900 dark:text-white bg-stone-50 dark:bg-white/[0.04] border border-stone-200 dark:border-white/[0.08] rounded-xl placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/50 dark:focus:border-cyan-400/50 focus:bg-white dark:focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(180,83,9,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-500 dark:text-zinc-400 mb-2 tracking-wide uppercase">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder={t('contact.message_placeholder')}
                    className="w-full px-4 py-3 text-sm text-stone-900 dark:text-white bg-stone-50 dark:bg-white/[0.04] border border-stone-200 dark:border-white/[0.08] rounded-xl placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/50 dark:focus:border-cyan-400/50 focus:bg-white dark:focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(180,83,9,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] transition-all duration-200 resize-none"
                  />
                </div>

                {sendMessage.isError && (
                  <p className="text-sm text-red-500 animate-fade-in">{t('contact.error')}</p>
                )}
                {sendMessage.isSuccess && (
                  <p className="text-sm text-amber-700 dark:text-cyan-400 animate-fade-in">{t('contact.success')}</p>
                )}

                <button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="submit-btn w-full px-6 py-3.5 text-sm font-semibold text-white dark:text-black bg-amber-700 dark:bg-cyan-500 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {sendMessage.isPending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.send')}
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform;
        }
        .orb-1 {
          width: 400px; height: 400px;
          background: rgba(180, 83, 9, 0.06);
          top: 10%; left: -5%;
          animation: float-1 20s ease-in-out infinite;
        }
        .orb-2 {
          width: 300px; height: 300px;
          background: rgba(180, 83, 9, 0.04);
          bottom: 10%; right: 10%;
          animation: float-2 25s ease-in-out infinite;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: rgba(146, 64, 14, 0.05);
          top: 50%; left: 40%;
          animation: float-3 18s ease-in-out infinite;
        }
        :global(.dark) .orb-1 { background: rgba(34, 211, 238, 0.04); }
        :global(.dark) .orb-2 { background: rgba(59, 130, 246, 0.03); }
        :global(.dark) .orb-3 { background: rgba(168, 85, 247, 0.03); }

        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(25px, -15px) scale(0.9); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
        }

        .form-card-wrapper {
          position: relative;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(180, 83, 9, 0.2), rgba(146, 64, 14, 0.05), rgba(180, 83, 9, 0.2));
          background-size: 200% 200%;
          animation: border-shift 6s ease-in-out infinite;
        }
        :global(.dark) .form-card-wrapper {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.1), rgba(34, 211, 238, 0.15));
          background-size: 300% 300%;
          animation: border-shift-dark 8s ease-in-out infinite;
        }
        @keyframes border-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes border-shift-dark {
          0%, 100% { background-position: 0% 50%; }
          33% { background-position: 100% 0%; }
          66% { background-position: 50% 100%; }
        }

        .submit-btn {
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .submit-btn:not(:disabled):hover::before { opacity: 1; }
        .submit-btn:not(:disabled) {
          box-shadow: 0 0 0 0 rgba(180, 83, 9, 0);
          transition: all 0.3s;
        }
        .submit-btn:not(:disabled):hover {
          box-shadow: 0 0 30px rgba(180, 83, 9, 0.25), 0 4px 12px rgba(180, 83, 9, 0.15);
          transform: translateY(-1px);
        }
        :global(.dark) .submit-btn:not(:disabled) {
          box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
        }
        :global(.dark) .submit-btn:not(:disabled):hover {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.25), 0 4px 12px rgba(34, 211, 238, 0.15);
        }
      `}</style>
    </section>
  )
}
