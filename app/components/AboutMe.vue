<template>
    <div class="flex flex-col gap-[50px]" :class="textColor">
        <!-- About Me Section -->
        <section id="about-me" class="scroll-mt-8">
            <h1 class="text-center text-2xl font-bold mb-4">About This Website</h1>
            <div class="text-start">
                <p class="text-base leading-relaxed">
                    I created this website to showcase my work and to share my knowledge with the world.
                    This is for fun and to apply my knowledge in implementing AI models while using my web development skills.
                </p>
            </div>
        </section>

        <!-- Educational Background Section -->
        <section id="idea" class="scroll-mt-8">
            <h2 class="text-center text-2xl font-bold mb-4">My Idea</h2>
            <ul class="space-y-6">
                <li>
                    <h3 class="text-lg font-bold">Agent AI</h3>
                    <p>I designed an AI Agent that allows users to manage data just by chatting with it.</p>
                </li>
                <li>
                    <h3 class="text-lg font-bold">Model Context Protocol</h3>
                    <p>To allow the AI Agent to interact with my backend database and API endpoints.</p>
                </li>
                <li>
                    <h3 class="text-lg font-bold">The Goal</h3>
                    <p>To be able to use the AI Agent to navigate the website, change the layout,and perform actions to the data as the user wants it.</p>
                </li>
                <li>
                    <h3 class="text-lg font-bold">Commands Available</h3>
                    <p>The AI Agent will be able to perform actions such as:</p>
                    <ul class="list-disc list-inside">
                        <li>Navigate to different pages (about me, stack)</li>
                        <li>Change the layout (dark mode, light mode)</li>
                        <li>Perform actions to the data (add, edit, delete tasks)</li>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
const { textColor } = useDarkMode()
</script>

<style scoped>
</style>