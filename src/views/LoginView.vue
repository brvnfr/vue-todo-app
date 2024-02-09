<template>
  <div class="app-layout">
    <header class="header-section">
      <article class="header-content">
        <img src="@/assets/brand/logo.svg" alt="Brand Logo" class="brand-logo" />
        <h1><strong>FACILITA</strong>TASKS</h1>
        <p>Gestão de tarefas pessoais</p>
      </article>
    </header>
    <section class="main-content">
      <main class="centered-content">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input-component
              v-model="username"
              type="text"
              :width="inputWidth"
              label="Nome de usuário ou e-mail:"
              name="username"
              autocomplete="username"
            />
          </div>
          <div class="form-group">
            <input-component
              v-model="password"
              type="password"
              :width="inputWidth"
              label="Senha:"
              name="password"
              autocomplete="current-password"
            />
          </div>
          <button-component type="submit" class="login-btn">Login</button-component>
        </form>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const store = useStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const inputWidth = '100%'

const handleLogin = async () => {
  try {
    const isAuthenticated = await store.dispatch('auth/login', {
      username: username.value,
      password: password.value,
    })

    console.log('isAuthenticated:', isAuthenticated)

    if (isAuthenticated) {
      router.push('/tasks')
    } else {
      console.error('Erro no login: Credenciais inválidas')
    }
  } catch (error) {
    console.error('Erro no login:', error)
  }
}

</script>
<style lang="stylus" scoped>
@import '../styles/variables.styl'

.app-layout
  display flex
  height 100vh
  @media screen and (max-width: 1100px) {
    transition  all .5s ease
    flex-direction column
  }

.header-section
  background brand-blue-500
  width 100%
  flex 0.5
  display flex
  flex-direction column
  align-items center
  justify-content center


.header-content
  display flex
  flex-direction column
  align-items flex-start
  justify-content flex-start

  

  h1 {
  text-styles(48px, 300, #fff, 1)
  @media screen and (max-width: 375px) {
    text-styles(36px, 300, #fff, 1)
  }
  } 

  p {
   text-styles(16px, 300, #fff, 1)
  }

  .brand-logo
    width 100px
    margin 1rem 2

.main-content
  flex 1
  padding 20px

.centered-content
  display flex
  justify-content center
  align-items center
  height 100%

.login-form
  max-width 300px
  width 100%
  margin 0 auto

.form-group
  margin-bottom 1rem

label
  display block
  margin-bottom 0.5rem

.form-input
  width 100%
  padding 0.5rem
  font-size 1rem
  border 1px solid #ccc
  border-radius 4px

.login-btn
  background brand-blue-500
  color #fff
  padding 0.5rem 1rem
  border none
  border-radius 4px
  cursor pointer
  &:hover
    background darken(brand-blue-500, 10%)
</style>
