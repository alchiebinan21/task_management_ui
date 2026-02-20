<template>
    <div class="flex flex-col gap-[50px]" :class="textColor">
        <span class="text-center text-2xl font-bold" >Educational Background</span>
        <ul>
            <li>
                <h2 class="text-lg font-bold" >University of California, Berkeley</h2>
                <p>Bachelor of Science in Computer Science</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const { textColor } = useDarkMode()
</script>

<style scoped>
</style>