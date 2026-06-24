<template>
    <div class="tasks flex flex-col gap-4" :class="textColor">
        <p v-if="error" class="text-red-600 dark:text-red-400 text-sm">
            {{ error }}
        </p>
        <p v-if="loading && !tasks.length" class="text-slate-500 dark:text-slate-400">
            Loading tasks…
        </p>
        <div v-else class="flex flex-row flex-wrap gap-4">
            <Card v-for="task in tasks" :key="task.id" :task="task" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '../../stores/tasks'

const { textColor } = useDarkMode()
const tasksStore = useTasksStore()
const { tasks, loading, error } = storeToRefs(tasksStore)
const { fetchTasks } = tasksStore

onMounted(() => {
    fetchTasks()
})
</script>

<style scoped>
.tasks {
    background-color: var(--color-background);
    color: var(--color-text);
}
</style>