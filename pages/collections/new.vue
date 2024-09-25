<template>
  <div class="collection-container">
    <h1 class="collection-title">Create New Collection</h1>
    <div class="collection-card">
      <h2>Add Your Collection Details</h2>
      <CollectionForm
        :collection="newCollection"
        submit-button-text="Create Collection"
        @submit="createCollection"
        @cancel="goBack"
      />
    </div>
  </div>
</template>

<script>
import CollectionForm from '~/components/CollectionForm.vue'

export default {
  components: {
    CollectionForm
  },
  data() {
    return {
      newCollection: {
        name: '',
        description: '',
        category: '',
        tags: [],
        privacy: 'public',
        customFields: []
      }
    }
  },
  methods: {
    async createCollection(formData) {
      try {
        const newCollection = await this.$axios.$post('/api/collections', formData)
        this.$toast.success('Collection created successfully', { duration: 3000 })
        this.$router.push('/collections')
      } catch (error) {
        console.error('Error creating collection:', error)
        this.$toast.error('Failed to create collection')
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
</style>