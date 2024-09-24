<template>
  <AuthForm
    title="Prompt Template"
    subtitle="Register for Prompt Template"
    :fields="fields"
    submitButtonId="register-button"
    submitButtonText="Register"
    linkText="Already have an account?"
    linkRoute="/login"
    linkActionText="Login here"
    :error="error"
    @submit="register"
  />
</template>

<script>
import AuthForm from '~/components/AuthForm.vue'

export default {
  components: {
    AuthForm,
  },
  auth: 'guest',
  data() {
    return {
      fields: [
        { id: 'register-username', name: 'username', label: 'Username', type: 'text' },
        { id: 'register-email', name: 'email', label: 'Email', type: 'email' },
        { id: 'register-password', name: 'password', label: 'Password', type: 'password' },
      ],
      error: null,
    }
  },
  methods: {
    async register(formData) {
      try {
        await this.$axios.post('/api/auth/register', formData)
        await this.$auth.loginWith('local', {
          data: {
            username: formData.username,
            password: formData.password
          }
        })
        this.$router.push('/dashboard')
      } catch (e) {
        this.error = e.response?.data?.message || 'An error occurred'
      }
    }
  }
}
</script>