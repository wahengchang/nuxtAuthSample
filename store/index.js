export const state = () => ({
    user: null,
    collections: [],
    loading: false,
    error: null
})

export const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_COLLECTIONS(state, collections) {
        state.collections = collections
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}

export const actions = {
    async fetchCollections({ commit }) {
        try {
            commit('SET_LOADING', true)
            const collections = await this.$axios.$get(API_ENDPOINTS.COLLECTIONS)
            commit('SET_COLLECTIONS', collections)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    }
}