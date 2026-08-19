import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true
  })
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
    document.documentElement.lang = i18n.language === 'es' ? 'en' : 'es'
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-50/90 dark:bg-black/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]' : 'bg-stone-50/60 dark:bg-black/40 backdrop-blur-md'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
            DA<span className="text-amber-700 dark:text-cyan-400">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-stone-100 dark:hover:bg-white/[0.05]"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <div className="w-px h-5 bg-stone-200 dark:bg-white/10 mx-2" />
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-2 text-sm font-medium text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-white/[0.05] transition-colors duration-200"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              type="button"
              onClick={() => setDark(!dark)}
              className="p-2 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-white/[0.05] transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-white/[0.06] bg-stone-50/95 dark:bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white py-2.5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <div className="border-t border-stone-200 dark:border-white/[0.06] mt-2 pt-3 flex items-center gap-4">
              <button
                type="button"
                onClick={() => { toggleLanguage(); setMobileOpen(false) }}
                className="text-sm text-amber-700 dark:text-cyan-400 hover:text-amber-800 dark:hover:text-cyan-300"
              >
                {i18n.language === 'es' ? 'English' : 'Español'}
              </button>
              <button
                type="button"
                onClick={() => { setDark(!dark); setMobileOpen(false) }}
                className="text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              >
                {dark ? '☀ Light' : '◉ Dark'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
