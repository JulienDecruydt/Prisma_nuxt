<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold">Login</h1>

    <UForm :state="state" :schema="loginSchema" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton type="submit"> Login </UButton>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'

  const loginSchema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.minLength(1, 'Password is required')),
  })

  interface LoginForm {
    email: string
    password: string
  }

  const { fetch: refreshSession } = useUserSession()

  const state = reactive<LoginForm>({
    email: 'admin@admin.com',
    password: 'admin',
  })

  type Schema = v.InferOutput<typeof loginSchema>

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      await $fetch('/api/auth', {
        method: 'POST',
        body: event.data,
      })
      await refreshSession()
      await navigateTo('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
</script>
