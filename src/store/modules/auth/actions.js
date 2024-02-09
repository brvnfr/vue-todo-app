export default {
  async login({ commit }, { username, password }) {
    console.log('formData:', username, password)
    try {
      // lógica de autenticação no módulo 'auth'
      // simulação de autenticação bem-sucedida
      const isAuthenticated = username === 'test' && password === 'test'

      commit('setAuthenticated', isAuthenticated)
      return isAuthenticated
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  },
}
