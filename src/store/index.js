import { createStore } from 'vuex'

const store = createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        // logica de autenticacao na store
        // simulação de autenticação bem-sucedida
        const isAuthenticated = username === 'user' && password === 'password'

        commit('setAuthenticated', isAuthenticated)
        return isAuthenticated
      } catch (error) {
        console.error('Erro no login:', error)
        return false
      }
    },
  },
})

export default store
