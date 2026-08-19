import { useEffect, useRef } from 'react'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import CursorGlow from './components/CursorGlow'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!mainRef.current) return
    const hero = mainRef.current.querySelector('#hero') as HTMLElement | null
    if (!hero) return
    const gradient = hero.querySelector('.gradient-text-animated')
    if (!gradient) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        gradient.classList.toggle('paused', !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <Layout>
      <CursorGlow />
      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </Layout>
  )
}

export default App
