import { useTranslation } from 'react-i18next'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">{t('skills.title')}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">{t('skills.placeholder')}</p>
      </div>
    </section>
  )
}
