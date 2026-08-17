export interface SkillSummary {
  id: number
  name: string
  category: SkillCategory
  level: SkillLevel
}

export interface Project {
  id: number
  title: string
  description: string
  imageUrl: string | null
  githubUrl: string | null
  demoUrl: string | null
  featured: boolean
  createdAt: string
  skills: SkillSummary[]
}

export interface Skill {
  id: number
  name: string
  category: SkillCategory
  level: SkillLevel
}

export interface Message {
  id: number
  name: string
  email: string
  content: string
  read: boolean
  createdAt: string
}

export interface MessageRequest {
  name: string
  email: string
  content: string
}

export type SkillCategory = 'LANGUAGE' | 'FRAMEWORK' | 'DATABASE' | 'TOOL' | 'CLOUD' | 'OTHER'
export type SkillLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
