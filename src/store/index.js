import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  },
  mutations: {
    setAuth(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
      localStorage.setItem('isAuthenticated', isAuthenticated)
    },
  },
  actions: {
    login({ commit }, credentials) {
      // Simula a lógica de autenticação
      const isAuthenticated = credentials.username === 'user' && credentials.password === '123'

      if (isAuthenticated) {
        commit('setAuth', true)
      }

      return isAuthenticated
    },
    logout({ commit }) {
      // Simula a lógica de logout
      commit('setAuth', false)
    },
  },
  modules: {},
})
