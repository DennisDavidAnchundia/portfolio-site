import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../api/client'
import type { Project, Skill, Message, MessageRequest } from '../types'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await apiClient.get<Project[]>('/api/projects')
      return data
    },
  })
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const { data } = await apiClient.get<Project[]>('/api/projects/featured')
      return data
    },
  })
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Project>(`/api/projects/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await apiClient.get<Skill[]>('/api/skills')
      return data
    },
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (message: MessageRequest) => {
      const { data } = await apiClient.post<Message>('/api/contact', message)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['messages', 'unread-count'],
    queryFn: async () => {
      const { data } = await apiClient.get<{ count: number }>('/api/messages/unread-count')
      return data.count
    },
  })
}
