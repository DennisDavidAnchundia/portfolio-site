import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50 dark:bg-black">
      {/* Ambient glow - warm amber light / cyan dark */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.06] dark:bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-400/[0.04] dark:bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-amber-700/20 dark:border-cyan-400/20 bg-amber-50 dark:bg-cyan-400/[0.06]">
          <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-cyan-400 animate-glow-pulse" />
          <span className="text-xs font-medium text-amber-800 dark:text-cyan-300 tracking-wide uppercase">{t('hero.role')}</span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 dark:text-white leading-[1.1]">
          {t('hero.name')}
        </h1>

        {/* Short bio */}
        <p className="animate-fade-in-up delay-300 mt-6 text-lg sm:text-xl text-stone-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t('hero.short_bio')}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-500 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group px-7 py-3 bg-amber-700 dark:bg-cyan-500 text-white dark:text-black font-semibold text-sm rounded-xl hover:bg-amber-800 dark:hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(180,83,9,0.2)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            {t('hero.cta_projects')}
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </a>
          <a
            href="#contact"
            className="px-7 py-3 text-sm font-semibold text-stone-600 dark:text-zinc-300 rounded-xl border border-stone-300 dark:border-white/10 hover:border-stone-400 dark:hover:border-white/20 hover:bg-stone-100 dark:hover:bg-white/[0.04] transition-all duration-300"
          >
            {t('hero.cta_contact')}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in delay-600 absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="animate-bounce-subtle flex flex-col items-center gap-2 text-stone-300 dark:text-zinc-600">
            <span className="text-[11px] tracking-widest uppercase">{t('hero.scroll')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
