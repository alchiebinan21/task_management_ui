<template>
    <div class="card p-4 rounded-lg border border-gray-300" :class="textColor">
        <div class="task flex flex-col gap-2">
            <h2>Task 1</h2>
            <p>Description of task 1</p>
            <p>Status: Pending</p>
            <p>Created at: 2026-02-20</p>
            <p>Created by: John Doe</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { textColor } = useDarkMode()
</script>

<style scoped>

</style>