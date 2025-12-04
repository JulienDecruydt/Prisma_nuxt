<template>
  <main>
    <nav class="flex gap-4 justify-between items-center p-4 bg-gray-800 text-white">
      <h1 class="text-2xl font-bold">Nuxt Prisma</h1>
      <div class="flex gap-4" v-if="loggedIn">
        <NuxtLink to="/" class="hover:text-gray-300" :class="{ 'text-green-300': route.path === '/' }">Home</NuxtLink>
        <NuxtLink to="/dashboard" class="hover:text-gray-300" :class="{ 'text-green-300': route.path === '/dashboard' }">Dashboard</NuxtLink>
      </div>
      <div>
        <NuxtLink to="/login" v-if="!loggedIn">Login</NuxtLink>
        <button @click="clear" v-if="loggedIn">
          <UIcon name="ic:baseline-logout" />
        </button>
      </div>
    </nav>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
</script>
