import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  description?: string
  status?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  [key: string]: unknown
}

/** API returns { data: T, success: boolean } */
interface ApiResponse<T> {
  data: T
  success: boolean
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    currentTask: null as Task | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    taskById:
      (state) =>
      (id: number) =>
        state.tasks.find((t) => t.id === id) ?? (state.currentTask?.id === id ? state.currentTask : null),
  },
  actions: {
    getApiBase() {
      return useRuntimeConfig().public.apiBase as string
    },
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const res = await $fetch<ApiResponse<Task[]>>(`${this.getApiBase()}/tasks`)
        const list = res?.data
        this.tasks = Array.isArray(list) ? list : []
        return this.tasks
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.loading = false
      }
    },
    async fetchTask(id: number) {
      this.loading = true
      this.error = null
      try {
        const res = await $fetch<ApiResponse<Task>>(`${this.getApiBase()}/tasks/${id}`)
        const data = res?.data
        this.currentTask = data ?? null
        return this.currentTask
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.loading = false
      }
    },
    async createTask(payload: Partial<Omit<Task, 'id'>>) {
      this.loading = true
      this.error = null
      try {
        const res = await $fetch<ApiResponse<Task>>(`${this.getApiBase()}/tasks`, {
          method: 'POST',
          body: payload,
        })
        const data = res?.data
        if (data) this.tasks.push(data)
        return data ?? null
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.loading = false
      }
    },
    async updateTask(id: number, payload: Partial<Omit<Task, 'id'>>) {
      this.loading = true
      this.error = null
      try {
        const res = await $fetch<ApiResponse<Task>>(`${this.getApiBase()}/tasks/${id}`, {
          method: 'PUT',
          body: payload,
        })
        const data = res?.data
        if (data) {
          const index = this.tasks.findIndex((t) => t.id === id)
          if (index !== -1) this.tasks[index] = data
          if (this.currentTask?.id === id) this.currentTask = data
        }
        return data ?? null
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.loading = false
      }
    },
    async deleteTask(id: number) {
      this.loading = true
      this.error = null
      try {
        await $fetch<void>(`${this.getApiBase()}/tasks/${id}`, { method: 'DELETE' })
        this.tasks = this.tasks.filter((t) => t.id !== id)
        if (this.currentTask?.id === id) this.currentTask = null
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.loading = false
      }
    },
    clearError() {
      this.error = null
    },
    setCurrentTask(task: Task | null) {
      this.currentTask = task
    },
  },
})
