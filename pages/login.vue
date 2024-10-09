<template>
  <AuthForm
    title="Prompt Template"
    subtitle="Login to Prompt Template"
    :fields="fields"
    submitButtonId="login-button"
    submitButtonText="Login and continue"
    linkText="Don't have an account?"
    linkRoute="/register"
    linkActionText="Register here"
    :error="error"
    @submit="login"
  >
    <template #extra-fields>
      <div class="form-footer">
        <div class="checkbox-container">
          <input type="checkbox" id="rememberMe" v-model="rememberMe">
          <label for="rememberMe">Remember me</label>
        </div>
        <router-link :to="`/forget`" class="text-primary text-decoration-none">
          <small>Forgot Password?</small>
        </router-link>
      </div>
    </template>
  </AuthForm>
</template>

<script>
import AuthForm from '~/components/AuthForm.vue'

export default {
  components: {
    AuthForm,
  },
  layout: 'requiredLogout',
  data() {
    return {
      fields: [
        { id: 'login-username', name: 'username', label: 'Username', type: 'text' },
        { id: 'login-password', name: 'password', label: 'Password', type: 'password' },
      ],
      rememberMe: false,
      error: null,
    }
  },
  methods: {
    async login(formData) {
      try {
        await this.$auth.loginWith('local', {
          data: formData
        })
        this.$router.push('/dashboard')
      } catch (e) {
        this.error = e.response?.data?.message || 'An error occurred'
      }
    }
  }
}
</script>

<style scoped>
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>