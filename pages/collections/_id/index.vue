<template>
  <div class="collection-container">
    <h1 class="collection-title">Edit Collection</h1>
    <div class="collection-card">
      <h2>Update Your Collection Details</h2>
      <CollectionForm
        v-if="collection"
        :collection="collection"
        submit-button-text="Save Changes"
        @submit="updateCollection"
        @cancel="goBack"
      />
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading collection data...</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CollectionForm from '~/components/CollectionForm.vue'

export default {
  middleware: 'auth',
  layout: 'requiredLoginCms',
  components: {
    CollectionForm
  },
  data() {
    return {
      collection: null
    }
  },
  async fetch() {
    try {
      this.collection = await this.$axios.$get(`/api/collections/${this.$route.params.id}`)
    } catch (error) {
      console.error('Error fetching collection:', error)
      this.$toast.error('Failed to load collection data')
    }
  },
  methods: {
    async updateCollection(formData) {
      try {
        const updatedCollection = await this.$axios.$put(`/api/collections/${this.collection._id}`, formData)

        this.collection = updatedCollection
        this.$toast.success('Collection updated successfully', { duration: 3000 })

        this.$router.push('/collections')
      } catch (error) {
        console.error('Error updating collection:', error)
        this.$toast.error('Failed to update collection')
      }
    },
    goBack() {
      this.$router.push('/collections')
    }
  }
}
</script>

<style scoped>
.collection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #121212;
  color: #fff;
  padding: 20px;
}

.collection-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 400;
}

.collection-card {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.collection-card h2 {
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>