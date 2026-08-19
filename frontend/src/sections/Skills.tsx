import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSkills } from '../hooks/usePortfolio'

interface CategoryGroup {
  key: string
  color: string
  darkColor: string
  skills: string[]
}

const fallbackCategories: CategoryGroup[] = [
  { key: 'languages', color: 'bg-amber-500', darkColor: 'bg-cyan-400', skills: ['Java', 'TypeScript', 'JavaScript', 'SQL', 'Python', 'HTML/CSS'] },
  { key: 'frameworks', color: 'bg-orange-500', darkColor: 'bg-blue-400', skills: ['Spring Boot', 'Hibernate', 'React', 'Node.js', 'Express', 'Tailwind CSS'] },
  { key: 'databases', color: 'bg-yellow-600', darkColor: 'bg-purple-400', skills: ['PostgreSQL', 'MySQL', 'Redis', 'H2', 'Flyway'] },
  { key: 'devops', color: 'bg-stone-500', darkColor: 'bg-emerald-400', skills: ['Docker', 'Git', 'GitHub Actions', 'Linux', 'Kubernetes', 'Maven', 'REST APIs'] },
]

const categoryColors: Record<string, { light: string; dark: string }> = {
  LANGUAGE: { light: 'bg-amber-500', dark: 'bg-cyan-400' },
  FRAMEWORK: { light: 'bg-orange-500', dark: 'bg-blue-400' },
  DATABASE: { light: 'bg-yellow-600', dark: 'bg-purple-400' },
  TOOL: { light: 'bg-stone-500', dark: 'bg-emerald-400' },
  CLOUD: { light: 'bg-sky-500', dark: 'bg-pink-400' },
  OTHER: { light: 'bg-stone-400', dark: 'bg-zinc-400' },
}

const categoryKeys: Record<string, string> = {
  LANGUAGE: 'languages',
  FRAMEWORK: 'frameworks',
  DATABASE: 'databases',
  TOOL: 'devops',
  CLOUD: 'devops',
  OTHER: 'devops',
}

export default function Skills() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const { ref, visible } = useScrollReveal(0.15)
  const { data: apiSkills } = useSkills()

  const categories = useMemo(() => {
    if (apiSkills && apiSkills.length > 0) {
      const groups: Record<string, string[]> = {}
      const colorMap: Record<string, { light: string; dark: string }> = {}
      apiSkills.forEach((s) => {
        const key = categoryKeys[s.category] || 'devops'
        if (!groups[key]) groups[key] = []
        groups[key].push(s.name)
        colorMap[key] = categoryColors[s.category] || categoryColors.OTHER
      })
      return Object.entries(groups).map(([key, skills]) => ({
        key,
        color: colorMap[key].light,
        darkColor: colorMap[key].dark,
        skills,
      }))
    }
    return fallbackCategories
  }, [apiSkills])

  return (
    <section id="skills" className="py-28 bg-stone-100 dark:bg-zinc-950">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-amber-700 dark:text-cyan-400 tracking-widest uppercase mb-3">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">{t('skills.title')}</h2>
          <p className="mt-3 text-stone-500 dark:text-zinc-400">{t('skills.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active === i
                  ? 'bg-amber-700 dark:bg-cyan-500 text-white dark:text-black shadow-sm'
                  : 'bg-white dark:bg-white/[0.05] text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/[0.08] border border-stone-200 dark:border-white/[0.08]'
              }`}
            >
              {t(`skills.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* Tags with tilt effect */}
        <div className="mt-8 flex flex-wrap gap-2.5 stagger-children">
          {categories[active]?.skills.map((skill) => (
            <span
              key={skill}
              className="tilt-card inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 dark:text-zinc-200 bg-white dark:bg-white/[0.06] border border-stone-200 dark:border-white/[0.08] rounded-lg hover:border-amber-300 dark:hover:border-cyan-400/30 hover:bg-amber-50/50 dark:hover:bg-white/[0.08] transition-all duration-200 cursor-default"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${categories[active].color} ${categories[active].darkColor}`} />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
