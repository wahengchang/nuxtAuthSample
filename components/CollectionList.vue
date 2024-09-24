<template>
  <div class="collection-list">
    <v-row dense>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          id="collection-search"
          v-model="searchQuery"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          filled
          dense
          clearable
          @input="debouncedSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          id="collection-sort"
          v-model="sortBy"
          :items="sortOptions"
          label="Sort"
          filled
          dense
        ></v-select>
      </v-col>
    </v-row>

    <v-skeleton-loader
      v-if="loading"
      type="card-heading@3"
      class="mt-4"
    ></v-skeleton-loader>

    <v-row v-else-if="collections.length === 0">
      <v-col cols="12">
        <v-card id="empty-state" class="text-center pa-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-folder-open</v-icon>
          <h2 class="text-h5 font-weight-regular mb-2">No Collections Yet</h2>
          <p class="mb-4">Start organizing your items by creating your first collection.</p>
          <v-btn id="create-first-collection" color="primary" to="/collections/new">
            <v-icon left>mdi-plus</v-icon>
            Create Your First Collection
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-data-table
          id="collections-table"
          :headers="headers"
          :items="sortedAndFilteredCollections"
          class="elevation-1"
        >
          <template v-slot:item.name="{ item }">
            <router-link :to="`/collections/${item._id}`">{{ item.name }}</router-link>
          </template>
          <template v-slot:item.itemCount="{ item }">
            <v-chip>
              <v-icon left small>mdi-folder</v-icon>
              {{ item.itemCount }} items
            </v-chip>
          </template>
          <template v-slot:item.createdAt="{ item }">
            <v-chip>
              <v-icon left small>mdi-calendar</v-icon>
              {{ formatDate(item.createdAt) }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn :id="`edit-collection-${item._id}`" text @click="editCollection(item._id)" color="secondary">
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
            <v-btn :id="`delete-collection-${item._id}`" icon @click="deleteCollection(item._id)" color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      collections: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Number of Items', value: 'itemCount' },
        { text: 'Date Created', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      loading: true,
      searchQuery: '',
      sortBy: 'name',
      sortOptions: [
        { text: 'Name', value: 'name' },
        { text: 'Date Created', value: 'createdAt' },
        { text: 'Number of Items', value: 'itemCount' }
      ]
    }
  },
  computed: {
    sortedAndFilteredCollections() {
      return this.collections
        .filter(c => c.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .sort((a, b) => {
          if (this.sortBy === 'name') return a.name.localeCompare(b.name)
          if (this.sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt)
          if (this.sortBy === 'itemCount') return b.itemCount - a.itemCount
          return 0
        })
    }
  },
  created() {
    this.debouncedSearch = debounce(() => {
      this.fetchCollections()
    }, 300)
  },
  async fetch() {
    await this.fetchCollections()
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    editCollection(id) {
      this.$router.push(`/collections/${id}/edit`)
    },
    async deleteCollection(id) {
      try {
        await this.$axios.delete(`/api/collections/${id}`)
        this.collections = this.collections.filter(c => c._id !== id)
        this.$toast.success('Collection deleted successfully')
      } catch (error) {
        console.error('Error deleting collection:', error)
        this.$toast.error('Failed to delete collection')
      }
    },
    async fetchCollections() {
      try {
        this.loading = true
        const { data } = await this.$axios.get('/api/collections', {
          params: { search: this.searchQuery }
        })
        this.collections = data
      } catch (error) {
        console.error('Error fetching collections:', error)
        this.$toast.error('Failed to fetch collections')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.collection-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.collection-card .v-card__text {
  flex-grow: 1;
}
</style>