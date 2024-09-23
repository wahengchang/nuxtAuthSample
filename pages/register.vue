<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      success: null
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('/api/auth/register', {
          email: this.email,
          password: this.password
        })
        this.success = 'Registration successful. Please login.'
        this.error = null
      } catch (e) {
        this.error = e.response.data.error
        this.success = null
      }
    }
  }
}
</script>