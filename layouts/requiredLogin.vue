<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title><a href="/">Authenticated Area</a></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/dashboard">Dashboard</v-btn>
      <v-btn text @click="$auth.logout()">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'RequiredLoginLayout',
  middleware: 'auth'
}
</script>