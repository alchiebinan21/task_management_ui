<template>
    <div class="flex flex-col gap-[50px]">
        <div class="flex flex-row justify-center items-center gap-[50px]">
                <div class="stack-item w-full text-center">
                    <a href="https://nuxt.com/" target="_blank">
                        <img src="/logos/logo-black.png" alt="Nuxt Js3  Logo" class="h-[50px] inline-block ease-in-out" 
                        :class="{ 'invert': isDark }" 
                        />
                    </a>
                </div>
                <div class="stack-item w-full text-center">
                    <a href="https://aws.amazon.com/" target="_blank">
                        <img src="/logos/Amazon-Web-Services-Emblem.png" alt="AWS Logo" class="h-[100px] inline-block" />
                    </a>
                </div>
                <div class="stack-item w-full text-center">
                    <a href="https://laravel.com/" target="_blank">
                        <img src="/logos/laravel-logo.png" alt="AWS Logo" class="h-[70px] inline-block" />
                    </a>
                </div>
        </div>
        <div class="flex flex-row justify-center items-center gap-[50px]">
            <div class="stack-item w-full flex flex-col items-center text-black transition duration-300 ease-in-out" :class="{ 'invert': isDark }"
                >
                <a href="https://modelcontextprotocol.io/" target="_blank">
                    <img src="/logos/mcp.svg" alt="MCP Logo" class="h-[100px] inline-block brightness-0" 
                        :class="{ 'invert': isDark }" 
                    />
                </a>
                <span class="block w-full text-md text-black text-center">Model Context Protocol</span>
            </div>
            <div class="stack-item w-full text-center">
                <a href="https://www.python.org/" target="_blank">
                    <img src="/logos/python.svg" alt="Python Logo" class="h-[200px] inline-block transition duration-300 ease-in-out" 
                        :class="{ 'invert brightness-0': isDark }" 
                    />
                </a>
            </div>
            <div class="stack-item w-full text-center">
                <a href="https://redis.io/" target="_blank">
                    <img src="/logos/redis-logo.svg" alt="Redis Logo" class="h-[100px] inline-block" />
                </a>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center gap-[50px] w-full">
            <div class="stack-item w-full text-center">
                <a href="https://www.mysql.com/" target="_blank">
                    <img src="/logos/logo-mysql.svg" alt="MySQL Logo" class="h-[100px] inline-block" />
                </a>
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

.stack-item:nth-child(1) { animation-delay: 0s; }
.stack-item:nth-child(2) { animation-delay: 0.6s; }
.stack-item:nth-child(3) { animation-delay: 1.2s; }
.stack-item:nth-child(4) { animation-delay: 1.8s; }
</style>