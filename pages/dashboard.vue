<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ $auth.user.email }}!</p>
    <button @click="logout" id="logoutButton">Logout</button>
    <button @click="deleteUser" id="deleteUserButton">Delete User</button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
    async deleteUser() {
      try {
        await this.$axios.delete(`/api/auth/user`)
        window.location.reload()
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }
}
</script>