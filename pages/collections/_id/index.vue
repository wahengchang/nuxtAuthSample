<template>
  <div>
    <h1>{{ collection.name }}</h1>
    <p>{{ collection.description }}</p>
    <h2>Items</h2>
    <ul>
      <li v-for="item in items" :key="item._id">
        {{ item.data }}
        <nuxt-link :to="`/collections/${collection._id}/items/${item._id}`">Edit</nuxt-link>
      </li>
    </ul>
    <nuxt-link :to="`/collections/${collection._id}/items/new`">Add New Item</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const [collection, items] = await Promise.all([
      $axios.$get(`/api/collections/${params.id}`),
      $axios.$get(`/api/collections/${params.id}/items`)
    ])
    return { collection, items }
  }
}
</script>