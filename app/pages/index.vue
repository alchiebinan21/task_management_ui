<template>
  <PageWithChat>
    <section class="space-y-4" :class="textColor">
      <h1 class="text-2xl font-bold">Welcome</h1>
      <p class="text-base leading-relaxed text-slate-600 dark:text-slate-300">
        Use the navigation above to explore tasks, document AI, the tech stack, and project details.
        Chat below to interact with the task agent.
      </p>
    </section>
  </PageWithChat>
</template>

<script setup lang="ts">
const { textColor } = useDarkMode()
</script>
