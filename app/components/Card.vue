<template>
    <div class="card p-4 rounded-lg border border-gray-300 dark:border-gray-600" :class="textColor">
        <div class="task flex flex-col gap-2">
            <h2 class="font-semibold">{{ task?.title ?? 'Untitled' }}</h2>
            <p v-if="task?.description" class="text-sm opacity-90">{{ task.description }}</p>
            <p v-if="task?.status" class="text-sm">Status: {{ task.status }}</p>
            <p v-if="task?.created_at" class="text-xs text-slate-500 dark:text-slate-400">
                Created at: {{ formatDate(task.created_at) }}
            </p>
            <p v-if="task?.created_by" class="text-xs text-slate-500 dark:text-slate-400">
                Created by: {{ task.created_by }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { textColor } = useDarkMode()

defineProps<{
    task: import('../../stores/tasks').Task | null | undefined
}>()

function formatDate(value: string | undefined) {
    if (!value) return ''
    try {
        const d = new Date(value)
        return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString()
    } catch {
        return value
    }
}
</script>

<style scoped>

</style>