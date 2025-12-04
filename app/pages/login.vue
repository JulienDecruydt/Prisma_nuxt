<template>
    <div>
        <h1>Login</h1>

        <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Email" name="email">
                <UInput v-model="state.email" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput type="password" v-model="state.password" />
            </UFormField>

            <UButton type="submit">
                Login
            </UButton>
        </UForm>
        {{ state }}
    </div>
</template>

<script lang="ts" setup>
interface LoginForm {
    email: string,
    password: string,
}

const { fetch: refreshSession } = useUserSession()

const state = reactive<LoginForm>({
    email: 'admin@admin.com',
    password: 'admin',
})

async function onSubmit() {
    try {
        await $fetch('/api/auth', {
            method: 'POST',
            body: state,
        })
        await refreshSession()
        await navigateTo('/dashboard')
    } catch (error) {
        console.error('Login failed:', error)
    }
}
</script>