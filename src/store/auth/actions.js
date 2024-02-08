export default {
  async login({ commit }, { username, password }) {
    console.log('formData:', username, password)
    try {
      // Lógica de autenticação na store
      // Simulação de autenticação bem-sucedida
      const isAuthenticated = username === 'test' && password === 'test'

      commit('setAuthenticated', isAuthenticated)
      return isAuthenticated
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  },
}
