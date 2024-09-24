export const state = () => ({
    // Define your state properties here
    user: null
})

export const mutations = {
    // Define your mutations here
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    // Define your actions here
    async nuxtServerInit({ commit }, { req }) {
        // Initialize your store with server-side data if needed
    },
    setUser({ commit }, user) {
        commit('setUser', user)
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