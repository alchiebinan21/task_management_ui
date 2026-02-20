<template>
    <div class="flex flex-col gap-[50px]">
        <div class="flex flex-row justify-center items-center gap-[50px]">
                <div class="stack-item">
                    <img src="/logos/logo-black.png" alt="Nuxt Js3  Logo" class="h-[50px] inline-block mr-2 ease-in-out" 
                        :class="{ 'invert': isDark }" 
                    />
                </div>
                <div class="stack-item">
                    <img src="/logos/Amazon-Web-Services-Emblem.png" alt="AWS Logo" class="h-[100px] inline-block mr-2" />
                </div>
                <div class="stack-item">
                    <img src="/logos/laravel-logo.png" alt="AWS Logo" class="h-[70px] inline-block mr-2" />
                </div>
        </div>
        <div class="flex flex-row justify-center items-center gap-[50px]">
            <div class="stack-item flex flex-col items-center text-black transition duration-300 ease-in-out" :class="{ 'invert': isDark }"
                >
                <img src="/logos/mcp.svg" alt="MCP Logo" class="h-[100px] inline-block mr-2 brightness-0" 
                />
                <span class="block w-full text-md text-black text-center">Model Context Protocol</span>
            </div>
            <div class="stack-item">
                <img src="/logos/python.svg" alt="Python Logo" class="h-[200px] inline-block mr-2 transition duration-300 ease-in-out" 
                    :class="{ 'invert brightness-0': isDark }" 
                />
            </div>
            <div class="stack-item">
                <img src="/logos/redis-logo.svg" alt="Redis Logo" class="h-[100px] inline-block mr-2" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { isDark } = useDarkMode()

</script>

<style scoped>
@keyframes stack-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stack-item {
    opacity: 0;
    animation: stack-in 0.4s ease forwards;
}

.stack-item:nth-child(1) { animation-delay: 0s; }
.stack-item:nth-child(2) { animation-delay: 0.6s; }
.stack-item:nth-child(3) { animation-delay: 1.2s; }
.stack-item:nth-child(4) { animation-delay: 1.8s; }
</style>