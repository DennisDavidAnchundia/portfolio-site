import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSendMessage } from '../hooks/usePortfolio'

export default function Contact() {
  const { t } = useTranslation()
  const sendMessage = useSendMessage()
  const [form, setForm] = useState({ name: '', email: '', content: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage.mutate(form, {
      onSuccess: () => setForm({ name: '', email: '', content: '' }),
    })
  }

  return (
    <section id="contact" className="py-28 bg-stone-100 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-amber-700 dark:text-cyan-400 tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">{t('contact.title')}</h2>
          <p className="mt-3 text-stone-500 dark:text-zinc-400">{t('contact.subtitle')}</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr,1.2fr] gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white tracking-wide uppercase mb-3">Email</h3>
              <a href="mailto:dennis@example.com" className="text-stone-500 dark:text-zinc-400 hover:text-amber-700 dark:hover:text-cyan-400 transition-colors duration-200">
                dennis@example.com
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white tracking-wide uppercase mb-3">GitHub</h3>
              <a
                href="https://github.com/DennisDavidAnchundia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 dark:text-zinc-400 hover:text-amber-700 dark:hover:text-cyan-400 transition-colors duration-200"
              >
                github.com/DennisDavidAnchundia
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white tracking-wide uppercase mb-3">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/dennis-anchundia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 dark:text-zinc-400 hover:text-amber-700 dark:hover:text-cyan-400 transition-colors duration-200"
              >
                linkedin.com/in/dennis-anchundia
              </a>
            </div>
          </div>

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
                className="w-full px-4 py-3 text-sm text-stone-900 dark:text-white bg-white dark:bg-white/[0.04] border border-stone-200 dark:border-white/[0.08] rounded-xl placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/50 dark:focus:border-cyan-400/50 focus:bg-white dark:focus:bg-white/[0.06] transition-all duration-200"
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
                className="w-full px-4 py-3 text-sm text-stone-900 dark:text-white bg-white dark:bg-white/[0.04] border border-stone-200 dark:border-white/[0.08] rounded-xl placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/50 dark:focus:border-cyan-400/50 focus:bg-white dark:focus:bg-white/[0.06] transition-all duration-200"
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
                className="w-full px-4 py-3 text-sm text-stone-900 dark:text-white bg-white dark:bg-white/[0.04] border border-stone-200 dark:border-white/[0.08] rounded-xl placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/50 dark:focus:border-cyan-400/50 focus:bg-white dark:focus:bg-white/[0.06] transition-all duration-200 resize-none"
              />
            </div>

            {sendMessage.isError && (
              <p className="text-sm text-red-500">{t('contact.error')}</p>
            )}
            {sendMessage.isSuccess && (
              <p className="text-sm text-amber-700 dark:text-cyan-400">{t('contact.success')}</p>
            )}

            <button
              type="submit"
              disabled={sendMessage.isPending}
              className="w-full px-6 py-3.5 text-sm font-semibold text-white bg-amber-700 dark:bg-cyan-500 dark:text-black rounded-xl hover:bg-amber-800 dark:hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(180,83,9,0.2)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendMessage.isPending ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
