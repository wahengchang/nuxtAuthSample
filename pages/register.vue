<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('/api/auth/register', {
          email: this.email,
          password: this.password
        })
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
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