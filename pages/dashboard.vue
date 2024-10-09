<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ $auth.user.email }}!</p>
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
      <a href="/collections" style="margin-bottom: 10px;">View Collections</a>
      <button @click="logout" id="logoutButton" style="margin-bottom: 10px;">Logout</button>
      <button @click="deleteUser" id="deleteUserButton">Delete User</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'requiredLoginCms',
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