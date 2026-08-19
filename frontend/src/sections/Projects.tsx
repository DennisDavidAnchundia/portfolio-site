import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectModal from '../components/ProjectModal'

interface ProjectCard {
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

const projects: ProjectCard[] = [
  {
    id: 1,
    title: 'Portfolio API',
    description: 'API RESTful completa para portafolio personal con autenticación, CRUD de proyectos, sistema de contacto y despliegue automatizado.',
    longDescription: 'Backend completo para un portafolio personal. Incluye autenticación JWT, endpoints RESTful para proyectos y habilidades, formulario de contacto con envío de email, migraciones con Flyway, tests unitarios e integración con Testcontainers. Desplegado con Docker multi-stage.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Flyway', 'JWT'],
    category: 'backend',
    github: 'https://github.com/DennisDavidAnchundia/portfolio-site',
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'TechStore',
    description: 'Plataforma de e-commerce con catálogo de productos, carrito de compras, pasarela de pagos y panel de administración.',
    longDescription: 'E-commerce completo con catálogo paginado, filtros por categoría, carrito de compras persistente, integración con pasarela de pagos, panel de administración para gestión de productos y pedidos. Arquitectura de microservicios con comunicación asíncrona.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Stripe'],
    category: 'fullstack',
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Auth Service',
    description: 'Microservicio de autenticación con JWT, roles y permisos. Integrado como módulo independiente para otras aplicaciones.',
    longDescription: 'Servicio de autenticación y autorización desplegable de forma independiente. Soporta registro, login, refresh tokens, roles y permisos basados en atributos. Integrado como librería compartida para otros microservicios.',
    tech: ['Java', 'Spring Boot', 'Redis', 'JWT', 'Docker'],
    category: 'backend',
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Inventory Dashboard',
    description: 'Panel de administración para gestión de inventario con reportes en tiempo real y alertas de stock bajo.',
    longDescription: 'Dashboard interactivo con gráficas de movimiento de inventario, alertas automáticas cuando el stock cae por debajo del mínimo, exportación de reportes a PDF y CSV. Backend con procesamiento asíncrono para reportes pesados.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Node.js', 'PostgreSQL'],
    category: 'fullstack',
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Task Manager API',
    description: 'API para gestión de tareas con sistema de columnas tipo Kanban, asignación de usuarios y notificaciones.',
    longDescription: 'API REST para gestión de proyectos y tareas con tableros Kanban, arrastrar y soltar, asignación de miembros, comentarios, historial de cambios y notificaciones en tiempo real vía WebSocket.',
    tech: ['Java', 'Spring Boot', 'WebSocket', 'PostgreSQL', 'Docker'],
    category: 'backend',
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Aplicación del clima con pronóstico a 7 días, geolocalización y modo offline con Service Workers.',
    longDescription: 'App progressive web app que consume API del clima, muestra pronóstico diario por horas, alertas de clima severo, geolocalización automática y funciona sin conexión gracias a Service Workers y cache.',
    tech: ['React', 'TypeScript', 'PWA', 'Tailwind CSS', 'Service Workers'],
    category: 'frontend',
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 7,
    title: 'CI/CD Pipeline',
    description: 'Pipelines automatizados para build, test y deploy de microservicios con GitHub Actions y Docker.',
    longDescription: 'Configuración completa de CI/CD: build multi-stage, tests automatizados, análisis de código, build de imágenes Docker, push a GHCR y deploy automático a Kubernetes. Incluye secrets management y notificaciones.',
    tech: ['GitHub Actions', 'Docker', 'Kubernetes', 'Bash', 'YAML'],
    category: 'devops',
    github: null,
    demo: null,
    featured: false,
  },
  {
    id: 8,
    title: 'Blog Engine',
    description: 'Motor de blog con editor Markdown, sistema de tags, búsqueda full-text y rendering del lado del servidor.',
    longDescription: 'CMS ligero para blogs técnicos. Editor con preview en vivo, soporte para código con syntax highlighting, sistema de tags y categorías, búsqueda full-text con PostgreSQL tsvector, SSR para SEO.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'MDX'],
    category: 'fullstack',
    github: null,
    demo: null,
    featured: false,
  },
] as ProjectCard[]

const allCategories = ['all', 'backend', 'frontend', 'fullstack', 'devops']

export default function Projects() {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null)
  const { ref: sectionRef, visible } = useScrollReveal(0.1)

  const featured = projects.filter((p) => p.featured)

  const handleCardClick = (project: ProjectCard) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <>
      <section id="projects" className="py-28 bg-white dark:bg-black">
        <div
          ref={sectionRef}
          className={`max-w-5xl mx-auto px-6 reveal ${visible ? 'visible' : ''}`}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-amber-700 dark:text-cyan-400 tracking-widest uppercase mb-3">Projects</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">{t('projects.title')}</h2>
            <p className="mt-3 text-stone-500 dark:text-zinc-400">{t('projects.subtitle')}</p>
          </div>

          {/* Featured grid with staggered reveal */}
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {featured.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleCardClick(project)}
                className="tilt-card shimmer group flex flex-col p-6 rounded-2xl border border-stone-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:bg-stone-50 dark:hover:bg-white/[0.04] hover:border-stone-300 dark:hover:border-white/[0.1] transition-all duration-300 text-left cursor-pointer"
              >
                <div className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 mb-4 rounded-md text-[11px] font-semibold text-amber-700 dark:text-cyan-400 bg-amber-50 dark:bg-cyan-400/10 border border-amber-200 dark:border-cyan-400/20 tracking-wide uppercase">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {t('projects.featured')}
                </div>

                <h3 className="text-lg font-semibold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-cyan-400 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm text-stone-500 dark:text-zinc-400 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-medium text-stone-500 dark:text-zinc-400 bg-stone-100 dark:bg-white/[0.05] rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] font-medium text-stone-400 dark:text-zinc-500">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-white/[0.06] flex items-center gap-1.5 text-xs font-medium text-stone-400 group-hover:text-amber-700 dark:group-hover:text-cyan-400 transition-colors duration-200">
                  {t('projects.view_details')}
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* View all button */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-600 dark:text-zinc-300 rounded-xl border border-stone-300 dark:border-white/10 hover:border-stone-400 dark:hover:border-white/20 hover:bg-stone-50 dark:hover:bg-white/[0.04] transition-all duration-300"
            >
              {t('projects.view_all')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <ProjectModal
          projects={projects}
          categories={allCategories}
          onClose={() => { setModalOpen(false); setSelectedProject(null) }}
          initialProject={selectedProject}
        />
      )}
    </>
  )
}
