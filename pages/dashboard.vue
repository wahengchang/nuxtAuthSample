<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ $auth.user.email }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>