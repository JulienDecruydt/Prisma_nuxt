<template>
  <main>
    <h1 class="text-3xl font-bold underline">Hello World</h1>
  </main>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/posts')
console.log(data.value)
</script>
