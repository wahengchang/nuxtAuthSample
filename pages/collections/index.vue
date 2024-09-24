<template>
  <div class="collections-page">
    <v-container>
      <v-row align="center" justify="space-between" class="mb-6">
        <v-col cols="auto">
          <h1 class="text-h4 font-weight-light">My Collections</h1>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" to="/collections/new" class="mr-2">
            <v-icon left>mdi-plus</v-icon>
            New Collection
          </v-btn>
          <v-btn text to="/dashboard">
            <v-icon left>mdi-arrow-left</v-icon>
            Back to Dashboard
          </v-btn>
        </v-col>
      </v-row>

      <CollectionList />
    </v-container>
  </div>
</template>

<script>
import CollectionList from '~/components/CollectionList.vue'

export default {
  components: {
    CollectionList
  },
  middleware: 'auth' // Ensure only authenticated users can access this page
}
</script>

<style scoped>
.collections-page {
  background-color: #121212;
  min-height: 100vh;
  padding: 20px 0;
}
</style>