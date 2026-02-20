<template>
    <div class="tasks flex flex-row flex-wrap gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
</template>

<script setup lang="ts">


const { textColor } = useDarkMode()
</script>

<style scoped>
.tasks {
    background-color: var(--color-background);
    color: var(--color-text);
}
</style>