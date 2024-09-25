<template>
  <AuthForm
    title="Prompt Template"
    subtitle="Login to Prompt Template"
    :fields="FORM_FIELDS.LOGIN"
    submitButtonId="login-button"
    submitButtonText="Login and continue"
    :linkText="linkText"
    :linkRoute="ROUTES.REGISTER"
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
        <router-link :to="ROUTES.FORGET" class="text-primary text-decoration-none">
          <small>Forgot Password?</small>
        </router-link>
      </div>
    </template>
  </AuthForm>
</template>

<script>
import AuthForm from '~/components/AuthForm.vue'
import { FORM_FIELDS, ROUTES } from '~/utils/constants'
import { handleApiError } from '~/utils/helpers'

export default {
  components: {
    AuthForm,
  },
  layout: 'auth',
  auth: 'guest',
  data() {
    return {
      FORM_FIELDS,
      ROUTES,
      rememberMe: false,
      error: null,
      linkText: "Don't have an account?"
    }
  },
  methods: {
    async login(formData) {
      try {
        await this.$auth.loginWith('local', { data: formData })
        this.$router.push(ROUTES.DASHBOARD)
      } catch (e) {
        this.error = handleApiError(e)
      }
    }
  }
}
</script>