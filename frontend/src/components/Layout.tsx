import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-black text-stone-900 dark:text-white antialiased">
      {children}
    </div>
  )
}
