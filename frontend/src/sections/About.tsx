import { useTranslation } from 'react-i18next'
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal'

export default function About() {
  const { t } = useTranslation()
  const { ref: sectionRef, visible } = useScrollReveal(0.2)
  const years = useCountUp(3, 1200)
  const projects = useCountUp(10, 1400)
  const techs = useCountUp(15, 1600)

  return (
    <section id="about" className="py-28 bg-white dark:bg-zinc-950">
      <div
        ref={sectionRef}
        className={`max-w-5xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-amber-700 dark:text-cyan-400 tracking-widest uppercase mb-3">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">{t('about.title')}</h2>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr,auto] lg:gap-16 items-start">
          <div className="space-y-5">
            <p className="text-lg text-stone-700 dark:text-zinc-300 leading-relaxed">{t('about.p1')}</p>
            <p className="text-base text-stone-500 dark:text-zinc-400 leading-relaxed">{t('about.p2')}</p>
            <p className="text-base text-stone-500 dark:text-zinc-400 leading-relaxed">{t('about.p3')}</p>
          </div>

          {/* Stats with counter animation */}
          <div ref={years.ref} className="flex flex-row lg:flex-col gap-8 lg:gap-6">
            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold gradient-text">{years.count}+</div>
              <div className="text-xs text-stone-400 dark:text-zinc-500 mt-1 tracking-wide">{t('about.stat1_label')}</div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold gradient-text">{projects.count}+</div>
              <div className="text-xs text-stone-400 dark:text-zinc-500 mt-1 tracking-wide">{t('about.stat2_label')}</div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold gradient-text">{techs.count}+</div>
              <div className="text-xs text-stone-400 dark:text-zinc-500 mt-1 tracking-wide">{t('about.stat3_label')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
