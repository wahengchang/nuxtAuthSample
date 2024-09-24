<template>
  <div class="collection-container">
    <h1 class="collection-title">Create New Collection</h1>
    <div class="collection-card">
      <h2>Add Your Collection Details</h2>
      <CollectionForm />
    </div>
  </div>
</template>

<script>
import CollectionForm from '~/components/CollectionForm.vue'

export default {
  components: {
    CollectionForm
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