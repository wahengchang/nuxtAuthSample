<template>
  <v-card max-width="400" class="mx-auto mt-5">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-4">Login</v-btn>
      </v-form>
    </v-card-text>
    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/dashboard')
      } catch (e) {
        this.error = e.response.data.error
      }
    }
  }
}
</script>