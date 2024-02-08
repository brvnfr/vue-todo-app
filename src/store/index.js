import { createStore } from 'vuex'
import auth from './auth'

const store = createStore({
  modules: {
    //~ store modules
    auth,
  },
})

export default store
