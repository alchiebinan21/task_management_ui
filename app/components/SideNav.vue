<template>
    <div class="flex flex-col gap-4 align-start h-full p-10" :class="textColor">
        <div class="cursor-pointer">
            
        </div>
    </div>
</template>

<script setup lang="ts">
const { setPage } = useNavigation()
const { textColor } = useDarkMode()
</script>