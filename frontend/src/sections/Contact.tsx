import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">{t('contact.title')}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">{t('contact.placeholder')}</p>
      </div>
    </section>
  )
}
