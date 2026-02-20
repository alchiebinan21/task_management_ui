<template>
    <div class="flex flex-col gap-[50px]">
        <span class="text-center text-2xl font-bold" :class="textColor">The stack I use:</span>
        <div class="flex flex-col md:flex-row justify-center items-center gap-[50px] w-full">
                <div class="stack-item w-full text-center">
                    <a href="https://nuxt.com/" target="_blank">
                        <img :src="getImageSrc('/logos/logo-black.png')" alt="Nuxt Js3  Logo" class="h-[50px] inline-block ease-in-out" 
                        :class="{ 'invert': isDark }" 
                        loading="eager"
                        />
                    </a>
                </div>
                <div class="stack-item w-full text-center">
                    <a href="https://aws.amazon.com/" target="_blank">
                        <img :src="getImageSrc('/logos/Amazon-Web-Services-Emblem.png')" alt="AWS Logo" class="h-[100px] inline-block" loading="eager" />
                    </a>
                </div>
                <div class="stack-item w-full text-center">
                    <a href="https://laravel.com/" target="_blank">
                        <img :src="getImageSrc('/logos/laravel-logo.png')" alt="AWS Logo" class="h-[70px] inline-block" loading="eager" />
                    </a>
                </div>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center gap-[50px] w-full">
            <div class="stack-item w-full flex flex-col items-center text-black transition duration-300 ease-in-out" :class="{ 'invert': isDark }"
                >
                <a href="https://modelcontextprotocol.io/" target="_blank">
                    <img :src="getImageSrc('/logos/mcp.svg')" alt="MCP Logo" class="h-[100px] inline-block brightness-0" 
                        :class="{ ' brightness-0': isDark }" 
                        loading="eager"
                    />
                </a>
                <span class="block w-full text-md text-black text-center">Model Context Protocol</span>
            </div>
            <div class="stack-item w-full text-center">
                <a href="https://www.python.org/" target="_blank">
                    <img :src="getImageSrc('/logos/python.svg')" alt="Python Logo" class="h-[200px] inline-block transition duration-300 ease-in-out" 
                        :class="{ 'invert brightness-0': isDark }" 
                        loading="eager"
                    />
                </a>
            </div>
            <div class="stack-item w-full text-center">
                <a href="https://redis.io/" target="_blank">
                    <img :src="getImageSrc('/logos/redis-logo.svg')" alt="Redis Logo" class="h-[100px] inline-block" loading="eager" />
                </a>
            </div>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center gap-[50px] w-full">
            <div class="stack-item w-full text-center">
                <a href="https://www.mysql.com/" target="_blank">
                    <img 
                        :key="`mysql-${imageCacheBuster}`"
                        :src="getImageSrc('/logos/logo-mysql.svg')" 
                        alt="MySQL Logo" 
                        class="h-[100px] inline-block" 
                        loading="eager"
                        @error="(e) => console.error('MySQL image failed to load:', e)"
                    />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { isDark, textColor } = useDarkMode()

// Generate a cache-busting query parameter when component mounts
// Use a unique timestamp for each component instance
const componentId = ref(Date.now())
const imageCacheBuster = computed(() => componentId.value)

onMounted(async () => {
  // Force images to reload by updating cache buster after component is mounted
  await nextTick()
  componentId.value = Date.now()
})

// Helper function to add cache buster to image URLs
const getImageSrc = (src: string) => {
  return `${src}?v=${imageCacheBuster.value}`
}
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

</style>