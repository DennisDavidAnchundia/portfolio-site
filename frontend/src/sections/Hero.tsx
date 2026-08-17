import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{t('hero.role')}</p>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t('hero.name')}
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('hero.cta_projects')}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t('hero.cta_contact')}
          </a>
        </div>
      </div>
    </section>
  )
}
