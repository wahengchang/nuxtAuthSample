export const state = () => ({
    collections: [],
    currentCollection: null,
    currentItems: []
})

export const mutations = {
    SET_COLLECTIONS(state, collections) {
        state.collections = collections
    },
    SET_CURRENT_COLLECTION(state, collection) {
        state.currentCollection = collection
    },
    SET_CURRENT_ITEMS(state, items) {
        state.currentItems = items
    }
}

export const actions = {
    async fetchCollections({ commit }) {
        const collections = await this.$axios.$get('/api/collections')
        commit('SET_COLLECTIONS', collections)
    },
    async fetchCollection({ commit }, id) {
        const collection = await this.$axios.$get(`/api/collections/${id}`)
        commit('SET_CURRENT_COLLECTION', collection)
    },
    async fetchItems({ commit }, collectionId) {
        const items = await this.$axios.$get(`/api/collections/${collectionId}/items`)
        commit('SET_CURRENT_ITEMS', items)
    },
    async createCollection({ dispatch }, collection) {
        await this.$axios.$post('/api/collections', collection)
        dispatch('fetchCollections')
    },
    async updateCollection({ dispatch }, { id, collection }) {
        await this.$axios.$put(`/api/collections/${id}`, collection)
        dispatch('fetchCollections')
    },
    async deleteCollection({ dispatch }, id) {
        await this.$axios.$delete(`/api/collections/${id}`)
        dispatch('fetchCollections')
    },
    async createItem({ dispatch }, { collectionId, item }) {
        await this.$axios.$post(`/api/collections/${collectionId}/items`, item)
        dispatch('fetchItems', collectionId)
    },
    async updateItem({ dispatch }, { collectionId, itemId, item }) {
        await this.$axios.$put(`/api/collections/${collectionId}/items/${itemId}`, item)
        dispatch('fetchItems', collectionId)
    },
    async deleteItem({ dispatch }, { collectionId, itemId }) {
        await this.$axios.$delete(`/api/collections/${collectionId}/items/${itemId}`)
        dispatch('fetchItems', collectionId)
    }
}

export const getters = {
    // Define your getters here
    isAuthenticated(state) {
        return !!state.user
    },
    getUser(state) {
        return state.user
    }
}