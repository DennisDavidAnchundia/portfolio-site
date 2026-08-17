import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github: string | null
  demo: string | null
  featured: boolean
}

interface ProjectModalProps {
  projects: Project[]
  categories: string[]
  onClose: () => void
  onSelect: (project: Project) => void
  initialProject: Project | null
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  backend: 'Backend',
  frontend: 'Frontend',
  fullstack: 'Fullstack',
  devops: 'DevOps',
}

export default function ProjectModal({ projects, categories, onClose, onSelect, initialProject }: ProjectModalProps) {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [detail, setDetail] = useState<Project | null>(initialProject)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-white/[0.08] shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-white/[0.06]">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{t('projects.all_projects')}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-white/[0.05] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(85vh-65px)]">
          {/* Left: project list */}
          <div className={`${detail ? 'hidden lg:flex' : 'flex'} flex-col flex-1 min-w-0`}>
            {/* Category filters */}
            <div className="flex flex-wrap gap-1.5 px-6 pt-4 pb-3 border-b border-stone-100 dark:border-white/[0.04]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-amber-700 dark:bg-cyan-500 text-white dark:text-black'
                      : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Project list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setDetail(project)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    detail?.id === project.id
                      ? 'bg-amber-50 dark:bg-white/[0.06] border border-amber-200 dark:border-cyan-400/20'
                      : 'hover:bg-stone-50 dark:hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-white truncate">{project.title}</h4>
                        {project.featured && (
                          <svg className="w-3.5 h-3.5 text-amber-500 dark:text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-stone-500 dark:text-zinc-400 line-clamp-2">{project.description}</p>
                    </div>
                    <svg className="w-4 h-4 text-stone-300 dark:text-zinc-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: detail view */}
          {detail && (
            <div className={`${detail ? 'flex' : 'hidden lg:flex'} flex-col flex-1 min-w-0 border-l border-stone-200 dark:border-white/[0.06]`}>
              {/* Detail header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100 dark:border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => setDetail(null)}
                  className="lg:hidden p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-white/[0.05] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <h4 className="text-base font-semibold text-stone-900 dark:text-white">{detail.title}</h4>
              </div>

              {/* Detail body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <p className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed">{detail.longDescription}</p>

                {/* Tech */}
                <div>
                  <h5 className="text-xs font-semibold text-stone-400 dark:text-zinc-500 tracking-wide uppercase mb-2">{t('projects.tech')}</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {detail.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-zinc-200 bg-stone-100 dark:bg-white/[0.06] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-2">
                  {detail.github && (
                    <a
                      href={detail.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-zinc-200 bg-stone-100 dark:bg-white/[0.06] rounded-lg hover:bg-stone-200 dark:hover:bg-white/[0.1] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      {t('projects.view_code')}
                    </a>
                  )}
                  {detail.demo && (
                    <a
                      href={detail.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white dark:text-black bg-amber-700 dark:bg-cyan-500 rounded-lg hover:bg-amber-800 dark:hover:bg-cyan-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      {t('projects.view_demo')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
