<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Nuxt Auth Sample</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn v-if="!$auth.loggedIn" text to="/login">Login</v-btn>
      <v-btn v-if="!$auth.loggedIn" text to="/register">Register</v-btn>
      <v-btn v-if="$auth.loggedIn" text to="/dashboard">Dashboard</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
