import { useTranslation } from 'react-i18next'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">{t('projects.title')}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">{t('projects.placeholder')}</p>
      </div>
    </section>
  )
}
