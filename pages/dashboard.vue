<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.email }}</p>
    <nuxt-link to="/collections" class="collections-link">Go to Collections</nuxt-link>
    <button @click="logout" id="logoutButton">Logout</button>
    <button @click="deleteUser" id="delete-account-button">Delete User</button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      user: this.$auth.user
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
    async deleteUser() {
      try {
        await this.$axios.delete('/api/auth/user')
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }
}
</script>

<style scoped>
.collections-link {
  display: block;
  margin-bottom: 10px;
  color: #3498db;
  text-decoration: none;
}

.collections-link:hover {
  text-decoration: underline;
}

button {
  margin-right: 10px;
}
</style>