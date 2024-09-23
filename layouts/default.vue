<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link v-if="!$auth.loggedIn" to="/login">Login</nuxt-link>
      <nuxt-link v-if="!$auth.loggedIn" to="/register">Register</nuxt-link>
      <nuxt-link v-if="$auth.loggedIn" to="/dashboard">Dashboard</nuxt-link>
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
